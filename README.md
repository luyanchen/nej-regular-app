<a href="https://github.com/luyanchen/nej-regular-app/">基于NEJ+Regularjs+MCSS开发的HTML5移动单页应用</a>
 <ul>
 <li><a href="#descript">概述</a></li>
 <li><a href="#keyword">核心内容</a></li>
 <li><a href="#show">app展示</a></li>
 </ul>
#<div id="#descript">概述</div>
nej-app是采用网易前端框架<a href="https://github.com/NEYouFan/nej-framework">NEJ</a>和<a href="https://github.com/regularjs/regular">Regularjs</a>的mini blog app，通过模块调度系统实现单页面应用。CSS预处理器采用<a href="https://github.com/leeluolee/mcss">MCSS</a>
本demo为前端代码，需结合<a href="https://github.com/luyanchen/node-blog/">API</a>使用。

本demo仅用于个人学习(持续更新中)。
 <ul>
 <li>前端：<a href="https://github.com/luyanchen/nej-regular-app/">基于NEJ+Regularjs+MCSS开发的HTML5移动单页应用</a></li>
 <li>后端：<a href="https://github.com/luyanchen/node-blog/">nodejs+express+mongodb</a></li>
 </ul>

<h4>app涉及NEJ主要特性包括</h4>
<ul>
    <li>依赖管理系统</li>
    <li>模板系统</li>
    <li>模块调度</li>
    <li>组件系统</li>
    <li>远程调用</li>
    <li>缓存cache</li>
    <li>常用模块:element,event,util,chain,ajax,jst,cache,tab,list等</li>
 </ul>
 
<h4>app涉及Regular主要特性包括</h4>
 <ul>
    <li>模板</li>
    <li>组件</li>
    <li>指令</li>
    <li>事件</li>
    <li>过滤器</li>
 </ul>
 
 <h4>run</h4>
 1. 启动服务器（<a href="https://github.com/luyanchen/node-blog/">nodejs+express+mongodb</a>）
 2. 将/nej-regular-app/src/html/app.html和/nej-regular-app/src/html/login.html中的API_PATH改为服务器API路径(如：<a href="https://github.com/luyanchen/node-blog/">nodejs+express+mongodb</a>中的地址为http://localhost:3000/)
 
 3.注册地址：/nej-regular-app/src/html/login.html/#/m/register/
 
 4.登录地址：/nej-regular-app/src/html/login.html
 
 5.首页地址：/nej-regular-app/src/html/app.html
 
 
 
#<div id="keyword">核心内容</div> 
 <ul>
 <li><a href="#module">模块组成</a></li>
 <li><a href="#util">自定义功能方法pro/util.js</a></li>
 <li><a href="#cache">列表缓存</a></li>
 <li><a href="#login">登录验证</a></li>
 <li><a href="#refresh">上拉刷新下拉加载</a></li>
 <li><a href="#tab">重写tab</a></li>
 <li><a href="#regular">Regular组件</a></li>
 </ul>
<h4><div id="module">模块组成</div></h4>
目录两个入口文件：app.html和login.html,分别对应两个单页面。
<div><img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/14.png" width = "30%" /></div>
每个页面对应一个布局模块+子功能模块，如：博客正文：
<pre><code>                  
//博客正文
'/m/index/detail/':{
   module:'module/layout/index.detail/index.html',//布局
   composite:{
     content:'/?/blog/detail/content/',//博客正文
     comment:'/?/blog/detail/comment/',//博客评论
   }
}
</code></pre>
<h4><div id="util">自定义功能方法pro/util.js</div></h4>
javascript/pro/util.js文件用于存放自定义功能，其中_$ajaxSend用于请求api，返回格式为
{
code:请求代码,
data:请求数据,
error:错误信息
}
_$ajaxListSend为配合list.js返回，直接将data传给回调函数。

<h4><div id="cache">列表缓存</div></h4>
博客列表通过改写/nej/src/util/cache/下的list.js和absctract.js两个文件，实现列表缓存，并自定义列表缓存管理基类customlist.js,实现上拉刷新下拉加载时对应缓存项增删功能。代码对应javascript/cache/
其中首页的“推荐”“我的“和搜索中的list模块是同一个，通过class参数分别实例化CacheListCustom控件。
<h4><div id="login">登录验证</div></h4>
通过继承util/cache/storage，自定义本地存储JSON数据_$setJsonDataInStorage，将用户信息及token存放在localstorage。若未登录，跳转到登录页。
<h4><div id="refresh">上拉刷新下拉加载</div></h4>
自定义_initScroller方法判断上拉刷新和下拉加载，并触发缓存及列表加载（需要在移动端测试上拉刷新下拉加载效果）。
<h4><div id="tab">重写tab</div></h4>
底部菜单和首页顶部菜单用tab组件,由于在底部菜单切换时需要修改图片，因此在/pro/tab.js中重写了TabView的_$match方法，新增onchange事件，当切换新菜单时，对应替换图片。
<h4><div id="regular">Regular组件</div></h4>
每个模块对应一个Regular组件
<h5>module/blog/content/index.html</h5>

```html
<meta charset="utf-8"/>
<textarea name="txt" id="module-id-d7">
  <div></div>
</textarea>
<textarea name="txt" id="regular-rgl-7">    
<session>
  <article>
    <div class="m-article-wrap">
      <div class="top">
        <div class="title" id="wx-title">{data.title}</div>
        <div class="source-time">
          <div id="wx-source">{data.nickname}</div>
          <div id="wx-date">{data.publishTime|format:'yyyy-MM-dd HH:mm'}</div>
        </div>
      </div>
      <div class="content" >
        <div id="wx-content">{data.content}</div>
        <div class="readnum">
            <span>阅读({data.accessCount})</span>
            <span>评论({data.commentCount})</span>         
        </div>
      </div>
    </div>
  </article>
</session>
</textarea>
<!-- @TEMPLATE -->
<textarea name="css" data-src="./index.css"></textarea>
<textarea name="js"  data-src="./index.js"></textarea>
<!-- /@TEMPLATE -->
```

<h5>module/blog/content/index.js</h5>
Regular组件定义在__doBuild中，并在onrefresh中更新数据（如有需要）。
```javascript
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
    };
```
#<div id="show">app展示</div>
<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/1.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/2.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/15.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/3.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/4.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/5.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/6.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/7.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/8.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/9.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/10.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/11.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/12.png" width = "30%" />

<img src="https://github.com/luyanchen/nej-regular-app/blob/master/res/dispaly/13.png" width = "30%" />


 
