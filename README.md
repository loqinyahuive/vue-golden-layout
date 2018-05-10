[![npm](https://img.shields.io/npm/v/vue-golden-layout.svg)](https://www.npmjs.com/package/vue-golden-layout)
# vue-golden-layout
Integration of the golden-layout to Vue
## Installation

```
npm install --save vue-golden-layout
```
In order to test, after cloning, a static application can be compiled :

```
npm install
npm fuse
npm run test/compile
```
The file dist/index.html then shows test/test.vue in action

## Example

```html
<layout-golden>
	<gl-col>
		<gl-component title="compA">
			<h1>CompA</h1>
		</gl-component>
		<gl-row>
			...
		</gl-row>
		<gl-stack>
			...
		</gl-stack>
	</gl-col>
</layout-golden>
```
## Usage
This library integrate a straightforward way bundling with [fuse-box](http://fuse-box.org/). If you make a project with this bundler, it will be straight-forward.

```javascript
import vgl from 'vue-golden-layout'
Vue.use(vgl);
```

Your `Vue` alias should be `vue.common`: using `vue.esm` can cause errors.

In case of incompatibility with bundlers, you can bundle `vue-golden-layout` by simply bundling the sources.
The sources entry point is in `vue-golden-layout/src/index.ts`

```javascript
import vgl from 'vue-golden-layout/src'
Vue.use(vgl);
```

The objects are differentiated into : The layout object (golden), the container objects (golden and glRow, glCol and glStack), the contained objects (glRow, glCol and glStack and glComponent).

### Control
The purpose has been to have it mainly behaving with Vue so :
- use v-if to add/remove an element
- v-for is supposed to work too but has not been tested

Properties like 'hidden' and 'title' are watched (but the 'hidden' property sucks)
#### CSS
The glComponent answers to this class to fit in the layout child container, that you can override
```stylus
.glComponent
	width 100%
	height 100%
	overflow auto
```
### Properties
#### glComponent
```typescript
title: string
```
#### Contained objects

```typescript
width: number
height: number
closable: boolean
hidden: boolean
```

### Events
#### Layout 
Straight forwards from golden-layout, refer to their doc
```javascript
itemCreated
stackCreated
rowCreated
tabCreated
columnCreated
componentCreated
selectionChanged
windowOpened
windowClosed
itemDestroyed
initialised
activeContentItemChanged
```
#### Contained objects
Straight forwards from golden-layout, refer to their doc
```javascript
show
shown
maximised
minimised
resize
hide
close
open
destroy
```
### Methods
#### Container
These are defined on the container objects

```javascript
addGlChild(child, comp)
```
'child' is a configuration object (cfr golden-layout doc.), 'comp' is a vue component of a contained object
The child.componentState.templateId will be managed : don't fuss with the IDs, just give the component (your specified ID won't be replaced)
```javascript
removeGlChild(index)
```
This function is called automatically on VueComponent.beforeDestroy
#### Contained objects
```javascript
hide()
show()
close()
```

# TODOs

## Re-ordering and interactions
For now, either Vue interact with the layout, either we let the user re-organise
- goldenKey property to elements (re-use the v-for :key ?)
- replicate the reorganisation in the ghost structure (list of empty &lt;div&gt; surrounded by display:none; replicating the layout tree)
