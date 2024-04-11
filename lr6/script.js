const modal = document.getElementsByClassName('modal__wrapper')[0];
modal.style.display = 'none'
const productsQuantity = document.getElementsByClassName('products__quantity')[0];
const h2modalWrapper = document.getElementsByClassName('h2-modal__wrapper')[0]
const priceModalWrapper = document.getElementsByClassName('price-modal__wrapper')[0]
const imgModalWrapper = document.getElementsByClassName('img-modal__wrapper')[0]
h2modalWrapper.style.display = 'none'
priceModalWrapper.style.display = 'none'
imgModalWrapper.style.display = 'none'
let  editPriceParameter;
let  editNameParameter;
let  editImageParameter;
class Sneakers {
    sneakers = []
    quantity = 0;
    filteredSneakers = [];

    constructor() {
    }

    addSneaker(sneaker) {
        this.sneakers.push(sneaker);
        this.quantity++;
    }

    removeSneakerByName(sneakerToDeleteName) {
        this.sneakers = this.sneakers.filter((sneaker) => sneakerToDeleteName !== sneaker.name)
        this.quantity--;
    }
    filter(name) {

        this.filteredSneakers = this.sneakers.filter((value, index, array) => value.name.includes(name))
        console.log(this.filteredSneakers);
    }

}

class Product {
    name;
    price;
    img

    constructor(name, price, img) {
        this.name = name;
        this.price = price;
        this.img = img;
    }
}

const sneakers = new Sneakers();


const showCreateModal = () => {
    modal.style.display = 'flex';
}

const addProduct = () => {
    const name = document.getElementsByClassName('name')[0].value;
    const priceInput = document.querySelector('.modal input.price');

    if (!priceInput) {
        console.error('Price input field not found');
        return;
    }

    const price = priceInput.value;

    const image = document.getElementsByClassName('file')[0].files[0];

    let reader = new FileReader();

    reader.onload = function (event) {
        let imageUrl = event.target.result;

        let imgElement = document.createElement('img');
        imgElement.src = imageUrl;

        let newProduct = new Product(name,price, imgElement);

        sneakers.addSneaker(newProduct);
        productsQuantity.innerText = sneakers.sneakers.length;
        showAllProducts(sneakers.sneakers);
        console.log(sneakers)
    };
    modal.style.display = 'none'
    reader.readAsDataURL(image);
}




const showAllProducts = (sneakers) => {
    const wrapper = document.getElementsByClassName('products__wrapper')[0];
    wrapper.innerHTML = '';
    for (let product of sneakers) {

        let productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const img = product.img;

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("h2");
        titleDiv.textContent = product.name;
        const priceDiv = document.createElement('div');
        priceDiv.innerText = product.price;
        priceDiv.className = 'price';
        let deleteDiv = document.createElement("div");
        deleteDiv.classList.add("delete");
        deleteDiv.textContent = "x";
        deleteDiv.alt = product.name;
        let editDiv = document.createElement("div");
        editDiv.classList.add("edit");
        let editImg = document.createElement("img");
        editImg.src = "./assets/edit-icon.png";
        editImg.alt = "";

        editDiv.appendChild(editImg);
        productDiv.appendChild(img);
        productDiv.appendChild(titleDiv);
        productDiv.appendChild(deleteDiv);
        productDiv.appendChild(editDiv);
        productDiv.appendChild(priceDiv);
        productDiv.addEventListener('click', (ev) => {
            if (ev.target.className === 'price') {
                priceModalWrapper.style.display = 'flex'
                 editPriceParameter = ev.target.innerText
            }
            if (ev.target.className === 'h2') {
                h2modalWrapper.style.display = 'flex'
                editNameParameter = ev.target.innerText

            }
            if (ev.target.className === 'img') {
                imgModalWrapper.style.display = 'flex'
                editImageParameter = ev.target.innerText
            }
        })
        deleteDiv.addEventListener('click', (event) => {
            sneakers.removeSneakerByName(deleteDiv.alt);
            productsQuantity.innerText = sneakers.sneakers.length;
            showAllProducts(sneakers);
        })
        wrapper.appendChild(productDiv);
    }
}
showAllProducts(sneakers.sneakers);


const changePrice = () => {

    const newPrice = document.getElementsByClassName('change-price')[0].value;
    sneakers.sneakers.forEach((sneaker) => {
        if (sneaker.price == editPriceParameter) {
            sneaker.price = newPrice;
        }
    })
    priceModalWrapper.style.display = 'none'
    showAllProducts(sneakers.sneakers);
}

const changeName = () => {
    const newName = document.getElementsByClassName('change-name')[0].value;
    sneakers.sneakers.forEach((sneaker) => {
        if (sneaker.name == editNameParameter) {
            sneaker.name = newName;
        }
    })
    h2modalWrapper.style.display = 'none'
    showAllProducts(sneakers.sneakers);
}
const filterByName = (event) => {
    const filterName = document.getElementsByClassName('filterInput')[0].value;
    sneakers.filter(filterName);
    const productsToDisplay = sneakers.filteredSneakers.length > 0 ? sneakers.filteredSneakers : sneakers.sneakers;
    showAllProducts(productsToDisplay);
}
