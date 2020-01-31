const express = require("express");
const router = express.Router();
//const Amadeus = require("../configs/Amadeus");
const Amadeus = require("amadeus");

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_KEY,
  clientSecret: process.env.AMADEUS_SECRET
});

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/api/flights", async (req, res) => {
  const {cityFrom, cityTo, departureDate} = req.query
  // API call with params we requested from client app
  const response = await amadeus.shopping.flightOffers
    .get({
      origin: "MAD",
      destination: "PAR",
      departureDate: "2020-08-01"
    })
    try {
      console.log(res)
      await res.json(JSON.parse(response.body));
      console.log("DEPOOOOOOOOIS", response.body)
    }catch (err ){
      await res.json(err)
    }

    /* .then(res => {
      console.log(res.data);
      await res.json(res.data);
    })
    .catch(err => {
      console.log(err);
    }); */
  // Sending response for client
  /* try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  } */

  /* const flights = await Amadeus.getFlightprices("PAR", "MAD");

  try {
    await res.json(JSON.parse(flights));
  } catch (err) {
    await res.json(err);
  } */
});

module.exports = router;
