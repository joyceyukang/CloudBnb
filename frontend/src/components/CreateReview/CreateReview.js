import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { createReview } from '../../store/reviewReducer';
import './CreateReview.css'


const CreateReview = ({ spotId }) => {
    const dispatch = useDispatch();
    const currentState = useSelector(state => state)

    //current user
    const sessionUserId = currentState.session.user.id

    //current spot reviews
    const spotReviews = Object.values(currentState.reviews.spot)

    //does current user have a review
    const userReview = spotReviews.find(review => review.userId === sessionUserId)

    const ownerId = currentState.spots.allSpots[spotId].ownerId

    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const payload = {
        review,
        stars
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormErrors(validate(payload))
        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            dispatch(createReview(payload, spotId))

            reset();
        }
    }, [formErrors, dispatch])

    const validate = (values) => {
        const errors = {};

        // console.log(values)

        if (!values.review) {
            errors.review = "Review is required."
        }
        if (!values.stars) {
            errors.stars = "Star rating is required."
        }

        return errors;
    }


    const reset = () => {
        setReview('');
        setStars('');
    }

    return (
        <div className="inputBox">
            <form className="create-input"onSubmit={handleSubmit}>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    name="review"
                    placeholder="Add a review..."
                    rows="5"
                ></textarea>
                <p>{formErrors.review}</p>
                <input
                    type="number"
                    onChange={(e) => setStars(e.target.value)}
                    value={stars}
                    placeholder="Stars"
                    name="star"
                    min="1"
                    max="5"
                />
                <p>{formErrors.stars}</p>
                <button className="submit" type="submit" disabled={!!userReview || sessionUserId === ownerId}>Submit</button>
            </form>
        </div>
    )
}

// <button className="submit" type="submit">Submit</button> 

export default CreateReview;