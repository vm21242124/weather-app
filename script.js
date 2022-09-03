let whether = {
  apikey: "364109c3cb6c8780406e9a143d80db87",
  fetchwhether: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apikey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No data found please search for other cities");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displeywhether(data));
  },
  displeywhether: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(
      `${name}, ${icon} ,${description},${temp} ,${humidity} ,${speed}`
    );
    document.querySelector(".city").innerText = "weather in " + name;
    //https://openweathermap.org/img/wn/" + icon +".png";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "wind speed: " + speed + " km/h";
      document.querySelector(".whether").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchwhether(document.querySelector(".searchbar").value);
  },
};
// whether.fetchwhether("mumbai")
document.querySelector(".search button").addEventListener("click", function () {
  whether.search();
});
document
  .querySelector(".searchbar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      whether.search();
    }
  });
whether.displeywhether("Mumbai");
