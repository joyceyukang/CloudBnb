import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createBooking, getBookings, updateBooking } from '../../store/bookingReducer';
import './Bookings.css'
import { useModal } from "../../context/Modal";
import '../LoginFormModal/LoginForm.css'
import { getSpots } from '../../store/spotReducer';

const EditBooking = ({ bookingId, spotId }) => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const { closeModal } = useModal();

    let today = new Date();

    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth() + 1;
    let todayDay = today.getDate();

    let fullToday = `${todayYear}-${todayMonth}-${todayDay}`

    let tomorrow = new Date();

    let tomorrowYear = tomorrow.getFullYear();
    let tomorrowMonth = tomorrow.getMonth() + 1;
    let tomorrowDay = tomorrow.getDate() + 1;

    let fullTomorrow = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`

    const [startDate, setStartDate] = useState(fullToday);
    const [endDate, setEndDate] = useState(fullTomorrow);

    const payload = {
        startDate,
        endDate
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormErrors(validate(payload))
        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            dispatch(updateBooking(payload, bookingId)).then(closeModal)
            history.push(`/spots/${spotId}`)
        }
    }, [formErrors, dispatch])

    const validate = (values) => {
        const errors = {};
        let startArr = values.startDate.split('-')
        let startYear = startArr[0]
        let startMonth = startArr[1]
        let startDay = startArr[2]

        let endArr = values.endDate.split('-')
        let endYear = endArr[0]
        let endMonth = endArr[1]
        let endDay = endArr[2]

        if ((startYear < todayYear) || (endYear < todayYear)) {
            errors.year = "Year must be this year or later."
        }

        if ((startMonth < todayMonth) || (endMonth < todayMonth)) {
            errors.month = "Month must be this month or later."
        }

        if ((endYear < startYear) || (endYear === startYear && endMonth < startMonth) || (endMonth <= startMonth && endDay < startDay)) {
            errors.endDate = "Check out date must be at least one day after start date."
        }

        return errors;
    }

    return (
        <div className='parent-bookings'>
            <form onSubmit={handleSubmit} className='input-login'>
                <h2 className='title-login'>Update Reservation</h2>
                <h4 className='title-login'>Check In</h4>
                <input
                    className='booking-input'
                    type="date"
                    id='startDate'
                    value={startDate}
                    placeholder={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <h4 className='title-login'>Check Out</h4>
                <input
                    className='booking-input'
                    type="date"
                    id='endDate'
                    value={endDate}
                    placeholder={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <p>{formErrors.endDate}</p>
                <p>{formErrors.year}</p>
                <p>{formErrors.month}</p>

                {sessionUser ? <button className="submit" type="submit">Submit</button> :
                    <div><button className="submit" disabled>Submit</button>
                        <p>Must be signed up or logged in to create a spot.</p></div>}
            </form>
        </div>
    )
}

export default EditBooking