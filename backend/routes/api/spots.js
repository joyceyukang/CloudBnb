const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User } = require('../../db/models');

const router = express.Router();
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    });

    let spotList = [];
    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    });

    spotList.forEach(spot => {
        let sum = 0;
        let total = 0

        spot.Reviews.forEach(star => {
            if (star.stars) {
                sum += star.stars
                total += 1
            }
        })

        if (sum > 0 && total > 0) {
            spot.avgRating = sum / total
        } else {
            spot.avgRating = "No ratings"
        }

        if (spot.SpotImage) {
            spot.previewImage = spot.SpotImage.url
        }
        else if (!spot.SpotImage) {
            spot.previewImage = "No Preview Image"
        }

        delete spot.SpotImage
        delete spot.Reviews
    })

    res.json(spotList);
})

//GET /api/spots/current
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    if (user) {
        let spots = await Spot.findAll({
            include: [
                {
                    model: Review
                },
                {
                    model: SpotImage
                }
            ],
            where: { ownerId: user.id }
        })

        let spotList = [];
        spots.forEach(spot => {
            spotList.push(spot.toJSON())
        });

        spotList.forEach(spot => {
            let sum = 0;
            let total = 0

            spot.Reviews.forEach(star => {
                if (star.stars) {
                    sum += star.stars
                    total += 1
                }
            })

            if (sum > 0 && total > 0) {
                spot.avgRating = sum / total
            } else {
                spot.avgRating = "No ratings"
            }

            if (spot.SpotImage) {
                spot.previewImage = spot.SpotImage.url
            }
            else if (!spot.SpotImage) {
                spot.previewImage = "No Preview Image"
            }

            delete spot.SpotImage
            delete spot.Reviews
        })

        return res.json({
            Spots: spotList
        });
    } else return res.json({
        message: "Required to be logged in"
    });
})


//GET /api/spots/:spotId
router.get('/:spotId', async (req, res) => {

    let spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ],
        where: { id: req.params.spotId }
    })

    // console.log(spots)

    if (!spots.length) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    let spot = spots[0].toJSON()

    spot.numReviews = spot.Reviews.length;

    if (spot.Reviews.length) {
        let sum = 0;
        let total = 0

        spot.Reviews.forEach(star => {
            if (star.stars) {
                sum += star.stars
                total += 1
            }
        })

        if (sum > 0 && total > 0) {
            spot.avgStarRating = sum / total
        } else {
            spot.avgStarRating = "No ratings"
        }
    }

    let spotImage = await SpotImage.findAll({
        attributes: ['id', 'url', 'preview'],
        where: {
            spotId: req.params.spotId
        }
    })

    spot.SpotImages = spotImage;

    let owner = await User.findOne({
        attributes: ['id', 'firstName', 'lastName'],
        where: {
            id: spot.ownerId
        }
    })

    spot.Owner = owner;

    delete spot.SpotImage
    delete spot.Reviews

    res.json(spot)
})

//POST /api/spots
router.post('/', requireAuth, async (req, res) => {
    const { user } = req
    if (user) {

        const { address, city, state, country, lat, lng, name, description, price } = req.body

        if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price ||
            address === "" || city === "" || state === "" || country === "" || lat === "" || lng === "" || name === "" ||
            description === "" || price === "") {
            return res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    address: "Street address is required",
                    city: "City is required",
                    state: "State is required",
                    country: "Country is required",
                    lat: "Latitude is not valid",
                    lng: "Longitude is not valid",
                    name: "Name must be less than 50 characters",
                    description: "Description is required",
                    price: "Price per day is required"
                }
            })
        }

        let newSpot = await Spot.create({
            ownerId: user.id,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price
        })

        res.status = 201
        res.json(newSpot)
    } else {
        return res.json({
            message: "Required to be owner and logged in"
        });
    }
})

//POST api/spots/:spotId/images
router.post('/:spotId/images', requireAuth, async (req, res) => {

    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    const { user } = req;

    if (user.id === spot.ownerId) {

        const { url, preview } = req.body;

        await SpotImage.create({
            url: url,
            preview: preview,
            spotId: req.params.spotId
        })

        const newImage = await SpotImage.findAll({
            attributes: ['id', 'url', 'preview'],
            where: { url: url }
        })

        res.status = 200
        res.json(newImage)
    } else {
        return res.json({
            message: "Required to be owner and logged in"
        });
    }
})

//PUT /api/spots/:spotId
router.put('/:spotId', requireAuth, async (req, res) => {
    const { user } = req

    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    if (user.id === spot.ownerId) {
        const { address, city, state, country, lat, lng, name, description, price } = req.body

        if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price ||
            address === "" || city === "" || state === "" || country === "" || lat === "" || lng === "" || name === "" ||
            description === "" || price === "") {
            return res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    address: "Street address is required",
                    city: "City is required",
                    state: "State is required",
                    country: "Country is required",
                    lat: "Latitude is not valid",
                    lng: "Longitude is not valid",
                    name: "Name must be less than 50 characters",
                    description: "Description is required",
                    price: "Price per day is required"
                }
            })
        }

        spot = spot.toJSON()

        spot.address = address
        spot.city = city
        spot.state = state
        spot.country = country
        spot.lat = lat
        spot.lng = lng
        spot.name = name
        spot.description = description
        spot.price = price

        res.status = 200;
        res.json(spot)
    } else {
        return res.json({
            message: "Required to be owner and logged in"
        });
    }
})

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { user } = req

    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    if (user.id === spot.ownerId) {

        await spot.destroy()

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        return res.json({
            message: "Required to be owner and logged in"
        });
    }
})

//GET /api/spots/:spotId/reviews
router.get('/:spotId/reviews', async (req, res) => {
    const allReviews = await Review.findAll({
        where: { spotId: req.params.spotId }
    })

    if (!allReviews.length) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    res.json({
        Reviews: allReviews
    })
})

//POST /api/spots/:spotId/reviews
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { user } = req

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    const checkReview = await Review.findOne({
        where: {
            userId: user.id,
            spotId: req.params.spotId
        }
    })

    if(checkReview) {
        res.status(403)
        return res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }

    if(user) { 
        const { review, stars } = req.body

        if(!review || !stars || review === "" || stars === "" || stars > 5 || stars < 0) {
            res.status(400)
            return res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    review: "Review text is required",
                    stars: "Stars must be an integer from 1 to 5",
                }
            })
        };

        await Review.create({
            userId: user.id,
            spotId: req.params.spotId,
            review: review,
            stars: stars
        })

        const newReview = await Review.findOne({
            where: {spotId: req.params.spotId}
        })

        res.json(newReview)
    } else {
        return res.json({
            message: "Required to be owner and logged in"
        });
    }
})


module.exports = router;