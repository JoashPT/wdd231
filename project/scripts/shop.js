const shop_source = "./data/shop.json";

const getShopData = async () => {
    const response = await fetch(shop_source);
    const data = await response.json();
    return data;
}

function getData() {
    getShopData().then(data => {
        const storeArray = [
            data.prebuilt,
            data.paddle,
            data.rubber,
            data.ball,
            data.miscalleneous
        ]

        let shopCategory = document.querySelectorAll("#shopCategory > li");
        shopCategory.forEach((category, list) => {
            category.addEventListener("click", () => createShopCard(storeArray[list]));
        })

        document.querySelector("#shopCategory > li").click();
    });
}


getData();


function createShopCard(shopArray) {
    let shopCardHolder = document.getElementById("shopItemList")
    shopCardHolder.innerHTML = "";

    shopArray.forEach(item => {

        let shopCard = document.createElement("div");
        
        let item_image = document.createElement("img");
        item_image.src = item.image;
        item_image.alt = item.name;
        item_image.loading = "lazy";
        shopCard.appendChild(item_image);

        let item_name = document.createElement("p");
        item_name.textContent = item.name;
        shopCard.appendChild(item_name);

        let item_price = document.createElement("p");
        item_price.innerHTML = `$${item.price}`;
        shopCard.appendChild(item_price);

        shopCard.addEventListener("click", () => {
            viewShopDialog(item)
        });

        shopCardHolder.appendChild(shopCard);
    })
}

function viewDialog(item, container) {

    let item_image = document.createElement("img");
    item_image.src = item.modalImage;
    item_image.alt = item.name;
    item_image.loading = "lazy";
    container.appendChild(item_image);

    let item_name = document.createElement("p");
    item_name.textContent = item.name;
    item_name.classList.add("bolder");
    container.appendChild(item_name);

    let item_price = document.createElement("p");
    item_price.innerHTML = `Price: $${item.price}`;
    container.appendChild(item_price);

    let item_desc = document.createElement("p");
    item_desc.textContent = item.description;
    container.appendChild(item_desc);

    let item_seller = document.createElement("p");
    item_seller.innerHTML = `Seller: ${item.seller}`;
    container.appendChild(item_seller);

    let item_location = document.createElement("p");
    item_location.innerHTML = `Location: ${item.location}`;
    container.appendChild(item_location);

    let item_source = document.createElement("a");
    item_source.href = item.source;
    item_source.textContent = "See Seller";
    item_source.classList.add("link");
    container.appendChild(item_source);

    let dialog_exit = document.createElement("p")
    dialog_exit.textContent = "X";
    dialog_exit.classList.add("modalExit");
    dialog_exit.addEventListener("click", () => {
        container.close();
    })
    container.appendChild(dialog_exit);
}

function viewShopDialog(item) {

    let shopItemDialog = document.getElementById("shopItemDialog");
    shopItemDialog.innerHTML = "";

    viewDialog(item, shopItemDialog);

    let item_add = document.createElement("p");
    item_add.textContent = "Add to Cart";
    item_add.classList.add("link");
    item_add.addEventListener("click", () => {
        createCartCard(item);
        getTotalPrice(item, 1);
        shopItemDialog.close();
    });
    shopItemDialog.appendChild(item_add);
    
    shopItemDialog.showModal();
}

function createCartCard(item) {
    let cartBody = document.getElementById("cartBody");
    
    let tr = document.createElement("tr");

    let td_name = document.createElement("td");
    td_name.textContent = item.name;
    td_name.addEventListener("click", () => {
        viewCartItem(item)
    })
    tr.appendChild(td_name);

    let td_price = document.createElement("td");
    td_price.innerHTML = `$${item.price}`;
    tr.appendChild(td_price);

    let td_remove = document.createElement("td");
    td_remove.textContent = "Remove Item";
    td_remove.addEventListener("click", () => {
        getTotalPrice(item, 0);
        cartBody.removeChild(tr);
    })
    tr.appendChild(td_remove);

    cartBody.appendChild(tr);
}

function viewCartItem(item) {
    let cartItemDialog = document.getElementById("cartItemDialog");
    cartItemDialog.innerHTML = "";

    viewDialog(item, cartItemDialog);
    
    cartItemDialog.showModal();
}

let total_price = 0;
let totalPrice = document.getElementById("totalPrice");
function getTotalPrice(item, operation) {
    
    if (operation == 1) {
        total_price += item.price;
    } else {
        total_price -= item.price;
    }

    totalPrice.innerHTML = `$${total_price.toFixed(2)}`;
}