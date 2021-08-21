import products from "./components/products.js";
import product from "./components/product.js";
import cart from "./components/cart.js";
import order from "./components/order.js";

(async function () {
  switch (location.pathname) {
    case "/":
      await products();
      break;
    case "/pages/product.html":
      await product();
      break;
    case "/pages/cart.html":
      await cart();
      break;
    case "/pages/order.html":
      await order();
      break;
    default:
      await products();
  }
})();

//TODO linter, prettier, husky
//TODO build product page and display product
//TODO handle add to cart with local storage
//TODO display cart page
//TODO qties
//TODO remove product
//TODO Empty msg if cart empty
//TODO Formulaire de paiement -> vérifications front
//TODO stripe
//TODO POST request & localstorage order
//TODO display order page
//TODO refacto classes product, cart & order
//TODO check responsive