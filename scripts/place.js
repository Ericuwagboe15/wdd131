const lastModified = new Date(document.lastModified);
const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"};
document.getElementById("lastModified").innerHTML = "Last Modified " + lastModified.toLocaleString("en-us", options);

async function getCountryData() {
  const url = "https://restcountries.com/v3.1/name/nigeria";

     const response = await fetch(url);
     const data = await response.json();
     const country = data[0];

     document.getElementById("area").textContent = `Area: ${country.area.toLocaleString()} sq km`;
     document.getElementById("population").textContent = `Population: ${country.population.toLocaleString()}`;
     document.getElementById("capital").textContent = `Capital: ${country.capital[0]}`;
     document.getElementById("languages").textContent = `Languages: ${Object.values(country.languages).join(", ")}`;
     document.getElementById("currency").textContent = `Currency: ${Object.values(country.currencies)[0].name}`;
     document.getElementById("timezone").textContent = `Time Zone: ${country.timezones[0]}`;
     document.getElementById("callingcode").textContent = `Calling Code: +${country.idd.root}${country.idd.suffixes[0]}`;
     document.getElementById("tld").textContent = `Internet TLD: ${country.tld[0]}`;
}

getCountryData();

const apiKey = "YOUR_OPENWEATHER_API_KEY";
const city = "Benin City";

async function getWeather() {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   const response = await fetch(url);
   const data = await response.json();
   const temp = data.main.temp;
   const wind = data.wind.speed;
   const conditions = data.weather[0].description;
   document.getElementById("temp").textContent = `Temperature: ${temp} °C`;
   document.getElementById("conditions").textContent = `Conditions: ${conditions}`;
   document.getElementById("wind").textContent = `Wind: ${wind} km/h`;
   document.getElementById("windchill").textContent = `Wind Chill: ${calcWindChill(temp, wind)}`;
}

function calcWindChill(temp, wind){
  if (temp <= 10 && wind > 4.8) {
    return (
      13.12 +
      0.6215 * temp -
      11.37 * Math.pow(wind, 0.16) +
      0.3965 * temp * Math.pow(wind, 0.16) 
    ).toFixed(1) + "°C";
  }
  return "N/A";
}

getWeather();