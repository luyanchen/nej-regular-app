/*
 * ------------------------------------------
 * 发表博客模块基类实现文件
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
    var _token = _u._$getJsonDataInStorage("token");
    var _nickname = _u._$getJsonDataInStorage("nickname");
    var _userid = _u._$getJsonDataInStorage("_id");
    var _headimg = _u._$getJsonDataInStorage("headimg");
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModulePublishAddblog = _k._$klass();
    _pro = _p._$$ModulePublishAddblog._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){

        this.__super();
        //textarea 封装模板会和<teaxarea>标签冲突。
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d6')
        );
        this._template = 
        '<div class="m-publish-wrap">\
                <div class="u-div-30" ></div>\
                <form id="myform" method="post">\
                    <div class="u-div-10"></div>\
                    <input r-model="title" class="u-input" type="text"  autocomplete="off" placeholder="标题" on-keyup={this.checkEmpty()} />\
                    <div class="u-div-10"></div>\
                    <div class="u-textarea-wrap">\
                        <textarea r-model="content" type="text"  class="textarea"  placeholder="分享新鲜事" on-keyup={this.checkEmpty()} />\
                    </div>\
                    <div class="u-div-10"></div>\
                    <div class="u-div-50"></div>\
                    <div class="u-btn-wrap">\
                        <div class="u-btn " r-class={btn} on-click={this.submit()}>发表</div>\
                    </div>\
                </form>\
                <div class="u-div-20"></div>\
                <div class="u-tips"><div  class="active" >{msg}</div></div>\
        </div>';
        //定义组件
        var Component = Regular.extend({
            template:this._template,
            data: {title:'',content:'',empty:true,msg:'',btn:{active:false,default:true}},
            checkEmpty:function($event){
                if(this.data.title !== '' && this.data.content !== ''){
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
                var _title = this.data.title;
                var _content = this.data.content;
                _u._$ajaxSend({data:{userid:_userid,nickname:_nickname,token:_token,headimg:_headimg,content:_content,title:_title},url:'blog/add',method:'post',callback:this.addBlogCallback._$bind(this)});                             

            },
            addBlogCallback: function(_result){
                if(_result.code == 200){ 
                    //停留2S    
                    this.data.msg = "发布成功"; 
                    window.setTimeout((function(){
                        this.data.msg = '';
                        location.href="#/m/index/detail/?blogid="+_result.data.blogid;
                    })._$bind(this),1000);     
                }else{
                    this.data.msg = _result.error;
                }  
                this.$update();//异步，手动data同步到view层.  
                
            },
            //清空提示语
            clearmsg:function($event){
                this.data.msg = '';//提示语置空        
            }, 
            //重置
            reset:function() {
                this.data = {title:'',content:'',empty:true,msg:'',btn:{active:false,default:true}},
                this.$update();
            }  
        });
        this._component = new Component({

        });
        this._component.$inject(this.__body);    
    };
    _pro.__onRefresh = function(){
        //输入置空
        this._component.reset();  
    }
        // notify dispatcher
    _t1._$regist('publish-addblog',_p._$$ModulePublishAddblog);
});
