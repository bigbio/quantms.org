"use strict";(self["webpackChunkquantms_org"]=self["webpackChunkquantms_org"]||[]).push([[21],{531:(e,t,n)=>{n.d(t,{Z:()=>q});var o=n(6252),s=n(2262),a=n(7601);const r="focus-trap.focus-after-trapped",c="focus-trap.focus-after-released",u="focus-trap.focusout-prevented",l={cancelable:!0,bubbles:!1},i={cancelable:!0,bubbles:!1},d="focusAfterTrapped",f="focusAfterReleased",p=Symbol("elFocusTrap"),v=(0,s.iH)(),m=(0,s.iH)(0),E=(0,s.iH)(0);let y=0;const g=e=>{const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>{const t="INPUT"===e.tagName&&"hidden"===e.type;return e.disabled||e.hidden||t?NodeFilter.FILTER_SKIP:e.tabIndex>=0||e===document.activeElement?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});while(n.nextNode())t.push(n.currentNode);return t},k=(e,t)=>{for(const n of e)if(!w(n,t))return n},w=(e,t)=>{if("hidden"===getComputedStyle(e).visibility)return!0;while(e){if(t&&e===t)return!1;if("none"===getComputedStyle(e).display)return!0;e=e.parentElement}return!1},b=e=>{const t=g(e),n=k(t,e),o=k(t.reverse(),e);return[n,o]},h=e=>e instanceof HTMLInputElement&&"select"in e,C=(e,t)=>{if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),E.value=window.performance.now(),e!==n&&h(e)&&t&&e.select()}};function S(e,t){const n=[...e],o=e.indexOf(t);return-1!==o&&n.splice(o,1),n}const T=()=>{let e=[];const t=t=>{const n=e[0];n&&t!==n&&n.pause(),e=S(e,t),e.unshift(t)},n=t=>{var n,o;e=S(e,t),null==(o=null==(n=e[0])?void 0:n.resume)||o.call(n)};return{push:t,remove:n}},_=(e,t=!1)=>{const n=document.activeElement;for(const o of e)if(C(o,t),document.activeElement!==n)return},L=T(),U=()=>m.value>E.value,F=()=>{v.value="pointer",m.value=window.performance.now()},P=()=>{v.value="keyboard",m.value=window.performance.now()},N=()=>((0,o.bv)((()=>{0===y&&(document.addEventListener("mousedown",F),document.addEventListener("touchstart",F),document.addEventListener("keydown",P)),y++})),(0,o.Jd)((()=>{y--,y<=0&&(document.removeEventListener("mousedown",F),document.removeEventListener("touchstart",F),document.removeEventListener("keydown",P))})),{focusReason:v,lastUserFocusTimestamp:m,lastAutomatedFocusTimestamp:E}),I=e=>new CustomEvent(u,{...i,detail:e});var R=n(1446),K=n(4309),$=n(3299);let A=[];const j=e=>{const t=e;t.key===K.EVENT_CODE.esc&&A.forEach((e=>e(t)))},D=e=>{(0,o.bv)((()=>{0===A.length&&document.addEventListener("keydown",j),$.C5&&A.push(e)})),(0,o.Jd)((()=>{A=A.filter((t=>t!==e)),0===A.length&&$.C5&&document.removeEventListener("keydown",j)}))};var H=n(3577);const W=(0,o.aZ)({name:"ElFocusTrap",inheritAttrs:!1,props:{loop:Boolean,trapped:Boolean,focusTrapEl:Object,focusStartEl:{type:[Object,String],default:"first"}},emits:[d,f,"focusin","focusout","focusout-prevented","release-requested"],setup(e,{emit:t}){const n=(0,s.iH)();let u,i;const{focusReason:v}=N();D((n=>{e.trapped&&!m.paused&&t("release-requested",n)}));const m={paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}},E=n=>{if(!e.loop&&!e.trapped)return;if(m.paused)return;const{key:o,altKey:s,ctrlKey:a,metaKey:r,currentTarget:c,shiftKey:u}=n,{loop:l}=e,i=o===K.EVENT_CODE.tab&&!s&&!a&&!r,d=document.activeElement;if(i&&d){const e=c,[o,s]=b(e),a=o&&s;if(a)if(u||d!==s){if(u&&[o,e].includes(d)){const e=I({focusReason:v.value});t("focusout-prevented",e),e.defaultPrevented||(n.preventDefault(),l&&C(s,!0))}}else{const e=I({focusReason:v.value});t("focusout-prevented",e),e.defaultPrevented||(n.preventDefault(),l&&C(o,!0))}else if(d===e){const e=I({focusReason:v.value});t("focusout-prevented",e),e.defaultPrevented||n.preventDefault()}}};(0,o.JJ)(p,{focusTrapRef:n,onKeydown:E}),(0,o.YP)((()=>e.focusTrapEl),(e=>{e&&(n.value=e)}),{immediate:!0}),(0,o.YP)([n],(([e],[t])=>{e&&(e.addEventListener("keydown",E),e.addEventListener("focusin",w),e.addEventListener("focusout",h)),t&&(t.removeEventListener("keydown",E),t.removeEventListener("focusin",w),t.removeEventListener("focusout",h))}));const y=e=>{t(d,e)},k=e=>t(f,e),w=o=>{const a=(0,s.SU)(n);if(!a)return;const r=o.target,c=o.relatedTarget,l=r&&a.contains(r);if(!e.trapped){const e=c&&a.contains(c);e||(u=c)}l&&t("focusin",o),m.paused||e.trapped&&(l?i=r:C(i,!0))},h=o=>{const r=(0,s.SU)(n);if(!m.paused&&r)if(e.trapped){const n=o.relatedTarget;(0,a.Z)(n)||r.contains(n)||setTimeout((()=>{if(!m.paused&&e.trapped){const e=I({focusReason:v.value});t("focusout-prevented",e),e.defaultPrevented||C(i,!0)}}),0)}else{const e=o.target,n=e&&r.contains(e);n||t("focusout",o)}};async function S(){await(0,o.Y3)();const t=(0,s.SU)(n);if(t){L.push(m);const n=t.contains(document.activeElement)?u:document.activeElement;u=n;const s=t.contains(n);if(!s){const s=new Event(r,l);t.addEventListener(r,y),t.dispatchEvent(s),s.defaultPrevented||(0,o.Y3)((()=>{let o=e.focusStartEl;(0,H.HD)(o)||(C(o),document.activeElement!==o&&(o="first")),"first"===o&&_(g(t),!0),document.activeElement!==n&&"container"!==o||C(t)}))}}}function T(){const e=(0,s.SU)(n);if(e){e.removeEventListener(r,y);const t=new CustomEvent(c,{...l,detail:{focusReason:v.value}});e.addEventListener(c,k),e.dispatchEvent(t),t.defaultPrevented||"keyboard"!=v.value&&U()&&!e.contains(document.activeElement)||C(null!=u?u:document.body),e.removeEventListener(c,k),L.remove(m)}}return(0,o.bv)((()=>{e.trapped&&S(),(0,o.YP)((()=>e.trapped),(e=>{e?S():T()}))})),(0,o.Jd)((()=>{e.trapped&&T()})),{onKeydown:E}}});function Z(e,t,n,s,a,r){return(0,o.WI)(e.$slots,"default",{handleKeydown:e.onKeydown})}var q=(0,R.Z)(W,[["render",Z],["__file","/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]])},7534:(e,t,n)=>{n.d(t,{Ks:()=>y});var o=n(6252),s=n(3577),a=n(2262),r=n(9963),c=n(4181),u=n(5781),l=n(143),i=n(1446),d=n(1069),f=n(9143);const p=(0,o.aZ)({name:"ElTag"}),v=(0,o.aZ)({...p,props:l.F,emits:l.g,setup(e,{emit:t}){const n=e,l=(0,d.Cd)(),i=(0,f.s3)("tag"),p=(0,o.Fl)((()=>{const{type:e,hit:t,effect:o,closable:s,round:a}=n;return[i.b(),i.is("closable",s),i.m(e),i.m(l.value),i.m(o),i.is("hit",t),i.is("round",a)]})),v=e=>{t("close",e)},m=e=>{t("click",e)};return(e,t)=>e.disableTransitions?((0,o.wg)(),(0,o.iD)("span",{key:0,class:(0,s.C_)((0,a.SU)(p)),style:(0,s.j5)({backgroundColor:e.color}),onClick:m},[(0,o._)("span",{class:(0,s.C_)((0,a.SU)(i).e("content"))},[(0,o.WI)(e.$slots,"default")],2),e.closable?((0,o.wg)(),(0,o.j4)((0,a.SU)(c.gn),{key:0,class:(0,s.C_)((0,a.SU)(i).e("close")),onClick:(0,r.iM)(v,["stop"])},{default:(0,o.w5)((()=>[(0,o.Wm)((0,a.SU)(u.Close))])),_:1},8,["class","onClick"])):(0,o.kq)("v-if",!0)],6)):((0,o.wg)(),(0,o.j4)(r.uT,{key:1,name:`${(0,a.SU)(i).namespace.value}-zoom-in-center`,appear:""},{default:(0,o.w5)((()=>[(0,o._)("span",{class:(0,s.C_)((0,a.SU)(p)),style:(0,s.j5)({backgroundColor:e.color}),onClick:m},[(0,o._)("span",{class:(0,s.C_)((0,a.SU)(i).e("content"))},[(0,o.WI)(e.$slots,"default")],2),e.closable?((0,o.wg)(),(0,o.j4)((0,a.SU)(c.gn),{key:0,class:(0,s.C_)((0,a.SU)(i).e("close")),onClick:(0,r.iM)(v,["stop"])},{default:(0,o.w5)((()=>[(0,o.Wm)((0,a.SU)(u.Close))])),_:1},8,["class","onClick"])):(0,o.kq)("v-if",!0)],6)])),_:3},8,["name"]))}});var m=(0,i.Z)(v,[["__file","/home/runner/work/element-plus/element-plus/packages/components/tag/src/tag.vue"]]),E=n(2123);const y=(0,E.nz)(m)},143:(e,t,n)=>{n.d(t,{F:()=>a,g:()=>r});var o=n(5027),s=n(209);const a=(0,o.o8)({type:{type:String,values:["success","info","warning","danger",""],default:""},closable:Boolean,disableTransitions:Boolean,hit:Boolean,color:{type:String,default:""},size:{type:String,values:s.k,default:""},effect:{type:String,values:["dark","light","plain"],default:"light"},round:Boolean}),r={close:e=>e instanceof MouseEvent,click:e=>e instanceof MouseEvent}},2471:(e,t,n)=>{n(3241)},9379:(e,t,n)=>{n.d(t,{A:()=>r});var o=n(6252),s=n(2262),a=n(4721);const r=({from:e,replacement:t,scope:n,version:r,ref:c,type:u="API"},l)=>{(0,o.YP)((()=>(0,s.SU)(l)),(o=>{o&&(0,a.N)(n,`[${u}] ${e} is about to be deprecated in version ${r}, please use ${t} instead.\nFor more detail, please visit: ${c}\n`)}),{immediate:!0})}},3650:(e,t,n)=>{n.d(t,{fA:()=>s,kC:()=>a});var o=n(3577);const s=(e="")=>e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d"),a=e=>(0,o.kC)(e)}}]);
//# sourceMappingURL=21.bf4ac3dc.js.map