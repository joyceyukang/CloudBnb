const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking, Spot, SpotImage } = require('../../db/models');

const router = express.Router();
const { Op } = require("sequelize");

//GET api/bookings/current
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req

    let allBookings = await Booking.findAll({
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [
                    {
                        model: SpotImage,
                        attributes: ['url']
                    }
                ]
            }
        ],
        where: {
            userId: user.id,
        }
    });

    if (user && allBookings.length) {

        let bookingList = []
        allBookings.forEach(booking => {
            bookingList.push(booking.toJSON())
        });

        bookingList.forEach(booking => {
            if (booking.Spot.SpotImages[0]) {
                booking.Spot.previewImage = booking.Spot.SpotImages[0].url
            } else if (!booking.Spot.SpotImages.length) {
                booking.Spot.previewImage = "No preview image"
            }

            delete booking.Spot.SpotImages
        })

        res.json(bookingList)
    } else if (!allBookings.length) {
        return res.json({
            message: "User has no bookings"
        })
    } else {
        return res.json({
            message: "Required to be owner and logged in"
        });
    }
})

//POST /api/bookings/:spotId
router.post('/:spotId', requireAuth, async (req, res) => {
    const { user } = req

    // let booking = await Booking.findByPk(req.params.bookingId)

    // if(!booking) {
    //     res.status(404)
    //     return res.json({
    //         message: "Booking couldn't be found",
    //         statusCode: 404,
    //     })
    // }

    if(user) {
        const { startDate, endDate } = req.body;

        let start = new Date(startDate).getTime()
        let end = new Date(endDate).getTime()

        if(end < start) {
            return res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    endDate: "endDate cannot be on or before startDate"
                }
            })
        }

        let current = new Date().getTime()

        if(end < current) {
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                  startDate: "Start date conflicts with an existing booking",
                  endDate: "End date conflicts with an existing booking"
                }
              })
        }

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
        
        let newBooking = await Booking.create({
            userId: user.id,
            spotId: req.params.spotId, 
            startDate: new Date(start),
            endDate: new Date(end),
        })

        res.status = 201
        res.json(newBooking)
    } else {
        return res.json({
            message: "Forbidden",
            statusCode: 403
        });
    }
});

//PUT /api/bookings/:bookingId
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { user } = req

    let booking = await Booking.findByPk(req.params.bookingId)

    if(!booking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404,
        })
    }

    if(user && user.id === booking.userId) {
        const { startDate, endDate } = req.body;

        let start = new Date(startDate).getTime()
        let end = new Date(endDate).getTime()

        if(end < start) {
            return res.json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                    endDate: "endDate cannot be on or before startDate"
                }
            })
        }

        let current = new Date().getTime()

        if(end < current) {
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                  startDate: "Start date conflicts with an existing booking",
                  endDate: "End date conflicts with an existing booking"
                }
              })
        }

        let allBookings = await Booking.findAll({
            where: { spotId: booking.spotId }
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
        
        booking.startDate = new Date(start);
        booking.endDate = new Date(end);

        await booking.save()

        res.json(booking);

    }
});

//DELETE /api/bookings/:bookingId
router.delete('/:bookingId', requireAuth, async(req, res) => {
    const { user } = req

    let booking = await Booking.findByPk(req.params.bookingId);
    
    if(!booking) {
        res.status(404)
        return res.json({
            message: "Booking couldn't be found",
            statusCode: 404,
        })
    }
    
    let spot = await Spot.findByPk(booking.spotId)
    
    if(user && (user.id === spot.ownerId || user.id === booking.userId)) {
        let current = new Date().getTime()
        let start = booking.startDate.getTime()

        if(start <= current) {
            return res.json({
                messsage: "Bookings that have been started can't be deleted",
                statusCode: 403
              })
        }

        await booking.destroy()

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

module.exports = router;