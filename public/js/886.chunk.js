(self.webpackChunkgitbook_clone=self.webpackChunkgitbook_clone||[]).push([[886],{82780:(e,t,n)=>{"use strict";n.d(t,{m:()=>f});var r=n(67294),a=n(94184),o=n.n(a),i=n(87248),c=n(59348),l=n(24623),u=n(82245);function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function f(e){var t,n,a,f,d,m=e.description,v=e.iconProps,b=e.clickHandler,p=e.label,y=e.activeActionIconLabel,h=e.dropdownComponent,g=void 0===h?null:h,w=(f=(0,r.useState)(!1),d=2,function(e){if(Array.isArray(e))return e}(f)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}}(f,d)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(f,d)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),S=w[0],E=w[1],O=o()("action-icon",(t={},n=c._7.IS_ACTIVE,a=void 0!==y?p===y:S,n in t?Object.defineProperty(t,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[n]=a,t));return r.createElement("div",{className:O,"data-class":"click flex-center",onClick:function(e){b(),E(!S),g&&(e.stopPropagation(),u.V.closeDropdowns())}},r.createElement(i.JO,Object.assign({},v)),m?r.createElement("div",{className:"action-icon-description"},m):l.v6,g?g({closeHandler:function(){return E(!1)}}):l.v6)}},89629:(e,t,n)=>{"use strict";n.d(t,{XY:()=>g});var r=n(67294),a=n(94184),o=n.n(a),i=n(87248),c=n(59348);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=n(73021);function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function f(e){var t,n,a,l,u,f=e.icon,d=e.iconClickHandler,m=(l=(0,r.useState)(!1),u=2,function(e){if(Array.isArray(e))return e}(l)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}}(l,u)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(l,u)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),v=m[0],b=m[1],p=o()("input-icon",(t={},n=c._7.IS_ACTIVE,a=v,n in t?Object.defineProperty(t,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[n]=a,t)),y={icon:f,height:24};return r.createElement("div",{className:p,"data-class":"click",onClick:function(){b(!v),d(!v)}},r.createElement(i.JO,Object.assign({},y)))}var d=n(78100),m=n(93042);function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var p=n(56340);function y(e){var t,n,a,i=e.item,l=e.selectedItemLabel,u=e.clickHandler,s=o()("select-item",(t={},n=c._7.IS_SELECTED,a=i.label===l,n in t?Object.defineProperty(t,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[n]=a,t));return r.createElement("div",{className:s,"data-class":"click",onClick:function(){u(i.label)}},i.value)}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var g={Button:function(e){var t,n=e.isLoading,a=void 0!==n&&n,u=e.isDisable,s=void 0!==u&&u,f=e.type,d=void 0===f?c.qh.PRIMARY:f,m=e.icon,v=e.value,b=e.clickHandler,p=o()("button",d,(l(t={},c._7.IS_DISABLE,s),l(t,c._7.IS_LOADING,a),t));return r.createElement("div",{className:p,"data-class":"click flex-center",onClick:function(e){e.stopPropagation(),s||a||b()}},a?r.createElement("div",{className:"lds-ellipsis"},r.createElement("div",null),r.createElement("div",null),r.createElement("div",null),r.createElement("div",null)):r.createElement(r.Fragment,null,m?r.createElement("div",{className:"button-icon"},r.createElement(i.JO,{icon:m,height:c.TN})):"",r.createElement("div",{className:"button-value"},v)))},Input:function(e){var t,n,a,i=e.value,l=e.placeholder,s=e.error,p=e.description,y=e.updateValue,h=e.inputIconProps,g=e.transformValue,w=(0,r.useRef)(null),S=(n=(0,r.useState)(!1),a=2,function(e){if(Array.isArray(e))return e}(n)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}}(n,a)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}(n,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),E=S[0],O=S[1],A=(0,d.U)(m.wd.ASSETS),I=o()("input",(v(t={},c._7.IS_ACTIVE,E),v(t,c._7.IS_ERROR,!!s),v(t,c._7.HAS_DESCRIPTION,!!p),t));return(0,r.useEffect)((function(){i.length>u.mN&&O(!0)}),[]),r.createElement("div",{className:I},r.createElement("div",{className:"input-container","data-class":"click shadow",onClick:function(){O(!0),w&&w.current&&w.current.focus()}},r.createElement("input",{ref:w,type:"text",className:"input-field",value:g?g(i):i,onFocus:function(){O(!0)},onBlur:function(){i.length===u.mN&&O(!1)},onChange:function(e){y(e.target.value)}}),r.createElement("div",{className:"input-placeholder"},l),h?r.createElement(f,Object.assign({},h)):""),r.createElement("div",{className:"input-error"},A.errors[s]),p?r.createElement("div",{className:"input-description"},p):"")},Select:function(e){var t,n,a,l,u,s=e.placeholder,f=e.selectedItemValue,d=e.selectedItemLabel,m=e.items,v=e.updateSelectedItem,b=(l=(0,r.useState)(!1),u=2,function(e){if(Array.isArray(e))return e}(l)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}}(l,u)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(l,u)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),g=b[0],w=b[1],S=o()("select",(t={},n=c._7.IS_OPEN,a=g,n in t?Object.defineProperty(t,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[n]=a,t)),E={icon:p.Z,className:"select-icon",height:28};function O(e){w(!1),v(e)}return r.createElement("div",{className:S},r.createElement("div",{className:"select-selected","data-class":"click shadow",onClick:function(){w(!g)}},r.createElement("div",{className:"select-placeholder"},s),r.createElement(i.ZP,Object.assign({},E)),f),r.createElement("div",{className:"select-items","data-class":"shadow"},m.map((function(e,t){var n={item:e,selectedItemLabel:d,clickHandler:O};return r.createElement(y,Object.assign({key:t},n))}))))},Radio:function(e){var t,n,a,i=e.label,l=e.isSelected,u=e.description,s=e.clickHanlder,f=o()("radio",(t={},a=l,(n=c._7.IS_SELECTED)in t?Object.defineProperty(t,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[n]=a,t));return r.createElement("div",{className:f,"data-class":"click",onClick:function(){s(i)}},r.createElement("div",{className:"radio-label","data-class":"flex-center"},r.createElement("span",null)),r.createElement("div",{className:"radio-description"},u))}}},93582:(e,t,n)=>{"use strict";n.d(t,{J:()=>l});var r=n(67294),a=n(87248),o=n(59348);function i(e){var t=e.item,n=e.clickHandler,i=(0,r.useRef)(null),c={icon:t.icon,height:o.TN,className:"dropdown-item-icon"};return r.createElement("div",{className:"dropdown-item","data-class":"click",onClick:function(){t.href&&i.current?(i.current.click(),n()):n(t.label)}},r.createElement(a.JO,Object.assign({},c)),r.createElement("div",{className:"dropdown-item-text"},t.text),t.href?r.createElement("a",{href:t.href,ref:i,target:"_blank"}):"")}var c=n(82245);function l(e){var t=e.items,n=e.itemClickHandler,a=e.dropdownName;return(0,r.useEffect)((function(){if(a){var e=new c.V;return e.subscribeDropdown(a,n),function(){e.unsubscribeDropdown(a)}}}),[]),r.createElement("div",{className:"dropdown","data-class":"shadow"},t.map((function(e,t){var a={item:e,clickHandler:n};return r.createElement(i,Object.assign({key:t},a))})),r.createElement("div",{className:"dropdown-arrow"}))}},12907:(e,t,n)=>{"use strict";n.d(t,{R:()=>b});var r=n(67294),a=n(67914),o=n(42953),i=n(39829),c=n(17384),l=n(86963),u=n(93582),s=n(59348),f=n(82245),d=n(78100),m=n(93042);function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function b(e){var t,n,b=e.closeHandler,p=(0,d.U)(m.wd.ASSETS).information,y=(t=(0,r.useState)(!1),n=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}}(t,n)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),h=y[0],g=y[1],w={items:[{icon:o.Z,text:p.original,href:"https://www.gitbook.com/"},{icon:a.Z,text:p.author,href:"https://github.com/shcherbak-ssa"},{icon:c.Z,text:p.rsschool,href:"https://rs.school/js/"},{icon:i.Z,text:p.design,href:"https://www.figma.com/file/GeEYptFLwavV7HMJcGyIn2/Gitbook-Clone"},{icon:l.Z,text:p.article,href:""}],itemClickHandler:function(){g(!1),b()},dropdownName:s.gd.INFORMATION};return(0,r.useEffect)((function(){f.V.subscribeDropdownForOpen(s.gd.INFORMATION,(function(){g(!0)}))}),[]),h?r.createElement(u.J,Object.assign({},w)):null}},61581:(e,t,n)=>{"use strict";n.d(t,{B:()=>u,D:()=>s});var r,a=n(22537),o=n(18534),i=n(50039),c=n(59348);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=(l(r={},c.jl.INFO,{icon:a.Z,height:18}),l(r,c.jl.LOGO,{icon:o.Z,width:20,height:24}),l(r,c.jl.SETTINGS,{icon:i.Z,height:18}),r),s=[c.jl.INFO,c.jl.LOGO]},82023:(e,t,n)=>{"use strict";n.d(t,{Z:()=>s});var r,a=n(24623),o=n(59348),i=n(61581),c=n(82245);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=(l(r={},o.jl.INFO,(function(){c.V.openDropdown(o.gd.INFORMATION)})),l(r,o.jl.LOGO,(function(){location.replace(location.origin)})),r);function s(e){var t=e.icons,n=e.iconPayloads,r=void 0===n?{}:n,o=e.activeActionIconLabel;return t.map((function(e){var t=a.v6,n=u[e],c=null;if(e in r){var l=r[e];t=l.description||t,n=l.clickHandler||n,c=l.dropdownComponent||c}var s=i.B[e];return Object.assign({iconProps:s,description:t,clickHandler:n,label:e,dropdownComponent:c},void 0!==o?{activeActionIconLabel:o}:{})}))}},78100:(e,t,n)=>{"use strict";n.d(t,{U:()=>i});var r=n(84751),a=n(73021),o=n(37290);function i(e){var t=o.B.get(a.cR.LANGUAGE_STORE).getLanguagePart(e);return(0,r.v9)(t)}},83709:(e,t,n)=>{"use strict";n.d(t,{W:()=>l});var r=n(67294),a=n(9044),o=n(73021),i=n(11718);function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function l(e){var t,n,l=e.dataLabel,u=void 0===l?o.s1.PASSWORD:l,s=e.descriptionLabel,f=(t=(0,r.useState)(!1),n=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(a)throw o}}return n}}(t,n)||function(e,t){if(e){if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),d=f[0],m=f[1],v={dataLabel:u,descriptionLabel:s},b=(0,i.H)(v);return Object.assign(Object.assign({},b),{updateValue:function(e){d||(e=function(e,t){var n=e.split("").reverse();return t.replace(/●/g,(function(){return n.pop()||""}))}(b.value,e)),b.updateValue(e)},inputIconProps:{icon:a.Z,iconClickHandler:function(e){m(e)}},transformValue:function(e){return d?e:e.replace(/[^\n]/gi,"●")}})}},68814:(e,t,n)=>{"use strict";n.d(t,{K:()=>i});var r=n(84751),a=n(73021),o=n(37290);function i(e){var t=o.B.get(a.cR.USER_DRAFT_STORE).getState(e);return(0,r.v9)(t)}},11718:(e,t,n)=>{"use strict";n.d(t,{H:()=>c});var r=n(68814),a=n(93042),o=n(78100),i=n(79470);function c(e){var t=e.dataLabel,n=e.descriptionLabel,c=(0,r.K)(t),l=c.value,u=c.error,s=function(e){return(0,o.U)(a.wd.USER_DRAFT)[e]}(t),f=(0,i._)(t);return Object.assign({value:l,error:u,placeholder:s.placeholder,updateValue:f},n?{description:s.description[n]}:{})}},79470:(e,t,n)=>{"use strict";n.d(t,{_:()=>o});var r=n(22669),a=n(96652);function o(e){return function(t){var n={value:t,dataLabel:e};a.D.emit(r.f$.UPDATE_VALUE,n)}}},22530:(e,t,n)=>{"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{o:()=>a});var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.body=document.body}var t,n;return t=e,(n=[{key:"setOveflowHidden",value:function(){return this.body.style.overflow="hidden",this}},{key:"removeOverflowHidden",value:function(){return this.body.style.overflow="",this}},{key:"addClass",value:function(e){return this.body.classList.add(e),this}},{key:"removeClass",value:function(e){return this.body.classList.remove(e),this}},{key:"toggleClass",value:function(e){return this.body.classList.toggle(e),this}},{key:"hasClass",value:function(e){return this.body.classList.contains(e)}}])&&r(t.prototype,n),e}()},82245:(e,t,n)=>{"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{V:()=>c});var o=new Map,i=new Map,c=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,c;return t=e,c=[{key:"closeDropdowns",value:function(){var e,t=function(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,o=function(){};return{s:o,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,l=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return c=e.done,e},e:function(e){l=!0,i=e},f:function(){try{c||null==n.return||n.return()}finally{if(l)throw i}}}}(o.values());try{for(t.s();!(e=t.n()).done;)(0,e.value)()}catch(e){t.e(e)}finally{t.f()}}},{key:"subscribeDropdownForOpen",value:function(e,t){i.set(e,t)}},{key:"openDropdown",value:function(e){i.get(e)()}}],(n=[{key:"subscribeDropdown",value:function(e,t){o.set(e,t)}},{key:"unsubscribeDropdown",value:function(e){o.delete(e)}}])&&a(t.prototype,n),c&&a(t,c),e}();window.addEventListener("click",c.closeDropdowns)}}]);