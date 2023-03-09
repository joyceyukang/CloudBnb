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
        <div className='whole-page'>
            <ul className='spot-items'>
                {spots.map(({ id, name, previewImage, state, city, avgRating, price }) => (
                    <li className='spot-children' key={id}>
                        <div className='spot-card'>
                            <NavLink key={name} to={`/spots/${id}`}>
                                <div>
                                    <img className='spotImages'
                                        src={previewImage}
                                        alt={name} />
                                </div>
                            </NavLink>
                            <div className="spot-info">
                                <NavLink key={name} to={`/spots/${id}`}>
                                    {`${city}, ${state}`}
                                </NavLink>
                                {avgRating !== "No ratings" ? <div><i className="fa-sharp fa-solid fa-star"></i> {avgRating}</div> : <div><i className="fa-sharp fa-solid fa-star"></i> New</div>}
                            </div>
                            {`$${price} night`}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AllSpots;