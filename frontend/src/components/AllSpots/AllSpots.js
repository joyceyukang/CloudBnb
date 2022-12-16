import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spotReducer';
import './AllSpots.css'

const AllSpots = () => {
    const spots = Object.values(useSelector(state => state.spots.allSpots));
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div>
            <ul className='items'>
                {spots.map(({ id, name, previewImage, state, avgRating, price }) => (
                    <li key={id}>
                        <div className='link'>
                            <NavLink key={name} to={`/spots/${id}`}>
                                <div>
                                    <img className='spotImages'
                                        src={previewImage}
                                        alt={name} />
                                </div>
                                {`${name}, ${state}`}
                            </NavLink>
                        </div>
                        <div>
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