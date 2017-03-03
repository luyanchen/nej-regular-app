/*
 * ------------------------------------------
 * 登录模块基类实现文件
 * @version  1.0
 * @author   chenluyan(chenluyan_bupt@163.com)
 * ------------------------------------------
 */
NEJ.define([
    'base/klass',
    'base/element',
    'util/template/tpl',
    'util/dispatcher/module',
    'pro/module/module',
    '{pro}../lib/regular.js',
    '{pro}../javascript/pro/util.js'
],function(_k,_e,_t0,_t1,_m,_,_u,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleLogin = _k._$klass();
    _pro = _p._$$ModuleLogin._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d0')
        );
        this._template = _e._$html2node(
            _t0._$getTextTemplate('regular-rgl-0')
        );
        new Regular({
          template:this._template,
          data: {phone:'',pwd:'',msg:'',empty:true,btn:{active:false,default:true}},
          //判断输入
          checkEmpty:function($event){
            if(this.data.phone !== '' && this.data.pwd != ''){
              this.data.empty = false;
              this.data.btn = {active:true,default:false};
            }else{
              this.data.empty = true;
              this.data.btn = {active:false,default:true};
            }   
          },
          //清空提示语
          clearmsg:function($event){
              this.data.msg = '';//提示语置空        
          },
          //登录
          login: function($event){
            this.checkEmpty();
            if(this.data.empty){
              return;
            }
            var _phone = this.data.phone;
            var _pwd = this.data.pwd; 
            if(!_u._$checkPhone({phone:_phone})){
              this.data.msg = "请输入正确的手机号";
              return;
            }
            _u._$ajaxSend({data:{phone:_phone,pwd:_pwd},url:'login/login',method:'post',callback:this.loginCallback._$bind(this)});                         
          },
          //登录
          loginCallback : function(_result,$event){   
            if(_result.code == 200){
                var _data = _result.data;
                _u._$setJsonDataInStorage(_data); 
                location.href="./app.html";
            }else{
                this.data.msg = _result.error;
            }
            this.$update();//异步，手动data同步到view层.

          }
        }).$inject(this.__body);
        
    };
        // notify dispatcher
  _t1._$regist('login',_p._$$ModuleLogin);
});
