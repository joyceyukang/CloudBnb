const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, User, Spot, SpotImage } = require('../../db/models');

const router = express.Router();
const { Op } = require("sequelize");

//GET /api/reviews/current
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    if (user) {
        const allReviews = await Review.findAll({
            where: { userId: user.id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Spot,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                    include: [
                        {
                            model: SpotImage,
                            attributes: ['url']
                        }
                    ]
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        })

        let reviewList = []
        allReviews.forEach(review => {
            reviewList.push(review.toJSON())
        });

        reviewList.forEach(review => {
            if (review.Spot.SpotImage) {
                review.Spot.previewImage = review.Spot.SpotImage.url
            } else if (!review.Spot.SpotImage) {
                review.Spot.previewImage = "No preview image"
            }

            delete review.Spot.SpotImage
        })

        res.json(reviewList)
    } else {
        return res.json({
            message: "Forbidden",
            statusCode: 403
        });
    }
})

//POST /api/reviews/:reviewId/images
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { user } = req

    let review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404,
        })
    }

    let allReviewImages = await ReviewImage.findAll({
        where: { reviewId: req.params.reviewId }
    })

    if (allReviewImages.length === 10) {
        res.status(403)
        return res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403,
        })
    }

    if (user && user.id === review.userId) {
        const { url } = req.body

        await ReviewImage.create({
            url: url,
            reviewId: req.params.reviewId
        })

        const newReviewImage = await ReviewImage.findOne({
            attributes: ['id', 'url'],
            where: {
                url: url
            }
        })

        res.json(newReviewImage);
    } else {
        return res.json({
            message: "Forbidden",
            statusCode: 403
        });
    }
})

//PUT /api/reviews/:reviewId
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req

    let findReview = await Review.findByPk(req.params.reviewId)

    if (!findReview) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404,
        })
    }

    if (user && user.id === findReview.userId) {
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

        findReview.review = review
        findReview.stars = stars

        await findReview.save()

        res.json(findReview)
    } else {
        return res.json({
            message: "Forbidden",
            statusCode: 403
        });
    }
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req

    let review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        res.status(404)
        return res.json({
            message: "Review couldn't be found",
            statusCode: 404,
        })
    }

    if (user && user.id === review.userId) {
        await review.destroy()

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        return res.json({
            message: "Forbidden",
            statusCode: 403
        });
    }
})

module.exports = router;