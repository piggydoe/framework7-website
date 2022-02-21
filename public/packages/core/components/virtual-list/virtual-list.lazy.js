(function framework7ComponentLoader(e,t){void 0===t&&(t=!0);var l=e.$,s=e.utils,a=e.getDevice,r=(e.getSupport,e.Class),n=(e.Modal,e.ConstructorMethods),i=(e.ModalMethods,s.extend),o=s.deleteProps;class m extends r{constructor(e,t={}){super(t,[e]);const s=this,r=a(),n=getDocument();let o;"md"===e.theme?o=48:"ios"===e.theme?o=44:"aurora"===e.theme&&(o=38);const m={cols:1,height:o,cache:!0,dynamicHeightBufferSize:1,showFilteredItemsOnly:!1,renderExternal:void 0,setListHeight:!0,searchByItem:void 0,searchAll:void 0,ul:null,createUl:!0,scrollableParentEl:void 0,renderItem:e=>`\n            <li>\n              <div class="item-content">\n                <div class="item-inner">\n                  <div class="item-title">${e}</div>\n                </div>\n              </div>\n            </li>\n          `.trim(),on:{}};if(s.useModulesParams(m),s.params=i(m,t),void 0!==s.params.height&&s.params.height||(s.params.height=o),s.$el=l(t.el),s.el=s.$el[0],0===s.$el.length)return;s.$el[0].f7VirtualList=s,s.items=s.params.items,s.params.showFilteredItemsOnly&&(s.filteredItems=[]),s.params.renderItem&&(s.renderItem=s.params.renderItem),s.$pageContentEl=s.$el.parents(".page-content"),s.pageContentEl=s.$pageContentEl[0],s.$scrollableParentEl=s.params.scrollableParentEl?l(s.params.scrollableParentEl).eq(0):s.$pageContentEl,!s.$scrollableParentEl.length&&s.$pageContentEl.length&&(s.$scrollableParentEl=s.$pageContentEl),s.scrollableParentEl=s.$scrollableParentEl[0],void 0!==s.params.updatableScroll?s.updatableScroll=s.params.updatableScroll:(s.updatableScroll=!0,r.ios&&r.osVersion.split(".")[0]<8&&(s.updatableScroll=!1));const h=s.params.ul;let c;s.$ul=h?l(s.params.ul):s.$el.children("ul"),0===s.$ul.length&&s.params.createUl&&(s.$el.append("<ul></ul>"),s.$ul=s.$el.children("ul")),s.ul=s.$ul[0],c=s.ul||s.params.createUl?s.$ul:s.$el,i(s,{$itemsWrapEl:c,itemsWrapEl:c[0],domCache:{},displayDomCache:{},tempDomElement:n.createElement("ul"),lastRepaintY:null,fragment:n.createDocumentFragment(),pageHeight:void 0,rowsPerScreen:void 0,rowsBefore:void 0,rowsAfter:void 0,rowsToRender:void 0,maxBufferHeight:0,listHeight:void 0,dynamicHeight:"function"==typeof s.params.height}),s.useModules();const p=s.handleScroll.bind(s),d=s.handleResize.bind(s);let f,g,u,I;return s.attachEvents=function(){f=s.$el.parents(".page").eq(0),g=s.$el.parents(".tab").filter((e=>0===l(e).parent(".tabs").parent(".tabs-animated-wrap, .tabs-swipeable-wrap").length)).eq(0),u=s.$el.parents(".panel").eq(0),I=s.$el.parents(".popup").eq(0),s.$scrollableParentEl.on("scroll",p),f.length&&f.on("page:reinit",d),g.length&&g.on("tab:show",d),u.length&&u.on("panel:open",d),I.length&&I.on("popup:open",d),e.on("resize",d)},s.detachEvents=function(){s.$scrollableParentEl.off("scroll",p),f.length&&f.off("page:reinit",d),g.length&&g.off("tab:show",d),u.length&&u.off("panel:open",d),I.length&&I.off("popup:open",d),e.off("resize",d)},s.init(),s}setListSize(){const e=this,t=e.filteredItems||e.items;if(e.pageHeight=e.$scrollableParentEl[0].offsetHeight,e.dynamicHeight){e.listHeight=0,e.heights=[];for(let l=0;l<t.length;l+=1){const s=e.params.height(t[l]);e.listHeight+=s,e.heights.push(s)}}else e.listHeight=Math.ceil(t.length/e.params.cols)*e.params.height,e.rowsPerScreen=Math.ceil(e.pageHeight/e.params.height),e.rowsBefore=e.params.rowsBefore||2*e.rowsPerScreen,e.rowsAfter=e.params.rowsAfter||e.rowsPerScreen,e.rowsToRender=e.rowsPerScreen+e.rowsBefore+e.rowsAfter,e.maxBufferHeight=e.rowsBefore/2*e.params.height;(e.updatableScroll||e.params.setListHeight)&&e.$itemsWrapEl.css({height:`${e.listHeight}px`})}render(e,t){const l=this;e&&(l.lastRepaintY=null);let s=-(l.$el[0].getBoundingClientRect().top-l.$scrollableParentEl[0].getBoundingClientRect().top);if(void 0!==t&&(s=t),!(null===l.lastRepaintY||Math.abs(s-l.lastRepaintY)>l.maxBufferHeight||!l.updatableScroll&&l.$scrollableParentEl[0].scrollTop+l.pageHeight>=l.$scrollableParentEl[0].scrollHeight))return;l.lastRepaintY=s;const a=l.filteredItems||l.items;let r,n,i,o=0,m=0;if(l.dynamicHeight){let e,t=0;l.maxBufferHeight=l.pageHeight;for(let a=0;a<l.heights.length;a+=1)e=l.heights[a],void 0===r&&(t+e>=s-2*l.pageHeight*l.params.dynamicHeightBufferSize?r=a:o+=e),void 0===n&&((t+e>=s+2*l.pageHeight*l.params.dynamicHeightBufferSize||a===l.heights.length-1)&&(n=a+1),m+=e),t+=e;n=Math.min(n,a.length)}else r=(parseInt(s/l.params.height,10)-l.rowsBefore)*l.params.cols,r<0&&(r=0),n=Math.min(r+l.rowsToRender*l.params.cols,a.length);const h=[];let c;for(l.reachEnd=!1,c=r;c<n;c+=1){let e;const t=l.items.indexOf(a[c]);c===r&&(l.currentFromIndex=t),c===n-1&&(l.currentToIndex=t),l.filteredItems?l.items[t]===l.filteredItems[l.filteredItems.length-1]&&(l.reachEnd=!0):t===l.items.length-1&&(l.reachEnd=!0),l.params.renderExternal?h.push(a[c]):l.domCache[t]?(e=l.domCache[t],e.f7VirtualListIndex=t):(l.renderItem?l.tempDomElement.innerHTML=l.renderItem(a[c],t).trim():l.tempDomElement.innerHTML=a[c].toString().trim(),e=l.tempDomElement.childNodes[0],l.params.cache&&(l.domCache[t]=e),e.f7VirtualListIndex=t),c===r&&(i=l.dynamicHeight?o:c*l.params.height/l.params.cols),l.params.renderExternal||(e.style.top=`${i}px`,l.emit("local::itemBeforeInsert vlItemBeforeInsert",l,e,a[c]),l.fragment.appendChild(e))}l.updatableScroll||(l.dynamicHeight?l.itemsWrapEl.style.height=`${m}px`:l.itemsWrapEl.style.height=c*l.params.height/l.params.cols+"px"),l.params.renderExternal?a&&0===a.length&&(l.reachEnd=!0):(l.emit("local::beforeClear vlBeforeClear",l,l.fragment),l.itemsWrapEl.innerHTML="",l.emit("local::itemsBeforeInsert vlItemsBeforeInsert",l,l.fragment),a&&0===a.length?(l.reachEnd=!0,l.params.emptyTemplate&&(l.itemsWrapEl.innerHTML=l.params.emptyTemplate)):l.itemsWrapEl.appendChild(l.fragment),l.emit("local::itemsAfterInsert vlItemsAfterInsert",l,l.fragment)),void 0!==t&&e&&l.$scrollableParentEl.scrollTop(t,0),l.params.renderExternal&&l.params.renderExternal(l,{fromIndex:r,toIndex:n,listHeight:l.listHeight,topPosition:i,items:h})}filterItems(e,t=!0){const l=this;l.filteredItems=[];for(let t=0;t<e.length;t+=1)l.filteredItems.push(l.items[e[t]]);t&&(l.$scrollableParentEl[0].scrollTop=0),l.update()}resetFilter(){const e=this;e.params.showFilteredItemsOnly?e.filteredItems=[]:(e.filteredItems=null,delete e.filteredItems),e.update()}scrollToItem(e){const t=this;if(e>t.items.length)return!1;let l=0;if(t.dynamicHeight)for(let s=0;s<e;s+=1)l+=t.heights[s];else l=e*t.params.height;const s=t.$el[0].offsetTop;return t.render(!0,s+l-parseInt(t.$scrollableParentEl.css("padding-top"),10)),!0}handleScroll(){this.render()}isVisible(){const e=this;return!!(e.el.offsetWidth||e.el.offsetHeight||e.el.getClientRects().length)}handleResize(){const e=this;e.isVisible()&&(e.setListSize(),e.render(!0))}appendItems(e){const t=this;for(let l=0;l<e.length;l+=1)t.items.push(e[l]);t.update()}appendItem(e){this.appendItems([e])}replaceAllItems(e){const t=this;t.items=e,delete t.filteredItems,t.domCache={},t.update()}replaceItem(e,t){const l=this;l.items[e]=t,l.params.cache&&delete l.domCache[e],l.update()}prependItems(e){const t=this;for(let l=e.length-1;l>=0;l-=1)t.items.unshift(e[l]);if(t.params.cache){const l={};Object.keys(t.domCache).forEach((s=>{l[parseInt(s,10)+e.length]=t.domCache[s]})),t.domCache=l}t.update()}prependItem(e){this.prependItems([e])}moveItem(e,t){const l=this,s=e;let a=t;if(s===a)return;const r=l.items.splice(s,1)[0];if(a>=l.items.length?(l.items.push(r),a=l.items.length-1):l.items.splice(a,0,r),l.params.cache){const e={};Object.keys(l.domCache).forEach((t=>{const r=parseInt(t,10),n=s<a?s:a,i=s<a?a:s,o=s<a?-1:1;(r<n||r>i)&&(e[r]=l.domCache[r]),r===n&&(e[i]=l.domCache[r]),r>n&&r<=i&&(e[r+o]=l.domCache[r])})),l.domCache=e}l.update()}insertItemBefore(e,t){const l=this;if(0!==e)if(e>=l.items.length)l.appendItem(t);else{if(l.items.splice(e,0,t),l.params.cache){const t={};Object.keys(l.domCache).forEach((s=>{const a=parseInt(s,10);a>=e&&(t[a+1]=l.domCache[a])})),l.domCache=t}l.update()}else l.prependItem(t)}deleteItems(e){const t=this;let l,s=0;for(let a=0;a<e.length;a+=1){let r=e[a];void 0!==l&&r>l&&(s=-a),r+=s,l=e[a];const n=t.items.splice(r,1)[0];if(t.filteredItems&&t.filteredItems.indexOf(n)>=0&&t.filteredItems.splice(t.filteredItems.indexOf(n),1),t.params.cache){const e={};Object.keys(t.domCache).forEach((l=>{const s=parseInt(l,10);s===r?delete t.domCache[r]:parseInt(l,10)>r?e[s-1]=t.domCache[l]:e[s]=t.domCache[l]})),t.domCache=e}}t.update()}deleteAllItems(){const e=this;e.items=[],delete e.filteredItems,e.params.cache&&(e.domCache={}),e.update()}deleteItem(e){this.deleteItems([e])}clearCache(){this.domCache={}}update(e){const t=this;e&&t.params.cache&&(t.domCache={}),t.setListSize(),t.render(!0)}init(){const e=this;e.attachEvents(),e.setListSize(),e.render()}destroy(){let e=this;e.detachEvents(),e.$el[0].f7VirtualList=null,delete e.$el[0].f7VirtualList,o(e),e=null}}var h={name:"virtualList",static:{VirtualList:m},create(){this.virtualList=n({defaultSelector:".virtual-list",constructor:m,app:this,domProp:"f7VirtualList"})}};if(t){if(e.prototype.modules&&e.prototype.modules[h.name])return;e.use(h),e.instance&&(e.instance.useModuleParams(h,e.instance.params),e.instance.useModule(h))}return h}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
