console.clear()

// We will model a Insurance company that will have a policies, history of claims and current cash balance as state objects

// Create Action Creators

// 1. Policy Creator : Create a new insurance policy with name of policy holder and premium amount

const createPolicy = (name, amount)= >{
  return {
      type:'CREATE_POLICY',
      payload:{
            name:name
            amount:amount
       }
  };  
};

//2. Delete Policy : Remove the policy for existing policy holder

const deletePolicy = (name) =>{
  return {
    type:'DELETE_POLICY',
    payload: {
      name:name
    }
  };
};

//3. Create Claim : Existing policy holder can create a claim that will eventually reduce the cash balance.

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type:'CREATE_CLAIM',
    payload:{
      name: name
      amountOfMoneyToCollect:amountOfMoneyToCollect 
    }
  }
}


// Create Reducers that will act on the actions. These reducers are various departments like Claims ( which will keep a history of claims) , Policy ( Keep track
// of all current policies 3) Accounting ( Keep track of current cash balance with an initial balance of $100)

//1. Claims History : Intiate with empty history and add new claims to the list

const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM'){
    return [...oldListOfClaims, action.payload]
  }
  
  return oldListOfClaims;
}

//2. Accounting : Keep track of bagOfMoney. Claim will reduce money and policy will increase the money

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === 'CREATE_CLAIM'){
    return bagOfMoney - action.payload.amountOfMoneyToCollect
  } else if ( action.type ==='CREATE_POLICY'){
    return bagOfMoney + action.payload.amount
  }
    return bagOfMoney
}


//3. Policy : Keep track of all policies. Add an remove names to the list of policies

const policies = (listOfPolicies = [], action) {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name]
  } else if (action.type === 'DELETE_POLICY'){
    return listOfPolicies.filter((name)=> name !== action.payload.name)
  }
  return listOfPolicies
}


// Initiate Redux

const {createStore, combineReducers} = Redux 

const ourDepartments = combineReducers ({
  accounting: accounting,
  claimsHistory: claimsHistory,
  policies : policies
});

// Redux Store

const store = createStore(ourDepartments);


store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Rob', 50));

// We can see the new policies got created with bagOfMoney updated to $170

console.log(store.getState());
