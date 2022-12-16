import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSpots } from '../../store/spotReducer';
import './AllSpots.css'
import star from './star.png'

const AllSpots = () => {
    const spots = Object.values(useSelector(state => state.spots.allSpots));
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div>
            <ul className='spot-items'>
                {spots.map(({ id, name, previewImage, state, city, avgRating, price }) => (
                    <li key={id}>
                        <div className='link'>
                            <NavLink key={name} to={`/spots/${id}`}>
                                <div>
                                    <img className='spotImages'
                                        src={previewImage}
                                        alt={name} />
                                </div>
                                {`${city}, ${state}`}
                            </NavLink>
                        </div>
                        <div>
                            {avgRating !== "No ratings" ? <div><img src={star} alt="Stars: "/> {avgRating}</div> : <div><img src={star} alt="Stars: "/> New</div> }
                        </div>
                        {`$${price}`}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AllSpots;