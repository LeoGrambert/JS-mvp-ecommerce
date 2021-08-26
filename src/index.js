import products from './components/products';
import product from './components/product';
import cart from './components/cart';
import order from './components/order';

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

// TODO pastille nb de produits au panier
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
// TODO ajouter des produits au back
// TODO héberger le back heroku
// TODO mettre en ligne front
// TODO ajouter au cv et sur portfolio
