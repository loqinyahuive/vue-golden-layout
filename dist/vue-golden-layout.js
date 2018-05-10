    function syntheticDefaultExportPolyfill(input){
        return input !== null && ['function', 'object', 'array']
            .indexOf(typeof input) > -1 && input.default === undefined ?
                 Object.isFrozen(input) ? input.default = input : Object.defineProperty(input, "default", {value : input, writable : true, enumerable : false}) : void 0;
    }
    var _3a48 = {};
    _3a48.f = {}
    // cached modules
    _3a48.m = {};
    _3a48.r = function(id) {
        var cached = _3a48.m[id];
        // resolve if in cache
        if (cached) {
            return cached.m.exports;
        }
        var file = _3a48.f[id];
        if (!file)
            return;
        cached = _3a48.m[id] = {};
        cached.exports = {};
        cached.m = { exports: cached.exports };
        file.call(cached.exports, cached.m, cached.exports);
        syntheticDefaultExportPolyfill(cached.m.exports);
        return cached.m.exports;
    };
// vue-golden-layout/index.js
_3a48.f[0] = function(module,exports){
Object.defineProperty(exports, '__esModule', { value: true });
require('golden-layout/src/css/goldenlayout-base.css');
require('golden-layout/src/css/goldenlayout-light-theme.css');
var golden_vue_1 = _3a48.r(1);
exports.layoutGolden = golden_vue_1.default;
var gl_component_vue_1 = _3a48.r(3);
exports.glComponent = gl_component_vue_1.default;
var gl_group_1 = _3a48.r(4);
exports.glRow = gl_group_1.glRow;
exports.glCol = gl_group_1.glCol;
exports.glStack = gl_group_1.glStack;
var components = {
    layoutGolden: golden_vue_1.default,
    glComponent: gl_component_vue_1.default,
    glRow: gl_group_1.glRow,
    glCol: gl_group_1.glCol,
    glStack: gl_group_1.glStack
};
exports.default = {
    install: function (Vue, options) {
        for (var i in components)
            Vue.component(i, components[i]);
    }
};
}
// vue-golden-layout/golden.vue
_3a48.f[1] = function(module,exports){
var _options = { _vueModuleId: 'data-v-6a5e4ed9' };
Object.assign(_options, {
    _scopeId: null,
    render: function render() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c('div', {
            directives: [{
                    name: 'resize',
                    rawName: 'v-resize',
                    value: _vm.onResize,
                    expression: 'onResize'
                }],
            ref: 'layoutRoot'
        }, [_vm._t('default')], 2);
    },
    staticRenderFns: []
});
var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
        return Reflect.metadata(k, v);
};
Object.defineProperty(exports, '__esModule', { value: true });
var vue_property_decorator_1 = require('vue-property-decorator');
var GoldenLayout = require('golden-layout');
var gl_roles_1 = _3a48.r(2);
var resize = require('vue-resize-directive');
var layoutGolden = function (_super) {
    __extends(layoutGolden, _super);
    function layoutGolden() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.comps = [];
        return _this;
    }
    layoutGolden.prototype.settingsChanged = function () {
    };
    layoutGolden.prototype.dimensionsChanged = function () {
    };
    layoutGolden.prototype.registerComp = function (component) {
        this.comps.push(component);
        return 'lgc-' + this.comps.length;
    };
    layoutGolden.prototype.mounted = function () {
        var _this = this;
        var layoutRoot = this.$refs.layoutRoot, gl, comps = this.comps;
        this.config.settings = {
            hasHeaders: this.hasHeaders,
            reorderEnabled: this.reorderEnabled,
            selectionEnabled: this.selectionEnabled,
            popoutWholeStack: this.popoutWholeStack,
            blockedPopoutsThrowError: this.blockedPopoutsThrowError,
            closePopoutsOnUnload: this.closePopoutsOnUnload,
            showPopoutIcon: this.showPopoutIcon,
            showMaximiseIcon: this.showMaximiseIcon,
            showCloseIcon: this.showCloseIcon
        };
        this.gl = gl = new GoldenLayout(this.config, layoutRoot);
        gl.registerComponent('template', function (container, state) {
            var id = state.templateId.split('-');
            console.assert('lgc' === id[0] && 2 === id.length, 'GoldenLayout consistency: components are registered with a lgc-xxx id');
            var comp = comps[id[1] - 1];
            container.getElement().append(comp.childEl);
            forwardEvt(container, comp, comp.events);
            comp.container = container;
        });
        gl.init();
        gl.on('stateChanged', function () {
            return _this.$emit('stateChanged', gl.toConfig());
        });
        forwardEvt(gl, this, [
            'itemCreated',
            'stackCreated',
            'rowCreated',
            'tabCreated',
            'columnCreated',
            'componentCreated',
            'selectionChanged',
            'windowOpened',
            'windowClosed',
            'itemDestroyed',
            'initialised',
            'activeContentItemChanged'
        ]);
    };
    layoutGolden.prototype.contentItem = function () {
        return this.gl && this.gl.root;
    };
    Object.defineProperty(layoutGolden.prototype, 'state', {
        get: function () {
            return this.gl.config();
        },
        enumerable: true,
        configurable: true
    });
    layoutGolden.prototype.onResize = function () {
        this.gl && this.gl.updateSize();
    };
    __decorate([
        vue_property_decorator_1.Prop({
            type: Boolean,
            default: true
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'hasHeaders', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Boolean,
            default: true
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'reorderEnabled', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Boolean,
            default: false
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'selectionEnabled', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Boolean,
            default: true
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'popoutWholeStack', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Boolean,
            default: true
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'blockedPopoutsThrowError', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Boolean,
            default: true
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'closePopoutsOnUnload', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Boolean,
            default: true
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'showPopoutIcon', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Boolean,
            default: true
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'showMaximiseIcon', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Boolean,
            default: true
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'showCloseIcon', void 0);
    __decorate([
        vue_property_decorator_1.Watch('hasHeaders'),
        vue_property_decorator_1.Watch('reorderEnabled'),
        vue_property_decorator_1.Watch('selectionEnabled'),
        vue_property_decorator_1.Watch('popoutWholeStack'),
        vue_property_decorator_1.Watch('blockedPopoutsThrowError'),
        vue_property_decorator_1.Watch('closePopoutsOnUnload'),
        vue_property_decorator_1.Watch('showPopoutIcon'),
        vue_property_decorator_1.Watch('showMaximiseIcon'),
        vue_property_decorator_1.Watch('showCloseIcon'),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', void 0)
    ], layoutGolden.prototype, 'settingsChanged', null);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Number,
            default: 5
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'borderWidth', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Number,
            default: 10
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'minItemHeight', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Number,
            default: 10
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'minItemWidth', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Number,
            default: 20
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'headerHeight', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Number,
            default: 300
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'dragProxyWidth', void 0);
    __decorate([
        vue_property_decorator_1.Prop({
            type: Number,
            default: 200
        }),
        __metadata('design:type', Object)
    ], layoutGolden.prototype, 'dragProxyHeight', void 0);
    __decorate([
        vue_property_decorator_1.Watch('borderWidth'),
        vue_property_decorator_1.Watch('minItemHeight'),
        vue_property_decorator_1.Watch('minItemWidth'),
        vue_property_decorator_1.Watch('headerHeight'),
        vue_property_decorator_1.Watch('dragProxyWidth'),
        vue_property_decorator_1.Watch('dragProxyHeight'),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', []),
        __metadata('design:returntype', void 0)
    ], layoutGolden.prototype, 'dimensionsChanged', null);
    layoutGolden = __decorate([vue_property_decorator_1.Component({ directives: { resize: resize } })], layoutGolden);
    return layoutGolden;
}(gl_roles_1.goldenContainer);
exports.default = layoutGolden;
function forwardEvt(from, toward, events) {
    var _loop_1 = function (event) {
        from.on(event, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return 'object' === typeof event ? toward.$emit(event.type, event) : toward.$emit.apply(toward, [event].concat(args));
        });
    };
    for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
        var event = events_1[_i];
        _loop_1(event);
    }
}
Object.assign(exports.default.options || exports.default, _options);
}
// vue-golden-layout/gl-roles.js
_3a48.f[2] = function(module,exports){
var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
        return Reflect.metadata(k, v);
};
Object.defineProperty(exports, '__esModule', { value: true });
var vue_1 = require('vue/dist/vue.esm.js');
var vue_property_decorator_1 = require('vue-property-decorator');
var goldenContainer = function (_super) {
    __extends(goldenContainer, _super);
    function goldenContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.config = { content: [] };
        return _this;
    }
    goldenContainer.prototype.registerComp = function (component) {
        return null;
    };
    goldenContainer.prototype.addGlChild = function (child, comp, index) {
        if (comp)
            child = __assign({ componentState: { templateId: this.registerComp(comp) } }, child);
        var ci = this.contentItem();
        if (ci)
            ci.addChild(child, index);
        else if (undefined === index)
            this.config.content.push(child);
        else
            this.config.content.splice(index, 0, child);
    };
    goldenContainer.prototype.removeGlChild = function (index) {
        var ci = this.contentItem();
        if (ci) {
            ci.removeChild(ci.contentItems[index]);
            for (; index < ci.contentItems.length; ++index)
                ci.contentItems[index].index = index;
        } else {
            this.config.content.splice(index, 1);
            for (; index < this.config.content.length; ++index)
                this.config.content[index].index = index;
        }
    };
    goldenContainer.prototype.contentItem = function () {
        throw 'Not implemented';
    };
    goldenContainer = __decorate([vue_property_decorator_1.Component], goldenContainer);
    return goldenContainer;
}(vue_1.default);
exports.goldenContainer = goldenContainer;
var goldenChild = function (_super) {
    __extends(goldenChild, _super);
    function goldenChild() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.container = null;
        _this.events = [
            'show',
            'shown',
            'maximised',
            'minimised',
            'resize',
            'hide',
            'close',
            'open',
            'destroy'
        ];
        return _this;
    }
    goldenChild.prototype.reWidth = function (w) {
        this.container && this.container.setSize(w, false);
    };
    goldenChild.prototype.reHeight = function (h) {
        this.container && this.container.setSize(false, h);
    };
    Object.defineProperty(goldenChild.prototype, 'childConfig', {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(goldenChild.prototype, 'childEl', {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    goldenChild.prototype.hide = function () {
        this.container && this.container.hide();
    };
    goldenChild.prototype.show = function () {
        this.container && this.container.show();
    };
    goldenChild.prototype.setContainer = function (c) {
        this.container && this.container[this.hidden ? 'hide' : 'show']();
    };
    goldenChild.prototype.close = function () {
        this.container && this.container.close();
        this.$destroy();
    };
    goldenChild.prototype.created = function () {
        if (!this.$parent.addGlChild)
            throw new Error('gl-component can only appear directly in a layout-golden container');
    };
    goldenChild.prototype.mounted = function () {
        var dimensions = {};
        if (undefined !== this.width)
            dimensions.width = this.width;
        if (undefined !== this.height)
            dimensions.height = this.height;
        this.$parent.addGlChild(__assign({}, dimensions, this.childConfig), this, this.$parent.$children.indexOf(this));
    };
    goldenChild.prototype.beforeDestroy = function () {
        this.$parent.removeGlChild(this.$parent.$children.indexOf(this));
    };
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata('design:type', Number)
    ], goldenChild.prototype, 'width', void 0);
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata('design:type', Number)
    ], goldenChild.prototype, 'height', void 0);
    __decorate([
        vue_property_decorator_1.Watch('width'),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object]),
        __metadata('design:returntype', void 0)
    ], goldenChild.prototype, 'reWidth', null);
    __decorate([
        vue_property_decorator_1.Watch('height'),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object]),
        __metadata('design:returntype', void 0)
    ], goldenChild.prototype, 'reHeight', null);
    __decorate([
        vue_property_decorator_1.Prop({ default: false }),
        __metadata('design:type', Boolean)
    ], goldenChild.prototype, 'hidden', void 0);
    __decorate([
        vue_property_decorator_1.Watch('container'),
        vue_property_decorator_1.Watch('hidden'),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object]),
        __metadata('design:returntype', void 0)
    ], goldenChild.prototype, 'setContainer', null);
    __decorate([
        vue_property_decorator_1.Prop({ default: true }),
        __metadata('design:type', Boolean)
    ], goldenChild.prototype, 'closable', void 0);
    goldenChild = __decorate([vue_property_decorator_1.Component], goldenChild);
    return goldenChild;
}(vue_1.default);
exports.goldenChild = goldenChild;
}
// vue-golden-layout/gl-component.vue
_3a48.f[3] = function(module,exports){
var _options = { _vueModuleId: 'data-v-432204bb' };
Object.assign(_options, {
    _scopeId: null,
    render: function render() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c('div', { ref: 'glSource' }, [_c('div', {
                ref: 'glCompRoot',
                staticClass: 'glComponent'
            }, [_vm._t('default')], 2)]);
    },
    staticRenderFns: []
});
var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
        return Reflect.metadata(k, v);
};
Object.defineProperty(exports, '__esModule', { value: true });
var vue_property_decorator_1 = require('vue-property-decorator');
var gl_roles_1 = _3a48.r(2);
var glComponent = function (_super) {
    __extends(glComponent, _super);
    function glComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    glComponent.prototype.setTitle = function (title) {
        if (this.container)
            this.container.setTitle(title);
    };
    Object.defineProperty(glComponent.prototype, 'childEl', {
        get: function () {
            return this.$refs.glCompRoot;
        },
        enumerable: true,
        configurable: true
    });
    glComponent.prototype.toggleMaximise = function () {
        this.container && this.container.toggleMaximise();
    };
    Object.defineProperty(glComponent.prototype, 'childConfig', {
        get: function () {
            return {
                type: 'component',
                title: this.title,
                isClosable: this.closable,
                componentName: 'template'
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata('design:type', String)
    ], glComponent.prototype, 'title', void 0);
    __decorate([
        vue_property_decorator_1.Watch('title'),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object]),
        __metadata('design:returntype', void 0)
    ], glComponent.prototype, 'setTitle', null);
    glComponent = __decorate([vue_property_decorator_1.Component], glComponent);
    return glComponent;
}(gl_roles_1.goldenChild);
exports.default = glComponent;
Object.assign(exports.default.options || exports.default, _options);
_3a48.r(6)('style.css', '\n.glComponent {\n\twidth: 100%;\n\theight: 100%;\n\toverflow: auto;\n}\n');
}
// vue-golden-layout/gl-group.js
_3a48.f[4] = function(module,exports){
var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
        return Reflect.metadata(k, v);
};
Object.defineProperty(exports, '__esModule', { value: true });
var vue_property_decorator_1 = require('vue-property-decorator');
var gl_group_vue_1 = _3a48.r(5);
var glGroup = function (_super) {
    __extends(glGroup, _super);
    function glGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return glGroup;
}(gl_group_vue_1.default);
var glRow = function (_super) {
    __extends(glRow, _super);
    function glRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(glRow.prototype, 'childConfig', {
        get: function () {
            return __assign({
                isClosable: this.closable,
                type: 'row'
            }, this.config);
        },
        enumerable: true,
        configurable: true
    });
    glRow = __decorate([vue_property_decorator_1.Component], glRow);
    return glRow;
}(glGroup);
exports.glRow = glRow;
var glCol = function (_super) {
    __extends(glCol, _super);
    function glCol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(glCol.prototype, 'childConfig', {
        get: function () {
            return __assign({
                isClosable: this.closable,
                type: 'column'
            }, this.config);
        },
        enumerable: true,
        configurable: true
    });
    glCol = __decorate([vue_property_decorator_1.Component], glCol);
    return glCol;
}(glGroup);
exports.glCol = glCol;
var glStack = function (_super) {
    __extends(glStack, _super);
    function glStack() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'stack';
        return _this;
    }
    Object.defineProperty(glStack.prototype, 'childConfig', {
        get: function () {
            return __assign({
                activeItemIndex: this.activeItemIndex,
                isClosable: this.closable,
                type: 'stack'
            }, this.config);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        vue_property_decorator_1.Prop({
            default: 0,
            type: Number
        }),
        __metadata('design:type', Object)
    ], glStack.prototype, 'activeItemIndex', void 0);
    glStack = __decorate([vue_property_decorator_1.Component], glStack);
    return glStack;
}(glGroup);
exports.glStack = glStack;
}
// vue-golden-layout/gl-group.vue
_3a48.f[5] = function(module,exports){
var _options = { _vueModuleId: 'data-v-cb61d96b' };
Object.assign(_options, {
    _scopeId: null,
    render: function render() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c('div', { staticStyle: { 'display': 'none' } }, [_vm._t('default')], 2);
    },
    staticRenderFns: []
});
var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
        return Reflect.metadata(k, v);
};
Object.defineProperty(exports, '__esModule', { value: true });
var vue_property_decorator_1 = require('vue-property-decorator');
var gl_roles_1 = _3a48.r(2);
var glGroup = function (_super) {
    __extends(glGroup, _super);
    function glGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    glGroup.prototype.registerComp = function (component) {
        return this.$parent.registerComp(component);
    };
    glGroup.prototype.contentItem = function () {
        var ci = this.$parent.contentItem();
        return ci && ci.contentItems[Math.min(this.$parent.$children.indexOf(this), ci.contentItems.length)];
    };
    __decorate([
        vue_property_decorator_1.Prop({ default: false }),
        __metadata('design:type', Boolean)
    ], glGroup.prototype, 'closable', void 0);
    glGroup = __decorate([vue_property_decorator_1.Component({ mixins: [gl_roles_1.goldenChild] })], glGroup);
    return glGroup;
}(gl_roles_1.goldenContainer);
exports.default = glGroup;
Object.assign(exports.default.options || exports.default, _options);
}
// fuse-box-css/index.js
_3a48.f[6] = function(module,exports){
var __filename = "index.js";
var runningInBrowser = false || 'npm' === 'electron';
var cssHandler = function (__filename, contents) {
    if (runningInBrowser) {
        var styleId = __filename.replace(/[\.\/]+/g, '-');
        if (styleId.charAt(0) === '-')
            styleId = styleId.substring(1);
        var exists = document.getElementById(styleId);
        if (!exists) {
            var s = document.createElement(contents ? 'style' : 'link');
            s.id = styleId;
            s.type = 'text/css';
            if (contents) {
                s.innerHTML = contents;
            } else {
                s.rel = 'stylesheet';
                s.href = __filename;
            }
            document.getElementsByTagName('head')[0].appendChild(s);
        } else {
            if (contents) {
                exists.innerHTML = contents;
            }
        }
    }
};
if (typeof FuseBox !== 'undefined' && runningInBrowser) {
    FuseBox.on('async', function (name) {
        if (/\.css$/.test(name)) {
            cssHandler(name);
            return false;
        }
    });
}
module.exports = cssHandler;
}
// tslib/tslib.js
_3a48.f[7] = function(module,exports){
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
(function (factory) {
    var root = 'object' === 'object' ? global : typeof self === 'object' ? self : typeof this === 'object' ? this : {};
    if ('undefined' === 'function' && define.amd) {
        define('tslib', ['exports'], function (exports) {
            factory(createExporter(root, createExporter(exports)));
        });
    } else if ('object' === 'object' && typeof module.exports === 'object') {
        factory(createExporter(root, createExporter(module.exports)));
    } else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === 'function') {
                Object.defineProperty(exports, '__esModule', { value: true });
            } else {
                exports.__esModule = true;
            }
        }
        return function (id, v) {
            return exports[id] = previous ? previous(id, v) : v;
        };
    }
}(function (exporter) {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p];
    };
    __extends = function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    __rest = function (s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === 'function')
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
                if (e.indexOf(p[i]) < 0)
                    t[p[i]] = s[p[i]];
        return t;
    };
    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    __param = function (paramIndex, decorator) {
        return function (target, key) {
            decorator(target, key, paramIndex);
        };
    };
    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
            return Reflect.metadata(metadataKey, metadataValue);
    };
    __awaiter = function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : new P(function (resolve) {
                    resolve(result.value);
                }).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    __generator = function (thisArg, body) {
        var _ = {
                label: 0,
                sent: function () {
                    if (t[0] & 1)
                        throw t[1];
                    return t[1];
                },
                trys: [],
                ops: []
            }, f, y, t, g;
        return g = {
            next: verb(0),
            'throw': verb(1),
            'return': verb(2)
        }, typeof Symbol === 'function' && (g[Symbol.iterator] = function () {
            return this;
        }), g;
        function verb(n) {
            return function (v) {
                return step([
                    n,
                    v
                ]);
            };
        }
        function step(op) {
            if (f)
                throw new TypeError('Generator is already executing.');
            while (_)
                try {
                    if (f = 1, y && (t = y[op[0] & 2 ? 'return' : op[0] ? 'throw' : 'next']) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [
                            0,
                            t.value
                        ];
                    switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return {
                            value: op[1],
                            done: false
                        };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [
                        6,
                        e
                    ];
                    y = 0;
                } finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return {
                value: op[0] ? op[1] : void 0,
                done: true
            };
        }
    };
    __exportStar = function (m, exports) {
        for (var p in m)
            if (!exports.hasOwnProperty(p))
                exports[p] = m[p];
    };
    __values = function (o) {
        var m = typeof Symbol === 'function' && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return {
                    value: o && o[i++],
                    done: !o
                };
            }
        };
    };
    __read = function (o, n) {
        var m = typeof Symbol === 'function' && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        } catch (error) {
            e = { error: error };
        } finally {
            try {
                if (r && !r.done && (m = i['return']))
                    m.call(i);
            } finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    };
    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };
    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.');
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb('next'), verb('throw'), verb('return'), i[Symbol.asyncIterator] = function () {
            return this;
        }, i;
        function verb(n) {
            if (g[n])
                i[n] = function (v) {
                    return new Promise(function (a, b) {
                        q.push([
                            n,
                            v,
                            a,
                            b
                        ]) > 1 || resume(n, v);
                    });
                };
        }
        function resume(n, v) {
            try {
                step(g[n](v));
            } catch (e) {
                settle(q[0][3], e);
            }
        }
        function step(r) {
            r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
        }
        function fulfill(value) {
            resume('next', value);
        }
        function reject(value) {
            resume('throw', value);
        }
        function settle(f, v) {
            if (f(v), q.shift(), q.length)
                resume(q[0][0], q[0][1]);
        }
    };
    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb('next'), verb('throw', function (e) {
            throw e;
        }), verb('return'), i[Symbol.iterator] = function () {
            return this;
        }, i;
        function verb(n, f) {
            if (o[n])
                i[n] = function (v) {
                    return (p = !p) ? {
                        value: __await(o[n](v)),
                        done: n === 'return'
                    } : f ? f(v) : v;
                };
        }
    };
    __asyncValues = function (o) {
        if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.');
        var m = o[Symbol.asyncIterator];
        return m ? m.call(o) : typeof __values === 'function' ? __values(o) : o[Symbol.iterator]();
    };
    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, 'raw', { value: raw });
        } else {
            cooked.raw = raw;
        }
        return cooked;
    };
    __importStar = function (mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    result[k] = mod[k];
        result['default'] = mod;
        return result;
    };
    __importDefault = function (mod) {
        return mod && mod.__esModule ? mod : { 'default': mod };
    };
    exporter('__extends', __extends);
    exporter('__assign', __assign);
    exporter('__rest', __rest);
    exporter('__decorate', __decorate);
    exporter('__param', __param);
    exporter('__metadata', __metadata);
    exporter('__awaiter', __awaiter);
    exporter('__generator', __generator);
    exporter('__exportStar', __exportStar);
    exporter('__values', __values);
    exporter('__read', __read);
    exporter('__spread', __spread);
    exporter('__await', __await);
    exporter('__asyncGenerator', __asyncGenerator);
    exporter('__asyncDelegator', __asyncDelegator);
    exporter('__asyncValues', __asyncValues);
    exporter('__makeTemplateObject', __makeTemplateObject);
    exporter('__importStar', __importStar);
    exporter('__importDefault', __importDefault);
}));
}
module.exports = _3a48.r(0)