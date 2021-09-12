import products from './components/products';
import product from './components/product';
import cart from './components/cart';
import form from './components/form';
import order from './components/order';
import { displayBadgeCart } from './utils/helpers';

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
      await form();
      break;
    case '/pages/order.html':
      await order();
      break;
    default:
      await products();
  }
};

main();
displayBadgeCart();
