// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { spotDetails } from '../../store/spotReducer';
import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { deleteSpot } from '../../store/spotReducer';
import { getReviews } from '../../store/reviewReducer';

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const history = useHistory()

    const currentState = useSelector(state => state)

    const { id, name, state, city, country, price, description, avgStarRating, ownerId } = currentState.spots.singleSpot
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
            <div>
                <span>
                    <h4>Reviews:</h4>
                    {spotReviews.length ? spotReviews.map(({ id, review, stars, userId}) => (
                        <div>
                            <li key={id}>{review}</li>
                            <li key={userId}>Stars: {stars}</li>
                        </div>
                        )) 
                        : <p>No Reviews</p>}
                </span>
                <span>
                    
                </span>
                <span>Edit will navigate to new page? and delete will be dispatched here</span>
            </div>
            <div>
                <span>{sessionUserId === ownerId ? <div>
                    <NavLink key={spotId} to={`/spots/${spotId}/edit`}>Edit</NavLink>
                </div> : null}
                </span>
                <span>{sessionUserId === ownerId ? <Link onClick={deletedSpot} to='/spots'>Delete</Link> : null}</span>
            </div>
        </div >
    )
}

export default SingleSpot