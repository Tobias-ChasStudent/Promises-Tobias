import axios from 'axios'

const chuckURL = "https://api.chucknorris.io/jokes/random";

const nasaURL = "https://api.nasa.gov/planetary/apod?api_key=0J9psijfNVWO8gC7iRadAgjWjCqmd9HwZw7WmJgb";

let spanTime = ""

navigator.geolocation.getCurrentPosition((response) => {
    console.log("https://api.openweathermap.org/data/2.5/weather?&appid=401395c8bb11a6dde982bcf35f6812e4&units=metric&lat=" + response.coords.latitude + "&lon=" + response.coords.longitude);
})

async function getNasa() {
    await axios(nasaURL)
        .then(response => {
            const nasa = response.data
            console.log(nasaURL);
            try {
                //console.log(nasa);
                document.querySelector(".random-image").setAttribute("style", `background:url(${nasa.url}); background-repeat: no-repeat; background-size: contain; background-position: center;`)

                try {
                    //Add explanation and limit the length to 600 characters
                    document.querySelector(".nasa").innerHTML = nasa.explanation.substring(0, 500) + "...<br><br> Credit: <a href='https://apod.nasa.gov/apod/astropix.html' target='_blank'>Click Here</a>"
                } catch (error) {
                    console.error(error);
                    document.querySelector(".nasa").innerHTML = "<p class='error'>Couldn't load nasa explanation and credit. <a href='https://apod.nasa.gov/apod/astropix.html'>Link to it</a></p>"

                }
            } catch (error) {
                console.error(error);
                document.querySelector(".random-image").innerHTML = "<p class='error'>Couldn't load picture of the day. Sorry! <a href='https://apod.nasa.gov/apod/astropix.html'>Link to it</a></p> <br> <p> Credit to current background to: Aldebaran S";
                document.querySelector(".random-image").setAttribute("style", `background: url(https://images.unsplash.com/photo-1610296669228-602fa827fc1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1375&q=80) ; background-repeat: no-repeat; background-size: contain; background-position: center;`)
            }
        }
        )
}

async function getChuck() {
    await axios(chuckURL)
        .then(response => {
            try {
                const chuck = response.data
                //console.log(chuck.value);

                document.querySelector(".chuck-norris").textContent = chuck.value

            } catch (error) {
                console.error(error);
                document.querySelector(".chuck-norris").innerHTML = "<p class='error'>Couldn\'t load Chuck Norris joke. Sorry!</p>"
            }
        })
}

function getWeather() {

    navigator.geolocation.getCurrentPosition(async function (position) {
        try {
            await axios("https://api.openweathermap.org/data/2.5/weather?&appid=401395c8bb11a6dde982bcf35f6812e4&units=metric&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude)

                //`api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=401395c8bb11a6dde982bcf35f6812e4`

                .then(response => {
                    const weather = response.data;

                    const main = weather.main;
                    const wind = weather.wind;

                    console.log(weather);
                    console.log(main);
                    console.log(wind);

                    let iconURL = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`

                    document.querySelector(".weather").innerHTML = `
                    
                    <h2>Today's weather</h2><br>
                    <h4>${weather.name} - ${weather.weather[0].description}</h4>
                    <img src="${iconURL}" id="weather-icon" alt="Weather icon showing ${weather.weather[0].description}"><br>

                    <span id="temp">${main.temp}°C</span>

                    <span id="feels-like">(${main.feels_like}°C)</span>
                    
                    <section id="wind">
                        
                        <span id="speed">Wind: ${wind.speed}m/s</span>

                        <img src="https://www.svgrepo.com/show/253224/compass-up-arrow.svg" alt="Compass arrow pointing at ${wind.deg} degrees" id="deg" style="transform: rotate(${wind.deg}deg)">

                    </section>

                    <span id="time"></span>

    
                    `

                    spanTime = document.querySelector("#time")

                })

        } catch (error) {
            console.error(error);
            document.querySelector(".weather").innerHTML = "Couldn't load weather data. Sorry!"
        }
    })
}

getNasa()
getChuck()
getWeather()
setInterval(() => {
    let today = new Date();
    let date = today.getDate() + "/" + (today.getMonth() + 1) + '-' + today.getFullYear();

    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

    //console.log(spanTime);s

    spanTime.textContent = date + " " + time
}, 1000);