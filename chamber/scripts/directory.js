//Data source
const data_source = "./data/members.json";

//function to return json data to the function
const getJSONData = async () => {
    const response = await fetch(data_source);
    const data = await response.json();
    return data;
}

//function to create cards
function createCompanyCard() {

    getJSONData().then(companyArray => {
        //clears previous content
        let company_card_holder = document.querySelector("#companyDiv");
        company_card_holder.innerHTML = "";

        companyArray.forEach(company => {

            //creating html elements
            let company_card = document.createElement("div");
            let company_name = document.createElement("p");
            let company_address = document.createElement("p");
            let company_phone_number = document.createElement("p");
            let company_url = document.createElement("a");
            let company_icon = document.createElement("img");

            company_name.textContent = company.name;
            company_address.textContent = company.address;
            company_phone_number.textContent = company.phone_number;
            
            company_name.classList.add("boldName");

            company_url.textContent = "Go to Website";
            company_url.setAttribute("href", company.website_url);
            company_url.setAttribute("target", "_blank");

            company_icon.setAttribute("src", company.image_icon);
            company_icon.setAttribute("alt", `${company.name} logo`);
            company_icon.setAttribute("loading", "lazy");

            company_card.appendChild(company_icon);
            company_card.appendChild(company_name);
            company_card.appendChild(company_address);
            company_card.appendChild(company_phone_number);
            company_card.appendChild(company_url);

            company_card_holder.appendChild(company_card);
        })
    })
}

createCompanyCard();

//function to sort view

const gridButton = document.querySelector('#gridButton');
const flexButton = document.querySelector('#flexButton');
const companyDiv = document.querySelector('#companyDiv');

gridButton.addEventListener('click', () => {
    gridButton.disable = true;
    companyDiv.classList.add('gridDisplay');
    companyDiv.classList.remove('flexDisplay');
    gridButton.classList.add('activeButton');
    flexButton.classList.remove('activeButton');
    flexButton.disable = false;
})

flexButton.addEventListener('click', () => {
    flexButton.disable = true;
    companyDiv.classList.add('flexDisplay');
    companyDiv.classList.remove('gridDisplay');
    flexButton.classList.add('activeButton');
    gridButton.classList.remove('activeButton');
    gridButton.disable =false;
})

gridButton.click();