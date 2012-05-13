jQuery.webshims.register("form-extend",function(a,c,h,i,m,k){h=h.Modernizr;m=h.inputtypes;if(h.formvalidation&&!c.bugs.bustedValidity){var g=c.inputTypes,p={};c.addInputType=function(a,b){g[a]=b};c.addValidityRule=function(a,b){p[a]=b};c.addValidityRule("typeMismatch",function(a,b,l,d){if(""===b)return!1;d=d.typeMismatch;if(!("type"in l))l.type=(a[0].getAttribute("type")||"").toLowerCase();g[l.type]&&g[l.type].mismatch&&(d=g[l.type].mismatch(b,a));return d});var j=k.overrideMessages,r=!m.number||
!m.time||!m.range||j,t="customError,typeMismatch,rangeUnderflow,rangeOverflow,stepMismatch,tooLong,patternMismatch,valueMissing,valid".split(","),k=j?["value","checked"]:["value"],o=[],q=function(e,b){if(e){var l=(e.getAttribute&&e.getAttribute("type")||e.type||"").toLowerCase();if(j||g[l])j&&!b&&"radio"==l&&e.name?a(i.getElementsByName(e.name)).each(function(){a.prop(this,"validity")}):a.prop(e,"validity")}},b={};["input","textarea","select"].forEach(function(e){var s=c.defineNodeNameProperty(e,
"setCustomValidity",{prop:{value:function(b){var b=b+"",d="input"==e?a(this).getNativeElement()[0]:this;s.prop._supvalue.call(d,b);c.bugs.validationMessage&&c.data(d,"customvalidationMessage",b);r&&(c.data(d,"hasCustomError",!!b),q(d))}}});b[e]=s.prop._supvalue});if(r||j)k.push("min"),k.push("max"),k.push("step"),o.push("input");j&&(k.push("required"),k.push("pattern"),o.push("select"),o.push("textarea"));if(r){var d;o.forEach(function(e){var s=c.defineNodeNameProperty(e,"validity",{prop:{get:function(){if(!d){var l=
"input"==e?a(this).getNativeElement()[0]:this,n=s.prop._supget.call(l);if(!n)return n;var f={};t.forEach(function(a){f[a]=n[a]});if(!a.prop(l,"willValidate"))return f;d=!0;var h=a(l),u={type:(l.getAttribute&&l.getAttribute("type")||"").toLowerCase(),nodeName:(l.nodeName||"").toLowerCase()},i=h.val(),o=!!c.data(l,"hasCustomError"),k;d=!1;f.customError=o;if(f.valid&&f.customError)f.valid=!1;else if(!f.valid){var q=!0;a.each(f,function(a,e){if(e)return q=!1});if(q)f.valid=!0}a.each(p,function(a,d){f[a]=
d(h,i,u,f);if(f[a]&&(f.valid||!k)&&(j||g[u.type]&&g[u.type].mismatch))b[e].call(l,c.createValidationMessage(l,a)),f.valid=!1,k=!0});f.valid?(b[e].call(l,""),c.data(l,"hasCustomError",!1)):j&&!k&&!o&&a.each(f,function(a,d){if("valid"!==a&&d)return b[e].call(l,c.createValidationMessage(l,a)),!1});return f}},writeable:!1}})});k.forEach(function(a){c.onNodeNamesPropertyModify(o,a,function(){q(this)})});if(i.addEventListener){var n;i.addEventListener("change",function(a){clearTimeout(n);q(a.target)},!0);
i.addEventListener("input",function(a){clearTimeout(n);n=setTimeout(function(){q(a.target)},290)},!0)}var f=o.join(",");c.addReady(function(e,b){a(f,e).add(b.filter(f)).each(function(){a.prop(this,"validity")})});j&&c.ready("DOM form-message",function(){c.activeLang({register:"form-core",callback:function(){a("input, select, textarea").getNativeElement().each(function(){if(!c.data(this,"hasCustomError")){var e=this,d=a.prop(e,"validity")||{valid:!0},l;d.valid||(l=(e.nodeName||"").toLowerCase(),a.each(d,
function(a,d){if("valid"!==a&&d)return b[l].call(e,c.createValidationMessage(e,a)),!1}))}})}})})}c.defineNodeNameProperty("input","type",{prop:{get:function(){var a=(this.getAttribute("type")||"").toLowerCase();return c.inputTypes[a]?a:this.type}}});h.input.list&&!(a("<datalist><select><option></option></select></datalist>").prop("options")||[]).length&&c.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var e=this.options||[];if(!e.length){var b=a("select",this);if(b[0]&&
b[0].options&&b[0].options.length)e=b[0].options}return e}}})}});
(function(a){var c=window.Modernizr,h=a.webshims,i=h.bugs,m=a('<form action="#" style="width: 1px; height: 1px; overflow: hidden;"><select name="b" required /><input type="date" required name="a" /><input type="submit" /></form>'),k=function(){if(m[0].querySelector)try{i.findRequired=!m[0].querySelector("select:required")}catch(a){i.findRequired=!1}};i.findRequired=!1;i.validationMessage=!1;i.valueAsNumberSet=!1;h.capturingEventPrevented=function(c){if(!c._isPolyfilled){var g=c.isDefaultPrevented,
j=c.preventDefault;c.preventDefault=function(){clearTimeout(a.data(c.target,c.type+"DefaultPrevented"));a.data(c.target,c.type+"DefaultPrevented",setTimeout(function(){a.removeData(c.target,c.type+"DefaultPrevented")},30));return j.apply(this,arguments)};c.isDefaultPrevented=function(){return!(!g.apply(this,arguments)&&!a.data(c.target,c.type+"DefaultPrevented"))};c._isPolyfilled=!0}};if(!c.formvalidation||i.bustedValidity)k();else{c.bugfreeformvalidation=!0;if(window.opera||a.browser.webkit||window.testGoodWithFix){var g=
a("input",m).eq(0),p,j=function(j){var i=["form-extend","form-message","form-native-fix"];j&&(j.preventDefault(),j.stopImmediatePropagation());clearTimeout(p);setTimeout(function(){m&&(m.remove(),m=g=null)},9);if(!c.bugfreeformvalidation)h.addPolyfill("form-native-fix",{f:"forms",d:["form-extend"]}),h.modules["form-extend"].test=a.noop;h.isReady("form-number-date-api")&&i.push("form-number-date-api");h.reTest(i);if(a.browser.opera||window.testGoodWithFix)h.loader.loadList(["dom-extend"]),h.ready("dom-extend",
function(){var g=function(a){a.preventDefault()};["form","input","textarea","select"].forEach(function(b){var d=h.defineNodeNameProperty(b,"checkValidity",{prop:{value:function(){h.fromSubmit||a(this).bind("invalid.checkvalidity",g);h.fromCheckValidity=!0;var b=d.prop._supvalue.apply(this,arguments);h.fromSubmit||a(this).unbind("invalid.checkvalidity",g);h.fromCheckValidity=!1;return b}}})});c.input.list&&!(a("<datalist><select><option></option></select></datalist>").prop("options")||[]).length&&
h.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var b=this.options||[];if(!b.length){var d=a("select",this);if(d[0]&&d[0].options&&d[0].options.length)b=d[0].options}return b}}})})};m.appendTo("head");if(window.opera||window.testGoodWithFix){k();i.validationMessage=!g.prop("validationMessage");if((c.inputtypes||{}).date){try{g.prop("valueAsNumber",0)}catch(r){}i.valueAsNumberSet="1970-01-01"!=g.prop("value")}g.prop("value","")}m.bind("submit",function(a){c.bugfreeformvalidation=
!1;j(a)});p=setTimeout(function(){m&&m.triggerHandler("submit")},9);h.capturingEvents(["input"]);h.capturingEvents(["invalid"],!0);a("input, select",m).bind("invalid",j).filter('[type="submit"]').bind("click",function(a){a.stopImmediatePropagation()}).trigger("click")}h.capturingEvents(["input"]);h.capturingEvents(["invalid"],!0)}})(jQuery);
jQuery.webshims.register("form-core",function(a,c,h,i,m,k){var g={radio:1},p={checkbox:1,radio:1},j=a([]),r=c.bugs,t=function(e){var e=a(e),b,d;b=j;if(g[e[0].type])d=e.prop("form"),b=(b=e[0].name)?d?a(d[b]):a(i.getElementsByName(b)).filter(function(){return!a.prop(this,"form")}):e,b=b.filter('[type="radio"]');return b},o=c.getContentValidationMessage=function(e,b){var d=e.getAttribute("x-moz-errormessage")||e.getAttribute("data-errormessage")||"";if(d&&-1!=d.indexOf("{")){try{d=jQuery.parseJSON(d)}catch(f){return d}"object"==
typeof d&&(b=b||a.prop(e,"validity")||{valid:1},b.valid||a.each(b,function(a,e){if(e&&"valid"!=a&&d[a])return d=d[a],!1}));c.data(e,"contentErrorMessage",d);if("object"==typeof d)d=d.defaultMessage}return d||""},q={number:1,range:1,date:1};a.extend(a.expr.filters,{"valid-element":function(e){return!(!a.prop(e,"willValidate")||!(a.prop(e,"validity")||{valid:1}).valid)},"invalid-element":function(e){return!(!a.prop(e,"willValidate")||(a.prop(e,"validity")||{valid:1}).valid)},"required-element":function(e){return!(!a.prop(e,
"willValidate")||!a.prop(e,"required"))},"optional-element":function(e){return!!(a.prop(e,"willValidate")&&!1===a.prop(e,"required"))},"in-range":function(e){if(!q[a.prop(e,"type")]||!a.prop(e,"willValidate"))return!1;e=a.prop(e,"validity");return!(!e||e.rangeOverflow||e.rangeUnderflow)},"out-of-range":function(e){if(!q[a.prop(e,"type")]||!a.prop(e,"willValidate"))return!1;e=a.prop(e,"validity");return!(!e||!e.rangeOverflow&&!e.rangeUnderflow)}});["valid","invalid","required","optional"].forEach(function(e){a.expr.filters[e]=
a.expr.filters[e+"-element"]});var b=a.event.customEvent||{};(r.bustedValidity||r.findRequired)&&function(){var e=a.find,b=a.find.matchesSelector,d=/(\:valid|\:invalid|\:optional|\:required|\:in-range|\:out-of-range)(?=[\s\[\~\.\+\>\:\#*]|$)/ig,c=function(a){return a+"-element"};a.find=function(){var a=Array.prototype.slice,b=function(b){var f=arguments,f=a.call(f,1,f.length);f.unshift(b.replace(d,c));return e.apply(this,f)},f;for(f in e)e.hasOwnProperty(f)&&(b[f]=e[f]);return b}();if(!Modernizr.prefixed||
Modernizr.prefixed("matchesSelector",i.documentElement))a.find.matchesSelector=function(a,e){e=e.replace(d,c);return b.call(this,a,e)}}();var d=a.prop,n={selectedIndex:1,value:1,checked:1,disabled:1,readonly:1};a.prop=function(e,b,c){var f=d.apply(this,arguments);if(e&&"form"in e&&n[b]&&c!==m&&a(e).hasClass("form-ui-invalid")&&(a.prop(e,"validity")||{valid:1}).valid)a(e).getShadowElement().removeClass("form-ui-invalid"),"checked"==b&&c&&t(e).not(e).removeClass("form-ui-invalid").removeAttr("aria-invalid");
return f};var f=function(e,b){var d;a.each(e,function(e,c){if(c)return d="customError"==e?a.prop(b,"validationMessage"):e,!1});return d};a(i).bind("focusout change refreshvalidityui",function(e){if(e.target&&"submit"!=e.target.type&&a.prop(e.target,"willValidate")){var b=a.data(e.target,"webshimsswitchvalidityclass");b&&clearTimeout(b);a.data(e.target,"webshimsswitchvalidityclass",setTimeout(function(){var b=a(e.target).getNativeElement()[0],d=a.prop(b,"validity"),c=a(b).getShadowElement(),n,s,g,
j;d.valid?c.hasClass("form-ui-valid")||(n="form-ui-valid",s="form-ui-invalid",j="changedvaliditystate",g="changedvalid",p[b.type]&&b.checked&&t(b).not(b).removeClass(s).addClass(n).removeAttr("aria-invalid"),a.removeData(b,"webshimsinvalidcause")):(d=f(d,b),a.data(b,"webshimsinvalidcause")!=d&&(a.data(b,"webshimsinvalidcause",d),j="changedvaliditystate"),c.hasClass("form-ui-invalid")||(n="form-ui-invalid",s="form-ui-valid",p[b.type]&&!b.checked&&t(b).not(b).removeClass(s).addClass(n),g="changedinvalid"));
n&&(c.addClass(n).removeClass(s),setTimeout(function(){a(b).trigger(g)},0));j&&setTimeout(function(){a(b).trigger(j)},0);a.removeData(e.target,"webshimsswitchvalidityclass")},9))}});b.changedvaliditystate=!0;b.changedvalid=!0;b.changedinvalid=!0;b.refreshvalidityui=!0;c.triggerInlineForm=function(b,d){a(b).trigger(d)};c.modules["form-core"].getGroupElements=t;r=function(){c.scrollRoot=a.browser.webkit||"BackCompat"==i.compatMode?a(i.body):a(i.documentElement)};r();c.ready("DOM",r);c.getRelOffset=
function(b,d){var b=a(b),c=a(d).offset(),f;a.swap(a(b)[0],{visibility:"hidden",display:"inline-block",left:0,top:0},function(){f=b.offset()});c.top-=f.top;c.left-=f.left;return c};c.validityAlert=function(){var b=!a.browser.msie||7<parseInt(a.browser.version,10)?"span":"label",d,f=!1,n=!1,g,j={hideDelay:5E3,showFor:function(b,e,c,i){j._create();var b=a(b),k=a(b).getShadowElement(),o=j.getOffsetFromBody(k);j.clear();i?this.hide():(this.getMessage(b,e),this.position(k,o),d.css({fontSize:b.css("fontSize"),
fontFamily:b.css("fontFamily")}),this.show(),this.hideDelay&&(f=setTimeout(g,this.hideDelay)),a(h).bind("resize.validityalert orientationchange.validityalert emchange.validityalert",function(){clearTimeout(n);n=setTimeout(function(){j.position(k)},9)}));c||this.setFocus(k,o)},getOffsetFromBody:function(a){return c.getRelOffset(d,a)},setFocus:function(f,n){var j=a(f).getShadowFocusElement(),l=c.scrollRoot.scrollTop(),h=(n||j.offset()).top-30,k;c.getID&&"label"==b&&d.attr("for",c.getID(j));l>h&&(c.scrollRoot.animate({scrollTop:h-
5},{queue:!1,duration:Math.max(Math.min(600,1.5*(l-h)),80)}),k=!0);try{j[0].focus()}catch(o){}k&&(c.scrollRoot.scrollTop(l),setTimeout(function(){c.scrollRoot.scrollTop(l)},0));setTimeout(function(){a(i).bind("focusout.validityalert",g)},10)},getMessage:function(b,e){a("span.va-box",d).text(e||o(b[0])||b.prop("validationMessage"))},position:function(b,e){e=e?a.extend({},e):j.getOffsetFromBody(b);e.top+=b.outerHeight();d.css(e)},show:function(){"none"===d.css("display")&&d.css({opacity:0}).show();
d.addClass("va-visible").fadeTo(400,1)},hide:function(){d.removeClass("va-visible").fadeOut()},clear:function(){clearTimeout(!1);clearTimeout(f);a(i).unbind(".validityalert");a(h).unbind(".validityalert");d.stop().removeAttr("for")},_create:function(){if(!d)d=j.errorBubble=a("<"+b+' class="validity-alert-wrapper" role="alert"><span  class="validity-alert"><span class="va-arrow"><span class="va-arrow-box"></span></span><span class="va-box"></span></span></'+b+">").css({position:"absolute",display:"none"}),
c.ready("DOM",function(){d.appendTo("body");a.fn.bgIframe&&a.browser.msie&&7>parseInt(a.browser.version,10)&&d.bgIframe()})}};g=a.proxy(j,"hide");return j}();(function(){var b,d=[],c;a(i).bind("invalid",function(f){if(!f.wrongWebkitInvalid){var n=a(f.target),j=n.getShadowElement();j.hasClass("form-ui-invalid")||(j.addClass("form-ui-invalid").removeClass("form-ui-valid"),setTimeout(function(){a(f.target).trigger("changedinvalid").trigger("changedvaliditystate")},0));if(!b)b=a.Event("firstinvalid"),
b.isInvalidUIPrevented=f.isDefaultPrevented,j=a.Event("firstinvalidsystem"),a(i).triggerHandler(j,{element:f.target,form:f.target.form,isInvalidUIPrevented:f.isDefaultPrevented}),n.trigger(b);b&&b.isDefaultPrevented()&&f.preventDefault();d.push(f.target);f.extraData="fix";clearTimeout(c);c=setTimeout(function(){var c={type:"lastinvalid",cancelable:!1,invalidlist:a(d)};b=!1;d=[];a(f.target).trigger(c,c)},9);j=n=null}})})();k.replaceValidationUI&&c.ready("DOM",function(){a(i).bind("firstinvalid",function(b){b.isInvalidUIPrevented()||
(b.preventDefault(),a.webshims.validityAlert.showFor(b.target,a(b.target).prop("customValidationMessage")))})})});
jQuery.webshims.register("form-message",function(a,c,h,i,m,k){var g=c.validityMessages,h=k.overrideMessages||k.customMessages?["customValidationMessage"]:[];g.en=g.en||g["en-US"]||{typeMismatch:{email:"Please enter an email address.",url:"Please enter a URL.",number:"Please enter a number.",date:"Please enter a date.",time:"Please enter a time.",range:"Invalid input.","datetime-local":"Please enter a datetime."},rangeUnderflow:{defaultMessage:"Value must be greater than or equal to {%min}."},rangeOverflow:{defaultMessage:"Value must be less than or equal to {%max}."},
stepMismatch:"Invalid input.",tooLong:"Please enter at most {%maxlength} character(s). You entered {%valueLen}.",patternMismatch:"Invalid input. {%title}",valueMissing:{defaultMessage:"Please fill out this field.",checkbox:"Please check this box if you want to proceed."}};["select","radio"].forEach(function(a){g.en.valueMissing[a]="Please select an option."});["date","time","datetime-local"].forEach(function(a){g.en.rangeUnderflow[a]="Value must be at or after {%min}."});["date","time","datetime-local"].forEach(function(a){g.en.rangeOverflow[a]=
"Value must be at or before {%max}."});g["en-US"]=g["en-US"]||g.en;g[""]=g[""]||g["en-US"];g.de=g.de||{typeMismatch:{email:"{%value} ist keine zul\u00e4ssige E-Mail-Adresse",url:"{%value} ist keine zul\u00e4ssige Webadresse",number:"{%value} ist keine Nummer!",date:"{%value} ist kein Datum",time:"{%value} ist keine Uhrzeit",range:"{%value} ist keine Nummer!","datetime-local":"{%value} ist kein Datum-Uhrzeit Format."},rangeUnderflow:{defaultMessage:"{%value} ist zu niedrig. {%min} ist der unterste Wert, den Sie benutzen k\u00f6nnen."},
rangeOverflow:{defaultMessage:"{%value} ist zu hoch. {%max} ist der oberste Wert, den Sie benutzen k\u00f6nnen."},stepMismatch:"Der Wert {%value} ist in diesem Feld nicht zul\u00e4ssig. Hier sind nur bestimmte Werte zul\u00e4ssig. {%title}",tooLong:"Der eingegebene Text ist zu lang! Sie haben {%valueLen} Zeichen eingegeben, dabei sind {%maxlength} das Maximum.",patternMismatch:"{%value} hat f\u00fcr dieses Eingabefeld ein falsches Format! {%title}",valueMissing:{defaultMessage:"Bitte geben Sie einen Wert ein",
checkbox:"Bitte aktivieren Sie das K\u00e4stchen"}};["select","radio"].forEach(function(a){g.de.valueMissing[a]="Bitte w\u00e4hlen Sie eine Option aus"});["date","time","datetime-local"].forEach(function(a){g.de.rangeUnderflow[a]="{%value} ist zu fr\u00fch. {%min} ist die fr\u00fcheste Zeit, die Sie benutzen k\u00f6nnen."});["date","time","datetime-local"].forEach(function(a){g.de.rangeOverflow[a]="{%value} ist zu sp\u00e4t. {%max} ist die sp\u00e4teste Zeit, die Sie benutzen k\u00f6nnen."});var p=
g[""];c.createValidationMessage=function(c,g){var h=p[g];h&&"string"!==typeof h&&(h=h[a.prop(c,"type")]||h[(c.nodeName||"").toLowerCase()]||h.defaultMessage);h&&"value,min,max,title,maxlength,label".split(",").forEach(function(g){if(-1!==h.indexOf("{%"+g)){var i=("label"==g?a.trim(a('label[for="'+c.id+'"]',c.form).text()).replace(/\*$|:$/,""):a.attr(c,g))||"";h=h.replace("{%"+g+"}",i);"value"==g&&(h=h.replace("{%valueLen}",i.length))}});return h||""};(c.bugs.validationMessage||!Modernizr.formvalidation||
c.bugs.bustedValidity)&&h.push("validationMessage");c.activeLang({langObj:g,module:"form-core",callback:function(a){p=a}});Modernizr.input.list&&!(a("<datalist><select><option></option></select></datalist>").prop("options")||[]).length&&c.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var c=this.options||[];if(!c.length){var g=a("select",this);if(g[0]&&g[0].options&&g[0].options.length)c=g[0].options}return c}}});h.forEach(function(g){c.defineNodeNamesProperty(["fieldset",
"output","button"],g,{prop:{value:"",writeable:!1}});["input","select","textarea"].forEach(function(h){var i=c.defineNodeNameProperty(h,g,{prop:{get:function(){var g=this,h="";if(!a.prop(g,"willValidate"))return h;var b=a.prop(g,"validity")||{valid:1};if(b.valid||(h=c.getContentValidationMessage(g,b)))return h;if(b.customError&&g.nodeName&&(h=Modernizr.formvalidation&&!c.bugs.bustedValidity&&i.prop._supget?i.prop._supget.call(g):c.data(g,"customvalidationMessage")))return h;a.each(b,function(a,b){if("valid"!=
a&&b&&(h=c.createValidationMessage(g,a)))return!1});return h||""},writeable:!1}})})})});
jQuery.webshims.register("form-datalist",function(a,c,h,i,m){c.propTypes.element=function(h){c.createPropDefault(h,"attr");if(!h.prop)h.prop={get:function(){var c=h.attr.get.call(this);c&&(c=a("#"+c)[0])&&h.propNodeName&&!a.nodeName(c,h.propNodeName)&&(c=null);return c||null},writeable:!1}};(function(){var k=a.webshims.cfg.forms,g=Modernizr.input.list;if(!g||k.customDatalist){var p=0,j={submit:1,button:1,reset:1,hidden:1,range:1,date:1},r=a.browser.msie&&7>parseInt(a.browser.version,10),t={},o=function(a){if(!a)return[];
if(t[a])return t[a];var d;try{d=JSON.parse(localStorage.getItem("storedDatalistOptions"+a))}catch(c){}t[a]=d||[];return d||[]},q={_create:function(b){if(!j[a.prop(b.input,"type")]){var d=b.datalist,c=a.data(b.input,"datalistWidget");if(d&&c&&c.datalist!==d)c.datalist=d,c.id=b.id,a(c.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",a.proxy(c,"_resetListCached")),c._resetListCached();else if(d){if(!(c&&c.datalist===d)){p++;var f=this;this.hideList=a.proxy(f,"hideList");
this.timedHide=function(){clearTimeout(f.hideTimer);f.hideTimer=setTimeout(f.hideList,9)};this.datalist=d;this.id=b.id;this.hasViewableData=!0;this._autocomplete=a.attr(b.input,"autocomplete");a.data(b.input,"datalistWidget",this);this.shadowList=a('<div class="datalist-polyfill" />');k.positionDatalist?this.shadowList.insertAfter(b.input):this.shadowList.appendTo("body");this.index=-1;this.input=b.input;this.arrayOptions=[];this.shadowList.delegate("li","mouseenter.datalistWidget mousedown.datalistWidget click.datalistWidget",
function(d){var c=a("li:not(.hidden-item)",f.shadowList),g="mousedown"==d.type||"click"==d.type;f.markItem(c.index(d.currentTarget),g,c);"click"==d.type&&(f.hideList(),a(b.input).trigger("datalistselect"));return"mousedown"!=d.type}).bind("focusout",this.timedHide);b.input.setAttribute("autocomplete","off");a(b.input).attr({"aria-haspopup":"true"}).bind("input.datalistWidget",function(){if(!f.triggeredByDatalist)f.changedValue=!1,f.showHideOptions()}).bind("keydown.datalistWidget",function(d){var c=
d.keyCode,g;if(40==c&&!f.showList())return f.markItem(f.index+1,!0),!1;if(f.isListVisible){if(38==c)return f.markItem(f.index-1,!0),!1;if(!d.shiftKey&&(33==c||36==c))return f.markItem(0,!0),!1;if(!d.shiftKey&&(34==c||35==c))return d=a("li:not(.hidden-item)",f.shadowList),f.markItem(d.length-1,!0,d),!1;if(13==c||27==c)return 13==c&&(g=a("li.active-item:not(.hidden-item)",f.shadowList),f.changeValue(a("li.active-item:not(.hidden-item)",f.shadowList))),f.hideList(),g&&g[0]&&a(b.input).trigger("datalistselect"),
!1}}).bind("focus.datalistWidget",function(){a(this).hasClass("list-focus")&&f.showList()}).bind("mousedown.datalistWidget",function(){(this==i.activeElement||a(this).is(":focus"))&&f.showList()}).bind("blur.datalistWidget",this.timedHide);a(this.datalist).unbind("updateDatalist.datalistWidget").bind("updateDatalist.datalistWidget",a.proxy(this,"_resetListCached"));this._resetListCached();b.input.form&&b.input.id&&a(b.input.form).bind("submit.datalistWidget"+b.input.id,function(){var d=a.prop(b.input,
"value"),c=(b.input.name||b.input.id)+a.prop(b.input,"type");if(!f.storedOptions)f.storedOptions=o(c);if(d&&-1==f.storedOptions.indexOf(d)&&(f.storedOptions.push(d),d=f.storedOptions,c)){d=d||[];try{localStorage.setItem("storedDatalistOptions"+c,JSON.stringify(d))}catch(g){}}});a(h).bind("unload",function(){f.destroy()})}}else c&&c.destroy()}},destroy:function(){var b=a.attr(this.input,"autocomplete");a(this.input).unbind(".datalistWidget").removeData("datalistWidget");this.shadowList.remove();a(i).unbind(".datalist"+
this.id);this.input.form&&this.input.id&&a(this.input.form).unbind("submit.datalistWidget"+this.input.id);this.input.removeAttribute("aria-haspopup");b===m?this.input.removeAttribute("autocomplete"):a(this.input).attr("autocomplete",b)},_resetListCached:function(a){var d=this,g;this.needsUpdate=!0;this.lastUpdatedValue=!1;this.lastUnfoundValue="";this.updateTimer||(h.QUnit||(g=a&&i.activeElement==d.input)?d.updateListOptions(g):c.ready("WINDOWLOAD",function(){d.updateTimer=setTimeout(function(){d.updateListOptions();
d=null;p=1},200+100*p)}))},updateListOptions:function(b){this.needsUpdate=!1;clearTimeout(this.updateTimer);this.updateTimer=!1;this.shadowList.css({fontSize:a.curCSS(this.input,"fontSize"),fontFamily:a.curCSS(this.input,"fontFamily")});this.searchStart=a(this.input).hasClass("search-start");var d=[],c=[],f=[],e,g,h,i;for(g=a.prop(this.datalist,"options"),h=0,i=g.length;h<i;h++){e=g[h];if(e.disabled)return;e={value:a(e).val()||"",text:a.trim(a.attr(e,"label")||e.textContent||e.innerText||a.text([e])||
""),className:e.className||"",style:a.attr(e,"style")||""};e.text?e.text!=e.value&&(e.className+=" different-label-value"):e.text=e.value;c[h]=e.value;f[h]=e}if(!this.storedOptions)this.storedOptions=o((this.input.name||this.input.id)+a.prop(this.input,"type"));this.storedOptions.forEach(function(a){-1==c.indexOf(a)&&f.push({value:a,text:a,className:"stored-suggest",style:""})});for(h=0,i=f.length;h<i;h++)g=f[h],d[h]='<li class="'+g.className+'" style="'+g.style+'" tabindex="-1" role="listitem"><span class="option-label">'+
g.text+'</span> <span class="option-value">'+g.value+"</span></li>";this.arrayOptions=f;this.shadowList.html('<div><ul role="list" class="'+(this.datalist.className||"")+" "+this.datalist.id+'-shadowdom">'+d.join("\n")+"</ul></div>");a.fn.bgIframe&&r&&this.shadowList.bgIframe();(b||this.isListVisible)&&this.showHideOptions()},showHideOptions:function(b){var d=a.prop(this.input,"value").toLowerCase();if(!(d===this.lastUpdatedValue||this.lastUnfoundValue&&0===d.indexOf(this.lastUnfoundValue))){this.lastUpdatedValue=
d;var c=!1,f=this.searchStart,e=a("li",this.shadowList);d?this.arrayOptions.forEach(function(b,g){var h;if(!("lowerText"in b))b.lowerText=b.text!=b.value?b.text.toLowerCase()+b.value.toLowerCase():b.text.toLowerCase();h=b.lowerText.indexOf(d);(h=f?!h:-1!==h)?(a(e[g]).removeClass("hidden-item"),c=!0):a(e[g]).addClass("hidden-item")}):e.length&&(e.removeClass("hidden-item"),c=!0);this.hasViewableData=c;!b&&c&&this.showList();if(!c)this.lastUnfoundValue=d,this.hideList()}},setPos:function(){var b=k.positionDatalist?
a(this.input).position():c.getRelOffset(this.shadowList,this.input);b.top+=a(this.input).outerHeight();b.width=a(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0);this.shadowList.css(b);return b},showList:function(){if(this.isListVisible)return!1;this.needsUpdate&&this.updateListOptions();this.showHideOptions(!0);if(!this.hasViewableData)return!1;this.isListVisible=!0;var b=this,d;b.setPos();b.shadowList.addClass("datalist-visible");
a(i).unbind(".datalist"+b.id).bind("mousedown.datalist"+b.id+" focusin.datalist"+b.id,function(d){d.target===b.input||b.shadowList[0]===d.target||a.contains(b.shadowList[0],d.target)?(clearTimeout(b.hideTimer),setTimeout(function(){clearTimeout(b.hideTimer)},9)):b.timedHide()});a(h).unbind(".datalist"+b.id).bind("resize.datalist"+b.id+"orientationchange.datalist "+b.id+" emchange.datalist"+b.id,function(){clearTimeout(d);d=setTimeout(function(){b.setPos()},9)});clearTimeout(d);return!0},hideList:function(){if(!this.isListVisible)return!1;
var b=this,d=function(){b.changedValue&&a(b.input).trigger("change");b.changedValue=!1};b.shadowList.removeClass("datalist-visible list-item-active").scrollTop(0).find("li.active-item").removeClass("active-item");b.index=-1;b.isListVisible=!1;if(b.changedValue){b.triggeredByDatalist=!0;c.triggerInlineForm&&c.triggerInlineForm(b.input,"input");if(b.input==i.activeElement||a(b.input).is(":focus"))a(b.input).one("blur",d);else d();b.triggeredByDatalist=!1}a(i).unbind(".datalist"+b.id);a(h).unbind(".datalist"+
b.id);return!0},scrollIntoView:function(b){var d=a("ul",this.shadowList),c=a("div",this.shadowList),f=b.position();f.top-=(parseInt(d.css("paddingTop"),10)||0)+(parseInt(d.css("marginTop"),10)||0)+(parseInt(d.css("borderTopWidth"),10)||0);0>f.top?c.scrollTop(c.scrollTop()+f.top-2):(f.top+=b.outerHeight(),b=c.height(),f.top>b&&c.scrollTop(c.scrollTop()+(f.top-b)+2))},changeValue:function(b){if(b[0]){var b=a("span.option-value",b).text(),d=a.prop(this.input,"value");if(b!=d)a(this.input).prop("value",
b).triggerHandler("updateInput"),this.changedValue=!0}},markItem:function(b,d,c){c=c||a("li:not(.hidden-item)",this.shadowList);if(c.length)0>b?b=c.length-1:b>=c.length&&(b=0),c.removeClass("active-item"),this.shadowList.addClass("list-item-active"),c=c.filter(":eq("+b+")").addClass("active-item"),d&&(this.changeValue(c),this.scrollIntoView(c)),this.index=b}};(function(){g||c.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var b=a("select",this);b[0]?b=b[0].options:
(b=a("option",this).get(),b.length&&c.warn("you should wrap you option-elements for a datalist in a select element to support IE and other old browsers."));return b}}});var b={autocomplete:{attr:{get:function(){var b=a.data(this,"datalistWidget");return b?b._autocomplete:"autocomplete"in this?this.autocomplete:this.getAttribute("autocomplete")},set:function(b){var c=a.data(this,"datalistWidget");c?(c._autocomplete=b,"off"==b&&c.hideList()):"autocomplete"in this?this.autocomplete=b:this.setAttribute("autocomplete",
b)}}}};if(!g||!1 in a("<input />")[0])b.selectedOption={prop:{writeable:!1,get:function(){var b=a.prop(this,"list"),c=null,f;if(!b)return c;f=a.attr(this,"value");if(!f)return c;b=a.prop(b,"options");if(!b.length)return c;a.each(b,function(b,d){if(f==a.prop(d,"value"))return c=d,!1});return c}}};b.list=g?{attr:{get:function(){var b=c.contentAttr(this,"list");null!=b?this.removeAttribute("list"):b=a.data(this,"datalistListAttr");return null==b?m:b},set:function(b){a.data(this,"datalistListAttr",b);
c.objectCreate(q,m,{input:this,id:b,datalist:a.prop(this,"list")})}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"}:{attr:{get:function(){var a=c.contentAttr(this,"list");return null==a?m:a},set:function(b){c.contentAttr(this,"list",b);c.objectCreate(q,m,{input:this,id:b,datalist:a.prop(this,"list")})}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"};c.defineNodeNameProperties("input",b);if(a.event.customEvent)a.event.customEvent.updateDatalist=!0,a.event.customEvent.updateInput=
!0,a.event.customEvent.datalistselect=!0;c.addReady(function(a,b){b.filter("datalist > select, datalist, datalist > option, datalist > select > option").closest("datalist").triggerHandler("updateDatalist")})})()}})()});
