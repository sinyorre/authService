var express = require("express");
var router = express.Router();
const axios = require("axios");
const jwt_decode = require("jwt-decode");
const jose = require("jose");

/* GET home page. */
router.post("/verifyToken", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    const pubKeyResp = await axios.get(process.env.FIREBASE_PUB_KEY_URI);
    const pubKey = pubKeyResp.data;
    const kid = jwt_decode(token, { header: true }).kid;
    const key = jose.JWK.asKey(pubKey[kid]);

    jose.JWT.verify(token, key);
    res.json(true);
  } catch {
    res.json(false);
  }
});

module.exports = router;
