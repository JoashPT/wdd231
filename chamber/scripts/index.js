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



/*=========
#companyDiv
=========*/

const data_source = "./data/members.json";

async function getCompanyData() {
    const response = await fetch(data_source);
    const data = await response.json();
    return data;
}

function passCompany() {
    const companyData = getCompanyData().then(companies => companies.filter((company) => company.membership_level > 1));
    return companyData;
}

function chooseCompany() {
    const companyList = passCompany().then(company => {
        const chosenCompany = [];
        for (let i = 0; i < 3; i++) {
            let randInt = Math.floor(Math.random() * (company.length - 1));
            chosenCompany.push(company[randInt]);
            company.splice(randInt, 1);
        }
        console.log(chosenCompany);
        return chosenCompany;
    })
    return companyList;
}

function displayCompany(companies) {
    const companyDiv = document.getElementById("companyDiv");

    companies.forEach(company => {
        const companyContainer = document.createElement("div");

        let companyLogo = document.createElement("img");
        companyLogo.src = company.image_icon;
        companyLogo.alt = `logo of ${company.name}`;
        companyLogo.loading = "lazy";
        // companyLogo.width = 100;
        companyLogo.height = 100;
        companyContainer.appendChild(companyLogo);

        let companyName = document.createElement("p");
        companyName.textContent = company.name;
        companyContainer.appendChild(companyName);

        let companyPhone = document.createElement("p");
        companyPhone.textContent = company.phone_number;
        companyContainer.appendChild(companyPhone);

        let companyAddress = document.createElement("p");
        companyAddress.textContent = company.address
        companyContainer.appendChild(companyAddress);

        let companyLevel = document.createElement("p");
        if (company.membership_level > 2) {
            companyLevel.textContent = "Gold";
        } else {
            companyLevel.textContent = "Silver";
        }
        companyContainer.appendChild(companyLevel);
        
        let companyLink = document.createElement("a");
        companyLink.href = company.website_url;
        companyLink.innerHTML = `Visit ${company.name} Website`;
        companyContainer.appendChild(companyLink);

        companyDiv.appendChild(companyContainer);
    })
}

chooseCompany().then(displayCompany);
