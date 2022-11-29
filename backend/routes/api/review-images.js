const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage } = require('../../db/models');

const router = express.Router();
const { Op } = require("sequelize");

//DELETE /api/review-images/:imageId
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { user } = req;

    let reviewImage = await ReviewImage.findByPk(req.params.imageId)

    if (!reviewImage) {
        res.status(404)
        return res.json({
            message: "Review Image couldn't be found",
            statusCode: 404,
        })
    }

    let review = await Review.findByPk(reviewImage.reviewId);

    if (user && user.id === review.userId) {
        await reviewImage.destroy();

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