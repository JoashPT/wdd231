const webPageUrl = window.location.href;

const urlArray = webPageUrl.split('?');

const formData = urlArray[1].split('&');

function getData(data) {
    const info = formData.filter(item => item.startsWith(data))[0].split('=')[1];
    return info;
}

function displayData() {
    const response = document.getElementById('response');

    const fillout = document.createElement('p');
    fillout.textContent = "These are the details in your form:";
    fillout.classList.add("bolder");
    response.appendChild(fillout);

    const firstName = document.createElement('p');
    firstName.innerHTML = `First Name: ${getData("fname")}`;
    response.appendChild(firstName);

    const lastName = document.createElement('p');
    lastName.innerHTML = `Last Name: ${getData("lname")}`;
    response.appendChild(lastName);

    const email = document.createElement('a');
    email.href = getData("email");
    email.innerHTML = `Email: ${getData("email").replace("%40", "@")}`;
    response.appendChild(email);

    const phone = document.createElement('p');
    phone.innerHTML = `Phone Number: ${getData("phone").replace(/[+]/g, '-')}`;
    response.appendChild(phone);

    const thankyou = document.createElement('p');
    thankyou.textContent = "Thank you for filling out the form!";
    response.appendChild(thankyou);

    const goHome = document.createElement('a');
    goHome.href = "./home.html";
    goHome.textContent = "Return to Home Page";
    response.appendChild(goHome);
}

displayData();