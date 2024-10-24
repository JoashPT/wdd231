const webPageUrl = window.location.href;

const urlArray = webPageUrl.split('?');

const formData = urlArray[1].split('&');
console.log(formData);


function getData(data) {
    const info = formData.filter(item => item.startsWith(data))[0].split('=')[1];
    console.log(info);
    return info;
}

function displayData() {
    const response = document.getElementById('response');

    const fillout = document.createElement('p');
    fillout.textContent = "These are the details in your form:";
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

    const business = document.createElement('p');
    business.innerHTML = `Organization: ${getData("orgname")}`;
    response.appendChild(business);

    const timestamp = document.createElement('p');
    timestamp.textContent = getData("timestamp").replace("%2C", ",").replace(/[+]/g, " ").replace(/%3A/g, ':');
    response.appendChild(timestamp);

    const thankyou = document.createElement('p');
    thankyou.textContent = "Thank you for filling out the form!";
    response.appendChild(thankyou);

    const goHome = document.createElement('a');
    goHome.href = "./index.html";
    goHome.textContent = "Return to Home Page";
    response.appendChild(goHome);
}

displayData();