(()=>{"use strict";var t,e,s={94:(t,e,s)=>{s.d(e,{q1:()=>o,hB:()=>d,sh:()=>i,ho:()=>n,_j:()=>r,Ch:()=>u,$S:()=>l,V5:()=>c});const{buildingsController:a}=s(383),r={host:a.setBuildingsHostURL,key:a.setBuildingsApiKey,refresh:a.storeBuildings,list:a.getBuildingsList,data:a.getBuildingsData,search:a.searchBuilding,getById:a.getBuildingDataById,getByAddress:a.getBuildingDataByAddress,put:a.putBuildingData,post:a.postBuildingData,patch:a.patchBuildingData},n=function(){let t="https://portal.dgtek.net";return function(e){if(!e)return t;self.postMessage({status:300,hostChanged:e}),t=e}}(),o=function(){let t="";return function(e){if(!e)return t;t=e}}(),i=["lit","footprint","build","soon","other","current"],u={lit:"LIT",footprint:"Footprint",build:"BuildCommenced",soon:"ComingSoon",other:"Other"},l={LIT:"lit",Footprint:"footprint",BuildCommenced:"build",ComingSoon:"soon",Other:"other"},d={status:"Footprint",estimatedServiceDeliveryTime:"",coordinates:[0,0],address:"",addressComponents:{number:"",street:"",streetType:"",city:"",state:"",postCode:"",cadastralIdentifier:""},owner:{corporationName:"",contactPerson:"",corporationPhoneWork:"",corporationPhoneMobile:"",corporationEmailPrimary:"",corporationEmailAlternative:""},management:{managerName:"",managerPhoneWork:"",phoneWork:"",phoneMobile:"",emailPrimary:"",emailAlternative:""},buildingName:"",buildingType:"dwelling=,type=,category=,field=",customerInstallApprovalRequired:!0,inductionRequired:!0,difficultyLevel:{leadInInstallation:0,backboneInstallation:0,customerInstallation:0},infrastructure:{type:"",leadIn:{planned:!1,installed:!1},backbone:{planned:!1,installed:!1},customerAccessCabling:{planned:!1,installed:!1},gPOinMDF:{exist:!1,planned:!1,installed:!1},uPSinMDF:{planned:!1,installed:!1},gPOinRisers:{exist:!1,planned:!1,installed:!1},uPSinRisers:{planned:!1,installed:!1}},files:{design:"",laanInspect:"",laanInstall:"",scope:"",photos:[],approoval:""},numberOfLevels:0,numberOfDwellings:0,avgFloorHeight:0,levels:[{plannedRouter:!1,plannedSplicingBox:!1,plannedSplitter:!1,plannedOFTU:!1,plannedRack:!1,installedRouter:!1,installedSplicingBox:!1,installedSplitter:!1,installedOFTU:!1,installedRack:!1,routerId:""}]},c={lit:{event:"on-net",buildingStatus:"LIT",polygonStatus:"ServiceAvailable"},footprint:{event:"footprint",buildingStatus:"Footprint",polygonStatus:"ServiceAvailable"},build:{event:"construction-commenced",buildingStatus:"BuildCommenced",polygonStatus:"UnderConstruction"},soon:{event:"coming-soon",buildingStatus:"ComingSoon",polygonStatus:"ComingSoon"},other:{event:"not-available",buildingStatus:"Other",polygonStatus:null}}},383:(t,e,s)=>{s.r(e),s.d(e,{buildingsController:()=>o});var a=s(665),r=s(356),n=s(94);const o=new class{setBuildingsHostURL(t){(0,n.ho)(t.data)}setBuildingsApiKey(t){(0,n.q1)(t.data)}async storeBuildings(){self.postMessage(await(0,a.km)())}async getBuildingsList(t){self.postMessage(await(0,a.Yp)(t.key))}async getBuildingsData(t){self.postMessage(await(0,a.ml)(t.key))}async searchBuilding(t){self.postMessage(await(0,a.ig)(t.key))}async getBuildingDataById(t){self.postMessage(await(0,r.Pd)(t.key))}async getBuildingDataByAddress(t){self.postMessage(await(0,a.SF)(t.key))}async putBuildingData(t){self.postMessage(await(0,r.p1)(t.key,t.data))}async patchBuildingData(t){self.postMessage(await(0,r.OE)(t.key,t.data))}async postBuildingData(t){self.postMessage(await(0,r.FX)(t.data))}}},356:(t,e,s)=>{s.d(e,{Pd:()=>n,OE:()=>c,FX:()=>f,p1:()=>l,km:()=>h});var a=s(94),r=s(893);const n=async t=>{if(!navigator.onLine)return{status:0,result:"Offline mode: Data has not been saved. Try later"};const[e,s]=["getById",t],n=await fetch(`${(0,a.ho)()}/building/${t}`);if(200!==n.status)return{status:n.status,action:e,key:s,result:`Error reading building ${t} data`};const o=(await n.json()).data;return await(0,r.UX)("current","data",o),{status:n.status,action:e,store:o.status,key:s,result:o}};var o=s(665);const i=(t,e="saved")=>({status:0,action:t,error:!0,errorType:"Offline",message:`Offline mode: Data has not been ${e}. Try later`,result:`Offline mode: Data has not been ${e}. Try later`}),u=(t=500,e="building")=>({status:t,action:"put",key:e,error:!0,errorType:`Update ${e} details`,errorMessage:"Operation failed"}),l=async function(t,e){const s=t;let o=await n(t);if(200!==o.status)return getError(o.status,t);if(Object.assign(o.result,{...e}),!navigator.onLine)return i("put","saved");if(o=await fetch(`${(0,a.ho)()}/building/${t}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:(0,a.q1)()},body:JSON.stringify(o.result)}),200!==o.status)return u(o.status,e.address);const{address:l,addressComponents:d,coordinates:c,distanceFromFootprint:g,estimatedServiceDeliveryTime:p,status:f}=await o.json(),y={LIT:"lit",Footprint:"footprint",BuildCommenced:"build",ComingSoon:"soon",Other:"other"}[f],m=await(0,r.UX)(y,l,{address:l,addressComponents:d,coordinates:c,distanceFromFootprint:g,estimatedServiceDeliveryTime:p,status:f,_id:t});return 200!==m.status?u(m.status,e.address):{action:"put",key:s,status:o.status,result:m}},d="patch",c=async function(t,e){const s=t;let n=!1;if(!navigator.onLine)return i;if(e.status){if(!e.address)return{status:422,action:d,key:s,data:e,message:"Invalid request: address needed"};const t=await(0,o.ig)(e.address);if(200!==t.status)return((t,e="Building",s=404)=>({status:s,action:t,key:e,error:!0,errorType:"Building not found",errorMessage:`${e} not found in local DB`}))(d,e.address,t.status);n=t.result.status!==e.status}n&&await(0,o.mY)(e.address);const l=await fetch(`${(0,a.ho)()}/building/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:(0,a.q1)()},body:JSON.stringify(e)});if(200!==l.status)return u("patch",l.status,e.address);const{address:c,addressComponents:g,coordinates:p,distanceFromFootprint:f,estimatedServiceDeliveryTime:y,status:m}=(await l.json()).data,b={LIT:"lit",Footprint:"footprint",BuildCommenced:"build",ComingSoon:"soon",Other:"other"}[m],h=await(0,r.UX)(b,c,{address:c,addressComponents:g,coordinates:p,distanceFromFootprint:f,estimatedServiceDeliveryTime:y,status:m,_id:t});return 200!==h.status?u(h.status,e.address):{status:l.status,action:d,key:s,result:h}},g=(t=422,e="Operation failed")=>({status:t,action:"post",error:!0,errorType:"Create new building",errorMessage:e}),p="post",f=async t=>{if(!navigator.onLine)return i(p,"saved");if(!t.status)return g(422,"Building status not defined");const e=a.$S[t.status];if(!e)return g(422,`Invalid building status ${t.status}`);Object.keys(t).includes("buildingId")&&delete t.buildingId;const s=await(0,o.ig)(t.address);if(s.result&&s.result._id)return{status:200,action:p,store:e,key:t.address,result:s.result._id,message:!0,messageType:"Creating new building",messageText:`Building ${t.address} already exists`};const n=Object.assign(JSON.parse(JSON.stringify(a.hB)),t),l=await fetch(`${(0,a.ho)()}/building`,{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8",Authorization:(0,a.q1)()},body:JSON.stringify(n)});if(200!==l.status)return g(l.status,await l.json());const d=(await l.json()).data,{address:c,addressComponents:f,coordinates:y,status:m,estimatedServiceDeliveryTime:b="",buildingName:h="",distanceFromFootprint:v=0}=t,S={address:c,addressComponents:f,coordinates:y,status:m,estimatedServiceDeliveryTime:b,buildingName:h,distanceFromFootprint:v,_id:d},{status:w,result:O}=await(0,r.UX)(e,t.address,S);return 200!==w?u(w,"Error saving the data to local DB"):{status:200,action:p,store:e,key:t.address,result:d}},y=(t,e=500,s="Error reading data from remote server")=>({status:e,action:t,error:!0,errorType:"Remote server error",errorMessage:s,result:s}),m=(t,e=400,s="Error saving the data to local DB")=>({status:e,action:t,error:!0,errorType:"Local DB error",errorMessage:s,result:s}),b="init",h=async()=>{if(!navigator.onLine)return i(b,"received");await Promise.all(Object.keys(a.Ch).map((t=>(0,r.YF)(t))));do{var t=await fetch(`${(0,a.ho)()}/building?page=${e+1||1}`);if(200!==t.status)return y("init",t.status);var{page:e,pages:s,data:n}=await t.json();const r=await(0,o.ls)(n);if(!r||!Array.isArray(r)||r.filter((t=>200!==t.status)).length)return m("init")}while(e<s);return{status:200,action:b,result:"OK"}}},893:(t,e,s)=>{s.d(e,{YF:()=>d,Ob:()=>l,go:()=>u,NW:()=>i,gJ:()=>o,UX:()=>n});var a=s(94);const r=()=>new Promise((t=>Object.assign(indexedDB.open("buildings"),{onupgradeneeded:t=>{for(const e of a.sh)t.target.result.createObjectStore(e);return t.target.result},onsuccess:e=>t({status:200,result:e.target.result}),onerror:e=>t({status:700,result:null})}))),n=async(t,e,s)=>new Promise((a=>{r().then((r=>{const{status:n,result:o}=r;if(200!==n)return void a({status:n,result:"Open local DB error"});const i=o.transaction([t],"readwrite").objectStore(t);Object.assign(i.put(s,e),{onsuccess:()=>a({status:200,result:s}),onerror:()=>a({status:708,result:`Local DB saving data error: ${e}`})})}))})),o=(t,e)=>new Promise((s=>{r().then((a=>{const{status:r,result:n}=a;if(200!==r)return void s({status:r,result:null});const o=n.transaction([t]).objectStore(t);Object.assign(o.get(e),{onsuccess:a=>s({status:a.target.result?200:404,result:a.target.result?a.target.result:`The data ${e} not found in db store ${t}`}),onerror:t=>s({status:704,result:t.target.error})})}))})),i=t=>new Promise((e=>{r().then((s=>{const{status:a,result:r}=s;if(200!==a)return void e({status:a,result:null});const n=r.transaction([t]).objectStore(t);return Object.assign(n.getAllKeys(),{onsuccess:s=>e({status:s.target.result?200:404,result:s.target.result?s.target.result:`No one key found in db store ${t}`}),onerror:t=>e({status:704,result:t.target.error})})}))})),u=t=>new Promise((e=>{r().then((s=>{const{status:a,result:r}=s;if(200!==a)return void e({status:a,result:null});const n=r.transaction([t]).objectStore(t);return Object.assign(n.getAll(),{onsuccess:s=>e({status:s.target.result?200:404,result:s.target.result?s.target.result:`No one key found in db store ${t}`}),onerror:t=>e({status:704,result:t.target.error})})}))})),l=(t,e)=>new Promise((s=>{r().then((a=>{const{status:r,result:n}=a;if(200!==r)return void s({status:r,result:null});const o=n.transaction([t],"readwrite").objectStore(t);Object.assign(o.delete(e),{onsuccess:a=>s({action:"delete",store:t,status:a.target.result?200:404,result:a.target.result?a.target.result:`${e} not found in db store ${t}`}),onerror:t=>s({status:400,result:t.target.error})})}))})),d=t=>new Promise((e=>{r().then((s=>{const{status:a,result:r}=s;if(200!==a)return void e({status:a,result:null});const n=r.transaction([t],"readwrite").objectStore(t);Object.assign(n.clear(),{onsuccess:t=>e({status:200,result:null}),onerror:s=>e({status:704,result:`Cleaning ${t}: operation failed`})})}))}))},665:(t,e,s)=>{s.d(e,{mY:()=>f,SF:()=>n,ml:()=>d,Yp:()=>l,ls:()=>u,ig:()=>g,km:()=>a.km});var a=s(356);const r="getByAddress",n=async t=>{const e=await g(t);if(200!==e.status)return((t=404,e="Building")=>({status:t,store:"Not found",action:r,key:e,result:null,error:!0,errorType:"Search building by address",errorMessage:`${e} was not found`}))(e.status,t);const{status:s,store:n,result:o}=await(0,a.Pd)(e.result._id);return{status:s,action:r,store:e.store,key:t,result:o}};var o=s(893),i=s(94);const u=async function(t){const e=[];for(const s in i.Ch){const a=t.filter((t=>t.status===i.Ch[s]));for(const t of a){const{address:a}=t;e.push((0,o.UX)(s,a,t))}}return await Promise.all(e)},l=async t=>{const[e,s]=["list",t];if(-1===Object.keys(i.Ch).indexOf(t))return{status:422,action:e,store:s,result:`Invalid request: type ${t} not found`};const{status:a,result:r}=await(0,o.NW)(t);return{status:a,store:s,action:e,result:Object.assign(r,{event:i.V5[s].event,buildingStatus:i.V5[s].buildingStatus,polygonStatus:i.V5[s].polygonStatus})}},d=async t=>{const[e,s]=["data",t];if(-1===Object.keys(i.Ch).indexOf(t))return{status:422,action:e,store:s,result:`Invalid request: type ${t} not found`};const{status:a,result:r}=await(0,o.go)(t),n=r.map((t=>({id:t._id,address:t.address,addressComponents:t.addressComponents,estimatedServiceDeliveryTime:t.estimatedServiceDeliveryTime})));return{status:a,action:e,store:s,result:Object.assign(n,{event:i.V5[s].event,buildingStatus:i.V5[s].buildingStatus,polygonStatus:i.V5[s].polygonStatus})}},c="search",g=async t=>{for(const e in i.Ch){const{status:s,result:a}=await(0,o.gJ)(e,t);if(200===s)return{status:s,action:c,store:e,key:t,result:a}}return{status:404,action:c,key:t,store:"Not found",result:null}},p=["lit","footprint","build","soon","other"],f=async t=>{for(const e of p){const s=await(0,o.Ob)(e,t);if(200===s.status)return s}return{status:404,action:"delete",key:t}}}},a={};function r(t){var e=a[t];if(void 0!==e)return e.exports;var n=a[t]={exports:{}};return s[t](n,n.exports,r),n.exports}r.d=(t,e)=>{for(var s in e)r.o(e,s)&&!r.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},t=r(94),e=r(665),(0,t.q1)((()=>"rAxKIAyY9j3Aq0OZ4TnGHCibU9G6oZZP8NaMOlKeJV9U2qjOKu0xOOQwjw3JzKaewN4DmzQ97aEsUh1XyAsQboJqQpbFpgK0JQkt")),self.onmessage=s=>{const{action:a,host:r}=s.data;self.postMessage({status:300,action:a,url:r}),"host"===a&&((0,t.ho)(r),(0,e.km)().then((e=>{200===e.status&&(self.onmessage=e=>{const{action:s}=e.data;if(!t._j[s]||"function"!=typeof t._j[s])return self.postMessage({status:422,action:s,result:"Invalid request"});t._j[s](e.data)})})))}})();