/*
 * ------------------------------------------
 * 博客评论模块基类实现文件
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
    '{pro}../javascript/pro/util.js',
],function(_k,_e,_t0,_t1,_m,_,_u,_p,_o,_f,_r){
    // variable declaration
    var _pro;
    var _userid = _u._$getJsonDataInStorage("_id");
    var _token = _u._$getJsonDataInStorage("token");
    var _nickname = _u._$getJsonDataInStorage("nickname");
    var _headimg = _u._$getJsonDataInStorage("headimg");
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleBlogDetailComment = _k._$klass();
    _pro = _p._$$ModuleBlogDetailComment._$extend(_m._$$Module);
    
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d8')
        );
        this._template = _e._$html2node(
            _t0._$getTextTemplate('regular-rgl-8')
        );
        //日期过滤
        (function(){
            var fix = function(str){
              str = "" + (str || "");
              return str.length <= 1? "0" + str : str;
            }

            var maps = {
              'yyyy': function(date){return date.getFullYear()},
              'MM': function(date){return fix(date.getMonth() + 1); },
              'dd': function(date){ return fix(date.getDate()) },
              'HH': function(date){ return fix(date.getHours()) },
              'mm': function(date){ return fix(date.getMinutes())}
            };

            var trunk = new RegExp(Object.keys(maps).join('|'),'g');

            Regular.filter("format", function(value, format){
                format = format || "yyyy-MM-dd HH:mm";
                value = new Date(value);

                return format.replace(trunk, function(capture){
                  return maps[capture]? maps[capture](value): "";
                });
            });
        })();

        //定义博客内容组件
        var Component = Regular.extend({
            template:this._template,
            data: {list:[],blogid:'',content:'',pophide:true,commentid:'',commentidIndex:'',btn:{active:false,default:true},msgclass:{active:false,negative:true}}, 
            //判断输入
            checkEmpty:function($event){
                if(this.data.content !== ''){
                    this.data.empty = false;
                    this.data.btn = {active:true,default:false};
                }else{
                    this.data.empty = true;
                    this.data.btn = {active:false,default:true};
                } 
            },
            getCommentList:function(){
                _u._$ajaxSend({data:{blogid:this.data.blogid},url:'blog/comment/list',method:'get',callback:this.getCommentListCallback._$bind(this)}); 
            },
            addComment: function () {
                this.checkEmpty();
                if(this.data.empty){
                    return;
                }
                _u._$ajaxSend({data:{blogid:this.data.blogid,nickname:_nickname,userid:_userid,headimg:_headimg,token:_token,content:this.data.content},url:'blog/comment/add',method:'post',callback:this.addCommentCallback._$bind(this)}); 
            },
            delItem: function(_commentid,_commentidIndex){
                this.data.pophide = false;
                this.data.commentid = _commentid;
                this.data.commentidIndex = _commentidIndex;
            },
            confirm: function(){
                if(this.data.commentid !== '' && this.data.commentidIndex !== ''){
                    _u._$ajaxSend({data:{blogid:this.data.blogid,commentid:this.data.commentid,userid:_userid,token:_token},url:'blog/comment/delete',method:'post',callback:this.deleteCommentCallback._$bind(this)});                 
                }
                this.data.pophide = true;
            },
            cancel: function(){
                this.data.pophide = true;
            },
            getCommentListCallback: function(_result){
                //获取列表   
                if(_result.code == 200){
                    var _data = _result.data;
                    if(_data.length>0){
                        for(var i=0;i<_data.length;i++){
                            //作评论者可删除本人的评论
                            if(_data[i].userid == _userid ){
                                _data[i].canDelete = true;
                            }else{
                                 _data[i].canDelete = false;
                            }
                        }
                    }
                    this.data.list = _data;     
                }else{
                    alert(_result.error);
                }
                this.$update(); 
            },
            addCommentCallback: function(_result){
                if(_result.code == 200){
                    var _data = _result.data;
                    if(_data.userid == _userid ){
                        _data.canDelete = true;
                    }else{
                        _data.canDelete = false;

                    }
                    //重新渲染
                    this.data.list.push(_data);
                }else{
                    alert(result.error);
                }
                this.data.content = '';//输入框置空
                checkEmpty();
                this.$update(); 
            },
            deleteCommentCallback: function(_result){
                if(_result.code == 200){
                    //删除页面item
                    this.data.list.splice(this.data.commentidIndex,1);  
                }else{
                    alert(result.error);
                }
                this.$update(); 
            }

        });
        this._component = new Component({

        });
        this._component.$inject(this.__body);
    };

    /**
     * 刷新模块
     * @param  {Object} 配置信息
     * @return {Void}
     */
    _pro.__onRefresh = function(_options){
        this.__super(_options);
        this._component.data.blogid = _options.param.blogid; 
        this._component.getCommentList(); 
    };
    // notify dispatcher
    _t1._$regist('blog-detail-comment',_p._$$ModuleBlogDetailComment);
});



