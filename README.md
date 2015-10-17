# [ReactJS](https://facebook.github.io/react/) Tutorial

## Build
```bash
npm install
gulp
```

## Preview
[http://localhost:8080](http://localhost:8080)

![preview](https://raw.githubusercontent.com/michalkowol/reactjs-tutorial/master/app/img/react.png)

## Steps
### Step 1
* Break wireframe to components.
* Build hierarchy of components.
* Build static version of you components.
* Use only props.

![preview](https://raw.githubusercontent.com/michalkowol/reactjs-tutorial/master/app/img/react_comp.png)

### Step 2
* Identify minimal state.
* Identify state owner - it should be component that owns other subcomponents.  If you cannot find common owner of the state, create component, which would be responsible for having the state.

### Step 3
* Add two-way bindings.

### Step 4
* Add loading on AJAX calls - use signals or promises.

### Step 5
* Use [Flux](https://github.com/facebook/flux) architecture.

### Step 6
* Use [Flux](https://github.com/facebook/flux) pattern but without Flux library.

## References
* https://facebook.github.io/react/
* https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#what-components-should-have-state
* https://facebook.github.io/react/docs/thinking-in-react.html
* https://github.com/michalkowol/reactjs-tutorial
* https://github.com/uberVU/react-guide/blob/master/props-vs-state.md
* https://speakerdeck.com/vjeux/react-css-in-js
* https://github.com/planningcenter/react-patterns
* http://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html
* https://facebook.github.io/react-native/
* http://blog.500tech.com/is-reactjs-fast/
* https://facebook.github.io/react/blog/page12/
* http://calendar.perfplanet.com/2013/diff/
* https://github.com/facebook/flux