import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { spotDetails } from '../../store/spotReducer';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { deleteSpot } from '../../store/spotReducer';
import { getSpotReviews, deleteReview } from '../../store/reviewReducer';
import Bookings from '../Bookings/Bookings'
import CreateReview from '../CreateReview/CreateReview';
import OpenModalButton from '../OpenModalButton';
import './SingleSpot.css';


const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory()

    const currentState = useSelector(state => state)

    const { id, name, state, city, country, description, price, avgStarRating, ownerId } = currentState.spots.singleSpot
    const spotImages = currentState.spots.singleSpot.SpotImages

    //current spot reviews
    const spotReviews = Object.values(currentState.reviews.spot)


    let reviewUser;

    useEffect(() => {
        dispatch(spotDetails(spotId))
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId])


    if (!spotImages) return null;

    if (currentState.session.user) {
        //current user
        const sessionUserId = currentState.session.user.id
        const owner = currentState.spots.singleSpot.Owner.firstName

        //delete a spot
        const deletedSpot = (e) => {
            e.preventDefault()

            dispatch(deleteSpot(spotId)).then(
                history.push('/')
            )
        }

        //delete a review
        const deletedReview = (e) => {

            const review = spotReviews.find(spot => spot.userId === sessionUserId)

            e.preventDefault()

            dispatch(deleteReview(review.id)).then(
                history.push(`/spots/${spotId}`)
            )
        }


        return (
            <div className='single-spot'>
                <h1>{description}</h1>
                <div>
                    <span className="rating-info">{avgStarRating ? <div className='rating-info-child'><i className="fa-solid fa-star"></i> {avgStarRating}</div> : <div><i className="fa-solid fa-star"></i> New </div>}
                        {` ${city}, ${state}, ${country}`}
                    </span>
                </div>
                <div className='single-spot-image'>
                    {spotImages.map(image => (
                        <img className="singleImg" key={id} src={image.url} alt={name} />
                    ))}
                </div>
                <div className='owner-price'>
                    <span className='owner-name'>
                        Entire home hosted by {owner}
                    </span>
                    <div className='booking-card'>
                        <span className='price-rate-review'>
                            <span className='pricey'>
                                <b>
                                    {`$${price}`}
                                    &nbsp;
                                </b>
                                night
                                &nbsp;
                            </span>
                            <div className='rate-review-info'>
                                <span className="rating-info">
                                    {avgStarRating ? <div className='rating-info-child'><i className="fa-solid fa-star"></i>{avgStarRating}&nbsp;</div> : <div className='rating-info-child'><i className="fa-solid fa-star"></i>New&nbsp;</div>}
                                </span>
                                &#183;
                                <span className='review-length'>
                                    &nbsp;
                                    <u>
                                        {`${spotReviews.length} reviews`}
                                    </u>
                                </span>
                            </div>
                        </span>
                        <span className='availability'>
                            <OpenModalButton className='availability-child' buttonText="Reserve"
                                modalComponent={<Bookings spotId={id}/>} />
                        </span>
                    </div>
                </div>
                <div className="review-card">
                    <h4 className='review-title'>Reviews:</h4>
                    <span>
                        {spotReviews.length ? spotReviews.map(({ id, review, stars, userId, User }) => (
                            <div className='review-bundle' key={review}>
                                <li className='posted-reviews' key={id}>
                                    <span className='user-review-name'>
                                        {User.firstName} {User.lastName}
                                    </span>
                                    {review}
                                    <span className='rating-info-child'>
                                        <i className="fa-sharp fa-solid fa-star"></i> {stars}
                                    </span>
                                    {sessionUserId === userId ? <button className='delete-review-button' onClick={deletedReview} to={`/spots/${spotId}`}>Delete</button> : null}
                                </li>
                            </div>
                        ))
                            : <p>No Reviews</p>}
                    </span>
                    {reviewUser}
                    <span>
                        <CreateReview key={spotId} spotId={spotId} />
                    </span>
                </div>
                <div className='edit-delete-spot'>
                    <span>{sessionUserId === ownerId ?
                        <div>
                            <NavLink className='edit-spot' key={spotId} to={`/spots/${spotId}/edit`}>Edit Spot</NavLink>
                        </div> : null}
                    </span>
                    <span>{sessionUserId === ownerId ? <NavLink className='delete-spot' onClick={deletedSpot} to='/spots'>Delete Spot</NavLink> : null}</span>
                </div>
            </div >
        )
    }
    else {
        const owner = currentState.spots.singleSpot.Owner.firstName

        return (
            <div className='single-spot'>
                <h1>{description}</h1>
                <div>
                    <span className="rating-info">
                        {avgStarRating ? <div><i className="fa-sharp fa-solid fa-star"></i> {avgStarRating}</div> : <div> <i className="fa-sharp fa-solid fa-star"></i> New </div>}
                        {` ${city}, ${state}, ${country}`}
                    </span>
                </div>
                <div className='single-spot-image'>
                    {spotImages.map(image => (
                        <img className="singleImg" key={id} src={image.url} alt={name} />
                    ))}
                </div>
                <div className='owner-price'>
                    <span className='owner-name'>
                        Entire home hosted by {owner}
                    </span>
                    <div className='booking-card'>
                        <span className='price-rate-review'>
                            <span className='pricey'>
                                <b>
                                    {`$${price}`}
                                    &nbsp;
                                </b>
                                night
                                &nbsp;
                            </span>
                            <div className='rate-review-info'>
                                <span className="rating-info">
                                    {avgStarRating ? <div className='rating-info-child'><i className="fa-solid fa-star"></i>{avgStarRating}&nbsp;</div> : <div className='rating-info-child'><i className="fa-solid fa-star"></i>New&nbsp;</div>}
                                </span>
                                &#183;
                                <span className='review-length'>
                                    &nbsp;
                                    <u>
                                        {`${spotReviews.length} reviews`}
                                    </u>
                                </span>
                            </div>
                        </span>
                        <span className='availability'>
                            <OpenModalButton className='availability-child' buttonText="Reserve"
                                modalComponent={<Bookings />} />
                        </span>
                    </div>
                </div>
                <div className="review-card">
                    <h4>Reviews:</h4>
                    <span>
                        {spotReviews.length ? spotReviews.map(({ id, review, stars, User }) => (
                            <div className='review-bundle' key={review}>
                                <li className='posted-reviews' key={id}>
                                    <span className='user-review-name'>
                                        {User.firstName} {User.lastName}
                                    </span>
                                    {review}
                                    <span>
                                        <i className="fa-sharp fa-solid fa-star"></i> {stars}
                                    </span>
                                </li>
                            </div>
                        ))
                            : <p>No Reviews</p>}
                    </span>
                </div>
            </div>
        )
    }
}

export default SingleSpot