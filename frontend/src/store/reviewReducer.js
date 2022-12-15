import { csrfFetch } from '../store/csrf'

const LOAD_REVIEWS = 'spots/LOAD_REVIEWS';
const ADD_REVIEW = 'spots/ADD_REVIEW';
const EDIT_REVIEW = 'spots/EDIT_REVIEW';
const REMOVE_REVIEW = 'spots/REMOVE_REVIEW';

const loadReviews = (spotList, userList) => ({
    type: LOAD_REVIEWS,
    spotList,
    userList
})

const addReview = review => ({
    type: ADD_REVIEW,
    review
})

const editReview = editedReview => ({
    type: EDIT_REVIEW,
    editedReview
})

const removeReview = reviewId => ({
    type: REMOVE_REVIEW,
    reviewId
})

//get all Reviews
export const getReviews = (spotId) => async dispatch => {
    const spotReviews = await fetch(`/api/spots/${spotId}/reviews`)
    const userReviews = await fetch('/api/reviews/current')

    if (spotReviews.ok && userReviews.ok) {
        const spotList = await spotReviews.json();
        const userList = await userReviews.json();

        // console.log("HELLO ",spotList, userList)

        dispatch(loadReviews(spotList, userList))
    }
}

//create Review
export const createReview = (spot, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const newSpot = await response.json();

    }
}

// //update Review
// export const updateReview = (spot, id) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(spot)
//     })

//     if(response.ok) {
//         const edit = await response.json()
//         dispatch(editSpot(edit))
//     }
// }

// //delete Review
// export const deleteReview = (id) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${id}`, {
//         method: 'DELETE'
//     })

//     if(response.ok) {
//         await response.json()
//         dispatch(removeSpot(id))
//     }
// }

const initialState = {
    spot: {},
    user: {}
}

const reviewReducer = (state = initialState, action) => {
    let newState;
    let allUserReviews;
    let allSpotReviews
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = { ...state };
            allUserReviews = {}
            allSpotReviews = {};
            action.userList.forEach(review => {
                allUserReviews[review.id] = review
            })
            action.spotList.forEach(review => {
                allSpotReviews[review.id] = review
            })
            newState.spot = allSpotReviews
            newState.user = allUserReviews
            return newState;
        // case ADD_REVIEW:
        //     newState = { ...state };
        //     newSingleSpot = action.spot
        //     newState.allSpots[newSingleSpot.id] = newSingleSpot
        //     return newState;
        // case EDIT_REVIEW:
        //     newState = {...state};
        //     newSingleSpot = action.editedSpot
        //     newState.allSpots[newSingleSpot.id] = newSingleSpot;
        //     return newState;
        // case REMOVE_REVIEW:
        //     newState = {...state};
        //     newAllSpots = {...state.allSpots};
        //     delete newAllSpots[action.spotId]
        //     newState.allSpots = newAllSpots;
        //     return newState;
        default:
            return state
    }
}

export default reviewReducer;