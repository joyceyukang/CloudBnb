const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User } = require('../../db/models');

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

//GET /api/spots/:spotId/reviews


module.exports = router;