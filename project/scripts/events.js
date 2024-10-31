/*=========
#weatherDiv
=========*/
const api_key = "c6c5c073035fcc3afff157ecfa5cdd85";
const lat = "14.3";
const lon = "120.96";
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

function getData() {
    const returnData = apiFetch().then(data => {
        const storeObject = {
            "weatherIcon": data.list[0].weather[0].icon,
            "currentTemp": data.list[0].main.temp,
            "weatherDesc": data.list[0].weather[0].description,
            
            "morrow": {
                "weekday": new Date(data.list[8].dt_txt).toLocaleString("en-US", {weekday: 'short'}),
                "temperature": data.list[8].main.temp
            },

            "overmorrow": {
                "weekday": new Date(data.list[16].dt_txt).toLocaleString("en-US", {weekday: 'short'}),
                "temperature": data.list[16].main.temp
            },

            "afterovermorrow": {
                "weekday": new Date(data.list[24].dt_txt).toLocaleString("en-US", {weekday: 'short'}),
                "temperature": data.list[24].main.temp
            }
        }
        return storeObject;
    })
    return returnData;
}

function displayData(dataList) {

    const weatherDiv = document.getElementById("weatherDiv");

    let weatherIcon = document.createElement('img');
    weatherIcon.src = `https://openweathermap.org/img/w/${dataList.weatherIcon}.png`;
    weatherIcon.alt = dataList.weatherDesc;
    weatherIcon.loading = "lazy";
    weatherIcon.height = 100;
    weatherIcon.width = 100;
    weatherDiv.appendChild(weatherIcon);

    let currentTemp = document.createElement('p');
    currentTemp.innerHTML = `Temperature: ${dataList.currentTemp}&deg;C`;
    weatherDiv.appendChild(currentTemp);

    let weatherDesc = document.createElement('p');
    weatherDesc.innerHTML = `Description: ${dataList.weatherDesc}`;
    weatherDiv.appendChild(weatherDesc);

    let weatherMorrow = document.createElement('p');
    weatherMorrow.innerHTML = `${dataList.morrow.weekday}: ${dataList.morrow.temperature}&deg;C`;
    weatherDiv.appendChild(weatherMorrow);

    let weatherOvermorrow = document.createElement('p');
    weatherOvermorrow.innerHTML = `${dataList.overmorrow.weekday}: ${dataList.overmorrow.temperature}&deg;C`;
    weatherDiv.appendChild(weatherOvermorrow);

    let weatherAfterovermorrow = document.createElement('p');
    weatherAfterovermorrow.innerHTML = `${dataList.afterovermorrow.weekday}: ${dataList.afterovermorrow.temperature}&deg;C`;
    weatherDiv.appendChild(weatherAfterovermorrow);
}

getData().then(displayData);

const events_source = "./data/events.json";

const getEventData = async () => {
    const response = await fetch(events_source);
    const data = response.json();
    return data;
}

function makeData() {
    getEventData().then(events => {
        events.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        //console.log(events);
       
        const finishedEvents = events.filter((event) => event.status == "Finished");
        //console.log(finishedEvents);

        const ongoingEvents = events.filter((event) => event.status == "Ongoing");
        //console.log(presentEvents);

        const upcomingEvents = events.filter((event) => event.status == "Upcoming");
        //console.log(upcomingEvents);
        const eventBody = document.getElementById("eventBody");

        const allEvent = document.getElementById("allEvent");
        allEvent.addEventListener("click", () => {
            eventBody.innerHTML = "";
            createEventCard(finishedEvents);
            createEventCard(ongoingEvents);
            createEventCard(upcomingEvents);
        })

        const pastEvent = document.getElementById("pastEvent");
        pastEvent.addEventListener("click", () => {
            eventBody.innerHTML = "";
            createEventCard(finishedEvents);
        })

        const presentEvent = document.getElementById("presentEvent");
        presentEvent.addEventListener("click", () => {
            eventBody.innerHTML = "";
            createEventCard(ongoingEvents);
        })

        const futureEvent = document.getElementById("futureEvent");
        futureEvent.addEventListener("click", () => {
            eventBody.innerHTML = "";
            createEventCard(upcomingEvents);
        })

        allEvent.click();
    })
}

makeData();

function createEventCard(list) {
    
    list.forEach(item => {
        let tr = document.createElement("tr");

        let td_name = document.createElement("td");
        td_name.textContent = item.name;
        td_name.addEventListener("click", () => {
            viewEventItem(item)
        })
        tr.appendChild(td_name);

        let td_date = document.createElement("td");
        td_date.textContent = item.date;
        tr.appendChild(td_date);

        let td_status = document.createElement("td");
        td_status.textContent = item.status;
        tr.appendChild(td_status);

        eventBody.appendChild(tr);
    }) 
}

function viewEventItem(item) {
    let eventItemDialog = document.getElementById("eventItemDialog");
    eventItemDialog.innerHTML = "";

    let item_image = document.createElement("img");
    item_image.src = item.image;
    item_image.alt = item.name;
    item_image.loading = "lazy";
    eventItemDialog.appendChild(item_image);

    let item_name = document.createElement("p");
    item_name.textContent = item.name;
    item_name.classList.add("bolder");
    eventItemDialog.appendChild(item_name);

    let item_date = document.createElement("p");
    item_date.innerHTML = `Date: ${item.date}`;
    eventItemDialog.appendChild(item_date);

    let item_duration = document.createElement("p");
    item_duration.innerHTML = `Duration: ${item.duration} day`;
    eventItemDialog.appendChild(item_duration);

    let item_location = document.createElement("p");
    item_location.innerHTML = `Location: ${item.location}`;
    eventItemDialog.appendChild(item_location);

    let item_desc = document.createElement("p");
    item_desc.textContent = item.description;
    eventItemDialog.appendChild(item_desc);

    let item_register = document.createElement("a");
    item_register.href = item.register;
    item_register.textContent = "See Event";
    item_register.classList.add("link");
    eventItemDialog.appendChild(item_register);

    let dialog_exit = document.createElement("p")
    dialog_exit.textContent = "X";
    dialog_exit.classList.add("modalExit");
    dialog_exit.addEventListener("click", () => {
        eventItemDialog.close();
    })
    eventItemDialog.appendChild(dialog_exit);
    
    eventItemDialog.showModal();
}