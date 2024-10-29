/*=====================
.festivalHolder content
=====================*/

const festival_source = "./data/festivals.json";

const getfestivalData = async () => {
    const response = await fetch(festival_source);
    const data = await response.json();
    return data;
}

function createFestivalCard() {

    getfestivalData().then(festivalsArray => {

        let festival_card_holder = document.querySelector(".festivalHolder");
        festival_card_holder.innerHTML = "";

        let festival_heading = document.createElement("h2")
        festival_heading.textContent = "Events to look out for!";
        festival_card_holder.appendChild(festival_heading);


        festivalsArray.forEach(festival => {

            let festival_card = document.createElement("div");
            
            let festival_title = document.createElement("h3");
            festival_title.innerHTML = `${festival.name} <span class="subtext">${festival.location}</span>`;
            festival_card.appendChild(festival_title);
            
            let festival_img = document.createElement("img");
            festival_img.src = festival.image;
            festival_img.alt = festival.name;
            festival_img.loading = "lazy";
            festival_card.appendChild(festival_img);

            let festival_desc = document.createElement("p");            
            festival_desc.textContent = festival.description;
            festival_card.appendChild(festival_desc);

            festival_card_holder.appendChild(festival_card);
        })
    })
}

createFestivalCard();

/*====================
.localInterest content
====================*/

const interest_source = "./data/interest.json";

const getInterestData = async () => {
    const response = await fetch(interest_source);
    const data = await response.json();
    return data;
}

function createInterestCard() {

    getInterestData().then(interestArray => {

        let interest_card_holder = document.querySelector(".localInterest");
        interest_card_holder.innerHTML = "";

        let interest_heading = document.createElement("h2");
        interest_heading.textContent = "Places to visit!";
        interest_card_holder.appendChild(interest_heading);

        interestArray.forEach(interest => {

            let interest_card = document.createElement("div");
            
            let interest_figure = document.createElement("figure");

            let interest_img = document.createElement("img");
            interest_img.src = interest.image;
            interest_img.alt = interest.name;
            interest_img.setAttribute("loading", "lazy");
            interest_figure.appendChild(interest_img);

            let interest_figcaption = document.createElement("figcaption");
            interest_figcaption.textContent = interest.name;
            interest_figure.appendChild(interest_figcaption);

            interest_card.appendChild(interest_figure);

            interest_card.addEventListener("click", () => {
                
                const interestDetail = document.getElementById("interestDetail");
                interestDetail.innerHTML = "";

                let modal_name = document.createElement("h3");
                modal_name.textContent = interest.name;
                interestDetail.appendChild(modal_name);

                let modal_img = document.createElement("img");
                modal_img.src = interest.image;
                modal_img.width = 80;
                modal_img.loading = "lazy";
                interestDetail.appendChild(modal_img);

                let modal_desc = document.createElement("p");
                modal_desc.textContent = interest.description;
                interestDetail.appendChild(modal_desc);

                let modal_exit = document.createElement("button")
                modal_exit.textContent = "X";
                modal_exit.addEventListener("click", () => {
                    interestDetail.close();
                })
                interestDetail.appendChild(modal_exit);

                interestDetail.showModal();
            })

            interest_card_holder.appendChild(interest_card);
        })
    })
}

createInterestCard();

/*==========
localStorage
==========*/

let welcome = document.querySelector(".welcome");
welcome.innerHTML = "";

localStorage.visitLast = localStorage.visitNow || 0;
localStorage.visitNow = Date.now();

let currentTime = new Date(parseInt(localStorage.visitNow));
let lastTime = (localStorage.visitLast == 0) ? 0 : new Date(parseInt(localStorage.visitLast));

if (lastTime == 0) {
    welcome.innerHTML = `<p>Welcome! Let us know if you have any questions!</p>`;
} else {

    let timeDifference = (currentTime.getTime() - lastTime.getTime()) / (1000 * 3600 * 24);

    if (timeDifference < 1) {
        welcome.innerHTML = `<p>Back so soon! Awesome!</p>`;
    } else {
        let dayDifference = Math.round(timeDifference);
        welcome.innerHTML = `<p>You last visited ${dayDifference} days ago</p>`
    }
}