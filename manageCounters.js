/**
 * This function is used for getting elements by id.
 * @param {String} id The id of the element.
 * @returns It returs the dom element found by that id. If not found then the return value will be null.
 */
const getElm = (id) => document.getElementById(id)

// Elements
const countersWrapper = getElm('counters-wrapper');
const addCounter = getElm('addCounter');
const reset = getElm('reset');

const initialState = {
    counters: [0]
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
        case 'addCounter': return {
            ...state,
            counters: [...state.counters, state.counters.length]
        };
        case 'increment': return {
            ...state,
            counters: state.counters.map((v, i) => action.payload.index === i && action.payload.value)
        }
        default: return { ...state }
    }
}

const manageRender = () => {

}

addCounter.addEventListener('click', () => {
    const res = counterReducer(initialState, { type: 'addCounter' });
    console.log(res)
});