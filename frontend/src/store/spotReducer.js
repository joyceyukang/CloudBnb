import { csrfFetch } from '../store/csrf'

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const ADD_SPOT = 'spots/ADD_SPOTS';
const ADD_SINGLE_SPOT = 'spots/ADD_SINGLE_SPOT';
const EDIT_SPOT = 'spots/EDIT_SPOT';
const REMOVE_SPOT = 'spots/REMOVE_SPOT';

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

const editSpot = editedSpot => ({
    type: EDIT_SPOT,
    editedSpot
})

const removeSpot = spotId => ({
    type: REMOVE_SPOT,
    spotId
})

//get all spots
export const getSpots = () => async dispatch => {
    const response = await fetch('/api/spots')


    if (response.ok) {
        const list = await response.json();
        // console.log("LIST:   ",list)
        dispatch(loadSpots(list))
        return list;
    }
}

//single spot details
export const spotDetails = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        // console.log(spot)
        dispatch(singleSpot(spot))
        return spot;
    }
}

//create spot
export const createSpot = (spot, url) => async dispatch => {
    // console.log(spot)
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const newSpot = await response.json();

        const spotImage = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: url,
                preview: true,
            })
        })
        if(spotImage.ok) {
            const newImage = await spotImage.json()
            
            dispatch(addSpot(newSpot))
            return newSpot
        }
    }
}

//update spot
export const updateSpot = (spot, id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if(response.ok) {
        const edit = await response.json()
        dispatch(editSpot(edit))
        return edit
    }
}

//delete spot
export const deleteSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        await response.json()
        dispatch(removeSpot(id))
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
            newSingleSpot = action.spot
            newState.allSpots[newSingleSpot.id] = newSingleSpot
            return newState;
        case ADD_SINGLE_SPOT:
            newState = { ...state };
            newSingleSpot = action.spot
            newState.singleSpot = newSingleSpot
            return newState;
        case EDIT_SPOT:
            newState = {...state};
            newSingleSpot = action.editedSpot
            newState.allSpots[newSingleSpot.id] = newSingleSpot;
            return newState;
        case REMOVE_SPOT:
            newState = {...state};
            newAllSpots = {...state.allSpots};
            delete newAllSpots[action.spotId]
            newState.allSpots = newAllSpots;
            return newState;
        default:
            return state
    }
}

export default spotReducer;