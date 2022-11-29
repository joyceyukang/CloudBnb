const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');

const router = express.Router();
const { Op } = require("sequelize");

//DELETE /api/spot-images/:imageId
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { user } = req;

    let spotImage = await SpotImage.findByPk(req.params.imageId)

    if (!spotImage) {
        res.status(404)
        return res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404,
        })
    }

    let spot = await Spot.findByPk(spotImage.spotId);

    if (user && user.id === spot.ownerId) {
        await spotImage.destroy();

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