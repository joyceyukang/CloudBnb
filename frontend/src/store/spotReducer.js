import { csrfFetch } from '../store/csrf'

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const ADD_SPOT = 'spots/ADD_SPOTS'
const ADD_SINGLE_SPOT = 'spots/ADD_SINGLE_SPOT'

const loadSpots = list => ({
    type: LOAD_SPOTS,
    list
})

const addSpot = spot => ({
    type: ADD_SPOT,
    spot
})

const singleSpot = spot => ({
    type: ADD_SINGLE_SPOT,
    spot
})

//get all spots thunk
export const getSpots = () => async dispatch => {
    const response = await fetch('/api/spots')


    if (response.ok) {
        const list = await response.json();
        // console.log("LIST:   ",list)
        dispatch(loadSpots(list))
    }
}

//single spot thunk
export const spotDetails = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        // console.log(spot)
        dispatch(singleSpot(spot))
    }
}

//create spot thunk
export const createSpot = (spot, url) => async dispatch => {
    console.log(spot)
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const newSpot = await response.json();
        
        const imageResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: url,
                preview: true,
            })
        })

        dispatch(addSpot(newSpot))
        return newSpot
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
}

const spotReducer = (state = initialState, action) => {
    let newState;
    let newAllSpots;
    let newSingleSpot;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state };
            newAllSpots = {}
            action.list.Spots.forEach(spot => {
                newAllSpots[spot.id] = spot;
            })
            newState.allSpots = newAllSpots;
            return newState;
        case ADD_SPOT:
            newState = { ...state };
            newState.allSpots[action.spot.id] = action.spot;
            return newState;
        case ADD_SINGLE_SPOT:
            newState = { ...state };
            newSingleSpot = action.spot
            newState.singleSpot = newSingleSpot
            return newState;
        default:
            return state
    }
}

export default spotReducer;