/*
 * ------------------------------------------
 * 博客正文模块基类实现文件
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
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleBlogDetailContent = _k._$klass();
    _pro = _p._$$ModuleBlogDetailContent._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d7')
        );
        this._template = _e._$html2node(
            _t0._$getTextTemplate('regular-rgl-7')
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
          data: {data:{},blogid:''}, 
          getBlogDetail:function(){
            _u._$ajaxSend({data:{blogid:this.data.blogid},url:'blog/detail',method:'get',callback:this.getBlogDetailCallback._$bind(this)});                               
          },
          getBlogDetailCallback: function(_result) {
            if(_result.code == 200){
                this.data.data = _result.data;     
            }else if(_result.code == 202){           
                alert(_result.error);
                history.go(-1);
            }else{
                alert(_result.error);
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
        this._component.getBlogDetail();         
    };
   
    // notify dispatcher
    _t1._$regist('blog-detail-content',_p._$$ModuleBlogDetailContent);


});
