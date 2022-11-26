const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
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

        spot.previewImage = spot.SpotImage.url

        delete spot.SpotImage
        delete spot.Reviews
    })

    res.json(spotList);
})

router.get('/current', restoreUser, async (req, res) => {
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

            spot.previewImage = spot.SpotImage.url

            delete spot.SpotImage
            delete spot.Reviews
        })

        return res.json({
            Spots: spotList
        });
    } else return res.json({});
})

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

    if(!spots.length) {
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
module.exports = router;