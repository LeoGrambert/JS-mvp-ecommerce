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

const displayBadgeCart = () => {
  if (!localStorage.getItem('cart')) return false;
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart.nb_products === 0) return false;
  const badgeElt = document.querySelector('#cart-qty');
  badgeElt.classList.replace('bg-transparent', 'bg-gray-600');
  badgeElt.querySelector('span').innerText = cart.nb_products;
};

main();
displayBadgeCart();

// TODO display cart page
// TODO handle qties
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
