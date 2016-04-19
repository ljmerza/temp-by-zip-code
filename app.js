'use strict'

let path = require("path"),
  express = require("express"),
  zipdb = require("zippity-do-dah"),
  ForecastIo = require("forecastio")

let app = express()
let weather = new ForecastIo("5c24bad8bd02811fc9b44dc8db10b2dc")
let port = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, "public")))

app.set("views", path.resolve(__dirname, "views"))
app.set("view engine", "pug")

app.get("/", function(req, res) {
  res.render("index")
})

app.get(/^\/(\d{5})$/, function(req, res, next) {
  let zipcode = req.params[0]
  let location = zipdb.zipcode(zipcode)

  if (!location.zipcode){
    return next()
  }

  weather.forecast(location.latitude, location.longitude, function(err, data){
    if (err){
      return next()
    }

    res.json({
      zipcode: zipcode,
      temperature: data.currently.temperature,
      city: location.city,
      state: location.state
    })
  })
})

app.use(function(req, res) {
  res.status(404).render("404")
})

app.listen(port, function(){
  console.log("server listening on port ", port)
})
