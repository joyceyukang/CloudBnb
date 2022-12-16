import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateSpot } from '../../store/spotReducer';
import { useParams, useHistory } from 'react-router-dom';

//fix refresh on edit page

const EditSpot = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots.singleSpot)
    const history = useHistory()

    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [lat, setLat] = useState(50);
    const [lng, setLng] = useState(50);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [imageUrl, setImageUrl] = useState('');

    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateName = (e) => setName(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)
    const updateImageUrl = (e) => setImageUrl(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        }

        await dispatch(updateSpot(payload, spotId))

        history.push(`/spots/${spotId}`)
    }

    return (
        <div className="inputBox">
            <h1>Edit Spot</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={updateAddress}
                    value={address}
                    placeholder="Address"
                    name="address"
                    required
                />
                <input
                    type="text"
                    onChange={updateCity}
                    value={city}
                    placeholder="City"
                    name="city"
                    required
                />
                <input
                    type="text"
                    onChange={updateState}
                    value={state}
                    placeholder="State"
                    name="state"
                    required
                />
                <input
                    type="text"
                    onChange={updateCountry}
                    value={country}
                    placeholder="Country"
                    name="country"
                    required
                />
                <input
                    type="text"
                    onChange={updateName}
                    value={name}
                    placeholder="Name"
                    name="name"
                    required
                />
                <textarea
                    value={description}
                    onChange={updateDescription}
                    name="description"
                    placeholder="Description"
                    rows="10"
                    required
                ></textarea>
                <input
                    type="text"
                    onChange={updatePrice}
                    value={price}
                    placeholder="Price per night"
                    name="price"
                    required
                />
                <button className="submit" type="update">Update</button>
            </form>
        </div>
    )
}

export default EditSpot;