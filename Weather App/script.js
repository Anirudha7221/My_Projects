let searchWeather=document.querySelector("#search-bar>input");

let containeer=document.getElementById("Weather-containeer");

let arr=[];

let addbtn=document.querySelector(".search>button");
addbtn.addEventListener("click",()=>{
    let searchString=searchWeather.value.trim();
    fetchData(searchString);
    searchWeather.value=null;
});

// API key = a22d0dad94133bda58de9654d1e8011d
const apikey="a22d0dad94133bda58de9654d1e8011d";

const baseurl="https://api.openweathermap.org/data/2.5/weather";

async function fetchData(searchString){
    let URL=`${baseurl}?q=${searchString}&appid=${apikey}&units=metric`;

    let responce=await fetch(URL,{method:"GET"});

    let results=await responce.json();

    console.log(results);
    sortData(results);
}

function sortData(data){
    if(data.message === 'city not found'){
        return;
    }
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if(data.name === element.name){
            insert = !insert;
            return;
        }
    }
    arr.push(data);
    arr.sort((a,b)=>{
        return a.main.temp - b.main.temp;
    })
    containeer.innerHTML = '';
    arr.forEach((element) =>{
        addCard(element);
    })
}

function addCard(weatherInfo){

    let weather=weatherInfo.weather;
    let main=weatherInfo.main;
    let sys=weatherInfo.sys;
    const info = weatherIcon(weatherInfo);

    let weather_card=document.createElement("div");
    weather_card.className="Weather-card";

    weather_card.innerHTML=`<div class="temperature">
                                <h1>${Math.round(main.temp)}<span>&#8451</span></h1>
                                <div class=logo><img src="${info}" alt="weather-logo"></div>
                          </div>
                            <div>
                                <div class="tempratures">H:${Math.round(main.temp_max)}</div>
                                <div class="tempratures">L:${Math.round(main.temp_min)}</div>
                            </div>
                            <div>
                                <div class="city-country">${weatherInfo.name} <span>${sys.country}</span></div>
                                <div class="Weather-status">${weather[0].main}</div>
                            </div`;
     containeer.appendChild(weather_card);
}

function weatherIcon(weather_status){
    let imageURL="";
    if(weather_status.weather[0].main === "Clear"){
        imageURL = "https://img.lovepik.com/element/40217/5576.png_300.png";
    }
    
    else if(weather_status.weather[0].main === "Sunny"){
        imageURL = "https://www.freeiconspng.com/thumbs/sun/transparent-image-of-the-world-the-sun-planet-15.png";
    }

    else if(weather_status.weather[0].main === "Storm"){
        imageURL = "https://img.freepik.com/premium-vector/3d-weather-forecast-icons-whirlwind-rainstorm-day-3d-illustration_68708-4044.jpg";
    }
    
    else if(weather_status.weather[0].main === "Rain"){
        imageURL = "https://png.pngtree.com/png-vector/20211020/ourmid/pngtree-3d-cloud-weather-rain-illustration-png-image_3997806.png";
    }

    else if(weather_status.weather[0].main === "Haze"){
        imageURL = "https://cdn3d.iconscout.com/3d/premium/thumb/haze-9175174-7502104.png";
    }

    else if(weather_status.weather[0].main === "Clouds"){
        imageURL = "https://cdn3d.iconscout.com/3d/premium/thumb/cloudy-weather-7902502-6328505.png";
    }

    let info = imageURL;
    console.log(info);
    return info;
}

