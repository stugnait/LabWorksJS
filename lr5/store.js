class Catalog {
    #products = new Set();
    #productMap = new Map();
    #productHistory = new WeakMap();
    #removedProducts = new WeakSet();
    orders = [];
    addProduct(product) {
        this.#products.add(product);
        this.#productMap.set(product.id, product);
        this.#productHistory.set(product, 1);
    }
    removeProductById(id) {

        if (this.#productMap.has((Number(id)))) {
            const productToRemove = this.#productMap.get((Number(id)));
            this.#products.delete(productToRemove);
            this.#productMap.delete(((Number(id))));
            this.#productHistory.delete(productToRemove);
            this.#removedProducts.add(productToRemove);

        }
    }

    makeOrder() {
        const totalPrice = [...this.#products].reduce((accumulator, product) => accumulator + product.priceByOne * product.quantity, 0);
        const orderedProducts = [...this.#products];

        this.orders.push({
            price: totalPrice,
            products: orderedProducts,
        });

        this.#products.clear();
        this.#productMap.clear();
    }
    getProducts() {
        return [...this.#products];
    }

    getProductsWithName(name) {
        return [...this.#products].filter(product => product.name === name);
    }

    changeProduct(productToChange) {
        const existingProduct = this.#productMap.get(productToChange.id);
        if (existingProduct) {
            existingProduct.priceByOne = productToChange.priceByOne;
            existingProduct.name = productToChange.name;
            existingProduct.quantity = productToChange.quantity;
            this.#updateHistory(existingProduct);
            console.log(this.#productHistory.get(existingProduct));
        }
    }
    #updateHistory(product) {
        const count = this.#productHistory.get(product) || 0;
        this.#productHistory.set(product, count + 1);
    }

    getHistoryCount(product) {
        return this.#productHistory.get(product) || 0;
    }
}

class Product {
    constructor(priceByOne, name, quantity) {
        this.priceByOne = priceByOne;
        this.name = name;
        this.quantity = quantity;
        this.id = new Date().getTime();
    }

}

const catalog = new Catalog();

const addPage = document.querySelector('.add');
const removePage = document.querySelector('.remove');
const refreshPage = document.querySelector('.refresh');
const followPage = document.querySelector('.follow');
const searchPage = document.querySelector('.search');
const ordersPage = document.querySelector('.orders');

addPage.style.display = 'flex';
removePage.style.display = 'none';
searchPage.style.display = 'none';
refreshPage.style.display = 'none';
followPage.style.display = 'none';
ordersPage.style.display = 'none';

const showAddPage = () => {
    addPage.style.display = 'flex';
    removePage.style.display = 'none';
    refreshPage.style.display = 'none';
    followPage.style.display = 'none';
    searchPage.style.display = 'none';
    ordersPage.style.display = 'none';
};

const showRemovePage = () => {
    addPage.style.display = 'none';
    removePage.style.display = 'flex';
    refreshPage.style.display = 'none';
    followPage.style.display = 'none';
    ordersPage.style.display = 'none';
    searchPage.style.display = 'none';
};

const showRefreshPage = () => {
    addPage.style.display = 'none';
    removePage.style.display = 'none';
    refreshPage.style.display = 'flex';
    followPage.style.display = 'none';
    ordersPage.style.display = 'none';
    searchPage.style.display = 'none';
};

const showFindNamePage = () => {
    addPage.style.display = 'none';
    removePage.style.display = 'none';
    refreshPage.style.display = 'none';
    followPage.style.display = 'none';
    searchPage.style.display = 'flex';
    ordersPage.style.display = 'none';
};

const showOrdersPage = () => {
    addPage.style.display = 'none';
    removePage.style.display = 'none';
    refreshPage.style.display = 'none';
    followPage.style.display = 'none';
    searchPage.style.display = 'none';
    ordersPage.style.display = 'flex';
};

document.getElementById("submitButton").addEventListener("click", function(event) {
    event.preventDefault();

    const productName = document.getElementById("productName").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;
    const newProduct = new Product(price, productName, quantity);

    catalog.addProduct(newProduct);
    console.log(catalog.getProducts());
});

const showFollowPage = () => {
    followPage.innerHTML = '';
    addPage.style.display = 'none';
    removePage.style.display = 'none';
    refreshPage.style.display = 'none';
    ordersPage.style.display = 'none';
    searchPage.style.display = 'none';
    followPage.style.display = 'flex';
    followPage.style.gap = '25px';

    const products = catalog.getProducts();
    for (let product of products) {
        const catalogProduct = document.createElement('div');
        const productName = document.createElement('div');
        const productPrice = document.createElement('div');
        const productQuantity = document.createElement('div');
        const productID = document.createElement('div');

        productName.innerHTML = '<span style="font-size: 16px">Продукт</span> ' + product.name;
        productQuantity.innerHTML = '<span style="font-size: 16px">Кількість</span> ' + product.quantity + ' шт.';
        productPrice.innerHTML = '<span style="font-size: 16px">Ціна</span>' + product.priceByOne + '$';
        productID.innerHTML = '<span style="font-size: 16px">id</span> ' + product.id;
        catalogProduct.className = 'catalog__product';

        productName.className = 'product__info';
        productQuantity.className = 'product__info';
        productPrice.className = 'product__info';
        productID.className = 'product__info';
        catalogProduct.appendChild(productName);
        catalogProduct.appendChild(productPrice);
        catalogProduct.appendChild(productQuantity);
        catalogProduct.appendChild(productID);
        followPage.append(catalogProduct);
    }
};

document.querySelector('.remove__button').addEventListener('click',(e) => {
    e.preventDefault();
    const id = document.querySelector('.remove__input').value;
    catalog.removeProductById(id);
});

const findProductWithSpecificName = () => {
    const name = document.querySelector('.catalog__products-name').value;
    const searchedProducts = document.querySelector('.searched__products');
    searchedProducts.innerHTML = '';
    const products = catalog.getProductsWithName(name);
    for (let product of products) {
        const catalogProduct = document.createElement('div');
        const productName = document.createElement('div');
        const productPrice = document.createElement('div');
        const productQuantity = document.createElement('div');
        const productID = document.createElement('div');

        productName.innerHTML = '<span style="font-size: 16px">Продукт</span> ' + product.name;
        productQuantity.innerHTML = '<span style="font-size: 16px">Кількість</span> ' + product.quantity + ' шт.';
        productPrice.innerHTML = '<span style="font-size: 16px">Ціна</span>' + product.priceByOne + '$';
        productID.innerHTML = '<span style="font-size: 16px">id</span> ' + product.id;
        catalogProduct.className = 'catalog__product';

        productName.className = 'product__info';
        productQuantity.className = 'product__info';
        productPrice.className = 'product__info';
        productID.className = 'product__info';
        catalogProduct.appendChild(productName);
        catalogProduct.appendChild(productPrice);
        catalogProduct.appendChild(productQuantity);
        catalogProduct.appendChild(productID);
        searchedProducts.append(catalogProduct);
    }
};

const changeProduct = () => {
    const refreshId = document.querySelector('#refreshID').value;
    const refreshName = document.querySelector('#refreshName').value;
    const refreshPrice = document.querySelector('#refreshPrice').value;
    const refreshQuantity = document.querySelector('#refreshQuantity').value;

    const productToUpdate = new Product(refreshPrice, refreshName, refreshQuantity);
    productToUpdate.id = Number(refreshId);
    catalog.changeProduct(productToUpdate);
    for(let product of catalog.getProducts()){
        console.log(product.getHistoryCount());
    }
};

document.querySelector('#refresh__button').addEventListener('click',(e) => {
    e.preventDefault();
    changeProduct();
});

const makeOrder = () => {
    catalog.makeOrder();
    const ordersWrapper = document.querySelector('.orders__wrapper');
    const orderElement = document.createElement('div')
    ordersWrapper.innerHTML = '';

    console.log(catalog.orders)

    for(let order of catalog.orders){
        const price = document.createElement('div')
        price.innerText = 'Ціна ' + order.price;
        const productsElement = document.createElement('div');
        for(let product of order.products){
            const el = document.createElement('div')
            el.innerText = 'назва ' + product.name + ' ціна ' + product.priceByOne + ' кількість ' + product.quantity
            productsElement.appendChild(el);
        }
        orderElement.appendChild(price);
        orderElement.appendChild(productsElement);
    }
    ordersWrapper.appendChild(orderElement);
}

