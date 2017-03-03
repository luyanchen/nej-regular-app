/*
 * ------------------------------------------
 * 修改密码模块基类实现文件
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
    //初始化用户信息
    var _userid = _u._$getJsonDataInStorage("_id");
    var _token = _u._$getJsonDataInStorage("token");
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleHomeEditpwd= _k._$klass();
    _pro = _p._$$ModuleHomeEditpwd._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){

        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d11')
        );
        this._template = _e._$html2node(
            _t0._$getTextTemplate('regular-rgl-11')
        );
         //定义博客内容组件
        var Component = Regular.extend({
            template:this._template,
            data:{oldpwd:'',pwd:'',repwd:'',empty:true,msg:'',btn:{active:false,default:true},msgclass:{active:false,negative:true}},
            checkEmpty:function($event){
                if(this.data.oldpwd !== '' && this.data.pwd !== '' && this.data.repwd !== ''){
                    this.data.empty = false;
                    this.data.btn = {active:true,default:false};
                }else{
                    this.data.empty = true;
                    this.data.btn = {active:false,default:true};
                }             
            },
            submit: function(){
                this.checkEmpty();
                if(this.data.empty){
                    return;
                }
                var _oldpwd = this.data.oldpwd;
                var _pwd = this.data.pwd;
                var _repwd = this.data.repwd;
                if(_pwd !== _repwd){
                    this.data.msg = "两次密码不一致";
                    return;
                }
                var _data = {
                    userid : _userid,
                    pwd : _pwd,
                    oldpwd : _oldpwd,
                    token :_token,
                }
                _u._$ajaxSend({data:_data,url:'login/editpwd',method:'post',callback:this.editPwdCallback._$bind(this)});                        

            },
            editPwdCallback: function(_result){
                if(_result.code == 200){ 
                //停留2S
                this.data.msgclass = {active:true,negative:false};         
                this.data.msg = "修改成功"; 
                window.setTimeout(function(){
                    location.href="./login.html";
                },2000);      
                }else{
                    this.data.msg = _result.error;
                }  
                this.$update();//异步，手动data同步到view层.  
                
            },
            //清空提示语
            clearmsg:function($event){
                this.data.msg = '';//提示语置空        
            },
          
        });
        this._component = new Component({

        });
        this._component.$inject(this.__body);
    };
    // notify dispatcher
    _t1._$regist('home-editpwd',_p._$$ModuleHomeEditpwd);
    
});
