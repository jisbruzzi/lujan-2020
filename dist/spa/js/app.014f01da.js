(function(e){function t(t){for(var r,a,i=t[0],c=t[1],l=t[2],f=0,s=[];f<i.length;f++)a=i[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&s.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);p&&p(t);while(s.length)s.shift()();return u.push.apply(u,l||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(u.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={1:0},u=[];function a(e){return i.p+"js/"+({}[e]||e)+"."+{2:"24d09d70",3:"05538fc7",4:"853e3e77",5:"68e983d7"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var u,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=a(e);var l=new Error;u=function(t){c.onerror=c.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+u+")",l.name="ChunkLoadError",l.type=r,l.request=u,n[1](l)}o[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:c})}),12e4);c.onerror=c.onload=u,document.head.appendChild(c)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=t,c=c.slice();for(var f=0;f<c.length;f++)t(c[f]);var p=l;u.push([0,0]),n()})({0:function(e,t,n){e.exports=n("2f39")},"2f39":function(e,t,n){"use strict";n.r(t);var r=n("c973"),o=n.n(r),u=(n("7d6e"),n("e54f"),n("985d"),n("31cd"),n("2b0e")),a=n("1f91"),i=n("42d2"),c=n("b05d");u["a"].use(c["a"],{config:{},lang:a["a"],iconSet:i["a"]});var l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},f=[],p=n("60a3"),s=function(e,t,n,r){var o,u=arguments.length,a=u<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(a=(u<3?o(a):u>3?o(t,n,a):o(t,n))||a);return u>3&&a&&Object.defineProperty(t,n,a),a};let d=class extends p["c"]{};d=s([p["a"]],d);var h=d,v=h,y=n("2877"),b=Object(y["a"])(v,l,f,!1,null,null,null),m=b.exports,g=n("4bde"),O=n("8c4f");const j=[{path:"/",component:()=>Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"713b")),children:[{path:"",component:()=>Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"8b24"))},{path:"juego",component:()=>Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"60fa")),props:e=>{var t;const n=(null===(t=e.query.estado)||void 0===t?void 0:t.toString())||"{}";return{nombre:e.query.nombre,forma:e.query.forma,vidaDeOracion:e.query.vidaDeOracion,historial:e.query.historial||[],estado:JSON.parse(n)||{}}}}]},{path:"*",component:()=>Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"e51e"))}];var w=j,P=Object(g["route"])((function({Vue:e}){e.use(O["a"]);const t=new O["a"]({scrollBehavior:()=>({x:0,y:0}),routes:w,mode:"hash",base:""});return t})),x=function(){return q.apply(this,arguments)};function q(){return q=o()((function*(){const e="function"===typeof P?yield P({Vue:u["a"]}):P,t={router:e,render:e=>e(m),el:"#q-app"};return{app:t,router:e}})),q.apply(this,arguments)}function S(){return _.apply(this,arguments)}function _(){return _=o()((function*(){const{app:e,router:t}=yield x();new u["a"](e)})),_.apply(this,arguments)}S()},"31cd":function(e,t,n){}});