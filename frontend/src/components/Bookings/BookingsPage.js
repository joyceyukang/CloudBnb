import { useDispatch, useSelector, useStore } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getBookings, deleteBooking } from '../../store/bookingReducer';
import '../AllSpots/AllSpots.css'

//Display all the reservations of the user
//User can read, edit, and delete a reservation on this page
const BookingsPage = () => {
    const dispatch = useDispatch()
    const bookings = Object.values(useSelector(state => state.bookings.allBookings))

    // console.log(bookings)

    const months = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    } 

    useEffect(() => {
        dispatch(getBookings())
    }, [dispatch])

    // const deleteBooking = (e) => {
    //     e.preventDefault()

    //     dispatch(deleteBooking(bookingId)).then(
    //         history.push('/')
    //     )
    // }

    return (
        <div className='bookings-container'>
            <h2 className='reservation-title'>
                Upcoming Trips
            </h2>
            <ul className='spot-items'>
                {bookings.length ? 
                bookings.map(booking => (
                    <li className='spot-children' key={booking.id}>
                        <div className='spot-card'>
                            <NavLink key={booking} to={`/spots/${booking.Spot.id}`}>
                                <div>
                                    <img className='spotImages'
                                        src={booking.Spot.previewImage}
                                        alt={booking.Spot.name} />
                                </div>
                            </NavLink>
                            <div className="spot-info">
                                <NavLink key={booking.Spot.name} to={`/spots/${booking.Spot.id}`}>
                                    {`${booking.Spot.city}, ${booking.Spot.state}`}
                                </NavLink>
                                {booking.Spot.avgRating !== "No ratings" ? <div><i className="fa-sharp fa-solid fa-star"></i> {booking.Spot.avgRating}</div> : <div><i class="fa-sharp fa-solid fa-star"></i> New</div>}
                            </div>
                            {`$${booking.Spot.price} night`}
                        </div>
                        <div className='reservation-date'>
                            {`${months[new Date(booking.startDate).getMonth() + 1]} ${new Date(booking.startDate).getDate() + 1} - ${new Date(booking.endDate).getDate() + 1}`}

                            <span className='delete-booking'>
                                <button className='delete-booking-button' onClick={() => {
                                    dispatch(deleteBooking(booking.id))
                                    alert('Reservation delete')
                                }}>
                                    Delete
                                </button>
                            </span>
                        </div>
                    </li>
                ))
                : 'No Reservations'}
            </ul>
        </div>
    )
}

export default BookingsPage