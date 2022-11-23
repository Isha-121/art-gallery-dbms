const express = require('express');
const router = express.Router();
const{
    getArtists,
    createArtist,
    updateArtist,
    deleteArtist,
    getArtProduct,
    createArtProduct,
    updateArtProduct,
    deleteArtProduct,
    getQuery,
    runQuery
} = require("../Controllers/index");

router.get('/',(req,res)=>res.render("index"));
router.get("/artist", getArtists);
router.post("/artist",createArtist);
router.put("/artist/:id",updateArtist);
router.delete("/artist/:id",deleteArtist);
router.get("/artproducts",getArtProduct);
router.post("/artproducts",createArtProduct);
router.put("/artproducts/:id",updateArtProduct);
router.delete("/artproducts/:id",deleteArtProduct);
router.get("/queries",getQuery);
router.post("/queries",runQuery);

module.exports = router;