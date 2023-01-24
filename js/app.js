import axios from 'axios'

const chuckURL = "https://api.chucknorris.io/jokes/random";

const nasaURL = "https://api.nasa.gov/planetary/apod?api_key=0J9psijfNVWO8gC7iRadAgjWjCqmd9HwZw7WmJgb";

const ranURL = "https://random.imagecdn.app/v1/image?&format=json";

navigator.geolocation.getCurrentPosition((response) => {
    console.log("https://api.openweathermap.org/data/2.5/weather?&appid=401395c8bb11a6dde982bcf35f6812e4&units=metric&lat=" + response.coords.latitude + "&lon=" + response.coords.longitude);
})

async function getNasa() {
    await axios(nasaURL)
        .then(response => {
            try {
                const nasa = response.data
                console.log(nasaURL);
                console.log(nasa);
                document.querySelector(".random-image").setAttribute("style", `background:url(${nasa.url}); background-repeat: no-repeat; background-size: contain; background-position: center;`)
                //Add explanation and limit the length to 600 characters
                document.querySelector(".nasa").innerHTML = nasa.explanation.substring(0, 500) + "...<br><br> Credit: <a href='https://apod.nasa.gov/apod/astropix.html' target='_blank'>Click Here</a> "
            } catch (error) {
                console.error(error);
            }
        }
        )
}

async function getChuck() {
    await axios(chuckURL)
        .then(response => {
            try {
                const chuck = response.data
                console.log(chuck.value);

                document.querySelector(".chuck-norris").textContent = chuck.value

            } catch (error) {
                console.error(error);
            }
        })
}
function getWeather() {

    navigator.geolocation.getCurrentPosition(async function (position){
        try {
            await axios("https://api.openweathermap.org/data/2.5/weather?&appid=401395c8bb11a6dde982bcf35f6812e4&units=metric&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude)

            //`api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=401395c8bb11a6dde982bcf35f6812e4`


                .then(response => {
                    const weather = response.data;

                    const main = weather.main;
                    const wind = weather.wind;

                    console.log(main);
                    console.log(wind);

                    let iconURL = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`

                    console.log(iconURL);

                })

        } catch (error) {
            console.error(error);
        }
    })
}

getNasa()
getChuck()
getWeather()