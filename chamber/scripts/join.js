//giving "value" to #timestamp as a date
document.getElementById("timestamp").value = new Date().toUTCString();

document.querySelectorAll("#dialogDivHolder > div").forEach(div => {
    div.addEventListener("click", () => {
        div.nextElementSibling.showModal();
    })
})

document.querySelectorAll("dialog > button").forEach(button => {
    button.addEventListener("click", () => {
        button.parentElement.close();
    })
})

