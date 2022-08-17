const counterBox = (count, key) => `
    <div class="max-w-md mx-auto mt-10 space-y-5">
    <div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
        <div class="text-2xl font-semibold" id="counter">${count}</div>
        <div class="flex space-x-3">
            <button class="bg-indigo-400 text-white px-3 py-2 rounded shadow" title="${key}" onclick="increment(event)">
                Increment
            </button>
            <button class="bg-red-400 text-white px-3 py-2 rounded shadow" title="${key}" onclick="decrement(event)">
                Decrement
            </button>
        </div>
        </div>
    </div>
`;
// Shotcut to get an element by Id.
const getElemId = id => document.getElementById(id);

// Elements
const countersWrapper = getElemId('counters-wrapper');
const addCounter = getElemId('addCounter');
const resetBtn = getElemId('reset');

// The initial state
const initialState = {
    counters: {
        counter1: 0
    }
}

// Action names
const ADDCOUNTER = 'addCounter';
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const RESET = 'reset';

// Action payloads
const actionPayloads = {
    addCounter: (length) => ({ type: ADDCOUNTER, payload: { key: `counter${length + 1}` } }),
    increment: (key, value) => ({ type: INCREMENT, payload: { key, value } }),
    decrement: (key, value) => ({ type: DECREMENT, payload: { key, value } }),
    reset: () => ({ type: RESET })
}


/**
 * This is the reducer function for the store.
 * @param {Object} state The current state. 
 * @param {Object} action It contains informations to operate the reducer function. Like what method to apply and 
 * what to do for a specific method.
 * @returns It returs the updated state.
 */
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDCOUNTER: return {
            ...state,
            counters: {
                ...state.counters,
                [action.payload.key]: 0
            }
        };
        case INCREMENT: return {
            ...state,
            counters: {
                ...state.counters,
                [action.payload.key]: state.counters[action.payload.key] + action.payload.value
            }
        };
        case DECREMENT: return {
            ...state,
            counters: {
                ...state.counters,
                [action.payload.key]: state.counters[action.payload.key] - action.payload.value
            }
        };
        case RESET:
            let countersClone = { ...state.counters };
            Object.keys(countersClone).forEach(key => countersClone[key] = 0);
            return {
                ...state,
                counters: countersClone
            }
        default: return { ...state }
    }
}

// Create Store
const store = Redux.createStore(counterReducer);

/**
 * This function manages the counter box render at the UI.
 */
const manageRender = () => {
    const state = store.getState();
    countersWrapper.innerHTML = "";
    Object.keys(state.counters).forEach(key => {
        const elem = document.createElement('div');
        elem.innerHTML = counterBox(state.counters[key], key);
        countersWrapper.appendChild(elem);
    });

};
manageRender();

// Subscribe to store for getting the state updates
store.subscribe(manageRender)

// Event handlers
addCounter.addEventListener('click', () => {
    const length = Object.keys(store.getState().counters).length;
    store.dispatch(actionPayloads.addCounter(length))
});
const increment = e => store.dispatch(actionPayloads.increment(e.target.title, 5));
const decrement = e => store.dispatch(actionPayloads.decrement(e.target.title, 5));
resetBtn.addEventListener('click', () => store.dispatch(actionPayloads.reset()))
//