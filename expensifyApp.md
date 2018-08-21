## Create state for expensify app
```js
const demoState = {
  expense: [{
    id: 'fgfgdfdg',
    description: 'March Rent',
    note: 'This is final payment for my house',
    amount: 540,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};
```
## Actions we are going to create
```JS
ADD_EXPENSE
REMOVE_EXPENSE
EDIT_EXPENSE
SET_TEXT_FILTER
SORT_BY_DATE
SET_START_DATE
SET_END_DATE
```
> Setting up all of this actions in a single reducer is just not visible.

> So we will create two reducer one for expense and other for filter

## create expenses reducer
```js
const expensesReducerDefault = [];

const expenseReducer = (state=expensesReducerDefault, action) => {
  switch (action.type) {

    default:
      return state;
  }
}
```
## create a store
```js
import { createStore} from 'redux';

const expensesReducerDefault = [];

const expenseReducer = (state=expensesReducerDefault, action) => {
  switch (action.type) {

    default:
      return state;
  }
}
const store = createStore(expenseReducer);
console.log(store.getState());
const demoState = {
  expense: [{
    id: 'fgfgdfdg',
    description: 'March Rent',
    note: 'This is final payment for my house',
    amount: 540,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};

```
 ![redux](./DOC/expensify_1.png)
> The empty array shows our store is  created but we do not want the store to be an array. We want expense to be an array. To do that we need to use combineReducer which will help us to combine multiple reducer.
> Combine reducer is a function and take an object with key value pair of each state name and its corresponding reducers
```js
const expensesReducerDefault = [];

const expensesReducer = (state=expensesReducerDefault, action) => {
  switch (action.type) {

    default:
      return state;
  }
}
const store = createStore(combineReducers({
  expenses:expensesReducer
}));
```
 ![redux](./DOC/expensify_2.png)
> Now the redux store is an object
## Create filters reducers with (text='', sortBy => 'date', startDate=>undefined, endDate=>undefined)
```js
// Filter Reducer
const filtersReducerDefault = [{text:'', sortBy :'date', startDate:undefined, endDate:undefined}];
const filtersReducer = (state=filtersReducerDefault, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
```
> All 

```js
import { createStore, combineReducers} from 'redux';

const expensesReducerDefault = [];
// Expenses Reducer
const expensesReducer = (state=expensesReducerDefault, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
// Filter Reducer
const filtersReducerDefault = [{text:'', sortBy :'date', startDate:undefined, endDate:undefined}];
const filtersReducer = (state=filtersReducerDefault, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters:filtersReducer
}));
console.log(store.getState());
const demoState = {
  expenses: [{
    id: 'fgfgdfdg',
    description: 'March Rent',
    note: 'This is final payment for my house',
    amount: 540,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};
```
 ![redux](./DOC/expensify_3.png)

## Create actions
> destructure and default value

> pass to expense object
```js
import uuid from 'uuid';
// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});
```
## subscribe to the store
```js
store.subscribe(() => {
  console.log(store.getState());
});
```
## dispatch an action
```js
store.dispatch(addExpense({ discription: 'Rent', amount: 100 }));
```
## the dispatch action will go through both reducers

## Setup case to the reducer to do something when action dispatched
```js
// Expenses Reducer
const expensesReducer = (state = expensesReducerDefault, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
    return state.concat(action.expense)
         
    default:
      return state;
  }
};
```
 ![redux](./DOC/expensify_4.png)
## use spread operator for concat
```js
return state.concat(action.expense)
```
TO
```js
return [
    ...state,
    action.expense
];
```
## Dispatch one more expense
```js
store.dispatch(addExpense({description:'coffee', amount:300}));
```
 ![redux](./DOC/expensify_5.png)

## Create an action to remove expenses
> first need to find expense to be removed
```js
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300 }));
console.log('expenseOne',expenseOne);
console.log('expenseTwo',expenseTwo);
```
 ![redux](./DOC/expensify_6.png)
