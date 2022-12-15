import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../store/spotReducer';
import './CreateReview.css'


const CreateSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUserId = useSelector(state => state.session.user.id)

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(1);
    // const [formErrors, setFormErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            review,
            stars
        }

        // console.log("TEST", payload, imageUrl)

        // setFormErrors(validate(payload))

        // if(Object.keys(formErrors).length === 0) {
        // }
        await dispatch(createReview(payload, ))

        reset();
    }

    // const validate = (values) => {
    //     const errors = {};

    //     if(!values.review) {
    //         errors.review = ""
    //     }
    //     if(!values.stars) {
    //         errors.stars = ""
    //     } 

    //     return errors;
    // }

    const reset = () => {
        setReview('');
        setStars('');
    }

    return (
        <div className="inputBox">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    name="review"
                    placeholder="Add a review..."
                    rows="5"
                ></textarea>
                <input
                    type="number"
                    onChange={(e) => setStars(e.target.value)}
                    value={stars}
                    placeholder="5"
                    name="star"
                    min= "1"
                    max= "5"
                />
                {sessionUser && sessionUser.firstName !== 'Demo' ? <button className="submit" type="submit">Submit</button> : <p>Unable to create a spot if not logged in</p>}
            </form>
        </div>
    )
}

export default CreateSpot;