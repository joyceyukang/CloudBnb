import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spotReducer';
import './CreateSpot.css'
// import default_image from './default_image.png'


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
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

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
        imageUrl
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        setImageUrl('https://cdna.artstation.com/p/assets/images/images/055/676/644/large/tutu-.jpg?1667492960')
        setFormErrors(validate(payload))
        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            dispatch(createSpot(payload, imageUrl)).then(
                (res) => {
                    history.push(`/spots/${res.id}`)
                })
        }
    }, [formErrors, dispatch])

    const validate = (values) => {
        const errors = {};

        // console.log(values)

        if (!values.address) {
            errors.address = "Address is required."
        }
        if (!values.city) {
            errors.city = "City is required."
        }
        if (!values.state) {
            errors.state = "State is required."
        }
        if (!values.country) {
            errors.country = "Country is required."
        }
        if (!values.name) {
            errors.name = "Name is required."
        }
        if (!values.description) {
            errors.description = "Description is required."
        }
        if (!values.price) {
            errors.price = "Price is required."
        } else if (values.price <= 0) {
            errors.price = "Price must be more than $0"
        }
        if (!values.imageUrl) {
            errors.imageUrl = "Image URL is required."
        }

        return errors;
    }

    return (
        <div className="inputBox">
            <h1>Create Spot</h1>
            <form className="create-input" onSubmit={handleSubmit}>
                <h5>Address</h5>
                <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder="Address"
                    name="address"
                // required
                />
                <p>{formErrors.address}</p>
                <h5>City</h5>
                <input
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder="City"
                    name="city"
                // required
                />
                <p>{formErrors.city}</p>
                <h5>State</h5>
                <input
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    placeholder="State"
                    name="state"
                // required
                />
                <p>{formErrors.state}</p>
                <h5>Country</h5>
                <input
                    type="text"
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    placeholder="Country"
                    name="country"
                // required
                />
                <p>{formErrors.country}</p>
                <h5>Name</h5>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Name"
                    name="name"
                // required
                />
                <p>{formErrors.name}</p>
                <h5>Description</h5>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    placeholder="Description"
                    rows="10"
                // required
                ></textarea>
                <p>{formErrors.description}</p>
                <h5>Price</h5>
                <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder="Price per night"
                    name="price"
                // required
                />
                <p>{formErrors.price}</p>
                {/* <h5>Preview Image URL</h5>
                <input
                    type="url"
                    onChange={(e) => setImageUrl(e.target.value)}
                    value={imageUrl}
                    placeholder="Preview Image URL"
                    name="imageUrl"
                // required
                />
                <p>{formErrors.imageUrl}</p> */}
                {sessionUser ? <button className="submit" type="submit">Submit</button> :
                    <div><button className="submit" disabled>Submit</button>
                        <p>Must be signed up or logged in to create a spot.</p></div>}
            </form>
        </div>
    )
}

export default CreateSpot;