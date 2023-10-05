import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import { log } from "console";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const API_URL = "http://api.openweathermap.org";
const apiKey = "4704f5a49a7d1f454e9cecb2104fa5ec";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/submit", async (req, res) => {
  try {
    const city = req.body.cityName;
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    const weatherData = await axios.get(
      `${API_URL}/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );

    const currentTemp = weatherData.data.main.temp;
    const tempFeels = weatherData.data.main.feels_like;
    const humidity = weatherData.data.main.humidity;
    const pressure = weatherData.data.main.pressure;
    const visibility = weatherData.data.visibility;
    const descrip = weatherData.data.weather[0].description;
    const description = descrip.charAt(0).toUpperCase() + descrip.slice(1);
    const windSpeed = weatherData.data.wind.speed;
    // const precipitation = weatherData.data.precipitation.value;
    const icon = `https://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`;

    console.log(weatherData.data);
    res.render("index.ejs", {
      cityName,
      currentTemp,
      tempFeels,
      humidity,
      pressure,
      visibility,
      description,
      windSpeed,
      icon,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on ${port}`);
});
