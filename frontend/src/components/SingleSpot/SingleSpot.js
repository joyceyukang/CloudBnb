import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { spotDetails } from '../../store/spotReducer';
import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { deleteSpot } from '../../store/spotReducer';
import { getReviews, deleteReview } from '../../store/reviewReducer';
import CreateReview from '../CreateReview/CreateReview';

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory()

    const currentState = useSelector(state => state)

    const { id, name, state, city, country, description, price, avgStarRating, ownerId } = currentState.spots.singleSpot
    const spotImages = currentState.spots.singleSpot.SpotImages

    //current user
    const sessionUserId = currentState.session.user.id

    //current spot reviews
    const spotReviews = Object.values(currentState.reviews.spot)


    // console.log(spotReviews)

    // console.log(spot)
    // console.log(currentState.spots.singleSpot)

    useEffect(() => {
        dispatch(spotDetails(spotId))
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])


    const deletedSpot = (e) => {
        e.preventDefault()

        dispatch(deleteSpot(spotId)).then(
            history.push('/')
        )
    }

    const deletedReview = (e) => {

        const review = spotReviews.find(spot => spot.userId === sessionUserId)

        e.preventDefault()

        dispatch(deleteReview(review.id)).then(
            history.push(`/spots/${spotId}`)
        )
    }

    if (!spotImages) return null;

    return (
        <div className='spot'>
            <h1>{name}</h1>
            <div>
                <span>{avgStarRating ? avgStarRating : 'New'}</span>
                <span>{` ${city}, ${state}, ${country}`}</span>
            </div>
            <div>
                {spotImages.map(image => (
                    <img key={id} src={image.url} alt={name} />
                ))}
            </div>
            <div>
                <span>{`$${price} night`}</span>
                <p>{description}</p>
            </div>
            <div className="review-card">
                <span>
                    <h4>Reviews:</h4>
                    {spotReviews.length ? spotReviews.map(({ id, review, stars, userId }) => (
                        <div key={review}>
                            <li key={id}>{review}
                            Stars: {stars}
                            {sessionUserId === userId ? <button onClick={deletedReview} to={`/spots/${spotId}`}>Delete Review</button> : null}
                            </li>
                        </div>
                    ))
                        : <p>No Reviews</p>}
                </span>
                <span>
                    <CreateReview key={spotId} spotId={spotId}/>
                </span>
            </div>
            <div>
                <span>{sessionUserId === ownerId ? <div>
                    <NavLink key={spotId} to={`/spots/${spotId}/edit`}>Edit</NavLink>
                </div> : null}
                </span>
                <span>{sessionUserId === ownerId ? <NavLink onClick={deletedSpot} to='/spots'>Delete</NavLink> : null}</span>
            </div>
        </div >
    )
}

export default SingleSpot