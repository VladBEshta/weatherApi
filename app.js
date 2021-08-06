window.addEventListener('load', () => {

    const temperatureDegree = document.querySelector('.temperature-degree');
    const temperatureDescription = document.querySelector('.temperature-description');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.degree-section span');
    const locationIcon = document.querySelector('.location canvas');
    const currentTime = document.querySelector('.current-time-section h1')


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let long = position.coords.longitude;
            let lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`

            fetch(api).
                then(data => {
                    if (data.ok) {
                        return data.json()
                    } else {
                        console.log("error", data)
                    }
                })
                .then(data => {
                    console.log(data)
                    const { temperature, summary } = data.currently;
                    const timezone = data.timezone;
                    const icon = (data.currently.icon).replace(/-/g, '_').toUpperCase()
                    setFromData(temperature, summary, timezone)
                    getIcon(icon);
                    setInterval(setCurrentTime, 0);
                    temperatureSection.addEventListener('click', () => { changeTemperature(temperature) })
                })
                .catch(err => console.log(err))

        })

    }
    let changeTemperature = (temperature) => {
        if (temperatureSpan.textContent === "F") {
            temperatureSpan.textContent = "C"
            temperatureDegree.textContent = Math.round((temperature - 32) * 5 / 9)

        } else {
            temperatureSpan.textContent = "F"
            temperatureDegree.textContent = Math.round(temperature);
        }
    }
    let setFromData = (temperature, summary, timezone) => {
        temperatureDegree.textContent = Math.round(temperature);
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = timezone
    }
    let getIcon = (icon) => {
        const skycons = new Skycons({ "color": "white" });
        skycons.play()
        skycons.set(locationIcon, Skycons[icon]);
    }
    let setCurrentTime = () => {
        today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = checkZero(m);
        s = checkZero(s);
        currentTime.textContent = `${h}:${m}:${s}`
    }
    let checkZero = (i) => {
        if (i < 10) {
            i = `0${i}`
        }
        return i;
    }
    console.log('Loading...');
})