import{R as t}from"./vendor-react-mklufxn75v6.js";const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(t,e,s){if(this._$cssResult$=1,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(1==t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new o(s,t,i)},n=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,f=globalThis,b=f.trustedTypes,m=b?b.emptyScript:"",g=f.reactiveElementPolyfillSupport,v=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},w=(t,e)=>!l(t,e),_={attribute:1,type:String,converter:y,reflect:0,useDefault:0,hasChanged:w};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=0),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=1),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:1,enumerable:1}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=1,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...u(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const s=e.attribute;return 0==s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=0,this.hasUpdated=0,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),r=e.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(1),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&1==s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s){if(void 0!==t){const i=this.constructor,r=this[t];if(s??=i.getPropertyOptions(t),!((s.hasChanged??w)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,s))))return;this.C(t,e,s)}0==this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),1!=r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),1==i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=1;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];1!=t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=0;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=0,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=1,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=0}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return 1}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,g?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.1");const k=globalThis,$=k.trustedTypes,z=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+C,A=`<${M}>`,N=document,B=()=>N.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,E="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,T=/>/g,U=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,R=/"/g,P=/^(?:script|style|textarea|title)$/i,j=(t,...e)=>({_$litType$:1,strings:t,values:e}),H=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),q=new WeakMap,X=N.createTreeWalker(N,129);function Y(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(e):e}const W=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=F;for(let e=0;e<s;e++){const s=t[e];let n,l,c=-1,h=0;for(;h<s.length&&(a.lastIndex=h,l=a.exec(s),null!==l);)h=a.lastIndex,a===F?"!--"===l[1]?a=D:void 0!==l[1]?a=T:void 0!==l[2]?(P.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=U):void 0!==l[3]&&(a=U):a===U?">"===l[0]?(a=r??F,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?U:'"'===l[3]?R:L):a===R||a===L?a=U:a===D||a===T?a=F:(a=U,r=void 0);const d=a===U&&t[e+1].startsWith("/>")?" ":"";o+=a===F?s+A:c>=0?(i.push(n),s.slice(0,c)+S+s.slice(c)+C+d):s+C+(-2===c?e:d)}return[Y(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class K{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const a=t.length-1,n=this.parts,[l,c]=W(t,e);if(this.el=K.createElement(l,s),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=X.nextNode())&&n.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=c[o++],s=i.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:s,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?st:J}),i.removeAttribute(t)}else t.startsWith(C)&&(n.push({type:6,index:r}),i.removeAttribute(t));if(P.test(i.tagName)){const t=i.textContent.split(C),e=t.length-1;if(e>0){i.textContent=$?$.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],B()),X.nextNode(),n.push({type:2,index:++r});i.append(t[e],B())}}}else if(8===i.nodeType)if(i.data===M)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(C,t+1));)n.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const s=N.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){if(e===H)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=I(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(0),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??N).importNode(e,1);X.currentNode=i;let r=X.nextNode(),o=0,a=0,n=s[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Z(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new it(r,this,t)),this._$AV.push(e),n=s[++a]}o!==n?.index&&(r=X.nextNode(),o++)}return X.currentNode=N,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??1}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),I(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=K.createElement(Y(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new K(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Z(this.O(B()),this.O(B()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(0,1,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class J{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const r=this.strings;let o=0;if(void 0===r)t=G(this,t,e,0),o=!I(t)||t!==this._$AH&&t!==H,o&&(this._$AH=t);else{const i=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=G(this,i[s+a],e,a),n===H&&(n=this._$AH[a]),o||=!I(n)||n!==this._$AH[a],n===V?t=V:t!==V&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}o&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}let tt=class extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}};class et extends J{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends J{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===H)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const rt=k.litHtmlPolyfillSupport;rt?.(K,Z),(k.litHtmlVersions??=[]).push("3.3.1");const ot=globalThis;let at=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Z(e.insertBefore(B(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(1)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(0)}render(){return H}};at._$litElement$=1,at.finalized=1,ot.litElementHydrateSupport?.({LitElement:at});const nt=ot.litElementPolyfillSupport;nt?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.1");var lt=a`
  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`,ct=a`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,ht=Object.defineProperty,dt=Object.defineProperties,ut=Object.getOwnPropertyDescriptor,pt=Object.getOwnPropertyDescriptors,ft=Object.getOwnPropertySymbols,bt=Object.prototype.hasOwnProperty,mt=Object.prototype.propertyIsEnumerable,gt=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),vt=t=>{throw TypeError(t)},yt=(t,e,s)=>e in t?ht(t,e,{enumerable:1,configurable:1,writable:1,value:s}):t[e]=s,wt=(t,e)=>{for(var s in e||(e={}))bt.call(e,s)&&yt(t,s,e[s]);if(ft)for(var s of ft(e))mt.call(e,s)&&yt(t,s,e[s]);return t},_t=(t,e)=>dt(t,pt(e)),xt=(t,e,s,i)=>{for(var r,o=i>1?void 0:i?ut(e,s):e,a=t.length-1;a>=0;a--)(r=t[a])&&(o=(i?r(e,s,o):r(o))||o);return i&&o&&ht(e,s,o),o},kt=(t,e,s)=>e.has(t)||vt("Cannot "+s),$t=function(t,e){this[0]=t,this[1]=e};const zt={attribute:1,type:String,converter:y,reflect:0,hasChanged:w},St=(t=zt,e,s)=>{const{kind:i,metadata:r}=s;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=1),o.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t)}}throw Error("Unsupported decorator location: "+i)};function Ct(t){return(e,s)=>"object"==typeof s?St(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function Mt(t){return Ct({...t,state:1,attribute:0})}function At(t){return(e,s)=>{const i="function"==typeof e?e:e[s];Object.assign(i,t)}}const Nt=(t,e,s)=>(s.configurable=1,s.enumerable=1,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,s),s);function Bt(t,e){return(e,s,i)=>Nt(e,s,{get(){return e=this,e.renderRoot?.querySelector(t)??null;var e}})}var It,Ot=class extends at{constructor(){var t,e;super(),t=this,(e=It).has(t)?vt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,0),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const s=new CustomEvent(t,wt({bubbles:1,cancelable:0,composed:1,detail:{}},e));return this.dispatchEvent(s),s}static define(t,e=this,s={}){const i=customElements.get(t);if(!i){try{customElements.define(t,e,s)}catch(i){customElements.define(t,class extends e{},s)}return}let r=" (unknown version)",o=r;"version"in e&&e.version&&(r=" v"+e.version),"version"in i&&i.version&&(o=" v"+i.version)}attributeChangedCallback(t,e,s){var i;kt(this,i=It,"read from private field"),i.get(this)||(this.constructor.elementProperties.forEach((t,e)=>{t.reflect&&null!=this[e]&&this.initialReflectedProperties.set(e,this[e])}),((t,e)=>{kt(t,e,"write to private field"),e.set(t,1)})(this,It)),super.attributeChangedCallback(t,e,s)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,s)=>{t.has(s)&&null==this[s]&&(this[s]=e)})}};It=new WeakMap,Ot.version="2.20.1",Ot.dependencies={},xt([Ct()],Ot.prototype,"dir",2),xt([Ct()],Ot.prototype,"lang",2);var Et=class extends Ot{render(){return j` <slot></slot> `}};Et.styles=[ct,lt];const Ft=new Set(["children","localName","ref","style","className"]),Dt=new WeakMap,Tt=(t,e,s,i,r)=>{const o=r?.[e];void 0===o?(t[e]=s,null==s&&e in HTMLElement.prototype&&t.removeAttribute(e)):s!==i&&((t,e,s)=>{let i=Dt.get(t);void 0===i&&Dt.set(t,i=new Map);let r=i.get(e);void 0!==s?void 0===r?(i.set(e,r={handleEvent:s}),t.addEventListener(e,r)):r.handleEvent=s:void 0!==r&&(i.delete(e),t.removeEventListener(e,r))})(t,o,s)},Ut=({react:t,tagName:e,elementClass:s,events:i,displayName:r})=>{const o=new Set(Object.keys(i??{})),a=t.forwardRef((r,a)=>{const n=t.useRef(new Map),l=t.useRef(null),c={},h={};for(const[t,e]of Object.entries(r))Ft.has(t)?c["className"===t?"class":t]=e:o.has(t)||t in s.prototype?h[t]=e:c[t]=e;return t.useLayoutEffect(()=>{if(null===l.current)return;const t=new Map;for(const e in h)Tt(l.current,e,r[e],n.current.get(e),i),n.current.delete(e),t.set(e,r[e]);for(const[t,e]of n.current)Tt(l.current,t,void 0,e,i);n.current=t}),t.useLayoutEffect(()=>{l.current?.removeAttribute("defer-hydration")},[]),c.suppressHydrationWarning=1,t.createElement(e,{...c,ref:t.useCallback(t=>{l.current=t,"function"==typeof a?a(t):null!==a&&(a.current=t)},[a])})});return a.displayName=r??s.name,a};Et.define("sl-visually-hidden"),Ut({tagName:"sl-visually-hidden",elementClass:Et,react:t,events:{},displayName:"SlVisuallyHidden"});var Lt=a`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  :host(:focus) {
    outline: transparent;
  }

  :host(:focus-visible) {
    color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`,Rt=a`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,Pt="";function jt(t){Pt=t}var Ht={name:"default",resolver:t=>((t="")=>{if(!Pt){const t=[...document.getElementsByTagName("script")],e=t.find(t=>t.hasAttribute("data-shoelace"));if(e)jt(e.getAttribute("data-shoelace"));else{const e=t.find(t=>/shoelace(\.min)?\.js($|\?)/.test(t.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(t.src));let s="";e&&(s=e.getAttribute("src")),jt(s.split("/").slice(0,-1).join("/"))}}return Pt.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")})(`assets/icons/${t}.svg`)},Vt={caret:'\n    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n      <polyline points="6 9 12 15 18 9"></polyline>\n    </svg>\n  ',check:'\n    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor">\n          <g transform="translate(3.428571, 3.428571)">\n            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>\n            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',copy:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"grip-vertical":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n    </svg>\n  ',indeterminate:'\n    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(2.285714, 6.857143)">\n            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',radio:'\n    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="currentColor">\n          <circle cx="8" cy="8" r="3.42857143"></circle>\n        </g>\n      </g>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',"x-lg":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">\n      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},qt=[Ht,{name:"system",resolver:t=>t in Vt?`data:image/svg+xml,${encodeURIComponent(Vt[t])}`:""}],Xt=[];function Yt(t){return qt.find(e=>e.name===t)}var Wt=a`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function Kt(t,e){const s=wt({waitUntilFirstUpdate:0},e);return(e,i)=>{const{update:r}=e,o=Array.isArray(t)?t:[t];e.update=function(t){o.forEach(e=>{const r=e;if(t.has(r)){const e=t.get(r),o=this[r];e!==o&&(s.waitUntilFirstUpdate&&!this.hasUpdated||this[i](e,o))}}),r.call(this,t)}}}const Gt=t=>void 0===t.strings,Qt={};var Zt,Jt=Symbol(),te=Symbol(),ee=new Map,se=class extends Ot{constructor(){super(...arguments),this.initialRender=0,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var s;let i;if(null==e?void 0:e.spriteSheet)return this.svg=j`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(i=await fetch(t,{mode:"cors"}),!i.ok)return 410===i.status?Jt:te}catch(t){return te}try{const t=document.createElement("div");t.innerHTML=await i.text();const e=t.firstElementChild;if("svg"!==(null==(s=null==e?void 0:e.tagName)?void 0:s.toLowerCase()))return Jt;Zt||(Zt=new DOMParser);const r=Zt.parseFromString(e.outerHTML,"text/html").body.querySelector("svg");return r?(r.part.add("svg"),document.adoptNode(r)):Jt}catch(t){return Jt}}connectedCallback(){super.connectedCallback(),Xt.push(this)}firstUpdated(){this.initialRender=1,this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,Xt=Xt.filter(e=>e!==t)}getIconSource(){const t=Yt(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:1}:{url:this.src,fromLibrary:0}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:s}=this.getIconSource(),i=s?Yt(this.library):void 0;if(!e)return void(this.svg=null);let r=ee.get(e);if(r||(r=this.resolveIcon(e,i),ee.set(e,r)),!this.initialRender)return;const o=await r;if(o===te&&ee.delete(e),e===this.getIconSource().url)if(a=o,void 0!==a?._$litType$){if(this.svg=o,i){await this.updateComplete;const t=this.shadowRoot.querySelector("[part='svg']");"function"==typeof i.mutator&&t&&i.mutator(t)}}else switch(o){case te:case Jt:this.svg=null,this.emit("sl-error");break;default:this.svg=o.cloneNode(1),null==(t=null==i?void 0:i.mutator)||t.call(i,this.svg),this.emit("sl-load")}var a}render(){return this.svg}};se.styles=[ct,Wt],xt([Mt()],se.prototype,"svg",2),xt([Ct({reflect:1})],se.prototype,"name",2),xt([Ct()],se.prototype,"src",2),xt([Ct()],se.prototype,"label",2),xt([Ct({reflect:1})],se.prototype,"library",2),xt([Kt("label")],se.prototype,"handleLabelChange",1),xt([Kt(["name","src","library"])],se.prototype,"setIcon",1);const ie=t=>(...e)=>({_$litDirective$:t,values:e});let re=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const oe=ie(class extends re{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const s=t.element.classList;for(const t of this.st)t in e||(s.remove(t),this.st.delete(t));for(const t in e){const i=!!e[t];i===this.st.has(t)||this.nt?.has(t)||(i?(s.add(t),this.st.add(t)):(s.remove(t),this.st.delete(t)))}return H}}),ae=Symbol.for(""),ne=t=>{if(t?.r===ae)return t?._$litStatic$},le=(t,...e)=>({_$litStatic$:e.reduce((e,s,i)=>e+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[i+1],t[0]),r:ae}),ce=new Map,he=(ue=j,(t,...e)=>{const s=e.length;let i,r;const o=[],a=[];let n,l=0,c=0;for(;l<s;){for(n=t[l];l<s&&void 0!==(r=e[l],i=ne(r));)n+=i+t[++l],c=1;l!==s&&a.push(r),o.push(n),l++}if(l===s&&o.push(t[s]),c){const s=o.join("$$lit$$");void 0===(t=ce.get(s))&&(o.raw=o,ce.set(s,t=o)),e=a}return ue(t,...e)}),de=t=>t??V;var ue,pe=class extends Ot{constructor(){super(...arguments),this.hasFocus=0,this.label="",this.disabled=0}handleBlur(){this.hasFocus=0,this.emit("sl-blur")}handleFocus(){this.hasFocus=1,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=this.href?1:0,e=t?le`a`:le`button`;return he`
      <${e}
        part="base"
        class=${oe({"icon-button":1,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${de(t?void 0:this.disabled)}
        type=${de(t?void 0:"button")}
        href=${de(t?this.href:void 0)}
        target=${de(t?this.target:void 0)}
        download=${de(t?this.download:void 0)}
        rel=${de(t&&this.target?"noreferrer noopener":void 0)}
        role=${de(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${de(this.name)}
          library=${de(this.library)}
          src=${de(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};pe.styles=[ct,Rt],pe.dependencies={"sl-icon":se},xt([Bt(".icon-button")],pe.prototype,"button",2),xt([Mt()],pe.prototype,"hasFocus",2),xt([Ct()],pe.prototype,"name",2),xt([Ct()],pe.prototype,"library",2),xt([Ct()],pe.prototype,"src",2),xt([Ct()],pe.prototype,"href",2),xt([Ct()],pe.prototype,"target",2),xt([Ct()],pe.prototype,"download",2),xt([Ct()],pe.prototype,"label",2),xt([Ct({type:Boolean,reflect:1})],pe.prototype,"disabled",2);const fe=new Set,be=new Map;let me,ge="ltr",ve="en";const ye="undefined"!=typeof MutationObserver&&"undefined"!=typeof document&&void 0!==document.documentElement;if(ye){const t=new MutationObserver(_e);ge=document.documentElement.dir||"ltr",ve=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:1,attributeFilter:["dir","lang"]})}function we(...t){t.map(t=>{const e=t.$code.toLowerCase();be.has(e)?be.set(e,Object.assign(Object.assign({},be.get(e)),t)):be.set(e,t),me||(me=t)}),_e()}function _e(){ye&&(ge=document.documentElement.dir||"ltr",ve=document.documentElement.lang||navigator.language),[...fe.keys()].map(t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()})}let xe=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){fe.add(this.host)}hostDisconnected(){fe.delete(this.host)}dir(){return`${this.host.dir||ge}`.toLowerCase()}lang(){return`${this.host.lang||ve}`.toLowerCase()}getTranslationData(t){var e,s;const i=new Intl.Locale(t.replace(/_/g,"-")),r=null==i?void 0:i.language.toLowerCase(),o=null!==(s=null===(e=null==i?void 0:i.region)||void 0===e?void 0:e.toLowerCase())&&void 0!==s?s:"";return{locale:i,language:r,region:o,primary:be.get(`${r}-${o}`),secondary:be.get(r)}}exists(t,e){var s;const{primary:i,secondary:r}=this.getTranslationData(null!==(s=e.lang)&&void 0!==s?s:this.lang());return e=Object.assign({includeFallback:0},e),i&&i[t]||r&&r[t]||e.includeFallback&&me&&me[t]?1:0}term(t,...e){const{primary:s,secondary:i}=this.getTranslationData(this.lang());let r;if(s&&s[t])r=s[t];else if(i&&i[t])r=i[t];else{if(!me||!me[t])return String(t);r=me[t]}return"function"==typeof r?r(...e):r}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,s){return new Intl.RelativeTimeFormat(this.lang(),s).format(t,e)}};var ke={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};we(ke);var $e=ke,ze=class extends xe{};we($e);var Se=0,Ce=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.attrId=++Se,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=0,this.closable=0,this.disabled=0,this.tabIndex=0}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}handleCloseClick(t){t.stopPropagation(),this.emit("sl-close")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.disabled&&!this.active?this.tabIndex=-1:this.tabIndex=0}render(){return this.id=this.id.length>0?this.id:this.componentId,j`
      <div
        part="base"
        class=${oe({tab:1,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
      >
        <slot></slot>
        ${this.closable?j`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};Ce.styles=[ct,Lt],Ce.dependencies={"sl-icon-button":pe},xt([Bt(".tab")],Ce.prototype,"tab",2),xt([Ct({reflect:1})],Ce.prototype,"panel",2),xt([Ct({type:Boolean,reflect:1})],Ce.prototype,"active",2),xt([Ct({type:Boolean,reflect:1})],Ce.prototype,"closable",2),xt([Ct({type:Boolean,reflect:1})],Ce.prototype,"disabled",2),xt([Ct({type:Number,reflect:1})],Ce.prototype,"tabIndex",2),xt([Kt("active")],Ce.prototype,"handleActiveChange",1),xt([Kt("disabled")],Ce.prototype,"handleDisabledChange",1),Ce.define("sl-tab");var Me=Ut({tagName:"sl-tab",elementClass:Ce,react:t,events:{onSlClose:"sl-close"},displayName:"SlTab"}),Ae=a`
  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group--has-scroll-controls .tab-group__scroll-button--start--hidden,
  .tab-group--has-scroll-controls .tab-group__scroll-button--end--hidden {
    visibility: hidden;
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`,Ne=a`
  :host {
    display: contents;
  }
`,Be=class extends Ot{constructor(){super(...arguments),this.observedElements=[],this.disabled=0}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{this.emit("sl-resize",{detail:{entries:t}})}),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){const t=this.shadowRoot.querySelector("slot");if(null!==t){const e=t.assignedElements({flatten:1});this.observedElements.forEach(t=>this.resizeObserver.unobserve(t)),this.observedElements=[],e.forEach(t=>{this.resizeObserver.observe(t),this.observedElements.push(t)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return j` <slot @slotchange=${this.handleSlotChange}></slot> `}};Be.styles=[ct,Ne],xt([Ct({type:Boolean,reflect:1})],Be.prototype,"disabled",2),xt([Kt("disabled",{waitUntilFirstUpdate:1})],Be.prototype,"handleDisabledChange",1);var Ie=new Set;function Oe(t){if(Ie.add(t),!document.documentElement.classList.contains("sl-scroll-lock")){const t=(()=>{const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)})()+(()=>{const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t})();let e=getComputedStyle(document.documentElement).scrollbarGutter;e&&"auto"!==e||(e="stable"),t<2&&(e=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",e),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${t}px`)}}function Ee(t){Ie.delete(t),0===Ie.size&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}function Fe(t,e,s="vertical",i="smooth"){const r=((t,e)=>({top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}))(t,e),o=r.top+e.scrollTop,a=r.left+e.scrollLeft,n=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,c=e.scrollTop,h=e.scrollTop+e.offsetHeight;"horizontal"!==s&&"both"!==s||(a<n?e.scrollTo({left:a,behavior:i}):a+t.clientWidth>l&&e.scrollTo({left:a-e.offsetWidth+t.clientWidth,behavior:i})),"vertical"!==s&&"both"!==s||(o<c?e.scrollTo({top:o,behavior:i}):o+t.clientHeight>h&&e.scrollTo({top:o-e.offsetHeight+t.clientHeight,behavior:i}))}var De=class extends Ot{constructor(){super(...arguments),this.tabs=[],this.focusableTabs=[],this.panels=[],this.localize=new ze(this),this.hasScrollControls=0,this.shouldHideScrollStartButton=0,this.shouldHideScrollEndButton=0,this.placement="top",this.activation="auto",this.noScrollControls=0,this.fixedScrollControls=0,this.scrollOffset=1}connectedCallback(){const t=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(t=>{const e=t.filter(({target:t})=>{if(t===this)return 1;if(t.closest("sl-tab-group")!==this)return 0;const e=t.tagName.toLowerCase();return"sl-tab"===e||"sl-tab-panel"===e});if(0!==e.length)if(e.some(t=>!["aria-labelledby","aria-controls"].includes(t.attributeName))&&setTimeout(()=>this.setAriaLabels()),e.some(t=>"disabled"===t.attributeName))this.syncTabsAndPanels();else if(e.some(t=>"active"===t.attributeName)){const t=e.filter(t=>"active"===t.attributeName&&"sl-tab"===t.target.tagName.toLowerCase()).map(t=>t.target).find(t=>t.active);t&&this.setActiveTab(t)}}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:1,attributeFilter:["active","disabled","name","panel"],childList:1,subtree:1}),this.resizeObserver.observe(this.nav),t.then(()=>{new IntersectionObserver((t,e)=>{var s;t[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab(null!=(s=this.getActiveTab())?s:this.tabs[0],{emitEvents:0}),e.unobserve(t[0].target))}).observe(this.tabGroup)})})}disconnectedCallback(){var t,e;super.disconnectedCallback(),null==(t=this.mutationObserver)||t.disconnect(),this.nav&&(null==(e=this.resizeObserver)||e.unobserve(this.nav))}getAllTabs(){return this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()}getAllPanels(){return[...this.body.assignedElements()].filter(t=>"sl-tab-panel"===t.tagName.toLowerCase())}getActiveTab(){return this.tabs.find(t=>t.active)}handleClick(t){const e=t.target.closest("sl-tab");(null==e?void 0:e.closest("sl-tab-group"))===this&&null!==e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}handleKeyDown(t){const e=t.target.closest("sl-tab");if((null==e?void 0:e.closest("sl-tab-group"))===this&&(["Enter"," "].includes(t.key)&&null!==e&&(this.setActiveTab(e,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){const e=this.tabs.find(t=>t.matches(":focus")),s="rtl"===this.localize.dir();let i=null;if("sl-tab"===(null==e?void 0:e.tagName.toLowerCase())){if("Home"===t.key)i=this.focusableTabs[0];else if("End"===t.key)i=this.focusableTabs[this.focusableTabs.length-1];else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&"ArrowUp"===t.key){const t=this.tabs.findIndex(t=>t===e);i=this.findNextFocusableTab(t,"backward")}else if(["top","bottom"].includes(this.placement)&&t.key===(s?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&"ArrowDown"===t.key){const t=this.tabs.findIndex(t=>t===e);i=this.findNextFocusableTab(t,"forward")}if(!i)return;i.tabIndex=0,i.focus({preventScroll:1}),"auto"===this.activation?this.setActiveTab(i,{scrollBehavior:"smooth"}):this.tabs.forEach(t=>{t.tabIndex=t===i?0:-1}),["top","bottom"].includes(this.placement)&&Fe(i,this.nav,"horizontal"),t.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:"rtl"===this.localize.dir()?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:"rtl"===this.localize.dir()?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(t,e){if(e=wt({emitEvents:1,scrollBehavior:"auto"},e),t!==this.activeTab&&!t.disabled){const s=this.activeTab;this.activeTab=t,this.tabs.forEach(t=>{t.active=t===this.activeTab,t.tabIndex=t===this.activeTab?0:-1}),this.panels.forEach(t=>{var e;return t.active=t.name===(null==(e=this.activeTab)?void 0:e.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&Fe(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(s&&this.emit("sl-tab-hide",{detail:{name:s.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(t=>{const e=this.panels.find(e=>e.name===t.panel);e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))})}repositionIndicator(){const t=this.getActiveTab();if(!t)return;const e=t.clientWidth,s=t.clientHeight,i="rtl"===this.localize.dir(),r=this.getAllTabs(),o=r.slice(0,r.indexOf(t)).reduce((t,e)=>({left:t.left+e.clientWidth,top:t.top+e.clientHeight}),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${e}px`,this.indicator.style.height="auto",this.indicator.style.translate=i?-1*o.left+"px":`${o.left}px`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${s}px`,this.indicator.style.translate=`0 ${o.top}px`}}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.focusableTabs=this.tabs.filter(t=>!t.disabled),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls())}findNextFocusableTab(t,e){let s=null;const i="forward"===e?1:-1;let r=t+i;for(;t<this.tabs.length;){if(s=this.tabs[r]||null,null===s){s="forward"===e?this.focusableTabs[0]:this.focusableTabs[this.focusableTabs.length-1];break}if(!s.disabled)break;r+=i}return s}updateScrollButtons(){this.hasScrollControls&&!this.fixedScrollControls&&(this.shouldHideScrollStartButton=this.scrollFromStart()<=this.scrollOffset,this.shouldHideScrollEndButton=this.isScrolledToEnd())}isScrolledToEnd(){return this.scrollFromStart()+this.nav.clientWidth>=this.nav.scrollWidth-this.scrollOffset}scrollFromStart(){return"rtl"===this.localize.dir()?-this.nav.scrollLeft:this.nav.scrollLeft}updateScrollControls(){this.noScrollControls?this.hasScrollControls=0:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth+1,this.updateScrollButtons()}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}show(t){const e=this.tabs.find(e=>e.panel===t);e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}render(){const t="rtl"===this.localize.dir();return j`
      <div
        part="base"
        class=${oe({"tab-group":1,"tab-group--top":"top"===this.placement,"tab-group--bottom":"bottom"===this.placement,"tab-group--start":"start"===this.placement,"tab-group--end":"end"===this.placement,"tab-group--rtl":"rtl"===this.localize.dir(),"tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?j`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class=${oe({"tab-group__scroll-button":1,"tab-group__scroll-button--start":1,"tab-group__scroll-button--start--hidden":this.shouldHideScrollStartButton})}
                  name=${t?"chevron-right":"chevron-left"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav" @scrollend=${this.updateScrollButtons}>
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <sl-resize-observer @sl-resize=${this.syncIndicator}>
                <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
              </sl-resize-observer>
            </div>
          </div>

          ${this.hasScrollControls?j`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class=${oe({"tab-group__scroll-button":1,"tab-group__scroll-button--end":1,"tab-group__scroll-button--end--hidden":this.shouldHideScrollEndButton})}
                  name=${t?"chevron-left":"chevron-right"}
                  library="system"
                  tabindex="-1"
                  aria-hidden="true"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};De.styles=[ct,Ae],De.dependencies={"sl-icon-button":pe,"sl-resize-observer":Be},xt([Bt(".tab-group")],De.prototype,"tabGroup",2),xt([Bt(".tab-group__body")],De.prototype,"body",2),xt([Bt(".tab-group__nav")],De.prototype,"nav",2),xt([Bt(".tab-group__indicator")],De.prototype,"indicator",2),xt([Mt()],De.prototype,"hasScrollControls",2),xt([Mt()],De.prototype,"shouldHideScrollStartButton",2),xt([Mt()],De.prototype,"shouldHideScrollEndButton",2),xt([Ct()],De.prototype,"placement",2),xt([Ct()],De.prototype,"activation",2),xt([Ct({attribute:"no-scroll-controls",type:Boolean})],De.prototype,"noScrollControls",2),xt([Ct({attribute:"fixed-scroll-controls",type:Boolean})],De.prototype,"fixedScrollControls",2),xt([At({passive:1})],De.prototype,"updateScrollButtons",1),xt([Kt("noScrollControls",{waitUntilFirstUpdate:1})],De.prototype,"updateScrollControls",1),xt([Kt("placement",{waitUntilFirstUpdate:1})],De.prototype,"syncIndicator",1),De.define("sl-tab-group");var Te=Ut({tagName:"sl-tab-group",elementClass:De,react:t,events:{onSlTabShow:"sl-tab-show",onSlTabHide:"sl-tab-hide"},displayName:"SlTabGroup"}),Ue=a`
  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`,Le=0,Re=class extends Ot{constructor(){super(...arguments),this.attrId=++Le,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=0}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return j`
      <slot
        part="base"
        class=${oe({"tab-panel":1,"tab-panel--active":this.active})}
      ></slot>
    `}};Re.styles=[ct,Ue],xt([Ct({reflect:1})],Re.prototype,"name",2),xt([Ct({type:Boolean,reflect:1})],Re.prototype,"active",2),xt([Kt("active")],Re.prototype,"handleActiveChange",1),Re.define("sl-tab-panel");var Pe=Ut({tagName:"sl-tab-panel",elementClass:Re,react:t,events:{},displayName:"SlTabPanel"}),je=a`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,He=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.variant="neutral",this.size="medium",this.pill=0,this.removable=0}handleRemoveClick(){this.emit("sl-remove")}render(){return j`
      <span
        part="base"
        class=${oe({tag:1,"tag--primary":"primary"===this.variant,"tag--success":"success"===this.variant,"tag--neutral":"neutral"===this.variant,"tag--warning":"warning"===this.variant,"tag--danger":"danger"===this.variant,"tag--text":"text"===this.variant,"tag--small":"small"===this.size,"tag--medium":"medium"===this.size,"tag--large":"large"===this.size,"tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?j`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};He.styles=[ct,je],He.dependencies={"sl-icon-button":pe},xt([Ct({reflect:1})],He.prototype,"variant",2),xt([Ct({reflect:1})],He.prototype,"size",2),xt([Ct({type:Boolean,reflect:1})],He.prototype,"pill",2),xt([Ct({type:Boolean})],He.prototype,"removable",2),He.define("sl-tag"),Ut({tagName:"sl-tag",elementClass:He,react:t,events:{onSlRemove:"sl-remove"},displayName:"SlTag"});var Ve=a`
  :host {
    display: block;
  }

  .textarea {
    display: grid;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control,
  .textarea__size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .textarea__size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`,qe=(t="value")=>(e,s)=>{const i=e.constructor,r=i.prototype.attributeChangedCallback;i.prototype.attributeChangedCallback=function(e,o,a){var n;const l=i.getPropertyOptions(t);if(e===("string"==typeof l.attribute?l.attribute:t)){const e=l.converter||y,i=("function"==typeof e?e:null!=(n=null==e?void 0:e.fromAttribute)?n:y.fromAttribute)(a,l.type);this[t]!==i&&(this[s]=i)}r.call(this,e,o,a)}},Xe=a`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,Ye=new WeakMap,We=new WeakMap,Ke=new WeakMap,Ge=new WeakSet,Qe=new WeakMap,Ze=class{constructor(t,e){this.handleFormData=t=>{const e=this.options.disabled(this.host),s=this.options.name(this.host),i=this.options.value(this.host),r="sl-button"===this.host.tagName.toLowerCase();this.host.isConnected&&!e&&!r&&"string"==typeof s&&s.length>0&&void 0!==i&&(Array.isArray(i)?i.forEach(e=>{t.formData.append(s,e.toString())}):t.formData.append(s,i.toString()))},this.handleFormSubmit=t=>{var e;const s=this.options.disabled(this.host),i=this.options.reportValidity;this.form&&!this.form.noValidate&&(null==(e=Ye.get(this.form))||e.forEach(t=>{this.setUserInteracted(t,1)})),!this.form||this.form.noValidate||s||i(this.host)||(t.preventDefault(),t.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,0),Qe.set(this.host,[])},this.handleInteraction=t=>{const e=Qe.get(this.host);e.includes(t.type)||e.push(t.type),e.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,1)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const e of t)if("function"==typeof e.checkValidity&&!e.checkValidity())return 0}return 1},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const e of t)if("function"==typeof e.reportValidity&&!e.reportValidity())return 0}return 1},(this.host=t).addController(this),this.options=wt({form(t){const e=t.form;if(e){const s=t.getRootNode().querySelector(`#${e}`);if(s)return s}return t.closest("form")},name:t=>t.name,value:t=>t.value,defaultValue:t=>t.defaultValue,disabled(t){var e;return null!=(e=t.disabled)?e:0},reportValidity:t=>"function"==typeof t.reportValidity?t.reportValidity():1,checkValidity:t=>"function"==typeof t.checkValidity?t.checkValidity():1,setValue:(t,e)=>t.value=e,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),Qe.set(this.host,[]),this.options.assumeInteractionOn.forEach(t=>{this.host.addEventListener(t,this.handleInteraction)})}hostDisconnected(){this.detachForm(),Qe.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,Ye.has(this.form)?Ye.get(this.form).add(this.host):Ye.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),We.has(this.form)||(We.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Ke.has(this.form)||(Ke.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const t=Ye.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),We.has(this.form)&&(this.form.reportValidity=We.get(this.form),We.delete(this.form)),Ke.has(this.form)&&(this.form.checkValidity=Ke.get(this.form),Ke.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?Ge.add(t):Ge.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const s=document.createElement("button");s.type=t,s.style.position="absolute",s.style.width="0",s.style.height="0",s.style.clipPath="inset(50%)",s.style.overflow="hidden",s.style.whiteSpace="nowrap",e&&(s.name=e.name,s.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(t=>{e.hasAttribute(t)&&s.setAttribute(t,e.getAttribute(t))})),this.form.append(s),s.click(),s.remove()}}getForm(){var t;return null!=(t=this.form)?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,s=Boolean(Ge.has(e)),i=Boolean(e.required);e.toggleAttribute("data-required",i),e.toggleAttribute("data-optional",!i),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&s),e.toggleAttribute("data-user-valid",t&&s)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:0,composed:0,cancelable:1,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||null==t||t.preventDefault()}},Je=Object.freeze({badInput:0,customError:0,patternMismatch:0,rangeOverflow:0,rangeUnderflow:0,stepMismatch:0,tooLong:0,tooShort:0,typeMismatch:0,valid:1,valueMissing:0}),ts=Object.freeze(_t(wt({},Je),{valid:0,valueMissing:1})),es=Object.freeze(_t(wt({},Je),{valid:0,customError:1})),ss=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=t=>{const e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&""!==t.textContent.trim())return 1;if(t.nodeType===t.ELEMENT_NODE){const e=t;if("sl-visually-hidden"===e.tagName.toLowerCase())return 0;if(!e.hasAttribute("slot"))return 1}return 0})}hasNamedSlot(t){return null!==this.host.querySelector(`:scope > [slot="${t}"]`)}test(t){return"[default]"===t?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};const is=ie(class extends re{constructor(t){if(super(t),3!==t.type&&1!==t.type&&4!==t.type)throw Error("The `live` directive is not allowed on child or event bindings");if(!Gt(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===H||e===V)return e;const s=t.element,i=t.name;if(3===t.type){if(e===s[i])return H}else if(4===t.type){if(!!e===s.hasAttribute(i))return H}else if(1===t.type&&s.getAttribute(i)===e+"")return H;return((t,e=Qt)=>{t._$AH=e})(t),e}});var rs=class extends Ot{constructor(){super(...arguments),this.formControlController=new Ze(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ss(this,"help-text","label"),this.hasFocus=0,this.title="",this.name="",this.value="",this.size="medium",this.filled=0,this.label="",this.helpText="",this.placeholder="",this.rows=4,this.resize="vertical",this.disabled=0,this.readonly=0,this.form="",this.required=0,this.spellcheck=1,this.defaultValue=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.setTextareaHeight()),this.updateComplete.then(()=>{this.setTextareaHeight(),this.resizeObserver.observe(this.input)})}firstUpdated(){this.formControlController.updateValidity()}disconnectedCallback(){var t;super.disconnectedCallback(),this.input&&(null==(t=this.resizeObserver)||t.unobserve(this.input))}handleBlur(){this.hasFocus=0,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.setTextareaHeight(),this.emit("sl-change")}handleFocus(){this.hasFocus=1,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(0),this.formControlController.emitInvalidEvent(t)}setTextareaHeight(){"auto"===this.resize?(this.sizeAdjuster.style.height=`${this.input.clientHeight}px`,this.input.style.height="auto",this.input.style.height=`${this.input.scrollHeight}px`):this.input.style.height=""}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleRowsChange(){this.setTextareaHeight()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity(),this.setTextareaHeight()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}scrollPosition(t){return t?("number"==typeof t.top&&(this.input.scrollTop=t.top),void("number"==typeof t.left&&(this.input.scrollLeft=t.left))):{top:this.input.scrollTop,left:this.input.scrollTop}}setSelectionRange(t,e,s="none"){this.input.setSelectionRange(t,e,s)}setRangeText(t,e,s,i="preserve"){const r=null!=e?e:this.input.selectionStart,o=null!=s?s:this.input.selectionEnd;this.input.setRangeText(t,r,o,i),this.value!==this.input.value&&(this.value=this.input.value,this.setTextareaHeight())}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),s=this.label?1:!!t,i=this.helpText?1:!!e;return j`
      <div
        part="form-control"
        class=${oe({"form-control":1,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":s,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${oe({textarea:1,"textarea--small":"small"===this.size,"textarea--medium":"medium"===this.size,"textarea--large":"large"===this.size,"textarea--standard":!this.filled,"textarea--filled":this.filled,"textarea--disabled":this.disabled,"textarea--focused":this.hasFocus,"textarea--empty":!this.value,"textarea--resize-none":"none"===this.resize,"textarea--resize-vertical":"vertical"===this.resize,"textarea--resize-auto":"auto"===this.resize})}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${de(this.name)}
              .value=${is(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${de(this.placeholder)}
              rows=${de(this.rows)}
              minlength=${de(this.minlength)}
              maxlength=${de(this.maxlength)}
              autocapitalize=${de(this.autocapitalize)}
              autocorrect=${de(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${de(this.spellcheck)}
              enterkeyhint=${de(this.enterkeyhint)}
              inputmode=${de(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
            <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
            <div part="textarea-adjuster" class="textarea__size-adjuster" ?hidden=${"auto"!==this.resize}></div>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};rs.styles=[ct,Xe,Ve],xt([Bt(".textarea__control")],rs.prototype,"input",2),xt([Bt(".textarea__size-adjuster")],rs.prototype,"sizeAdjuster",2),xt([Mt()],rs.prototype,"hasFocus",2),xt([Ct()],rs.prototype,"title",2),xt([Ct()],rs.prototype,"name",2),xt([Ct()],rs.prototype,"value",2),xt([Ct({reflect:1})],rs.prototype,"size",2),xt([Ct({type:Boolean,reflect:1})],rs.prototype,"filled",2),xt([Ct()],rs.prototype,"label",2),xt([Ct({attribute:"help-text"})],rs.prototype,"helpText",2),xt([Ct()],rs.prototype,"placeholder",2),xt([Ct({type:Number})],rs.prototype,"rows",2),xt([Ct()],rs.prototype,"resize",2),xt([Ct({type:Boolean,reflect:1})],rs.prototype,"disabled",2),xt([Ct({type:Boolean,reflect:1})],rs.prototype,"readonly",2),xt([Ct({reflect:1})],rs.prototype,"form",2),xt([Ct({type:Boolean,reflect:1})],rs.prototype,"required",2),xt([Ct({type:Number})],rs.prototype,"minlength",2),xt([Ct({type:Number})],rs.prototype,"maxlength",2),xt([Ct()],rs.prototype,"autocapitalize",2),xt([Ct()],rs.prototype,"autocorrect",2),xt([Ct()],rs.prototype,"autocomplete",2),xt([Ct({type:Boolean})],rs.prototype,"autofocus",2),xt([Ct()],rs.prototype,"enterkeyhint",2),xt([Ct({type:Boolean,converter:{fromAttribute:t=>t&&"false"!==t?1:0,toAttribute:t=>t?"true":"false"}})],rs.prototype,"spellcheck",2),xt([Ct()],rs.prototype,"inputmode",2),xt([qe()],rs.prototype,"defaultValue",2),xt([Kt("disabled",{waitUntilFirstUpdate:1})],rs.prototype,"handleDisabledChange",1),xt([Kt("rows",{waitUntilFirstUpdate:1})],rs.prototype,"handleRowsChange",1),xt([Kt("value",{waitUntilFirstUpdate:1})],rs.prototype,"handleValueChange",1),rs.define("sl-textarea");var os=Ut({tagName:"sl-textarea",elementClass:rs,react:t,events:{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlFocus:"sl-focus",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlTextarea"}),as=a`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,ns=a`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const ls=Math.min,cs=Math.max,hs=Math.round,ds=Math.floor,us=t=>({x:t,y:t}),ps={left:"right",right:"left",bottom:"top",top:"bottom"},fs={start:"end",end:"start"};function bs(t,e,s){return cs(t,ls(e,s))}function ms(t,e){return"function"==typeof t?t(e):t}function gs(t){return t.split("-")[0]}function vs(t){return t.split("-")[1]}function ys(t){return"x"===t?"y":"x"}function ws(t){return"y"===t?"height":"width"}const _s=new Set(["top","bottom"]);function xs(t){return _s.has(gs(t))?"y":"x"}function ks(t){return ys(xs(t))}function $s(t){return t.replace(/start|end/g,t=>fs[t])}const zs=["left","right"],Ss=["right","left"],Cs=["top","bottom"],Ms=["bottom","top"];function As(t){return t.replace(/left|right|bottom|top/g,t=>ps[t])}function Ns(t){return"number"!=typeof t?(t=>({top:0,right:0,bottom:0,left:0,...t}))(t):{top:t,right:t,bottom:t,left:t}}function Bs(t){const{x:e,y:s,width:i,height:r}=t;return{width:i,height:r,top:s,left:e,right:e+i,bottom:s+r,x:e,y:s}}function Is(t,e,s){let{reference:i,floating:r}=t;const o=xs(e),a=ks(e),n=ws(a),l=gs(e),c="y"===o,h=i.x+i.width/2-r.width/2,d=i.y+i.height/2-r.height/2,u=i[n]/2-r[n]/2;let p;switch(l){case"top":p={x:h,y:i.y-r.height};break;case"bottom":p={x:h,y:i.y+i.height};break;case"right":p={x:i.x+i.width,y:d};break;case"left":p={x:i.x-r.width,y:d};break;default:p={x:i.x,y:i.y}}switch(vs(e)){case"start":p[a]-=u*(s&&c?-1:1);break;case"end":p[a]+=u*(s&&c?-1:1)}return p}async function Os(t,e){var s;void 0===e&&(e={});const{x:i,y:r,platform:o,rects:a,elements:n,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:u=0,padding:p=0}=ms(e,t),f=Ns(p),b=n[u?"floating"===d?"reference":"floating":d],m=Bs(await o.getClippingRect({element:null==(s=await(null==o.isElement?void 0:o.isElement(b)))||s?b:b.contextElement||await(null==o.getDocumentElement?void 0:o.getDocumentElement(n.floating)),boundary:c,rootBoundary:h,strategy:l})),g="floating"===d?{x:i,y:r,width:a.floating.width,height:a.floating.height}:a.reference,v=await(null==o.getOffsetParent?void 0:o.getOffsetParent(n.floating)),y=await(null==o.isElement?void 0:o.isElement(v))&&await(null==o.getScale?void 0:o.getScale(v))||{x:1,y:1},w=Bs(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({elements:n,rect:g,offsetParent:v,strategy:l}):g);return{top:(m.top-w.top+f.top)/y.y,bottom:(w.bottom-m.bottom+f.bottom)/y.y,left:(m.left-w.left+f.left)/y.x,right:(w.right-m.right+f.right)/y.x}}const Es=new Set(["left","top"]);function Fs(){return"undefined"!=typeof window}function Ds(t){return Ls(t)?(t.nodeName||"").toLowerCase():"#document"}function Ts(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function Us(t){var e;return null==(e=(Ls(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function Ls(t){return Fs()?t instanceof Node||t instanceof Ts(t).Node:0}function Rs(t){return Fs()?t instanceof Element||t instanceof Ts(t).Element:0}function Ps(t){return Fs()?t instanceof HTMLElement||t instanceof Ts(t).HTMLElement:0}function js(t){return Fs()&&"undefined"!=typeof ShadowRoot?t instanceof ShadowRoot||t instanceof Ts(t).ShadowRoot:0}const Hs=new Set(["inline","contents"]);function Vs(t){const{overflow:e,overflowX:s,overflowY:i,display:r}=si(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+s)&&!Hs.has(r)}const qs=new Set(["table","td","th"]);function Xs(t){return qs.has(Ds(t))}const Ys=[":popover-open",":modal"];function Ws(t){return Ys.some(e=>{try{return t.matches(e)}catch(t){return 0}})}const Ks=["transform","translate","scale","rotate","perspective"],Gs=["transform","translate","scale","rotate","perspective","filter"],Qs=["paint","layout","strict","content"];function Zs(t){const e=Js(),s=Rs(t)?si(t):t;return Ks.some(t=>s[t]?"none"!==s[t]:0)||(s.containerType?"normal"!==s.containerType:0)||!e&&(s.backdropFilter?"none"!==s.backdropFilter:0)||!e&&(s.filter?"none"!==s.filter:0)||Gs.some(t=>(s.willChange||"").includes(t))||Qs.some(t=>(s.contain||"").includes(t))}function Js(){return"undefined"!=typeof CSS&&CSS.supports?CSS.supports("-webkit-backdrop-filter","none"):0}const ti=new Set(["html","body","#document"]);function ei(t){return ti.has(Ds(t))}function si(t){return Ts(t).getComputedStyle(t)}function ii(t){return Rs(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function ri(t){if("html"===Ds(t))return t;const e=t.assignedSlot||t.parentNode||js(t)&&t.host||Us(t);return js(e)?e.host:e}function oi(t){const e=ri(t);return ei(e)?t.ownerDocument?t.ownerDocument.body:t.body:Ps(e)&&Vs(e)?e:oi(e)}function ai(t,e,s){var i;void 0===e&&(e=[]),void 0===s&&(s=1);const r=oi(t),o=r===(null==(i=t.ownerDocument)?void 0:i.body),a=Ts(r);if(o){const t=ni(a);return e.concat(a,a.visualViewport||[],Vs(r)?r:[],t&&s?ai(t):[])}return e.concat(r,ai(r,[],s))}function ni(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function li(t){const e=si(t);let s=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const r=Ps(t),o=r?t.offsetWidth:s,a=r?t.offsetHeight:i,n=hs(s)!==o||hs(i)!==a;return n&&(s=o,i=a),{width:s,height:i,$:n}}function ci(t){return Rs(t)?t:t.contextElement}function hi(t){const e=ci(t);if(!Ps(e))return us(1);const s=e.getBoundingClientRect(),{width:i,height:r,$:o}=li(e);let a=(o?hs(s.width):s.width)/i,n=(o?hs(s.height):s.height)/r;return a&&Number.isFinite(a)||(a=1),n&&Number.isFinite(n)||(n=1),{x:a,y:n}}const di=us(0);function ui(t){const e=Ts(t);return Js()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:di}function pi(t,e,s,i){void 0===e&&(e=0),void 0===s&&(s=0);const r=t.getBoundingClientRect(),o=ci(t);let a=us(1);e&&(i?Rs(i)&&(a=hi(i)):a=hi(t));const n=((t,e,s)=>(void 0===e&&(e=0),!s||e&&s!==Ts(t)?0:e))(o,s,i)?ui(o):us(0);let l=(r.left+n.x)/a.x,c=(r.top+n.y)/a.y,h=r.width/a.x,d=r.height/a.y;if(o){const t=Ts(o),e=i&&Rs(i)?Ts(i):i;let s=t,r=ni(s);for(;r&&i&&e!==s;){const t=hi(r),e=r.getBoundingClientRect(),i=si(r),o=e.left+(r.clientLeft+parseFloat(i.paddingLeft))*t.x,a=e.top+(r.clientTop+parseFloat(i.paddingTop))*t.y;l*=t.x,c*=t.y,h*=t.x,d*=t.y,l+=o,c+=a,s=Ts(r),r=ni(s)}}return Bs({width:h,height:d,x:l,y:c})}function fi(t,e){const s=ii(t).scrollLeft;return e?e.left+s:pi(Us(t)).left+s}function bi(t,e,s){void 0===s&&(s=0);const i=t.getBoundingClientRect();return{x:i.left+e.scrollLeft-(s?0:fi(t,i)),y:i.top+e.scrollTop}}const mi=new Set(["absolute","fixed"]);function gi(t,e,s){let i;if("viewport"===e)i=((t,e)=>{const s=Ts(t),i=Us(t),r=s.visualViewport;let o=i.clientWidth,a=i.clientHeight,n=0,l=0;if(r){o=r.width,a=r.height;const t=Js();(!t||t&&"fixed"===e)&&(n=r.offsetLeft,l=r.offsetTop)}return{width:o,height:a,x:n,y:l}})(t,s);else if("document"===e)i=(t=>{const e=Us(t),s=ii(t),i=t.ownerDocument.body,r=cs(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),o=cs(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let a=-s.scrollLeft+fi(t);const n=-s.scrollTop;return"rtl"===si(i).direction&&(a+=cs(e.clientWidth,i.clientWidth)-r),{width:r,height:o,x:a,y:n}})(Us(t));else if(Rs(e))i=((t,e)=>{const s=pi(t,1,"fixed"===e),i=s.top+t.clientTop,r=s.left+t.clientLeft,o=Ps(t)?hi(t):us(1);return{width:t.clientWidth*o.x,height:t.clientHeight*o.y,x:r*o.x,y:i*o.y}})(e,s);else{const s=ui(t);i={x:e.x-s.x,y:e.y-s.y,width:e.width,height:e.height}}return Bs(i)}function vi(t,e){const s=ri(t);return s===e||!Rs(s)||ei(s)?0:"fixed"===si(s).position||vi(s,e)}function yi(t,e,s){const i=Ps(e),r=Us(e),o="fixed"===s,a=pi(t,1,o,e);let n={scrollLeft:0,scrollTop:0};const l=us(0);function c(){l.x=fi(r)}if(i||!i&&!o)if(("body"!==Ds(e)||Vs(r))&&(n=ii(e)),i){const t=pi(e,1,o,e);l.x=t.x+e.clientLeft,l.y=t.y+e.clientTop}else r&&c();o&&!i&&r&&c();const h=!r||i||o?us(0):bi(r,n);return{x:a.left+n.scrollLeft-l.x-h.x,y:a.top+n.scrollTop-l.y-h.y,width:a.width,height:a.height}}function wi(t){return"static"===si(t).position}function _i(t,e){if(!Ps(t)||"fixed"===si(t).position)return null;if(e)return e(t);let s=t.offsetParent;return Us(t)===s&&(s=s.ownerDocument.body),s}function xi(t,e){const s=Ts(t);if(Ws(t))return s;if(!Ps(t)){let e=ri(t);for(;e&&!ei(e);){if(Rs(e)&&!wi(e))return e;e=ri(e)}return s}let i=_i(t,e);for(;i&&Xs(i)&&wi(i);)i=_i(i,e);return i&&ei(i)&&wi(i)&&!Zs(i)?s:i||(t=>{let e=ri(t);for(;Ps(e)&&!ei(e);){if(Zs(e))return e;if(Ws(e))return null;e=ri(e)}return null})(t)||s}const ki={convertOffsetParentRelativeRectToViewportRelativeRect(t){let{elements:e,rect:s,offsetParent:i,strategy:r}=t;const o="fixed"===r,a=Us(i),n=e?Ws(e.floating):0;if(i===a||n&&o)return s;let l={scrollLeft:0,scrollTop:0},c=us(1);const h=us(0),d=Ps(i);if((d||!d&&!o)&&(("body"!==Ds(i)||Vs(a))&&(l=ii(i)),Ps(i))){const t=pi(i);c=hi(i),h.x=t.x+i.clientLeft,h.y=t.y+i.clientTop}const u=!a||d||o?us(0):bi(a,l,1);return{width:s.width*c.x,height:s.height*c.y,x:s.x*c.x-l.scrollLeft*c.x+h.x+u.x,y:s.y*c.y-l.scrollTop*c.y+h.y+u.y}},getDocumentElement:Us,getClippingRect(t){let{element:e,boundary:s,rootBoundary:i,strategy:r}=t;const o=[..."clippingAncestors"===s?Ws(e)?[]:((t,e)=>{const s=e.get(t);if(s)return s;let i=ai(t,[],0).filter(t=>Rs(t)&&"body"!==Ds(t)),r=null;const o="fixed"===si(t).position;let a=o?ri(t):t;for(;Rs(a)&&!ei(a);){const e=si(a),s=Zs(a);s||"fixed"!==e.position||(r=null),(o?!s&&!r:!s&&"static"===e.position&&r&&mi.has(r.position)||Vs(a)&&!s&&vi(t,a))?i=i.filter(t=>t!==a):r=e,a=ri(a)}return e.set(t,i),i})(e,this._c):[].concat(s),i],a=o[0],n=o.reduce((t,s)=>{const i=gi(e,s,r);return t.top=cs(i.top,t.top),t.right=ls(i.right,t.right),t.bottom=ls(i.bottom,t.bottom),t.left=cs(i.left,t.left),t},gi(e,a,r));return{width:n.right-n.left,height:n.bottom-n.top,x:n.left,y:n.top}},getOffsetParent:xi,async getElementRects(t){const e=this.getOffsetParent||xi,s=this.getDimensions,i=await s(t.floating);return{reference:yi(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}},getClientRects:t=>Array.from(t.getClientRects()),getDimensions(t){const{width:e,height:s}=li(t);return{width:e,height:s}},getScale:hi,isElement:Rs,isRTL:t=>"rtl"===si(t).direction};function $i(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}const zi=t=>(void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var s,i;const{placement:r,middlewareData:o,rects:a,initialPlacement:n,platform:l,elements:c}=e,{mainAxis:h=1,crossAxis:d=1,fallbackPlacements:u,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:b=1,...m}=ms(t,e);if(null!=(s=o.arrow)&&s.alignmentOffset)return{};const g=gs(r),v=xs(n),y=gs(n)===n,w=await(null==l.isRTL?void 0:l.isRTL(c.floating)),_=u||(y||!b?[As(n)]:(t=>{const e=As(t);return[$s(t),e,$s(e)]})(n)),x="none"!==f;!u&&x&&_.push(...function(t,e,s,i){const r=vs(t);let o=((t,e,s)=>{switch(t){case"top":case"bottom":return s?e?Ss:zs:e?zs:Ss;case"left":case"right":return e?Cs:Ms;default:return[]}})(gs(t),"start"===s,i);return r&&(o=o.map(t=>t+"-"+r),e&&(o=o.concat(o.map($s)))),o}(n,b,f,w));const k=[n,..._],$=await Os(e,m),z=[];let S=(null==(i=o.flip)?void 0:i.overflows)||[];if(h&&z.push($[g]),d){const t=((t,e,s)=>{void 0===s&&(s=0);const i=vs(t),r=ks(t),o=ws(r);let a="x"===r?i===(s?"end":"start")?"right":"left":"start"===i?"bottom":"top";return e.reference[o]>e.floating[o]&&(a=As(a)),[a,As(a)]})(r,a,w);z.push($[t[0]],$[t[1]])}if(S=[...S,{placement:r,overflows:z}],!z.every(t=>t<=0)){var C,M;const t=((null==(C=o.flip)?void 0:C.index)||0)+1,e=k[t];if(e&&("alignment"!==d||v===xs(e)||S.every(t=>xs(t.placement)===v?t.overflows[0]>0:1)))return{data:{index:t,overflows:S},reset:{placement:e}};let s=null==(M=S.filter(t=>t.overflows[0]<=0).sort((t,e)=>t.overflows[1]-e.overflows[1])[0])?void 0:M.placement;if(!s)switch(p){case"bestFit":{var A;const t=null==(A=S.filter(t=>{if(x){const e=xs(t.placement);return e===v||"y"===e}return 1}).map(t=>[t.placement,t.overflows.filter(t=>t>0).reduce((t,e)=>t+e,0)]).sort((t,e)=>t[1]-e[1])[0])?void 0:A[0];t&&(s=t);break}case"initialPlacement":s=n}if(r!==s)return{reset:{placement:s}}}return{}}}),Si=t=>(void 0===t&&(t={}),{name:"size",options:t,async fn(e){var s,i;const{placement:r,rects:o,platform:a,elements:n}=e,{apply:l=()=>{},...c}=ms(t,e),h=await Os(e,c),d=gs(r),u=vs(r),p="y"===xs(r),{width:f,height:b}=o.floating;let m,g;"top"===d||"bottom"===d?(m=d,g=u===(await(null==a.isRTL?void 0:a.isRTL(n.floating))?"start":"end")?"left":"right"):(g=d,m="end"===u?"top":"bottom");const v=b-h.top-h.bottom,y=f-h.left-h.right,w=ls(b-h[m],v),_=ls(f-h[g],y),x=!e.middlewareData.shift;let k=w,$=_;if(null!=(s=e.middlewareData.shift)&&s.enabled.x&&($=y),null!=(i=e.middlewareData.shift)&&i.enabled.y&&(k=v),x&&!u){const t=cs(h.left,0),e=cs(h.right,0),s=cs(h.top,0),i=cs(h.bottom,0);p?$=f-2*(0!==t||0!==e?t+e:cs(h.left,h.right)):k=b-2*(0!==s||0!==i?s+i:cs(h.top,h.bottom))}await l({...e,availableWidth:$,availableHeight:k});const z=await a.getDimensions(n.floating);return f!==z.width||b!==z.height?{reset:{rects:1}}:{}}});function Ci(t){return(t=>{for(let e=t;e;e=Mi(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=Mi(t);e;e=Mi(e)){if(!(e instanceof Element))continue;const t=getComputedStyle(e);if("contents"!==t.display){if("static"!==t.position||Zs(t))return e;if("BODY"===e.tagName)return e}}return null})(t)}function Mi(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}var Ai=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.active=0,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=0,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=0,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=0,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=0,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect();let s=0,i=0,r=0,o=0,a=0,n=0,l=0,c=0;this.placement.includes("top")||this.placement.includes("bottom")?t.top<e.top?(s=t.left,i=t.bottom,r=t.right,o=t.bottom,a=e.left,n=e.top,l=e.right,c=e.top):(s=e.left,i=e.bottom,r=e.right,o=e.bottom,a=t.left,n=t.top,l=t.right,c=t.top):t.left<e.left?(s=t.right,i=t.top,r=e.left,o=e.top,a=t.right,n=t.bottom,l=e.left,c=e.bottom):(s=e.right,i=e.top,r=t.left,o=t.top,a=e.right,n=e.bottom,l=t.left,c=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${s}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${r}px`),this.style.setProperty("--hover-bridge-top-right-y",`${o}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${c}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||null!==(t=this.anchor)&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t.contextElement instanceof Element)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');var t;this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:1})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=function(t,e,s,i){void 0===i&&(i={});const{ancestorScroll:r=1,ancestorResize:o=1,elementResize:a="function"==typeof ResizeObserver,layoutShift:n="function"==typeof IntersectionObserver,animationFrame:l=0}=i,c=ci(t),h=r||o?[...c?ai(c):[],...ai(e)]:[];h.forEach(t=>{r&&t.addEventListener("scroll",s,{passive:1}),o&&t.addEventListener("resize",s)});const d=c&&n?((t,e)=>{let s,i=null;const r=Us(t);function o(){var t;clearTimeout(s),null==(t=i)||t.disconnect(),i=null}return function a(n,l){void 0===n&&(n=0),void 0===l&&(l=1),o();const c=t.getBoundingClientRect(),{left:h,top:d,width:u,height:p}=c;if(n||e(),!u||!p)return;const f={rootMargin:-ds(d)+"px "+-ds(r.clientWidth-(h+u))+"px "+-ds(r.clientHeight-(d+p))+"px "+-ds(h)+"px",threshold:cs(0,ls(1,l))||1};let b=1;function m(e){const i=e[0].intersectionRatio;if(i!==l){if(!b)return a();i?a(0,i):s=setTimeout(()=>{a(0,1e-7)},1e3)}1!==i||$i(c,t.getBoundingClientRect())||a(),b=0}try{i=new IntersectionObserver(m,{...f,root:r.ownerDocument})}catch(t){i=new IntersectionObserver(m,f)}i.observe(t)}(1),o})(c,s):null;let u,p=-1,f=null;a&&(f=new ResizeObserver(t=>{let[i]=t;i&&i.target===c&&f&&(f.unobserve(e),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var t;null==(t=f)||t.observe(e)})),s()}),c&&!l&&f.observe(c),f.observe(e));let b=l?pi(t):null;return l&&function e(){const i=pi(t);b&&!$i(b,i)&&s(),b=i,u=requestAnimationFrame(e)}(),s(),()=>{var t;h.forEach(t=>{r&&t.removeEventListener("scroll",s),o&&t.removeEventListener("resize",s)}),null==d||d(),null==(t=f)||t.disconnect(),f=null,l&&cancelAnimationFrame(u)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[(e={mainAxis:this.distance,crossAxis:this.skidding},void 0===e&&(e=0),{name:"offset",options:e,async fn(t){var s,i;const{x:r,y:o,placement:a,middlewareData:n}=t,l=await(async(t,e)=>{const{placement:s,platform:i,elements:r}=t,o=await(null==i.isRTL?void 0:i.isRTL(r.floating)),a=gs(s),n=vs(s),l="y"===xs(s),c=Es.has(a)?-1:1,h=o&&l?-1:1,d=ms(e,t);let{mainAxis:u,crossAxis:p,alignmentAxis:f}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return n&&"number"==typeof f&&(p="end"===n?-1*f:f),l?{x:p*h,y:u*c}:{x:u*c,y:p*h}})(t,e);return a===(null==(s=n.offset)?void 0:s.placement)&&null!=(i=n.arrow)&&i.alignmentOffset?{}:{x:r+l.x,y:o+l.y,data:{...l,placement:a}}}})];var e;this.sync?t.push(Si({apply:({rects:t})=>{const e="width"===this.sync||"both"===this.sync,s="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=s?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(zi({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push((t=>(void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:s,y:i,placement:r}=e,{mainAxis:o=1,crossAxis:a=0,limiter:n={fn(t){let{x:e,y:s}=t;return{x:e,y:s}}},...l}=ms(t,e),c={x:s,y:i},h=await Os(e,l),d=xs(gs(r)),u=ys(d);let p=c[u],f=c[d];if(o){const t="y"===u?"bottom":"right";p=bs(p+h["y"===u?"top":"left"],p,p-h[t])}if(a){const t="y"===d?"bottom":"right";f=bs(f+h["y"===d?"top":"left"],f,f-h[t])}const b=n.fn({...e,[u]:p,[d]:f});return{...b,data:{x:b.x-s,y:b.y-i,enabled:{[u]:o,[d]:a}}}}}))({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Si({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push((t=>({name:"arrow",options:t,async fn(e){const{x:s,y:i,placement:r,rects:o,platform:a,elements:n,middlewareData:l}=e,{element:c,padding:h=0}=ms(t,e)||{};if(null==c)return{};const d=Ns(h),u={x:s,y:i},p=ks(r),f=ws(p),b=await a.getDimensions(c),m="y"===p,g=m?"top":"left",v=m?"bottom":"right",y=m?"clientHeight":"clientWidth",w=o.reference[f]+o.reference[p]-u[p]-o.floating[f],_=u[p]-o.reference[p],x=await(null==a.getOffsetParent?void 0:a.getOffsetParent(c));let k=x?x[y]:0;k&&await(null==a.isElement?void 0:a.isElement(x))||(k=n.floating[y]||o.floating[f]);const $=w/2-_/2,z=k/2-b[f]/2-1,S=ls(d[g],z),C=ls(d[v],z),M=S,A=k-b[f]-C,N=k/2-b[f]/2+$,B=bs(M,N,A),I=!l.arrow&&null!=vs(r)&&N!==B&&o.reference[f]/2-(N<M?S:C)-b[f]/2<0,O=I?N<M?N-M:N-A:0;return{[p]:u[p]+O,data:{[p]:B,centerOffset:N-B-O,...I&&{alignmentOffset:O}},reset:I}}}))({element:this.arrowEl,padding:this.arrowPadding}));const s="absolute"===this.strategy?t=>ki.getOffsetParent(t,Ci):ki.getOffsetParent;((t,e,s)=>{const i=new Map,r={platform:ki,...s},o={...r.platform,_c:i};return(async(t,e,s)=>{const{placement:i="bottom",strategy:r="absolute",middleware:o=[],platform:a}=s,n=o.filter(Boolean),l=await(null==a.isRTL?void 0:a.isRTL(e));let c=await a.getElementRects({reference:t,floating:e,strategy:r}),{x:h,y:d}=Is(c,i,l),u=i,p={},f=0;for(let s=0;s<n.length;s++){const{name:o,fn:b}=n[s],{x:m,y:g,data:v,reset:y}=await b({x:h,y:d,initialPlacement:i,placement:u,strategy:r,middlewareData:p,rects:c,platform:a,elements:{reference:t,floating:e}});h=null!=m?m:h,d=null!=g?g:d,p={...p,[o]:{...p[o],...v}},y&&f<=50&&(f++,"object"==typeof y&&(y.placement&&(u=y.placement),y.rects&&(c=1==y.rects?await a.getElementRects({reference:t,floating:e,strategy:r}):y.rects),({x:h,y:d}=Is(c,u,l))),s=-1)}return{x:h,y:d,placement:u,strategy:r,middlewareData:p}})(t,e,{...r,platform:o})})(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:_t(wt({},ki),{getOffsetParent:s})}).then(({x:t,y:e,middlewareData:s,placement:i})=>{const r="rtl"===this.localize.dir(),o={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];if(this.setAttribute("data-current-placement",i),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){const t=s.arrow.x,e=s.arrow.y;let i="",a="",n="",l="";if("start"===this.arrowPlacement){const s="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",a=r?s:"",l=r?"":s}else if("end"===this.arrowPlacement){const s="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a=r?"":s,l=r?s:"",n="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(l="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",i="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(l="number"==typeof t?`${t}px`:"",i="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:i,right:a,bottom:n,left:l,[o]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return j`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${oe({"popup-hover-bridge":1,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${oe({popup:1,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?j`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};Ai.styles=[ct,ns],xt([Bt(".popup")],Ai.prototype,"popup",2),xt([Bt(".popup__arrow")],Ai.prototype,"arrowEl",2),xt([Ct()],Ai.prototype,"anchor",2),xt([Ct({type:Boolean,reflect:1})],Ai.prototype,"active",2),xt([Ct({reflect:1})],Ai.prototype,"placement",2),xt([Ct({reflect:1})],Ai.prototype,"strategy",2),xt([Ct({type:Number})],Ai.prototype,"distance",2),xt([Ct({type:Number})],Ai.prototype,"skidding",2),xt([Ct({type:Boolean})],Ai.prototype,"arrow",2),xt([Ct({attribute:"arrow-placement"})],Ai.prototype,"arrowPlacement",2),xt([Ct({attribute:"arrow-padding",type:Number})],Ai.prototype,"arrowPadding",2),xt([Ct({type:Boolean})],Ai.prototype,"flip",2),xt([Ct({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(t=>t.trim()).filter(t=>""!==t),toAttribute:t=>t.join(" ")}})],Ai.prototype,"flipFallbackPlacements",2),xt([Ct({attribute:"flip-fallback-strategy"})],Ai.prototype,"flipFallbackStrategy",2),xt([Ct({type:Object})],Ai.prototype,"flipBoundary",2),xt([Ct({attribute:"flip-padding",type:Number})],Ai.prototype,"flipPadding",2),xt([Ct({type:Boolean})],Ai.prototype,"shift",2),xt([Ct({type:Object})],Ai.prototype,"shiftBoundary",2),xt([Ct({attribute:"shift-padding",type:Number})],Ai.prototype,"shiftPadding",2),xt([Ct({attribute:"auto-size"})],Ai.prototype,"autoSize",2),xt([Ct()],Ai.prototype,"sync",2),xt([Ct({type:Object})],Ai.prototype,"autoSizeBoundary",2),xt([Ct({attribute:"auto-size-padding",type:Number})],Ai.prototype,"autoSizePadding",2),xt([Ct({attribute:"hover-bridge",type:Boolean})],Ai.prototype,"hoverBridge",2);var Ni=new Map,Bi=new WeakMap;function Ii(t,e){return"rtl"===e.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Oi(t,e){Ni.set(t,(t=>null!=t?t:{keyframes:[],options:{duration:0}})(e))}function Ei(t,e,s){const i=Bi.get(t);if(null==i?void 0:i[e])return Ii(i[e],s.dir);const r=Ni.get(e);return r?Ii(r,s.dir):{keyframes:[],options:{duration:0}}}function Fi(t,e){return new Promise(s=>{t.addEventListener(e,function i(r){r.target===t&&(t.removeEventListener(e,i),s())})})}function Di(t,e,s){return new Promise(i=>{if((null==s?void 0:s.duration)===1/0)throw new Error("Promise-based animations must be finite.");const r=t.animate(e,_t(wt({},s),{duration:Ui()?0:s.duration}));r.addEventListener("cancel",i,{once:1}),r.addEventListener("finish",i,{once:1})})}function Ti(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function Ui(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Li(t){return Promise.all(t.getAnimations().map(t=>new Promise(e=>{t.cancel(),requestAnimationFrame(e)})))}function Ri(t,e){return t.map(t=>_t(wt({},t),{height:"auto"===t.height?`${e}px`:t.height}))}var Pi=class extends Ot{constructor(){super(),this.localize=new ze(this),this.content="",this.placement="top",this.disabled=0,this.distance=8,this.open=0,this.skidding=0,this.trigger="hover focus",this.hoist=0,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=Ti(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=Ti(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,1),this.addEventListener("focus",this.handleFocus,1),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=1,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await Li(this.body),this.body.hidden=0,this.popup.active=1;const{keyframes:e,options:s}=Ei(this,"tooltip.show",{dir:this.localize.dir()});await Di(this.popup.popup,e,s),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await Li(this.body);const{keyframes:t,options:s}=Ei(this,"tooltip.hide",{dir:this.localize.dir()});await Di(this.popup.popup,t,s),this.popup.active=0,this.body.hidden=1,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=1,Fi(this,"sl-after-show")}async hide(){if(this.open)return this.open=0,Fi(this,"sl-after-hide")}render(){return j`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${oe({tooltip:1,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};Pi.styles=[ct,as],Pi.dependencies={"sl-popup":Ai},xt([Bt("slot:not([name])")],Pi.prototype,"defaultSlot",2),xt([Bt(".tooltip__body")],Pi.prototype,"body",2),xt([Bt("sl-popup")],Pi.prototype,"popup",2),xt([Ct()],Pi.prototype,"content",2),xt([Ct()],Pi.prototype,"placement",2),xt([Ct({type:Boolean,reflect:1})],Pi.prototype,"disabled",2),xt([Ct({type:Number})],Pi.prototype,"distance",2),xt([Ct({type:Boolean,reflect:1})],Pi.prototype,"open",2),xt([Ct({type:Number})],Pi.prototype,"skidding",2),xt([Ct()],Pi.prototype,"trigger",2),xt([Ct({type:Boolean})],Pi.prototype,"hoist",2),xt([Kt("open",{waitUntilFirstUpdate:1})],Pi.prototype,"handleOpenChange",1),xt([Kt(["content","distance","hoist","placement","skidding"])],Pi.prototype,"handleOptionsChange",1),xt([Kt("disabled")],Pi.prototype,"handleDisabledChange",1),Oi("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),Oi("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}}),Pi.define("sl-tooltip");var ji=Ut({tagName:"sl-tooltip",elementClass:Pi,react:t,events:{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide"},displayName:"SlTooltip"}),Hi=a`
  :host {
    display: block;
    outline: 0;
    z-index: 0;
  }

  :host(:focus) {
    outline: none;
  }

  slot:not([name])::slotted(sl-icon) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    color: var(--sl-color-neutral-700);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  .tree-item__checkbox {
    pointer-events: none;
  }

  .tree-item__expand-button,
  .tree-item__checkbox,
  .tree-item__label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-dense);
    letter-spacing: var(--sl-letter-spacing-normal);
  }

  .tree-item__checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .tree-item__indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .tree-item__expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-x-small);
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    cursor: pointer;
  }

  .tree-item__expand-button {
    transition: var(--sl-transition-medium) rotate ease;
  }

  .tree-item--expanded .tree-item__expand-button {
    rotate: 90deg;
  }

  .tree-item--expanded.tree-item--rtl .tree-item__expand-button {
    rotate: -90deg;
  }

  .tree-item--expanded slot[name='expand-icon'],
  .tree-item:not(.tree-item--expanded) slot[name='collapse-icon'] {
    display: none;
  }

  .tree-item:not(.tree-item--has-expand-button) .tree-item__expand-icon-slot {
    display: none;
  }

  .tree-item__expand-button--visible {
    cursor: pointer;
  }

  .tree-item__item {
    display: flex;
    align-items: center;
    border-inline-start: solid 3px transparent;
  }

  .tree-item--disabled .tree-item__item {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }

  :host(:focus-visible) .tree-item__item {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
    z-index: 2;
  }

  :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
    background-color: var(--sl-color-neutral-100);
    border-inline-start-color: var(--sl-color-primary-600);
  }

  :host(:not([aria-disabled='true'])) .tree-item__expand-button {
    color: var(--sl-color-neutral-600);
  }

  .tree-item__label {
    display: flex;
    align-items: center;
    transition: var(--sl-transition-fast) color;
  }

  .tree-item__children {
    display: block;
    font-size: calc(1em + var(--indent-size, var(--sl-spacing-medium)));
  }

  /* Indentation lines */
  .tree-item__children {
    position: relative;
  }

  .tree-item__children::before {
    content: '';
    position: absolute;
    top: var(--indent-guide-offset);
    bottom: var(--indent-guide-offset);
    left: calc(1em - (var(--indent-guide-width) / 2) - 1px);
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  .tree-item--rtl .tree-item__children::before {
    left: auto;
    right: 1em;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
      outline: dashed 1px SelectedItem;
    }
  }
`,Vi=a`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`,qi=class extends Ot{constructor(){super(...arguments),this.formControlController=new Ze(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new ss(this,"help-text"),this.hasFocus=0,this.title="",this.name="",this.size="medium",this.disabled=0,this.checked=0,this.indeterminate=0,this.defaultChecked=0,this.form="",this.required=0,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=0,this.emit("sl-change")}handleBlur(){this.hasFocus=0,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(0),this.formControlController.emitInvalidEvent(t)}handleFocus(){this.hasFocus=1,this.emit("sl-focus")}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("help-text"),e=this.helpText?1:!!t;return j`
      <div
        class=${oe({"form-control":1,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${oe({checkbox:1,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":"small"===this.size,"checkbox--medium":"medium"===this.size,"checkbox--large":"large"===this.size})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${de(this.value)}
            .indeterminate=${is(this.indeterminate)}
            .checked=${is(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
            class="checkbox__control"
          >
            ${this.checked?j`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?j`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                `:""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};qi.styles=[ct,Xe,Vi],qi.dependencies={"sl-icon":se},xt([Bt('input[type="checkbox"]')],qi.prototype,"input",2),xt([Mt()],qi.prototype,"hasFocus",2),xt([Ct()],qi.prototype,"title",2),xt([Ct()],qi.prototype,"name",2),xt([Ct()],qi.prototype,"value",2),xt([Ct({reflect:1})],qi.prototype,"size",2),xt([Ct({type:Boolean,reflect:1})],qi.prototype,"disabled",2),xt([Ct({type:Boolean,reflect:1})],qi.prototype,"checked",2),xt([Ct({type:Boolean,reflect:1})],qi.prototype,"indeterminate",2),xt([qe("checked")],qi.prototype,"defaultChecked",2),xt([Ct({reflect:1})],qi.prototype,"form",2),xt([Ct({type:Boolean,reflect:1})],qi.prototype,"required",2),xt([Ct({attribute:"help-text"})],qi.prototype,"helpText",2),xt([Kt("disabled",{waitUntilFirstUpdate:1})],qi.prototype,"handleDisabledChange",1),xt([Kt(["checked","indeterminate"],{waitUntilFirstUpdate:1})],qi.prototype,"handleStateChange",1);var Xi=a`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`,Yi=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this)}render(){return j`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};function Wi(t,e,s){return t?e(t):s?.(t)}Yi.styles=[ct,Xi];var Ki=class t extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.indeterminate=0,this.isLeaf=0,this.loading=0,this.selectable=0,this.expanded=0,this.selected=0,this.disabled=0,this.lazy=0}static isTreeItem(t){return t instanceof Element&&"treeitem"===t.getAttribute("role")}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&0===this.getChildrenItems().length,this.handleExpandedChange()}async animateCollapse(){this.emit("sl-collapse"),await Li(this.childrenContainer);const{keyframes:t,options:e}=Ei(this,"tree-item.collapse",{dir:this.localize.dir()});await Di(this.childrenContainer,Ri(t,this.childrenContainer.scrollHeight),e),this.childrenContainer.hidden=1,this.emit("sl-after-collapse")}isNestedItem(){const e=this.parentElement;return!!e&&t.isTreeItem(e)}handleChildrenSlotChange(){this.loading=0,this.isLeaf=!this.lazy&&0===this.getChildrenItems().length}willUpdate(t){t.has("selected")&&!t.has("indeterminate")&&(this.indeterminate=0)}async animateExpand(){this.emit("sl-expand"),await Li(this.childrenContainer),this.childrenContainer.hidden=0;const{keyframes:t,options:e}=Ei(this,"tree-item.expand",{dir:this.localize.dir()});await Di(this.childrenContainer,Ri(t,this.childrenContainer.scrollHeight),e),this.childrenContainer.style.height="auto",this.emit("sl-after-expand")}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=1,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.emit("sl-lazy-change")}getChildrenItems({includeDisabled:e=1}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:1})].filter(s=>t.isTreeItem(s)&&(e||!s.disabled)):[]}render(){const t="rtl"===this.localize.dir(),e=!this.loading&&(!this.isLeaf||this.lazy);return j`
      <div
        part="base"
        class="${oe({"tree-item":1,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":e,"tree-item--rtl":"rtl"===this.localize.dir()})}"
      >
        <div
          class="tree-item__item"
          part="
            item
            ${this.disabled?"item--disabled":""}
            ${this.expanded?"item--expanded":""}
            ${this.indeterminate?"item--indeterminate":""}
            ${this.selected?"item--selected":""}
          "
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${oe({"tree-item__expand-button":1,"tree-item__expand-button--visible":e})}
            aria-hidden="true"
          >
            ${Wi(this.loading,()=>j` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `)}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${Wi(this.selectable,()=>j`
              <sl-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    control--checked:checkbox__control--checked,
                    control--indeterminate:checkbox__control--indeterminate,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="tree-item__checkbox"
                ?disabled="${this.disabled}"
                ?checked="${is(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></sl-checkbox>
            `)}

          <slot class="tree-item__label" part="label"></slot>
        </div>

        <div class="tree-item__children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};Ki.styles=[ct,Hi],Ki.dependencies={"sl-checkbox":qi,"sl-icon":se,"sl-spinner":Yi},xt([Mt()],Ki.prototype,"indeterminate",2),xt([Mt()],Ki.prototype,"isLeaf",2),xt([Mt()],Ki.prototype,"loading",2),xt([Mt()],Ki.prototype,"selectable",2),xt([Ct({type:Boolean,reflect:1})],Ki.prototype,"expanded",2),xt([Ct({type:Boolean,reflect:1})],Ki.prototype,"selected",2),xt([Ct({type:Boolean,reflect:1})],Ki.prototype,"disabled",2),xt([Ct({type:Boolean,reflect:1})],Ki.prototype,"lazy",2),xt([Bt("slot:not([name])")],Ki.prototype,"defaultSlot",2),xt([Bt("slot[name=children]")],Ki.prototype,"childrenSlot",2),xt([Bt(".tree-item__item")],Ki.prototype,"itemElement",2),xt([Bt(".tree-item__children")],Ki.prototype,"childrenContainer",2),xt([Bt(".tree-item__expand-button slot")],Ki.prototype,"expandButtonSlot",2),xt([Kt("loading",{waitUntilFirstUpdate:1})],Ki.prototype,"handleLoadingChange",1),xt([Kt("disabled")],Ki.prototype,"handleDisabledChange",1),xt([Kt("selected")],Ki.prototype,"handleSelectedChange",1),xt([Kt("expanded",{waitUntilFirstUpdate:1})],Ki.prototype,"handleExpandedChange",1),xt([Kt("expanded",{waitUntilFirstUpdate:1})],Ki.prototype,"handleExpandAnimation",1),xt([Kt("lazy",{waitUntilFirstUpdate:1})],Ki.prototype,"handleLazyChange",1);var Gi=Ki;Oi("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}}),Oi("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}}),Gi.define("sl-tree-item"),Ut({tagName:"sl-tree-item",elementClass:Gi,react:t,events:{onSlExpand:"sl-expand",onSlAfterExpand:"sl-after-expand",onSlCollapse:"sl-collapse",onSlAfterCollapse:"sl-after-collapse",onSlLazyChange:"sl-lazy-change",onSlLazyLoad:"sl-lazy-load"},displayName:"SlTreeItem"});var Qi=a`
  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--sl-color-neutral-200);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: var(--sl-spacing-large);

    display: block;

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`;function Zi(t,e,s){return(t=>Object.is(t,-0)?0:t)(t<e?e:t>s?s:t)}function Ji(t,e=0){function s(t){const e=t.getChildrenItems({includeDisabled:0});if(e.length){const s=e.every(t=>t.selected),i=e.every(t=>!t.selected&&!t.indeterminate);t.selected=s,t.indeterminate=!s&&!i}}!function t(i){for(const s of i.getChildrenItems())s.selected=e?i.selected||s.selected:!s.disabled&&i.selected,t(s);e&&s(i)}(t),function t(e){const i=e.parentElement;Gi.isTreeItem(i)&&(s(i),t(i))}(t)}var tr=class extends Ot{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new ze(this),this.initTreeItem=t=>{t.selectable="multiple"===this.selection,["expand","collapse"].filter(t=>!!this.querySelector(`[slot="${t}-icon"]`)).forEach(e=>{const s=t.querySelector(`[slot="${e}-icon"]`),i=this.getExpandButtonIcon(e);i&&(null===s?t.append(i):s.hasAttribute("data-default")&&s.replaceWith(i))})},this.handleTreeChanged=t=>{for(const e of t){const t=[...e.addedNodes].filter(Gi.isTreeItem),s=[...e.removedNodes].filter(Gi.isTreeItem);t.forEach(this.initTreeItem),this.lastFocusedItem&&s.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=t=>{const e=t.relatedTarget;e&&this.contains(e)||(this.tabIndex=0)},this.handleFocusIn=t=>{const e=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),Gi.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:1,subtree:1})}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.mutationObserver)||t.disconnect()}getExpandButtonIcon(t){const e=("expand"===t?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:1})[0];if(e){const s=e.cloneNode(1);return[s,...s.querySelectorAll("[id]")].forEach(t=>t.removeAttribute("id")),s.setAttribute("data-default",""),s.slot=`${t}-icon`,s}return null}selectItem(t){const e=[...this.selectedItems];if("multiple"===this.selection)t.selected=!t.selected,t.lazy&&(t.expanded=1),Ji(t);else if("single"===this.selection||t.isLeaf){const e=this.getAllTreeItems();for(const s of e)s.selected=s===t}else"leaf"===this.selection&&(t.expanded=!t.expanded);const s=this.selectedItems;(e.length!==s.length||s.some(t=>!e.includes(t)))&&Promise.all(s.map(t=>t.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:s}})})}getAllTreeItems(){return[...this.querySelectorAll("sl-tree-item")]}focusItem(t){null==t||t.focus()}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key))return;if(t.composedPath().some(t=>{var e;return["input","textarea"].includes(null==(e=null==t?void 0:t.tagName)?void 0:e.toLowerCase())}))return;const e=this.getFocusableItems(),s="ltr"===this.localize.dir(),i="rtl"===this.localize.dir();if(e.length>0){t.preventDefault();const r=e.findIndex(t=>t.matches(":focus")),o=e[r],a=t=>{const s=e[Zi(t,0,e.length-1)];this.focusItem(s)},n=t=>{o.expanded=t};"ArrowDown"===t.key?a(r+1):"ArrowUp"===t.key?a(r-1):s&&"ArrowRight"===t.key||i&&"ArrowLeft"===t.key?!o||o.disabled||o.expanded||o.isLeaf&&!o.lazy?a(r+1):n(1):s&&"ArrowLeft"===t.key||i&&"ArrowRight"===t.key?!o||o.disabled||o.isLeaf||!o.expanded?a(r-1):n(0):"Home"===t.key?a(0):"End"===t.key?a(e.length-1):"Enter"!==t.key&&" "!==t.key||o.disabled||this.selectItem(o)}}handleClick(t){const e=t.target,s=e.closest("sl-tree-item"),i=t.composedPath().some(t=>{var e;return null==(e=null==t?void 0:t.classList)?void 0:e.contains("tree-item__expand-button")});s&&!s.disabled&&e===this.clickTarget&&(i?s.expanded=!s.expanded:this.selectItem(s))}handleMouseDown(t){this.clickTarget=t.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){const t="multiple"===this.selection,e=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(const s of e)s.selectable=t;t&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(t=>Ji(t,1)))}get selectedItems(){return this.getAllTreeItems().filter(t=>t.selected)}getFocusableItems(){const t=this.getAllTreeItems(),e=new Set;return t.filter(t=>{var s;if(t.disabled)return 0;const i=null==(s=t.parentElement)?void 0:s.closest("[role=treeitem]");return i&&(!i.expanded||i.loading||e.has(i))&&e.add(t),!e.has(t)})}render(){return j`
      <div
        part="base"
        class="tree"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        <span hidden aria-hidden="true"><slot name="expand-icon"></slot></span>
        <span hidden aria-hidden="true"><slot name="collapse-icon"></slot></span>
      </div>
    `}};tr.styles=[ct,Qi],xt([Bt("slot:not([name])")],tr.prototype,"defaultSlot",2),xt([Bt("slot[name=expand-icon]")],tr.prototype,"expandedIconSlot",2),xt([Bt("slot[name=collapse-icon]")],tr.prototype,"collapsedIconSlot",2),xt([Ct()],tr.prototype,"selection",2),xt([Kt("selection")],tr.prototype,"handleSelectionChange",1),tr.define("sl-tree"),Ut({tagName:"sl-tree",elementClass:tr,react:t,events:{onSlSelectionChange:"sl-selection-change"},displayName:"SlTree"});var er=a`
  :host {
    --symbol-color: var(--sl-color-neutral-300);
    --symbol-color-active: var(--sl-color-amber-500);
    --symbol-size: 1.2rem;
    --symbol-spacing: var(--sl-spacing-3x-small);

    display: inline-flex;
  }

  .rating {
    position: relative;
    display: inline-flex;
    border-radius: var(--sl-border-radius-medium);
    vertical-align: middle;
  }

  .rating:focus {
    outline: none;
  }

  .rating:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .rating__symbols {
    display: inline-flex;
    position: relative;
    font-size: var(--symbol-size);
    line-height: 0;
    color: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
  }

  .rating__symbols > * {
    padding: var(--symbol-spacing);
  }

  .rating__symbol--active,
  .rating__partial--filled {
    color: var(--symbol-color-active);
  }

  .rating__partial-symbol-container {
    position: relative;
  }

  .rating__partial--filled {
    position: absolute;
    top: var(--symbol-spacing);
    left: var(--symbol-spacing);
  }

  .rating__symbol {
    transition: var(--sl-transition-fast) scale;
    pointer-events: none;
  }

  .rating__symbol--hover {
    scale: 1.2;
  }

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }

  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    scale: none;
  }

  .rating--disabled {
    opacity: 0.5;
  }

  .rating--disabled .rating__symbols {
    cursor: not-allowed;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    .rating__symbol--active {
      color: SelectedItem;
    }
  }
`;const sr="important",ir=" !"+sr,rr=ie(class extends re{constructor(t){if(super(t),1!==t.type||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,s)=>{const i=t[s];return null==i?e:e+`${s=s.includes("-")?s:s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:s}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?s.removeProperty(t):s[t]=null);for(const t in e){const i=e[t];if(null!=i){this.ft.add(t);const e="string"==typeof i&&i.endsWith(ir);t.includes("-")||e?s.setProperty(t,e?i.slice(0,-11):i,e?sr:""):s[t]=i}}return H}});let or=class extends re{constructor(t){if(super(t),this.it=V,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===V||null==t)return this._t=void 0,this.it=t;if(t===H)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}};or.directiveName="unsafeHTML",or.resultType=1;const ar=ie(or);var nr=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.hoverValue=0,this.isHovering=0,this.label="",this.value=0,this.max=5,this.precision=1,this.readonly=0,this.disabled=0,this.getSymbol=()=>'<sl-icon name="star-fill" library="system"></sl-icon>'}getValueFromMousePosition(t){return this.getValueFromXCoordinate(t.clientX)}getValueFromTouchPosition(t){return this.getValueFromXCoordinate(t.touches[0].clientX)}getValueFromXCoordinate(t){const e="rtl"===this.localize.dir(),{left:s,right:i,width:r}=this.rating.getBoundingClientRect();return Zi(e?this.roundToPrecision((i-t)/r*this.max,this.precision):this.roundToPrecision((t-s)/r*this.max,this.precision),0,this.max)}handleClick(t){this.disabled||(this.setValue(this.getValueFromMousePosition(t)),this.emit("sl-change"))}setValue(t){this.disabled||this.readonly||(this.value=t===this.value?0:t,this.isHovering=0)}handleKeyDown(t){const e="ltr"===this.localize.dir(),s="rtl"===this.localize.dir(),i=this.value;if(!this.disabled&&!this.readonly){if("ArrowDown"===t.key||e&&"ArrowLeft"===t.key||s&&"ArrowRight"===t.key){const e=t.shiftKey?1:this.precision;this.value=Math.max(0,this.value-e),t.preventDefault()}if("ArrowUp"===t.key||e&&"ArrowRight"===t.key||s&&"ArrowLeft"===t.key){const e=t.shiftKey?1:this.precision;this.value=Math.min(this.max,this.value+e),t.preventDefault()}"Home"===t.key&&(this.value=0,t.preventDefault()),"End"===t.key&&(this.value=this.max,t.preventDefault()),this.value!==i&&this.emit("sl-change")}}handleMouseEnter(t){this.isHovering=1,this.hoverValue=this.getValueFromMousePosition(t)}handleMouseMove(t){this.hoverValue=this.getValueFromMousePosition(t)}handleMouseLeave(){this.isHovering=0}handleTouchStart(t){this.isHovering=1,this.hoverValue=this.getValueFromTouchPosition(t),t.preventDefault()}handleTouchMove(t){this.hoverValue=this.getValueFromTouchPosition(t)}handleTouchEnd(t){this.isHovering=0,this.setValue(this.hoverValue),this.emit("sl-change"),t.preventDefault()}roundToPrecision(t,e=.5){const s=1/e;return Math.ceil(t*s)/s}handleHoverValueChange(){this.emit("sl-hover",{detail:{phase:"move",value:this.hoverValue}})}handleIsHoveringChange(){this.emit("sl-hover",{detail:{phase:this.isHovering?"start":"end",value:this.hoverValue}})}focus(t){this.rating.focus(t)}blur(){this.rating.blur()}render(){const t="rtl"===this.localize.dir(),e=Array.from(Array(this.max).keys());let s=0;return s=this.disabled||this.readonly?this.value:this.isHovering?this.hoverValue:this.value,j`
      <div
        part="base"
        class=${oe({rating:1,"rating--readonly":this.readonly,"rating--disabled":this.disabled,"rating--rtl":t})}
        role="slider"
        aria-label=${this.label}
        aria-disabled=${this.disabled?"true":"false"}
        aria-readonly=${this.readonly?"true":"false"}
        aria-valuenow=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled||this.readonly?"-1":"0"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @touchstart=${this.handleTouchStart}
        @mouseleave=${this.handleMouseLeave}
        @touchend=${this.handleTouchEnd}
        @mousemove=${this.handleMouseMove}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols">
          ${e.map(e=>s>e&&s<e+1?j`
                <span
                  class=${oe({rating__symbol:1,"rating__partial-symbol-container":1,"rating__symbol--hover":this.isHovering&&Math.ceil(s)===e+1})}
                  role="presentation"
                >
                  <div
                    style=${rr({clipPath:t?`inset(0 ${100*(s-e)}% 0 0)`:`inset(0 0 0 ${100*(s-e)}%)`})}
                  >
                    ${ar(this.getSymbol(e+1))}
                  </div>
                  <div
                    class="rating__partial--filled"
                    style=${rr({clipPath:t?`inset(0 0 0 ${100-100*(s-e)}%)`:`inset(0 ${100-100*(s-e)}% 0 0)`})}
                  >
                    ${ar(this.getSymbol(e+1))}
                  </div>
                </span>
              `:j`
              <span
                class=${oe({rating__symbol:1,"rating__symbol--hover":this.isHovering&&Math.ceil(s)===e+1,"rating__symbol--active":s>=e+1})}
                role="presentation"
              >
                ${ar(this.getSymbol(e+1))}
              </span>
            `)}
        </span>
      </div>
    `}};nr.styles=[ct,er],nr.dependencies={"sl-icon":se},xt([Bt(".rating")],nr.prototype,"rating",2),xt([Mt()],nr.prototype,"hoverValue",2),xt([Mt()],nr.prototype,"isHovering",2),xt([Ct()],nr.prototype,"label",2),xt([Ct({type:Number})],nr.prototype,"value",2),xt([Ct({type:Number})],nr.prototype,"max",2),xt([Ct({type:Number})],nr.prototype,"precision",2),xt([Ct({type:Boolean,reflect:1})],nr.prototype,"readonly",2),xt([Ct({type:Boolean,reflect:1})],nr.prototype,"disabled",2),xt([Ct()],nr.prototype,"getSymbol",2),xt([At({passive:1})],nr.prototype,"handleTouchMove",1),xt([Kt("hoverValue")],nr.prototype,"handleHoverValueChange",1),xt([Kt("isHovering")],nr.prototype,"handleIsHoveringChange",1),nr.define("sl-rating"),Ut({tagName:"sl-rating",elementClass:nr,react:t,events:{onSlChange:"sl-change",onSlHover:"sl-hover"},displayName:"SlRating"});var lr=[{max:276e4,value:6e4,unit:"minute"},{max:72e6,value:36e5,unit:"hour"},{max:5184e5,value:864e5,unit:"day"},{max:24192e5,value:6048e5,unit:"week"},{max:28512e6,value:2592e6,unit:"month"},{max:1/0,value:31536e6,unit:"year"}],cr=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.isoTime="",this.relativeTime="",this.date=new Date,this.format="long",this.numeric="auto",this.sync=0}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.updateTimeout)}render(){const t=new Date,e=new Date(this.date);if(isNaN(e.getMilliseconds()))return this.relativeTime="",this.isoTime="","";const s=e.getTime()-t.getTime(),{unit:i,value:r}=lr.find(t=>Math.abs(s)<t.max);if(this.isoTime=e.toISOString(),this.relativeTime=this.localize.relativeTime(Math.round(s/r),i,{numeric:this.numeric,style:this.format}),clearTimeout(this.updateTimeout),this.sync){let t;t=function(t){const e={second:1e3,minute:6e4,hour:36e5,day:864e5}[t];return e-Date.now()%e}("minute"===i?"second":"hour"===i?"minute":"day"===i?"hour":"day"),this.updateTimeout=window.setTimeout(()=>this.requestUpdate(),t)}return j` <time datetime=${this.isoTime}>${this.relativeTime}</time> `}};xt([Mt()],cr.prototype,"isoTime",2),xt([Mt()],cr.prototype,"relativeTime",2),xt([Ct()],cr.prototype,"date",2),xt([Ct()],cr.prototype,"format",2),xt([Ct()],cr.prototype,"numeric",2),xt([Ct({type:Boolean})],cr.prototype,"sync",2),cr.define("sl-relative-time"),Ut({tagName:"sl-relative-time",elementClass:cr,react:t,events:{},displayName:"SlRelativeTime"}),Be.define("sl-resize-observer"),Ut({tagName:"sl-resize-observer",elementClass:Be,react:t,events:{onSlResize:"sl-resize"},displayName:"SlResizeObserver"});var hr=a`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-small);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`,dr=class extends Ot{constructor(){super(...arguments),this.formControlController=new Ze(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ss(this,"help-text","label"),this.localize=new ze(this),this.typeToSelectString="",this.hasFocus=0,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=0,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=0,this.maxOptionsVisible=3,this.disabled=0,this.clearable=0,this.open=0,this.hoist=0,this.filled=0,this.pill=0,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=0,this.getTag=t=>j`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${e=>this.handleTagRemove(e,t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,s=null!==e.closest(".select__clear"),i=null!==e.closest("sl-icon-button");if(!s&&!i){if("Escape"===t.key&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:1})),"Enter"===t.key||" "===t.key&&""===this.typeToSelectString)return t.preventDefault(),t.stopImmediatePropagation(),this.open?void(this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=1,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:1})))):void this.show();if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const e=this.getAllOptions(),s=e.indexOf(this.currentOption);let i=Math.max(0,s);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;"ArrowDown"===t.key?(i=s+1,i>e.length-1&&(i=0)):"ArrowUp"===t.key?(i=s-1,i<0&&(i=e.length-1)):"Home"===t.key?i=0:"End"===t.key&&(i=e.length-1),this.setCurrentOption(e[i])}if(t.key&&1===t.key.length||"Backspace"===t.key){const e=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if("Backspace"===t.key)return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),"Backspace"===t.key?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const t of e)if(t.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(t);break}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}get value(){return this._value}set value(t){t=this.multiple?Array.isArray(t)?t:t.split(" "):Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=1,this._value=t)}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange()}),this.open=0}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:1}))})}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),null==(t=this.closeWatcher)||t.destroy()}handleFocus(){this.hasFocus=1,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=0,this.emit("sl-blur")}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(t){const e=t.composedPath().some(t=>t instanceof Element&&"sl-icon-button"===t.tagName.toLowerCase());this.disabled||e||(t.preventDefault(),this.displayInput.focus({preventScroll:1}),this.open=!this.open)}handleComboboxKeyDown(t){"Tab"!==t.key&&(t.stopPropagation(),this.handleDocumentKeyDown(t))}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=1,""!==this.value&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:1}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const e=t.target.closest("sl-option"),s=this.value;e&&!e.disabled&&(this.valueHasChanged=1,this.multiple?this.toggleOptionSelection(e):this.setSelectedOptions(e),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:1})),this.value!==s&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:1})))}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions(),e=this.valueHasChanged?this.value:this.defaultValue,s=Array.isArray(e)?e:[e],i=[];t.forEach(t=>i.push(t.value)),this.setSelectedOptions(t.filter(t=>s.includes(t.value)))}handleTagRemove(t,e){t.stopPropagation(),this.valueHasChanged=1,this.disabled||(this.toggleOptionSelection(e,0),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(t=>{t.current=0,t.tabIndex=-1}),t&&(this.currentOption=t,t.current=1,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),s=Array.isArray(t)?t:[t];e.forEach(t=>t.selected=0),s.length&&s.forEach(t=>t.selected=1),this.selectionChanged()}toggleOptionSelection(t,e){t.selected=1==e||0==e?e:!t.selected,this.selectionChanged()}selectionChanged(){var t,e,s;const i=this.getAllOptions();this.selectedOptions=i.filter(t=>t.selected);const r=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(t=>t.value),this.placeholder&&0===this.value.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const i=this.selectedOptions[0];this.value=null!=(t=null==i?void 0:i.value)?t:"",this.displayLabel=null!=(s=null==(e=null==i?void 0:i.getTextLabel)?void 0:e.call(i))?s:""}this.valueHasChanged=r,this.updateComplete.then(()=>{this.formControlController.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const s=this.getTag(t,e);return j`<div @sl-remove=${e=>this.handleTagRemove(e,t)}>
          ${"string"==typeof s?ar(s):s}
        </div>`}return e===this.maxOptionsVisible?j`<sl-tag size=${this.size}>+${this.selectedOptions.length-e}</sl-tag>`:j``})}handleInvalid(t){this.formControlController.setValidity(0),this.formControlController.emitInvalidEvent(t)}handleDisabledChange(){this.disabled&&(this.open=0,this.handleOpenChange())}attributeChangedCallback(t,e,s){if(super.attributeChangedCallback(t,e,s),"value"===t){const t=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=t}}handleValueChange(){if(!this.valueHasChanged){const t=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=t}const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(t=>e.includes(t.value)))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await Li(this),this.listbox.hidden=0,this.popup.active=1,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)});const{keyframes:t,options:e}=Ei(this,"select.show",{dir:this.localize.dir()});await Di(this.popup.popup,t,e),this.currentOption&&Fe(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Li(this);const{keyframes:t,options:e}=Ei(this,"select.hide",{dir:this.localize.dir()});await Di(this.popup.popup,t,e),this.listbox.hidden=1,this.popup.active=0,this.emit("sl-after-hide")}}async show(){if(!this.open&&!this.disabled)return this.open=1,Fi(this,"sl-after-show");this.open=0}async hide(){if(this.open&&!this.disabled)return this.open=0,Fi(this,"sl-after-hide");this.open=0}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),s=this.label?1:!!t,i=this.helpText?1:!!e,r=this.clearable&&!this.disabled&&this.value.length>0,o=this.placeholder&&this.value&&this.value.length<=0;return j`
      <div
        part="form-control"
        class=${oe({"form-control":1,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":s,"form-control--has-help-text":i})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${s?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${oe({select:1,"select--standard":1,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":o,"select--top":"top"===this.placement,"select--bottom":"bottom"===this.placement,"select--small":"small"===this.size,"select--medium":"medium"===this.size,"select--large":"large"===this.size})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?j`<div part="tags" class="select__tags">${this.tags}</div>`:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${r?j`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};dr.styles=[ct,Xe,hr],dr.dependencies={"sl-icon":se,"sl-popup":Ai,"sl-tag":He},xt([Bt(".select")],dr.prototype,"popup",2),xt([Bt(".select__combobox")],dr.prototype,"combobox",2),xt([Bt(".select__display-input")],dr.prototype,"displayInput",2),xt([Bt(".select__value-input")],dr.prototype,"valueInput",2),xt([Bt(".select__listbox")],dr.prototype,"listbox",2),xt([Mt()],dr.prototype,"hasFocus",2),xt([Mt()],dr.prototype,"displayLabel",2),xt([Mt()],dr.prototype,"currentOption",2),xt([Mt()],dr.prototype,"selectedOptions",2),xt([Mt()],dr.prototype,"valueHasChanged",2),xt([Ct()],dr.prototype,"name",2),xt([Mt()],dr.prototype,"value",1),xt([Ct({attribute:"value"})],dr.prototype,"defaultValue",2),xt([Ct({reflect:1})],dr.prototype,"size",2),xt([Ct()],dr.prototype,"placeholder",2),xt([Ct({type:Boolean,reflect:1})],dr.prototype,"multiple",2),xt([Ct({attribute:"max-options-visible",type:Number})],dr.prototype,"maxOptionsVisible",2),xt([Ct({type:Boolean,reflect:1})],dr.prototype,"disabled",2),xt([Ct({type:Boolean})],dr.prototype,"clearable",2),xt([Ct({type:Boolean,reflect:1})],dr.prototype,"open",2),xt([Ct({type:Boolean})],dr.prototype,"hoist",2),xt([Ct({type:Boolean,reflect:1})],dr.prototype,"filled",2),xt([Ct({type:Boolean,reflect:1})],dr.prototype,"pill",2),xt([Ct()],dr.prototype,"label",2),xt([Ct({reflect:1})],dr.prototype,"placement",2),xt([Ct({attribute:"help-text"})],dr.prototype,"helpText",2),xt([Ct({reflect:1})],dr.prototype,"form",2),xt([Ct({type:Boolean,reflect:1})],dr.prototype,"required",2),xt([Ct()],dr.prototype,"getTag",2),xt([Kt("disabled",{waitUntilFirstUpdate:1})],dr.prototype,"handleDisabledChange",1),xt([Kt(["defaultValue","value"],{waitUntilFirstUpdate:1})],dr.prototype,"handleValueChange",1),xt([Kt("open",{waitUntilFirstUpdate:1})],dr.prototype,"handleOpenChange",1),Oi("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),Oi("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}}),dr.define("sl-select");var ur=Ut({tagName:"sl-select",elementClass:dr,react:t,events:{onSlChange:"sl-change",onSlClear:"sl-clear",onSlInput:"sl-input",onSlFocus:"sl-focus",onSlBlur:"sl-blur",onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide",onSlInvalid:"sl-invalid"},displayName:"SlSelect"});Yi.define("sl-spinner");var pr=Ut({tagName:"sl-spinner",elementClass:Yi,react:t,events:{},displayName:"SlSpinner"}),fr=a`
  :host {
    --border-radius: var(--sl-border-radius-pill);
    --color: var(--sl-color-neutral-200);
    --sheen-color: var(--sl-color-neutral-300);

    display: block;
    position: relative;
  }

  .skeleton {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .skeleton__indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--border-radius);
  }

  .skeleton--sheen .skeleton__indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  .skeleton--pulse .skeleton__indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`,br=class extends Ot{constructor(){super(...arguments),this.effect="none"}render(){return j`
      <div
        part="base"
        class=${oe({skeleton:1,"skeleton--pulse":"pulse"===this.effect,"skeleton--sheen":"sheen"===this.effect})}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `}};br.styles=[ct,fr],xt([Ct()],br.prototype,"effect",2),br.define("sl-skeleton"),Ut({tagName:"sl-skeleton",elementClass:br,react:t,events:{},displayName:"SlSkeleton"});var mr=a`
  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  @media (forced-colors: active) {
    .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb,
    .switch--checked .switch__control .switch__thumb {
      background-color: ButtonText;
    }
  }
`,gr=class extends Ot{constructor(){super(...arguments),this.formControlController=new Ze(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new ss(this,"help-text"),this.hasFocus=0,this.title="",this.name="",this.size="medium",this.disabled=0,this.checked=0,this.defaultChecked=0,this.form="",this.required=0,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=0,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(0),this.formControlController.emitInvalidEvent(t)}handleClick(){this.checked=!this.checked,this.emit("sl-change")}handleFocus(){this.hasFocus=1,this.emit("sl-focus")}handleKeyDown(t){"ArrowLeft"===t.key&&(t.preventDefault(),this.checked=0,this.emit("sl-change"),this.emit("sl-input")),"ArrowRight"===t.key&&(t.preventDefault(),this.checked=1,this.emit("sl-change"),this.emit("sl-input"))}handleCheckedChange(){this.input.checked=this.checked,this.formControlController.updateValidity()}handleDisabledChange(){this.formControlController.setValidity(1)}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("help-text"),e=this.helpText?1:!!t;return j`
      <div
        class=${oe({"form-control":1,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${oe({switch:1,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus,"switch--small":"small"===this.size,"switch--medium":"medium"===this.size,"switch--large":"large"===this.size})}
        >
          <input
            class="switch__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${de(this.value)}
            .checked=${is(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            role="switch"
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
          />

          <span part="control" class="switch__control">
            <span part="thumb" class="switch__thumb"></span>
          </span>

          <div part="label" class="switch__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};gr.styles=[ct,Xe,mr],xt([Bt('input[type="checkbox"]')],gr.prototype,"input",2),xt([Mt()],gr.prototype,"hasFocus",2),xt([Ct()],gr.prototype,"title",2),xt([Ct()],gr.prototype,"name",2),xt([Ct()],gr.prototype,"value",2),xt([Ct({reflect:1})],gr.prototype,"size",2),xt([Ct({type:Boolean,reflect:1})],gr.prototype,"disabled",2),xt([Ct({type:Boolean,reflect:1})],gr.prototype,"checked",2),xt([qe("checked")],gr.prototype,"defaultChecked",2),xt([Ct({reflect:1})],gr.prototype,"form",2),xt([Ct({type:Boolean,reflect:1})],gr.prototype,"required",2),xt([Ct({attribute:"help-text"})],gr.prototype,"helpText",2),xt([Kt("checked",{waitUntilFirstUpdate:1})],gr.prototype,"handleCheckedChange",1),xt([Kt("disabled",{waitUntilFirstUpdate:1})],gr.prototype,"handleDisabledChange",1),gr.define("sl-switch"),Ut({tagName:"sl-switch",elementClass:gr,react:t,events:{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlInput:"sl-input",onSlFocus:"sl-focus",onSlInvalid:"sl-invalid"},displayName:"SlSwitch"});var vr=a`
  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
    --min: 0%;
    --max: 100%;

    display: grid;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .divider {
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-900);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }

  @media (forced-colors: active) {
    .divider {
      outline: solid 1px transparent;
    }
  }
`;function yr(t,e){function s(s){const i=t.getBoundingClientRect(),r=t.ownerDocument.defaultView,o=i.left+r.scrollX,a=i.top+r.scrollY,n=s.pageX-o,l=s.pageY-a;(null==e?void 0:e.onMove)&&e.onMove(n,l)}document.addEventListener("pointermove",s,{passive:1}),document.addEventListener("pointerup",function t(){document.removeEventListener("pointermove",s),document.removeEventListener("pointerup",t),(null==e?void 0:e.onStop)&&e.onStop()}),(null==e?void 0:e.initialEvent)instanceof PointerEvent&&s(e.initialEvent)}var wr=()=>null,_r=class extends Ot{constructor(){super(...arguments),this.isCollapsed=0,this.localize=new ze(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=0,this.disabled=0,this.snapValue="",this.snapFunction=wr,this.snapThreshold=12}toSnapFunction(t){const e=t.split(" ");return({pos:s,size:i,snapThreshold:r,isRtl:o,vertical:a})=>{let n=s,l=Number.POSITIVE_INFINITY;return e.forEach(e=>{let c;if(e.startsWith("repeat(")){const e=t.substring(7,t.length-1),r=e.endsWith("%"),n=Number.parseFloat(e),l=r?i*(n/100):n;c=Math.round((o&&!a?i-s:s)/l)*l}else c=e.endsWith("%")?i*(Number.parseFloat(e)/100):Number.parseFloat(e);o&&!a&&(c=i-c);const h=Math.abs(s-c);h<=r&&h<l&&(n=c,l=h)}),n}}set snap(t){this.snapValue=null!=t?t:"",this.snapFunction=t?"string"==typeof t?this.toSnapFunction(t):t:wr}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.resizeObserver)||t.unobserve(this)}detectSize(){const{width:t,height:e}=this.getBoundingClientRect();this.size=this.vertical?e:t}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){const e="rtl"===this.localize.dir();this.disabled||(t.cancelable&&t.preventDefault(),yr(this,{onMove:(t,s)=>{var i;let r=this.vertical?s:t;"end"===this.primary&&(r=this.size-r),r=null!=(i=this.snapFunction({pos:r,size:this.size,snapThreshold:this.snapThreshold,isRtl:e,vertical:this.vertical}))?i:r,this.position=Zi(this.pixelsToPercentage(r),0,100)},initialEvent:t}))}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let e=this.position;const s=(t.shiftKey?10:1)*("end"===this.primary?-1:1);if(t.preventDefault(),("ArrowLeft"===t.key&&!this.vertical||"ArrowUp"===t.key&&this.vertical)&&(e-=s),("ArrowRight"===t.key&&!this.vertical||"ArrowDown"===t.key&&this.vertical)&&(e+=s),"Home"===t.key&&(e="end"===this.primary?100:0),"End"===t.key&&(e="end"===this.primary?0:100),"Enter"===t.key)if(this.isCollapsed)e=this.positionBeforeCollapsing,this.isCollapsed=0;else{const t=this.position;e=0,requestAnimationFrame(()=>{this.isCollapsed=1,this.positionBeforeCollapsing=t})}this.position=Zi(e,0,100)}}handleResize(t){const{width:e,height:s}=t[0].contentRect;this.size=this.vertical?s:e,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=0,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition")}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}render(){const t=this.vertical?"gridTemplateRows":"gridTemplateColumns",e=this.vertical?"gridTemplateColumns":"gridTemplateRows",s="rtl"===this.localize.dir(),i=`\n      clamp(\n        0%,\n        clamp(\n          var(--min),\n          ${this.position}% - var(--divider-width) / 2,\n          var(--max)\n        ),\n        calc(100% - var(--divider-width))\n      )\n    `,r="auto";return"end"===this.primary?s&&!this.vertical?this.style[t]=`${i} var(--divider-width) ${r}`:this.style[t]=`${r} var(--divider-width) ${i}`:s&&!this.vertical?this.style[t]=`${r} var(--divider-width) ${i}`:this.style[t]=`${i} var(--divider-width) ${r}`,this.style[e]="",j`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${de(this.disabled?void 0:"0")}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};_r.styles=[ct,vr],xt([Bt(".divider")],_r.prototype,"divider",2),xt([Ct({type:Number,reflect:1})],_r.prototype,"position",2),xt([Ct({attribute:"position-in-pixels",type:Number})],_r.prototype,"positionInPixels",2),xt([Ct({type:Boolean,reflect:1})],_r.prototype,"vertical",2),xt([Ct({type:Boolean,reflect:1})],_r.prototype,"disabled",2),xt([Ct()],_r.prototype,"primary",2),xt([Ct({reflect:1})],_r.prototype,"snap",1),xt([Ct({type:Number,attribute:"snap-threshold"})],_r.prototype,"snapThreshold",2),xt([Kt("position")],_r.prototype,"handlePositionChange",1),xt([Kt("positionInPixels")],_r.prototype,"handlePositionInPixelsChange",1),xt([Kt("vertical")],_r.prototype,"handleVerticalChange",1),_r.define("sl-split-panel"),Ut({tagName:"sl-split-panel",elementClass:_r,react:t,events:{onSlReposition:"sl-reposition"},displayName:"SlSplitPanel"});var xr=a`
  :host {
    display: contents;
  }
`,kr=class extends Ot{constructor(){super(...arguments),this.attrOldValue=0,this.charData=0,this.charDataOldValue=0,this.childList=0,this.disabled=0,this.handleMutation=t=>{this.emit("sl-mutation",{detail:{mutationList:t}})}}connectedCallback(){super.connectedCallback(),this.mutationObserver=new MutationObserver(this.handleMutation),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}startObserver(){const t="string"==typeof this.attr&&this.attr.length>0,e=t&&"*"!==this.attr?this.attr.split(" "):void 0;try{this.mutationObserver.observe(this,{subtree:1,childList:this.childList,attributes:t,attributeFilter:e,attributeOldValue:this.attrOldValue,characterData:this.charData,characterDataOldValue:this.charDataOldValue})}catch(t){}}stopObserver(){this.mutationObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}handleChange(){this.stopObserver(),this.startObserver()}render(){return j` <slot></slot> `}};kr.styles=[ct,xr],xt([Ct({reflect:1})],kr.prototype,"attr",2),xt([Ct({attribute:"attr-old-value",type:Boolean,reflect:1})],kr.prototype,"attrOldValue",2),xt([Ct({attribute:"char-data",type:Boolean,reflect:1})],kr.prototype,"charData",2),xt([Ct({attribute:"char-data-old-value",type:Boolean,reflect:1})],kr.prototype,"charDataOldValue",2),xt([Ct({attribute:"child-list",type:Boolean,reflect:1})],kr.prototype,"childList",2),xt([Ct({type:Boolean,reflect:1})],kr.prototype,"disabled",2),xt([Kt("disabled")],kr.prototype,"handleDisabledChange",1),xt([Kt("attr",{waitUntilFirstUpdate:1}),Kt("attr-old-value",{waitUntilFirstUpdate:1}),Kt("char-data",{waitUntilFirstUpdate:1}),Kt("char-data-old-value",{waitUntilFirstUpdate:1}),Kt("childList",{waitUntilFirstUpdate:1})],kr.prototype,"handleChange",1),kr.define("sl-mutation-observer"),Ut({tagName:"sl-mutation-observer",elementClass:kr,react:t,events:{onSlMutation:"sl-mutation"},displayName:"SlMutationObserver"});var $r=a`
  :host {
    --height: 1rem;
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);
    --label-color: var(--sl-color-neutral-0);

    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset var(--sl-shadow-small);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: var(--sl-font-sans);
    font-size: 12px;
    font-weight: var(--sl-font-weight-normal);
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition:
      400ms width,
      400ms background-color;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  .progress-bar--indeterminate.progress-bar--rtl .progress-bar__indicator {
    animation-name: indeterminate-rtl;
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--sl-color-neutral-0);
    }

    .progress-bar__indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes indeterminate {
    0% {
      left: -50%;
      width: 50%;
    }
    75%,
    100% {
      left: 100%;
      width: 50%;
    }
  }

  @keyframes indeterminate-rtl {
    0% {
      right: -50%;
      width: 50%;
    }
    75%,
    100% {
      right: 100%;
      width: 50%;
    }
  }
`,zr=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.value=0,this.indeterminate=0,this.label=""}render(){return j`
      <div
        part="base"
        class=${oe({"progress-bar":1,"progress-bar--indeterminate":this.indeterminate,"progress-bar--rtl":"rtl"===this.localize.dir()})}
        role="progressbar"
        title=${de(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?0:this.value}
      >
        <div part="indicator" class="progress-bar__indicator" style=${rr({width:`${this.value}%`})}>
          ${this.indeterminate?"":j` <slot part="label" class="progress-bar__label"></slot> `}
        </div>
      </div>
    `}};zr.styles=[ct,$r],xt([Ct({type:Number,reflect:1})],zr.prototype,"value",2),xt([Ct({type:Boolean,reflect:1})],zr.prototype,"indeterminate",2),xt([Ct()],zr.prototype,"label",2),zr.define("sl-progress-bar"),Ut({tagName:"sl-progress-bar",elementClass:zr,react:t,events:{},displayName:"SlProgressBar"});var Sr=a`
  :host {
    --size: 128px;
    --track-width: 4px;
    --track-color: var(--sl-color-neutral-200);
    --indicator-width: var(--track-width);
    --indicator-color: var(--sl-color-primary-600);
    --indicator-transition-duration: 0.35s;

    display: inline-flex;
  }

  .progress-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .progress-ring__image {
    width: var(--size);
    height: var(--size);
    rotate: -90deg;
    transform-origin: 50% 50%;
  }

  .progress-ring__track,
  .progress-ring__indicator {
    --radius: calc(var(--size) / 2 - max(var(--track-width), var(--indicator-width)) * 0.5);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    fill: none;
    r: var(--radius);
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
  }

  .progress-ring__track {
    stroke: var(--track-color);
    stroke-width: var(--track-width);
  }

  .progress-ring__indicator {
    stroke: var(--indicator-color);
    stroke-width: var(--indicator-width);
    stroke-linecap: round;
    transition-property: stroke-dashoffset;
    transition-duration: var(--indicator-transition-duration);
    stroke-dasharray: var(--circumference) var(--circumference);
    stroke-dashoffset: calc(var(--circumference) - var(--percentage) * var(--circumference));
  }

  .progress-ring__label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
  }
`,Cr=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.value=0,this.label=""}updated(t){if(super.updated(t),t.has("value")){const t=parseFloat(getComputedStyle(this.indicator).getPropertyValue("r")),e=2*Math.PI*t,s=e-this.value/100*e;this.indicatorOffset=`${s}px`}}render(){return j`
      <div
        part="base"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-describedby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style="--percentage: ${this.value/100}"
      >
        <svg class="progress-ring__image">
          <circle class="progress-ring__track"></circle>
          <circle class="progress-ring__indicator" style="stroke-dashoffset: ${this.indicatorOffset}"></circle>
        </svg>

        <slot id="label" part="label" class="progress-ring__label"></slot>
      </div>
    `}};Cr.styles=[ct,Sr],xt([Bt(".progress-ring__indicator")],Cr.prototype,"indicator",2),xt([Mt()],Cr.prototype,"indicatorOffset",2),xt([Ct({type:Number,reflect:1})],Cr.prototype,"value",2),xt([Ct()],Cr.prototype,"label",2),Cr.define("sl-progress-ring"),Ut({tagName:"sl-progress-ring",elementClass:Cr,react:t,events:{},displayName:"SlProgressRing"});var Mr=a`
  :host {
    display: inline-block;
  }
`;let Ar=null;class Nr{}Nr.render=(t,e)=>{Ar(t,e)},self.QrCreator=Nr,(t=>{function e(e,s,i,r){var o={},a=t(i,s);a.u(e),a.J(),r=r||0;var n=a.h(),l=a.h()+2*r;return o.text=e,o.level=s,o.version=i,o.O=l,o.a=(t,e)=>(e-=r,0>(t-=r)||t>=n||0>e||e>=n?0:a.a(t,e)),o}function s(t,e,s,i,r,o,a,n,l,c){function h(e,s,i,r,a,n,l){e?(t.lineTo(s+n,i+l),t.arcTo(s,i,r,a,o)):t.lineTo(s,i)}a?t.moveTo(e+o,s):t.moveTo(e,s),h(n,i,s,i,r,-o,0),h(l,i,r,e,r,0,-o),h(c,e,r,e,s,o,0),h(a,e,s,i,s,0,o)}function i(t,e,s,i,r,o,a,n,l,c){function h(e,s,i,r){t.moveTo(e+i,s),t.lineTo(e,s),t.lineTo(e,s+r),t.arcTo(e,s,e+i,s,o)}a&&h(e,s,o,o),n&&h(i,s,-o,o),l&&h(i,r,-o,-o),c&&h(e,r,o,-o)}function r(t,r){t:{var o=r.text,a=r.v,n=r.N,l=r.K,c=r.P;for(n=Math.max(1,n||1),l=Math.min(40,l||40);n<=l;n+=1)try{var h=e(o,a,n,c);break t}catch(t){}h=void 0}if(!h)return null;for(o=t.getContext("2d"),r.background&&(o.fillStyle=r.background,o.fillRect(r.left,r.top,r.size,r.size)),a=h.O,l=r.size/a,o.beginPath(),c=0;c<a;c+=1)for(n=0;n<a;n+=1){var d=o,u=r.left+n*l,p=r.top+c*l,f=c,b=n,m=h.a,g=u+l,v=p+l,y=f-1,w=f+1,_=b-1,x=b+1,k=Math.floor(Math.min(.5,Math.max(0,r.R))*l),$=m(f,b),z=m(y,_),S=m(y,b);y=m(y,x);var C=m(f,x);x=m(w,x),b=m(w,b),w=m(w,_),f=m(f,_),u=Math.round(u),p=Math.round(p),g=Math.round(g),v=Math.round(v),$?s(d,u,p,g,v,k,!S&&!f,!S&&!C,!b&&!C,!b&&!f):i(d,u,p,g,v,k,S&&f&&z,S&&C&&y,b&&C&&x,b&&f&&w)}return((t,e)=>{var s=e.fill;if("string"==typeof s)t.fillStyle=s;else{var i=s.type,r=s.colorStops;if(s=s.position.map(t=>Math.round(t*e.size)),"linear-gradient"===i)var o=t.createLinearGradient.apply(t,s);else{if("radial-gradient"!==i)throw Error("Unsupported fill");o=t.createRadialGradient.apply(t,s)}r.forEach(([t,e])=>{o.addColorStop(t,e)}),t.fillStyle=o}})(o,r),o.fill(),t}var o={minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,fill:"#000",background:null,text:"no text",radius:.5,quiet:0};Ar=(t,e)=>{var s={};Object.assign(s,o,t),s.N=s.minVersion,s.K=s.maxVersion,s.v=s.ecLevel,s.left=s.left,s.top=s.top,s.size=s.size,s.fill=s.fill,s.background=s.background,s.text=s.text,s.R=s.radius,s.P=s.quiet,e instanceof HTMLCanvasElement?(e.width===s.size&&e.height===s.size||(e.width=s.size,e.height=s.size),e.getContext("2d").clearRect(0,0,e.width,e.height),r(e,s)):((t=document.createElement("canvas")).width=s.size,t.height=s.size,s=r(t,s),e.appendChild(s))}})((()=>{function t(r,a){function n(t,e){for(var s=-1;7>=s;s+=1)if(!(-1>=t+s||d<=t+s))for(var i=-1;7>=i;i+=1)-1>=e+i||d<=e+i||(h[t+s][e+i]=0<=s&&6>=s&&(0==i||6==i)||0<=i&&6>=i&&(0==s||6==s)||2<=s&&4>=s&&2<=i&&4>=i?1:0)}function l(t,s){for(var a=d=4*r+17,l=Array(a),f=0;f<a;f+=1){l[f]=Array(a);for(var b=0;b<a;b+=1)l[f][b]=null}for(h=l,n(0,0),n(d-7,0),n(0,d-7),a=i.G(r),l=0;l<a.length;l+=1)for(f=0;f<a.length;f+=1){b=a[l];var m=a[f];if(null==h[b][m])for(var g=-2;2>=g;g+=1)for(var v=-2;2>=v;v+=1)h[b+g][m+v]=-2==g||2==g||-2==v||2==v||0==g&&0==v}for(a=8;a<d-8;a+=1)null==h[a][6]&&(h[a][6]=0==a%2);for(a=8;a<d-8;a+=1)null==h[6][a]&&(h[6][a]=0==a%2);for(a=i.w(c<<3|s),l=0;15>l;l+=1)f=!t&&1==(a>>l&1),h[6>l?l:8>l?l+1:d-15+l][8]=f,h[8][8>l?d-l-1:9>l?15-l:14-l]=f;if(h[d-8][8]=!t,7<=r){for(a=i.A(r),l=0;18>l;l+=1)f=!t&&1==(a>>l&1),h[Math.floor(l/3)][l%3+d-8-3]=f;for(l=0;18>l;l+=1)f=!t&&1==(a>>l&1),h[l%3+d-8-3][Math.floor(l/3)]=f}if(null==u){for(t=o.I(r,c),a=(()=>{var t=[],e=0,s={B(){return t},c(e){return 1==(t[Math.floor(e/8)]>>>7-e%8&1)},put(t,e){for(var i=0;i<e;i+=1)s.m(1==(t>>>e-i-1&1))},f(){return e},m(s){var i=Math.floor(e/8);t.length<=i&&t.push(0),s&&(t[i]|=128>>>e%8),e+=1}};return s})(),l=0;l<p.length;l+=1)f=p[l],a.put(4,4),a.put(f.b(),i.f(4,r)),f.write(a);for(l=f=0;l<t.length;l+=1)f+=t[l].j;if(a.f()>8*f)throw Error("code length overflow. ("+a.f()+">"+8*f+")");for(a.f()+4<=8*f&&a.put(0,4);0!=a.f()%8;)a.m(0);for(;!(a.f()>=8*f||(a.put(236,8),a.f()>=8*f));)a.put(17,8);var y=0;for(f=l=0,b=Array(t.length),m=Array(t.length),g=0;g<t.length;g+=1){var w=t[g].j,_=t[g].o-w;for(l=Math.max(l,w),f=Math.max(f,_),b[g]=Array(w),v=0;v<b[g].length;v+=1)b[g][v]=255&a.B()[v+y];for(y+=w,v=i.C(_),w=e(b[g],v.b()-1).l(v),m[g]=Array(v.b()-1),v=0;v<m[g].length;v+=1)_=v+w.b()-m[g].length,m[g][v]=0<=_?w.c(_):0}for(v=a=0;v<t.length;v+=1)a+=t[v].o;for(a=Array(a),v=y=0;v<l;v+=1)for(g=0;g<t.length;g+=1)v<b[g].length&&(a[y]=b[g][v],y+=1);for(v=0;v<f;v+=1)for(g=0;g<t.length;g+=1)v<m[g].length&&(a[y]=m[g][v],y+=1);u=a}for(t=u,a=-1,l=d-1,f=7,b=0,s=i.F(s),m=d-1;0<m;m-=2)for(6==m&&--m;;){for(g=0;2>g;g+=1)null==h[l][m-g]&&(v=0,b<t.length&&(v=1==(t[b]>>>f&1)),s(l,m-g)&&(v=!v),h[l][m-g]=v,-1==--f&&(b+=1,f=7));if(0>(l+=a)||d<=l){l-=a,a=-a;break}}}var c=s[a],h=null,d=0,u=null,p=[],f={u(e){e=(e=>{var s=t.s(e);return{S(){return 4},b(){return s.length},write(t){for(var e=0;e<s.length;e+=1)t.put(s[e],8)}}})(e),p.push(e),u=null},a(t,e){if(0>t||d<=t||0>e||d<=e)throw Error(t+","+e);return h[t][e]},h:()=>d,J(){for(var t=0,e=0,s=0;8>s;s+=1){l(1,s);var r=i.D(f);(0==s||t>r)&&(t=r,e=s)}l(0,e)}};return f}function e(t,s){if(void 0===t.length)throw Error(t.length+"/"+s);var i=(()=>{for(var e=0;e<t.length&&0==t[e];)e+=1;for(var i=Array(t.length-e+s),r=0;r<t.length-e;r+=1)i[r]=t[r+e];return i})(),o={c:t=>i[t],b:()=>i.length,multiply(t){for(var s=Array(o.b()+t.b()-1),i=0;i<o.b();i+=1)for(var a=0;a<t.b();a+=1)s[i+a]^=r.i(r.g(o.c(i))+r.g(t.c(a)));return e(s,0)},l(t){if(0>o.b()-t.b())return o;for(var s=r.g(o.c(0))-r.g(t.c(0)),i=Array(o.b()),a=0;a<o.b();a+=1)i[a]=o.c(a);for(a=0;a<t.b();a+=1)i[a]^=r.i(r.g(t.c(a))+s);return e(i,0).l(t)}};return o}t.s=t=>{for(var e=[],s=0;s<t.length;s++){var i=t.charCodeAt(s);128>i?e.push(i):2048>i?e.push(192|i>>6,128|63&i):55296>i||57344<=i?e.push(224|i>>12,128|i>>6&63,128|63&i):(s++,i=65536+((1023&i)<<10|1023&t.charCodeAt(s)),e.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|63&i))}return e};var s={L:1,M:0,Q:3,H:2},i=(()=>{function t(t){for(var e=0;0!=t;)e+=1,t>>>=1;return e}var s=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],i={w(e){for(var s=e<<10;0<=t(s)-t(1335);)s^=1335<<t(s)-t(1335);return 21522^(e<<10|s)},A(e){for(var s=e<<12;0<=t(s)-t(7973);)s^=7973<<t(s)-t(7973);return e<<12|s},G:t=>s[t-1],F(t){switch(t){case 0:return(t,e)=>0==(t+e)%2;case 1:return t=>0==t%2;case 2:return(t,e)=>0==e%3;case 3:return(t,e)=>0==(t+e)%3;case 4:return(t,e)=>0==(Math.floor(t/2)+Math.floor(e/3))%2;case 5:return(t,e)=>0==t*e%2+t*e%3;case 6:return(t,e)=>0==(t*e%2+t*e%3)%2;case 7:return(t,e)=>0==(t*e%3+(t+e)%2)%2;default:throw Error("bad maskPattern:"+t)}},C(t){for(var s=e([1],0),i=0;i<t;i+=1)s=s.multiply(e([1,r.i(i)],0));return s},f(t,e){if(4!=t||1>e||40<e)throw Error("mode: "+t+"; type: "+e);return 10>e?8:16},D(t){for(var e=t.h(),s=0,i=0;i<e;i+=1)for(var r=0;r<e;r+=1){for(var o=0,a=t.a(i,r),n=-1;1>=n;n+=1)if(!(0>i+n||e<=i+n))for(var l=-1;1>=l;l+=1)0>r+l||e<=r+l||(0!=n||0!=l)&&a==t.a(i+n,r+l)&&(o+=1);5<o&&(s+=3+o-5)}for(i=0;i<e-1;i+=1)for(r=0;r<e-1;r+=1)o=0,t.a(i,r)&&(o+=1),t.a(i+1,r)&&(o+=1),t.a(i,r+1)&&(o+=1),t.a(i+1,r+1)&&(o+=1),(0==o||4==o)&&(s+=3);for(i=0;i<e;i+=1)for(r=0;r<e-6;r+=1)t.a(i,r)&&!t.a(i,r+1)&&t.a(i,r+2)&&t.a(i,r+3)&&t.a(i,r+4)&&!t.a(i,r+5)&&t.a(i,r+6)&&(s+=40);for(r=0;r<e;r+=1)for(i=0;i<e-6;i+=1)t.a(i,r)&&!t.a(i+1,r)&&t.a(i+2,r)&&t.a(i+3,r)&&t.a(i+4,r)&&!t.a(i+5,r)&&t.a(i+6,r)&&(s+=40);for(r=o=0;r<e;r+=1)for(i=0;i<e;i+=1)t.a(i,r)&&(o+=1);return s+Math.abs(100*o/e/e-50)/5*10}};return i})(),r=(()=>{for(var t=Array(256),e=Array(256),s=0;8>s;s+=1)t[s]=1<<s;for(s=8;256>s;s+=1)t[s]=t[s-4]^t[s-5]^t[s-6]^t[s-8];for(s=0;255>s;s+=1)e[t[s]]=s;return{g(t){if(1>t)throw Error("glog("+t+")");return e[t]},i(e){for(;0>e;)e+=255;for(;256<=e;)e-=255;return t[e]}}})(),o=(()=>{function t(t,i){switch(i){case s.L:return e[4*(t-1)];case s.M:return e[4*(t-1)+1];case s.Q:return e[4*(t-1)+2];case s.H:return e[4*(t-1)+3]}}var e=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],i={I(e,s){var i=t(e,s);if(void 0===i)throw Error("bad rs block @ typeNumber:"+e+"/errorCorrectLevel:"+s);e=i.length/3,s=[];for(var r=0;r<e;r+=1)for(var o=i[3*r],a=i[3*r+1],n=i[3*r+2],l=0;l<o;l+=1){var c=n,h={};h.o=a,h.j=c,s.push(h)}return s}};return i})();return t})());const Br=QrCreator;var Ir=class extends Ot{constructor(){super(...arguments),this.value="",this.label="",this.size=128,this.fill="black",this.background="white",this.radius=0,this.errorCorrection="H"}firstUpdated(){this.generate()}generate(){this.hasUpdated&&Br.render({text:this.value,radius:this.radius,ecLevel:this.errorCorrection,fill:this.fill,background:this.background,size:2*this.size},this.canvas)}render(){var t;return j`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${(null==(t=this.label)?void 0:t.length)>0?this.label:this.value}
        style=${rr({width:`${this.size}px`,height:`${this.size}px`})}
      ></canvas>
    `}};Ir.styles=[ct,Mr],xt([Bt("canvas")],Ir.prototype,"canvas",2),xt([Ct()],Ir.prototype,"value",2),xt([Ct()],Ir.prototype,"label",2),xt([Ct({type:Number})],Ir.prototype,"size",2),xt([Ct()],Ir.prototype,"fill",2),xt([Ct()],Ir.prototype,"background",2),xt([Ct({type:Number})],Ir.prototype,"radius",2),xt([Ct({attribute:"error-correction"})],Ir.prototype,"errorCorrection",2),xt([Kt(["background","errorCorrection","fill","radius","size","value"])],Ir.prototype,"generate",1),Ir.define("sl-qr-code"),Ut({tagName:"sl-qr-code",elementClass:Ir,react:t,events:{},displayName:"SlQrCode"});var Or=a`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,Er=a`
  ${Or}

  .button__prefix,
  .button__suffix,
  .button__label {
    display: inline-flex;
    position: relative;
    align-items: center;
  }

  /* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
    We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
  .hidden-input {
    all: unset;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    outline: dotted 1px red;
    opacity: 0;
    z-index: -1;
  }
`,Fr=class extends Ot{constructor(){super(...arguments),this.hasSlotController=new ss(this,"[default]","prefix","suffix"),this.hasFocus=0,this.checked=0,this.disabled=0,this.size="medium",this.pill=0}connectedCallback(){super.connectedCallback(),this.setAttribute("role","presentation")}handleBlur(){this.hasFocus=0,this.emit("sl-blur")}handleClick(t){if(this.disabled)return t.preventDefault(),void t.stopPropagation();this.checked=1}handleFocus(){this.hasFocus=1,this.emit("sl-focus")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){return he`
      <div part="base" role="presentation">
        <button
          part="${"button"+(this.checked?" button--checked":"")}"
          role="radio"
          aria-checked="${this.checked}"
          class=${oe({button:1,"button--default":1,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--checked":this.checked,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--outline":1,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
          aria-disabled=${this.disabled}
          type="button"
          value=${de(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          <slot name="prefix" part="prefix" class="button__prefix"></slot>
          <slot part="label" class="button__label"></slot>
          <slot name="suffix" part="suffix" class="button__suffix"></slot>
        </button>
      </div>
    `}};Fr.styles=[ct,Er],xt([Bt(".button")],Fr.prototype,"input",2),xt([Bt(".hidden-input")],Fr.prototype,"hiddenInput",2),xt([Mt()],Fr.prototype,"hasFocus",2),xt([Ct({type:Boolean,reflect:1})],Fr.prototype,"checked",2),xt([Ct()],Fr.prototype,"value",2),xt([Ct({type:Boolean,reflect:1})],Fr.prototype,"disabled",2),xt([Ct({reflect:1})],Fr.prototype,"size",2),xt([Ct({type:Boolean,reflect:1})],Fr.prototype,"pill",2),xt([Kt("disabled",{waitUntilFirstUpdate:1})],Fr.prototype,"handleDisabledChange",1),Fr.define("sl-radio-button"),Ut({tagName:"sl-radio-button",elementClass:Fr,react:t,events:{onSlBlur:"sl-blur",onSlFocus:"sl-focus"},displayName:"SlRadioButton"});var Dr=a`
  :host {
    display: block;
  }

  :host(:focus-visible) {
    outline: 0px;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .radio--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .radio__checked-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`,Tr=class extends Ot{constructor(){super(),this.checked=0,this.hasFocus=0,this.size="medium",this.disabled=0,this.handleBlur=()=>{this.hasFocus=0,this.emit("sl-blur")},this.handleClick=()=>{this.disabled||(this.checked=1)},this.handleFocus=()=>{this.hasFocus=1,this.emit("sl-focus")},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}render(){return j`
      <span
        part="base"
        class=${oe({radio:1,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":"small"===this.size,"radio--medium":"medium"===this.size,"radio--large":"large"===this.size})}
      >
        <span part="${"control"+(this.checked?" control--checked":"")}" class="radio__control">
          ${this.checked?j` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};Tr.styles=[ct,Dr],Tr.dependencies={"sl-icon":se},xt([Mt()],Tr.prototype,"checked",2),xt([Mt()],Tr.prototype,"hasFocus",2),xt([Ct()],Tr.prototype,"value",2),xt([Ct({reflect:1})],Tr.prototype,"size",2),xt([Ct({type:Boolean,reflect:1})],Tr.prototype,"disabled",2),xt([Kt("checked")],Tr.prototype,"handleCheckedChange",1),xt([Kt("disabled",{waitUntilFirstUpdate:1})],Tr.prototype,"handleDisabledChange",1),Tr.define("sl-radio"),Ut({tagName:"sl-radio",elementClass:Tr,react:t,events:{onSlBlur:"sl-blur",onSlFocus:"sl-focus"},displayName:"SlRadio"});var Ur=a`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`,Lr=class extends Ot{constructor(){super(...arguments),this.formControlController=new Ze(this),this.hasSlotController=new ss(this,"help-text","label"),this.localize=new ze(this),this.hasFocus=0,this.hasTooltip=0,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=0,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.resizeObserver)||t.unobserve(this.input)}handleChange(){this.emit("sl-change")}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange()}handleBlur(){this.hasFocus=0,this.hasTooltip=0,this.emit("sl-blur")}handleFocus(){this.hasFocus=1,this.hasTooltip=1,this.emit("sl-focus")}handleThumbDragStart(){this.hasTooltip=1}handleThumbDragEnd(){this.hasTooltip=0}syncProgress(t){this.input.style.setProperty("--percent",100*t+"%")}syncTooltip(t){if(null!==this.output){const e=this.input.offsetWidth,s=this.output.offsetWidth,i=getComputedStyle(this.input).getPropertyValue("--thumb-size"),r=e*t;if("rtl"===this.localize.dir()){const o=`${e-r}px + ${t} * ${i}`;this.output.style.translate=`calc((${o} - ${s/2}px - ${i} / 2))`}else{const e=`${r}px - ${t} * ${i}`;this.output.style.translate=`calc(${e} - ${s/2}px + ${i} / 2)`}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}syncRange(){const t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),"none"!==this.tooltip&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t))}handleInvalid(t){this.formControlController.setValidity(0),this.formControlController.emitInvalidEvent(t)}focus(t){this.input.focus(t)}blur(){this.input.blur()}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),s=this.label?1:!!t,i=this.helpText?1:!!e;return j`
      <div
        part="form-control"
        class=${oe({"form-control":1,"form-control--medium":1,"form-control--has-label":s,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${oe({range:1,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":"rtl"===this.localize.dir(),"range--tooltip-visible":this.hasTooltip,"range--tooltip-top":"top"===this.tooltip,"range--tooltip-bottom":"bottom"===this.tooltip})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${de(this.name)}
              ?disabled=${this.disabled}
              min=${de(this.min)}
              max=${de(this.max)}
              step=${de(this.step)}
              .value=${is(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${"none"===this.tooltip||this.disabled?"":j`
                  <output part="tooltip" class="range__tooltip">
                    ${"function"==typeof this.tooltipFormatter?this.tooltipFormatter(this.value):this.value}
                  </output>
                `}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Lr.styles=[ct,Xe,Ur],xt([Bt(".range__control")],Lr.prototype,"input",2),xt([Bt(".range__tooltip")],Lr.prototype,"output",2),xt([Mt()],Lr.prototype,"hasFocus",2),xt([Mt()],Lr.prototype,"hasTooltip",2),xt([Ct()],Lr.prototype,"title",2),xt([Ct()],Lr.prototype,"name",2),xt([Ct({type:Number})],Lr.prototype,"value",2),xt([Ct()],Lr.prototype,"label",2),xt([Ct({attribute:"help-text"})],Lr.prototype,"helpText",2),xt([Ct({type:Boolean,reflect:1})],Lr.prototype,"disabled",2),xt([Ct({type:Number})],Lr.prototype,"min",2),xt([Ct({type:Number})],Lr.prototype,"max",2),xt([Ct({type:Number})],Lr.prototype,"step",2),xt([Ct()],Lr.prototype,"tooltip",2),xt([Ct({attribute:0})],Lr.prototype,"tooltipFormatter",2),xt([Ct({reflect:1})],Lr.prototype,"form",2),xt([qe()],Lr.prototype,"defaultValue",2),xt([At({passive:1})],Lr.prototype,"handleThumbDragStart",1),xt([Kt("value",{waitUntilFirstUpdate:1})],Lr.prototype,"handleValueChange",1),xt([Kt("disabled",{waitUntilFirstUpdate:1})],Lr.prototype,"handleDisabledChange",1),xt([Kt("hasTooltip",{waitUntilFirstUpdate:1})],Lr.prototype,"syncRange",1),Lr.define("sl-range"),Ut({tagName:"sl-range",elementClass:Lr,react:t,events:{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlFocus:"sl-focus",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlRange"});var Rr=a`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`,Pr=a`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,jr=class extends Ot{constructor(){super(...arguments),this.disableRole=0,this.label=""}handleFocus(t){const e=Hr(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--focus",1)}handleBlur(t){const e=Hr(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--focus",0)}handleMouseOver(t){const e=Hr(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--hover",1)}handleMouseOut(t){const e=Hr(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--hover",0)}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:1})];t.forEach(e=>{const s=t.indexOf(e),i=Hr(e);i&&(i.toggleAttribute("data-sl-button-group__button",1),i.toggleAttribute("data-sl-button-group__button--first",0===s),i.toggleAttribute("data-sl-button-group__button--inner",s>0&&s<t.length-1),i.toggleAttribute("data-sl-button-group__button--last",s===t.length-1),i.toggleAttribute("data-sl-button-group__button--radio","sl-radio-button"===i.tagName.toLowerCase()))})}render(){return j`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};function Hr(t){var e;const s="sl-button, sl-radio-button";return null!=(e=t.closest(s))?e:t.querySelector(s)}jr.styles=[ct,Pr],xt([Bt("slot")],jr.prototype,"defaultSlot",2),xt([Mt()],jr.prototype,"disableRole",2),xt([Ct()],jr.prototype,"label",2);var Vr=class extends Ot{constructor(){super(...arguments),this.formControlController=new Ze(this),this.hasSlotController=new ss(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=0,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=0}get validity(){const t=this.required&&!this.value;return""!==this.customValidityMessage?es:t?ts:Je}get validationMessage(){const t=this.required&&!this.value;return""!==this.customValidityMessage?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value}firstUpdated(){this.formControlController.updateValidity()}getAllRadios(){return[...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){const e=t.target.closest("sl-radio, sl-radio-button"),s=this.getAllRadios(),i=this.value;e&&!e.disabled&&(this.value=e.value,s.forEach(t=>t.checked=t===e),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input")))}handleKeyDown(t){var e;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;const s=this.getAllRadios().filter(t=>!t.disabled),i=null!=(e=s.find(t=>t.checked))?e:s[0],r=" "===t.key?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,o=this.value;let a=s.indexOf(i)+r;a<0&&(a=s.length-1),a>s.length-1&&(a=0),this.getAllRadios().forEach(t=>{t.checked=0,this.hasButtonGroup||t.setAttribute("tabindex","-1")}),this.value=s[a].value,s[a].checked=1,this.hasButtonGroup?s[a].shadowRoot.querySelector("button").focus():(s[a].setAttribute("tabindex","0"),s[a].focus()),this.value!==o&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault()}handleLabelClick(){this.focus()}handleInvalid(t){this.formControlController.setValidity(0),this.formControlController.emitInvalidEvent(t)}async syncRadioElements(){var t,e;const s=this.getAllRadios();if(await Promise.all(s.map(async t=>{await t.updateComplete,t.checked=t.value===this.value,t.size=this.size})),this.hasButtonGroup=s.some(t=>"sl-radio-button"===t.tagName.toLowerCase()),s.length>0&&!s.some(t=>t.checked))if(this.hasButtonGroup){const e=null==(t=s[0].shadowRoot)?void 0:t.querySelector("button");e&&e.setAttribute("tabindex","0")}else s[0].setAttribute("tabindex","0");if(this.hasButtonGroup){const t=null==(e=this.shadowRoot)?void 0:e.querySelector("sl-button-group");t&&(t.disableRole=1)}}syncRadios(){customElements.get("sl-radio")&&customElements.get("sl-radio-button")?this.syncRadioElements():(customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios()))}updateCheckedRadio(){this.getAllRadios().forEach(t=>t.checked=t.value===this.value),this.formControlController.setValidity(this.validity.valid)}handleSizeChange(){this.syncRadios()}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio()}checkValidity(){const t=this.required&&!this.value,e=""!==this.customValidityMessage;return t||e?(this.formControlController.emitInvalidEvent(),0):1}getForm(){return this.formControlController.getForm()}reportValidity(){const t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=1,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=0,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=1,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){const e=this.getAllRadios(),s=e.find(t=>t.checked),i=e.find(t=>!t.disabled),r=s||i;r&&r.focus(t)}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),s=this.label?1:!!t,i=this.helpText?1:!!e,r=j`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return j`
      <fieldset
        part="form-control"
        class=${oe({"form-control":1,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--radio-group":1,"form-control--has-label":s,"form-control--has-help-text":i})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${s?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?j`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${r}
                </sl-button-group>
              `:r}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};Vr.styles=[ct,Xe,Rr],Vr.dependencies={"sl-button-group":jr},xt([Bt("slot:not([name])")],Vr.prototype,"defaultSlot",2),xt([Bt(".radio-group__validation-input")],Vr.prototype,"validationInput",2),xt([Mt()],Vr.prototype,"hasButtonGroup",2),xt([Mt()],Vr.prototype,"errorMessage",2),xt([Mt()],Vr.prototype,"defaultValue",2),xt([Ct()],Vr.prototype,"label",2),xt([Ct({attribute:"help-text"})],Vr.prototype,"helpText",2),xt([Ct()],Vr.prototype,"name",2),xt([Ct({reflect:1})],Vr.prototype,"value",2),xt([Ct({reflect:1})],Vr.prototype,"size",2),xt([Ct({reflect:1})],Vr.prototype,"form",2),xt([Ct({type:Boolean,reflect:1})],Vr.prototype,"required",2),xt([Kt("size",{waitUntilFirstUpdate:1})],Vr.prototype,"handleSizeChange",1),xt([Kt("value")],Vr.prototype,"handleValueChange",1),Vr.define("sl-radio-group"),Ut({tagName:"sl-radio-group",elementClass:Vr,react:t,events:{onSlChange:"sl-change",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlRadioGroup"});var qr=a`
  :host {
    --divider-width: 2px;
    --handle-size: 2.5rem;

    display: inline-block;
    position: relative;
  }

  .image-comparer {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  .image-comparer__before,
  .image-comparer__after {
    display: block;
    pointer-events: none;
  }

  .image-comparer__before::slotted(img),
  .image-comparer__after::slotted(img),
  .image-comparer__before::slotted(svg),
  .image-comparer__after::slotted(svg) {
    display: block;
    max-width: 100% !important;
    height: auto;
  }

  .image-comparer__after {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .image-comparer__divider {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: var(--divider-width);
    height: 100%;
    background-color: var(--sl-color-neutral-0);
    translate: calc(var(--divider-width) / -2);
    cursor: ew-resize;
  }

  .image-comparer__handle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - (var(--handle-size) / 2));
    width: var(--handle-size);
    height: var(--handle-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: var(--sl-border-radius-circle);
    font-size: calc(var(--handle-size) * 0.5);
    color: var(--sl-color-neutral-700);
    cursor: inherit;
    z-index: 10;
  }

  .image-comparer__handle:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`,Xr=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.position=50}handleDrag(t){const{width:e}=this.base.getBoundingClientRect(),s="rtl"===this.localize.dir();t.preventDefault(),yr(this.base,{onMove:t=>{this.position=parseFloat(Zi(t/e*100,0,100).toFixed(2)),s&&(this.position=100-this.position)},initialEvent:t})}handleKeyDown(t){const e="ltr"===this.localize.dir(),s="rtl"===this.localize.dir();if(["ArrowLeft","ArrowRight","Home","End"].includes(t.key)){const i=t.shiftKey?10:1;let r=this.position;t.preventDefault(),(e&&"ArrowLeft"===t.key||s&&"ArrowRight"===t.key)&&(r-=i),(e&&"ArrowRight"===t.key||s&&"ArrowLeft"===t.key)&&(r+=i),"Home"===t.key&&(r=0),"End"===t.key&&(r=100),r=Zi(r,0,100),this.position=r}}handlePositionChange(){this.emit("sl-change")}render(){const t="rtl"===this.localize.dir();return j`
      <div
        part="base"
        id="image-comparer"
        class=${oe({"image-comparer":1,"image-comparer--rtl":t})}
        @keydown=${this.handleKeyDown}
      >
        <div class="image-comparer__image">
          <div part="before" class="image-comparer__before">
            <slot name="before"></slot>
          </div>

          <div
            part="after"
            class="image-comparer__after"
            style=${rr({clipPath:t?`inset(0 0 0 ${100-this.position}%)`:`inset(0 ${100-this.position}% 0 0)`})}
          >
            <slot name="after"></slot>
          </div>
        </div>

        <div
          part="divider"
          class="image-comparer__divider"
          style=${rr({left:t?100-this.position+"%":`${this.position}%`})}
          @mousedown=${this.handleDrag}
          @touchstart=${this.handleDrag}
        >
          <div
            part="handle"
            class="image-comparer__handle"
            role="scrollbar"
            aria-valuenow=${this.position}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-controls="image-comparer"
            tabindex="0"
          >
            <slot name="handle">
              <sl-icon library="system" name="grip-vertical"></sl-icon>
            </slot>
          </div>
        </div>
      </div>
    `}};Xr.styles=[ct,qr],Xr.scopedElement={"sl-icon":se},xt([Bt(".image-comparer")],Xr.prototype,"base",2),xt([Bt(".image-comparer__handle")],Xr.prototype,"handle",2),xt([Ct({type:Number,reflect:1})],Xr.prototype,"position",2),xt([Kt("position",{waitUntilFirstUpdate:1})],Xr.prototype,"handlePositionChange",1),Xr.define("sl-image-comparer"),Ut({tagName:"sl-image-comparer",elementClass:Xr,react:t,events:{onSlChange:"sl-change"},displayName:"SlImageComparer"});var Yr=a`
  :host {
    display: block;
  }
`,Wr=new Map,Kr=class extends Ot{constructor(){super(...arguments),this.mode="cors",this.allowScripts=0}executeScript(t){const e=document.createElement("script");[...t.attributes].forEach(t=>e.setAttribute(t.name,t.value)),e.textContent=t.textContent,t.parentNode.replaceChild(e,t)}async handleSrcChange(){try{const t=this.src,e=await((t,e="cors")=>{const s=Wr.get(t);if(void 0!==s)return Promise.resolve(s);const i=fetch(t,{mode:e}).then(async e=>{const s={ok:e.ok,status:e.status,html:await e.text()};return Wr.set(t,s),s});return Wr.set(t,i),i})(t,this.mode);if(t!==this.src)return;if(!e.ok)return void this.emit("sl-error",{detail:{status:e.status}});this.innerHTML=e.html,this.allowScripts&&[...this.querySelectorAll("script")].forEach(t=>this.executeScript(t)),this.emit("sl-load")}catch(t){this.emit("sl-error",{detail:{status:-1}})}}render(){return j`<slot></slot>`}};Kr.styles=[ct,Yr],xt([Ct()],Kr.prototype,"src",2),xt([Ct()],Kr.prototype,"mode",2),xt([Ct({attribute:"allow-scripts",type:Boolean})],Kr.prototype,"allowScripts",2),xt([Kt("src")],Kr.prototype,"handleSrcChange",1),Kr.define("sl-include"),Ut({tagName:"sl-include",elementClass:Kr,react:t,events:{onSlLoad:"sl-load",onSlError:"sl-error"},displayName:"SlInclude"});var Gr=a`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,Qr=class extends Ot{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(t){const e=["menuitem","menuitemcheckbox"],s=t.composedPath(),i=s.find(t=>{var s;return e.includes((null==(s=null==t?void 0:t.getAttribute)?void 0:s.call(t,"role"))||"")});if(!i)return;if(s.find(t=>{var e;return"menu"===(null==(e=null==t?void 0:t.getAttribute)?void 0:e.call(t,"role"))})!==this)return;const r=i;"checkbox"===r.type&&(r.checked=!r.checked),this.emit("sl-select",{detail:{item:r}})}handleKeyDown(t){if("Enter"===t.key||" "===t.key){const e=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),null==e||e.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){const e=this.getAllItems(),s=this.getCurrentItem();let i=s?e.indexOf(s):0;e.length>0&&(t.preventDefault(),t.stopPropagation(),"ArrowDown"===t.key?i++:"ArrowUp"===t.key?i--:"Home"===t.key?i=0:"End"===t.key&&(i=e.length-1),i<0&&(i=e.length-1),i>e.length-1&&(i=0),this.setCurrentItem(e[i]),e[i].focus())}}handleMouseDown(t){const e=t.target;this.isMenuItem(e)&&this.setCurrentItem(e)}handleSlotChange(){const t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0])}isMenuItem(t){var e;return"sl-menu-item"===t.tagName.toLowerCase()||["menuitem","menuitemcheckbox","menuitemradio"].includes(null!=(e=t.getAttribute("role"))?e:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:1})].filter(t=>t.inert||!this.isMenuItem(t)?0:1)}getCurrentItem(){return this.getAllItems().find(t=>"0"===t.getAttribute("tabindex"))}setCurrentItem(t){this.getAllItems().forEach(e=>{e.setAttribute("tabindex",e===t?"0":"-1")})}render(){return j`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Qr.styles=[ct,Gr],xt([Bt("slot")],Qr.prototype,"defaultSlot",2),Qr.define("sl-menu"),Ut({tagName:"sl-menu",elementClass:Qr,react:t,events:{onSlSelect:"sl-select"},displayName:"SlMenu"});var Zr=a`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,Jr=class extends Ot{constructor(){super(...arguments),this.formControlController=new Ze(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new ss(this,"help-text","label"),this.localize=new ze(this),this.hasFocus=0,this.title="",this.U=Object.assign(document.createElement("input"),{type:"number"}),this.V=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=0,this.pill=0,this.label="",this.helpText="",this.clearable=0,this.disabled=0,this.placeholder="",this.readonly=0,this.passwordToggle=0,this.passwordVisible=0,this.noSpinButtons=0,this.form="",this.required=0,this.spellcheck=1}get valueAsDate(){var t;return this.V.type=this.type,this.V.value=this.value,(null==(t=this.input)?void 0:t.valueAsDate)||this.V.valueAsDate}set valueAsDate(t){this.V.type=this.type,this.V.valueAsDate=t,this.value=this.V.value}get valueAsNumber(){var t;return this.U.value=this.value,(null==(t=this.input)?void 0:t.valueAsNumber)||this.U.valueAsNumber}set valueAsNumber(t){this.U.valueAsNumber=t,this.value=this.U.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=0,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(t){t.preventDefault(),""!==this.value&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=1,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(0),this.formControlController.emitInvalidEvent(t)}handleKeyDown(t){const e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;"Enter"!==t.key||e||setTimeout(()=>{t.defaultPrevented||t.isComposing||this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,s="none"){this.input.setSelectionRange(t,e,s)}setRangeText(t,e,s,i="preserve"){const r=null!=e?e:this.input.selectionStart,o=null!=s?s:this.input.selectionEnd;this.input.setRangeText(t,r,o,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),s=this.label?1:!!t,i=this.helpText?1:!!e,r=this.clearable&&!this.disabled&&!this.readonly&&("number"==typeof this.value||this.value.length>0);return j`
      <div
        part="form-control"
        class=${oe({"form-control":1,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":s,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${s?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${oe({input:1,"input--small":"small"===this.size,"input--medium":"medium"===this.size,"input--large":"large"===this.size,"input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${"password"===this.type&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${de(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${de(this.placeholder)}
              minlength=${de(this.minlength)}
              maxlength=${de(this.maxlength)}
              min=${de(this.min)}
              max=${de(this.max)}
              step=${de(this.step)}
              .value=${is(this.value)}
              autocapitalize=${de(this.autocapitalize)}
              autocomplete=${de(this.autocomplete)}
              autocorrect=${de(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${de(this.pattern)}
              enterkeyhint=${de(this.enterkeyhint)}
              inputmode=${de(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${r?j`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?j`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?j`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:j`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Jr.styles=[ct,Xe,Zr],Jr.dependencies={"sl-icon":se},xt([Bt(".input__control")],Jr.prototype,"input",2),xt([Mt()],Jr.prototype,"hasFocus",2),xt([Ct()],Jr.prototype,"title",2),xt([Ct({reflect:1})],Jr.prototype,"type",2),xt([Ct()],Jr.prototype,"name",2),xt([Ct()],Jr.prototype,"value",2),xt([qe()],Jr.prototype,"defaultValue",2),xt([Ct({reflect:1})],Jr.prototype,"size",2),xt([Ct({type:Boolean,reflect:1})],Jr.prototype,"filled",2),xt([Ct({type:Boolean,reflect:1})],Jr.prototype,"pill",2),xt([Ct()],Jr.prototype,"label",2),xt([Ct({attribute:"help-text"})],Jr.prototype,"helpText",2),xt([Ct({type:Boolean})],Jr.prototype,"clearable",2),xt([Ct({type:Boolean,reflect:1})],Jr.prototype,"disabled",2),xt([Ct()],Jr.prototype,"placeholder",2),xt([Ct({type:Boolean,reflect:1})],Jr.prototype,"readonly",2),xt([Ct({attribute:"password-toggle",type:Boolean})],Jr.prototype,"passwordToggle",2),xt([Ct({attribute:"password-visible",type:Boolean})],Jr.prototype,"passwordVisible",2),xt([Ct({attribute:"no-spin-buttons",type:Boolean})],Jr.prototype,"noSpinButtons",2),xt([Ct({reflect:1})],Jr.prototype,"form",2),xt([Ct({type:Boolean,reflect:1})],Jr.prototype,"required",2),xt([Ct()],Jr.prototype,"pattern",2),xt([Ct({type:Number})],Jr.prototype,"minlength",2),xt([Ct({type:Number})],Jr.prototype,"maxlength",2),xt([Ct()],Jr.prototype,"min",2),xt([Ct()],Jr.prototype,"max",2),xt([Ct()],Jr.prototype,"step",2),xt([Ct()],Jr.prototype,"autocapitalize",2),xt([Ct()],Jr.prototype,"autocorrect",2),xt([Ct()],Jr.prototype,"autocomplete",2),xt([Ct({type:Boolean})],Jr.prototype,"autofocus",2),xt([Ct()],Jr.prototype,"enterkeyhint",2),xt([Ct({type:Boolean,converter:{fromAttribute:t=>t&&"false"!==t?1:0,toAttribute:t=>t?"true":"false"}})],Jr.prototype,"spellcheck",2),xt([Ct()],Jr.prototype,"inputmode",2),xt([Kt("disabled",{waitUntilFirstUpdate:1})],Jr.prototype,"handleDisabledChange",1),xt([Kt("step",{waitUntilFirstUpdate:1})],Jr.prototype,"handleStepChange",1),xt([Kt("value",{waitUntilFirstUpdate:1})],Jr.prototype,"handleValueChange",1),Jr.define("sl-input"),Ut({tagName:"sl-input",elementClass:Jr,react:t,events:{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlClear:"sl-clear",onSlFocus:"sl-focus",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlInput"});var to=a`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;const eo=(t,e)=>{const s=t._$AN;if(void 0===s)return 0;for(const t of s)t._$AO?.(e,0),eo(t,e);return 1},so=t=>{let e,s;do{if(void 0===(e=t._$AM))break;s=e._$AN,s.delete(t),t=e}while(0===s?.size)},io=t=>{for(let e;e=t._$AM;t=e){let s=e._$AN;if(void 0===s)e._$AN=s=new Set;else if(s.has(t))break;s.add(t),ao(e)}};function ro(t){void 0!==this._$AN?(so(this),this._$AM=t,io(this)):this._$AM=t}function oo(t,e=0,s=0){const i=this._$AH,r=this._$AN;if(void 0!==r&&0!==r.size)if(e)if(Array.isArray(i))for(let t=s;t<i.length;t++)eo(i[t],0),so(i[t]);else null!=i&&(eo(i,0),so(i));else eo(this,t)}const ao=t=>{2==t.type&&(t._$AP??=oo,t._$AQ??=ro)};class no extends re{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,s){super._$AT(t,e,s),io(this),this.isConnected=t._$AU}_$AO(t,e=1){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(eo(this,t),so(this))}setValue(t){if(Gt(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}class lo{}const co=new WeakMap,ho=ie(class extends no{render(t){return V}update(t,[e]){const s=e!==this.G;return s&&void 0!==this.G&&this.rt(void 0),(s||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),V}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.G){const e=this.ht??globalThis;let s=co.get(e);void 0===s&&(s=new WeakMap,co.set(e,s)),void 0!==s.get(this.G)&&this.G.call(this.ht,void 0),s.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?co.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var uo=class{constructor(t,e){this.popupRef=new lo,this.enableSubmenuTimer=-1,this.isConnected=0,this.isPopupConnected=0,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=t=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${t.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${t.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=t=>{switch(t.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":t.target!==this.host&&(t.preventDefault(),t.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(t)}},this.handleClick=t=>{var e;t.target===this.host?(t.preventDefault(),t.stopPropagation()):t.target instanceof Element&&("sl-menu-item"===t.target.tagName||(null==(e=t.target.role)?void 0:e.startsWith("menuitem")))&&this.disableSubmenu()},this.handleFocusOut=t=>{t.relatedTarget&&t.relatedTarget instanceof Element&&this.host.contains(t.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=t=>{t.stopPropagation()},this.handlePopupReposition=()=>{const t=this.host.renderRoot.querySelector("slot[name='submenu']"),e=null==t?void 0:t.assignedElements({flatten:1}).filter(t=>"sl-menu"===t.localName)[0],s="rtl"===getComputedStyle(this.host).direction;if(!e)return;const{left:i,top:r,width:o,height:a}=e.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${s?i+o:i}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${r}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${s?i+o:i}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${r+a}px`)},(this.host=t).addController(this),this.hasSlotController=e}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=1),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=1)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=0),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=0)}handleSubmenuEntry(t){const e=this.host.renderRoot.querySelector("slot[name='submenu']");if(!e)return;let s=null;for(const t of e.assignedElements())if(s=t.querySelectorAll("sl-menu-item, [role^='menuitem']"),0!==s.length)break;if(s&&0!==s.length){s[0].setAttribute("tabindex","0");for(let t=1;t!==s.length;++t)s[t].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?s[0]instanceof HTMLElement&&s[0].focus():(this.enableSubmenu(0),this.host.updateComplete.then(()=>{s[0]instanceof HTMLElement&&s[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate())}enableSubmenu(t=1){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(1)},this.submenuOpenDelay)):this.setSubmenuState(1)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(0)}updateSkidding(){var t;if(!(null==(t=this.host.parentElement)?void 0:t.computedStyleMap))return;const e=this.host.parentElement.computedStyleMap(),s=["padding-top","border-top-width","margin-top"].reduce((t,s)=>{var i;const r=null!=(i=e.get(s))?i:new CSSUnitValue(0,"px");return t-(r instanceof CSSUnitValue?r:new CSSUnitValue(0,"px")).to("px").value},0);this.skidding=s}isExpanded(){return this.popupRef.value?this.popupRef.value.active:0}renderSubmenu(){const t="rtl"===getComputedStyle(this.host).direction;return this.isConnected?j`
      <sl-popup
        ${ho(this.popupRef)}
        placement=${t?"left-start":"right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:j` <slot name="submenu" hidden></slot> `}},po=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.type="normal",this.checked=0,this.value="",this.loading=0,this.disabled=0,this.hasSlotController=new ss(this,"submenu"),this.submenuController=new uo(this,this.hasSlotController),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())},this.handleMouseOver=t=>{this.focus(),t.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const t=this.getTextLabel();void 0!==this.cachedTextLabel?t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:1,composed:0,cancelable:0})):this.cachedTextLabel=t}handleCheckedChange(){this.checked&&"checkbox"!==this.type?this.checked=0:"checkbox"===this.type?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){"checkbox"===this.type?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return(t=>{if(!t)return"";const e=t.assignedNodes({flatten:1});let s="";return[...e].forEach(t=>{t.nodeType===Node.TEXT_NODE&&(s+=t.textContent)}),s})(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const t="rtl"===this.localize.dir(),e=this.submenuController.isExpanded();return j`
      <div
        id="anchor"
        part="base"
        class=${oe({"menu-item":1,"menu-item--rtl":t,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":e})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${e?1:0}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${t?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?j` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};po.styles=[ct,to],po.dependencies={"sl-icon":se,"sl-popup":Ai,"sl-spinner":Yi},xt([Bt("slot:not([name])")],po.prototype,"defaultSlot",2),xt([Bt(".menu-item")],po.prototype,"menuItem",2),xt([Ct()],po.prototype,"type",2),xt([Ct({type:Boolean,reflect:1})],po.prototype,"checked",2),xt([Ct()],po.prototype,"value",2),xt([Ct({type:Boolean,reflect:1})],po.prototype,"loading",2),xt([Ct({type:Boolean,reflect:1})],po.prototype,"disabled",2),xt([Kt("checked")],po.prototype,"handleCheckedChange",1),xt([Kt("disabled")],po.prototype,"handleDisabledChange",1),xt([Kt("type")],po.prototype,"handleTypeChange",1),po.define("sl-menu-item"),Ut({tagName:"sl-menu-item",elementClass:po,react:t,events:{},displayName:"SlMenuItem"});var fo=a`
  :host {
    display: block;
  }

  .menu-label {
    display: inline-block;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    user-select: none;
    -webkit-user-select: none;
  }
`,bo=class extends Ot{render(){return j` <slot part="base" class="menu-label"></slot> `}};bo.styles=[ct,fo],bo.define("sl-menu-label"),Ut({tagName:"sl-menu-label",elementClass:bo,react:t,events:{},displayName:"SlMenuLabel"});var mo=a`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`,go=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.isInitialized=0,this.current=0,this.selected=0,this.hasHover=0,this.value="",this.disabled=0}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{const t=this.closest("sl-select");t&&t.handleDefaultSlotChange()}):this.isInitialized=1}handleMouseEnter(){this.hasHover=1}handleMouseLeave(){this.hasHover=0}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){"string"!=typeof this.value&&(this.value=String(this.value)),this.value.includes(" ")&&(this.value=this.value.replace(/ /g,"_"))}getTextLabel(){const t=this.childNodes;let e="";return[...t].forEach(t=>{t.nodeType===Node.ELEMENT_NODE&&(t.hasAttribute("slot")||(e+=t.textContent)),t.nodeType===Node.TEXT_NODE&&(e+=t.textContent)}),e.trim()}render(){return j`
      <div
        part="base"
        class=${oe({option:1,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};go.styles=[ct,mo],go.dependencies={"sl-icon":se},xt([Bt(".option__label")],go.prototype,"defaultSlot",2),xt([Mt()],go.prototype,"current",2),xt([Mt()],go.prototype,"selected",2),xt([Mt()],go.prototype,"hasHover",2),xt([Ct({reflect:1})],go.prototype,"value",2),xt([Ct({type:Boolean,reflect:1})],go.prototype,"disabled",2),xt([Kt("disabled")],go.prototype,"handleDisabledChange",1),xt([Kt("selected")],go.prototype,"handleSelectedChange",1),xt([Kt("value")],go.prototype,"handleValueChange",1),go.define("sl-option");var vo=Ut({tagName:"sl-option",elementClass:go,react:t,events:{},displayName:"SlOption"});Ai.define("sl-popup"),Ut({tagName:"sl-popup",elementClass:Ai,react:t,events:{onSlReposition:"sl-reposition"},displayName:"SlPopup"});var yo=a`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`,wo=class extends Ot{constructor(){super(...arguments),this.vertical=0}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}handleVerticalChange(){this.setAttribute("aria-orientation",this.vertical?"vertical":"horizontal")}};wo.styles=[ct,yo],xt([Ct({type:Boolean,reflect:1})],wo.prototype,"vertical",2),xt([Kt("vertical")],wo.prototype,"handleVerticalChange",1),wo.define("sl-divider"),Ut({tagName:"sl-divider",elementClass:wo,react:t,events:{},displayName:"SlDivider"});var _o=a`
  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .drawer__header-actions sl-icon-button,
  .drawer__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .drawer__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    display: none;
  }

  @media (forced-colors: active) {
    .drawer__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;function*xo(t=document.activeElement){var e,s,i,r,o;null!=t&&(yield t,"shadowRoot"in t&&t.shadowRoot&&"closed"!==t.shadowRoot.mode&&(yield*(e=xo(t.shadowRoot.activeElement),i=e[gt("asyncIterator")],r=0,o={},null==i?(i=e[gt("iterator")](),s=t=>o[t]=e=>i[t](e)):(i=i.call(e),s=t=>o[t]=e=>{if(r){if(r=0,"throw"===t)throw e;return e}return r=1,{done:0,value:new $t(new Promise(s=>{var r=i[t](e);r instanceof Object||vt("Object expected"),s(r)}),1)}}),o[gt("iterator")]=()=>o,s("next"),"throw"in i?s("throw"):o.throw=t=>{throw t},"return"in i&&s("return"),o)))}function ko(){return[...xo()].pop()}var $o=new WeakMap;function zo(t){let e=$o.get(t);return e||(e=window.getComputedStyle(t,null),$o.set(t,e)),e}function So(t){const e=new WeakMap,s=[];return function i(r){if(r instanceof Element){if(r.hasAttribute("inert")||r.closest("[inert]"))return;if(e.has(r))return;e.set(r,1),!s.includes(r)&&function(t){const e=t.tagName.toLowerCase(),s=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(s)||s<=-1))return 0;if(t.hasAttribute("disabled"))return 0;if(t.closest("[inert]"))return 0;if("input"===e&&"radio"===t.getAttribute("type")){const e=t.getRootNode(),s=`input[type='radio'][name="${t.getAttribute("name")}"]`,i=e.querySelector(`${s}:checked`);return i?i===t:e.querySelector(s)===t}return(t=>{if("function"==typeof t.checkVisibility)return t.checkVisibility({checkOpacity:0,checkVisibilityCSS:1});const e=zo(t);return"hidden"!==e.visibility&&"none"!==e.display})(t)?"audio"!==e&&"video"!==e||!t.hasAttribute("controls")?t.hasAttribute("tabindex")||t.hasAttribute("contenteditable")&&"false"!==t.getAttribute("contenteditable")||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?1:(t=>{const e=zo(t),{overflowY:s,overflowX:i}=e;return"scroll"===s||"scroll"===i?1:"auto"!==s||"auto"!==i?0:t.scrollHeight>t.clientHeight&&"auto"===s||t.scrollWidth>t.clientWidth&&"auto"===i?1:0})(t):1:0}(r)&&s.push(r),r instanceof HTMLSlotElement&&((t,e)=>{var s;return(null==(s=t.getRootNode({composed:1}))?void 0:s.host)!==e})(r,t)&&r.assignedElements({flatten:1}).forEach(t=>{i(t)}),null!==r.shadowRoot&&"open"===r.shadowRoot.mode&&i(r.shadowRoot)}for(const t of r.children)i(t)}(t),s.sort((t,e)=>{const s=Number(t.getAttribute("tabindex"))||0;return(Number(e.getAttribute("tabindex"))||0)-s})}var Co=[],Mo=class{constructor(t){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=t=>{var e;if("Tab"!==t.key||this.isExternalActivated)return;if(!this.isActive())return;const s=ko();if(this.previousFocus=s,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const i=So(this.element);let r=i.findIndex(t=>t===s);this.previousFocus=this.currentFocus;const o="forward"===this.tabDirection?1:-1;for(;;){r+o>=i.length?r=0:r+o<0?r=i.length-1:r+=o,this.previousFocus=this.currentFocus;const s=i[r];if("backward"===this.tabDirection&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;if(s&&this.possiblyHasTabbableChildren(s))return;t.preventDefault(),this.currentFocus=s,null==(e=this.currentFocus)||e.focus({preventScroll:0});const a=[...xo()];if(a.includes(this.currentFocus)||!a.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){Co.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){Co=Co.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return Co[Co.length-1]===this.element}activateExternal(){this.isExternalActivated=1}deactivateExternal(){this.isExternalActivated=0}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const t=So(this.element);if(!this.element.matches(":focus-within")){const e=t[0],s=t[t.length-1],i="forward"===this.tabDirection?e:s;"function"==typeof(null==i?void 0:i.focus)&&(this.currentFocus=i,i.focus({preventScroll:0}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}},Ao=t=>{var e;const{activeElement:s}=document;s&&t.contains(s)&&(null==(e=document.activeElement)||e.blur())};function No(t){return t.charAt(0).toUpperCase()+t.slice(1)}var Bo=class extends Ot{constructor(){super(...arguments),this.hasSlotController=new ss(this,"footer"),this.localize=new ze(this),this.modal=new Mo(this),this.open=0,this.label="",this.placement="end",this.contained=0,this.noHeader=0,this.handleDocumentKeyDown=t=>{this.contained||"Escape"===t.key&&this.modal.isActive()&&this.open&&(t.stopImmediatePropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.drawer.hidden=!this.open,this.open&&(this.addOpenListeners(),this.contained||(this.modal.activate(),Oe(this)))}disconnectedCallback(){super.disconnectedCallback(),Ee(this),this.removeOpenListeners()}requestClose(t){if(this.emit("sl-request-close",{cancelable:1,detail:{source:t}}).defaultPrevented){const t=Ei(this,"drawer.denyClose",{dir:this.localize.dir()});return void Di(this.panel,t.keyframes,t.options)}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.contained||(this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard"))):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;document.removeEventListener("keydown",this.handleDocumentKeyDown),null==(t=this.closeWatcher)||t.destroy()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),Oe(this));const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([Li(this.drawer),Li(this.overlay)]),this.drawer.hidden=0,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:1}).defaultPrevented||(t?t.focus({preventScroll:1}):this.panel.focus({preventScroll:1})),t&&t.setAttribute("autofocus","")});const e=Ei(this,`drawer.show${No(this.placement)}`,{dir:this.localize.dir()}),s=Ei(this,"drawer.overlay.show",{dir:this.localize.dir()});await Promise.all([Di(this.panel,e.keyframes,e.options),Di(this.overlay,s.keyframes,s.options)]),this.emit("sl-after-show")}else{Ao(this),this.emit("sl-hide"),this.removeOpenListeners(),this.contained||(this.modal.deactivate(),Ee(this)),await Promise.all([Li(this.drawer),Li(this.overlay)]);const t=Ei(this,`drawer.hide${No(this.placement)}`,{dir:this.localize.dir()}),e=Ei(this,"drawer.overlay.hide",{dir:this.localize.dir()});await Promise.all([Di(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=1}),Di(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=1})]),this.drawer.hidden=1,this.overlay.hidden=0,this.panel.hidden=0;const s=this.originalTrigger;"function"==typeof(null==s?void 0:s.focus)&&setTimeout(()=>s.focus()),this.emit("sl-after-hide")}}handleNoModalChange(){this.open&&!this.contained&&(this.modal.activate(),Oe(this)),this.open&&this.contained&&(this.modal.deactivate(),Ee(this))}async show(){if(!this.open)return this.open=1,Fi(this,"sl-after-show")}async hide(){if(this.open)return this.open=0,Fi(this,"sl-after-hide")}render(){return j`
      <div
        part="base"
        class=${oe({drawer:1,"drawer--open":this.open,"drawer--top":"top"===this.placement,"drawer--end":"end"===this.placement,"drawer--bottom":"bottom"===this.placement,"drawer--start":"start"===this.placement,"drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--rtl":"rtl"===this.localize.dir(),"drawer--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${de(this.noHeader?this.label:void 0)}
          aria-labelledby=${de(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":j`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="drawer__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="drawer__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click=${()=>this.requestClose("close-button")}
                    ></sl-icon-button>
                  </div>
                </header>
              `}

          <slot part="body" class="drawer__body"></slot>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Bo.styles=[ct,_o],Bo.dependencies={"sl-icon-button":pe},xt([Bt(".drawer")],Bo.prototype,"drawer",2),xt([Bt(".drawer__panel")],Bo.prototype,"panel",2),xt([Bt(".drawer__overlay")],Bo.prototype,"overlay",2),xt([Ct({type:Boolean,reflect:1})],Bo.prototype,"open",2),xt([Ct({reflect:1})],Bo.prototype,"label",2),xt([Ct({reflect:1})],Bo.prototype,"placement",2),xt([Ct({type:Boolean,reflect:1})],Bo.prototype,"contained",2),xt([Ct({attribute:"no-header",type:Boolean,reflect:1})],Bo.prototype,"noHeader",2),xt([Kt("open",{waitUntilFirstUpdate:1})],Bo.prototype,"handleOpenChange",1),xt([Kt("contained",{waitUntilFirstUpdate:1})],Bo.prototype,"handleNoModalChange",1),Oi("drawer.showTop",{keyframes:[{opacity:0,translate:"0 -100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}}),Oi("drawer.hideTop",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 -100%"}],options:{duration:250,easing:"ease"}}),Oi("drawer.showEnd",{keyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}}),Oi("drawer.hideEnd",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],options:{duration:250,easing:"ease"}}),Oi("drawer.showBottom",{keyframes:[{opacity:0,translate:"0 100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}}),Oi("drawer.hideBottom",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 100%"}],options:{duration:250,easing:"ease"}}),Oi("drawer.showStart",{keyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}}),Oi("drawer.hideStart",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],options:{duration:250,easing:"ease"}}),Oi("drawer.denyClose",{keyframes:[{scale:1},{scale:1.01},{scale:1}],options:{duration:250}}),Oi("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}}),Oi("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}}),Bo.define("sl-drawer"),Ut({tagName:"sl-drawer",elementClass:Bo,react:t,events:{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide",onSlInitialFocus:"sl-initial-focus",onSlRequestClose:"sl-request-close"},displayName:"SlDrawer"});var Io=a`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,Oo=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.open=0,this.placement="bottom-start",this.disabled=0,this.stayOpenOnSelect=0,this.distance=0,this.skidding=0,this.hoist=0,this.sync=void 0,this.handleKeyDown=t=>{this.open&&"Escape"===t.key&&(t.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=t=>{var e;if("Escape"===t.key&&this.open&&!this.closeWatcher)return t.stopPropagation(),this.focusOnTrigger(),void this.hide();if("Tab"===t.key){if(this.open&&"sl-menu-item"===(null==(e=document.activeElement)?void 0:e.tagName.toLowerCase()))return t.preventDefault(),this.hide(),void this.focusOnTrigger();const s=(t,e)=>{if(!t)return null;const i=t.closest(e);if(i)return i;const r=t.getRootNode();return r instanceof ShadowRoot?s(r.host,e):null};setTimeout(()=>{var t;const e=(null==(t=this.containingElement)?void 0:t.getRootNode())instanceof ShadowRoot?ko():document.activeElement;this.containingElement&&s(e,this.containingElement.tagName.toLowerCase())===this.containingElement||this.hide()})}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=t=>{const e=t.target;this.stayOpenOnSelect||"sl-menu"!==e.tagName.toLowerCase()||(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=1)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const t=this.trigger.assignedElements({flatten:1})[0];"function"==typeof(null==t?void 0:t.focus)&&t.focus()}getMenu(){return this.panel.assignedElements({flatten:1}).find(t=>"sl-menu"===t.tagName.toLowerCase())}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key))return t.preventDefault(),void this.handleTriggerClick();const e=this.getMenu();if(e){const s=e.getAllItems(),i=s[0],r=s[s.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),s.length>0&&this.updateComplete.then(()=>{"ArrowDown"!==t.key&&"Home"!==t.key||(e.setCurrentItem(i),i.focus()),"ArrowUp"!==t.key&&"End"!==t.key||(e.setCurrentItem(r),r.focus())}))}}handleTriggerKeyUp(t){" "===t.key&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.assignedElements({flatten:1}).find(t=>(t=>{var e,s;const i=So(t);return{start:null!=(e=i[0])?e:null,end:null!=(s=i[i.length-1])?s:null}})(t).start);let e;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":e=t.button;break;default:e=t}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=1,Fi(this,"sl-after-show")}async hide(){if(this.open)return this.open=0,Fi(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),null==(t=this.closeWatcher)||t.destroy()}async handleOpenChange(){if(this.disabled)this.open=0;else if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await Li(this),this.panel.hidden=0,this.popup.active=1;const{keyframes:t,options:e}=Ei(this,"dropdown.show",{dir:this.localize.dir()});await Di(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await Li(this);const{keyframes:t,options:e}=Ei(this,"dropdown.hide",{dir:this.localize.dir()});await Di(this.popup.popup,t,e),this.panel.hidden=1,this.popup.active=0,this.emit("sl-after-hide")}}render(){return j`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${de(this.sync?this.sync:void 0)}
        class=${oe({dropdown:1,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};Oo.styles=[ct,Io],Oo.dependencies={"sl-popup":Ai},xt([Bt(".dropdown")],Oo.prototype,"popup",2),xt([Bt(".dropdown__trigger")],Oo.prototype,"trigger",2),xt([Bt(".dropdown__panel")],Oo.prototype,"panel",2),xt([Ct({type:Boolean,reflect:1})],Oo.prototype,"open",2),xt([Ct({reflect:1})],Oo.prototype,"placement",2),xt([Ct({type:Boolean,reflect:1})],Oo.prototype,"disabled",2),xt([Ct({attribute:"stay-open-on-select",type:Boolean,reflect:1})],Oo.prototype,"stayOpenOnSelect",2),xt([Ct({attribute:0})],Oo.prototype,"containingElement",2),xt([Ct({type:Number})],Oo.prototype,"distance",2),xt([Ct({type:Number})],Oo.prototype,"skidding",2),xt([Ct({type:Boolean})],Oo.prototype,"hoist",2),xt([Ct({reflect:1})],Oo.prototype,"sync",2),xt([Kt("open",{waitUntilFirstUpdate:1})],Oo.prototype,"handleOpenChange",1),Oi("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),Oi("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}}),Oo.define("sl-dropdown"),Ut({tagName:"sl-dropdown",elementClass:Oo,react:t,events:{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide"},displayName:"SlDropdown"});var Eo=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.date=new Date,this.hourFormat="auto"}render(){const t=new Date(this.date),e="auto"===this.hourFormat?void 0:"12"===this.hourFormat;if(!isNaN(t.getMilliseconds()))return j`
      <time datetime=${t.toISOString()}>
        ${this.localize.date(t,{weekday:this.weekday,era:this.era,year:this.year,month:this.month,day:this.day,hour:this.hour,minute:this.minute,second:this.second,timeZoneName:this.timeZoneName,timeZone:this.timeZone,hour12:e})}
      </time>
    `}};xt([Ct()],Eo.prototype,"date",2),xt([Ct()],Eo.prototype,"weekday",2),xt([Ct()],Eo.prototype,"era",2),xt([Ct()],Eo.prototype,"year",2),xt([Ct()],Eo.prototype,"month",2),xt([Ct()],Eo.prototype,"day",2),xt([Ct()],Eo.prototype,"hour",2),xt([Ct()],Eo.prototype,"minute",2),xt([Ct()],Eo.prototype,"second",2),xt([Ct({attribute:"time-zone-name"})],Eo.prototype,"timeZoneName",2),xt([Ct({attribute:"time-zone"})],Eo.prototype,"timeZone",2),xt([Ct({attribute:"hour-format"})],Eo.prototype,"hourFormat",2),Eo.define("sl-format-date"),Ut({tagName:"sl-format-date",elementClass:Eo,react:t,events:{},displayName:"SlFormatDate"});var Fo=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.value=0,this.unit="byte",this.display="short"}render(){if(isNaN(this.value))return"";const t="bit"===this.unit?["","kilo","mega","giga","tera"]:["","kilo","mega","giga","tera","peta"],e=Math.max(0,Math.min(Math.floor(Math.log10(this.value)/3),t.length-1)),s=t[e]+this.unit,i=parseFloat((this.value/Math.pow(1e3,e)).toPrecision(3));return this.localize.number(i,{style:"unit",unit:s,unitDisplay:this.display})}};xt([Ct({type:Number})],Fo.prototype,"value",2),xt([Ct()],Fo.prototype,"unit",2),xt([Ct()],Fo.prototype,"display",2),Fo.define("sl-format-bytes"),Ut({tagName:"sl-format-bytes",elementClass:Fo,react:t,events:{},displayName:"SlFormatBytes"});var Do=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.value=0,this.type="decimal",this.noGrouping=0,this.currency="USD",this.currencyDisplay="symbol"}render(){return isNaN(this.value)?"":this.localize.number(this.value,{style:this.type,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:!this.noGrouping,minimumIntegerDigits:this.minimumIntegerDigits,minimumFractionDigits:this.minimumFractionDigits,maximumFractionDigits:this.maximumFractionDigits,minimumSignificantDigits:this.minimumSignificantDigits,maximumSignificantDigits:this.maximumSignificantDigits})}};xt([Ct({type:Number})],Do.prototype,"value",2),xt([Ct()],Do.prototype,"type",2),xt([Ct({attribute:"no-grouping",type:Boolean})],Do.prototype,"noGrouping",2),xt([Ct()],Do.prototype,"currency",2),xt([Ct({attribute:"currency-display"})],Do.prototype,"currencyDisplay",2),xt([Ct({attribute:"minimum-integer-digits",type:Number})],Do.prototype,"minimumIntegerDigits",2),xt([Ct({attribute:"minimum-fraction-digits",type:Number})],Do.prototype,"minimumFractionDigits",2),xt([Ct({attribute:"maximum-fraction-digits",type:Number})],Do.prototype,"maximumFractionDigits",2),xt([Ct({attribute:"minimum-significant-digits",type:Number})],Do.prototype,"minimumSignificantDigits",2),xt([Ct({attribute:"maximum-significant-digits",type:Number})],Do.prototype,"maximumSignificantDigits",2),Do.define("sl-format-number"),Ut({tagName:"sl-format-number",elementClass:Do,react:t,events:{},displayName:"SlFormatNumber"}),se.define("sl-icon");var To=Ut({tagName:"sl-icon",elementClass:se,react:t,events:{onSlLoad:"sl-load",onSlError:"sl-error"},displayName:"SlIcon"});pe.define("sl-icon-button"),Ut({tagName:"sl-icon-button",elementClass:pe,react:t,events:{onSlBlur:"sl-blur",onSlFocus:"sl-focus"},displayName:"SlIconButton"}),jr.define("sl-button-group"),Ut({tagName:"sl-button-group",elementClass:jr,react:t,events:{},displayName:"SlButtonGroup"});var Uo=class{constructor(t,e){this.timerId=0,this.activeInteractions=0,this.paused=0,this.stopped=1,this.pause=()=>{this.activeInteractions++||(this.paused=1,this.host.requestUpdate())},this.resume=()=>{--this.activeInteractions||(this.paused=0,this.host.requestUpdate())},t.addController(this),this.host=t,this.tickCallback=e}hostConnected(){this.host.addEventListener("mouseenter",this.pause),this.host.addEventListener("mouseleave",this.resume),this.host.addEventListener("focusin",this.pause),this.host.addEventListener("focusout",this.resume),this.host.addEventListener("touchstart",this.pause,{passive:1}),this.host.addEventListener("touchend",this.resume)}hostDisconnected(){this.stop(),this.host.removeEventListener("mouseenter",this.pause),this.host.removeEventListener("mouseleave",this.resume),this.host.removeEventListener("focusin",this.pause),this.host.removeEventListener("focusout",this.resume),this.host.removeEventListener("touchstart",this.pause),this.host.removeEventListener("touchend",this.resume)}start(t){this.stop(),this.stopped=0,this.timerId=window.setInterval(()=>{this.paused||this.tickCallback()},t)}stop(){clearInterval(this.timerId),this.stopped=1,this.host.requestUpdate()}},Lo=a`
  :host {
    --slide-gap: var(--sl-spacing-medium, 1rem);
    --aspect-ratio: 16 / 9;
    --scroll-hint: 0px;

    display: flex;
  }

  .carousel {
    display: grid;
    grid-template-columns: min-content 1fr min-content;
    grid-template-rows: 1fr min-content;
    grid-template-areas:
      '. slides .'
      '. pagination .';
    gap: var(--sl-spacing-medium);
    align-items: center;
    min-height: 100%;
    min-width: 100%;
    position: relative;
  }

  .carousel__pagination {
    grid-area: pagination;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sl-spacing-small);
  }

  .carousel__slides {
    grid-area: slides;

    display: grid;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-items: center;
    overflow: auto;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    aspect-ratio: calc(var(--aspect-ratio) * var(--slides-per-page));
    border-radius: var(--sl-border-radius-small);

    --slide-size: calc((100% - (var(--slides-per-page) - 1) * var(--slide-gap)) / var(--slides-per-page));
  }

  @media (prefers-reduced-motion) {
    :where(.carousel__slides) {
      scroll-behavior: auto;
    }
  }

  .carousel__slides--horizontal {
    grid-auto-flow: column;
    grid-auto-columns: var(--slide-size);
    grid-auto-rows: 100%;
    column-gap: var(--slide-gap);
    scroll-snap-type: x mandatory;
    scroll-padding-inline: var(--scroll-hint);
    padding-inline: var(--scroll-hint);
    overflow-y: hidden;
  }

  .carousel__slides--vertical {
    grid-auto-flow: row;
    grid-auto-columns: 100%;
    grid-auto-rows: var(--slide-size);
    row-gap: var(--slide-gap);
    scroll-snap-type: y mandatory;
    scroll-padding-block: var(--scroll-hint);
    padding-block: var(--scroll-hint);
    overflow-x: hidden;
  }

  .carousel__slides--dragging {
  }

  :host([vertical]) ::slotted(sl-carousel-item) {
    height: 100%;
  }

  .carousel__slides::-webkit-scrollbar {
    display: none;
  }

  .carousel__navigation {
    grid-area: navigation;
    display: contents;
    font-size: var(--sl-font-size-x-large);
  }

  .carousel__navigation-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-small);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    appearance: none;
  }

  .carousel__navigation-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .carousel__navigation-button--disabled::part(base) {
    pointer-events: none;
  }

  .carousel__navigation-button--previous {
    grid-column: 1;
    grid-row: 1;
  }

  .carousel__navigation-button--next {
    grid-column: 3;
    grid-row: 1;
  }

  .carousel__pagination-item {
    display: block;
    cursor: pointer;
    background: none;
    border: 0;
    border-radius: var(--sl-border-radius-circle);
    width: var(--sl-spacing-small);
    height: var(--sl-spacing-small);
    background-color: var(--sl-color-neutral-300);
    padding: 0;
    margin: 0;
  }

  .carousel__pagination-item--active {
    background-color: var(--sl-color-neutral-700);
    transform: scale(1.2);
  }

  /* Focus styles */
  .carousel__slides:focus-visible,
  .carousel__navigation-button:focus-visible,
  .carousel__pagination-item:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }
`,Ro=class extends Ot{constructor(){super(...arguments),this.loop=0,this.navigation=0,this.pagination=0,this.autoplay=0,this.autoplayInterval=3e3,this.slidesPerPage=1,this.slidesPerMove=1,this.orientation="horizontal",this.mouseDragging=0,this.activeSlide=0,this.scrolling=0,this.dragging=0,this.autoplayController=new Uo(this,()=>this.next()),this.dragStartPosition=[-1,-1],this.localize=new ze(this),this.pendingSlideChange=0,this.handleMouseDrag=t=>{this.dragging||(this.scrollContainer.style.setProperty("scroll-snap-type","none"),this.dragging=1,this.dragStartPosition=[t.clientX,t.clientY]),this.scrollContainer.scrollBy({left:-t.movementX,top:-t.movementY,behavior:"instant"})},this.handleMouseDragEnd=()=>{const t=this.scrollContainer;document.removeEventListener("pointermove",this.handleMouseDrag,{capture:1});const e=t.scrollLeft,s=t.scrollTop;t.style.removeProperty("scroll-snap-type"),t.style.setProperty("overflow","hidden");const i=t.scrollLeft,r=t.scrollTop;t.style.removeProperty("overflow"),t.style.setProperty("scroll-snap-type","none"),t.scrollTo({left:e,top:s,behavior:"instant"}),requestAnimationFrame(async()=>{e===i&&s===r||(t.scrollTo({left:i,top:r,behavior:Ui()?"auto":"smooth"}),await Fi(t,"scrollend")),t.style.removeProperty("scroll-snap-type"),this.dragging=0,this.dragStartPosition=[-1,-1],this.handleScrollEnd()})},this.handleSlotChange=t=>{t.some(t=>[...t.addedNodes,...t.removedNodes].some(t=>this.isCarouselItem(t)&&!t.hasAttribute("data-clone")))&&this.initializeSlides(),this.requestUpdate()}}connectedCallback(){super.connectedCallback(),this.setAttribute("role","region"),this.setAttribute("aria-label",this.localize.term("carousel"))}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.mutationObserver)||t.disconnect()}firstUpdated(){this.initializeSlides(),this.mutationObserver=new MutationObserver(this.handleSlotChange),this.mutationObserver.observe(this,{childList:1,subtree:1})}willUpdate(t){(t.has("slidesPerMove")||t.has("slidesPerPage"))&&(this.slidesPerMove=Math.min(this.slidesPerMove,this.slidesPerPage))}getPageCount(){const t=this.getSlides().length,{slidesPerPage:e,slidesPerMove:s,loop:i}=this,r=i?t/s:(t-e)/s+1;return Math.ceil(r)}getCurrentPage(){return Math.ceil(this.activeSlide/this.slidesPerMove)}canScrollNext(){return this.loop||this.getCurrentPage()<this.getPageCount()-1}canScrollPrev(){return this.loop||this.getCurrentPage()>0}getSlides({excludeClones:t=1}={}){return[...this.children].filter(e=>this.isCarouselItem(e)&&(!t||!e.hasAttribute("data-clone")))}handleClick(t){if(this.dragging&&this.dragStartPosition[0]>0&&this.dragStartPosition[1]>0){const e=Math.abs(this.dragStartPosition[0]-t.clientX),s=Math.abs(this.dragStartPosition[1]-t.clientY);Math.sqrt(e*e+s*s)>=10&&t.preventDefault()}}handleKeyDown(t){if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key)){const e=t.target,s="rtl"===this.localize.dir(),i=null!==e.closest('[part~="pagination-item"]'),r="ArrowDown"===t.key||!s&&"ArrowRight"===t.key||s&&"ArrowLeft"===t.key,o="ArrowUp"===t.key||!s&&"ArrowLeft"===t.key||s&&"ArrowRight"===t.key;t.preventDefault(),o&&this.previous(),r&&this.next(),"Home"===t.key&&this.goToSlide(0),"End"===t.key&&this.goToSlide(this.getSlides().length-1),i&&this.updateComplete.then(()=>{var t;const e=null==(t=this.shadowRoot)?void 0:t.querySelector('[part~="pagination-item--active"]');e&&e.focus()})}}handleMouseDragStart(t){this.mouseDragging&&0===t.button&&(t.preventDefault(),document.addEventListener("pointermove",this.handleMouseDrag,{capture:1,passive:1}),document.addEventListener("pointerup",this.handleMouseDragEnd,{capture:1,once:1}))}handleScroll(){this.scrolling=1,this.pendingSlideChange||this.synchronizeSlides()}synchronizeSlides(){const t=new IntersectionObserver(e=>{t.disconnect();for(const t of e){const e=t.target;e.toggleAttribute("inert",!t.isIntersecting),e.classList.toggle("--in-view",t.isIntersecting),e.setAttribute("aria-hidden",t.isIntersecting?"false":"true")}const s=e.find(t=>t.isIntersecting);if(!s)return;const i=this.getSlides({excludeClones:0}),r=this.getSlides().length,o=i.indexOf(s.target),a=this.loop?o-this.slidesPerPage:o;if(this.activeSlide=(Math.ceil(a/this.slidesPerMove)*this.slidesPerMove+r)%r,!this.scrolling&&this.loop&&s.target.hasAttribute("data-clone")){const t=Number(s.target.getAttribute("data-clone"));this.goToSlide(t,"instant")}},{root:this.scrollContainer,threshold:.6});this.getSlides({excludeClones:0}).forEach(e=>{t.observe(e)})}handleScrollEnd(){this.scrolling&&!this.dragging&&(this.scrolling=0,this.pendingSlideChange=0,this.synchronizeSlides())}isCarouselItem(t){return t instanceof Element&&"sl-carousel-item"===t.tagName.toLowerCase()}initializeSlides(){this.getSlides({excludeClones:0}).forEach((t,e)=>{t.classList.remove("--in-view"),t.classList.remove("--is-active"),t.setAttribute("role","group"),t.setAttribute("aria-label",this.localize.term("slideNum",e+1)),this.pagination&&(t.setAttribute("id",`slide-${e+1}`),t.setAttribute("role","tabpanel"),t.removeAttribute("aria-label"),t.setAttribute("aria-labelledby",`tab-${e+1}`)),t.hasAttribute("data-clone")&&t.remove()}),this.updateSlidesSnap(),this.loop&&this.createClones(),this.goToSlide(this.activeSlide,"auto"),this.synchronizeSlides()}createClones(){const t=this.getSlides(),e=this.slidesPerPage,s=t.slice(-e),i=t.slice(0,e);s.reverse().forEach((e,s)=>{const i=e.cloneNode(1);i.setAttribute("data-clone",String(t.length-s-1)),this.prepend(i)}),i.forEach((t,e)=>{const s=t.cloneNode(1);s.setAttribute("data-clone",String(e)),this.append(s)})}handleSlideChange(){const t=this.getSlides();t.forEach((t,e)=>{t.classList.toggle("--is-active",e===this.activeSlide)}),this.hasUpdated&&this.emit("sl-slide-change",{detail:{index:this.activeSlide,slide:t[this.activeSlide]}})}updateSlidesSnap(){const t=this.getSlides(),e=this.slidesPerMove;t.forEach((t,s)=>{(s+e)%e===0?t.style.removeProperty("scroll-snap-align"):t.style.setProperty("scroll-snap-align","none")})}handleAutoplayChange(){this.autoplayController.stop(),this.autoplay&&this.autoplayController.start(this.autoplayInterval)}previous(t="smooth"){this.goToSlide(this.activeSlide-this.slidesPerMove,t)}next(t="smooth"){this.goToSlide(this.activeSlide+this.slidesPerMove,t)}goToSlide(t,e="smooth"){const{slidesPerPage:s,loop:i}=this,r=this.getSlides(),o=this.getSlides({excludeClones:0});if(!r.length)return;const a=i?(t+r.length)%r.length:Zi(t,0,r.length-s);this.activeSlide=a;const n=o[Zi(t+(i?s:0)+("rtl"===this.localize.dir()?s-1:0),0,o.length-1)];this.scrollToSlide(n,Ui()?"auto":e)}scrollToSlide(t,e="smooth"){this.pendingSlideChange=1,window.requestAnimationFrame(()=>{if(!this.scrollContainer)return;const s=this.scrollContainer,i=s.getBoundingClientRect(),r=t.getBoundingClientRect(),o=r.left-i.left,a=r.top-i.top;o||a?(this.pendingSlideChange=1,s.scrollTo({left:o+s.scrollLeft,top:a+s.scrollTop,behavior:e})):this.pendingSlideChange=0})}render(){const{slidesPerMove:t,scrolling:e}=this,s=this.getPageCount(),i=this.getCurrentPage(),r=this.canScrollPrev(),o=this.canScrollNext(),a="ltr"===this.localize.dir();return j`
      <div part="base" class="carousel">
        <div
          id="scroll-container"
          part="scroll-container"
          class="${oe({carousel__slides:1,"carousel__slides--horizontal":"horizontal"===this.orientation,"carousel__slides--vertical":"vertical"===this.orientation,"carousel__slides--dragging":this.dragging})}"
          style="--slides-per-page: ${this.slidesPerPage};"
          aria-busy="${e?"true":"false"}"
          aria-atomic="true"
          tabindex="0"
          @keydown=${this.handleKeyDown}
          @mousedown="${this.handleMouseDragStart}"
          @scroll="${this.handleScroll}"
          @scrollend=${this.handleScrollEnd}
          @click=${this.handleClick}
        >
          <slot></slot>
        </div>

        ${this.navigation?j`
              <div part="navigation" class="carousel__navigation">
                <button
                  part="navigation-button navigation-button--previous"
                  class="${oe({"carousel__navigation-button":1,"carousel__navigation-button--previous":1,"carousel__navigation-button--disabled":!r})}"
                  aria-label="${this.localize.term("previousSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${r?"false":"true"}"
                  @click=${r?()=>this.previous():null}
                >
                  <slot name="previous-icon">
                    <sl-icon library="system" name="${a?"chevron-left":"chevron-right"}"></sl-icon>
                  </slot>
                </button>

                <button
                  part="navigation-button navigation-button--next"
                  class=${oe({"carousel__navigation-button":1,"carousel__navigation-button--next":1,"carousel__navigation-button--disabled":!o})}
                  aria-label="${this.localize.term("nextSlide")}"
                  aria-controls="scroll-container"
                  aria-disabled="${o?"false":"true"}"
                  @click=${o?()=>this.next():null}
                >
                  <slot name="next-icon">
                    <sl-icon library="system" name="${a?"chevron-right":"chevron-left"}"></sl-icon>
                  </slot>
                </button>
              </div>
            `:""}
        ${this.pagination?j`
              <div part="pagination" role="tablist" class="carousel__pagination">
                ${function*(t,e){if(void 0!==t){let s=0;for(const i of t)yield e(i,s++)}}(function*(t,e,s=1){const i=void 0===e?0:t;e??=t;for(let t=i;s>0?t<e:e<t;t+=s)yield t}(s),e=>{const r=e===i;return j`
                    <button
                      part="pagination-item ${r?"pagination-item--active":""}"
                      class="${oe({"carousel__pagination-item":1,"carousel__pagination-item--active":r})}"
                      role="tab"
                      id="tab-${e+1}"
                      aria-controls="slide-${e+1}"
                      aria-selected="${r?"true":"false"}"
                      aria-label="${r?this.localize.term("slideNum",e+1):this.localize.term("goToSlide",e+1,s)}"
                      tabindex=${r?"0":"-1"}
                      @click=${()=>this.goToSlide(e*t)}
                      @keydown=${this.handleKeyDown}
                    ></button>
                  `})}
              </div>
            `:""}
      </div>
    `}};Ro.styles=[ct,Lo],Ro.dependencies={"sl-icon":se},xt([Ct({type:Boolean,reflect:1})],Ro.prototype,"loop",2),xt([Ct({type:Boolean,reflect:1})],Ro.prototype,"navigation",2),xt([Ct({type:Boolean,reflect:1})],Ro.prototype,"pagination",2),xt([Ct({type:Boolean,reflect:1})],Ro.prototype,"autoplay",2),xt([Ct({type:Number,attribute:"autoplay-interval"})],Ro.prototype,"autoplayInterval",2),xt([Ct({type:Number,attribute:"slides-per-page"})],Ro.prototype,"slidesPerPage",2),xt([Ct({type:Number,attribute:"slides-per-move"})],Ro.prototype,"slidesPerMove",2),xt([Ct()],Ro.prototype,"orientation",2),xt([Ct({type:Boolean,reflect:1,attribute:"mouse-dragging"})],Ro.prototype,"mouseDragging",2),xt([Bt(".carousel__slides")],Ro.prototype,"scrollContainer",2),xt([Bt(".carousel__pagination")],Ro.prototype,"paginationContainer",2),xt([Mt()],Ro.prototype,"activeSlide",2),xt([Mt()],Ro.prototype,"scrolling",2),xt([Mt()],Ro.prototype,"dragging",2),xt([At({passive:1})],Ro.prototype,"handleScroll",1),xt([Kt("loop",{waitUntilFirstUpdate:1}),Kt("slidesPerPage",{waitUntilFirstUpdate:1})],Ro.prototype,"initializeSlides",1),xt([Kt("activeSlide")],Ro.prototype,"handleSlideChange",1),xt([Kt("slidesPerMove")],Ro.prototype,"updateSlidesSnap",1),xt([Kt("autoplay")],Ro.prototype,"handleAutoplayChange",1),Ro.define("sl-carousel"),Ut({tagName:"sl-carousel",elementClass:Ro,react:t,events:{onSlSlideChange:"sl-slide-change"},displayName:"SlCarousel"});var Po=a`
  :host {
    --aspect-ratio: inherit;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
    aspect-ratio: var(--aspect-ratio);
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }

  ::slotted(img) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
`,jo=class extends Ot{connectedCallback(){super.connectedCallback()}render(){return j` <slot></slot> `}};jo.styles=[ct,Po],jo.define("sl-carousel-item"),Ut({tagName:"sl-carousel-item",elementClass:jo,react:t,events:{},displayName:"SlCarouselItem"}),qi.define("sl-checkbox");var Ho=Ut({tagName:"sl-checkbox",elementClass:qi,react:t,events:{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlFocus:"sl-focus",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlCheckbox"}),Vo=a`
  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
    -webkit-user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker--inline:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: var(--sl-transition-fast) scale;
  }

  .color-picker__grid-handle--dragging {
    cursor: none;
    scale: 1.5;
  }

  .color-picker__grid-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-border-radius-circle);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
    forced-color-adjust: none;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
    forced-color-adjust: none;
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position:
      0 0,
      0 0,
      -5px -5px,
      5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    forced-color-adjust: none;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow:
      inset 0 0 0 2px var(--sl-input-border-color),
      inset 0 0 0 4px var(--sl-color-neutral-0);
  }

  .color-dropdown__trigger--empty:before {
    background-color: transparent;
  }

  .color-dropdown__trigger:focus-visible {
    outline: none;
  }

  .color-dropdown__trigger:focus-visible:not(.color-dropdown__trigger--disabled) {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,qo=class extends Ot{constructor(){super(...arguments),this.formControlController=new Ze(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new ss(this,"[default]","prefix","suffix"),this.localize=new ze(this),this.hasFocus=0,this.invalid=0,this.title="",this.variant="default",this.size="medium",this.caret=0,this.disabled=0,this.loading=0,this.outline=0,this.pill=0,this.circle=0,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:Je}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=0,this.emit("sl-blur")}handleFocus(){this.hasFocus=1,this.emit("sl-focus")}handleClick(){"submit"===this.type&&this.formControlController.submit(this),"reset"===this.type&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(0),this.formControlController.emitInvalidEvent(t)}isButton(){return this.href?0:1}isLink(){return this.href?1:0}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():1}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():1}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?le`a`:le`button`;return he`
      <${e}
        part="base"
        class=${oe({button:1,"button--default":"default"===this.variant,"button--primary":"primary"===this.variant,"button--success":"success"===this.variant,"button--neutral":"neutral"===this.variant,"button--warning":"warning"===this.variant,"button--danger":"danger"===this.variant,"button--text":"text"===this.variant,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":"rtl"===this.localize.dir(),"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${de(t?void 0:this.disabled)}
        type=${de(t?void 0:this.type)}
        title=${this.title}
        name=${de(t?void 0:this.name)}
        value=${de(t?void 0:this.value)}
        href=${de(t&&!this.disabled?this.href:void 0)}
        target=${de(t?this.target:void 0)}
        download=${de(t?this.download:void 0)}
        rel=${de(t?this.rel:void 0)}
        role=${de(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?he` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?he`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};function Xo(t,e){(t=>"string"==typeof t&&-1!==t.indexOf(".")&&1===parseFloat(t))(t)&&(t="100%");const s=(t=>"string"==typeof t&&-1!==t.indexOf("%"))(t);return t=360===e?t:Math.min(e,Math.max(0,parseFloat(t))),s&&(t=parseInt(String(t*e),10)/100),Math.abs(t-e)<1e-6?1:t=360===e?(t<0?t%e+e:t%e)/parseFloat(String(e)):t%e/parseFloat(String(e))}function Yo(t){return Math.min(1,Math.max(0,t))}function Wo(t){return t=parseFloat(t),(isNaN(t)||t<0||t>1)&&(t=1),t}function Ko(t){return Number(t)<=1?100*Number(t)+"%":t}function Go(t){return 1===t.length?"0"+t:String(t)}function Qo(t,e,s){t=Xo(t,255),e=Xo(e,255),s=Xo(s,255);const i=Math.max(t,e,s),r=Math.min(t,e,s);let o=0,a=0;const n=(i+r)/2;if(i===r)a=0,o=0;else{const l=i-r;switch(a=n>.5?l/(2-i-r):l/(i+r),i){case t:o=(e-s)/l+(e<s?6:0);break;case e:o=(s-t)/l+2;break;case s:o=(t-e)/l+4}o/=6}return{h:o,s:a,l:n}}function Zo(t,e,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?t+6*s*(e-t):s<.5?e:s<2/3?t+(e-t)*(2/3-s)*6:t}function Jo(t,e,s){t=Xo(t,255),e=Xo(e,255),s=Xo(s,255);const i=Math.max(t,e,s),r=Math.min(t,e,s);let o=0;const a=i,n=i-r,l=0===i?0:n/i;if(i===r)o=0;else{switch(i){case t:o=(e-s)/n+(e<s?6:0);break;case e:o=(s-t)/n+2;break;case s:o=(t-e)/n+4}o/=6}return{h:o,s:l,v:a}}function ta(t,e,s,i){const r=[Go(Math.round(t).toString(16)),Go(Math.round(e).toString(16)),Go(Math.round(s).toString(16))];return i&&r[0].startsWith(r[0].charAt(1))&&r[1].startsWith(r[1].charAt(1))&&r[2].startsWith(r[2].charAt(1))?r[0].charAt(0)+r[1].charAt(0)+r[2].charAt(0):r.join("")}function ea(t,e,s){let i=1-t/255,r=1-e/255,o=1-s/255,a=Math.min(i,r,o);return 1===a?(i=0,r=0,o=0):(i=(i-a)/(1-a)*100,r=(r-a)/(1-a)*100,o=(o-a)/(1-a)*100),a*=100,{c:Math.round(i),m:Math.round(r),y:Math.round(o),k:Math.round(a)}}function sa(t){return Math.round(255*parseFloat(t)).toString(16)}function ia(t){return ra(t)/255}function ra(t){return parseInt(t,16)}qo.styles=[ct,Or],qo.dependencies={"sl-icon":se,"sl-spinner":Yi},xt([Bt(".button")],qo.prototype,"button",2),xt([Mt()],qo.prototype,"hasFocus",2),xt([Mt()],qo.prototype,"invalid",2),xt([Ct()],qo.prototype,"title",2),xt([Ct({reflect:1})],qo.prototype,"variant",2),xt([Ct({reflect:1})],qo.prototype,"size",2),xt([Ct({type:Boolean,reflect:1})],qo.prototype,"caret",2),xt([Ct({type:Boolean,reflect:1})],qo.prototype,"disabled",2),xt([Ct({type:Boolean,reflect:1})],qo.prototype,"loading",2),xt([Ct({type:Boolean,reflect:1})],qo.prototype,"outline",2),xt([Ct({type:Boolean,reflect:1})],qo.prototype,"pill",2),xt([Ct({type:Boolean,reflect:1})],qo.prototype,"circle",2),xt([Ct()],qo.prototype,"type",2),xt([Ct()],qo.prototype,"name",2),xt([Ct()],qo.prototype,"value",2),xt([Ct()],qo.prototype,"href",2),xt([Ct()],qo.prototype,"target",2),xt([Ct()],qo.prototype,"rel",2),xt([Ct()],qo.prototype,"download",2),xt([Ct()],qo.prototype,"form",2),xt([Ct({attribute:"formaction"})],qo.prototype,"formAction",2),xt([Ct({attribute:"formenctype"})],qo.prototype,"formEnctype",2),xt([Ct({attribute:"formmethod"})],qo.prototype,"formMethod",2),xt([Ct({attribute:"formnovalidate",type:Boolean})],qo.prototype,"formNoValidate",2),xt([Ct({attribute:"formtarget"})],qo.prototype,"formTarget",2),xt([Kt("disabled",{waitUntilFirstUpdate:1})],qo.prototype,"handleDisabledChange",1);const oa={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"};const aa="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",na="[\\s|\\(]+("+aa+")[,|\\s]+("+aa+")[,|\\s]+("+aa+")\\s*\\)?",la="[\\s|\\(]+("+aa+")[,|\\s]+("+aa+")[,|\\s]+("+aa+")[,|\\s]+("+aa+")\\s*\\)?",ca={CSS_UNIT:new RegExp(aa),rgb:new RegExp("rgb"+na),rgba:new RegExp("rgba"+la),hsl:new RegExp("hsl"+na),hsla:new RegExp("hsla"+la),hsv:new RegExp("hsv"+na),hsva:new RegExp("hsva"+la),cmyk:new RegExp("cmyk"+la),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function ha(t){return"number"==typeof t?!Number.isNaN(t):ca.CSS_UNIT.test(t)}class da{constructor(t="",e={}){if(t instanceof da)return t;"number"==typeof t&&(t=(t=>({r:t>>16,g:(65280&t)>>8,b:255&t}))(t)),this.originalInput=t;const s=function(t){let e={r:0,g:0,b:0},s=1,i=null,r=null,o=null,a=0,n=0;return"string"==typeof t&&(t=(t=>{if(0===(t=t.trim().toLowerCase()).length)return 0;let e=0;if(oa[t])t=oa[t],e=1;else if("transparent"===t)return{r:0,g:0,b:0,a:0,format:"name"};let s=ca.rgb.exec(t);return s?{r:s[1],g:s[2],b:s[3]}:(s=ca.rgba.exec(t),s?{r:s[1],g:s[2],b:s[3],a:s[4]}:(s=ca.hsl.exec(t),s?{h:s[1],s:s[2],l:s[3]}:(s=ca.hsla.exec(t),s?{h:s[1],s:s[2],l:s[3],a:s[4]}:(s=ca.hsv.exec(t),s?{h:s[1],s:s[2],v:s[3]}:(s=ca.hsva.exec(t),s?{h:s[1],s:s[2],v:s[3],a:s[4]}:(s=ca.cmyk.exec(t),s?{c:s[1],m:s[2],y:s[3],k:s[4]}:(s=ca.hex8.exec(t),s?{r:ra(s[1]),g:ra(s[2]),b:ra(s[3]),a:ia(s[4]),format:e?"name":"hex8"}:(s=ca.hex6.exec(t),s?{r:ra(s[1]),g:ra(s[2]),b:ra(s[3]),format:e?"name":"hex"}:(s=ca.hex4.exec(t),s?{r:ra(s[1]+s[1]),g:ra(s[2]+s[2]),b:ra(s[3]+s[3]),a:ia(s[4]+s[4]),format:e?"name":"hex8"}:(s=ca.hex3.exec(t),s?{r:ra(s[1]+s[1]),g:ra(s[2]+s[2]),b:ra(s[3]+s[3]),format:e?"name":"hex"}:0))))))))))})(t)),"object"==typeof t&&(ha(t.r)&&ha(t.g)&&ha(t.b)?(e=((t,e,s)=>({r:255*Xo(t,255),g:255*Xo(e,255),b:255*Xo(s,255)}))(t.r,t.g,t.b),a=1,n="%"===String(t.r).substr(-1)?"prgb":"rgb"):ha(t.h)&&ha(t.s)&&ha(t.v)?(i=Ko(t.s),r=Ko(t.v),e=((t,e,s)=>{t=6*Xo(t,360),e=Xo(e,100),s=Xo(s,100);const i=Math.floor(t),r=t-i,o=s*(1-e),a=s*(1-r*e),n=s*(1-(1-r)*e),l=i%6;return{r:255*[s,a,o,o,n,s][l],g:255*[n,s,s,a,o,o][l],b:255*[o,o,n,s,s,a][l]}})(t.h,i,r),a=1,n="hsv"):ha(t.h)&&ha(t.s)&&ha(t.l)?(i=Ko(t.s),o=Ko(t.l),e=((t,e,s)=>{let i,r,o;if(t=Xo(t,360),e=Xo(e,100),s=Xo(s,100),0===e)r=s,o=s,i=s;else{const a=s<.5?s*(1+e):s+e-s*e,n=2*s-a;i=Zo(n,a,t+1/3),r=Zo(n,a,t),o=Zo(n,a,t-1/3)}return{r:255*i,g:255*r,b:255*o}})(t.h,i,o),a=1,n="hsl"):ha(t.c)&&ha(t.m)&&ha(t.y)&&ha(t.k)&&(e=((t,e,s,i)=>{const r=i/100;return{r:255*(1-t/100)*(1-r),g:255*(1-e/100)*(1-r),b:255*(1-s/100)*(1-r)}})(t.c,t.m,t.y,t.k),a=1,n="cmyk"),Object.prototype.hasOwnProperty.call(t,"a")&&(s=t.a)),s=Wo(s),{ok:a,format:t.format||n,r:Math.min(255,Math.max(e.r,0)),g:Math.min(255,Math.max(e.g,0)),b:Math.min(255,Math.max(e.b,0)),a:s}}(t);this.originalInput=t,this.r=s.r,this.g=s.g,this.b=s.b,this.a=s.a,this.roundA=Math.round(100*this.a)/100,this.format=e.format??s.format,this.gradientType=e.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=s.ok}isDark(){return this.getBrightness()<128}isLight(){return!this.isDark()}getBrightness(){const t=this.toRgb();return(299*t.r+587*t.g+114*t.b)/1e3}getLuminance(){const t=this.toRgb();let e,s,i;const r=t.r/255,o=t.g/255,a=t.b/255;return e=r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4),s=o<=.03928?o/12.92:Math.pow((o+.055)/1.055,2.4),i=a<=.03928?a/12.92:Math.pow((a+.055)/1.055,2.4),.2126*e+.7152*s+.0722*i}getAlpha(){return this.a}setAlpha(t){return this.a=Wo(t),this.roundA=Math.round(100*this.a)/100,this}isMonochrome(){const{s:t}=this.toHsl();return 0===t}toHsv(){const t=Jo(this.r,this.g,this.b);return{h:360*t.h,s:t.s,v:t.v,a:this.a}}toHsvString(){const t=Jo(this.r,this.g,this.b),e=Math.round(360*t.h),s=Math.round(100*t.s),i=Math.round(100*t.v);return 1===this.a?`hsv(${e}, ${s}%, ${i}%)`:`hsva(${e}, ${s}%, ${i}%, ${this.roundA})`}toHsl(){const t=Qo(this.r,this.g,this.b);return{h:360*t.h,s:t.s,l:t.l,a:this.a}}toHslString(){const t=Qo(this.r,this.g,this.b),e=Math.round(360*t.h),s=Math.round(100*t.s),i=Math.round(100*t.l);return 1===this.a?`hsl(${e}, ${s}%, ${i}%)`:`hsla(${e}, ${s}%, ${i}%, ${this.roundA})`}toHex(t=0){return ta(this.r,this.g,this.b,t)}toHexString(t=0){return"#"+this.toHex(t)}toHex8(t=0){return((t,e,s,i,r)=>{const o=[Go(Math.round(t).toString(16)),Go(Math.round(e).toString(16)),Go(Math.round(s).toString(16)),Go(sa(i))];return r&&o[0].startsWith(o[0].charAt(1))&&o[1].startsWith(o[1].charAt(1))&&o[2].startsWith(o[2].charAt(1))&&o[3].startsWith(o[3].charAt(1))?o[0].charAt(0)+o[1].charAt(0)+o[2].charAt(0)+o[3].charAt(0):o.join("")})(this.r,this.g,this.b,this.a,t)}toHex8String(t=0){return"#"+this.toHex8(t)}toHexShortString(t=0){return 1===this.a?this.toHexString(t):this.toHex8String(t)}toRgb(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}}toRgbString(){const t=Math.round(this.r),e=Math.round(this.g),s=Math.round(this.b);return 1===this.a?`rgb(${t}, ${e}, ${s})`:`rgba(${t}, ${e}, ${s}, ${this.roundA})`}toPercentageRgb(){const t=t=>`${Math.round(100*Xo(t,255))}%`;return{r:t(this.r),g:t(this.g),b:t(this.b),a:this.a}}toPercentageRgbString(){const t=t=>Math.round(100*Xo(t,255));return 1===this.a?`rgb(${t(this.r)}%, ${t(this.g)}%, ${t(this.b)}%)`:`rgba(${t(this.r)}%, ${t(this.g)}%, ${t(this.b)}%, ${this.roundA})`}toCmyk(){return{...ea(this.r,this.g,this.b)}}toCmykString(){const{c:t,m:e,y:s,k:i}=ea(this.r,this.g,this.b);return`cmyk(${t}, ${e}, ${s}, ${i})`}toName(){if(0===this.a)return"transparent";if(this.a<1)return 0;const t="#"+ta(this.r,this.g,this.b,0);for(const[e,s]of Object.entries(oa))if(t===s)return e;return 0}toString(t){const e=Boolean(t);t=t??this.format;let s=0;const i=this.a<1&&this.a>=0;return e||!i||!t.startsWith("hex")&&"name"!==t?("rgb"===t&&(s=this.toRgbString()),"prgb"===t&&(s=this.toPercentageRgbString()),"hex"!==t&&"hex6"!==t||(s=this.toHexString()),"hex3"===t&&(s=this.toHexString(1)),"hex4"===t&&(s=this.toHex8String(1)),"hex8"===t&&(s=this.toHex8String()),"name"===t&&(s=this.toName()),"hsl"===t&&(s=this.toHslString()),"hsv"===t&&(s=this.toHsvString()),"cmyk"===t&&(s=this.toCmykString()),s||this.toHexString()):"name"===t&&0===this.a?this.toName():this.toRgbString()}toNumber(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)}clone(){return new da(this.toString())}lighten(t=10){const e=this.toHsl();return e.l+=t/100,e.l=Yo(e.l),new da(e)}brighten(t=10){const e=this.toRgb();return e.r=Math.max(0,Math.min(255,e.r-Math.round(-t/100*255))),e.g=Math.max(0,Math.min(255,e.g-Math.round(-t/100*255))),e.b=Math.max(0,Math.min(255,e.b-Math.round(-t/100*255))),new da(e)}darken(t=10){const e=this.toHsl();return e.l-=t/100,e.l=Yo(e.l),new da(e)}tint(t=10){return this.mix("white",t)}shade(t=10){return this.mix("black",t)}desaturate(t=10){const e=this.toHsl();return e.s-=t/100,e.s=Yo(e.s),new da(e)}saturate(t=10){const e=this.toHsl();return e.s+=t/100,e.s=Yo(e.s),new da(e)}greyscale(){return this.desaturate(100)}spin(t){const e=this.toHsl(),s=(e.h+t)%360;return e.h=s<0?360+s:s,new da(e)}mix(t,e=50){const s=this.toRgb(),i=new da(t).toRgb(),r=e/100,o={r:(i.r-s.r)*r+s.r,g:(i.g-s.g)*r+s.g,b:(i.b-s.b)*r+s.b,a:(i.a-s.a)*r+s.a};return new da(o)}analogous(t=6,e=30){const s=this.toHsl(),i=360/e,r=[this];for(s.h=(s.h-(i*t>>1)+720)%360;--t;)s.h=(s.h+i)%360,r.push(new da(s));return r}complement(){const t=this.toHsl();return t.h=(t.h+180)%360,new da(t)}monochromatic(t=6){const e=this.toHsv(),{h:s}=e,{s:i}=e;let{v:r}=e;const o=[],a=1/t;for(;t--;)o.push(new da({h:s,s:i,v:r})),r=(r+a)%1;return o}splitcomplement(){const t=this.toHsl(),{h:e}=t;return[this,new da({h:(e+72)%360,s:t.s,l:t.l}),new da({h:(e+216)%360,s:t.s,l:t.l})]}onBackground(t){const e=this.toRgb(),s=new da(t).toRgb(),i=e.a+s.a*(1-e.a);return new da({r:(e.r*e.a+s.r*s.a*(1-e.a))/i,g:(e.g*e.a+s.g*s.a*(1-e.a))/i,b:(e.b*e.a+s.b*s.a*(1-e.a))/i,a:i})}triad(){return this.polyad(3)}tetrad(){return this.polyad(4)}polyad(t){const e=this.toHsl(),{h:s}=e,i=[this],r=360/t;for(let o=1;o<t;o++)i.push(new da({h:(s+o*r)%360,s:e.s,l:e.l}));return i}equals(t){const e=new da(t);return"cmyk"===this.format||"cmyk"===e.format?this.toCmykString()===e.toCmykString():this.toRgbString()===e.toRgbString()}}var ua="EyeDropper"in window,pa=class extends Ot{constructor(){super(),this.formControlController=new Ze(this),this.isSafeValue=0,this.localize=new ze(this),this.hasFocus=0,this.isDraggingGridHandle=0,this.isEmpty=0,this.inputValue="",this.hue=0,this.saturation=100,this.brightness=100,this.alpha=100,this.value="",this.defaultValue="",this.label="",this.format="hex",this.inline=0,this.size="medium",this.noFormatToggle=0,this.name="",this.disabled=0,this.hoist=0,this.opacity=0,this.uppercase=0,this.swatches="",this.form="",this.required=0,this.handleFocusIn=()=>{this.hasFocus=1,this.emit("sl-focus")},this.handleFocusOut=()=>{this.hasFocus=0,this.emit("sl-blur")},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut)}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.input.updateComplete.then(()=>{this.formControlController.updateValidity()})}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",()=>{this.previewButton.classList.remove("color-picker__preview-color--copied")})}handleFormatToggle(){const t=["hex","rgb","hsl","hsv"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e],this.setColor(this.value),this.emit("sl-change"),this.emit("sl-input")}handleAlphaDrag(t){const e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),s=e.querySelector(".color-picker__slider-handle"),{width:i}=e.getBoundingClientRect();let r=this.value,o=this.value;s.focus(),t.preventDefault(),yr(e,{onMove:t=>{this.alpha=Zi(t/i*100,0,100),this.syncValues(),this.value!==o&&(o=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==r&&(r=this.value,this.emit("sl-change"))},initialEvent:t})}handleHueDrag(t){const e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),s=e.querySelector(".color-picker__slider-handle"),{width:i}=e.getBoundingClientRect();let r=this.value,o=this.value;s.focus(),t.preventDefault(),yr(e,{onMove:t=>{this.hue=Zi(t/i*360,0,360),this.syncValues(),this.value!==o&&(o=this.value,this.emit("sl-input"))},onStop:()=>{this.value!==r&&(r=this.value,this.emit("sl-change"))},initialEvent:t})}handleGridDrag(t){const e=this.shadowRoot.querySelector(".color-picker__grid"),s=e.querySelector(".color-picker__grid-handle"),{width:i,height:r}=e.getBoundingClientRect();let o=this.value,a=this.value;s.focus(),t.preventDefault(),this.isDraggingGridHandle=1,yr(e,{onMove:(t,e)=>{this.saturation=Zi(t/i*100,0,100),this.brightness=Zi(100-e/r*100,0,100),this.syncValues(),this.value!==a&&(a=this.value,this.emit("sl-input"))},onStop:()=>{this.isDraggingGridHandle=0,this.value!==o&&(o=this.value,this.emit("sl-change"))},initialEvent:t})}handleAlphaKeyDown(t){const e=t.shiftKey?10:1,s=this.value;"ArrowLeft"===t.key&&(t.preventDefault(),this.alpha=Zi(this.alpha-e,0,100),this.syncValues()),"ArrowRight"===t.key&&(t.preventDefault(),this.alpha=Zi(this.alpha+e,0,100),this.syncValues()),"Home"===t.key&&(t.preventDefault(),this.alpha=0,this.syncValues()),"End"===t.key&&(t.preventDefault(),this.alpha=100,this.syncValues()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input"))}handleHueKeyDown(t){const e=t.shiftKey?10:1,s=this.value;"ArrowLeft"===t.key&&(t.preventDefault(),this.hue=Zi(this.hue-e,0,360),this.syncValues()),"ArrowRight"===t.key&&(t.preventDefault(),this.hue=Zi(this.hue+e,0,360),this.syncValues()),"Home"===t.key&&(t.preventDefault(),this.hue=0,this.syncValues()),"End"===t.key&&(t.preventDefault(),this.hue=360,this.syncValues()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input"))}handleGridKeyDown(t){const e=t.shiftKey?10:1,s=this.value;"ArrowLeft"===t.key&&(t.preventDefault(),this.saturation=Zi(this.saturation-e,0,100),this.syncValues()),"ArrowRight"===t.key&&(t.preventDefault(),this.saturation=Zi(this.saturation+e,0,100),this.syncValues()),"ArrowUp"===t.key&&(t.preventDefault(),this.brightness=Zi(this.brightness+e,0,100),this.syncValues()),"ArrowDown"===t.key&&(t.preventDefault(),this.brightness=Zi(this.brightness-e,0,100),this.syncValues()),this.value!==s&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputChange(t){const e=t.target,s=this.value;t.stopPropagation(),this.input.value?(this.setColor(e.value),e.value=this.value):this.value="",this.value!==s&&(this.emit("sl-change"),this.emit("sl-input"))}handleInputInput(t){this.formControlController.updateValidity(),t.stopPropagation()}handleInputKeyDown(t){if("Enter"===t.key){const t=this.value;this.input.value?(this.setColor(this.input.value),this.input.value=this.value,this.value!==t&&(this.emit("sl-change"),this.emit("sl-input")),setTimeout(()=>this.input.select())):this.hue=0}}handleInputInvalid(t){this.formControlController.setValidity(0),this.formControlController.emitInvalidEvent(t)}handleTouchMove(t){t.preventDefault()}parseColor(t){const e=new da(t);if(!e.isValid)return null;const s=e.toHsl(),i={h:s.h,s:100*s.s,l:100*s.l,a:s.a},r=e.toRgb(),o=e.toHexString(),a=e.toHex8String(),n=e.toHsv(),l={h:n.h,s:100*n.s,v:100*n.v,a:n.a};return{hsl:{h:i.h,s:i.s,l:i.l,string:this.setLetterCase(`hsl(${Math.round(i.h)}, ${Math.round(i.s)}%, ${Math.round(i.l)}%)`)},hsla:{h:i.h,s:i.s,l:i.l,a:i.a,string:this.setLetterCase(`hsla(${Math.round(i.h)}, ${Math.round(i.s)}%, ${Math.round(i.l)}%, ${i.a.toFixed(2).toString()})`)},hsv:{h:l.h,s:l.s,v:l.v,string:this.setLetterCase(`hsv(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%)`)},hsva:{h:l.h,s:l.s,v:l.v,a:l.a,string:this.setLetterCase(`hsva(${Math.round(l.h)}, ${Math.round(l.s)}%, ${Math.round(l.v)}%, ${l.a.toFixed(2).toString()})`)},rgb:{r:r.r,g:r.g,b:r.b,string:this.setLetterCase(`rgb(${Math.round(r.r)}, ${Math.round(r.g)}, ${Math.round(r.b)})`)},rgba:{r:r.r,g:r.g,b:r.b,a:r.a,string:this.setLetterCase(`rgba(${Math.round(r.r)}, ${Math.round(r.g)}, ${Math.round(r.b)}, ${r.a.toFixed(2).toString()})`)},hex:this.setLetterCase(o),hexa:this.setLetterCase(a)}}setColor(t){const e=this.parseColor(t);return null===e?0:(this.hue=e.hsva.h,this.saturation=e.hsva.s,this.brightness=e.hsva.v,this.alpha=this.opacity?100*e.hsva.a:100,this.syncValues(),1)}setLetterCase(t){return"string"!=typeof t?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){const t=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);null!==t&&("hsl"===this.format?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:"rgb"===this.format?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:"hsv"===this.format?this.inputValue=this.opacity?t.hsva.string:t.hsv.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=1,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=0)}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied")}handleEyeDropper(){ua&&(new EyeDropper).open().then(t=>{const e=this.value;this.setColor(t.sRGBHex),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input"))}).catch(()=>{})}selectSwatch(t){const e=this.value;this.disabled||(this.setColor(t),this.value!==e&&(this.emit("sl-change"),this.emit("sl-input")))}getHexString(t,e,s,i=100){const r=new da(`hsva(${t}, ${e}%, ${s}%, ${i/100})`);return r.isValid?r.toHex8String():""}stopNestedEventPropagation(t){t.stopImmediatePropagation()}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}handleValueChange(t,e){if(this.isEmpty=!e,e||(this.hue=0,this.saturation=0,this.brightness=100,this.alpha=100),!this.isSafeValue){const s=this.parseColor(e);null!==s?(this.inputValue=this.value,this.hue=s.hsva.h,this.saturation=s.hsva.s,this.brightness=s.hsva.v,this.alpha=100*s.hsva.a,this.syncValues()):this.inputValue=null!=t?t:""}}focus(t){this.inline?this.base.focus(t):this.trigger.focus(t)}blur(){var t;const e=this.inline?this.base:this.trigger;this.hasFocus&&(e.focus({preventScroll:1}),e.blur()),(null==(t=this.dropdown)?void 0:t.open)&&this.dropdown.hide()}getFormattedValue(t="hex"){const e=this.parseColor(`hsva(${this.hue}, ${this.saturation}%, ${this.brightness}%, ${this.alpha/100})`);if(null===e)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;case"hsv":return e.hsv.string;case"hsva":return e.hsva.string;default:return""}}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.inline||this.validity.valid?this.input.reportValidity():(this.dropdown.show(),this.addEventListener("sl-after-show",()=>this.input.reportValidity(),{once:1}),this.disabled||this.formControlController.emitInvalidEvent(),0)}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.saturation,e=100-this.brightness,s=Array.isArray(this.swatches)?this.swatches:this.swatches.split(";").filter(t=>""!==t.trim()),i=j`
      <div
        part="base"
        class=${oe({"color-picker":1,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled,"color-picker--focused":this.hasFocus})}
        aria-disabled=${this.disabled?"true":"false"}
        aria-labelledby="label"
        tabindex=${this.inline?"0":"-1"}
      >
        ${this.inline?j`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            `:null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${rr({backgroundColor:this.getHexString(this.hue,100,100)})}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${oe({"color-picker__grid-handle":1,"color-picker__grid-handle--dragging":this.isDraggingGridHandle})}
            style=${rr({top:`${e}%`,left:`${t}%`,backgroundColor:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            role="application"
            aria-label="HSV"
            tabindex=${de(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle hue-slider-handle"
                class="color-picker__slider-handle"
                style=${rr({left:(0===this.hue?0:100/(360/this.hue))+"%"})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${de(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?j`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${rr({backgroundImage:`linear-gradient(\n                          to right,\n                          ${this.getHexString(this.hue,this.saturation,this.brightness,0)} 0%,\n                          ${this.getHexString(this.hue,this.saturation,this.brightness,100)} 100%\n                        )`})}
                    ></div>
                    <span
                      part="slider-handle opacity-slider-handle"
                      class="color-picker__slider-handle"
                      style=${rr({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${de(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${rr({"--preview-color":this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty?"":this.inputValue}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
            @sl-input=${this.handleInputInput}
            @sl-invalid=${this.handleInputInvalid}
            @sl-blur=${this.stopNestedEventPropagation}
            @sl-focus=${this.stopNestedEventPropagation}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":j`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${ua?j`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                    @sl-blur=${this.stopNestedEventPropagation}
                    @sl-focus=${this.stopNestedEventPropagation}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${s.length>0?j`
              <div part="swatches" class="color-picker__swatches">
                ${s.map(t=>{const e=this.parseColor(t);return e?j`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${de(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${t}
                      @click=${()=>this.selectSwatch(t)}
                      @keydown=${t=>!this.disabled&&"Enter"===t.key&&this.setColor(e.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${rr({backgroundColor:e.hexa})}
                      ></div>
                    </div>
                  `:""})}
              </div>
            `:""}
      </div>
    `;return this.inline?i:j`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containingElement=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${oe({"color-dropdown__trigger":1,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":"small"===this.size,"color-dropdown__trigger--medium":"medium"===this.size,"color-dropdown__trigger--large":"large"===this.size,"color-dropdown__trigger--empty":this.isEmpty,"color-dropdown__trigger--focused":this.hasFocus,"color-picker__transparent-bg":1})}
          style=${rr({color:this.getHexString(this.hue,this.saturation,this.brightness,this.alpha)})}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${i}
      </sl-dropdown>
    `}};pa.styles=[ct,Vo],pa.dependencies={"sl-button-group":jr,"sl-button":qo,"sl-dropdown":Oo,"sl-icon":se,"sl-input":Jr,"sl-visually-hidden":Et},xt([Bt('[part~="base"]')],pa.prototype,"base",2),xt([Bt('[part~="input"]')],pa.prototype,"input",2),xt([Bt(".color-dropdown")],pa.prototype,"dropdown",2),xt([Bt('[part~="preview"]')],pa.prototype,"previewButton",2),xt([Bt('[part~="trigger"]')],pa.prototype,"trigger",2),xt([Mt()],pa.prototype,"hasFocus",2),xt([Mt()],pa.prototype,"isDraggingGridHandle",2),xt([Mt()],pa.prototype,"isEmpty",2),xt([Mt()],pa.prototype,"inputValue",2),xt([Mt()],pa.prototype,"hue",2),xt([Mt()],pa.prototype,"saturation",2),xt([Mt()],pa.prototype,"brightness",2),xt([Mt()],pa.prototype,"alpha",2),xt([Ct()],pa.prototype,"value",2),xt([qe()],pa.prototype,"defaultValue",2),xt([Ct()],pa.prototype,"label",2),xt([Ct()],pa.prototype,"format",2),xt([Ct({type:Boolean,reflect:1})],pa.prototype,"inline",2),xt([Ct({reflect:1})],pa.prototype,"size",2),xt([Ct({attribute:"no-format-toggle",type:Boolean})],pa.prototype,"noFormatToggle",2),xt([Ct()],pa.prototype,"name",2),xt([Ct({type:Boolean,reflect:1})],pa.prototype,"disabled",2),xt([Ct({type:Boolean})],pa.prototype,"hoist",2),xt([Ct({type:Boolean})],pa.prototype,"opacity",2),xt([Ct({type:Boolean})],pa.prototype,"uppercase",2),xt([Ct()],pa.prototype,"swatches",2),xt([Ct({reflect:1})],pa.prototype,"form",2),xt([Ct({type:Boolean,reflect:1})],pa.prototype,"required",2),xt([At({passive:0})],pa.prototype,"handleTouchMove",1),xt([Kt("format",{waitUntilFirstUpdate:1})],pa.prototype,"handleFormatChange",1),xt([Kt("opacity",{waitUntilFirstUpdate:1})],pa.prototype,"handleOpacityChange",1),xt([Kt("value")],pa.prototype,"handleValueChange",1),pa.define("sl-color-picker"),Ut({tagName:"sl-color-picker",elementClass:pa,react:t,events:{onSlBlur:"sl-blur",onSlChange:"sl-change",onSlFocus:"sl-focus",onSlInput:"sl-input",onSlInvalid:"sl-invalid"},displayName:"SlColorPicker"});var fa=a`
  :host {
    --error-color: var(--sl-color-danger-600);
    --success-color: var(--sl-color-success-600);

    display: inline-block;
  }

  .copy-button__button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
  }

  .copy-button--success .copy-button__button {
    color: var(--success-color);
  }

  .copy-button--error .copy-button__button {
    color: var(--error-color);
  }

  .copy-button__button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .copy-button__button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }
`,ba=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.isCopying=0,this.status="rest",this.value="",this.from="",this.disabled=0,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top",this.hoist=0}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=1;let t=this.value;if(this.from){const e=this.getRootNode(),s=this.from.includes("."),i=this.from.includes("[")&&this.from.includes("]");let r=this.from,o="";s?[r,o]=this.from.trim().split("."):i&&([r,o]=this.from.trim().replace(/\]$/,"").split("["));const a="getElementById"in e?e.getElementById(r):null;a?t=i?a.getAttribute(o)||"":s?a[o]||"":a.textContent||"":(this.showStatus("error"),this.emit("sl-error"))}if(t)try{await navigator.clipboard.writeText(t),this.showStatus("success"),this.emit("sl-copy",{detail:{value:t}})}catch(t){this.showStatus("error"),this.emit("sl-error")}else this.showStatus("error"),this.emit("sl-error")}async showStatus(t){const e=this.copyLabel||this.localize.term("copy"),s=this.successLabel||this.localize.term("copied"),i=this.errorLabel||this.localize.term("error"),r="success"===t?this.successIcon:this.errorIcon,o=Ei(this,"copy.in",{dir:"ltr"}),a=Ei(this,"copy.out",{dir:"ltr"});this.tooltip.content="success"===t?s:i,await this.copyIcon.animate(a.keyframes,a.options).finished,this.copyIcon.hidden=1,this.status=t,r.hidden=0,await r.animate(o.keyframes,o.options).finished,setTimeout(async()=>{await r.animate(a.keyframes,a.options).finished,r.hidden=1,this.status="rest",this.copyIcon.hidden=0,await this.copyIcon.animate(o.keyframes,o.options).finished,this.tooltip.content=e,this.isCopying=0},this.feedbackDuration)}render(){const t=this.copyLabel||this.localize.term("copy");return j`
      <sl-tooltip
        class=${oe({"copy-button":1,"copy-button--success":"success"===this.status,"copy-button--error":"error"===this.status})}
        content=${t}
        placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        exportparts="
          base:tooltip__base,
          base__popup:tooltip__base__popup,
          base__arrow:tooltip__base__arrow,
          body:tooltip__body
        "
      >
        <button
          class="copy-button__button"
          part="button"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.handleCopy}
        >
          <slot part="copy-icon" name="copy-icon">
            <sl-icon library="system" name="copy"></sl-icon>
          </slot>
          <slot part="success-icon" name="success-icon" hidden>
            <sl-icon library="system" name="check"></sl-icon>
          </slot>
          <slot part="error-icon" name="error-icon" hidden>
            <sl-icon library="system" name="x-lg"></sl-icon>
          </slot>
        </button>
      </sl-tooltip>
    `}};ba.styles=[ct,fa],ba.dependencies={"sl-icon":se,"sl-tooltip":Pi},xt([Bt('slot[name="copy-icon"]')],ba.prototype,"copyIcon",2),xt([Bt('slot[name="success-icon"]')],ba.prototype,"successIcon",2),xt([Bt('slot[name="error-icon"]')],ba.prototype,"errorIcon",2),xt([Bt("sl-tooltip")],ba.prototype,"tooltip",2),xt([Mt()],ba.prototype,"isCopying",2),xt([Mt()],ba.prototype,"status",2),xt([Ct()],ba.prototype,"value",2),xt([Ct()],ba.prototype,"from",2),xt([Ct({type:Boolean,reflect:1})],ba.prototype,"disabled",2),xt([Ct({attribute:"copy-label"})],ba.prototype,"copyLabel",2),xt([Ct({attribute:"success-label"})],ba.prototype,"successLabel",2),xt([Ct({attribute:"error-label"})],ba.prototype,"errorLabel",2),xt([Ct({attribute:"feedback-duration",type:Number})],ba.prototype,"feedbackDuration",2),xt([Ct({attribute:"tooltip-placement"})],ba.prototype,"tooltipPlacement",2),xt([Ct({type:Boolean})],ba.prototype,"hoist",2),Oi("copy.in",{keyframes:[{scale:".25",opacity:".25"},{scale:"1",opacity:"1"}],options:{duration:100}}),Oi("copy.out",{keyframes:[{scale:"1",opacity:"1"},{scale:".25",opacity:"0"}],options:{duration:100}}),ba.define("sl-copy-button"),Ut({tagName:"sl-copy-button",elementClass:ba,react:t,events:{onSlCopy:"sl-copy",onSlError:"sl-error"},displayName:"SlCopyButton"});var ma=a`
  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
  }

  .details--open .details__summary-icon {
    rotate: 90deg;
  }

  .details--open.details--rtl .details__summary-icon {
    rotate: -90deg;
  }

  .details--open slot[name='expand-icon'],
  .details:not(.details--open) slot[name='collapse-icon'] {
    display: none;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
    padding: var(--sl-spacing-medium);
  }
`,ga=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.open=0,this.disabled=0}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=1),this.detailsObserver=new MutationObserver(t=>{for(const e of t)"attributes"===e.type&&"open"===e.attributeName&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:1})}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.detailsObserver)||t.disconnect()}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.open?this.hide():this.show()),"ArrowUp"!==t.key&&"ArrowLeft"!==t.key||(t.preventDefault(),this.hide()),"ArrowDown"!==t.key&&"ArrowRight"!==t.key||(t.preventDefault(),this.show())}async handleOpenChange(){if(this.open){if(this.details.open=1,this.emit("sl-show",{cancelable:1}).defaultPrevented)return this.open=0,void(this.details.open=0);await Li(this.body);const{keyframes:t,options:e}=Ei(this,"details.show",{dir:this.localize.dir()});await Di(this.body,Ri(t,this.body.scrollHeight),e),this.body.style.height="auto",this.emit("sl-after-show")}else{if(this.emit("sl-hide",{cancelable:1}).defaultPrevented)return this.details.open=1,void(this.open=1);await Li(this.body);const{keyframes:t,options:e}=Ei(this,"details.hide",{dir:this.localize.dir()});await Di(this.body,Ri(t,this.body.scrollHeight),e),this.body.style.height="auto",this.details.open=0,this.emit("sl-after-hide")}}async show(){if(!this.open&&!this.disabled)return this.open=1,Fi(this,"sl-after-show")}async hide(){if(this.open&&!this.disabled)return this.open=0,Fi(this,"sl-after-hide")}render(){const t="rtl"===this.localize.dir();return j`
      <details
        part="base"
        class=${oe({details:1,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":t})}
      >
        <summary
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="details__summary">${this.summary}</slot>

          <span part="summary-icon" class="details__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `}};ga.styles=[ct,ma],ga.dependencies={"sl-icon":se},xt([Bt(".details")],ga.prototype,"details",2),xt([Bt(".details__header")],ga.prototype,"header",2),xt([Bt(".details__body")],ga.prototype,"body",2),xt([Bt(".details__expand-icon-slot")],ga.prototype,"expandIconSlot",2),xt([Ct({type:Boolean,reflect:1})],ga.prototype,"open",2),xt([Ct()],ga.prototype,"summary",2),xt([Ct({type:Boolean,reflect:1})],ga.prototype,"disabled",2),xt([Kt("open",{waitUntilFirstUpdate:1})],ga.prototype,"handleOpenChange",1),Oi("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}}),Oi("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}}),ga.define("sl-details");var va=Ut({tagName:"sl-details",elementClass:ga,react:t,events:{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide"},displayName:"SlDetails"}),ya=a`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,wa=class extends Ot{constructor(){super(...arguments),this.hasSlotController=new ss(this,"footer"),this.localize=new ze(this),this.modal=new Mo(this),this.open=0,this.label="",this.noHeader=0,this.handleDocumentKeyDown=t=>{"Escape"===t.key&&this.modal.isActive()&&this.open&&(t.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),Oe(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),Ee(this),this.removeOpenListeners()}requestClose(t){if(this.emit("sl-request-close",{cancelable:1,detail:{source:t}}).defaultPrevented){const t=Ei(this,"dialog.denyClose",{dir:this.localize.dir()});return void Di(this.panel,t.keyframes,t.options)}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),Oe(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([Li(this.dialog),Li(this.overlay)]),this.dialog.hidden=0,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:1}).defaultPrevented||(t?t.focus({preventScroll:1}):this.panel.focus({preventScroll:1})),t&&t.setAttribute("autofocus","")});const e=Ei(this,"dialog.show",{dir:this.localize.dir()}),s=Ei(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([Di(this.panel,e.keyframes,e.options),Di(this.overlay,s.keyframes,s.options)]),this.emit("sl-after-show")}else{Ao(this),this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([Li(this.dialog),Li(this.overlay)]);const t=Ei(this,"dialog.hide",{dir:this.localize.dir()}),e=Ei(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([Di(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=1}),Di(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=1})]),this.dialog.hidden=1,this.overlay.hidden=0,this.panel.hidden=0,Ee(this);const s=this.originalTrigger;"function"==typeof(null==s?void 0:s.focus)&&setTimeout(()=>s.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=1,Fi(this,"sl-after-show")}async hide(){if(this.open)return this.open=0,Fi(this,"sl-after-hide")}render(){return j`
      <div
        part="base"
        class=${oe({dialog:1,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${de(this.noHeader?this.label:void 0)}
          aria-labelledby=${de(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":j`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};wa.styles=[ct,ya],wa.dependencies={"sl-icon-button":pe},xt([Bt(".dialog")],wa.prototype,"dialog",2),xt([Bt(".dialog__panel")],wa.prototype,"panel",2),xt([Bt(".dialog__overlay")],wa.prototype,"overlay",2),xt([Ct({type:Boolean,reflect:1})],wa.prototype,"open",2),xt([Ct({reflect:1})],wa.prototype,"label",2),xt([Ct({attribute:"no-header",type:Boolean,reflect:1})],wa.prototype,"noHeader",2),xt([Kt("open",{waitUntilFirstUpdate:1})],wa.prototype,"handleOpenChange",1),Oi("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),Oi("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}}),Oi("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}}),Oi("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}}),Oi("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}}),wa.define("sl-dialog"),Ut({tagName:"sl-dialog",elementClass:wa,react:t,events:{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide",onSlInitialFocus:"sl-initial-focus",onSlRequestClose:"sl-request-close"},displayName:"SlDialog"});var _a=a`
  :host {
    --control-box-size: 3rem;
    --icon-size: calc(var(--control-box-size) * 0.625);

    display: inline-flex;
    position: relative;
    cursor: pointer;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  img[aria-hidden='true'] {
    display: none;
  }

  .animated-image__control-box {
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: calc(50% - var(--control-box-size) / 2);
    right: calc(50% - var(--control-box-size) / 2);
    width: var(--control-box-size);
    height: var(--control-box-size);
    font-size: var(--icon-size);
    background: none;
    border: solid 2px currentColor;
    background-color: rgb(0 0 0 /50%);
    border-radius: var(--sl-border-radius-circle);
    color: white;
    pointer-events: none;
    transition: var(--sl-transition-fast) opacity;
  }

  :host([play]:hover) .animated-image__control-box {
    opacity: 1;
  }

  :host([play]:not(:hover)) .animated-image__control-box {
    opacity: 0;
  }

  :host([play]) slot[name='play-icon'],
  :host(:not([play])) slot[name='pause-icon'] {
    display: none;
  }
`,xa=class extends Ot{constructor(){super(...arguments),this.isLoaded=0}handleClick(){this.play=!this.play}handleLoad(){const t=document.createElement("canvas"),{width:e,height:s}=this.animatedImage;t.width=e,t.height=s,t.getContext("2d").drawImage(this.animatedImage,0,0,e,s),this.frozenFrame=t.toDataURL("image/gif"),this.isLoaded||(this.emit("sl-load"),this.isLoaded=1)}handleError(){this.emit("sl-error")}handlePlayChange(){this.play&&(this.animatedImage.src="",this.animatedImage.src=this.src)}handleSrcChange(){this.isLoaded=0}render(){return j`
      <div class="animated-image">
        <img
          class="animated-image__animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play?"false":"true"}
          @click=${this.handleClick}
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded?j`
              <img
                class="animated-image__frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play?"true":"false"}
                @click=${this.handleClick}
              />

              <div part="control-box" class="animated-image__control-box">
                <slot name="play-icon"><sl-icon name="play-fill" library="system"></sl-icon></slot>
                <slot name="pause-icon"><sl-icon name="pause-fill" library="system"></sl-icon></slot>
              </div>
            `:""}
      </div>
    `}};xa.styles=[ct,_a],xa.dependencies={"sl-icon":se},xt([Bt(".animated-image__animated")],xa.prototype,"animatedImage",2),xt([Mt()],xa.prototype,"frozenFrame",2),xt([Mt()],xa.prototype,"isLoaded",2),xt([Ct()],xa.prototype,"src",2),xt([Ct()],xa.prototype,"alt",2),xt([Ct({type:Boolean,reflect:1})],xa.prototype,"play",2),xt([Kt("play",{waitUntilFirstUpdate:1})],xa.prototype,"handlePlayChange",1),xt([Kt("src")],xa.prototype,"handleSrcChange",1),xa.define("sl-animated-image"),Ut({tagName:"sl-animated-image",elementClass:xa,react:t,events:{onSlLoad:"sl-load",onSlError:"sl-error"},displayName:"SlAnimatedImage"});const ka={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInSine:"cubic-bezier(0.47, 0, 0.745, 0.715)",easeOutSine:"cubic-bezier(0.39, 0.575, 0.565, 1)",easeInOutSine:"cubic-bezier(0.445, 0.05, 0.55, 0.95)",easeInQuad:"cubic-bezier(0.55, 0.085, 0.68, 0.53)",easeOutQuad:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",easeInOutQuad:"cubic-bezier(0.455, 0.03, 0.515, 0.955)",easeInCubic:"cubic-bezier(0.55, 0.055, 0.675, 0.19)",easeOutCubic:"cubic-bezier(0.215, 0.61, 0.355, 1)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1)",easeInQuart:"cubic-bezier(0.895, 0.03, 0.685, 0.22)",easeOutQuart:"cubic-bezier(0.165, 0.84, 0.44, 1)",easeInOutQuart:"cubic-bezier(0.77, 0, 0.175, 1)",easeInQuint:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",easeOutQuint:"cubic-bezier(0.23, 1, 0.32, 1)",easeInOutQuint:"cubic-bezier(0.86, 0, 0.07, 1)",easeInExpo:"cubic-bezier(0.95, 0.05, 0.795, 0.035)",easeOutExpo:"cubic-bezier(0.19, 1, 0.22, 1)",easeInOutExpo:"cubic-bezier(1, 0, 0, 1)",easeInCirc:"cubic-bezier(0.6, 0.04, 0.98, 0.335)",easeOutCirc:"cubic-bezier(0.075, 0.82, 0.165, 1)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.15, 0.86)",easeInBack:"cubic-bezier(0.6, -0.28, 0.735, 0.045)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",easeInOutBack:"cubic-bezier(0.68, -0.55, 0.265, 1.55)"},$a=Object.freeze(Object.defineProperty({__proto__:null,backInDown:[{offset:0,transform:"translateY(-1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],backInLeft:[{offset:0,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],backInRight:[{offset:0,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],backInUp:[{offset:0,transform:"translateY(1200px) scale(0.7)",opacity:"0.7"},{offset:.8,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"scale(1)",opacity:"1"}],backOutDown:[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(700px) scale(0.7)",opacity:"0.7"}],backOutLeft:[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(-2000px) scale(0.7)",opacity:"0.7"}],backOutRight:[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateX(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateX(2000px) scale(0.7)",opacity:"0.7"}],backOutUp:[{offset:0,transform:"scale(1)",opacity:"1"},{offset:.2,transform:"translateY(0px) scale(0.7)",opacity:"0.7"},{offset:1,transform:"translateY(-700px) scale(0.7)",opacity:"0.7"}],bounce:[{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.4,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.43,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -30px, 0) scaleY(1.1)"},{offset:.53,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"},{offset:.7,easing:"cubic-bezier(0.755, 0.05, 0.855, 0.06)",transform:"translate3d(0, -15px, 0) scaleY(1.05)"},{offset:.8,"transition-timing-function":"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0) scaleY(0.95)"},{offset:.9,transform:"translate3d(0, -4px, 0) scaleY(1.02)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)",transform:"translate3d(0, 0, 0)"}],bounceIn:[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.2,transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.2,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.4,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.4,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"scale3d(1.03, 1.03, 1.03)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.8,transform:"scale3d(0.97, 0.97, 0.97)"},{offset:.8,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,opacity:"1",transform:"scale3d(1, 1, 1)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],bounceInDown:[{offset:0,opacity:"0",transform:"translate3d(0, -3000px, 0) scaleY(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, 25px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, -10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, 5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],bounceInLeft:[{offset:0,opacity:"0",transform:"translate3d(-3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(-10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],bounceInRight:[{offset:0,opacity:"0",transform:"translate3d(3000px, 0, 0) scaleX(3)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(-25px, 0, 0) scaleX(1)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(10px, 0, 0) scaleX(0.98)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(-5px, 0, 0) scaleX(0.995)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],bounceInUp:[{offset:0,opacity:"0",transform:"translate3d(0, 3000px, 0) scaleY(5)"},{offset:0,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.6,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.6,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.75,transform:"translate3d(0, 10px, 0) scaleY(0.95)"},{offset:.75,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:.9,transform:"translate3d(0, -5px, 0) scaleY(0.985)"},{offset:.9,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"},{offset:1,transform:"translate3d(0, 0, 0)"},{offset:1,easing:"cubic-bezier(0.215, 0.61, 0.355, 1)"}],bounceOut:[{offset:.2,transform:"scale3d(0.9, 0.9, 0.9)"},{offset:.5,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:.55,opacity:"1",transform:"scale3d(1.1, 1.1, 1.1)"},{offset:1,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"}],bounceOutDown:[{offset:.2,transform:"translate3d(0, 10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, -20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0) scaleY(3)"}],bounceOutLeft:[{offset:.2,opacity:"1",transform:"translate3d(20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0) scaleX(2)"}],bounceOutRight:[{offset:.2,opacity:"1",transform:"translate3d(-20px, 0, 0) scaleX(0.9)"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0) scaleX(2)"}],bounceOutUp:[{offset:.2,transform:"translate3d(0, -10px, 0) scaleY(0.985)"},{offset:.4,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:.45,opacity:"1",transform:"translate3d(0, 20px, 0) scaleY(0.9)"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0) scaleY(3)"}],easings:ka,fadeIn:[{offset:0,opacity:"0"},{offset:1,opacity:"1"}],fadeInBottomLeft:[{offset:0,opacity:"0",transform:"translate3d(-100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInBottomRight:[{offset:0,opacity:"0",transform:"translate3d(100%, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInDown:[{offset:0,opacity:"0",transform:"translate3d(0, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInDownBig:[{offset:0,opacity:"0",transform:"translate3d(0, -2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInLeft:[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInLeftBig:[{offset:0,opacity:"0",transform:"translate3d(-2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInRight:[{offset:0,opacity:"0",transform:"translate3d(100%, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInRightBig:[{offset:0,opacity:"0",transform:"translate3d(2000px, 0, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInTopLeft:[{offset:0,opacity:"0",transform:"translate3d(-100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInTopRight:[{offset:0,opacity:"0",transform:"translate3d(100%, -100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInUp:[{offset:0,opacity:"0",transform:"translate3d(0, 100%, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeInUpBig:[{offset:0,opacity:"0",transform:"translate3d(0, 2000px, 0)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],fadeOut:[{offset:0,opacity:"1"},{offset:1,opacity:"0"}],fadeOutBottomLeft:[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, 100%, 0)"}],fadeOutBottomRight:[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, 100%, 0)"}],fadeOutDown:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 100%, 0)"}],fadeOutDownBig:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, 2000px, 0)"}],fadeOutLeft:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-100%, 0, 0)"}],fadeOutLeftBig:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(-2000px, 0, 0)"}],fadeOutRight:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0)"}],fadeOutRightBig:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(2000px, 0, 0)"}],fadeOutTopLeft:[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(-100%, -100%, 0)"}],fadeOutTopRight:[{offset:0,opacity:"1",transform:"translate3d(0, 0, 0)"},{offset:1,opacity:"0",transform:"translate3d(100%, -100%, 0)"}],fadeOutUp:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -100%, 0)"}],fadeOutUpBig:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(0, -2000px, 0)"}],flash:[{offset:0,opacity:"1"},{offset:.25,opacity:"0"},{offset:.5,opacity:"1"},{offset:.75,opacity:"0"},{offset:1,opacity:"1"}],flip:[{offset:0,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)",easing:"ease-out"},{offset:.4,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -190deg)",easing:"ease-out"},{offset:.5,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\n      rotate3d(0, 1, 0, -170deg)",easing:"ease-in"},{offset:.8,transform:"perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\n      rotate3d(0, 1, 0, 0deg)",easing:"ease-in"},{offset:1,transform:"perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)",easing:"ease-in"}],flipInX:[{offset:0,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(1, 0, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(1, 0, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],flipInY:[{offset:0,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",easing:"ease-in",opacity:"0"},{offset:.4,transform:"perspective(400px) rotate3d(0, 1, 0, -20deg)",easing:"ease-in"},{offset:.6,transform:"perspective(400px) rotate3d(0, 1, 0, 10deg)",opacity:"1"},{offset:.8,transform:"perspective(400px) rotate3d(0, 1, 0, -5deg)"},{offset:1,transform:"perspective(400px)"}],flipOutX:[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(1, 0, 0, -20deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(1, 0, 0, 90deg)",opacity:"0"}],flipOutY:[{offset:0,transform:"perspective(400px)"},{offset:.3,transform:"perspective(400px) rotate3d(0, 1, 0, -15deg)",opacity:"1"},{offset:1,transform:"perspective(400px) rotate3d(0, 1, 0, 90deg)",opacity:"0"}],headShake:[{offset:0,transform:"translateX(0)"},{offset:.065,transform:"translateX(-6px) rotateY(-9deg)"},{offset:.185,transform:"translateX(5px) rotateY(7deg)"},{offset:.315,transform:"translateX(-3px) rotateY(-5deg)"},{offset:.435,transform:"translateX(2px) rotateY(3deg)"},{offset:.5,transform:"translateX(0)"}],heartBeat:[{offset:0,transform:"scale(1)"},{offset:.14,transform:"scale(1.3)"},{offset:.28,transform:"scale(1)"},{offset:.42,transform:"scale(1.3)"},{offset:.7,transform:"scale(1)"}],hinge:[{offset:0,easing:"ease-in-out"},{offset:.2,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.4,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:.6,transform:"rotate3d(0, 0, 1, 80deg)",easing:"ease-in-out"},{offset:.8,transform:"rotate3d(0, 0, 1, 60deg)",easing:"ease-in-out",opacity:"1"},{offset:1,transform:"translate3d(0, 700px, 0)",opacity:"0"}],jackInTheBox:[{offset:0,opacity:"0",transform:"scale(0.1) rotate(30deg)","transform-origin":"center bottom"},{offset:.5,transform:"rotate(-10deg)"},{offset:.7,transform:"rotate(3deg)"},{offset:1,opacity:"1",transform:"scale(1)"}],jello:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.111,transform:"translate3d(0, 0, 0)"},{offset:.222,transform:"skewX(-12.5deg) skewY(-12.5deg)"},{offset:.33299999999999996,transform:"skewX(6.25deg) skewY(6.25deg)"},{offset:.444,transform:"skewX(-3.125deg) skewY(-3.125deg)"},{offset:.555,transform:"skewX(1.5625deg) skewY(1.5625deg)"},{offset:.6659999999999999,transform:"skewX(-0.78125deg) skewY(-0.78125deg)"},{offset:.777,transform:"skewX(0.390625deg) skewY(0.390625deg)"},{offset:.888,transform:"skewX(-0.1953125deg) skewY(-0.1953125deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],lightSpeedInLeft:[{offset:0,transform:"translate3d(-100%, 0, 0) skewX(30deg)",opacity:"0"},{offset:.6,transform:"skewX(-20deg)",opacity:"1"},{offset:.8,transform:"skewX(5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],lightSpeedInRight:[{offset:0,transform:"translate3d(100%, 0, 0) skewX(-30deg)",opacity:"0"},{offset:.6,transform:"skewX(20deg)",opacity:"1"},{offset:.8,transform:"skewX(-5deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],lightSpeedOutLeft:[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(-100%, 0, 0) skewX(-30deg)",opacity:"0"}],lightSpeedOutRight:[{offset:0,opacity:"1"},{offset:1,transform:"translate3d(100%, 0, 0) skewX(30deg)",opacity:"0"}],pulse:[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.5,transform:"scale3d(1.05, 1.05, 1.05)"},{offset:1,transform:"scale3d(1, 1, 1)"}],rollIn:[{offset:0,opacity:"0",transform:"translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)"},{offset:1,opacity:"1",transform:"translate3d(0, 0, 0)"}],rollOut:[{offset:0,opacity:"1"},{offset:1,opacity:"0",transform:"translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)"}],rotateIn:[{offset:0,transform:"rotate3d(0, 0, 1, -200deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],rotateInDownLeft:[{offset:0,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],rotateInDownRight:[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],rotateInUpLeft:[{offset:0,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],rotateInUpRight:[{offset:0,transform:"rotate3d(0, 0, 1, -90deg)",opacity:"0"},{offset:1,transform:"translate3d(0, 0, 0)",opacity:"1"}],rotateOut:[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 200deg)",opacity:"0"}],rotateOutDownLeft:[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 45deg)",opacity:"0"}],rotateOutDownRight:[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],rotateOutUpLeft:[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, -45deg)",opacity:"0"}],rotateOutUpRight:[{offset:0,opacity:"1"},{offset:1,transform:"rotate3d(0, 0, 1, 90deg)",opacity:"0"}],rubberBand:[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.3,transform:"scale3d(1.25, 0.75, 1)"},{offset:.4,transform:"scale3d(0.75, 1.25, 1)"},{offset:.5,transform:"scale3d(1.15, 0.85, 1)"},{offset:.65,transform:"scale3d(0.95, 1.05, 1)"},{offset:.75,transform:"scale3d(1.05, 0.95, 1)"},{offset:1,transform:"scale3d(1, 1, 1)"}],shake:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],shakeX:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(-10px, 0, 0)"},{offset:.2,transform:"translate3d(10px, 0, 0)"},{offset:.3,transform:"translate3d(-10px, 0, 0)"},{offset:.4,transform:"translate3d(10px, 0, 0)"},{offset:.5,transform:"translate3d(-10px, 0, 0)"},{offset:.6,transform:"translate3d(10px, 0, 0)"},{offset:.7,transform:"translate3d(-10px, 0, 0)"},{offset:.8,transform:"translate3d(10px, 0, 0)"},{offset:.9,transform:"translate3d(-10px, 0, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],shakeY:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.1,transform:"translate3d(0, -10px, 0)"},{offset:.2,transform:"translate3d(0, 10px, 0)"},{offset:.3,transform:"translate3d(0, -10px, 0)"},{offset:.4,transform:"translate3d(0, 10px, 0)"},{offset:.5,transform:"translate3d(0, -10px, 0)"},{offset:.6,transform:"translate3d(0, 10px, 0)"},{offset:.7,transform:"translate3d(0, -10px, 0)"},{offset:.8,transform:"translate3d(0, 10px, 0)"},{offset:.9,transform:"translate3d(0, -10px, 0)"},{offset:1,transform:"translate3d(0, 0, 0)"}],slideInDown:[{offset:0,transform:"translate3d(0, -100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],slideInLeft:[{offset:0,transform:"translate3d(-100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],slideInRight:[{offset:0,transform:"translate3d(100%, 0, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],slideInUp:[{offset:0,transform:"translate3d(0, 100%, 0)",visibility:"visible"},{offset:1,transform:"translate3d(0, 0, 0)"}],slideOutDown:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, 100%, 0)"}],slideOutLeft:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(-100%, 0, 0)"}],slideOutRight:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(100%, 0, 0)"}],slideOutUp:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:1,visibility:"hidden",transform:"translate3d(0, -100%, 0)"}],swing:[{offset:.2,transform:"rotate3d(0, 0, 1, 15deg)"},{offset:.4,transform:"rotate3d(0, 0, 1, -10deg)"},{offset:.6,transform:"rotate3d(0, 0, 1, 5deg)"},{offset:.8,transform:"rotate3d(0, 0, 1, -5deg)"},{offset:1,transform:"rotate3d(0, 0, 1, 0deg)"}],tada:[{offset:0,transform:"scale3d(1, 1, 1)"},{offset:.1,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.2,transform:"scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)"},{offset:.3,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.4,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.5,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.6,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.7,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:.8,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)"},{offset:.9,transform:"scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)"},{offset:1,transform:"scale3d(1, 1, 1)"}],wobble:[{offset:0,transform:"translate3d(0, 0, 0)"},{offset:.15,transform:"translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)"},{offset:.3,transform:"translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)"},{offset:.45,transform:"translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)"},{offset:.6,transform:"translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)"},{offset:.75,transform:"translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)"},{offset:1,transform:"translate3d(0, 0, 0)"}],zoomIn:[{offset:0,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:.5,opacity:"1"}],zoomInDown:[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],zoomInLeft:[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],zoomInRight:[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],zoomInUp:[{offset:0,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:.6,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],zoomOut:[{offset:0,opacity:"1"},{offset:.5,opacity:"0",transform:"scale3d(0.3, 0.3, 0.3)"},{offset:1,opacity:"0"}],zoomOutDown:[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}],zoomOutLeft:[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(-2000px, 0, 0)"}],zoomOutRight:[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)"},{offset:1,opacity:"0",transform:"scale(0.1) translate3d(2000px, 0, 0)"}],zoomOutUp:[{offset:.4,opacity:"1",transform:"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",easing:"cubic-bezier(0.55, 0.055, 0.675, 0.19)"},{offset:1,opacity:"0",transform:"scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)",easing:"cubic-bezier(0.175, 0.885, 0.32, 1)"}]},Symbol.toStringTag,{value:"Module"}));var za=a`
  :host {
    display: contents;
  }
`,Sa=class extends Ot{constructor(){super(...arguments),this.hasStarted=0,this.name="none",this.play=0,this.delay=0,this.direction="normal",this.duration=1e3,this.easing="linear",this.endDelay=0,this.fill="auto",this.iterations=1/0,this.iterationStart=0,this.playbackRate=1,this.handleAnimationFinish=()=>{this.play=0,this.hasStarted=0,this.emit("sl-finish")},this.handleAnimationCancel=()=>{this.play=0,this.hasStarted=0,this.emit("sl-cancel")}}get currentTime(){var t,e;return null!=(e=null==(t=this.animation)?void 0:t.currentTime)?e:0}set currentTime(t){this.animation&&(this.animation.currentTime=t)}connectedCallback(){super.connectedCallback(),this.createAnimation()}disconnectedCallback(){super.disconnectedCallback(),this.destroyAnimation()}handleSlotChange(){this.destroyAnimation(),this.createAnimation()}async createAnimation(){var t,e;const s=null!=(t=ka[this.easing])?t:this.easing,i=null!=(e=this.keyframes)?e:$a[this.name],r=(await this.defaultSlot).assignedElements()[0];return r&&i?(this.destroyAnimation(),this.animation=r.animate(i,{delay:this.delay,direction:this.direction,duration:this.duration,easing:s,endDelay:this.endDelay,fill:this.fill,iterationStart:this.iterationStart,iterations:this.iterations}),this.animation.playbackRate=this.playbackRate,this.animation.addEventListener("cancel",this.handleAnimationCancel),this.animation.addEventListener("finish",this.handleAnimationFinish),this.play?(this.hasStarted=1,this.emit("sl-start")):this.animation.pause(),1):0}destroyAnimation(){this.animation&&(this.animation.cancel(),this.animation.removeEventListener("cancel",this.handleAnimationCancel),this.animation.removeEventListener("finish",this.handleAnimationFinish),this.hasStarted=0)}handleAnimationChange(){this.hasUpdated&&this.createAnimation()}handlePlayChange(){return this.animation?(this.play&&!this.hasStarted&&(this.hasStarted=1,this.emit("sl-start")),this.play?this.animation.play():this.animation.pause(),1):0}handlePlaybackRateChange(){this.animation&&(this.animation.playbackRate=this.playbackRate)}cancel(){var t;null==(t=this.animation)||t.cancel()}finish(){var t;null==(t=this.animation)||t.finish()}render(){return j` <slot @slotchange=${this.handleSlotChange}></slot> `}};Sa.styles=[ct,za],xt([(t,e)=>Nt(t,e,{async get(){return await this.updateComplete,this.renderRoot?.querySelector("slot")??null}})],Sa.prototype,"defaultSlot",2),xt([Ct()],Sa.prototype,"name",2),xt([Ct({type:Boolean,reflect:1})],Sa.prototype,"play",2),xt([Ct({type:Number})],Sa.prototype,"delay",2),xt([Ct()],Sa.prototype,"direction",2),xt([Ct({type:Number})],Sa.prototype,"duration",2),xt([Ct()],Sa.prototype,"easing",2),xt([Ct({attribute:"end-delay",type:Number})],Sa.prototype,"endDelay",2),xt([Ct()],Sa.prototype,"fill",2),xt([Ct({type:Number})],Sa.prototype,"iterations",2),xt([Ct({attribute:"iteration-start",type:Number})],Sa.prototype,"iterationStart",2),xt([Ct({attribute:0})],Sa.prototype,"keyframes",2),xt([Ct({attribute:"playback-rate",type:Number})],Sa.prototype,"playbackRate",2),xt([Kt(["name","delay","direction","duration","easing","endDelay","fill","iterations","iterationsStart","keyframes"])],Sa.prototype,"handleAnimationChange",1),xt([Kt("play")],Sa.prototype,"handlePlayChange",1),xt([Kt("playbackRate")],Sa.prototype,"handlePlaybackRateChange",1),Sa.define("sl-animation"),Ut({tagName:"sl-animation",elementClass:Sa,react:t,events:{onSlCancel:"sl-cancel",onSlFinish:"sl-finish",onSlStart:"sl-start"},displayName:"SlAnimation"});var Ca=a`
  :host {
    display: inline-block;

    --size: 3rem;
  }

  .avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: var(--size);
    height: var(--size);
    background-color: var(--sl-color-neutral-400);
    font-family: var(--sl-font-sans);
    font-size: calc(var(--size) * 0.5);
    font-weight: var(--sl-font-weight-normal);
    color: var(--sl-color-neutral-0);
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
  }

  .avatar--circle,
  .avatar--circle .avatar__image {
    border-radius: var(--sl-border-radius-circle);
  }

  .avatar--rounded,
  .avatar--rounded .avatar__image {
    border-radius: var(--sl-border-radius-medium);
  }

  .avatar--square {
    border-radius: 0;
  }

  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .avatar__initials {
    line-height: 1;
    text-transform: uppercase;
  }

  .avatar__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
`,Ma=class extends Ot{constructor(){super(...arguments),this.hasError=0,this.image="",this.label="",this.initials="",this.loading="eager",this.shape="circle"}handleImageChange(){this.hasError=0}handleImageLoadError(){this.hasError=1,this.emit("sl-error")}render(){const t=j`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${this.handleImageLoadError}"
      />
    `;let e=j``;return e=this.initials?j`<div part="initials" class="avatar__initials">${this.initials}</div>`:j`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <sl-icon name="person-fill" library="system"></sl-icon>
          </slot>
        </div>
      `,j`
      <div
        part="base"
        class=${oe({avatar:1,"avatar--circle":"circle"===this.shape,"avatar--rounded":"rounded"===this.shape,"avatar--square":"square"===this.shape})}
        role="img"
        aria-label=${this.label}
      >
        ${this.image&&!this.hasError?t:e}
      </div>
    `}};Ma.styles=[ct,Ca],Ma.dependencies={"sl-icon":se},xt([Mt()],Ma.prototype,"hasError",2),xt([Ct()],Ma.prototype,"image",2),xt([Ct()],Ma.prototype,"label",2),xt([Ct()],Ma.prototype,"initials",2),xt([Ct()],Ma.prototype,"loading",2),xt([Ct({reflect:1})],Ma.prototype,"shape",2),xt([Kt("image")],Ma.prototype,"handleImageChange",1),Ma.define("sl-avatar"),Ut({tagName:"sl-avatar",elementClass:Ma,react:t,events:{onSlError:"sl-error"},displayName:"SlAvatar"});var Aa=a`
  .breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
`,Na=class extends Ot{constructor(){super(...arguments),this.localize=new ze(this),this.separatorDir=this.localize.dir(),this.label=""}getSeparator(){const t=this.separatorSlot.assignedElements({flatten:1})[0].cloneNode(1);return[t,...t.querySelectorAll("[id]")].forEach(t=>t.removeAttribute("id")),t.setAttribute("data-default",""),t.slot="separator",t}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:1})].filter(t=>"sl-breadcrumb-item"===t.tagName.toLowerCase());t.forEach((e,s)=>{const i=e.querySelector('[slot="separator"]');null===i?e.append(this.getSeparator()):i.hasAttribute("data-default")&&i.replaceWith(this.getSeparator()),s===t.length-1?e.setAttribute("aria-current","page"):e.removeAttribute("aria-current")})}render(){return this.separatorDir!==this.localize.dir()&&(this.separatorDir=this.localize.dir(),this.updateComplete.then(()=>this.handleSlotChange())),j`
      <nav part="base" class="breadcrumb" aria-label=${this.label}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </nav>

      <span hidden aria-hidden="true">
        <slot name="separator">
          <sl-icon name=${"rtl"===this.localize.dir()?"chevron-left":"chevron-right"} library="system"></sl-icon>
        </slot>
      </span>
    `}};Na.styles=[ct,Aa],Na.dependencies={"sl-icon":se},xt([Bt("slot")],Na.prototype,"defaultSlot",2),xt([Bt('slot[name="separator"]')],Na.prototype,"separatorSlot",2),xt([Ct()],Na.prototype,"label",2),Na.define("sl-breadcrumb"),Ut({tagName:"sl-breadcrumb",elementClass:Na,react:t,events:{},displayName:"SlBreadcrumb"}),qo.define("sl-button");var Ba=Ut({tagName:"sl-button",elementClass:qo,react:t,events:{onSlBlur:"sl-blur",onSlFocus:"sl-focus",onSlInvalid:"sl-invalid"},displayName:"SlButton"}),Ia=a`
  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-600);
    line-height: var(--sl-line-height-normal);
    white-space: nowrap;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--sl-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: var(--sl-color-primary-600);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: var(--sl-color-primary-500);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: var(--sl-color-primary-600);
  }

  .breadcrumb-item__label:focus {
    outline: none;
  }

  .breadcrumb-item__label:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-inline-start: var(--sl-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--sl-spacing-x-small);
    user-select: none;
    -webkit-user-select: none;
  }
`,Oa=class extends Ot{constructor(){super(...arguments),this.hasSlotController=new ss(this,"prefix","suffix"),this.renderType="button",this.rel="noreferrer noopener"}setRenderType(){const t=this.defaultSlot.assignedElements({flatten:1}).filter(t=>"sl-dropdown"===t.tagName.toLowerCase()).length>0;this.href?this.renderType="link":this.renderType=t?"dropdown":"button"}hrefChanged(){this.setRenderType()}handleSlotChange(){this.setRenderType()}render(){return j`
      <div
        part="base"
        class=${oe({"breadcrumb-item":1,"breadcrumb-item--has-prefix":this.hasSlotController.test("prefix"),"breadcrumb-item--has-suffix":this.hasSlotController.test("suffix")})}
      >
        <span part="prefix" class="breadcrumb-item__prefix">
          <slot name="prefix"></slot>
        </span>

        ${"link"===this.renderType?j`
              <a
                part="label"
                class="breadcrumb-item__label breadcrumb-item__label--link"
                href="${this.href}"
                target="${de(this.target?this.target:void 0)}"
                rel=${de(this.target?this.rel:void 0)}
              >
                <slot @slotchange=${this.handleSlotChange}></slot>
              </a>
            `:""}
        ${"button"===this.renderType?j`
              <button part="label" type="button" class="breadcrumb-item__label breadcrumb-item__label--button">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </button>
            `:""}
        ${"dropdown"===this.renderType?j`
              <div part="label" class="breadcrumb-item__label breadcrumb-item__label--drop-down">
                <slot @slotchange=${this.handleSlotChange}></slot>
              </div>
            `:""}

        <span part="suffix" class="breadcrumb-item__suffix">
          <slot name="suffix"></slot>
        </span>

        <span part="separator" class="breadcrumb-item__separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </div>
    `}};Oa.styles=[ct,Ia],xt([Bt("slot:not([name])")],Oa.prototype,"defaultSlot",2),xt([Mt()],Oa.prototype,"renderType",2),xt([Ct()],Oa.prototype,"href",2),xt([Ct()],Oa.prototype,"target",2),xt([Ct()],Oa.prototype,"rel",2),xt([Kt("href",{waitUntilFirstUpdate:1})],Oa.prototype,"hrefChanged",1),Oa.define("sl-breadcrumb-item"),Ut({tagName:"sl-breadcrumb-item",elementClass:Oa,react:t,events:{},displayName:"SlBreadcrumbItem"});var Ea=a`
  :host {
    display: inline-flex;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: max(12px, 0.75em);
    font-weight: var(--sl-font-weight-semibold);
    letter-spacing: var(--sl-letter-spacing-normal);
    line-height: 1;
    border-radius: var(--sl-border-radius-small);
    border: solid 1px var(--sl-color-neutral-0);
    white-space: nowrap;
    padding: 0.35em 0.6em;
    user-select: none;
    -webkit-user-select: none;
    cursor: inherit;
  }

  /* Variant modifiers */
  .badge--primary {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--success {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--neutral {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--warning {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .badge--danger {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /* Pill modifier */
  .badge--pill {
    border-radius: var(--sl-border-radius-pill);
  }

  /* Pulse modifier */
  .badge--pulse {
    animation: pulse 1.5s infinite;
  }

  .badge--pulse.badge--primary {
    --pulse-color: var(--sl-color-primary-600);
  }

  .badge--pulse.badge--success {
    --pulse-color: var(--sl-color-success-600);
  }

  .badge--pulse.badge--neutral {
    --pulse-color: var(--sl-color-neutral-600);
  }

  .badge--pulse.badge--warning {
    --pulse-color: var(--sl-color-warning-600);
  }

  .badge--pulse.badge--danger {
    --pulse-color: var(--sl-color-danger-600);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--pulse-color);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
`,Fa=class extends Ot{constructor(){super(...arguments),this.variant="primary",this.pill=0,this.pulse=0}render(){return j`
      <span
        part="base"
        class=${oe({badge:1,"badge--primary":"primary"===this.variant,"badge--success":"success"===this.variant,"badge--neutral":"neutral"===this.variant,"badge--warning":"warning"===this.variant,"badge--danger":"danger"===this.variant,"badge--pill":this.pill,"badge--pulse":this.pulse})}
        role="status"
      >
        <slot></slot>
      </span>
    `}};Fa.styles=[ct,Ea],xt([Ct({reflect:1})],Fa.prototype,"variant",2),xt([Ct({type:Boolean,reflect:1})],Fa.prototype,"pill",2),xt([Ct({type:Boolean,reflect:1})],Fa.prototype,"pulse",2),Fa.define("sl-badge"),Ut({tagName:"sl-badge",elementClass:Fa,react:t,events:{},displayName:"SlBadge"});var Da=a`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,Ta=class extends Ot{constructor(){super(...arguments),this.hasSlotController=new ss(this,"footer","header","image")}render(){return j`
      <div
        part="base"
        class=${oe({card:1,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};Ta.styles=[ct,Da],Ta.define("sl-card");var Ua=Ut({tagName:"sl-card",elementClass:Ta,react:t,events:{},displayName:"SlCard"}),La=a`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
    overflow: hidden;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--has-countdown {
    border-bottom: none;
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    margin-inline-end: var(--sl-spacing-medium);
    align-self: center;
  }

  .alert__countdown {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(var(--sl-panel-border-width) * 3);
    background-color: var(--sl-panel-border-color);
    display: flex;
  }

  .alert__countdown--ltr {
    justify-content: flex-end;
  }

  .alert__countdown .alert__countdown-elapsed {
    height: 100%;
    width: 0;
  }

  .alert--primary .alert__countdown-elapsed {
    background-color: var(--sl-color-primary-600);
  }

  .alert--success .alert__countdown-elapsed {
    background-color: var(--sl-color-success-600);
  }

  .alert--neutral .alert__countdown-elapsed {
    background-color: var(--sl-color-neutral-600);
  }

  .alert--warning .alert__countdown-elapsed {
    background-color: var(--sl-color-warning-600);
  }

  .alert--danger .alert__countdown-elapsed {
    background-color: var(--sl-color-danger-600);
  }

  .alert__timer {
    display: none;
  }
`,Ra=class t extends Ot{constructor(){super(...arguments),this.hasSlotController=new ss(this,"icon","suffix"),this.localize=new ze(this),this.open=0,this.closable=0,this.variant="primary",this.duration=1/0,this.remainingTime=this.duration}static get toastStack(){return this.currentToastStack||(this.currentToastStack=Object.assign(document.createElement("div"),{className:"sl-toast-stack"})),this.currentToastStack}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){this.handleCountdownChange(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.duration),this.remainingTime=this.duration,this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100))}pauseAutoHide(){var t;null==(t=this.countdownAnimation)||t.pause(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval)}resumeAutoHide(){var t;this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.remainingTime),this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100),null==(t=this.countdownAnimation)||t.play())}handleCountdownChange(){if(this.open&&this.duration<1/0&&this.countdown){const{countdownElement:t}=this,e="100%",s="0";this.countdownAnimation=t.animate([{width:e},{width:s}],{duration:this.duration,easing:"linear"})}}handleCloseClick(){this.hide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await Li(this.base),this.base.hidden=0;const{keyframes:t,options:e}=Ei(this,"alert.show",{dir:this.localize.dir()});await Di(this.base,t,e),this.emit("sl-after-show")}else{Ao(this),this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),await Li(this.base);const{keyframes:t,options:e}=Ei(this,"alert.hide",{dir:this.localize.dir()});await Di(this.base,t,e),this.base.hidden=1,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=1,Fi(this,"sl-after-show")}async hide(){if(this.open)return this.open=0,Fi(this,"sl-after-hide")}async toast(){return new Promise(e=>{this.handleCountdownChange(),null===t.toastStack.parentElement&&document.body.append(t.toastStack),t.toastStack.appendChild(this),requestAnimationFrame(()=>{this.show()}),this.addEventListener("sl-after-hide",()=>{t.toastStack.removeChild(this),e(),null===t.toastStack.querySelector("sl-alert")&&t.toastStack.remove()},{once:1})})}render(){return j`
      <div
        part="base"
        class=${oe({alert:1,"alert--open":this.open,"alert--closable":this.closable,"alert--has-countdown":!!this.countdown,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":"primary"===this.variant,"alert--success":"success"===this.variant,"alert--neutral":"neutral"===this.variant,"alert--warning":"warning"===this.variant,"alert--danger":"danger"===this.variant})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mouseenter=${this.pauseAutoHide}
        @mouseleave=${this.resumeAutoHide}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?j`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}

        <div role="timer" class="alert__timer">${this.remainingTime}</div>

        ${this.countdown?j`
              <div
                class=${oe({alert__countdown:1,"alert__countdown--ltr":"ltr"===this.countdown})}
              >
                <div class="alert__countdown-elapsed"></div>
              </div>
            `:""}
      </div>
    `}};Ra.styles=[ct,La],Ra.dependencies={"sl-icon-button":pe},xt([Bt('[part~="base"]')],Ra.prototype,"base",2),xt([Bt(".alert__countdown-elapsed")],Ra.prototype,"countdownElement",2),xt([Ct({type:Boolean,reflect:1})],Ra.prototype,"open",2),xt([Ct({type:Boolean,reflect:1})],Ra.prototype,"closable",2),xt([Ct({reflect:1})],Ra.prototype,"variant",2),xt([Ct({type:Number})],Ra.prototype,"duration",2),xt([Ct({type:String,reflect:1})],Ra.prototype,"countdown",2),xt([Mt()],Ra.prototype,"remainingTime",2),xt([Kt("open",{waitUntilFirstUpdate:1})],Ra.prototype,"handleOpenChange",1),xt([Kt("duration")],Ra.prototype,"handleDurationChange",1);var Pa=Ra;Oi("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),Oi("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}}),Pa.define("sl-alert"),Ut({tagName:"sl-alert",elementClass:Pa,react:t,events:{onSlShow:"sl-show",onSlAfterShow:"sl-after-show",onSlHide:"sl-hide",onSlAfterHide:"sl-after-hide"},displayName:"SlAlert"});var ja=(t,e)=>{let s=0;return function(...i){window.clearTimeout(s),s=window.setTimeout(()=>{t.call(this,...i)},e)}},Ha=(t,e,s)=>{const i=t[e];t[e]=function(...t){i.call(this,...t),s.call(this,i,...t)}};(()=>{if("undefined"!=typeof window&&!("onscrollend"in window)){const t=new Set,e=new WeakMap,s=e=>{for(const s of e.changedTouches)t.add(s.identifier)},i=e=>{for(const s of e.changedTouches)t.delete(s.identifier)};document.addEventListener("touchstart",s,1),document.addEventListener("touchend",i,1),document.addEventListener("touchcancel",i,1),Ha(EventTarget.prototype,"addEventListener",function(s,i){if("scrollend"!==i)return;const r=ja(()=>{t.size?r():this.dispatchEvent(new Event("scrollend"))},100);s.call(this,"scroll",r,{passive:1}),e.set(this,r)}),Ha(EventTarget.prototype,"removeEventListener",function(t,s){if("scrollend"!==s)return;const i=e.get(this);i&&t.call(this,"scroll",i,{passive:1})})}})(),Gi.define("sl-tree-item"),Pi.define("sl-tooltip"),tr.define("sl-tree"),Et.define("sl-visually-hidden"),Re.define("sl-tab-panel"),He.define("sl-tag"),rs.define("sl-textarea"),Ce.define("sl-tab"),De.define("sl-tab-group"),br.define("sl-skeleton"),_r.define("sl-split-panel"),gr.define("sl-switch"),Be.define("sl-resize-observer"),dr.define("sl-select"),Yi.define("sl-spinner"),Lr.define("sl-range"),nr.define("sl-rating"),cr.define("sl-relative-time"),Fr.define("sl-radio-button"),Vr.define("sl-radio-group"),Cr.define("sl-progress-ring"),Ir.define("sl-qr-code"),Tr.define("sl-radio"),go.define("sl-option"),Ai.define("sl-popup"),zr.define("sl-progress-bar"),bo.define("sl-menu-label"),kr.define("sl-mutation-observer"),Jr.define("sl-input"),Qr.define("sl-menu"),po.define("sl-menu-item"),Xr.define("sl-image-comparer"),Kr.define("sl-include"),se.define("sl-icon"),pe.define("sl-icon-button"),Fo.define("sl-format-bytes"),Eo.define("sl-format-date"),Do.define("sl-format-number"),wo.define("sl-divider"),Bo.define("sl-drawer"),Oo.define("sl-dropdown"),ba.define("sl-copy-button"),ga.define("sl-details"),wa.define("sl-dialog"),qi.define("sl-checkbox"),pa.define("sl-color-picker"),Ta.define("sl-card"),Ro.define("sl-carousel"),jo.define("sl-carousel-item"),Oa.define("sl-breadcrumb-item"),jr.define("sl-button-group"),Ma.define("sl-avatar"),Na.define("sl-breadcrumb"),qo.define("sl-button"),xa.define("sl-animated-image"),Fa.define("sl-badge"),Pa.define("sl-alert"),Sa.define("sl-animation");export{os as a,Ba as b,Ho as c,va as d,pr as e,Ua as f,Te as g,Me as h,To as i,Pe as j,jt as k,vo as o,ur as s,ji as t};