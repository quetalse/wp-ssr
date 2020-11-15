!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=18)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("react-router-dom")},function(e,t){e.exports=require("react-redux")},function(e,t){e.exports=require("redux-saga/effects")},function(e,t){e.exports=require("redux")},function(e,t){e.exports=require("react-router-config")},function(e,t){e.exports=require("react-helmet")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("redux-saga")},function(e){e.exports=JSON.parse('{"a":{"main":["client-styles.0adf6429de468b89d1a4.css","client-bundle.0adf6429de468b89d1a4.js"]}}')},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("redux-thunk")},function(e,t){e.exports=require("axios")},function(e,t){e.exports=require("@babel/polyfill")},function(e,t){e.exports=require("serialize-javascript")},function(e,t){},function(e,t,r){"use strict";r.r(t);r(15);var n=r(10),o=r.n(n),a=r(11),c=r.n(a),u=r(6),i=r.n(u),l=r(0),s=r.n(l),p=r(12),f=r(1),d=r(5),b=r(7),m=r.n(b),O=r(2),y=(r(16),{component:function(){return s.a.createElement("div",null,s.a.createElement("h1",null,"Home"),s.a.createElement(f.Link,{to:"/about"},"About"),s.a.createElement("br",null),s.a.createElement(f.Link,{to:"/todo"},"Todo"))}}),v={component:Object(O.connect)((function(e){return{hello:e.hello}}),{})((function(e){var t=e.hello,r=e.setHello;return s.a.createElement("div",null,s.a.createElement("h1",null,"About"),s.a.createElement(f.Link,{to:"/"},"Home"),s.a.createElement("br",null),t,s.a.createElement("button",{type:"button",onClick:function(){return r("HELLO")}},"Hello"))}))},_=function(){return{type:"SAGA_FETCH_TODOS"}},g={sagaFetchTodos:_},h={component:Object(O.connect)((function(e){return{todos:e.todos}}),g)((function(e){var t=e.todos;console.log("todos",t);var r=Object(O.useDispatch)();return s.a.createElement("div",null,s.a.createElement("h1",null,"Todo"),s.a.createElement(f.Link,{to:"/"},"Home"),s.a.createElement("br",null),"// ",s.a.createElement("button",{type:"button",onClick:function(){return r({type:"SAGA_FETCH_TODOS"})}},"Get"),s.a.createElement("br",null),t.data.map((function(e){return s.a.createElement("p",{key:e.id},e.title)})))}))},E={component:function(){return s.a.createElement("div",null,s.a.createElement("h1",null,"NotFound"))}},S=(r(17),function(e){var t=e.location,r=e.route;return s.a.createElement(s.a.Fragment,null,function(e){var t=e.pathname.toLowerCase();return s.a.createElement(u.Helmet,{link:[{href:t,rel:"canonical"}],meta:[{name:"viewport",content:"width=device-width, initial-scale=1"}]})}(t),Object(d.renderRoutes)(r.routes))});function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){x(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function x(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}S.defaultProps={route:null};var T=[j(j({},{component:S}),{},{routes:[j(j({},y),{},{path:"/",exact:!0}),j(j({},v),{},{path:"/about"}),j(j({},h),{},{path:"/todo"}),j({},E)]})],P=r(4),D=r(8),R=r.n(D),A=r(13),k=r.n(A);function I(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function L(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?I(Object(r),!0).forEach((function(t){C(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):I(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function C(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var q={data:[],loading:!1,error:!1},H=Object(P.combineReducers)({todos:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SUCCESS_FETCH_TODOS":return L(L({},e),{},{loading:!1,data:t.payload.data});case"FAILURE_FETCH_TODOS":return L(L({},e),{},{loading:!1,error:t.payload.data});default:return e}}});function F(e){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var N,M=R()(),U=[k.a,M],X="object"===("undefined"==typeof window?"undefined":F(window))&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({shouldHotReload:!1}):P.compose;"undefined"!=typeof window&&(N=window.__INITIAL_DATA__,delete window.__INITIAL_DATA__);var G=Object(P.createStore)(H,N,X(P.applyMiddleware.apply(void 0,U)));G.runSaga=M.run,console.log("store",G),G.close=function(){return G.dispatch(D.END)};var J=r(3),V=r(14),z=r.n(V),Y=regeneratorRuntime.mark($),B=regeneratorRuntime.mark(ee),K=regeneratorRuntime.mark(te),Q=regeneratorRuntime.mark(re);function W(e,t,r,n,o,a,c){try{var u=e[a](c),i=u.value}catch(e){return void r(e)}u.done?t(i):Promise.resolve(i).then(n,o)}var Z=function(){var e,t=(e=regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.a.get("https://jsonplaceholder.typicode.com/todos");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})),function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function c(e){W(a,n,o,c,u,"next",e)}function u(e){W(a,n,o,c,u,"throw",e)}c(void 0)}))});return function(){return t.apply(this,arguments)}}();function $(){var e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(J.call)(Z);case 3:return e=t.sent,t.next=6,Object(J.put)({type:"SUCCESS_FETCH_TODOS",payload:{data:e.data}});case 6:t.next=13;break;case 8:return t.prev=8,t.t0=t.catch(0),console.log(t.t0),t.next=13,Object(J.put)({type:"FAILURE_FETCH_TODOS",payload:{data:t.t0}});case 13:case"end":return t.stop()}}),Y,null,[[0,8]])}function ee(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(J.fork)($);case 2:case"end":return e.stop()}}),B)}function te(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Saga running");case 1:case"end":return e.stop()}}),K)}function re(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(J.all)([te(),Object(J.fork)(ee)]);case 2:case"end":return e.stop()}}),Q)}var ne=r(9),oe=m()();oe.use(m.a.static("build"));oe.get("*",(function(e,t,r){e.params[0].split("/")[2],Object(d.matchRoutes)(T,e.path);var n=c.a.resolve("./build/template.html");G.runSaga(re).done.then((function(){var r={},a=function(e,t,r){return Object(p.renderToString)(s.a.createElement(O.Provider,{store:t},s.a.createElement(f.StaticRouter,{location:e.path,context:r},Object(d.renderRoutes)(T))))}(e,G,r);r.notFound&&t.status(404),o.a.readFile(n,"utf-8",(function(e,r){if(e)return console.log("Something went wrong:",e),t.status(500).send("Oops, better luck next time!");var n=i.a.renderStatic();return r=(r=(r=(r=(r=(r=(r=r.replace("__STYLES__","/".concat(ne.a.main[0]))).replace("__LOADER__","")).replace('<div id="root"></div>','<div id="root">'.concat(a,"</div>"))).replace("<title></title>",n.title.toString())).replace('<meta name="description" content=""/>',n.meta.toString())).replace("<script>__INITIAL_DATA__<\/script>","<script>window.__INITIAL_DATA__ = ".concat(JSON.stringify(G.getState()),";<\/script>"))).replace("__CLIENT__SCRIPTS__","/".concat(ne.a.main[1])),t.send(r)}))})),G.close()})),oe.listen(3e3,(function(){console.log("😎 Server on port 3000")}))}]);