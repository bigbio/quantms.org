"use strict";(self["webpackChunkquantms_org"]=self["webpackChunkquantms_org"]||[]).push([[850],{8032:(t,e,r)=>{function n(t,e){o(t)&&(t="100%");var r=i(t);return t=360===e?t:Math.min(e,Math.max(0,parseFloat(t))),r&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:(t=360===e?(t<0?t%e+e:t%e)/parseFloat(String(e)):t%e/parseFloat(String(e)),t)}function a(t){return Math.min(1,Math.max(0,t))}function o(t){return"string"===typeof t&&-1!==t.indexOf(".")&&1===parseFloat(t)}function i(t){return"string"===typeof t&&-1!==t.indexOf("%")}function s(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function h(t){return t<=1?"".concat(100*Number(t),"%"):t}function f(t){return 1===t.length?"0"+t:String(t)}function c(t,e,r){return{r:255*n(t,255),g:255*n(e,255),b:255*n(r,255)}}function u(t,e,r){t=n(t,255),e=n(e,255),r=n(r,255);var a=Math.max(t,e,r),o=Math.min(t,e,r),i=0,s=0,h=(a+o)/2;if(a===o)s=0,i=0;else{var f=a-o;switch(s=h>.5?f/(2-a-o):f/(a+o),a){case t:i=(e-r)/f+(e<r?6:0);break;case e:i=(r-t)/f+2;break;case r:i=(t-e)/f+4;break;default:break}i/=6}return{h:i,s,l:h}}function l(t,e,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+6*r*(e-t):r<.5?e:r<2/3?t+(e-t)*(2/3-r)*6:t}function d(t,e,r){var a,o,i;if(t=n(t,360),e=n(e,100),r=n(r,100),0===e)o=r,i=r,a=r;else{var s=r<.5?r*(1+e):r+e-r*e,h=2*r-s;a=l(h,s,t+1/3),o=l(h,s,t),i=l(h,s,t-1/3)}return{r:255*a,g:255*o,b:255*i}}function g(t,e,r){t=n(t,255),e=n(e,255),r=n(r,255);var a=Math.max(t,e,r),o=Math.min(t,e,r),i=0,s=a,h=a-o,f=0===a?0:h/a;if(a===o)i=0;else{switch(a){case t:i=(e-r)/h+(e<r?6:0);break;case e:i=(r-t)/h+2;break;case r:i=(t-e)/h+4;break;default:break}i/=6}return{h:i,s:f,v:s}}function b(t,e,r){t=6*n(t,360),e=n(e,100),r=n(r,100);var a=Math.floor(t),o=t-a,i=r*(1-e),s=r*(1-o*e),h=r*(1-(1-o)*e),f=a%6,c=[r,s,i,i,h,r][f],u=[h,r,r,s,i,i][f],l=[i,i,h,r,r,s][f];return{r:255*c,g:255*u,b:255*l}}function p(t,e,r,n){var a=[f(Math.round(t).toString(16)),f(Math.round(e).toString(16)),f(Math.round(r).toString(16))];return n&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0):a.join("")}function v(t,e,r,n,a){var o=[f(Math.round(t).toString(16)),f(Math.round(e).toString(16)),f(Math.round(r).toString(16)),f(m(n))];return a&&o[0].startsWith(o[0].charAt(1))&&o[1].startsWith(o[1].charAt(1))&&o[2].startsWith(o[2].charAt(1))&&o[3].startsWith(o[3].charAt(1))?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0)+o[3].charAt(0):o.join("")}function m(t){return Math.round(255*parseFloat(t)).toString(16)}function y(t){return x(t)/255}function x(t){return parseInt(t,16)}function w(t){return{r:t>>16,g:(65280&t)>>8,b:255&t}}r.d(e,{C:()=>T});var M={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};function k(t){var e={r:0,g:0,b:0},r=1,n=null,a=null,o=null,i=!1,f=!1;return"string"===typeof t&&(t=q(t)),"object"===typeof t&&(C(t.r)&&C(t.g)&&C(t.b)?(e=c(t.r,t.g,t.b),i=!0,f="%"===String(t.r).substr(-1)?"prgb":"rgb"):C(t.h)&&C(t.s)&&C(t.v)?(n=h(t.s),a=h(t.v),e=b(t.h,n,a),i=!0,f="hsv"):C(t.h)&&C(t.s)&&C(t.l)&&(n=h(t.s),o=h(t.l),e=d(t.h,n,o),i=!0,f="hsl"),Object.prototype.hasOwnProperty.call(t,"a")&&(r=t.a)),r=s(r),{ok:i,format:t.format||f,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:r}}var S="[-\\+]?\\d+%?",A="[-\\+]?\\d*\\.\\d+%?",H="(?:".concat(A,")|(?:").concat(S,")"),F="[\\s|\\(]+(".concat(H,")[,|\\s]+(").concat(H,")[,|\\s]+(").concat(H,")\\s*\\)?"),R="[\\s|\\(]+(".concat(H,")[,|\\s]+(").concat(H,")[,|\\s]+(").concat(H,")[,|\\s]+(").concat(H,")\\s*\\)?"),N={CSS_UNIT:new RegExp(H),rgb:new RegExp("rgb"+F),rgba:new RegExp("rgba"+R),hsl:new RegExp("hsl"+F),hsla:new RegExp("hsla"+R),hsv:new RegExp("hsv"+F),hsva:new RegExp("hsva"+R),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function q(t){if(t=t.trim().toLowerCase(),0===t.length)return!1;var e=!1;if(M[t])t=M[t],e=!0;else if("transparent"===t)return{r:0,g:0,b:0,a:0,format:"name"};var r=N.rgb.exec(t);return r?{r:r[1],g:r[2],b:r[3]}:(r=N.rgba.exec(t),r?{r:r[1],g:r[2],b:r[3],a:r[4]}:(r=N.hsl.exec(t),r?{h:r[1],s:r[2],l:r[3]}:(r=N.hsla.exec(t),r?{h:r[1],s:r[2],l:r[3],a:r[4]}:(r=N.hsv.exec(t),r?{h:r[1],s:r[2],v:r[3]}:(r=N.hsva.exec(t),r?{h:r[1],s:r[2],v:r[3],a:r[4]}:(r=N.hex8.exec(t),r?{r:x(r[1]),g:x(r[2]),b:x(r[3]),a:y(r[4]),format:e?"name":"hex8"}:(r=N.hex6.exec(t),r?{r:x(r[1]),g:x(r[2]),b:x(r[3]),format:e?"name":"hex"}:(r=N.hex4.exec(t),r?{r:x(r[1]+r[1]),g:x(r[2]+r[2]),b:x(r[3]+r[3]),a:y(r[4]+r[4]),format:e?"name":"hex8"}:(r=N.hex3.exec(t),!!r&&{r:x(r[1]+r[1]),g:x(r[2]+r[2]),b:x(r[3]+r[3]),format:e?"name":"hex"})))))))))}function C(t){return Boolean(N.CSS_UNIT.exec(String(t)))}var T=function(){function t(e,r){var n;if(void 0===e&&(e=""),void 0===r&&(r={}),e instanceof t)return e;"number"===typeof e&&(e=w(e)),this.originalInput=e;var a=k(e);this.originalInput=e,this.r=a.r,this.g=a.g,this.b=a.b,this.a=a.a,this.roundA=Math.round(100*this.a)/100,this.format=null!==(n=r.format)&&void 0!==n?n:a.format,this.gradientType=r.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=a.ok}return t.prototype.isDark=function(){return this.getBrightness()<128},t.prototype.isLight=function(){return!this.isDark()},t.prototype.getBrightness=function(){var t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3},t.prototype.getLuminance=function(){var t,e,r,n=this.toRgb(),a=n.r/255,o=n.g/255,i=n.b/255;return t=a<=.03928?a/12.92:Math.pow((a+.055)/1.055,2.4),e=o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4),r=i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4),.2126*t+.7152*e+.0722*r},t.prototype.getAlpha=function(){return this.a},t.prototype.setAlpha=function(t){return this.a=s(t),this.roundA=Math.round(100*this.a)/100,this},t.prototype.isMonochrome=function(){var t=this.toHsl().s;return 0===t},t.prototype.toHsv=function(){var t=g(this.r,this.g,this.b);return{h:360*t.h,s:t.s,v:t.v,a:this.a}},t.prototype.toHsvString=function(){var t=g(this.r,this.g,this.b),e=Math.round(360*t.h),r=Math.round(100*t.s),n=Math.round(100*t.v);return 1===this.a?"hsv(".concat(e,", ").concat(r,"%, ").concat(n,"%)"):"hsva(".concat(e,", ").concat(r,"%, ").concat(n,"%, ").concat(this.roundA,")")},t.prototype.toHsl=function(){var t=u(this.r,this.g,this.b);return{h:360*t.h,s:t.s,l:t.l,a:this.a}},t.prototype.toHslString=function(){var t=u(this.r,this.g,this.b),e=Math.round(360*t.h),r=Math.round(100*t.s),n=Math.round(100*t.l);return 1===this.a?"hsl(".concat(e,", ").concat(r,"%, ").concat(n,"%)"):"hsla(".concat(e,", ").concat(r,"%, ").concat(n,"%, ").concat(this.roundA,")")},t.prototype.toHex=function(t){return void 0===t&&(t=!1),p(this.r,this.g,this.b,t)},t.prototype.toHexString=function(t){return void 0===t&&(t=!1),"#"+this.toHex(t)},t.prototype.toHex8=function(t){return void 0===t&&(t=!1),v(this.r,this.g,this.b,this.a,t)},t.prototype.toHex8String=function(t){return void 0===t&&(t=!1),"#"+this.toHex8(t)},t.prototype.toHexShortString=function(t){return void 0===t&&(t=!1),1===this.a?this.toHexString(t):this.toHex8String(t)},t.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},t.prototype.toRgbString=function(){var t=Math.round(this.r),e=Math.round(this.g),r=Math.round(this.b);return 1===this.a?"rgb(".concat(t,", ").concat(e,", ").concat(r,")"):"rgba(".concat(t,", ").concat(e,", ").concat(r,", ").concat(this.roundA,")")},t.prototype.toPercentageRgb=function(){var t=function(t){return"".concat(Math.round(100*n(t,255)),"%")};return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}},t.prototype.toPercentageRgbString=function(){var t=function(t){return Math.round(100*n(t,255))};return 1===this.a?"rgb(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%)"):"rgba(".concat(t(this.r),"%, ").concat(t(this.g),"%, ").concat(t(this.b),"%, ").concat(this.roundA,")")},t.prototype.toName=function(){if(0===this.a)return"transparent";if(this.a<1)return!1;for(var t="#"+p(this.r,this.g,this.b,!1),e=0,r=Object.entries(M);e<r.length;e++){var n=r[e],a=n[0],o=n[1];if(t===o)return a}return!1},t.prototype.toString=function(t){var e=Boolean(t);t=null!==t&&void 0!==t?t:this.format;var r=!1,n=this.a<1&&this.a>=0,a=!e&&n&&(t.startsWith("hex")||"name"===t);return a?"name"===t&&0===this.a?this.toName():this.toRgbString():("rgb"===t&&(r=this.toRgbString()),"prgb"===t&&(r=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(r=this.toHexString()),"hex3"===t&&(r=this.toHexString(!0)),"hex4"===t&&(r=this.toHex8String(!0)),"hex8"===t&&(r=this.toHex8String()),"name"===t&&(r=this.toName()),"hsl"===t&&(r=this.toHslString()),"hsv"===t&&(r=this.toHsvString()),r||this.toHexString())},t.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},t.prototype.clone=function(){return new t(this.toString())},t.prototype.lighten=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.l+=e/100,r.l=a(r.l),new t(r)},t.prototype.brighten=function(e){void 0===e&&(e=10);var r=this.toRgb();return r.r=Math.max(0,Math.min(255,r.r-Math.round(-e/100*255))),r.g=Math.max(0,Math.min(255,r.g-Math.round(-e/100*255))),r.b=Math.max(0,Math.min(255,r.b-Math.round(-e/100*255))),new t(r)},t.prototype.darken=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.l-=e/100,r.l=a(r.l),new t(r)},t.prototype.tint=function(t){return void 0===t&&(t=10),this.mix("white",t)},t.prototype.shade=function(t){return void 0===t&&(t=10),this.mix("black",t)},t.prototype.desaturate=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.s-=e/100,r.s=a(r.s),new t(r)},t.prototype.saturate=function(e){void 0===e&&(e=10);var r=this.toHsl();return r.s+=e/100,r.s=a(r.s),new t(r)},t.prototype.greyscale=function(){return this.desaturate(100)},t.prototype.spin=function(e){var r=this.toHsl(),n=(r.h+e)%360;return r.h=n<0?360+n:n,new t(r)},t.prototype.mix=function(e,r){void 0===r&&(r=50);var n=this.toRgb(),a=new t(e).toRgb(),o=r/100,i={r:(a.r-n.r)*o+n.r,g:(a.g-n.g)*o+n.g,b:(a.b-n.b)*o+n.b,a:(a.a-n.a)*o+n.a};return new t(i)},t.prototype.analogous=function(e,r){void 0===e&&(e=6),void 0===r&&(r=30);var n=this.toHsl(),a=360/r,o=[this];for(n.h=(n.h-(a*e>>1)+720)%360;--e;)n.h=(n.h+a)%360,o.push(new t(n));return o},t.prototype.complement=function(){var e=this.toHsl();return e.h=(e.h+180)%360,new t(e)},t.prototype.monochromatic=function(e){void 0===e&&(e=6);var r=this.toHsv(),n=r.h,a=r.s,o=r.v,i=[],s=1/e;while(e--)i.push(new t({h:n,s:a,v:o})),o=(o+s)%1;return i},t.prototype.splitcomplement=function(){var e=this.toHsl(),r=e.h;return[this,new t({h:(r+72)%360,s:e.s,l:e.l}),new t({h:(r+216)%360,s:e.s,l:e.l})]},t.prototype.onBackground=function(e){var r=this.toRgb(),n=new t(e).toRgb(),a=r.a+n.a*(1-r.a);return new t({r:(r.r*r.a+n.r*n.a*(1-r.a))/a,g:(r.g*r.a+n.g*n.a*(1-r.a))/a,b:(r.b*r.a+n.b*n.a*(1-r.a))/a,a})},t.prototype.triad=function(){return this.polyad(3)},t.prototype.tetrad=function(){return this.polyad(4)},t.prototype.polyad=function(e){for(var r=this.toHsl(),n=r.h,a=[this],o=360/e,i=1;i<e;i++)a.push(new t({h:(n+i*o)%360,s:r.s,l:r.l}));return a},t.prototype.equals=function(e){return this.toRgbString()===new t(e).toRgbString()},t}()},6274:(t,e,r)=>{r.d(e,{l:()=>h});var n=r(6252),a=r(5937),o=r(4721);const i=["class","style"],s=/^on[A-Z]/,h=(t={})=>{const{excludeListeners:e=!1,excludeKeys:r}=t,h=(0,n.Fl)((()=>((null==r?void 0:r.value)||[]).concat(i))),f=(0,n.FN)();return f?(0,n.Fl)((()=>{var t;return(0,a.Z)(Object.entries(null==(t=f.proxy)?void 0:t.$attrs).filter((([t])=>!h.value.includes(t)&&!(e&&s.test(t)))))})):((0,o.N)("use-attrs","getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function"),(0,n.Fl)((()=>({}))))}},9379:(t,e,r)=>{r.d(e,{A:()=>i});var n=r(6252),a=r(2262),o=r(4721);const i=({from:t,replacement:e,scope:r,version:i,ref:s,type:h="API"},f)=>{(0,n.YP)((()=>(0,a.SU)(f)),(n=>{n&&(0,o.N)(r,`[${h}] ${t} is about to be deprecated in version ${i}, please use ${e} instead.\nFor more detail, please visit: ${s}\n`)}),{immediate:!0})}},7647:(t,e,r)=>{r.d(e,{JX:()=>i,zT:()=>s});var n=r(7675),a=r(3299);const o=(t,e)=>{if(!a.C5)return!1;const r={undefined:"overflow",true:"overflow-y",false:"overflow-x"}[String(e)],o=(0,n.C2)(t,r);return["scroll","auto","overlay"].some((t=>o.includes(t)))},i=(t,e)=>{if(!a.C5)return;let r=t;while(r){if([window,document,document.documentElement].includes(r))return window;if(o(r,e))return r;r=r.parentNode}return r};function s(t,e){if(!a.C5)return;if(!e)return void(t.scrollTop=0);const r=[];let n=e.offsetParent;while(null!==n&&t!==n&&t.contains(n))r.push(n),n=n.offsetParent;const o=e.offsetTop+r.reduce(((t,e)=>t+e.offsetTop),0),i=o+e.offsetHeight,s=t.scrollTop,h=s+t.clientHeight;o<s?t.scrollTop=o:i>h&&(t.scrollTop=i-t.clientHeight)}},5450:(t,e,r)=>{r.d(e,{N:()=>n});const n=t=>t}}]);
//# sourceMappingURL=850.08f26f76.js.map