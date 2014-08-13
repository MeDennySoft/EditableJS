/*  Editable JavaScript Framework, version 0.11.0
 *  (c) 2014 - Daniel Morales, M�rida, Yucat�n, M�xico.
 *	
 *  EditableJs is freely distributable under the terms of an MIT-style license.
 *  For details, see: http://www.danyelmorales.com
 *
 *  e-mail me at: contacto@danyelmorales.com
 *--------------------------------------------------------------------------*/
var _=function(s){var obj={},doc={},settings={editable:{}};settings.idSelector="idSelector";settings.classSelector="classSelector";settings.thSelector="thSelector";settings.tagSelector="tagSelector";settings.idRow="idRow";settings.idRowName="idRowName";settings.termColumn="termColumn";settings.keyboard=["keydown","keypress","keyup"];settings.editable.datae="";settings.editable.dataTable="";settings.editable.isTable=false;settings.editable.selector=false;settings.editable.coordleft=false;settings.editable.tcoord=
false;settings.editable.b="term";settings.editable.g="undefined";settings.editable.encode;settings.editable.u="undefined";settings.editable.c=function(){};settings.editable.ajaxT=false;settings.editable.onError;settings.editable.debug=false;settings.editable.thSelector=false;settings.editable.thSelectorContent="";settings.editable.event;settings.editable.eventList;settings.editable.onActionActive;settings.editable.onAjaxFx=function(){};function scannerInput(y){var token="",valLex="",baseString="",
currentString="",isEdited=false;for(var i=0;i<y.length;i++){baseString+=y[i];if(token===""&&y[i]==="@")token="@";else if(token==="@")if(y[i]==="[")token+="[";else return false;else if(token==="@[")if(y[i]==="]")token+=y[i];else valLex+=y[i];if(token=="@[]"){currentString="@["+valLex+"]";baseString=interpreterInput(valLex,baseString,currentString);isEdited=true;currentString="";token="";valLex=""}}if(isEdited)return baseString;else return y}function interpreterInput(valLex,baseString,currentString){var arr=
valLex.split(":"),control=arr[0],name=arr[1];var select=control.split("="),obj=_(name).dom;var response=currentString;switch(select[0]){case "input":switch(select[1]){case "radio":if(!obj.length)response=obj.value;else itera(obj,function(x){if(x.checked)response=x.value});break;case "text":response=obj.value;break;case "select":break}break}response=baseString.replace(currentString,response);return response}function itera(obj,action){for(var i=0;i<obj.length;i++)action(obj[i])}function iteraO(obj,
action){for(var j in obj){if(obj[j]===null||typeof obj[j]===undefined)obj[j]="null";action(j,obj[j])}}function recursiveObj(x,y,name){if(typeof x==="object")iteraO(x,function(names,contents){recursiveObj(contents,y,names)});else{if(typeof x===null||x==""||x.length===0)x="null";y(name,x)}}function replaceIt(where,what,forThis){var str=where;var res=str.replace(what,forThis);return res}function getElementByThContent(EL,content){for(var i=0;i<EL.length;i++)if(EL[i].innerHTML===content)return EL[i].cellIndex}
var innerContent=function(t,h,concat){if(!t.length)if(concat)t.innerHTML+=h;else t.innerHTML=h;else for(var i=0;i<t.length;i++)if(concat)t[i].innerHTML+=h;else t[i].innerHTML=h};var hide=function(select,fadex){if(typeof fadex!=="undefined"&&typeof fadex==="number")fade(select,fadex);else reset(select);select.style.opacity="0";select.style.visibility="hidden"};var none=function(select,fadex){if(typeof fadex!=="undefined"&&typeof fadex==="number"){hide(select,fadex);setTimeout(function(){select.style.display=
"none"},1150*fadex)}else{select.style.opacity="0";select.style.display="none";reset(select)}};var show=function(select,fadex){if(typeof fadex!=="undefined"&&typeof fadex==="number")fade(select,fadex);else reset(select);select.style.opacity="1";select.style.visibility="visible";select.style.display="block"};var reset=function(select){var speed="0";select.style.setProperty("-webkit-transition","opacity "+speed+"s ease-in-out");select.style.setProperty("-moz-transition","opacity "+speed+"s ease-in-out");
select.style.setProperty("-o-transition","opacity "+speed+"s ease-in-out");select.style.setProperty("-ms-transition","opacity "+speed+"s ease-in-out");select.style.setProperty("transition","opacity "+speed+"s ease-in-out");select.style.setProperty("transition","all "+speed+"s ease-in-out")};var fade=function(select,speed){select.style.setProperty("-webkit-transition","opacity "+speed+"s ease-in-out");select.style.setProperty("-moz-transition","opacity "+speed+"s ease-in-out");select.style.setProperty("-o-transition",
"opacity "+speed+"s ease-in-out");select.style.setProperty("-ms-transition","opacity "+speed+"s ease-in-out");select.style.setProperty("transition","opacity "+speed+"s ease-in-out");select.style.setProperty("transition","all "+speed+"s ease-in-out")};var msg=function(select,odata,kind,fadex,speed,attach){var innerSelect=select.innerHTML;if(!speed)speed=4E3;fadex!==false&&typeof fadex==="number"?fade(select,fadex):reset(select);if(attach!==false)attach==="override"?_(odata.select).dom.innerHTML=odata.data:
_(odata.select).dom.innerHTML+=odata.data;else return false;show(select,fadex);setTimeout(function(){kind==="none"?none(select,fadex):hide(select,fadex)},speed)};function anonymousEventHandler(ev,e,t,f){var ev=ev||window.event;switch(t){case "keyboard":var attr="",evValue="";if(typeof e.key!=="undefined"){attr=e.key;evValue=String.fromCharCode(ev.charCode)}else if(typeof e.code!=="undefined"){attr=e.code;evValue=ev.keyCode}else return false;if(attr==evValue)f();break}}function keyboardChecker(t,e,
f){if(typeof e.event==="undefined")return false;itera(settings.keyboard,function(x){if(x===e.event){var temp=function(eventOcurred){anonymousEventHandler(eventOcurred,e,"keyboard",f)};sEL(t,x,temp,true)}})}function setEList(o,t,f){itera(o,function(x){if(typeof x==="object")keyboardChecker(t,x,f);else sEL(t,x,f,true)})}function eventCenter(t,e,f){if(typeof t==="undefined"){settings.editable.eventList=undefined;e=undefined}if(typeof settings.editable.eventList!=="undefined")setEList(settings.editable.eventList,
t,f);else typeof e!=="undefined"?sEL(t,e,f,true):f()}function sEL(EL,e,f,t){if(typeof e==="object"){keyboardChecker(EL,e,f);return true}if(typeof EL!=="object")return false;if(!EL.length)eventListenerH(EL,e,f,t);else for(var i=0;i<EL.length;i++)eventListenerH(EL[i],e,f,t)}function eventListenerH(EL,e,f,t){if(EL.addEventListener)EL.addEventListener(e,f,t);else EL.attachEvent(e,f,t)}function resolveEncode(r){var res=r.responseText;if(typeof settings.editable.encode!=="undefined")switch(settings.editable.encode){case "json":try{res=
JSON.parse(res)}catch(e){if(typeof settings.editable.onError!=="undefined"){e+="\n Error parsing a string as json string:\n"+res;settings.editable.onError(e)}}break;case "obj":res=r;break;case "jsonStr":res=JSON.stringify(res);break}if(settings.editable.debug){console.log("-----*Debug*-----");var_dump(res);console.log("-----End Debug*-----")}return res}function getXmlDoc(){var xmlDoc;if(window.XMLHttpRequest)xmlDoc=new XMLHttpRequest;else xmlDoc=new ActiveXObject("Microsoft.XMLHTTP");return xmlDoc}
function post(u,d,c){var xmlDoc=getXmlDoc();xmlDoc.open("POST",u,true);xmlDoc.setRequestHeader("Content-type","application/x-www-form-urlencoded");xmlDoc.onreadystatechange=function(){if(xmlDoc.readyState===4&&xmlDoc.status===200)c(resolveEncode(xmlDoc))};xmlDoc.send(d)}function get(u,c){var xmlDoc=getXmlDoc();xmlDoc.open("GET",u,true);xmlDoc.onreadystatechange=function(){if(xmlDoc.readyState===4&&xmlDoc.status===200)c(resolveEncode(xmlDoc))};xmlDoc.send()}var ajx=function(o){settings.editable.isAjax=
true;if(typeof o.source!=="undefined")settings.editable.u=o.source;else return false;if(typeof o.debug!=="undefined")if(o.debug===true)settings.editable.debug=true;else settings.editable.debug=false;else settings.editable.debug=false;if(typeof o.error!=="undefined")settings.editable.onError=o.error;if(typeof o.data!=="undefined")settings.editable.datae="&"+o.data;if(typeof o.table!=="undefined")switch(typeof o.table){case "boolean":settings.editable.isTable=o.table;settings.editable.tcoord=false;
break;case "object":settings.editable.isTable=true;settings.editable.tcoord=true;if(o.table.type===settings.thSelector){settings.editable.thSelector=true;settings.editable.thSelectorContent=o.table.dom}settings.editable.coordleft=o.table;break;default:settings.editable.isTable=false;settings.editable.tcoord=false;break}if(typeof o.name!=="undefined")settings.editable.b=o.name;else settings.editable.b="term";if(typeof o.encode!=="undefined")settings.editable.encode=o.encode;if(typeof o.wait!=="undefined")settings.editable.onActionActive=
o.wait;else settings.editable.onActionActive=function(){};if(typeof o.result!=="undefined")settings.editable.c=o.result;else settings.editable.c=function(){};return{get:function(){settings.editable.ajaxT="get";settings.editable.onAjaxFx()},post:function(){settings.editable.ajaxT="post";settings.editable.onAjaxFx()}}};function var_dump(v){switch(typeof v){case "object":for(var i in v)if(typeof v==="object")var_dump(v[i]);else console.log(i+":"+v[i]);break;default:console.log(typeof v+":"+v);break}}
function dumpAll(v){}var makeEditable=function(event){var e=event||window.event;var sender=e.target;var senderTag=sender.tagName;var senderContent=sender.innerHTML;switch(e.type){case "dblclick":makeInput(senderTag,sender,senderContent);break;case "blur":sender.parentNode.innerHTML=sender.value;sendHTML(senderTag,sender,senderContent);break;case "change":sendHTML(senderTag,sender,senderContent);break;case "keypress":makeInput(senderTag,sender,senderContent);break;case "click":makeInput(senderTag,
sender,senderContent);break;case "mouseover":makeInput(senderTag,sender,senderContent);break}};function tableCheker(a,b,c){var dataEx="";if(settings.editable.isTable){var trParent=b.parentNode;var trRowIndex=trParent.rowIndex;var tableParent=trParent.parentNode.parentNode;var tmpTH=tableParent.getElementsByTagName("TH");var tmpCellName=tmpTH[b.cellIndex].innerHTML;var x=0,any,idRowName;if(settings.editable.tcoord){if(settings.editable.coordleft===true)x=0;else if(typeof settings.editable.coordleft===
"object")switch(settings.editable.coordleft.type){case "idSelector":x=settings.editable.coordleft.dom.cellIndex;break;case "classSelector":x=settings.editable.coordleft.dom[0].cellIndex;break;case "thSelector":x=getElementByThContent(tmpTH,settings.editable.thSelectorContent);break;case "tagSelector":x=settings.editable.coordleft.dom[0].cellIndex;break}idContent=tableParent.rows[trRowIndex].cells[x].innerHTML;dataEx+="&"+settings.idRow+"="+idContent+"&"+settings.idRowName+"="+tmpTH[x].innerHTML;settings.editable.dataTable=
"&"+settings.termColumn+"="+tmpCellName+dataEx}else settings.editable.b=tmpCellName}}var makeInput=function(a,b,c){switch(a){case settings.editable.g:tableCheker(a,b,c);b.innerHTML="<input type='text' value='"+c+"' />";b.childNodes[0].focus();b.childNodes[0].onblur=makeEditable;break}};var sendHTML=function(a,b,c){var termValue="editable";if(typeof b!=="undefined")termValue=b.value;if(typeof settings.editable.onActionActive!=="undefined")settings.editable.onActionActive();var ix=settings.editable.b;
var data=ix+"="+termValue+settings.editable.datae+settings.editable.dataTable;data=scannerInput(data);if(settings.editable.isAjax)if(settings.editable.ajaxT==="get")get(settings.editable.u+"?"+data,settings.editable.c);else post(settings.editable.u,data,settings.editable.c)};function iteraObj_obj(selector,o){var temp=selector;var temporal={};temporal.fl=function(x){},temporal.ff=function(y){};temporal.flC="",temporal.ffC="";if(typeof o.f!=="undefined"){temporal.ff=o.f;temporal.ffC=temp[0];temp[0]=
undefined}if(typeof o.l!=="undefined"){temporal.fl=o.l;temporal.flC=temp[temp.length-1];temp[temp.length-1]=undefined}var select=[];itera(temp,function(x){if(typeof x!=="undefined")select.push(x)});temporal.ff(temporal.ffC);itera(select,function(x){o.b(x)});temporal.fl(temporal.flC)}function iteraObjI(select,o){if(typeof o==="undefined")return false;switch(Object.prototype.toString.call(o)){case "[object Array]":itera(o,function(i){i["do"](select[i.at])});break;case "[object Object]":iteraObj_obj(select,
o);break;case "[object Function]":itera(select,o);break}}var selector=function(){if(typeof s==="undefined")return s;if(typeof s==="object")return s;var index=s.substring(0,1),t;s=s.replace(index,"");switch(index){case "#":t=document.getElementById(s);settings.editable.typeSelector="idSelector";break;case ".":t=document.getElementsByClassName(s);settings.editable.typeSelector="classSelector";break;case "@":t=s;settings.editable.typeSelector="thSelector";break;case "$":t=document.getElementsByName(s);
settings.editable.typeSelector="nameSelector";break;default:t=document.getElementsByTagName(index+s);settings.editable.typeSelector="tagSelector";break}return t};var options=function(t){var select=t;return{event:function(e){settings.editable.event=e;return this},bind:function(e,w){var f=function(){sEL(t,e,w,false)};eventCenter(t,settings.editable.event,f)},bindList:function(o){if(o==="undefined")return false;settings.editable.eventList=o;return this},fx:function(f){eventCenter(t,settings.editable.event,
f)},editable:function(G){settings.editable.g=G.toUpperCase();typeof settings.editable.event!="undefined"?sEL(t,settings.editable.event,makeEditable,true):sEL(t,"dblclick",makeEditable,true);return{send:function(o){if(typeof o==="object")return ajx(o);else console.log("Send must recives an object.")}}},send:function(o){t===null?false:sEL(t,"change",makeEditable,true);if(typeof o==="object")return ajx(o);else console.log("Send must recives an object.")},forward:function(o){if(typeof o!=="object"){console.log("Send must recives an object.");
return false}function f(){if(typeof t==="undefined")sendHTML("",undefined,"");else sendHTML(t.tagName,t,t.innerHTML)}settings.editable.onAjaxFx=f;return ajx(o)},dom:t,code:function(h){innerContent(t,h,false)},codeConcat:function(h){innerContent(t,h,true)},domntype:{type:settings.editable.typeSelector,dom:t},show:function(fade){var f=function(){typeof fade!=="undefined"?show(select,fade):show(select)};eventCenter(t,settings.editable.event,f)},hide:function(fade){var f=function(){typeof fade!=="undefined"?
hide(select,fade):hide(select)};eventCenter(t,settings.editable.event,f)},fade:function(speed){var f=function(){fade(select,speed)};eventCenter(t,settings.editable.event,f)},msg:function(data,speed,fade,kind,attach){if(typeof data==="undefined"||typeof data!=="object")return false;var f=function(){kind=typeof kind==="undefined"?"none":kind;attach=typeof attach!=="undefined"&&attach==="default"?"default":"override";fade=typeof fade==="undefined"||!fade?false:fade;speed=typeof speed==="undefined"||
!speed?false:speed;msg(select,data,kind,fade,speed,attach)};eventCenter(t,settings.editable.event,f)},none:function(fade){var f=function(){typeof fade!=="undefined"?none(select,fade):none(select)};eventCenter(t,settings.editable.event,f)},say:function(word){if(typeof settings.editable.event!=="undefined")this.bind(settings.editable.event,function(){console.log(word)});else console.log(word)},each:function(o){var f=function(){iteraObjI(select,o)};eventCenter(t,settings.editable.event,f)},eachO:function(o){var f=
function(){iteraO(select,o)};eventCenter(t,settings.editable.event,f)},eachR:function(o){var f=function(){recursiveObj(select,o,"")};eventCenter(t,settings.editable.event,f)},done:function(f){window.onload=f}}};obj=options(selector());return obj};
