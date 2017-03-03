/*
 * ------------------------------------------
 * 设置模块基类实现文件
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
    _p._$$ModuleHomeSetting= _k._$klass();
    _pro = _p._$$ModuleHomeSetting._$extend(_m._$$Module);
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){

        this.__body = _e._$html2node(
            _t0._$getTextTemplate('module-id-d10')
        );
        this._template = _e._$html2node(
            _t0._$getTextTemplate('regular-rgl-10')
        );
        new Regular({
          template:this._template,
          data: {pophide:true},
          loginout: function(){
            this.data.pophide = false;
          },
          cancel: function(){
            this.data.pophide = true;
          },
          confirm: function(){
            //清空缓存
            _u._$clearJsonDataInStorage();
            location.href="./login.html";
          }
        }).$inject(this.__body);
    };
    // notify dispatcher
    _t1._$regist('home-setting',_p._$$ModuleHomeSetting);

});
