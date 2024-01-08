const apiKey = "3d66ff0cc62aaae6b8beba2756d8b95c";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cName = document.querySelector(".search input");
const sBtn = document.querySelector(".search button");

async function weather(city) {
    const getData = await fetch(apiURL + city + `&appid=${apiKey}`);
    var data = await getData.json();

    console.log(data);

    document.querySelector(".container .bg").style.background = "url('http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png')";
    document.querySelector(".city span").innerHTML = data.name + ", " + data.sys.country;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".hum span").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind span").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".tcon .right img").src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    document.querySelector(".tcon .right img").alt = data.weather[0].main;
    document.querySelector(".tcon .right span").innerHTML = data.weather[0].main;
}

document.addEventListener('DOMContentLoaded', function () {
    weather(cName.value);

    function toggleButtonVisibility() {
        if (cName.value === "") {
            sBtn.style.display = "none";
        } else {
            sBtn.style.display = "inline-block";
        }
    }

    function handleFormSubmission(event) {
        event.preventDefault();
        weather(cName.value);
    }

    cName.addEventListener("input", toggleButtonVisibility);

    sBtn.addEventListener("click", () => {
        weather(cName.value);
    });

    cName.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleFormSubmission(event);
        }
    });

    toggleButtonVisibility();
});