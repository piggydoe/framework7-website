(function framework7ComponentLoader(e,t){void 0===t&&(t=!0);var r=e.$,o=e.utils,i=(e.getDevice,e.getSupport,e.Class,e.Modal,e.ConstructorMethods,e.ModalMethods,o.bindMethods),n=o.iosPreloaderContent,s=o.mdPreloaderContent,l=o.auroraPreloaderContent;const d={open(e){const t=this,o=r(e).eq(0);if(o.length&&(o.addClass("treeview-item-opened"),o.trigger("treeview:open"),t.emit("treeviewOpen",o[0]),o.hasClass("treeview-load-children")&&!o[0].f7TreeviewChildrenLoaded)){const e={iosPreloaderContent:n,mdPreloaderContent:s,auroraPreloaderContent:l};o.trigger("treeview:loadchildren",i),t.emit("treeviewLoadChildren",o[0],i),o.find(".treeview-toggle").addClass("treeview-toggle-hidden"),o.find(".treeview-item-root").prepend(`<div class="preloader treeview-preloader">${e[`${t.theme}PreloaderContent`]}</div>`)}function i(e){e?(o.removeClass("treeview-item-opened"),o.trigger("treeview:close"),t.emit("treeviewClose",o[0])):o[0].f7TreeviewChildrenLoaded=!0,o.find(".treeview-toggle").removeClass("treeview-toggle-hidden"),o.find(".treeview-preloader").remove()}},close(e){const t=r(e).eq(0);t.length&&(t.removeClass("treeview-item-opened"),t.trigger("treeview:close"),this.emit("treeviewClose",t[0]))},toggle(e){const t=r(e).eq(0);if(!t.length)return;const o=t.hasClass("treeview-item-opened");this.treeview[o?"close":"open"](t)}};var a={name:"treeview",create(){i(this,{treeview:d})},clicks:{".treeview-toggle":function(e,t,r){if(e.parents(".treeview-item-toggle").length)return;const o=e.parents(".treeview-item").eq(0);o.length&&(r.preventF7Router=!0,this.treeview.toggle(o[0]))},".treeview-item-toggle":function(e,t,r){const o=e.closest(".treeview-item").eq(0);o.length&&(r.preventF7Router=!0,this.treeview.toggle(o[0]))}}};if(t){if(e.prototype.modules&&e.prototype.modules[a.name])return;e.use(a),e.instance&&(e.instance.useModuleParams(a,e.instance.params),e.instance.useModule(a))}return a}(Framework7, typeof Framework7AutoInstallComponent === 'undefined' ? undefined : Framework7AutoInstallComponent))