> So to get the id of the expense `expenseOne.expense.id`
store.dispatch(removeExpense({id:expenseOne.expense.id}));

```js
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
  });
// REMOVE_EXPENSE
const removeExpense = ({id}={}) => ({
  type: 'REMOVE_EXPENSE',
  id
})
const expensesReducerDefault = [];
// Expenses Reducer
const expensesReducer = (state = expensesReducerDefault, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
         
    default:
      return state;
  }
};
// Filter Reducer
const filtersReducerDefault = [
  { text: '', sortBy: 'date', startDate: undefined, endDate: undefined }
];
const filtersReducer = (state = filtersReducerDefault, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300 }));
store.dispatch(removeExpense({id:expenseOne.expense.id}));
console.log('expenseOne',expenseOne);
console.log('expenseTwo',expenseTwo);
const demoState = {
  expenses: [
    {
      id: 'fgfgdfdg',
      description: 'March Rent',
      note: 'This is final payment for my house',
      amount: 540,
      createdAt: 0
    }
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};

```
 ![redux](./DOC/expensify_7.png)

## Create editExpense action creator
> store.dispatch(editExpense(expenseTwo.expense.id, {amount:500}));

## install babel-plugin-transform-object-rest-spread
> yarn add babel-plugin-transform-object-rest-spread@6.23.0

> set .babelrc file
```json
{
  "presets": ["env"],
  "plugins": [
    "transform-object-rest-spread"
  ]
}
```
```js
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
  });
// REMOVE_EXPENSE
const removeExpense = ({id}={}) => ({
  type: 'REMOVE_EXPENSE',
  id
})
// EDIT_EXPENSE
const editExpense = (id,updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})
const expensesReducerDefault = [];
// Expenses Reducer
const expensesReducer = (state = expensesReducerDefault, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
         
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id === action.id){
          return {
            ...expense,
            ...action.updates
          };
      }else {
        return expense
        }
      });
         
    default:
      return state;
  }
};
// Filter Reducer
const filtersReducerDefault = [
  { text: '', sortBy: 'date', startDate: undefined, endDate: undefined }
];
const filtersReducer = (state = filtersReducerDefault, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300 }));
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

store.dispatch(removeExpense({id:expenseOne.expense.id}));
console.log('expenseOne',expenseOne);
console.log('expenseTwo',expenseTwo);
const demoState = {
  expenses: [
    {
      id: 'fgfgdfdg',
      description: 'March Rent',
      note: 'This is final payment for my house',
      amount: 540,
      createdAt: 0
    }
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};
```
## Implement the following action creator
> store.dispatch(setTextFilter('rent'));
> store.dispatch(setTextFilter());
```js
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
  });
// REMOVE_EXPENSE
const removeExpense = ({id}={}) => ({
  type: 'REMOVE_EXPENSE',
  id
})
// EDIT_EXPENSE
const editExpense = (id,updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})
// SET_TEXT_FILTER
const setTextFilter = (text='') => ({
  type: 'SET_TEXT_FILTER',
  text
})
const expensesReducerDefault = [];
// Expenses Reducer
const expensesReducer = (state = expensesReducerDefault, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
         
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if(expense.id === action.id){
          return {
            ...expense,
            ...action.updates
          };
      }else {
        return expense
        }
      });
         
 
         
    default:
      return state;
  }
};
// Filter Reducer
const filtersReducerDefault = [
  { text: '', sortBy: 'date', startDate: undefined, endDate: undefined }
];
const filtersReducer = (state = filtersReducerDefault, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
    }
    default:
      return state;
  }
};
// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300 }));
store.dispatch(removeExpense({id:expenseOne.expense.id}));
store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
store.dispatch(setTextFilter('rent'));
store.dispatch(setTextFilter());

console.log('expenseOne',expenseOne);
console.log('expenseTwo',expenseTwo);
const demoState = {
  expenses: [
    {
      id: 'fgfgdfdg',
      description: 'March Rent',
      note: 'This is final payment for my house',
      amount: 540,
      createdAt: 0
    }
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined
  }
};

```
