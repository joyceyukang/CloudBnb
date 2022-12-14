import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { spotDetails } from '../../store/spotReducer';
import { useEffect } from 'react';

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state)
    const { name, state, previewImage, price, description } = spot.spots.singleSpot

    // console.log(spot)

    useEffect(() => {
        dispatch(spotDetails(spotId))
    }, [dispatch, spotId])

    return (
        <div className='spot'>
            <h1>{name}</h1>
        </div>
    )
}

export default SingleSpot