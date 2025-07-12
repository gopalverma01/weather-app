import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;
  const apiKey = "80983555b9506aa645bf3cafc877cbc8";
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    const result = {
      city: weatherData.name,
      temp: weatherData.main.temp,
      desc: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon
    };
    res.render("result", { result ,error: null});
  } catch (error) {
    console.error(error.message);
    res.render("result", { result: null, error: "Could not fetch weather. Please try again." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
