/*
jQWidgets v3.4.0 (2014-June-23)
Copyright (c) 2011-2014 jQWidgets.
License: http://jqwidgets.com/license/
*/

try{(function(j,c){c.jqwidgets=c.jqwidgets||{};c.jqwidgets.knockout=function(D){var E=this;var F={},C=D.name;F.init=function(K,L,H,J){var G=c.utils.unwrapObservable(L());var N=c.toJS(G);if(D.reset){D.reset()}if(j.data(K)[C]==undefined){var I=[];j(K)[C]();widget=j.data(K)[C].instance;j.each(D,function(P,Q){if(widget.hasOwnProperty(P)&&N.hasOwnProperty(P)){if(!widget.koupdating){widget.koupdatingFromObservable=true;try{var R=false;if(D.serialize){if(D.serialize(widget,P)){if(c.toJSON(N[P])!=c.toJSON(D.serialize(widget,P))){D.setProperty(widget,P,widget[P],N[P])}R=true}}if(!R){if(c.toJSON(N[P])!=c.toJSON(widget[P])){D.setProperty(widget,P,widget[P],N[P])}}}catch(O){D.setProperty(widget,P,widget[P],N[P])}I[P]=P;widget.koupdatingFromObservable=false}}});var M={};j.each(N,function(O,P){if(I[O]==undefined){M[O]=N[O]}});widget.host[C](M)}widget=j.data(K)[C].instance;widget.koupdatingFromObservable=false;widget.koupdating=false;if(D.events){j.each(D.events,function(){var O=this;j(K).on(O+"."+K.id,function(Q){widget=j.data(K)[C].instance;if(!widget.koupdatingFromObservable){var P=widget;P.koupdating=true;var S=L();var R=D.getProperty(widget,Q,O,G);if(R!=undefined){if(S.hasOwnProperty(R.name)&&j.isFunction(S[R.name])){if(c.isObservable(S[R.name])&&S[R.name].push){L(R.value)}else{S[R.name](R.value)}}else{if(S[R.name]){L(R.value)}}}P.koupdating=false}})})}};F.update=function(K,L,I,J,H){var G=c.utils.unwrapObservable(L());var M=c.toJS(G);widget=j.data(K)[C].instance;if(widget.koupdating){return}j.each(D,function(N,O){if(widget.hasOwnProperty(N)&&M.hasOwnProperty(N)){if(!widget.koupdating){widget.koupdatingFromObservable=true;var P=false;if(D.serialize){if(D.serialize(widget,N)){if(c.toJSON(M[N])!=c.toJSON(D.serialize(widget,N))){D.setProperty(widget,N,widget[N],M[N])}P=true}}if(!P){if(c.toJSON(M[N])!=c.toJSON(widget[N])){D.setProperty(widget,N,widget[N],M[N])}}widget.koupdatingFromObservable=false}}})};c.bindingHandlers[D.name]=F};var y=new c.jqwidgets.knockout({name:"jqxGauge",disabled:false,min:0,max:220,value:0,reset:function(){this.value=0;this.max=220;this.min=0;this.disabled=false},getProperty:function(D,E,C){},setProperty:function(C,D,E,F){if(D=="disabled"){C.host.jqxGauge({disabled:F})}if(D=="min"){C.host.jqxGauge({min:F})}if(D=="max"){C.host.jqxGauge({max:F})}if(D=="value"){C.host.jqxGauge({value:F})}}});var e=new c.jqwidgets.knockout({name:"jqxLinearGauge",disabled:false,min:0,max:220,value:0,reset:function(){this.value=0;this.max=220;this.min=0;this.disabled=false},getProperty:function(D,E,C){},setProperty:function(C,D,E,F){if(D=="disabled"){C.host.jqxLinearGauge({disabled:F})}if(D=="min"){C.host.jqxLinearGauge({min:F})}if(D=="max"){C.host.jqxLinearGauge({max:F})}if(D=="value"){C.host.jqxLinearGauge({value:F})}}});var x=new c.jqwidgets.knockout({name:"jqxSlider",disabled:false,min:0,max:10,value:0,reset:function(){this.value=0;this.max=10;this.min=0;this.disabled=false},events:["change"],getProperty:function(D,E,C){if(C=="change"){return{name:"value",value:E.args.value}}},setProperty:function(C,D,E,F){if(D=="disabled"){C.host.jqxSlider({disabled:F})}if(D=="min"){C.host.jqxSlider({min:parseFloat(F)})}if(D=="max"){C.host.jqxSlider({max:parseFloat(F)})}if(D=="value"){C.host.jqxSlider({value:parseFloat(F)})}}});var q=new c.jqwidgets.knockout({name:"jqxScrollBar",disabled:false,min:0,max:10,value:0,reset:function(){this.value=0;this.max=10;this.min=0;this.disabled=false},events:["valuechanged"],getProperty:function(D,E,C){if(C=="valuechanged"){return{name:"value",value:parseInt(E.currentValue)}}},setProperty:function(C,D,E,F){if(D=="disabled"){C.host.jqxScrollBar({disabled:F})}if(D=="min"){C.host.jqxScrollBar({min:parseFloat(F)})}if(D=="max"){C.host.jqxScrollBar({max:parseFloat(F)})}if(D=="value"){C.host.jqxScrollBar({value:parseFloat(F)})}}});var a=new c.jqwidgets.knockout({name:"jqxProgressBar",disabled:false,value:0,reset:function(){this.value=0;this.disabled=false},events:["valuechanged"],getProperty:function(D,E,C){if(C=="valuechanged"){return{name:"value",value:parseInt(E.currentValue)}}},setProperty:function(C,D,E,F){if(D=="disabled"){C.host.jqxProgressBar({disabled:F})}if(D=="value"){C.host.jqxProgressBar({value:parseFloat(F)})}}});var f=new c.jqwidgets.knockout({name:"jqxButton",disabled:false,reset:function(){this.disabled=false},getProperty:function(D,E,C){},setProperty:function(C,D,E,F){if(D=="disabled"){C.host.jqxButton({disabled:F})}}});var i=new c.jqwidgets.knockout({name:"jqxCheckBox",checked:false,disabled:false,reset:function(){this.checked=false;this.disabled=false},events:["change"],getProperty:function(D,E,C){if(C=="change"){return{name:"checked",value:E.args.checked}}},setProperty:function(C,D,E,F){if(D=="disabled"){C.host.jqxCheckBox({disabled:F})}if(D=="checked"){if(E!=F){C.host.jqxCheckBox({checked:F})}}}});var z=new c.jqwidgets.knockout({name:"jqxRadioButton",checked:false,disabled:false,reset:function(){this.checked=false;this.disabled=false},events:["change"],getProperty:function(D,E,C){if(C=="change"){return{name:"checked",value:E.args.checked}}},setProperty:function(C,D,E,F){if(D=="disabled"){C.host.jqxRadioButton({disabled:F})}if(D=="checked"){if(E!=F){C.host.jqxRadioButton({checked:F})}}}});var p=new c.jqwidgets.knockout({name:"jqxDateTimeInput",value:null,disabled:false,reset:function(){this.value=null;this.disabled=false},events:["valuechanged"],getProperty:function(D,E,C){if(C=="valuechanged"){return{name:"value",value:E.args.date}}},setProperty:function(C,D,E,F){if(D=="value"){C.setDate(F)}if(D=="disabled"){C.host.jqxDateTimeInput({disabled:F})}}});var B=new c.jqwidgets.knockout({name:"jqxCalendar",value:null,disabled:false,reset:function(){this.value=null;this.disabled=false},events:["valuechanged"],getProperty:function(D,E,C){if(C=="valuechanged"){return{name:"value",value:E.args.date}}},setProperty:function(C,D,E,F){if(D=="value"){C.setDate(F)}if(D=="disabled"){C.host.jqxCalendar({disabled:F})}}});var s=new c.jqwidgets.knockout({name:"jqxNumberInput",value:null,events:["valuechanged"],disabled:false,reset:function(){this.value=null;this.disabled=false},getProperty:function(D,E,C){if(C=="valuechanged"){return{name:"value",value:D.val()}}},setProperty:function(C,D,E,F){if(D=="value"){C.host.jqxNumberInput("val",F)}if(D=="disabled"){C.host.jqxNumberInput({disabled:F})}}});var l=new c.jqwidgets.knockout({name:"jqxMaskedInput",value:null,events:["valuechanged"],disabled:false,reset:function(){this.value=null;this.disabled=false},getProperty:function(D,E,C){if(C=="valuechanged"){return{name:"value",value:D.val()}}},setProperty:function(C,D,E,F){if(D=="value"){C.host.jqxMaskedInput("val",F)}if(D=="disabled"){C.host.jqxMaskedInput({disabled:F})}}});var d=new c.jqwidgets.knockout({name:"jqxListBox",source:null,disabled:false,selectedIndex:-1,reset:function(){this.disabled=false;this.selectedIndex=-1;this.source=null},events:["change"],getProperty:function(D,E,C){if(C=="change"){this.selectedIndex=D.selectedIndex;return{name:"selectedIndex",value:D.selectedIndex}}},setProperty:function(C,D,F,G){if(D=="source"){C.source=G;C.refresh()}if(D=="disabled"){C.disabled=G;C._renderItems()}if(D=="selectedIndex"){var E=C.disabled;C.disabled=false;C.selectIndex(G);C.disabled=E;if(E){C._renderItems()}}}});var t=new c.jqwidgets.knockout({name:"jqxDropDownList",source:null,disabled:false,selectedIndex:-1,reset:function(){this.disabled=false;this.selectedIndex=-1;this.source=null},events:["change"],getProperty:function(D,E,C){if(C=="change"){return{name:"selectedIndex",value:D.selectedIndex}}},setProperty:function(C,D,E,F){if(D=="source"){C.host.jqxDropDownList({source:F})}if(D=="disabled"){C.host.jqxDropDownList({disabled:F})}if(D=="selectedIndex"){C.host.jqxDropDownList({selectedIndex:F})}}});var k=new c.jqwidgets.knockout({name:"jqxComboBox",source:null,disabled:false,selectedIndex:-1,reset:function(){this.disabled=false;this.selectedIndex=-1;this.source=null},events:["change"],getProperty:function(D,E,C){if(C=="change"){return{name:"selectedIndex",value:D.selectedIndex}}},setProperty:function(C,D,E,F){if(D=="source"){C.host.jqxComboBox({source:F})}if(D=="disabled"){C.host.jqxComboBox({disabled:F})}if(D=="selectedIndex"){C.host.jqxComboBox({selectedIndex:F})}}});var v=new c.jqwidgets.knockout({name:"jqxInput",source:null,disabled:false,value:"",reset:function(){this.disabled=false;this.source=null},events:["change"],getProperty:function(D,E,C){if(C=="change"){return{name:"value",value:D.host.val()}}},setProperty:function(C,D,E,F){if(D=="source"){C.host.jqxInput({source:F})}if(D=="disabled"){C.host.jqxInput({disabled:F})}if(D=="value"){C.host.jqxInput({value:F})}}});var A=new c.jqwidgets.knockout({name:"jqxTree",source:null,disabled:false,reset:function(){this.disabled=false;this.source=null},getProperty:function(D,E,C){},setProperty:function(C,D,E,F){if(D=="source"){C.host.jqxTree({source:F})}if(D=="disabled"){C.host.jqxTree({disabled:F})}}});var g=new c.jqwidgets.knockout({name:"jqxTabs",disabled:false,reset:function(){this.disabled=false},getProperty:function(D,E,C){},setProperty:function(C,D,E,F){if(D=="disabled"){C.host.jqxTabs({disabled:F})}}});var r=new c.jqwidgets.knockout({name:"jqxWindow",disabled:false,content:"",title:"",reset:function(){this.disabled=false;this.title="";this.content=""},getProperty:function(D,E,C){},setProperty:function(C,D,E,F){if(D=="disabled"){C.host.jqxWindow({disabled:F})}else{if(D=="content"){C.host.jqxWindow("setContent",F)}else{if(D=="title"){C.host.jqxWindow({title:F})}}}}});var u=new c.jqwidgets.knockout({name:"jqxNavigationBar",disabled:false,reset:function(){this.disabled=false},getProperty:function(D,E,C){},setProperty:function(C,D,E,F){if(D=="disabled"){if(F!=this.disabled){this.disabled=F;C.host.jqxNavigationBar({disabled:F})}}}});var o=new c.jqwidgets.knockout({name:"jqxMenu",source:null,disabled:false,reset:function(){this.disabled=false;this.source=null},getProperty:function(D,E,C){},setProperty:function(C,D,E,F){if(D=="source"){C.host.jqxMenu({source:F})}if(D=="disabled"){C.host.jqxMenu({disabled:F})}}});var w=new c.jqwidgets.knockout({name:"jqxChart",source:null,disabled:false,reset:function(){this.disabled=false;this.source=null},getProperty:function(D,E,C){},setProperty:function(C,D,E,F){if(D=="source"){this.source=F;C.host.jqxChart({source:F})}if(D=="disabled"){this.disabled=F;C.host.jqxChart({disabled:F})}}});var b=new c.jqwidgets.knockout({name:"jqxDataTable",source:null,disabled:false,reset:function(){this.disabled=false;this.source=null},getProperty:function(D,E,C){},setProperty:function(C,D,E,F){if(D=="source"){this.source=F;C.host.jqxDataTable({source:F})}if(D=="disabled"){this.disabled=F;C.host.jqxDataTable({disabled:F})}}});var n=new c.jqwidgets.knockout({name:"jqxTreeGrid",source:null,disabled:false,reset:function(){this.disabled=false;this.source=null},getProperty:function(D,E,C){},setProperty:function(C,D,E,F){if(D=="source"){this.source=F;C.host.jqxTreeGrid({source:F})}if(D=="disabled"){this.disabled=F;C.host.jqxTreeGrid({disabled:F})}}});var m=new c.jqwidgets.knockout({name:"jqxGrid",source:null,disabled:false,selectedRowIndex:-1,reset:function(){this.disabled=false;this.source=null;this.selectedRowIndex=-1},serialize:function(D,C){if(C=="source"){if(D.source&&D.source._source){return D.source.records}}return false},events:["cellvaluechanged","cellselect","rowselect"],getProperty:function(G,E,I,H){if(I=="cellvaluechanged"){var F=G.host.jqxGrid("getrowid",E.args.rowindex);var M=G.host.jqxGrid("getrowdata",F);var D=H.source;if(D!=undefined){var L={};var C={};var K=false;var J=false;j.each(D()[F],function(N,O){L[N]=O;C[N]="";if(c.isObservable(O)&&!c.isComputed(O)){K=true;O(M[N])}if(c.isObservable(O)&&c.isComputed(O)){J=true}});if(!K){L=M;D.replace(D()[F],C);D.replace(D()[F],L)}else{D.replace(D()[F],L)}if(J){G.host.jqxGrid("updaterow",F,c.toJS(D)[F])}return{name:"source",value:D}}}},setProperty:function(F,M,L,D){if(M=="selectedRowIndex"){F.host.jqxGrid("selectrow",D)}if(M=="source"){if(this.source==null||D==null){if(this.source!=D){this.source=D;var C={localdata:D,datatype:"local"};var K=new j.jqx.dataAdapter(C);F.host.jqxGrid({source:K})}}else{var C={localdata:D,datatype:"local"};var K=new j.jqx.dataAdapter(C);K.dataBind();if(!L.records||!K.records){return}var O=Math.max(L.records.length,K.records.length);var J=Math.abs(L.records.length-K.records.length);if(J==0){if(O>10){F.host.jqxGrid({source:K});return}}if(J>1){F.host.jqxGrid("beginupdate")}var N=new Array();for(var H=0;H<O;H++){var I=K.records[H];if(I==undefined){var E=F.host.jqxGrid("getrowid",H);N.push(E)}else{var G=L.records[H]!=undefined;if(G){if(c.toJSON(I)!=c.toJSON(L.records[H])){if(L.records[H].uid!=undefined){I.uid=L.records[H].uid;if(c.toJSON(I)==c.toJSON(L.records[H])){continue}}var E=F.host.jqxGrid("getrowid",H);F.host.jqxGrid("updaterow",E,I)}}else{F.host.jqxGrid("addrow",null,I)}}}if(N.length>0){F.host.jqxGrid("deleterow",N)}if(J>1){F.host.jqxGrid("endupdate")}}}if(M=="disabled"){F.host.jqxGrid({disabled:D})}}});var h=new c.jqwidgets.knockout({name:"jqxBulletChart",pointer:{value:0},target:{value:0},disabled:false,reset:function(){this.pointer.value=0;this.target.value=0;this.disabled=false},getProperty:function(D,E,C){},setProperty:function(C,D,E,F){if(D=="pointer"){C.host.jqxBulletChart({pointer:F})}if(D=="target"){C.host.jqxBulletChart({target:F})}if(D=="disabled"){C.host.jqxBulletChart({disabled:F})}}})}(jQuery,ko))}catch(error){var er=error};