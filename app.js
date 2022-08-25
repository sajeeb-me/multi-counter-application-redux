const counterContainerEl = document.getElementById('counterContainer');
const addCounterEl = document.getElementById('addCounter');
const resetCounterEl = document.getElementById('resetCounter');

// initial state
const initialState = [
    {
        id: 1,
        value: 0,
        incrementBy: 1,
        decrementBy: 1,
    }
]

const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const ADD_COUNTER = 'addCounter';
const RESET_COUNTER = 'resetCounter';

const increment = (counterId, value) => {
    return {
        type: INCREMENT,
        payload: { counterId, value },
    }
}
const decrement = (counterId, value) => {
    return {
        type: DECREMENT,
        payload: { counterId, value },
    }
}
const addCounter = () => {
    return {
        type: ADD_COUNTER,
    }
}
const resetCounter = () => {
    return {
        type: RESET_COUNTER,
    }
}

function uniqueID(counter) {
    const maxID = counter.reduce(
        (maxID, count) => Math.max(count.id, maxID), 0
    );
    return maxID + 1;
}

const counterReducer = (state = initialState, action) => {
    if (action.type === ADD_COUNTER) {
        return [
            ...state,
            {
                id: uniqueID(state),
                value: 0,
                incrementBy: Math.floor(Math.random() * 10) + 1,
                decrementBy: Math.floor(Math.random() * 10) + 1,
            }
        ]
    }
    else if (action.type === RESET_COUNTER) {
        return state.map(counter => {
            return {
                ...counter,
                value: 0,
            }
        })
    }
    else if (action.type === INCREMENT) {
        const { counterId, value } = action.payload;
        return state.map(counter => {
            if (counter.id === counterId) {
                return {
                    ...counter,
                    value: counter.value + value,
                }
            }
            return {
                ...counter
            }
        })
    }
    else if (action.type === DECREMENT) {
        const { counterId, value } = action.payload;
        return state.map(counter => {
            if (counter.id === counterId) {
                return {
                    ...counter,
                    value: counter.value - value,
                }
            }
            return {
                ...counter
            }
        })
    }
    else {
        return state;
    }
}

const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    let counterMarkup = '';

    state.forEach(counter => {
        counterMarkup += `
                    <div class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
                        <div class="text-2xl font-semibold" id="counter">${counter.value}</div>
                        <div class="flex space-x-3">
                            <button 
                            class="bg-red-400 text-white px-3 py-2 rounded shadow" 
                            onClick="handleDecrement(${counter.id}, ${counter.incrementBy})"
                            >
                                Decrement
                            </button>
                            <button 
                            class="bg-indigo-400 text-white px-3 py-2 rounded shadow" 
                            onClick="handleIncrement(${counter.id}, ${counter.incrementBy})"
                            >
                                Increment
                            </button>
                        </div>
                    </div>
        `
    })
    counterContainerEl.innerHTML = counterMarkup;
}

render();

store.subscribe(render);

addCounterEl.addEventListener('click', () => {
    store.dispatch(addCounter())
})
resetCounterEl.addEventListener('click', () => {
    store.dispatch(resetCounter())
})
function handleIncrement(counterId, value) {
    store.dispatch(increment(counterId, value))
}
function handleDecrement(counterId, value) {
    store.dispatch(decrement(counterId, value))
}