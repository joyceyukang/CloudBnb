import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spotReducer';
import './CreateSpot.css'


const CreateSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState(50);
    const [lng, setLng] = useState(50);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    // const [formErrors, setFormErrors] = useState({});

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

        // console.log("TEST", payload, imageUrl)

        // setFormErrors(validate(payload))

        // if(Object.keys(formErrors).length === 0) {
        // }
        await dispatch(createSpot(payload, imageUrl))
        
        history.push('/')
    }

    // const validate = (values) => {
    //     const errors = {};

    //     if(!values.address) {
    //         errors.address = "Address is required."
    //     }
    //     if(!values.city) {
    //         errors.city = "City is required."
    //     } 
    //     if(!values.state) {
    //         errors.state = "State is required."
    //     } 
    //     if(!values.country) {
    //         errors.country = "Country is required."
    //     } 
    //     if(!values.name) {
    //         errors.name = "Name is required."
    //     } 
    //     if(!values.description) {
    //         errors.description = "Description is required."
    //     } 
    //     if(!values.price) {
    //         errors.price = "Price is required."
    //     }
        
    //     return errors;
    // }
    
    //    reset();
    // const reset = () => {
    //     setAddress('');
    //     setCity('');
    //     setState('');
    //     setCountry('');
    //     setName('');
    //     setDescription('');
    //     setPrice('');
    //     setImageUrl('');
    // }

    return (
        <div className="inputBox">
            <h1>Create Spot</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder="Address"
                    name="address"
                    required
                />
                <input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder="City"
                    name="city"
                    required
                />
                <input
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    placeholder="State"
                    name="state"
                    required
                />
                <input
                    type="text"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    placeholder="Country"
                    name="country"
                    required
                />
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Name"
                    name="name"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    placeholder="Description"
                    rows="10"
                    required
                ></textarea>
                 <input
                    type="text"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder="Price per night"
                    name="price"
                    required
                />
                 <input
                    type="text"
                    onChange={(e) => setImageUrl(e.target.value)}
                    value={imageUrl}
                    placeholder="Preview Image URL"
                    name="imageUrl"
                    required
                />
                {sessionUser && sessionUser.firstName !== 'Demo' ? <button className="submit" type="submit">Submit</button> : <p>Unable to create a spot if not logged in</p>}
            </form>
        </div>
    )
}

export default CreateSpot;