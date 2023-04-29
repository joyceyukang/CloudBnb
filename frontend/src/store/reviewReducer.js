import { csrfFetch } from '../store/csrf'

const LOAD_SPOT_REVIEWS = 'spots/LOAD_SPOT_REVIEWS';
const LOAD_USER_REVIEWS = 'spots/LOAD_USER_REVIEWS';
const ADD_REVIEW = 'spots/ADD_REVIEW';
const REMOVE_REVIEW = 'spots/REMOVE_REVIEW';

const loadSpotReviews = (spotList) => ({
    type: LOAD_SPOT_REVIEWS,
    spotList
})
const loadUserReviews = (userList) => ({
    type: LOAD_USER_REVIEWS,
    userList
})

const addReview = review => ({
    type: ADD_REVIEW,
    review
})

const removeReview = reviewId => ({
    type: REMOVE_REVIEW,
    reviewId
})

//get all user Reviews
export const getSpotReviews = (spotId) => async dispatch => {
    const spotReviews = await fetch(`/api/spots/${spotId}/reviews`)

    if (spotReviews.ok) {
        const spotList = await spotReviews.json();

        // console.log(spotList)

        dispatch(loadSpotReviews(spotList))
    }
}

//get all user Reviews
export const getUserReviews = () => async dispatch => {
    const userReviews = await csrfFetch('/api/reviews/current')

    if (userReviews.ok) {
        const userList = await userReviews.json();

        dispatch(loadUserReviews(userList))
    }
}

//create Review
export const createReview = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const newReview = await response.json();
        // console.log("NEW REVIEW: ", newReview)
        dispatch(addReview(newReview))
        return newReview
    }
}

//delete Review
export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        await response.json()
        dispatch(removeReview(reviewId))
    }
}

const initialState = {
    spot: {},
    user: {}
}

const reviewReducer = (state = initialState, action) => {
    let newState;
    let allUserReviews;
    let allSpotReviews
    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            newState = { ...state };
            allSpotReviews = {}

            action.spotList.forEach((review) => {
                allSpotReviews[review.id] = review
            })

            newState.spot = allSpotReviews

            return newState;
        case LOAD_USER_REVIEWS:
            newState = { ...state };
            allUserReviews = {}

            // console.log("LOAD USER: ", action.userList, "LOAD SPOT: ", action.spotList)
            action.userList.forEach(review => {
                allUserReviews[review.id] = review
            })

            newState.user = allUserReviews

            return newState;
        // case ADD_REVIEW:
        //     newState = { ...state };
        //     allUserReviews = {...state.user}
        //     allSpotReviews = {...state.spot}

        //     allUserReviews[action.review.id] = action.review
        //     allSpotReviews[action.review.id] = action.review

        //     newState.user = allUserReviews
        //     newState.spot = allSpotReviews
        //     // console.log("ADDING REVIEW ", newState)
        //     return newState;
        case REMOVE_REVIEW:
            newState = { ...state };

            allUserReviews = { ...state.user };
            allSpotReviews = { ...state.spot };

            // console.log("DELETE REVIEW    ", allUserReviews)
            // console.log("DELETE REVIEW SPOT    ", allSpotReviews[action.reviewId])

            delete allUserReviews[action.reviewId]
            delete allSpotReviews[action.reviewId]

            newState.user = allUserReviews
            newState.spot = allSpotReviews

            return newState;
        default:
            return state
    }
}

export default reviewReducer;