import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { spotDetails, updateSpot } from '../../store/spotReducer';
import { useParams, useHistory } from 'react-router-dom';
import './EditSpot.css'

//fix refresh on edit page

const EditSpot = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const history = useHistory()
    
    // console.log(spot)
    
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState(50);
    const [lng, setLng] = useState(50);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    //restore previous data
    useEffect(() => {
        dispatch(spotDetails(spotId)).then((res) => {
            setAddress(res.address)
            setCity(res.city)
            setState(res.state)
            setCountry(res.country)
            setName(res.name)
            setDescription(res.description)
            setPrice(res.price)
        })
    }, [dispatch, spotId])
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormErrors(validate(payload))
        setIsSubmit(true)

        // await dispatch(updateSpot(payload, spotId))

        // history.push(`/spots/${spotId}`)
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            dispatch(updateSpot(payload, spotId)).then(
                    history.push(`/spots/${spotId}`)
                )
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

        return errors;
    }

    return (
        <div className="inputBox">
            <h1>Edit Spot</h1>
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
                <button className="submit" type="update">Update</button>
            </form>
        </div>
    )
}

export default EditSpot;