// Siempre el orden es muy importante vamos a empezar creando la variables en el apartado de variables globales
const productsContainer = document.getElementById("products-container");
const shoppingCartContainer = document.getElementById(
  "shopping-cart-container"
);

const images = ["item1.webp", "item2.webp", "item3.jpg"];

function Product(id, name, price, image) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.image = image;
}

let shoppingCart = [];

if (localStorage.getItem("shoppingCart")) {
  shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
}

Product.prototype.addToCart = function () {
  // Vamos a validar si el producto ya está en el carrito, si está vamos a incrementar la cantidad
  const productInCart = shoppingCart.find((product) => product.id === this.id);
  if (productInCart) {
    productInCart.quantity++;
  } else {
    this.quantity = 1;
    shoppingCart.push(this);
  }
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  renderShoppingCart();
};

for (let i = 0; i < images.length; i++) {
  const product = new Product(i, `Product ${i}`, 100, images[i]);
  const div = document.createElement("div");
  div.classList.add("product");
  const img = document.createElement("img");
  img.src = `images/${product.image}`;
  img.alt = product.name;
  img.width = 200;
  img.height = 200;
  const h3 = document.createElement("h3");
  h3.textContent = product.name;
  const p = document.createElement("p");
  p.textContent = `$${product.price}`;
  const button = document.createElement("button");
  button.textContent = "Add to cart";
  button.addEventListener("click", () => {
    product.addToCart();
  });
  div.appendChild(img);
  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(button);

  productsContainer.appendChild(div);
}

function renderShoppingCart() {
  shoppingCartContainer.innerHTML = "";
  console.log("shoppingCart", shoppingCart);
  shoppingCart.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product");
    const img = document.createElement("img");
    img.src = `images/${product.image}`;
    img.alt = product.name;
    img.width = 200;
    img.height = 200;
    const h3 = document.createElement("h3");
    h3.textContent = product.name;
    const p = document.createElement("p");
    p.textContent = `$${product.price}`;
    const p2 = document.createElement("p");
    p2.textContent = `Quantity: ${product.quantity}`;
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(p2);
    shoppingCartContainer.appendChild(div);
  });
}

renderShoppingCart();
