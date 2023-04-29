import { csrfFetch } from '../store/csrf'

const LOAD_BOOKING = 'bookings/LOAD_BOOKING';
const ADD_BOOKING = 'bookings/ADD_BOOKING';
const EDIT_BOOKING = 'bookings/EDIT_BOOKING';
const REMOVE_BOOKING = 'bookings/BOOKING';

const loadBookings = list => ({
    type: LOAD_BOOKING,
    list
})

const addBooking = booking => ({
    type: ADD_BOOKING,
    booking
})

const editBooking = editedBooking => ({
    type: EDIT_BOOKING,
    editedBooking
})

const removeBooking = bookingId => ({
    type: REMOVE_BOOKING,
    bookingId
})

//get all bookings
export const getBookings = () => async dispatch => {
    const response = await fetch('/api/bookings/current')


    if (response.ok) {
        const list = await response.json();
        dispatch(loadBookings(list))
        return list;
    }
}

//get single booking

//create booking
export const createBooking = (booking, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${spotId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const newBooking = await response.json();

        dispatch(addBooking(newBooking))
        return newBooking
    }
}

//update booking
export const updateBooking = (booking, bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })

    if (response.ok) {
        const update = await response.json()
        // console.log(update)
        dispatch(editBooking(update))
        return update;
    }
}

//delete booking
export const deleteBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        await response.json()
        dispatch(removeBooking(bookingId))
    }
}

const initialState = {
    allBookings: {},
    singleBooking: {}
}

const bookingReducer = (state = initialState, action) => {
    let newState;
    let newAllBookings;
    let newSingleBooking;
    switch (action.type) {
        case LOAD_BOOKING:
            newState = { ...state };
            newState.allBookings = {}
            // console.log(action.list)
            if (action.list.length) {
                action.list.forEach(booking => {
                    newState.allBookings[booking.id] = booking;
                })
            }
            return newState;
        case ADD_BOOKING:
            newState = { ...state };
            newSingleBooking = action.booking
            newState.allBookings[newSingleBooking.id] = newSingleBooking
            return newState;
        case EDIT_BOOKING:
            newSingleBooking = action.editedBooking
            newState = {
                allBookings: { ...state.allBookings }
            };
            newState.allBookings[newSingleBooking.id] = newSingleBooking;
            return newState
        case REMOVE_BOOKING:
            newState = {
                allBookings: { ...state.allBookings }
            };
            delete newState.allBookings[action.bookingId]
            return newState;
        default:
            return state
    }
}

export default bookingReducer;