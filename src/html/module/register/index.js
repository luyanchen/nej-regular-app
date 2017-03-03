/*
 * ------------------------------------------
 * 注册模块基类实现文件
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
    _p._$$ModuleRegister = _k._$klass();
    _pro = _p._$$ModuleRegister._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d1')
        );
        this._template = _e._$html2node(
            _t0._$getTextTemplate('regular-rgl-1')
        );
        //定义组件
        var Component = Regular.extend({
            template:this._template,
            data: {phone:'',code:'',pwd:'',repwd:'',nickname:'',sex:0,msg:'',empty:true,page:'first',btn:{active:false,default:true},msgclass:{active:false,negative:true},sexclass0:{active:true,default:false},sexclass1:{active:false,default:true}},
            //判断输入
            checkEmpty:function($event){
                switch(this.data.page){
                    case 'first':
                        if(this.data.phone !== '' && this.data.code !== ''){
                            this.data.empty = false;
                        }else{
                            this.data.empty = true;
                        } 
                        break;
                    case 'second':
                        if(this.data.pwd !== '' && this.data.repwd !== '' && this.data.nickname !== ''){
                            this.data.empty = false;
                        }else{
                            this.data.empty = true;
                        }
                        break;
                    default :
                        break;
                }          
                if(this.data.empty){
                    this.data.btn = {active:false,default:true};
                }else{
                    this.data.btn = {active:true,default:false};
                }    
            },
            //下一步
            nextPage: function(){
                this.checkEmpty();
                if(this.data.empty){
                    return;
                }
                if(this.data.page == "first"){
                    this.verifyCode();
                }
                if(this.data.page == "second"){
                    if(this.data.pwd !== this.data.repwd){
                        this.data.msg = "两次密码不一致";
                        return;
                    }
                    this.data.page = "third";
                }
            },
            //选择性别
            changeSex: function(_sex){
                this.data.sex = _sex;
                if(_sex == 1){
                    this.data.sexclass0 = {active:false,default:true};
                    this.data.sexclass1 = {active:true,default:false};
                }else{
                    this.data.sexclass1 = {active:false,default:true};
                    this.data.sexclass0 = {active:true,default:false};
                }
            },
            //获取验证码
            getCode: function($event){
                var _phone = this.data.phone;
                /*检查手机号*/
                if(!_u._$checkPhone({phone:_phone})){
                    this.data.msg = "请输入正确的手机号";
                    return;
                 }
                var _data = {phone:_phone};
                _u._$ajaxSend({data:_data,url:'login/code',method:'get',callback:this.getCodeCallback._$bind(this)});                        
            },
            verifyCode:function(){
                //验证验证码
                var _data = {
                    phone:this.data.phone,
                    code:this.data.code
                };
                _u._$ajaxSend({data:_data,url:'login/verifyCode',method:'post',callback:this.verifyCodeCallback._$bind(this)});                               
            },
            //注册
            register:function() {
                var _phone = this.data.phone;
                var _pwd = this.data.pwd;
                var _sex= this.data.sex;
                var _nickname= this.data.nickname;
                _u._$ajaxSend({data:{phone:_phone,pwd:_pwd,sex:_sex,nickname:_nickname},url:'login/register',method:'post',callback:this.registerCallback._$bind(this)});                       
        
            },
            //获取验证码回调
            getCodeCallback : function(_result){
                /*获取验证码*/
                if(_result.code == 200){ 
                    this.data.msg = "验证码发送成功"+" debug:验证码："+_result.data.code;
                }else{
                    this.data.msg = _result.error;                 
                }
                this.$update();//异步，手动data同步到view层.
            },
            //验证验证码回调
            verifyCodeCallback: function(_result){
                /*验证验证码*/
                if(_result.code == 200){        
                    this.data.page = "second";
                    this.checkEmpty();
                }else{
                    this.data.msg = _result.error;                
                }
                this.$update();//异步，手动data同步到view层.
            },
            //提交注册回调
            registerCallback: function(_result){
                //提交注册    
                if(_result.code == 200){  
                    this.data.msgclass = {active:true,negative:false};      
                    this.data.msg= "注册成功";
                    window.setTimeout(function(){
                        location.href="./login.html";
                    },1000); 
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
    _t1._$regist('register',_p._$$ModuleRegister);

});
