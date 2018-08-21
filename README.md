## Create store
```js
import {storeCreator, createStore} from "redux";

const store = createStore((state={count:0})=>{
  return state
});

console.log(store.getState());
```
## Change store using action
> action is an object that get to sent to the store.

> I would like to increment the count
```js
{
  type: 'INCREMENT'
}

```
> How do I send this action to the store
store.dispatch(
  {
  type: 'INCREMENT'
  }
)

> When we dispatch an action to the store something happen. Let us see by loging

```js
import {storeCreator, createStore} from "redux";

const store = createStore((state={count:0})=>{
  console.log('running');
  return state
});

console.log(store.getState());

store.dispatch(
  {
  type: 'INCREMENT'
  }
)
```
> for every dispatch store function is running
 ![redux](./DOC/redux_02.JPG)
## Pass the seconde argument `action`

```js
import {storeCreator, createStore} from "redux";

const store = createStore((state={count:0}, action)=>{
  console.log(action);
  return state
});

console.log(store.getState());

store.dispatch(
  {
  type: 'INCREMENT'
  }
)
```
 ![redux](./DOC/redux_03.JPG)

## increment counter if action type is 'INCREMENT'
```js
import { storeCreator, createStore } from "redux";

const store = createStore((state = { count: 0 }, action) => {
  if (action.type === "INCREMENT") {
    return {
      count: state.count + 1
    };
  } else return state;
});

console.log(store.getState());

store.dispatch({
  type: "INCREMENT"
});

console.log(store.getState());
```
 ![redux](./DOC/redux_04.JPG)

## Add one more dispatch to increment the counter
```js
import { storeCreator, createStore } from "redux";

const store = createStore((state = { count: 0 }, action) => {
  if (action.type === "INCREMENT") {
    return {
      count: state.count + 1
    };
  } else return state;
});

console.log(store.getState());

store.dispatch({
  type: "INCREMENT"
});

store.dispatch({
  type: "INCREMENT"
});

console.log(store.getState());
```
 ![redux](./DOC/redux_05.JPG)

## replace if with switch
```js
import { storeCreator, createStore } from "redux";

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    default:
      return state;
  }
});

console.log(store.getState());

store.dispatch({
  type: "INCREMENT"
});

store.dispatch({
  type: "INCREMENT"
});

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: "RESET"
});

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: "DECREMENT"
});

console.log(store.getState());
```
 ![redux](./DOC/redux_06.png)

## Implement 'DECREMENT' & 'RESET' actions
```js
import { storeCreator, createStore } from "redux";

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        count: state.count - 1
      }
    case 'RESET': 
      return {
        count: 0
      }
    default:
      return state;
  }
});

console.log(store.getState());

store.dispatch({
  type: "INCREMENT"
});

store.dispatch({
  type: "INCREMENT"
});

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: "RESET"
});

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: "DECREMENT"
});

console.log(store.getState());
```
 ![redux](./DOC/redux_07.png)

## Use store.subscribe() 
```js
store.subscribe(()=>{
// run every time the store state changes. 
})
```
> use to log store state
```js
store.subscribe(() => {
  console.log(store.getState());
});
```

## How do we stop subscription
> call return value of subscribe
```js
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
unsubscribe();
```
```js
import { storeCreator, createStore } from "redux";

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        count: state.count - 1
      }
    case 'RESET': 
      return {
        count: 0
      }
    default:
      return state;
  }
});
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: "INCREMENT"
});
unsubscribe();
store.dispatch({
  type: "INCREMENT"
});

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: "RESET"
});

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: "DECREMENT"
});

console.log(store.getState());

```
 ![redux](./DOC/redux_08.png)

## How to pass data more than type in an action
> Increment by 5

```js
import { storeCreator, createStore } from "redux";

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
    case 'DECREMENT':
      return {
        count: state.count - 1
      }
    case 'RESET': 
      return {
        count: 0
      }
    default:
      return state;
  }
});
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: "INCREMENT",
  incrementBy: 5
});
// unsubscribe();
store.dispatch({
  type: "INCREMENT"
});

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: "RESET"
});

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: "DECREMENT"
});

console.log(store.getState());

```
 ![redux](./DOC/redux_09.png)
## Fix NaN
```js
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === "number" ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      }
    case 'DECREMENT':
      return {
        count: state.count - 1
      }
    case 'RESET': 
      return {
        count: 0
      }
    default:
      return state;
  }
});
```
 ![redux](./DOC/redux_10.png)

## Decrement by 10
```js
const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === "number" ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      }
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      }
    case 'RESET': 
      return {
        count: 0
      }
    default:
      return state;
  }
});
```
 ![redux](./DOC/redux_11.png)
## Fix error
```js
import { storeCreator, createStore } from "redux";

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === "number" ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      }
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === "number" ? action.decrementBy : -1;
      return {
        count: state.count - decrementBy
      }
    case 'RESET': 
      return {
        count: 0
      }
    default:
      return state;
  }
});
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: "INCREMENT",
  incrementBy: 5
});
// unsubscribe();
store.dispatch({
  type: "INCREMENT"
});

store.dispatch({
  type: "DECREMENT",
  decrementBy: 10
});

store.dispatch({
  type: "RESET"
});

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: "DECREMENT"
});

console.log(store.getState());
```

## add an action to set any number 'SET'
```js
import { storeCreator, createStore } from "redux";

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === "number" ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      }
    case 'DECREMENT':
      const decrementBy = typeof action.decrementBy === "number" ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy
      }
    case 'RESET': 
      return {
        count: 0
      }
    case 'SET': 
      const startNumber = typeof action.startNumber === "number"? action.startNumber: 0
      return {
        count: startNumber
      }
    default:
      return state;
  }
});
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: "INCREMENT",
  incrementBy: 5
});
// unsubscribe();
store.dispatch({
  type: "INCREMENT"
});

store.dispatch({
  type: "DECREMENT",
  decrementBy: 10
});

store.dispatch({
  type: "RESET"
});

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: "DECREMENT"
});

store.dispatch({
  type: 'SET',
  startNumber:100
});
console.log(store.getState());
```
 ![redux](./DOC/redux_12.png)
