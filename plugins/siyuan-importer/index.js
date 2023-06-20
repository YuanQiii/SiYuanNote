"use strict";var Gt=Object.defineProperty;var Kt=(e,t,n)=>t in e?Gt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ge=(e,t,n)=>(Kt(e,typeof t!="symbol"?t+"":t,n),n);const siyuan=require("siyuan"),createLogger=e=>{const t="importer",n=l=>{const o=l.getFullYear(),s=String(l.getMonth()+1).padStart(2,"0"),i=String(l.getDate()).padStart(2,"0"),c=String(l.getHours()).padStart(2,"0"),u=String(l.getMinutes()).padStart(2,"0"),F=String(l.getSeconds()).padStart(2,"0");return`${o}-${s}-${i} ${c}:${u}:${F}`},a=(l,o,s)=>{const i=n(new Date);s?console.log(`[${t}] [${i}] [${l}] [${e}] ${o}`,s):console.log(`[${t}] [${i}] [${l}] [${e}] ${o}`)};return{debug:(l,o)=>a("DEBUG",l,o),info:(l,o)=>a("INFO",l,o),warn:(l,o)=>{const s=n(new Date);o?console.warn(`[${t}] [${s}] [WARN] ${l}`,o):console.warn(`[${t}] [${s}] [WARN] ${l}`)},error:(l,o)=>{typeof l=="string"?a("ERROR",l,o):console.error(`[${t}] [${n(new Date)}] [ERROR] [${e}] error occurred`,l)}}},workspaceDir=`${window.siyuan.config.system.workspaceDir}`,dataDir=`${window.siyuan.config.system.dataDir}`,mediaDir="./assets",isDev=!1,siyuanApiUrl="",siyuanApiToken="";class BaseApi{constructor(){Ge(this,"logger");this.logger=createLogger("base-api")}async siyuanRequest(t,n){const a=`${siyuanApiUrl}${t}`,l={body:JSON.stringify(n),method:"POST"},s=await(await fetch(a,l)).json();if(s.code===-1)throw new Error(s.msg);return s}}function getDefaultExportFromCjs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var bitwise=function(e){var t=0;if(e.length==0)return t;for(var n=0;n<e.length;n++){var a=e.charCodeAt(n);t=(t<<5)-t+a,t=t&t}return t},binaryTransfer=function(e,t){var n="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";t=t||62;var a=[],l,o="",s=e<0?"-":"";for(e=Math.abs(e);e>=t;)l=e%t,e=Math.floor(e/t),a.push(n[l]);e>0&&a.push(n[e]);for(var i=a.length-1;i>=0;i--)o+=a[i];return s+o},shortHash=function(e){var t=typeof e;if(t==="string"||t==="number"){var n=binaryTransfer(bitwise(String(e)),61);return n.replace("-","Z")}else throw new Error("Unexpected input type")},dist=shortHash;const shortHash$1=getDefaultExportFromCjs(dist);class KernelApi extends BaseApi{async lsNotebooks(){return await this.siyuanRequest("/api/notebook/lsNotebooks",{})}async openNotebook(t){return await this.siyuanRequest("/api/notebook/openNotebook",{notebook:t})}async readDir(t){return await this.siyuanRequest("/api/file/readDir",{path:t})}putFile(t,n){const a=new FormData;return a.append("path",t),a.append("isDir","false"),a.append("modTime",Math.floor(Date.now()/1e3).toString()),a.append("file",n),new Promise((l,o)=>{siyuan.fetchPost("/api/file/putFile",a,s=>{s.code===0?l(s):o(s)})})}async saveTextData(t,n){return new Promise(a=>{const l=`/temp/convert/pandoc/${t}`,o=new File([new Blob([n])],l.split("/").pop()),s=new FormData;s.append("path",l),s.append("file",o),s.append("isDir","false"),siyuan.fetchPost("/api/file/putFile",s,i=>{a(i)})})}async convertPandoc(t,n){const a={args:["--to","markdown_github-raw_html+tex_math_dollars+pipe_tables",t,"-o",n,"--extract-media",`${mediaDir}/${shortHash$1(t).toLowerCase()}`,"--wrap=none"]};return await this.siyuanRequest("/api/convert/pandoc",a)}async convertPandocCustom(t){const n={args:t};return await this.siyuanRequest("/api/convert/pandoc",n)}async getFile(t,n){const a=await fetch(`${siyuanApiUrl}/api/file/getFile`,{method:"POST",headers:{Authorization:`Token ${siyuanApiToken}`},body:JSON.stringify({path:t})});if(a.status===200){if(n==="text")return await a.text();if(n==="json")return(await a.json()).data}return null}async removeFile(t){const n={path:t};return await this.siyuanRequest("/api/file/removeFile",n)}async createDocWithMd(t,n,a){const l={notebook:t,path:n,markdown:a};return await this.siyuanRequest("/api/filetree/createDocWithMd",l)}async importStdMd(t,n,a){const l={localPath:t,notebook:n,toPath:a};return await this.siyuanRequest("/api/import/importStdMd",l)}}const index="";function noop(){}function run(e){return e()}function blank_object(){return Object.create(null)}function run_all(e){e.forEach(run)}function is_function(e){return typeof e=="function"}function safe_not_equal(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function is_empty(e){return Object.keys(e).length===0}function null_to_empty(e){return e??""}function append(e,t){e.appendChild(t)}function insert(e,t,n){e.insertBefore(t,n||null)}function detach(e){e.parentNode&&e.parentNode.removeChild(e)}function destroy_each(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function element(e){return document.createElement(e)}function svg_element(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function text(e){return document.createTextNode(e)}function space(){return text(" ")}function listen(e,t,n,a){return e.addEventListener(t,n,a),()=>e.removeEventListener(t,n,a)}function attr(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function xlink_attr(e,t,n){e.setAttributeNS("http://www.w3.org/1999/xlink",t,n)}function children(e){return Array.from(e.childNodes)}function set_data(e,t){t=""+t,e.data!==t&&(e.data=t)}function set_input_value(e,t){e.value=t??""}function set_style(e,t,n,a){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,a?"important":"")}function select_option(e,t,n){for(let a=0;a<e.options.length;a+=1){const l=e.options[a];if(l.__value===t){l.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function select_value(e){const t=e.querySelector(":checked");return t&&t.__value}let current_component;function set_current_component(e){current_component=e}function get_current_component(){if(!current_component)throw new Error("Function called outside component initialization");return current_component}function onMount(e){get_current_component().$$.on_mount.push(e)}const dirty_components=[],binding_callbacks=[];let render_callbacks=[];const flush_callbacks=[],resolved_promise=Promise.resolve();let update_scheduled=!1;function schedule_update(){update_scheduled||(update_scheduled=!0,resolved_promise.then(flush))}function add_render_callback(e){render_callbacks.push(e)}const seen_callbacks=new Set;let flushidx=0;function flush(){if(flushidx!==0)return;const e=current_component;do{try{for(;flushidx<dirty_components.length;){const t=dirty_components[flushidx];flushidx++,set_current_component(t),update(t.$$)}}catch(t){throw dirty_components.length=0,flushidx=0,t}for(set_current_component(null),dirty_components.length=0,flushidx=0;binding_callbacks.length;)binding_callbacks.pop()();for(let t=0;t<render_callbacks.length;t+=1){const n=render_callbacks[t];seen_callbacks.has(n)||(seen_callbacks.add(n),n())}render_callbacks.length=0}while(dirty_components.length);for(;flush_callbacks.length;)flush_callbacks.pop()();update_scheduled=!1,seen_callbacks.clear(),set_current_component(e)}function update(e){if(e.fragment!==null){e.update(),run_all(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(add_render_callback)}}function flush_render_callbacks(e){const t=[],n=[];render_callbacks.forEach(a=>e.indexOf(a)===-1?t.push(a):n.push(a)),n.forEach(a=>a()),render_callbacks=t}const outroing=new Set;function transition_in(e,t){e&&e.i&&(outroing.delete(e),e.i(t))}function mount_component(e,t,n,a){const{fragment:l,after_update:o}=e.$$;l&&l.m(t,n),a||add_render_callback(()=>{const s=e.$$.on_mount.map(run).filter(is_function);e.$$.on_destroy?e.$$.on_destroy.push(...s):run_all(s),e.$$.on_mount=[]}),o.forEach(add_render_callback)}function destroy_component(e,t){const n=e.$$;n.fragment!==null&&(flush_render_callbacks(n.after_update),run_all(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function make_dirty(e,t){e.$$.dirty[0]===-1&&(dirty_components.push(e),schedule_update(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function init(e,t,n,a,l,o,s,i=[-1]){const c=current_component;set_current_component(e);const u=e.$$={fragment:null,ctx:[],props:o,update:noop,not_equal:l,bound:blank_object(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:blank_object(),dirty:i,skip_bound:!1,root:t.target||c.$$.root};s&&s(u.root);let F=!1;if(u.ctx=n?n(e,t.props||{},(_,h,...g)=>{const v=g.length?g[0]:h;return u.ctx&&l(u.ctx[_],u.ctx[_]=v)&&(!u.skip_bound&&u.bound[_]&&u.bound[_](v),F&&make_dirty(e,_)),h}):[],u.update(),F=!0,run_all(u.before_update),u.fragment=a?a(u.ctx):!1,t.target){if(t.hydrate){const _=children(t.target);u.fragment&&u.fragment.l(_),_.forEach(detach)}else u.fragment&&u.fragment.c();t.intro&&transition_in(e.$$.fragment),mount_component(e,t.target,t.anchor,t.customElement),flush()}set_current_component(c)}class SvelteComponent{$destroy(){destroy_component(this,1),this.$destroy=noop}$on(t,n){if(!is_function(n))return noop;const a=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return a.push(n),()=>{const l=a.indexOf(n);l!==-1&&a.splice(l,1)}}$set(t){this.$$set&&!is_empty(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const importerStorage="importer-config.txt";async function loadImporterConfig(e){const t=await e.loadData(importerStorage);let n;try{n=JSON.parse(t)}catch{n={}}return n}async function saveImporterConfig(e,t){const n=JSON.stringify(t);await e.saveData(importerStorage,n)}const removeEmptyLines=e=>e.replace(/^#+\s*\n|\n\u00A0+/gm,`
`);function convertPathToUnixStyle(e){return e.replace(/\\/g,"/")}function replaceImagePath(e){const t=/!\[(.*?)\]\(([^\s]*?)\)/g;return e.replace(t,(n,a,l)=>{const o=l;if(!o.startsWith(dataDir))return n;const s=convertPathToUnixStyle(o.substring(dataDir.length));return`![${a}](${s})`})}function removeFootnotes(e){const t=/\^\(\[.*[0-9].*]\(#.*#.*\)\)/g;return e.replace(t,"")}function removeLinks(e){const t=/\[([^\]]+)]\(([^)]+)\)/g;return e.replace(t,(n,a,l)=>l.includes("./Text")||l.includes("#")||l.includes("kindle:")?a:n)}const isPC=()=>{const e=siyuan.getBackend(),t=siyuan.getFrontend();return(e==="windows"||"linux")&&t==="desktop"};async function mkdirp(e){const t=window.require("fs/promises"),n=window.require("path"),a=n.isAbsolute(e)?e:n.join(process.cwd(),e);try{return await t.access(a),a}catch(l){if(l.code==="ENOENT")return await mkdirp(n.dirname(a)),t.mkdir(a);throw l}}const copyDir=async(e,t)=>{if(!isPC()){console.warn("Not PC, it will not work");return}const n=window.require("fs"),a=window.require("path");if(!n.existsSync(e)){console.warn("Can not get path");return}n.existsSync(t)||await mkdirp(t);const l=n.readdirSync(e);for(let o of l){const s=a.join(e,o),i=a.join(t,o);n.statSync(s).isDirectory()?copyDir(s,i):n.copyFileSync(s,i)}},getExports=jsText=>eval(jsText);class ImportService{static async uploadAndConvert(t,n){const a=n.name,l=a.substring(0,a.lastIndexOf(".")),o=`${l}.md`,s=a.split(".").pop().toLowerCase();if(s==="md"){const v=n.path;return t.logger.info(`import md from ${v}`),{toFilePath:v,isMd:!0}}if(s==="html"&&isPC()){t.logger.info("copying html assets...");const v=n.path,E=v.lastIndexOf("/"),T=v.substring(0,E),w=window.require("path").join(T,`${l}_files`);t.logger.info("fullDirPath=>",w),await copyDir(w,`${workspaceDir}/temp/convert/pandoc/${l}_files`)}const i=`/temp/convert/pandoc/${a}`,c=`/temp/convert/pandoc/${o}`,u=i;t.logger.info(`upload file from ${u} to /temp/convert/pandoc`);const F=await t.kernelApi.putFile(u,n);if(F.code!==0){siyuan.showMessage(`${t.i18n.msgFileUploadError}：${F.msg}`,7e3,"error");return}const _=await t.kernelApi.convertPandoc(a,o);if(_.code!==0){siyuan.showMessage(`${t.i18n.msgFileConvertError}：${_.msg}`,7e3,"error");return}let h=await t.kernelApi.getFile(c,"text")??"";if(h===""){siyuan.showMessage(t.i18n.msgFileConvertEmpty,7e3,"error");return}const g=await loadImporterConfig(t);if(g.bundledFnSwitch&&(t.logger.info("Using bundled handler process text"),h=removeLinks(h),h=removeEmptyLines(h),h=replaceImagePath(h),h=removeFootnotes(h)),g.customFnSwitch){t.logger.warn("Using custom handler process text");try{const v=g.customFn;h=getExports(v)(h)}catch(v){throw siyuan.showMessage(`${t.i18n.customFnHandlerError} ${v.toString()}`,5e3,"error"),v}}return await t.kernelApi.saveTextData(`${o}`,h),{toFilePath:c,isMd:!1}}static async singleImport(t,n,a,l){const o=l?n:`${workspaceDir}${n}`;(await t.kernelApi.importStdMd(o,a,"/")).code!==0&&siyuan.showMessage(`${t.i18n.msgDocCreateFailed}=>${n}`,7e3,"error"),await t.kernelApi.openNotebook(a),siyuan.showMessage(t.i18n.msgImportSuccess,5e3,"info")}static async multiImport(t,n){const a=`${workspaceDir}/temp/convert/pandoc`;(await t.kernelApi.importStdMd(a,n,"/")).code!==0&&siyuan.showMessage(`${t.i18n.msgDocCreateFailed}=>${a}`,7e3,"error"),await t.kernelApi.openNotebook(n),siyuan.showMessage(t.i18n.msgImportSuccess,5e3,"info")}}const ImportForm_svelte_svelte_type_style_lang="";function get_each_context(e,t,n){const a=e.slice();return a[22]=t[n],a}function create_else_block(e){let t,n=e[0].i18n.loading+"",a,l;return{c(){t=element("option"),a=text(n),l=text("..."),t.__value="0",t.value=t.__value},m(o,s){insert(o,t,s),append(t,a),append(t,l)},p(o,s){s&1&&n!==(n=o[0].i18n.loading+"")&&set_data(a,n)},d(o){o&&detach(t)}}}function create_each_block(e){let t,n=e[22].name+"",a,l;return{c(){t=element("option"),a=text(n),t.__value=l=e[22].id,t.value=t.__value},m(o,s){insert(o,t,s),append(t,a)},p(o,s){s&2&&n!==(n=o[22].name+"")&&set_data(a,n),s&2&&l!==(l=o[22].id)&&(t.__value=l,t.value=t.__value)},d(o){o&&detach(t)}}}function create_fragment$1(e){let t,n,a,l,o=e[0].i18n.targetNotebook+"",s,i,c,u=e[0].i18n.selectNotebookTip+"",F,_,h,g,v,E,T,q,w,ne,$,D,z=e[0].i18n.importFile+"",Y,Z,r,f,y=e[0].i18n.importTip+"",k,x,P,re,ae=e[0].i18n.importTipHelp+"",Q,we,pe,Me,j,Fe=e[0].i18n.importSingleNotice1+"",ke,ye,I,V,Se=e[0].i18n.importSingleNotice2+"",ce,C,ue,de,U=e[0].i18n.importSingleNotice3+"",Ce,le,Ne,Ee,Re,O,W,Ie,H,De,L=e[0].i18n.startImport+"",fe,xe,J,A,se=e[0].i18n.importFolder+"",_e,Oe,S,G,oe=e[0].i18n.importFolderTip+"",$e,qe,K,ze,X=e[0].i18n.importTipHelp+"",me,Ae,he,He,m,b=e[0].i18n.importNotRecursive1+"",rt,Ke,$t,Le,Ye=e[0].i18n.importNotRecursive2+"",pt,Ze,Ct,je,Qe=e[0].i18n.importNotRecursive3+"",ct,Ve,Dt,ut,xt,ge,Ue,At,dt,ft,Xe=e[0].i18n.importFolder+"",_t,Bt,ve,Be,et=e[0].i18n.cleanTemp+"",mt,Tt,ee,tt=e[0].i18n.tempTotal+"",ht,Pt,Te,Mt,gt,Nt,Rt,nt=e[0].i18n.tempCount+"",vt,It,Pe,Ot,bt,qt,te,We,zt,at,wt,Ht,lt=e[0].i18n.clean+"",Ft,Lt,be,st=e[0].i18n.reportBug1+"",kt,jt,Je,ot=e[0].i18n.reportBug2+"",yt,Ut,it=e[0].i18n.reportBug3+"",St,Et,Wt,ie=e[1],M=[];for(let p=0;p<ie.length;p+=1)M[p]=create_each_block(get_each_context(e,ie,p));let N=null;return ie.length||(N=create_else_block(e)),{c(){t=element("div"),n=element("div"),a=element("label"),l=element("div"),s=text(o),i=space(),c=element("div"),F=text(u),_=element("span"),h=text("["),g=text(e[3]),v=text("]"),E=space(),T=element("span"),q=space(),w=element("select");for(let p=0;p<M.length;p+=1)M[p].c();N&&N.c(),ne=space(),$=element("div"),D=element("div"),Y=text(z),Z=space(),r=element("div"),f=element("div"),k=text(y),x=space(),P=element("span"),re=text("("),Q=text(ae),we=text(")"),Me=space(),j=element("div"),ke=text(Fe),I=space(),V=element("div"),ce=text(Se),ue=space(),de=element("div"),Ce=text(U),Ne=space(),Ee=element("span"),Re=space(),O=element("button"),W=element("input"),Ie=space(),H=svg_element("svg"),De=svg_element("use"),fe=text(L),xe=space(),J=element("div"),A=element("div"),_e=text(se),Oe=space(),S=element("div"),G=element("div"),$e=text(oe),qe=space(),K=element("span"),ze=text("("),me=text(X),Ae=text(")"),He=space(),m=element("div"),rt=text(b),$t=space(),Le=element("div"),pt=text(Ye),Ct=space(),je=element("div"),ct=text(Qe),Dt=space(),ut=element("span"),xt=space(),ge=element("button"),Ue=element("input"),At=space(),dt=svg_element("svg"),ft=svg_element("use"),_t=text(Xe),Bt=space(),ve=element("div"),Be=element("div"),mt=text(et),Tt=space(),ee=element("div"),ht=text(tt),Pt=space(),Te=element("span"),Mt=text("[ "),gt=text(e[4]),Nt=text(" ]"),Rt=space(),vt=text(nt),It=space(),Pe=element("span"),Pe.textContent="显示临时文件夹路径",Ot=space(),bt=element("span"),qt=space(),te=element("button"),We=element("input"),zt=space(),at=svg_element("svg"),wt=svg_element("use"),Ht=space(),Ft=text(lt),Lt=space(),be=element("div"),kt=text(st),jt=text(`
       `),Je=element("a"),yt=text(ot),Ut=text(` 
      `),St=text(it),attr(_,"class","selected svelte-c3a8hl"),attr(c,"class","b3-label__text"),attr(l,"class","fn__flex-1"),attr(T,"class","fn__space"),attr(w,"id","blockEmbedMode"),attr(w,"class","b3-select fn__flex-center fn__size200"),e[2]===void 0&&add_render_callback(()=>e[16].call(w)),attr(a,"class","fn__flex b3-label config__item"),attr(P,"class",pe=null_to_empty(e[5]?"sign hidden":"sign")+" svelte-c3a8hl"),attr(j,"class",ye=null_to_empty(e[5]?"highlight":"highlight hidden")+" svelte-c3a8hl"),attr(V,"class",C=null_to_empty(e[5]?"highlight":"highlight hidden")+" svelte-c3a8hl"),attr(de,"class",le=null_to_empty(e[5]?"highlight":"highlight hidden")+" svelte-c3a8hl"),attr(r,"class","b3-label__text tips svelte-c3a8hl"),attr(D,"class","fn__flex-1 fn__flex-center"),attr(Ee,"class","fn__space"),attr(W,"id","importData"),attr(W,"class","b3-form__upload"),attr(W,"type","file"),attr(W,"accept",".md,.docx,.epub,.html,.opml"),xlink_attr(De,"xlink:href","#iconDownload"),attr(O,"class","b3-button b3-button--outline fn__flex-center fn__size200"),set_style(O,"position","relative"),attr($,"class","fn__flex b3-label config__item"),attr(K,"class",he=null_to_empty(e[6]?"sign hidden":"sign")+" svelte-c3a8hl"),attr(m,"class",Ke=null_to_empty(e[6]?"highlight":"highlight hidden")+" svelte-c3a8hl"),attr(Le,"class",Ze=null_to_empty(e[6]?"highlight":"highlight hidden")+" svelte-c3a8hl"),attr(je,"class",Ve=null_to_empty(e[6]?"highlight":"highlight hidden")+" svelte-c3a8hl"),attr(S,"class","b3-label__text tips svelte-c3a8hl"),attr(A,"class","fn__flex-1 fn__flex-center"),attr(ut,"class","fn__space"),attr(Ue,"id","batchImportData"),attr(Ue,"class","b3-form__upload"),xlink_attr(ft,"xlink:href","#iconDownload"),attr(ge,"class","b3-button b3-button--outline fn__flex-center fn__size200"),set_style(ge,"position","relative"),attr(J,"class","fn__flex b3-label config__item"),attr(Te,"class","selected svelte-c3a8hl"),attr(Pe,"class","link svelte-c3a8hl"),attr(ee,"class","b3-label__text"),attr(Be,"class","fn__flex-1 fn__flex-center"),attr(bt,"class","fn__space"),attr(We,"id","batchRemoveData"),attr(We,"class","b3-form__upload"),xlink_attr(wt,"xlink:href","#iconTrashcan"),attr(at,"class","svg"),attr(te,"id","removeAll"),attr(te,"class","b3-button b3-button--outline fn__flex-center fn__size200"),set_style(te,"position","relative"),attr(ve,"class","fn__flex b3-label config__item"),attr(Je,"href","https://github.com/terwer/siyuan-plugin-importer/issues/new"),attr(Je,"target","_blank"),attr(be,"class","fn__flex b3-label config__item"),attr(n,"class","config__tab-container svelte-c3a8hl"),attr(t,"class","b3-dialog__content importer-form-container svelte-c3a8hl")},m(p,d){insert(p,t,d),append(t,n),append(n,a),append(a,l),append(l,s),append(l,i),append(l,c),append(c,F),append(c,_),append(_,h),append(_,g),append(_,v),append(a,E),append(a,T),append(a,q),append(a,w);for(let B=0;B<M.length;B+=1)M[B]&&M[B].m(w,null);N&&N.m(w,null),select_option(w,e[2],!0),append(n,ne),append(n,$),append($,D),append(D,Y),append(D,Z),append(D,r),append(r,f),append(f,k),append(f,x),append(f,P),append(P,re),append(P,Q),append(P,we),append(r,Me),append(r,j),append(j,ke),append(r,I),append(r,V),append(V,ce),append(r,ue),append(r,de),append(de,Ce),append($,Ne),append($,Ee),append($,Re),append($,O),append(O,W),append(O,Ie),append(O,H),append(H,De),append(O,fe),append(n,xe),append(n,J),append(J,A),append(A,_e),append(A,Oe),append(A,S),append(S,G),append(G,$e),append(G,qe),append(G,K),append(K,ze),append(K,me),append(K,Ae),append(S,He),append(S,m),append(m,rt),append(S,$t),append(S,Le),append(Le,pt),append(S,Ct),append(S,je),append(je,ct),append(J,Dt),append(J,ut),append(J,xt),append(J,ge),append(ge,Ue),append(ge,At),append(ge,dt),append(dt,ft),append(ge,_t),append(n,Bt),append(n,ve),append(ve,Be),append(Be,mt),append(Be,Tt),append(Be,ee),append(ee,ht),append(ee,Pt),append(ee,Te),append(Te,Mt),append(Te,gt),append(Te,Nt),append(ee,Rt),append(ee,vt),append(ee,It),append(ee,Pe),append(ve,Ot),append(ve,bt),append(ve,qt),append(ve,te),append(te,We),append(te,zt),append(te,at),append(at,wt),append(te,Ht),append(te,Ft),append(n,Lt),append(n,be),append(be,kt),append(be,jt),append(be,Je),append(Je,yt),append(be,Ut),append(be,St),Et||(Wt=[listen(w,"change",e[16]),listen(w,"change",e[7]),listen(r,"click",e[13]),listen(r,"keydown",e[10]),listen(W,"change",e[11]),listen(S,"click",e[14]),listen(S,"keydown",e[10]),listen(Ue,"click",e[12]),listen(Pe,"click",e[9]),listen(Pe,"keydown",e[10]),listen(We,"click",e[8])],Et=!0)},p(p,[d]){if(d&1&&o!==(o=p[0].i18n.targetNotebook+"")&&set_data(s,o),d&1&&u!==(u=p[0].i18n.selectNotebookTip+"")&&set_data(F,u),d&8&&set_data(g,p[3]),d&3){ie=p[1];let B;for(B=0;B<ie.length;B+=1){const Jt=get_each_context(p,ie,B);M[B]?M[B].p(Jt,d):(M[B]=create_each_block(Jt),M[B].c(),M[B].m(w,null))}for(;B<M.length;B+=1)M[B].d(1);M.length=ie.length,!ie.length&&N?N.p(p,d):ie.length?N&&(N.d(1),N=null):(N=create_else_block(p),N.c(),N.m(w,null))}d&6&&select_option(w,p[2]),d&1&&z!==(z=p[0].i18n.importFile+"")&&set_data(Y,z),d&1&&y!==(y=p[0].i18n.importTip+"")&&set_data(k,y),d&1&&ae!==(ae=p[0].i18n.importTipHelp+"")&&set_data(Q,ae),d&32&&pe!==(pe=null_to_empty(p[5]?"sign hidden":"sign")+" svelte-c3a8hl")&&attr(P,"class",pe),d&1&&Fe!==(Fe=p[0].i18n.importSingleNotice1+"")&&set_data(ke,Fe),d&32&&ye!==(ye=null_to_empty(p[5]?"highlight":"highlight hidden")+" svelte-c3a8hl")&&attr(j,"class",ye),d&1&&Se!==(Se=p[0].i18n.importSingleNotice2+"")&&set_data(ce,Se),d&32&&C!==(C=null_to_empty(p[5]?"highlight":"highlight hidden")+" svelte-c3a8hl")&&attr(V,"class",C),d&1&&U!==(U=p[0].i18n.importSingleNotice3+"")&&set_data(Ce,U),d&32&&le!==(le=null_to_empty(p[5]?"highlight":"highlight hidden")+" svelte-c3a8hl")&&attr(de,"class",le),d&1&&L!==(L=p[0].i18n.startImport+"")&&set_data(fe,L),d&1&&se!==(se=p[0].i18n.importFolder+"")&&set_data(_e,se),d&1&&oe!==(oe=p[0].i18n.importFolderTip+"")&&set_data($e,oe),d&1&&X!==(X=p[0].i18n.importTipHelp+"")&&set_data(me,X),d&64&&he!==(he=null_to_empty(p[6]?"sign hidden":"sign")+" svelte-c3a8hl")&&attr(K,"class",he),d&1&&b!==(b=p[0].i18n.importNotRecursive1+"")&&set_data(rt,b),d&64&&Ke!==(Ke=null_to_empty(p[6]?"highlight":"highlight hidden")+" svelte-c3a8hl")&&attr(m,"class",Ke),d&1&&Ye!==(Ye=p[0].i18n.importNotRecursive2+"")&&set_data(pt,Ye),d&64&&Ze!==(Ze=null_to_empty(p[6]?"highlight":"highlight hidden")+" svelte-c3a8hl")&&attr(Le,"class",Ze),d&1&&Qe!==(Qe=p[0].i18n.importNotRecursive3+"")&&set_data(ct,Qe),d&64&&Ve!==(Ve=null_to_empty(p[6]?"highlight":"highlight hidden")+" svelte-c3a8hl")&&attr(je,"class",Ve),d&1&&Xe!==(Xe=p[0].i18n.importFolder+"")&&set_data(_t,Xe),d&1&&et!==(et=p[0].i18n.cleanTemp+"")&&set_data(mt,et),d&1&&tt!==(tt=p[0].i18n.tempTotal+"")&&set_data(ht,tt),d&16&&set_data(gt,p[4]),d&1&&nt!==(nt=p[0].i18n.tempCount+"")&&set_data(vt,nt),d&1&&lt!==(lt=p[0].i18n.clean+"")&&set_data(Ft,lt),d&1&&st!==(st=p[0].i18n.reportBug1+"")&&set_data(kt,st),d&1&&ot!==(ot=p[0].i18n.reportBug2+"")&&set_data(yt,ot),d&1&&it!==(it=p[0].i18n.reportBug3+"")&&set_data(St,it)},i:noop,o:noop,d(p){p&&detach(t),destroy_each(M,p),N&&N.d(),Et=!1,run_all(Wt)}}}function instance$1(e,t,n){let{pluginInstance:a}=t,{dialog:l}=t,o,s=[],i,c;const u=new Set(["思源笔记用户指南","SiYuan User Guide"]);let F=0;const _=["docx","epub","opml"],h=async function(){const r=s.find(f=>f.id===i);n(3,c=r.name),o=await loadImporterConfig(a),o.notebook=i,await saveImporterConfig(a,o),a.logger.info(`${a.i18n.notebookConfigUpdated}=>`,i)},g=async()=>{const r="/temp/convert/pandoc";await a.kernelApi.removeFile(`${r}`),await v(),siyuan.showMessage(a.i18n.msgTempFileCleaned,5e3,"info")};onMount(async()=>{await v(),o=await loadImporterConfig(a);const f=(await a.kernelApi.lsNotebooks()).data;n(1,s=f.notebooks??[]),n(1,s=s.filter(k=>!k.closed&&!u.has(k.name))),n(2,i=(o==null?void 0:o.notebook)??s[0].id);const y=s.find(k=>k.id===i);n(3,c=y.name),a.logger.info(`${a.i18n.selected} [${c}] toNotebookId=>`,i)});const v=async()=>{const r="/temp/convert/pandoc",f=await a.kernelApi.readDir(r);f.code===0&&f.data.length>0&&n(4,F=f.data.length),f.code===404&&n(4,F=0)},E=async r=>{const f=await r.getFile(),y=new FileReader;return y.readAsArrayBuffer(f),new Promise((k,x)=>{y.onload=()=>{const P=y.result,re=new Blob([P],{type:f.type}),ae=f.name;k(new File([re],ae))},y.onerror=x})},T=()=>{siyuan.confirm("⚠️临时文件路径",`${workspaceDir}/temp/convert/pandoc`,()=>{})},q=r=>{(r.key==="Enter"||r.key===" ")&&r.preventDefault()},w=async r=>{a.logger.debug(`${a.i18n.startImport}...`),l.destroy();const f=r.target.files??[];if(f.length===0){siyuan.showMessage(`${a.i18n.msgFileNotEmpty}`,7e3,"error");return}const y=f[0];siyuan.showMessage(`${a.i18n.msgConverting} ${y.name}...`,1e3,"info");const k=await ImportService.uploadAndConvert(a,y);await ImportService.singleImport(a,k.toFilePath,i,k.isMd)},ne=async()=>{if(F>0){siyuan.showMessage(`${a.i18n.tempCountExists}`,1e3,"error");return}const r=await window.showDirectoryPicker();l.destroy();const f=await r.values();for await(const y of f){if(y.kind==="directory")continue;const k=y.name,x=k.split(".").pop().toLowerCase();if(!_.includes(x)){console.warn(`${a.i18n.importTipNotAllowed} ${k}`);continue}siyuan.showMessage(`${k} ${a.i18n.msgConverting}...`,5e3,"info");const P=await E(y);await ImportService.uploadAndConvert(a,P)}await ImportService.multiImport(a,i)};let $=!1,D=!1;const z=()=>{n(5,$=!$)},Y=()=>{n(6,D=!D),console.log(D)};function Z(){i=select_value(this),n(2,i),n(1,s)}return e.$$set=r=>{"pluginInstance"in r&&n(0,a=r.pluginInstance),"dialog"in r&&n(15,l=r.dialog)},[a,s,i,c,F,$,D,h,g,T,q,w,ne,z,Y,l,Z]}class ImportForm extends SvelteComponent{constructor(t){super(),init(this,t,instance$1,create_fragment$1,safe_not_equal,{pluginInstance:0,dialog:15})}}const iconImporter={iconImporter:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>',iconSetting:'<span class="importer-menu-icon"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg></span>'},ImportSetting_svelte_svelte_type_style_lang="";function create_fragment(e){let t,n,a,l=e[0].i18n.bundledFnSwitch+"",o,s,i,c=e[0].i18n.bundledFnSwitchTips+"",u,F,_,h,g,v,E,T,q=e[0].i18n.customFnSwitch+"",w,ne,$,D=e[0].i18n.customFnSwitchTips+"",z,Y,Z,r,f,y,k,x,P=e[0].i18n.customFnHandler+"",re,ae,Q,we=e[0].i18n.customFnHandlerTips+"",pe,Me,j,Fe,ke,ye,I,V,Se,ce,C,ue,de,U,Ce,le,Ne,Ee,Re,O=e[0].i18n.testInput+"",W,Ie,H,De,L,fe=e[0].i18n.testOutput+"",xe,J,A,se,_e,Oe,S,G,oe=e[0].i18n.cancel+"",$e,qe,K,ze,X,me=e[0].i18n.save+"",Ae,he,He;return{c(){t=element("div"),n=element("label"),a=element("div"),o=text(l),s=space(),i=element("div"),u=text(c),F=space(),_=element("span"),h=space(),g=element("input"),v=space(),E=element("label"),T=element("div"),w=text(q),ne=space(),$=element("div"),z=text(D),Y=space(),Z=element("span"),r=space(),f=element("input"),y=space(),k=element("label"),x=element("div"),re=text(P),ae=space(),Q=element("div"),pe=text(we),Me=space(),j=element("a"),j.textContent="https://www.regextester.com",Fe=space(),ke=element("div"),ye=space(),I=element("textarea"),Se=space(),ce=element("label"),C=element("div"),ue=element("button"),ue.textContent="开始测试",de=space(),U=element("button"),Ce=text("隐藏结果"),Ne=space(),Ee=element("div"),Re=space(),W=text(O),Ie=space(),H=element("textarea"),De=space(),L=element("div"),xe=text(fe),J=space(),A=element("textarea"),Oe=space(),S=element("div"),G=element("button"),$e=text(oe),qe=space(),K=element("div"),ze=space(),X=element("button"),Ae=text(me),attr(i,"class","b3-label__text"),attr(a,"class","fn__flex-1"),attr(_,"class","fn__space"),attr(g,"id","bundledFnSwitch"),attr(g,"class","b3-switch fn__flex-center"),attr(g,"type","checkbox"),attr(n,"class","fn__flex b3-label"),attr($,"class","b3-label__text"),attr(T,"class","fn__flex-1"),attr(Z,"class","fn__space"),attr(f,"id","customFnSwitch"),attr(f,"class","b3-switch fn__flex-center"),attr(f,"type","checkbox"),attr(E,"class","fn__flex b3-label"),attr(j,"href","https://www.regextester.com"),attr(j,"target","_blank"),attr(Q,"class","b3-label__text"),attr(ke,"class","fn__hr"),attr(I,"class","b3-text-field fn__block"),attr(I,"placeholder",V=e[0].i18n.customFnHandlerPlaceholder),attr(I,"rows","8"),attr(I,"spellcheck","false"),attr(x,"class","fn__flex-1"),attr(k,"class","fn__flex b3-label"),attr(ue,"class","b3-button b3-button--outline fn__flex-right fn__size200"),attr(U,"class",le=null_to_empty(e[6]?"b3-button b3-button--outline fn__flex-right fn__size200 pull-right":"b3-button b3-button--outline fn__flex-right fn__size200 pull-right hidden")+" svelte-15pkbbz"),attr(Ee,"class","fn__hr"),attr(H,"class","b3-text-field fn__block test-data-item svelte-15pkbbz"),attr(H,"rows","6"),attr(H,"spellcheck","false"),attr(A,"class","b3-text-field fn__block test-data-item svelte-15pkbbz"),attr(A,"placeholder",se=e[0].i18n.testOutputPlaceholder),attr(A,"rows","6"),attr(A,"spellcheck","false"),attr(L,"class",_e=null_to_empty(e[6]?"":"hidden")+" svelte-15pkbbz"),attr(C,"class","fn__flex-1"),attr(ce,"class","fn__flex b3-label"),attr(G,"class","b3-button b3-button--cancel"),attr(K,"class","fn__space"),attr(X,"class","b3-button b3-button--text"),attr(S,"class","b3-dialog__action"),attr(t,"class","config__tab-container")},m(m,b){insert(m,t,b),append(t,n),append(n,a),append(a,o),append(a,s),append(a,i),append(i,u),append(n,F),append(n,_),append(n,h),append(n,g),g.checked=e[1],append(t,v),append(t,E),append(E,T),append(T,w),append(T,ne),append(T,$),append($,z),append(E,Y),append(E,Z),append(E,r),append(E,f),f.checked=e[2],append(t,y),append(t,k),append(k,x),append(x,re),append(x,ae),append(x,Q),append(Q,pe),append(Q,Me),append(Q,j),append(x,Fe),append(x,ke),append(x,ye),append(x,I),set_input_value(I,e[3]),append(t,Se),append(t,ce),append(ce,C),append(C,ue),append(C,de),append(C,U),append(U,Ce),append(C,Ne),append(C,Ee),append(C,Re),append(C,W),append(C,Ie),append(C,H),set_input_value(H,e[4]),append(C,De),append(C,L),append(L,xe),append(L,J),append(L,A),set_input_value(A,e[5]),append(t,Oe),append(t,S),append(S,G),append(G,$e),append(S,qe),append(S,K),append(S,ze),append(S,X),append(X,Ae),he||(He=[listen(g,"click",e[14]),listen(g,"change",e[15]),listen(f,"click",e[16]),listen(f,"change",e[17]),listen(I,"input",e[18]),listen(ue,"click",e[11]),listen(U,"click",e[12]),listen(H,"input",e[19]),listen(A,"input",e[20]),listen(G,"click",e[8]),listen(X,"click",e[7])],he=!0)},p(m,[b]){b&1&&l!==(l=m[0].i18n.bundledFnSwitch+"")&&set_data(o,l),b&1&&c!==(c=m[0].i18n.bundledFnSwitchTips+"")&&set_data(u,c),b&2&&(g.checked=m[1]),b&1&&q!==(q=m[0].i18n.customFnSwitch+"")&&set_data(w,q),b&1&&D!==(D=m[0].i18n.customFnSwitchTips+"")&&set_data(z,D),b&4&&(f.checked=m[2]),b&1&&P!==(P=m[0].i18n.customFnHandler+"")&&set_data(re,P),b&1&&we!==(we=m[0].i18n.customFnHandlerTips+"")&&set_data(pe,we),b&1&&V!==(V=m[0].i18n.customFnHandlerPlaceholder)&&attr(I,"placeholder",V),b&8&&set_input_value(I,m[3]),b&64&&le!==(le=null_to_empty(m[6]?"b3-button b3-button--outline fn__flex-right fn__size200 pull-right":"b3-button b3-button--outline fn__flex-right fn__size200 pull-right hidden")+" svelte-15pkbbz")&&attr(U,"class",le),b&1&&O!==(O=m[0].i18n.testInput+"")&&set_data(W,O),b&16&&set_input_value(H,m[4]),b&1&&fe!==(fe=m[0].i18n.testOutput+"")&&set_data(xe,fe),b&1&&se!==(se=m[0].i18n.testOutputPlaceholder)&&attr(A,"placeholder",se),b&32&&set_input_value(A,m[5]),b&64&&_e!==(_e=null_to_empty(m[6]?"":"hidden")+" svelte-15pkbbz")&&attr(L,"class",_e),b&1&&oe!==(oe=m[0].i18n.cancel+"")&&set_data($e,oe),b&1&&me!==(me=m[0].i18n.save+"")&&set_data(Ae,me)},i:noop,o:noop,d(m){m&&detach(t),he=!1,run_all(He)}}}function instance(e,t,n){let{pluginInstance:a}=t,{dialog:l}=t,o=!0,s=!1,i,c={};const u=async()=>{l.destroy(),c.bundledFnSwitch=o,c.customFnSwitch=s,c.customFn=i,await saveImporterConfig(a,c),a.logger.info("saved important config =>",c),siyuan.showMessage(`${a.i18n.importConfigSaveSuccess}`,2e3,"info")},F=async()=>{l.destroy()},_=r=>{r.stopPropagation(),s||siyuan.confirm(`⚠️${a.i18n.enableCustomFn}`,`${a.i18n.enableCustomFnTips}`,()=>{const f=document.querySelector("#customFnSwitch");f.checked=s},()=>{n(2,s=!s)})},h=r=>{r.stopPropagation(),o&&siyuan.confirm(`⚠️${a.i18n.bundledFnSwitch}`,`${a.i18n.disableBundledFnSwitchTips}`,()=>{const f=document.querySelector("#bundledFnSwitch");f.checked=o},()=>{n(1,o=!o)})};let g=`我衷心期盼，子孙后代们读到这封信时，会带着一种自豪感和正当的优越感。

## 评伯特兰·罗素的知识论^([\\[16\\]](#part0019.html#footnote_16))

当编者要我就罗素写点东西时，出于对这位作者的钦佩和尊敬，我立刻答应了下来。`,v="",E=!1;const T=()=>{const r=getExports(i);n(5,v=r(g)),n(6,E=!0)},q=()=>{n(6,E=!1)};onMount(async()=>{c=await loadImporterConfig(a),n(1,o=c.bundledFnSwitch??!0),n(2,s=c.customFnSwitch??!1),n(3,i=c.customFn??`// 您可以参考这个案例进行修改，注意：请勿修改方法名和参数名，只需修改customFn内部实现即可
// 将字符串中形如"xxx^yyy"的部分替换成"xxx"
const customFn = (mdText) => {
  const regex = /\\^\\(\\[.*[0-9].*]\\(#.*#.*\\)\\)/g // 匹配格式为 ^[[数字]](#链接) 的脚注
  return mdText.replace(regex, "") // 使用空字符串替换匹配到的脚注
}

module.exports = customFn`)});const w=r=>h(r);function ne(){o=this.checked,n(1,o)}const $=r=>_(r);function D(){s=this.checked,n(2,s)}function z(){i=this.value,n(3,i)}function Y(){g=this.value,n(4,g)}function Z(){v=this.value,n(5,v)}return e.$$set=r=>{"pluginInstance"in r&&n(0,a=r.pluginInstance),"dialog"in r&&n(13,l=r.dialog)},[a,o,s,i,g,v,E,u,F,_,h,T,q,l,w,ne,$,D,z,Y,Z]}class ImportSetting extends SvelteComponent{constructor(t){super(),init(this,t,instance,create_fragment,safe_not_equal,{pluginInstance:0,dialog:13})}}async function initTopbar(e){const t=e.addTopBar({icon:iconImporter.iconImporter,title:e.i18n.importer,position:"right",callback:()=>{e.logger.info("this.i18n.importer added toolbar")}});t.addEventListener("click",async()=>{const a=siyuan.getFrontend(),l=a==="mobile"||a==="browser-mobile",o="siyuan-import-form",s=new siyuan.Dialog({title:`${e.i18n.selectFile} - ${e.i18n.importer}`,content:`<div id="${o}"></div>`,width:l?"92vw":"720px"});new ImportForm({target:document.getElementById(o),props:{pluginInstance:e,dialog:s}})}),t.addEventListener("contextmenu",()=>{let a=t.getBoundingClientRect();a.width===0&&(a=document.querySelector("#barMore").getBoundingClientRect()),n(e,a)});const n=async(a,l)=>{const o=new siyuan.Menu("importerContextMenu");o.addItem({iconHTML:iconImporter.iconSetting,label:a.i18n.setting,click:()=>{const s="siyuan-importing-setting",i=new siyuan.Dialog({title:`${a.i18n.setting} - ${a.i18n.importer}`,content:`<div id="${s}"></div>`,width:a.isMobile?"92vw":"720px"});new ImportSetting({target:document.getElementById(s),props:{pluginInstance:a,dialog:i}})}}),a.isMobile?o.fullscreen():o.open({x:l.right,y:l.bottom,isLeft:!0})}}const R=(e,t,n)=>{const a=t??"zhi",l=s=>{const i=s.getFullYear(),c=String(s.getMonth()+1).padStart(2,"0"),u=String(s.getDate()).padStart(2,"0"),F=String(s.getHours()).padStart(2,"0"),_=String(s.getMinutes()).padStart(2,"0"),h=String(s.getSeconds()).padStart(2,"0");return`${i}-${c}-${u} ${F}:${_}:${h}`},o=(s,i,c)=>{const u=l(new Date);c?console.log(`[${a}] [${u}] [${s}] [${e}] ${i}`,c):console.log(`[${a}] [${u}] [${s}] [${e}] ${i}`)};return{debug:(s,i)=>{n&&o("DEBUG",s,i)},info:(s,i)=>{const c=l(new Date);i?console.info(`[${a}] [${c}] [INFO] ${s}`,i):console.info(`[${a}] [${c}] [INFO] ${s}`)},warn:(s,i)=>{const c=l(new Date);i?console.warn(`[${a}] [${c}] [WARN] ${s}`,i):console.warn(`[${a}] [${c}] [WARN] ${s}`)},error:(s,i)=>{const c=l(new Date);i?console.error(typeof s=="string"?`[${a}] [${c}] [ERROR] ${s}`:`[${a}] [${c}] [ERROR] ${s.toString()}`,i):typeof s=="string"?console.error(`[${a}] [${c}] [ERROR] ${s.toString()}`):console.error(`[${a}] [${c}] [ERROR] an error occurred =>`,s)}}};class ImporterPlugin extends siyuan.Plugin{constructor(n){super(n);Ge(this,"logger");Ge(this,"kernelApi");Ge(this,"isMobile");const a=siyuan.getFrontend();this.isMobile=a==="mobile"||a==="browser-mobile",this.logger=R("index","importer",isDev),this.kernelApi=new KernelApi}async onload(){await initTopbar(this),this.logger.info("mediaDir=>",mediaDir),this.logger.info(this.i18n.importerLoaded)}async onunload(){this.logger.info(this.i18n.importerUnloaded)}}module.exports=ImporterPlugin;
