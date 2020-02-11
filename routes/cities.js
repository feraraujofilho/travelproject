const Express = require("express");
const router = Express.Router()
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_KEY,
  clientSecret: process.env.AMADEUS_SECRET
});

router.get("/:id", async (req,res,next) => {

  const response = await amadeus.client
    .get(`/v1/reference-data/locations`, {
      subType: 'AIRPORT,CITY',
      keyword: req.params.id
    })

      let parsed = JSON.parse(response.body);
      const city = {
        name: parsed.data[1].address.cityName,
        iataCode: parsed.data[1].iataCode
      };
      try {
        res.json(city)
      }
      catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router;

