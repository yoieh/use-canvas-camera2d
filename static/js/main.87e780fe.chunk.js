(this["webpackJsonpuse-canvas-camera2d-example"]=this["webpackJsonpuse-canvas-camera2d-example"]||[]).push([[0],{11:function(e,t,n){"use strict";n.r(t);n(6);var r=n(0),u=n.n(r),c=n(3),o=n.n(c),a=n(1),s=n(4),f=Object.freeze({x:0,y:0}),i=window.devicePixelRatio,l=void 0===i?1:i;function v(e,t){return{x:e.x-t.x,y:e.y-t.y}}function d(e,t){return{x:e.x+t.x,y:e.y+t.y}}var m=function(){var e=Object(r.useRef)(null),t=function(e,t,n){void 0===t&&(t=0),void 0===n&&(n=0);var u=Object(r.useState)(null),c=u[0],o=u[1],a=Object(r.useState)(1),s=a[0],i=a[1],m=Object(r.useState)(f),x=m[0],y=m[1],b=Object(r.useState)(f),p=b[0],O=b[1],E=Object(r.useState)(f),j=E[0],h=E[1],w=Object(r.useRef)(!1),L=Object(r.useRef)(f),g=Object(r.useRef)(f),S=Object(r.useCallback)((function(e){e&&!w.current&&(e.canvas.width=t*l,e.canvas.height=n*l,e.scale(l,l),i(1),o(e),y(f),O(f),h(f),g.current=f,L.current=f,w.current=!0)}),[t,n]),R=Object(r.useCallback)((function(e){if(c){var t=L.current,n={x:e.pageX,y:e.pageY};L.current=n;var r=v(n,t);y((function(e){return d(e,r)}))}}),[c]),T=Object(r.useCallback)((function(){document.removeEventListener("mousemove",R),document.removeEventListener("mouseup",T)}),[R]),P=Object(r.useCallback)((function(e){document.addEventListener("mousemove",R),document.addEventListener("mouseup",T),L.current={x:e.pageX,y:e.pageY}}),[R,T]),k=Object(r.useCallback)((function(e,t){if(c){var n=c.getTransform();return{x:e-n.e,y:t-n.f}}return f}),[c]);return Object(r.useLayoutEffect)((function(){if(null!==e&&void 0!==e&&e.current){var t=e.current.getContext("2d");t&&S(t)}}),[S,n,t]),Object(r.useLayoutEffect)((function(){if(c&&g.current){var e=function(e,t){return{x:e.x/t,y:e.y/t}}(v(x,g.current),s);c.translate(e.x,e.y),h((function(t){return v(t,e)})),w.current=!1}}),[c,x,s]),Object(r.useEffect)((function(){var t=null===e||void 0===e?void 0:e.current;if(null!==t)return t&&(t.addEventListener("mousemove",n),t.addEventListener("wheel",n)),function(){t&&(t.removeEventListener("mousemove",n),t.removeEventListener("wheel",n))};function n(t){if(t.preventDefault(),null!==e&&void 0!==e&&e.current){var n={x:t.clientX,y:t.clientY},r={x:e.current.offsetLeft,y:e.current.offsetTop};O(v(n,r))}}}),[]),Object(r.useEffect)((function(){var t=null===e||void 0===e?void 0:e.current;if(null!==t)return t&&t.addEventListener("wheel",n),function(){return t&&t.removeEventListener("wheel",n)};function n(e){if(e.preventDefault(),c){var t=1-e.deltaY/500,n={x:p.x/s*(1-1/t),y:p.y/s*(1-1/t)},r=d(j,n);c.translate(j.x,j.y),c.scale(t,t),c.translate(-r.x,-r.y),h(r),i(s*t),w.current=!1}}}),[c,p.x,p.y,j,s]),Object(r.useEffect)((function(){g.current=x}),[x]),{context:c,setContext:o,scale:s,setScale:i,offset:x,setOffset:y,mousePos:p,setMousePos:O,viewportTopLeft:j,setViewportTopLeft:h,isResetRef:w,lastMousePosRef:L,lastOffsetRef:g,startPan:P,reset:S,mouseMove:R,mouseUp:T,getTransformedPoint:k}}(e,400,400),n=t.context,c=t.viewportTopLeft,o=t.scale,i=t.offset,m=t.startPan,y=t.reset,b=t.getTransformedPoint,p=Object(r.useState)({x:190,y:190,w:20,h:20,color:x()}),O=Object(s.a)(p,2),E=O[0],j=O[1];return Object(r.useLayoutEffect)((function(){if(n){var e=n.getTransform();n.canvas.width=null===n||void 0===n?void 0:n.canvas.width,n.setTransform(e),n.fillStyle=E.color,n.fillRect(E.x,E.y,20,20),n.arc(c.x,c.y,5,0,2*Math.PI),n.fillStyle="red",n.fill()}}),[400,400,n,o,i,c,E.color,E.x,E.y]),u.a.createElement("div",null,u.a.createElement("button",{onClick:function(){return n&&y(n)}},"Reset"),u.a.createElement("pre",null,"scale: ",o),u.a.createElement("pre",null,"offset: ",JSON.stringify(i)),u.a.createElement("pre",null,"viewportTopLeft: ",JSON.stringify(c)),u.a.createElement("canvas",{onMouseUp:function(e){if(0===e.button){var t=b(e.nativeEvent.offsetX,e.nativeEvent.offsetY);t.x>=E.x&&t.x<=E.x+20&&t.y>=E.y&&t.y<=E.y+20&&j(Object(a.a)(Object(a.a)({},E),{},{color:x()}))}},onMouseDown:function(e){1===e.button&&m(e)},ref:e,id:"canvas",width:400,height:400}))};function x(){return"#"+Math.random().toString(16).slice(2,8)}o.a.render(u.a.createElement(m,null),document.getElementById("root"))},5:function(e,t,n){e.exports=n(11)},6:function(e,t,n){}},[[5,1,2]]]);
//# sourceMappingURL=main.87e780fe.chunk.js.map