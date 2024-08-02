
# Simple Shopping Cart

Este proyecto es una implementación simple de un carrito de compras utilizando HTML, CSS y JavaScript. A continuación, se explica cada parte del código y su función.

## Índice

- [Simple Shopping Cart](#simple-shopping-cart)
  - [Índice](#índice)
  - [Variables Globales](#variables-globales)
  - [Clase Product](#clase-product)
  - [Carrito de Compras](#carrito-de-compras)
  - [Añadir Productos al Carrito](#añadir-productos-al-carrito)
  - [Renderizar Productos](#renderizar-productos)
  - [Renderizar Carrito de Compras](#renderizar-carrito-de-compras)
  - [Inicializar la Página](#inicializar-la-página)

## Variables Globales

```javascript
const productsContainer = document.getElementById("products-container");
const shoppingCartContainer = document.getElementById("shopping-cart-container");

const images = ["item1.webp", "item2.webp", "item3.jpg"];
```

- `productsContainer`: Elemento del DOM donde se mostrarán los productos disponibles.
- `shoppingCartContainer`: Elemento del DOM donde se mostrará el carrito de compras.
- `images`: Array de imágenes de los productos.

## Clase Product

```javascript
function Product(id, name, price, image) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.image = image;
}
```

- La clase `Product` representa un producto con `id`, `name`, `price` e `image`.

## Carrito de Compras

```javascript
let shoppingCart = [];

if (localStorage.getItem("shoppingCart")) {
  shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
}
```

- `shoppingCart`: Array que contiene los productos añadidos al carrito.
- Se carga el carrito de compras desde `localStorage` si existe.

## Añadir Productos al Carrito

```javascript
Product.prototype.addToCart = function () {
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
```

- Método `addToCart`: Añade un producto al carrito. Si el producto ya está en el carrito, incrementa la cantidad. Guarda el carrito en `localStorage` y actualiza la vista.

## Renderizar Productos

```javascript
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
  p.textContent = `$/ ${product.price}`;
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
```

- Itera sobre el array de `images` y crea una instancia de `Product` para cada imagen.
- Crea elementos del DOM (`div`, `img`, `h3`, `p`, `button`) para mostrar cada producto.
- Añade un evento `click` al botón "Add to cart" para añadir el producto al carrito.

## Renderizar Carrito de Compras

```javascript
function renderShoppingCart() {
  shoppingCartContainer.innerHTML = "";
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
    p.textContent = `$/ ${product.price}`;
    const p2 = document.createElement("p");
    p2.textContent = `Quantity: ${product.quantity}`;
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(p2);
    shoppingCartContainer.appendChild(div);
  });
}
```

- `renderShoppingCart`: Limpia el contenedor del carrito y agrega los productos del carrito uno por uno.
- Crea elementos del DOM (`div`, `img`, `h3`, `p`, `p2`) para mostrar cada producto en el carrito junto con su cantidad.

## Inicializar la Página

```javascript
renderShoppingCart();
```

- Llama a `renderShoppingCart` al cargar la página para mostrar el carrito de compras actual.
