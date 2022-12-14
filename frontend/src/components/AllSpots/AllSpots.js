import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpots } from '../../store/spotReducer';
import { Route, Switch, NavLink } from 'react-router-dom';
import SingleSpot from '../SingleSpot/SingleSpot'
import './AllSpots.css'

const AllSpots = () => {
    const dispatch = useDispatch()
    const spots = Object.values(useSelector(state => state.spots.allSpots));

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div>
            <ul className='items'>
                {spots.map(({ id, name, previewImage, state, avgRating, price }) => (
                    <li key={id}>
                        <img className='spotImages'
                            src={previewImage}
                            alt={name} />
                        <div className='link'>
                            <NavLink key={name} to={`/spots/${id}`}>{`${name}, ${state}`}</NavLink>
                            {avgRating}
                        </div>
                        {`$${price}`}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AllSpots;