import products from './components/products';
import product from './components/product';
import cart from './components/cart';
import order from './components/order'

const main = async () => {
  switch (window.location.pathname) {
    case '/':
      await products();
      break;
    case '/pages/product.html':
      await product();
      break;
    case '/pages/cart.html':
      await cart();
      break;
    case '/pages/order.html':
      await order();
      break;
    default:
      await products();
  }
};

main();

// TODO linter, prettier, husky
// TODO build product page and display product
// TODO handle add to cart with local storage
// TODO display cart page
// TODO qties
// TODO remove product
// TODO Empty msg if cart empty
// TODO Formulaire de paiement -> vérifications front
// TODO stripe
// TODO POST request & localstorage order
// TODO display order page
// TODO refacto classes product, cart & order
// TODO check responsive
