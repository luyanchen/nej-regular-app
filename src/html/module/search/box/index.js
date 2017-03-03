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
    /**
     * 项目模块基类对象
     * @class   {_$$ModuleLogin}
     * @extends {_$$Module}
     * @param   {Object}  可选配置参数，已处理参数列表如下所示
     */
    _p._$$ModuleSearchBox = _k._$klass();
    _pro = _p._$$ModuleSearchBox._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__super();
        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d12')
        );
        this._template = _e._$html2node(
            _t0._$getTextTemplate('regular-rgl-12')
        );
        //定义搜索组件
        var Component = Regular.extend({
            template:this._template,
            data: {search:''},
            submit: function($event){
                var _text = this.data.search;
                if(_text != ''){
                    location.href = location.pathname+'#/search/?keyword='+_text+'?class=3';  
                }else{
                    location.href = location.pathname+'#/search/';   
                }
            }
        });
        this._component = new Component({

        });
        this._component.$inject(this.__body);     
    };

    _pro.__onRefresh = function(_options){ 
        this.__super(_options);
        //回车搜索关键字
        this._component.data.search = _options.param.keyword||'';
        this._component.$update();

    }
    
        // notify dispatcher
    _t1._$regist('search-box',_p._$$ModuleSearchBox);
});
