import { storeCreator, createStore } from 'redux';

const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT',
  incrementBy
});
const decrementCount = ({ decrementBy = 1 } = {}) =>({
  type: 'DECREMENT',
  decrementBy
});
const setCount = ({ startNumber = 0 } = {}) =>({
  type: 'SET',
  startNumber
});
const resetCount = ({ resetBy = 1 } = {}) =>({
  type: 'RESET',
  resetBy
});


const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'RESET':
      return {
        count: 0
      };
    case 'SET':
      
      return {
        count: action.startNumber
      };
    default:
      return state;
  }
});
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(incrementCount({incrementBy:5}));
store.dispatch(incrementCount());
store.dispatch(decrementCount({decrementBy:5}));
store.dispatch(resetCount());
store.dispatch(decrementCount());
store.dispatch(decrementCount());
store.dispatch(setCount({startNumber: 100}));
