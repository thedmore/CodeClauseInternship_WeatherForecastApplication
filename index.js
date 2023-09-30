// Initializing all elements constants
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// Adding event listener to the form
form.addEventListener("submit", search);

// Default location
let target = "Mysore";

// Function to fetch data from Weather API
const fetchData = async (target) => {
  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=407dc3bf999b4c24b66180533232909&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();

    // Destructure
    const {
      current: {
        temp_c,
        condition: { icon, text },
      },
      location: { name, localtime },
    } = data;

    // Calling update function
    updateDom(temp_c, data.location.name, localtime, icon, text);
  } catch (error) {
    alert("Location not found!");
  }
};

// Function to update weather data (DOM)
function updateDom(temp, city, time, emoji, text) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayName(new Date(exactDate).getDay());

  temperatureField.innerText = temp + "°C";
  cityField.innerText = city;
  dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`;
  emojiField.src = emoji;
  weatherField.innerText = text;
}

fetchData(target);

// Function to search the location
function search(e) {
  e.preventDefault();
  target = searchField.value;
  fetchData(target);
}

// Function to get the name of the particular day
function getDayName(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "default";
  }
}
