// =============================
// LIVESTOCK PRODUCTS
// =============================

let products = [

    {
        id: 1,
        name: "Healthy Dairy Cow",
        category: "Cattle",
        price: 120000,
        image: "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e"
    },

    {
        id: 2,
        name: "Boran Bull",
        category: "Cattle",
        price: 150000,
        image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0"
    },

    {
        id: 3,
        name: "Boer Goat",
        category: "Goats",
        price: 25000,
        image: "https://images.unsplash.com/photo-1524024973431-2ad916746881"
    },

    {
        id: 4,
        name: "Local Goat",
        category: "Goats",
        price: 12000,
        image: "https://images.unsplash.com/photo-1533318087102-b3ad366ed041"
    },

    {
        id: 5,
        name: "Dorper Sheep",
        category: "Sheep",
        price: 18000,
        image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73"
    },

    {
        id: 6,
        name: "Broiler Chicken",
        category: "Poultry",
        price: 800,
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7"
    },

    {
        id: 7,
        name: "Pig",
        category: "Pigs",
        price: 30000,
        image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a"
    },

    {
        id: 8,
        name: "Merino Sheep",
        category: "Sheep",
        price: 22000,
        image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73"
    }

];


// =============================
// CART
// =============================

let cart = JSON.parse(
    localStorage.getItem("livestockCart")
) || [];


// =============================
// DISPLAY PRODUCTS
// =============================

function displayProducts(list = products) {

    const productGrid =
        document.getElementById("productGrid");

    productGrid.innerHTML = "";

    list.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img
                src="${product.image}"
                class="product-image"
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    KSh ${product.price.toLocaleString()}
                </p>

                <div class="product-buttons">

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                    <button
                        class="favorite"
                        onclick="favoriteProduct(${product.id})"
                    >
                        ❤️
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);

    });

}


// =============================
// ADD TO CART
// =============================

function addToCart(productId) {

    const product = products.find(
        p => p.id === productId
    );

    const existing = cart.find(
        item => item.id === productId
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();

    alert(product.name + " added to cart!");

}


// =============================
// SAVE CART
// =============================

function saveCart() {

    localStorage.setItem(
        "livestockCart",
        JSON.stringify(cart)
    );

}


// =============================
// CART COUNT
// =============================

function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cartCount")
        .textContent = count;

}


// =============================
// OPEN CART
// =============================

function openCart() {

    document.getElementById("cartModal")
        .style.display = "block";

    displayCart();

}


// =============================
// CLOSE CART
// =============================

function closeCart() {

    document.getElementById("cartModal")
        .style.display = "none";

}


// =============================
// DISPLAY CART
// =============================

function displayCart() {

    const container =
        document.getElementById("cartItems");

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML =
            "<p>Your cart is empty.</p>";

        document.getElementById("cartTotal")
            .textContent = "0";

        return;

    }


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    KSh ${item.price.toLocaleString()}
                </p>

            </div>


            <div class="quantity">

                <button
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>

            </div>

        `;

        container.appendChild(cartItem);

    });


    calculateTotal();

}


// =============================
// CHANGE QUANTITY
// =============================

function changeQuantity(id, amount) {

    const item = cart.find(
        product => product.id === id
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== id
        );

    }

    saveCart();

    updateCartCount();

    displayCart();

}


// =============================
// CALCULATE TOTAL
// =============================

function calculateTotal() {

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    document.getElementById("cartTotal")
        .textContent = total.toLocaleString();

}


// =============================
// SEARCH
// =============================

function searchProducts() {

    const search =
        document.getElementById("searchInput")
            .value
            .toLowerCase();

    const results = products.filter(product =>

        product.name
            .toLowerCase()
            .includes(search)

        ||

        product.category
            .toLowerCase()
            .includes(search)

    );

    displayProducts(results);

}


// =============================
// CATEGORY FILTER
// =============================

function filterCategory(category) {

    if (category === "All") {

        displayProducts(products);

        return;
    }

    const results =
        products.filter(
            product =>
                product.category === category
        );

    displayProducts(results);

}


// =============================
// SORT PRODUCTS
// =============================

function sortProducts() {

    const option =
        document.getElementById("sortProducts")
            .value;

    let sorted = [...products];

    if (option === "low") {

        sorted.sort(
            (a, b) => a.price - b.price
        );

    }

    if (option === "high") {

        sorted.sort(
            (a, b) => b.price - a.price
        );

    }

    displayProducts(sorted);

}


// =============================
// FAVORITES
// =============================

function favoriteProduct(id) {

    const product =
        products.find(p => p.id === id);

    alert(
        product.name +
        " added to your favorites ❤️"
    );

}


// =============================
// CHECKOUT
// =============================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    closeCart();

    document.getElementById("checkoutModal")
        .style.display = "block";

}


// =============================
// CLOSE CHECKOUT
// =============================

function closeCheckout() {

    document.getElementById("checkoutModal")
        .style.display = "none";

}


// =============================
// PLACE ORDER
// =============================

document.getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("customerName")
                .value;

        const phone =
            document.getElementById("customerPhone")
                .value;

        const location =
            document.getElementById("customerLocation")
                .value;


        alert(
            "Thank you " +
            name +
            "!\n\n" +
            "Your order has been received.\n" +
            "Phone: " + phone +
            "\nDelivery: " + location
        );


        cart = [];

        saveCart();

        updateCartCount();

        closeCheckout();

        this.reset();

    });


// =============================
// SHOP NOW
// =============================

function scrollToProducts() {

    document.getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =============================
// START WEBSITE
// =============================

displayProducts();

updateCartCount();