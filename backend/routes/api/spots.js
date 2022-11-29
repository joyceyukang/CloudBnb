const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');

const router = express.Router();
const { Op } = require("sequelize");
const e = require('express');


router.get('/', async (req, res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
    let pagination = {}
    let pageAndSize = {}

    if(page) {
        if (!page || isNaN(page) || page < 1 || page > 10) page = 1;
    }
    if(size) {
        if (!size || isNaN(size) || size < 1 || size > 20) size = 20;
        if((parseInt(page) >= 1 && parseInt(page)) && (parseInt(size) >= 1 && parseInt(size) <= 20)) {
            pagination.limit = size;
            pagination.offset = size * (page - 1)
        }
        pageAndSize.page = page
        pageAndSize.size = size
    }




    const spots = await Spot.findAll({
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ],
        ...pagination
    });

    let spotList = [];
    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    });

    spotList.forEach(spot => {
        let sum = 0;
        let total = 0

        console.log(spot)

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

        if (spot.SpotImages[0]) {
            spot.previewImage = spot.SpotImages[0].url
        }
        else if (!spot.SpotImages.length) {
            spot.previewImage = "No Preview Image"
        }

        delete spot.SpotImages
        delete spot.Reviews
    })

    res.json({
        Spots: spotList,
        ...pageAndSize
    });
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

            if (spot.SpotImages[0]) {
                spot.previewImage = spot.SpotImages[0].url
            }
            else if (!spot.SpotImages.length) {
                spot.previewImage = "No Preview Image"
            }

            delete spot.SpotImages
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
            message: "Forbidden",
            statusCode: 403
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

        const newImage = await SpotImage.findOne({
            attributes: ['id', 'url', 'preview'],
            where: { url: url }
        })

        res.json(newImage)
    } else {
        return res.json({
            message: "Forbidden",
            statusCode: 403
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

        spot.address = address
        spot.city = city
        spot.state = state
        spot.country = country
        spot.lat = lat
        spot.lng = lng
        spot.name = name
        spot.description = description
        spot.price = price

        await spot.save()

        res.status = 200;
        res.json(spot)
    } else {
        return res.json({
            message: "Forbidden",
            statusCode: 403
        });
    }
})

//DELETE /api/spots/:spotId
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

    if (user && user.id === spot.ownerId) {

        await spot.destroy()

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        });
    }
})

//GET /api/spots/:spotId/reviews
router.get('/:spotId/reviews', async (req, res) => {
    const allReviews = await Review.findOne({
        where: { spotId: req.params.spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    if (!allReviews) {
        return res.json({
            message: "No reviews exist for this spot"
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

    if (checkReview) {
        res.status(403)
        return res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    }

    if (user) {
        const { review, stars } = req.body

        if (!review || !stars || review === "" || stars === "" || stars > 5 || stars < 0) {
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
            where: { spotId: req.params.spotId }
        })

        res.json(newReview)
    } else {
        return res.json({
            message: "Forbidden",
            statusCode: 403
        });
    }
})

//GET /api/spots/:spotId/bookings
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req

    const allBookings = await Booking.findAll({
        where: { spotId: req.params.spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            }
        ]
    })

    if (!allBookings.length) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    if (user) {

        let bookingsList = []
        allBookings.forEach(booking => {
            if (user.id === booking.userId) {
                bookingsList.push(booking.toJSON())
            }
            else {
                let nonUserBooking = {
                    "spotId": booking.spotId,
                    "startDate": booking.startDate,
                    "endDate": booking.endDate
                }
                bookingsList.push(nonUserBooking)
            }
        })

        // res.json(allBookings)

        // res.json(await Booking.findAll({
        //     attributes: ['spotId', 'startDate', 'endDate'],
        //     where: {
        //         spotId: req.params.spotId
        //     }
        // }))

        res.json(bookingsList)
    }
    else {
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

})

//POST /api/spots/:spotId/bookings
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { user } = req

    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404)
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    if (user && user.id !== spot.ownerId) {
        const { startDate, endDate } = req.body;

        let start = new Date(startDate).getTime()
        let end = new Date(endDate).getTime()

        let allBookings = await Booking.findAll({
            where: { spotId: req.params.spotId }
        })

        let bookingList = []
        allBookings.forEach(booking => {
            bookingList.push(booking.toJSON())
        })

        bookingList.forEach(booking => {
            let dbStart = booking.startDate.getTime()
            let dbEnd = booking.endDate.getTime()

            if ((start === dbStart || (start > dbStart && start < dbEnd) || start === dbEnd) ||
                (end === dbStart || (end < dbEnd && end > dbStart) || end === dbEnd)) {
                return res.json({
                    message: "Sorry, this spot is already booked for the specified dates",
                    statusCode: 403,
                    errors: {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflicts with an existing booking"
                    }
                })
            }

        })

        if (end < start) {
            return res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    endDate: "endDate cannot be on or before startDate"
                }
            })
        }

        await Booking.create({
            spotId: req.params.spotId,
            userId: user.id,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        });

        let newBooking = await Booking.findOne({
            where: { startDate: new Date(startDate) }
        })

        res.json(newBooking)
    }

    else {
        res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    }

});



module.exports = router;