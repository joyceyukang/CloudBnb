const LOAD_SPOTS = 'spots/LOAD_SPOTS';

const load = list => ({
    type: LOAD_SPOTS,
    list
})

export const getSpots = () => async dispatch => {
    const response = await fetch('api/spots')

    if(response.ok) {
        const list = await response.json();
        dispatch(load(list))
    }
}

const initialState = {
    spots: {
        allSpots: {},
        singleSpot: {
            SpotImages: [],
            Owner: {}
        }
    },
    reviews: {
        spot: {
            User: {},
            ReviewImages: []
        },
        user: {
            User: {},
            Spot: {},
            ReviewImages: []
        }
    }
}

const spotReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD:
    }
}