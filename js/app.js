import axios from 'axios'

const chuckURL = "https://api.chucknorris.io/jokes/random";

const nasaURL = "https://api.nasa.gov/planetary/apod?api_key=0J9psijfNVWO8gC7iRadAgjWjCqmd9HwZw7WmJgb";

const ranURL = "https://random.imagecdn.app/v1/image?&format=json";


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


getNasa()