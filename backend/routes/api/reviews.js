const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, User } = require('../../db/models');

const router = express.Router();
const { Op } = require("sequelize");

//GET /api/reviews/current
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    if (user) {
        const allReviews = await Review.findAll({
            where: { userId: user.id }
        })

        console.log(allReviews);

        res.json(allReviews)
    } else {
        return res.json({
            message: "Required to be owner and logged in"
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
        where: {reviewId: req.params.reviewId}
    })

    if(allReviewImages.length === 10) {
        res.status(403)
        return res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403,
        })
    }

    if(user && user.id === review.userId) {
        const { url } = req.body
        
        await ReviewImage.create({
            url: url,
            reviewId: req.params.reviewId
        })

        const newReviewImage = await ReviewImage.findOne({
            attributes: ['id','url'],
            where: {
                url: url
            }
        })

        res.json(newReviewImage);
    } else {
        return res.json({
            message: "Required to be owner and logged in"
        });
    }
})

module.exports = router;