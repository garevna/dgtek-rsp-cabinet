(function(e){function r(r){for(var o,n,i=r[0],c=r[1],d=r[2],u=0,p=[];u<i.length;u++)n=i[u],Object.prototype.hasOwnProperty.call(s,n)&&s[n]&&p.push(s[n][0]),s[n]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);l&&l(r);while(p.length)p.shift()();return a.push.apply(a,d||[]),t()}function t(){for(var e,r=0;r<a.length;r++){for(var t=a[r],o=!0,n=1;n<t.length;n++){var i=t[n];0!==s[i]&&(o=!1)}o&&(a.splice(r--,1),e=c(c.s=t[0]))}return e}var o={},n={app:0},s={app:0},a=[];function i(e){return c.p+"js/"+({"service-delivery-update":"service-delivery-update"}[e]||e)+"."+{"chunk-ace88f5c":"2b8774d1","chunk-0a117e6a":"a3b97d88","chunk-0eb3951e":"71faeb35","chunk-2d0b5fba":"2d449019","chunk-3db6730e":"2af6d8f0","chunk-45897113":"0c9ea7b6","chunk-717f2fb0":"355dfec1","chunk-edcb74ca":"0071680b","chunk-588c9ff8":"aff9d329","service-delivery-update":"13f592f2"}[e]+".js"}function c(r){if(o[r])return o[r].exports;var t=o[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.e=function(e){var r=[],t={"chunk-ace88f5c":1,"chunk-0a117e6a":1,"chunk-0eb3951e":1,"chunk-3db6730e":1,"chunk-45897113":1,"chunk-717f2fb0":1,"chunk-edcb74ca":1,"chunk-588c9ff8":1};n[e]?r.push(n[e]):0!==n[e]&&t[e]&&r.push(n[e]=new Promise((function(r,t){for(var o="css/"+({"service-delivery-update":"service-delivery-update"}[e]||e)+"."+{"chunk-ace88f5c":"5048aff4","chunk-0a117e6a":"9d21c0d7","chunk-0eb3951e":"9d21c0d7","chunk-2d0b5fba":"31d6cfe0","chunk-3db6730e":"991b1b3b","chunk-45897113":"e6f54a19","chunk-717f2fb0":"089191c3","chunk-edcb74ca":"49830f27","chunk-588c9ff8":"e38bfc95","service-delivery-update":"31d6cfe0"}[e]+".css",s=c.p+o,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var d=a[i],u=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(u===o||u===s))return r()}var p=document.getElementsByTagName("style");for(i=0;i<p.length;i++){d=p[i],u=d.getAttribute("data-href");if(u===o||u===s)return r()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=r,l.onerror=function(r){var o=r&&r.target&&r.target.src||s,a=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=o,delete n[e],l.parentNode.removeChild(l),t(a)},l.href=s;var f=document.getElementsByTagName("head")[0];f.appendChild(l)})).then((function(){n[e]=0})));var o=s[e];if(0!==o)if(o)r.push(o[2]);else{var a=new Promise((function(r,t){o=s[e]=[r,t]}));r.push(o[2]=a);var d,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=i(e);var p=new Error;d=function(r){u.onerror=u.onload=null,clearTimeout(l);var t=s[e];if(0!==t){if(t){var o=r&&("load"===r.type?"missing":r.type),n=r&&r.target&&r.target.src;p.message="Loading chunk "+e+" failed.\n("+o+": "+n+")",p.name="ChunkLoadError",p.type=o,p.request=n,t[1](p)}s[e]=void 0}};var l=setTimeout((function(){d({type:"timeout",target:u})}),12e4);u.onerror=u.onload=d,document.head.appendChild(u)}return Promise.all(r)},c.m=e,c.c=o,c.d=function(e,r,t){c.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,r){if(1&r&&(e=c(e)),8&r)return e;if(4&r&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(c.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)c.d(t,o,function(r){return e[r]}.bind(null,o));return t},c.n=function(e){var r=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(r,"a",r),r},c.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},c.p="/dgtek-rsp-cabinet/",c.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],u=d.push.bind(d);d.push=r,d=d.slice();for(var p=0;p<d.length;p++)r(d[p]);var l=u;a.push([0,"chunk-vendors"]),t()})({0:function(e,r,t){e.exports=t("56d7")},"034f":function(e,r,t){"use strict";t("85ec")},"0e1f":function(e,r,t){e.exports=t.p+"img/dgtek-logo.7e6edc83.svg"},"56d7":function(e,r,t){"use strict";t.r(r);var o={};t.r(o),t.d(o,"init",(function(){return a})),t.d(o,"credentials",(function(){return i})),t.d(o,"refreshClientData",(function(){return p})),t.d(o,"refreshCustomers",(function(){return k})),t.d(o,"refreshServices",(function(){return l})),t.d(o,"refreshTickets",(function(){return C})),t.d(o,"getClientData",(function(){return c})),t.d(o,"putClientData",(function(){return u})),t.d(o,"putClientCredentials",(function(){return d})),t.d(o,"getCustomers",(function(){return w})),t.d(o,"getCustomerData",(function(){return v})),t.d(o,"putCustomer",(function(){return b})),t.d(o,"postCustomer",(function(){return y})),t.d(o,"deleteCustomer",(function(){return g})),t.d(o,"updateCustomerServices",(function(){return h})),t.d(o,"sendServiceActivationRequest",(function(){return S})),t.d(o,"getServices",(function(){return f})),t.d(o,"getServiceById",(function(){return m})),t.d(o,"getTickets",(function(){return M})),t.d(o,"getCategories",(function(){return $})),t.d(o,"getTicketById",(function(){return T})),t.d(o,"postNewTicket",(function(){return E})),t.d(o,"saveTicketData",(function(){return x})),t.d(o,"getBuildingByAddress",(function(){return _})),t.d(o,"getBuildingById",(function(){return B})),t.d(o,"getBuildingsByStatus",(function(){return D})),t.d(o,"getAddressListByStatus",(function(){return A})),t.d(o,"postBuildingDetails",(function(){return P})),t.d(o,"putBuildingDetails",(function(){return W}));t("a4d3"),t("e01a"),t("d3b7"),t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("4160"),t("b64b"),t("159b");var n=t("a026"),s=t("ade3"),a=function(){var e=window[Symbol.for("vue.prototype")],r=e.$apiSecret,t=e.$apiKey,o=e.$apiHost;window[Symbol.for("rsp.worker")].postMessage({route:"crypto",action:"init",data:{host:o(),key:t(),secret:r()}})},i=function(){window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"rsp",action:"credentials"})},c=function(){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"rsp",action:"get"})},d=function(e){var r=e.login,t=e.userPhone,o=e.password;r&&t&&o?window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"rsp",action:"password",data:{login:r,userPhone:t,newPass:o}}):window[Symbol.for("vue.instance")].$root.$emit("open-error-popup",{errorType:"Update credentials",ErrorMessage:"Invalid credentials' values"})},u=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"rsp",action:"put",data:e})},p=function(){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"rsp",action:"refresh"})},l=function(){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"services",action:"refresh"})},f=function(){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"services",action:"list"})},m=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"services",action:"get",key:e})},g=function(e){window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"customers",action:"delete",key:e})},v=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"customers",action:"get",key:e})},w=function(){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"customers",action:"list"})},y=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"customers",action:"post",data:e})},b=function(e,r){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"customers",action:"put",key:e,data:r})},h=function(e,r){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"customers",action:"services",key:e,data:r})},k=function(){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"customers",action:"refresh"})},S=function(e){console.log(e),window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"customers",action:"activate",data:e})},$=function(){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"categories",action:"get"})},T=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"tickets",action:"get",key:e})},M=function(){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"tickets",action:"list"})},E=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"tickets",action:"post",data:e})},C=function(){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"tickets",action:"refresh"})},x=function(e,r){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("vue.prototype")].sendMessageToWorker({route:"tickets",action:"put",key:e,data:r})},_=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("map.worker")].postMessage({action:"getByAddress",key:e})},B=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("map.worker")].postMessage({action:"getById",key:e})},D=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("map.worker")].postMessage({action:"data",key:e})},A=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("map.worker")].postMessage({action:"list",key:e})},P=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("map.worker")].postMessage({action:"post",data:e})},W=function(e,r){window[Symbol.for("vue.instance")].$root.$emit("progress-event",!0),window[Symbol.for("map.worker")].postMessage({action:"put",key:e,data:r})},O=function(){window[Symbol.for("vue.prototype")].$dispatchProgressEvent=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",e)},window[Symbol.for("vue.prototype")].$sendMessageToWorker=function(e){window[Symbol.for("vue.prototype")].$dispatchProgressEvent(!0),window[Symbol.for("rsp.worker")].postMessage(e)},Object.keys(o).forEach((function(e){return Object.assign(window[Symbol.for("vue.prototype")],Object(s["a"])({},"__".concat(e),o[e]))})),console.log(window[Symbol.for("vue.prototype")])},F={refresh:"client-data-refreshed",get:"client-data-received",put:"client-data-updated"},j={refresh:"customers-list-refreshed",list:"customers-list-received",get:"customer-data-received",post:"customer-created",put:"customer-updated",activate:"service-activation-request-sent",services:"customer-services-updated"},I={refresh:"tickets-list-refreshed",categories:"categories-received",list:"tickets-list-received",get:"ticket-data-received",post:"ticket-created",put:"ticket-updated"},V={refresh:"services-list-refreshed",list:"services-list-received",get:"service-details-received"},L={getByAddress:"building-details",getById:"building-details",list:"buildings-address-list",data:"buildings-data-list",post:"new-building-created",put:"building-data-updated"},R={customers:j,tickets:I,services:V,rsp:F},K={getByAddress:function(e){return{type:e,message:"Error reading building details from local DB"}},getById:function(){return{type:"Building details",message:"Error reading the data from local DB"}},list:function(){return{type:"Buildings list",message:"Error reading the data from local DB"}},data:function(){return{type:"Buildings list",message:"Error reading the data from local DB"}},post:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Add new building";return{type:e,message:"New building was not created"}},put:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Building details";return{type:e,message:"Data was not updated."}}},G="Error reading the data from remote server",H="Error reading the data from local DB",N={rsp:{refresh:{errorType:"Client details",errorMessage:G},get:{errorType:"Client details",errorMessage:H},put:{errorType:"Client details",errorMessage:"Data was not updated"}},customers:{refresh:{errorType:"Customers",errorMessage:G},list:{errorType:"Customers",errorMessage:H},get:{errorType:"Customer details",errorMessage:H},put:{errorType:"Customer details",errorMessage:"Data was not updated"}},tickets:{refresh:{errorType:"Tickets",errorMessage:G},list:{errorType:"Tickets list",errorMessage:H},get:{errorType:"Ticket details",errorMessage:H},put:{errorType:"Ticket details",errorMessage:"Data was not updated"},post:{errorType:"Create a ticket",errorMessage:"New ticket was not created"}},categories:{get:{errorType:"Ticket categories",errorMessage:H}},services:{refresh:{errorType:"Services",errorMessage:G},list:{errorType:"Services list",errorMessage:H},get:{errorType:"Service details",errorMessage:H}}};function U(){var e="/dgtek-rsp-cabinet/";window[Symbol.for("map.worker")]=new Worker("".concat(e,"map.worker.js")),window[Symbol.for("map.worker")].onerror=function(e){console.warn("Map worker Error\n",e)},window[Symbol.for("map.worker")].onmessage=function(e){if(300===e.data.status)return console.log("MAP WORKER DEBUGGING MESSAGE:\n",e.data);var r=e.data,t=r.action,o=r.status;if("store"!==t)if(200===o){if(!L[t])return;var n=L[t];window[Symbol.for("vue.instance")].$root.$emit("progress-event",!1),window[Symbol.for("vue.instance")].$root.$emit(n,e.data)}else{if(console.warn(e.data),!K[t])return;var s=K[t](),a=s.type,i=s.message;window[Symbol.for("vue.instance")].$root.$emit("open-error-popup",{errorType:a,errorMessage:i})}}}function q(){var e="/dgtek-rsp-cabinet/";window[Symbol.for("rsp.worker")]=new Worker("".concat(e,"rsp.worker.js")),window[Symbol.for("rsp.worker")].onerror=function(e){console.warn("Client worker Error\n",e)},window[Symbol.for("vue.prototype")].__worker=window[Symbol.for("rsp.worker")],window[Symbol.for("rsp.worker")].onmessage=function(e){if(300===e.data.status)return e.stopImmediatePropagation(),console.log("RSP WORKER DEBUGGING MESSAGE:\n",e.data);if("init"!==e.data.action&&"credentials"!==e.data.action){var r=e.data,t=r.route,o=r.action,n=r.status,s=r.result;if(window[Symbol.for("vue.instance")].$root.$emit("progress-event",!1),200===n){var a=R[t][o];window[Symbol.for("vue.instance")].$root.$emit(a,s),e.data.message&&window[Symbol.for("vue.instance")].$root.$emit("open-message-popup",{messageType:e.data.messageType||e.data.route,messageText:e.data.messageText||"Success"})}else{var i=e.data.error?e.data:N[t][o],c=i.errorType,d=i.errorMessage;window[Symbol.for("vue.instance")].$root.$emit("open-error-popup",{errorType:c,errorMessage:d})}}}}var J="Error reading the data from remote server",Q={rsp:{refresh:{errorType:"Company Details",errorMessage:J},get:{errorType:"Company Details",errorMessage:"Reading the data failed"},put:{errorType:"Company Details",errorMessage:"Data update failed"},password:{errorType:"Company Details",errorMessage:"Password change failed"}},customers:{refresh:{errorType:"Customers",errorMessage:J},list:{errorType:"Customers",errorMessage:"Reading the list of customers failed"},get:{errorType:"Customer",errorMessage:"Reading the customer data failed"},put:{errorType:"Customer",errorMessage:"Customer data update failed"},activate:{errorType:"Customer service activation",errorMessage:"Operation failed. You service delivery update request has not been sent."}},tickets:{refresh:{errorType:"Tickets",errorMessage:J},list:{errorType:"Tickets",errorMessage:"Reading the tickets list failed"},get:{errorType:"Tickets",errorMessage:"Reading the ticket data failed"}},services:{refresh:{errorType:"Services",errorMessage:J},list:{errorType:"Services",errorMessage:"Reading the services list failed"}}},z={rsp:{refresh:"client-data-refreshed",get:"client-data-received",put:"client-data-updated"},customers:{refresh:"customers-list-refreshed",list:"customers-list-received",get:"customer-data-received",post:"customer-created",put:"customer-updated",activate:"customer-service-activated",services:"customer-services-updated"},services:{refresh:"services-list-refreshed",get:"services-list-received"},tickets:{refresh:"tickets-list-refreshed",categories:"categories-received",list:"tickets-list-received",get:"ticket-data-received",post:"ticket-created",put:"ticket-updated"},buildings:{list:{LIT:"lit-buildings-list",Footprint:"footprint-buildings-list"},put:"buildings-data-saved",post:"new-building-created",getById:"building-data-received",getByAddress:"building-data-received"}},Z=function(){var e="And then there were three";return function(){return e}}(),Y=function(){var e="rAxKIAyY9j3Aq0OZ4TnGHCibU9G6oZZP8NaMOlKeJV9U2qjOKu0xOOQwjw3JzKaewN4DmzQ97aEsUh1XyAsQboJqQpbFpgK0JQkt";return function(){return e}}(),X=function(){var e="JQj5hS4OFWNvp0JQ58DDDKzKLCAoqpA0";return function(){return e}}(),ee=function(){var e="https://dgtek.herokuapp.com";return function(){return e}}(),re=function(){var e="https://dgtek-staging.herokuapp.com";return function(){return e}}(),te={apiSecret:Z,apiKey:Y,apiHost:re,geoscapeKey:X,buildingsHost:ee},oe={install:function(e){e.appConfig=te,e.apiSecret=Z,e.apiKey=Y,e.apiHost=re,e.geoscapeKey=X,e.buildingsHost=ee,e.prototype.$appConfig=te,e.prototype.$apiSecret=Z,e.prototype.$apiKey=Y,e.prototype.$apiHost=re,e.prototype.$geoscapeKey=X,e.prototype.$buildingsHost=ee}};n["a"].use(oe),window[Symbol.for("vue.prototype")]=n["a"].prototype,U(),q(),n["a"].prototype.$dispatchProgressEvent=function(e){window[Symbol.for("vue.instance")].$root.$emit("progress-event",e)},n["a"].prototype.$addWorkerListener=function(e,r){this.__worker.addEventListener("message",(function(t){var o=t.data,n=o.route,s=o.action;n===e&&t.data.action===r&&(window[Symbol.for("vue.prototype")].$dispatchProgressEvent(!1),window[Symbol.for("vue.instance")].$root.$emit(z[n][s],t.data))}))},Object.keys(z).forEach((function(e){return Object.keys(z[e]).forEach((function(r){return n["a"].prototype.$addWorkerListener(e,r)}))})),O();var ne=n["a"],se=function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("v-app",[o("v-app-bar",{staticClass:"main-app-bar-header homefone",attrs:{app:"",flat:"",height:"100"}},[o("v-card",{staticClass:"homefone text-left mt-8 ml-4",attrs:{flat:"",height:"100"}},[o("v-img",{staticClass:"mr-8",attrs:{src:t("0e1f"),width:"70"}})],1),o("h3",{staticClass:"main-header"},[e._v("DGtek provisioning RSP portal")]),o("v-progress-linear",{staticStyle:{top:"80px","z-index":"11"},attrs:{active:e.progress,indeterminate:e.progress,absolute:"",top:"",color:"buttons"}})],1),o("v-row",[o("v-main",{staticClass:"main-content mt-0"},[o("Home")],1)],1),o("v-snackbar",{attrs:{timeout:"5000",color:"primary",top:""},scopedSlots:e._u([{key:"action",fn:function(r){var t=r.attrs;return[o("v-btn",e._b({staticClass:"close-icon-snackbar",attrs:{color:"#fff",icon:""},on:{click:function(r){e.snackbar=!1}}},"v-btn",t,!1),[o("v-icon",{attrs:{large:""}},[e._v("mdi-close")])],1)]}}]),model:{value:e.snackbar,callback:function(r){e.snackbar=r},expression:"snackbar"}},[e._v(" "+e._s(e.message)+" ")]),o("error-message"),o("simple-message")],1)},ae=[],ie=(t("dc44"),t("69d7"),{name:"App",components:{Home:function(){return t.e("chunk-ace88f5c").then(t.bind(null,"bb51"))}},data:function(){return{ready:!1,progress:!1,snackbar:!1,message:"Welcome to DGtek provisioning RSP portal"}},methods:{errorHandler:function(e){var r=e.data,t=r.errorType,o=r.errorMessage;this.$root.$emit("open-error-popup",{errorType:t,errorMessage:o})},messageHandler:function(e){var r=e.data,t=r.messageType,o=r.messageText;this.$root.$emit("open-message-popup",{messageType:t,messageText:o})}},mounted:function(){this.$root.$on("app-is-ready",function(e){this.ready=!0}.bind(this)),this.$root.$on("progress-event",function(e){this.progress=e.progress}.bind(this)),this.__worker.addEventListener("message",function(e){e.data.error&&this.errorHandler(e),e.data.message&&this.messageHandler(e)}.bind(this))},errorCaptured:function(e,r,t){return console.warn("ERROR:\n",e,t,r.$options._componentTag),!1}}),ce=ie,de=(t("034f"),t("2877")),ue=t("6544"),pe=t.n(ue),le=t("7496"),fe=t("40dc"),me=t("8336"),ge=t("b0af"),ve=t("132d"),we=t("adda"),ye=t("f6c4"),be=t("8e36"),he=t("0fd9"),ke=t("2db4"),Se=Object(de["a"])(ce,se,ae,!1,null,null,null),$e=Se.exports;pe()(Se,{VApp:le["a"],VAppBar:fe["a"],VBtn:me["a"],VCard:ge["a"],VIcon:ve["a"],VImg:we["a"],VMain:ye["a"],VProgressLinear:be["a"],VRow:he["a"],VSnackbar:ke["a"]});var Te=t("f309");n["a"].use(Te["a"]);var Me=new Te["a"]({icons:{iconfont:"mdi",values:{add:"mdi-note-plus",buildings:"mdi-home-city-outline",chat:"mdi-account-voice",delete:"mdi-trash-can",dropdown:"mdi-menu-down",edit:"mdi-pencil",error:"mdi-alert",externalLink:"mdi-open-in-new",list:"mdi-view-list",menu:"mdi-dots-vertical",message:"mdi-android-messages",orders:"mdi-printer",pdf:"mdi-file-pdf",pageNext:"mdi-page-next-outline",pagePrev:"mdi-page-previous-outline",send:"mdi-send",services:"mdi-apps-box"}},theme:{themes:{light:{primary:"#881F1A",secondary:"#E82F37",buttons:"#881F1A",buttonActive:"#882F1A",homefone:"#FBFBFB",accent:"#f3f3f3",inputs:"#EFEFEF",activefield:"#D9D9D9",warning:"#FAFF00",info:"#fbfbfb"},dark:{primary:"#881F1A",secondary:"#E82F37",buttons:"#881F1A",buttonActive:"#882F1A",homefone:"#FBFBFB",accent:"#f3f3f3",inputs:"#EFEFEF",activefield:"#D9D9D9",warning:"#FAFF00",info:"#fbfbfb"}}}}),Ee=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("v-dialog",{staticClass:"pa-4",attrs:{"max-width":"480px"},model:{value:e.dialog,callback:function(r){e.dialog=r},expression:"dialog"}},[t("v-card",{attrs:{flat:""}},[t("v-toolbar",{attrs:{dense:"",color:"buttons"}},[t("v-icon",{staticClass:"mr-4",attrs:{color:"buttons",large:""}},[e._v(" $error ")]),t("v-toolbar-title",[e._v(" Error ")]),t("v-spacer"),t("v-btn",{attrs:{icon:""},on:{click:function(r){e.dialog=!1}}},[t("v-icon",{attrs:{large:""}},[e._v(" $close ")])],1)],1),t("v-card-text",{staticClass:"text-center mt-10"},[t("h4",[e._v(e._s(e.errorType||"Unknown error type"))])]),t("v-card-text",{staticClass:"text-center"},[t("p",[e._v(e._s(e.errorMessage||"Unknown Error"))])])],1)],1)},Ce=[],xe={name:"ErrorMessage",data:function(){return{error:!1,errorType:"",errorMessage:""}},computed:{dialog:{get:function(){return this.error},set:function(e){!e&&this.resetError()}}},methods:{resetError:function(){this.error=!1,this.errorType="",this.errorMessage=""}},mounted:function(){this.$root.$on("open-error-popup",function(e){this.error=!0,this.errorType=e.errorType,this.errorMessage=e.errorMessage}.bind(this))}},_e=xe,Be=t("99d9"),De=t("169a"),Ae=t("2fa4"),Pe=t("71d9"),We=t("2a7f"),Oe=Object(de["a"])(_e,Ee,Ce,!1,null,null,null),Fe=Oe.exports;pe()(Oe,{VBtn:me["a"],VCard:ge["a"],VCardText:Be["b"],VDialog:De["a"],VIcon:ve["a"],VSpacer:Ae["a"],VToolbar:Pe["a"],VToolbarTitle:We["a"]});var je=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("v-dialog",{staticClass:"pa-4",attrs:{"max-width":"480px"},model:{value:e.dialog,callback:function(r){e.dialog=r},expression:"dialog"}},[t("v-card",{attrs:{flat:""}},[t("v-toolbar",{attrs:{dense:"",color:"#999"}},[t("v-icon",{staticClass:"mr-4"},[e._v(" $message ")]),t("v-toolbar-title",[e._v(" Message ")]),t("v-spacer"),t("v-btn",{attrs:{icon:""},on:{click:function(r){e.dialog=!1}}},[t("v-icon",{attrs:{large:""}},[e._v(" $close ")])],1)],1),t("v-card-text",{staticClass:"text-center mt-10"},[t("h4",[e._v(e._s(e.messageType||""))])]),t("v-card-text",{staticClass:"text-center"},[t("p",[e._v(e._s(e.messageText))])])],1)],1)},Ie=[],Ve={name:"MessagePopup",data:function(){return{message:!1,messageType:"",messageText:""}},computed:{dialog:{get:function(){return this.message},set:function(e){!e&&this.resetMessage()}}},methods:{resetMessage:function(){this.message=!1,this.messageType="",this.messageText=""}},mounted:function(){this.$root.$on("open-message-popup",function(e){this.message=!0,this.messageType=e.messageType,this.messageText=e.messageText}.bind(this))}},Le=Ve,Re=Object(de["a"])(Le,je,Ie,!1,null,null,null),Ke=Re.exports;function Ge(e){var r=e.data,t=r.status,o=r.action;if("init"!==o)return console.log("initCallback not removed");e.stopImmediatePropagation(),200===t?(i(),window[Symbol.for("rsp.worker")].removeEventListener("message",Ge),window[Symbol.for("rsp.worker")].addEventListener("message",He)):Ue()}function He(e){var r=e.data,t=r.status,o=r.action;return"credentials"!==o?console.log("credentialCallback not removed"):(e.stopImmediatePropagation(),200!==t?qe():(window[Symbol.for("rsp.worker")].removeEventListener("message",He),p(),k(),l(),void C()))}function Ne(e){var r=e.data,t=r.status,o=r.route,n=r.action;if("refresh"===n&&(e.stopImmediatePropagation(),300!==t)){if(200!==t)return tr(o);window[Symbol.for("vue.prototype")].$refreshed[o]=!0,window[Symbol.for("vue.instance")].$root.$emit("data-refreshed",{route:o})}}function Ue(){window[Symbol.for("vue.instance")].$root.$emit("open-error-popup",{errorType:"Init",errorMessage:"Worker initialization failed"})}function qe(e){window[Symbol.for("vue.instance")].$root.$emit("open-error-popup",{errorType:"Authentification",errorMessage:"Credentials have not been received"})}pe()(Re,{VBtn:me["a"],VCard:ge["a"],VCardText:Be["b"],VDialog:De["a"],VIcon:ve["a"],VSpacer:Ae["a"],VToolbar:Pe["a"],VToolbarTitle:We["a"]}),window[Symbol.for("vue.prototype")].$refreshed={rsp:!1,customers:!1,categories:!1,tickets:!1,services:!1};t("d81d");var Je=t("3835"),Qe=Object.keys(Q).map((function(e){return Q[e].refresh})),ze=Object(Je["a"])(Qe,4),Ze=ze[0],Ye=ze[1],Xe=ze[2],er=ze[3],rr={rsp:Ze,customers:Ye,tickets:Xe,services:er};function tr(e){window[Symbol.for("vue.instance")].$root.$emit("open-error-popup",{errorType:rr[e].errorType,errorMessage:rr[e].errorMessage})}var or=t("5530"),nr=function(){window[Symbol.for("map.worker")].addEventListener("message",(function(e){var r=e.data,t=r.status,o=r.action,n=r.result;if("getById"===o||"getByAddress"===o){if(e.stopImmediatePropagation(),window[Symbol.for("vue.instance")].$root.$emit("progress-event",!1),200===t)return window[Symbol.for("vue.instance")].$root.$emit("building-data-received",Object(or["a"])({},n));window[Symbol.for("vue.instance")].$root.$emit("open-error-popup",{messageType:"Reading the building details",messageText:"Operaion faled. Data was not received"})}}))},sr=function(){window[Symbol.for("map.worker")].addEventListener("message",(function(e){var r=e.data,t=r.status,o=r.action;if("put"===o||"post"===o){if(e.stopImmediatePropagation(),window[Symbol.for("vue.instance")].$root.$emit("progress-event",!1),200===t){var n="post"===o?"new-building-created":"buildings-data-saved";return window[Symbol.for("vue.instance")].$root.$emit(n,e.data),void window[Symbol.for("vue.instance")].$root.$emit("open-message-popup",{messageType:"Building details",messageText:"Data saved"})}window[Symbol.for("vue.instance")].$root.$emit("open-error-popup",{errorType:"Building details",errorMessage:"Operaion faled. Data was not saved"})}}))},ar=function(){window[Symbol.for("map.worker")].addEventListener("message",(function(e){var r=e.data,t=r.status,o=r.action,n=r.store,s=r.result;if("list"===o)if(window[Symbol.for("vue.instance")].$root.$emit("progress-event",!1),200===t){var a="".concat(n.toLowerCase(),"-buildings-list");window[Symbol.for("vue.instance")].$root.$emit(a,s)}else window[Symbol.for("vue.instance")].$root.$emit("open-error-popup",{errorType:"".concat(n," buildings"),errorMessage:"Error reading the data"})}))},ir=function(){window[Symbol.for("map.worker")].addEventListener("message",(function(e){e.data.error&&(e.stopImmediatePropagation(),window[Symbol.for("vue.instance")].$root.$emit("progress-event",!1),window[Symbol.for("vue.instance")].$root.$emit("open-error-popup",{errorType:e.data.errorType||"Buildings",errorMessage:e.data.errorMessage||"Unknown error"}))}))},cr=function(){window[Symbol.for("map.worker")].addEventListener("message",(function(e){e.data.message&&window[Symbol.for("vue.instance")].$root.$emit("open-message-popup",{messageType:e.data.messageType,messageText:e.data.messageText})}))},dr=function(){window[Symbol.for("map.worker")].addEventListener("message",(function(e){if(300===e.data.status)return e.stopImmediatePropagation(),console.log("DEBUGGING MESSAGE FROM WORKER:\n",e.data)})),nr(),sr(),ar(),ir(),cr()};ne.config.productionTip=!1,ne.component("error-message",Fe),ne.component("simple-message",Ke);var ur=new ne({vuetify:Me,render:function(e){return e($e)}}).$mount("#app");window[Symbol.for("vue.instance")]=ur,ur.dispatchProgressEvent=function(e){ur.$root.$emit("progress-event",{progress:e})},window[Symbol.for("rsp.worker")].addEventListener("message",Ne),ur.__worker.dispatchProgressEvent=ur.dispatchProgressEvent,ur.sendMessageToWorker=function(e){window[Symbol.for("vue.instance")].dispatchProgressEvent(!0),window[Symbol.for("vue.instance")].__worker.postMessage(e)},ne.prototype.sendMessageToWorker=ur.sendMessageToWorker,ne.prototype.$sendMessageToWorker=ur.sendMessageToWorker,ur.__worker.addEventListener("message",Ge),a(),dr()},"85ec":function(e,r,t){},dc44:function(e,r,t){}});
//# sourceMappingURL=app.7c114aba.js.map