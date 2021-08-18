import products from "./components/products.js";
import product from "./components/product.js";

(async function () {
    switch (location.pathname) {
      case "/":
        await products();
        break;
      case "/pages/product.html":
        await product();
        break;
    }
})();

//TODO implement routing
//TODO implement logger
//TODO build product page and display product
//TODO handle add to cart with local storage
//TODO display cart page
//TODO qties
//TODO remove product
//TODO Empty msg if cart empty
//TODO Formulaire de paiement -> vérifications front
//TODO POST request & localstorage order
//TODO display order page
//TODO refacto classes product, cart & order
//TODO check responsive