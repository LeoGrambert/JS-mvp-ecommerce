import { Cart } from '../classes/Cart';

const cart = async () => {
  const cartElt = document.querySelector('#cart');
  const myCart = new Cart();
  if (myCart.isEmptyCart()) {
    displayEmptyCart(myCart, cartElt);
  } else {
    displayCart(myCart, cartElt);
  }
};

const displayEmptyCart = (myCart, cartElt) => {
  const container = myCart.displayEmptyCart();
  cartElt.append(container);
};

const displayCart = (myCart, cartElt) => {
  createProductsCart(cartElt, myCart);
  displayTotal(cartElt, myCart);
};

const createProductsCart = (cartElt, myCart) => {
  const productsElt = myCart.displayCart();
  cartElt.append(productsElt);
};

const displayTotal = (cartElt, myCart) => {
  const totalElt = myCart.getTotal();
  cartElt.append(totalElt);
};

export default cart;
