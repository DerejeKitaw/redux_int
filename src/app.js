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
