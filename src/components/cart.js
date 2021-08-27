import { btnClass, convertAndDisplayPrice, createGenericElement, svgTrashHtml } from '../utils/helpers';

const cart = async () => {
  const cartElt = document.querySelector('#cart');
  if (isProducts) {
    displayCart(cartElt);
  } else {
    displayEmptyCart(cartElt);
  }
};

const getCart = () => JSON.parse(localStorage.getItem('cart'));

const isProducts = localStorage.getItem('cart') && getCart().nb_products > 0;

const displayEmptyCart = (cartElt) => {
  const container = createGenericElement('div', 'w-full text-center');
  const message = createGenericElement('div', 'mt-2 mb-4', 'You cart is empty');
  const callToAction = createGenericElement('button', btnClass, 'Start shopping');
  container.append(message, callToAction);
  cartElt.append(container);

  callToAction.addEventListener('click', () => {
    location.replace('/');
  });
};

const displayCart = (cartElt) => {
  const cart = getCart();
  hydrateProductsCart(cartElt, cart);
  displayTotal(cartElt, cart);
};

const hydrateProductsCart = (cartElt, cart) => {
  const productsElt = createGenericElement('div', 'w-full divide-y divide-light-blue-400');
  cart.products.map((product, key) => {
    const container = createGenericElement('div', `flex ${key} w-full mt-2 mb-2 pt-4 pb-2`);
    const image = createGenericElement('img', 'w-1/6 max-h-24 object-cover', null, [
      { key: 'alt', value: product.name },
      { key: 'src', value: product.imageUrl },
    ]);
    const information = createGenericElement('div', 'w-4/6 ml-10 -mt-2');
    const name = createGenericElement('a', 'font-bold', product.name, [
      { key: 'href', value: `/pages/product.html?id=${product._id}` },
    ]);
    const varnish = createGenericElement('div', null, `Varnish: ${product.varnish}`);
    const qties = createGenericElement('div', null, `Quantity: ${product.qty}`);
    const price = createGenericElement('div', 'w-1/6 text-right', convertAndDisplayPrice(product.price * product.qty));
    const svgContainer = createGenericElement('span', 'block cursor-pointer mt-2', svgTrashHtml, [
      { key: 'id', value: 'delete-from-cart' },
    ]);
    information.append(name, varnish, qties, svgContainer);
    container.append(image, information, price);
    productsElt.append(container);

    svgContainer.addEventListener('click', () => {
      deleteProductFromCart(cart, product);
    });
  });
  cartElt.append(productsElt);
};

const displayTotal = (cartElt, cart) => {
  const totalElt = createGenericElement('div', 'w-full text-right mt-2 font-bold text-lg');
  const title = createGenericElement('span', null, 'Total:');
  const price = createGenericElement('span', 'ml-2', convertAndDisplayPrice(cart.total_price));
  totalElt.append(title, price);
  cartElt.append(totalElt);
};

const deleteProductFromCart = (cart, product) => {
  const newCart = cart;
  newCart.products = cart.products.filter((cartProduct) => cartProduct._id !== product._id);
  newCart.nb_products -= product.qty;
  newCart.total_price -= product.price * product.qty;
  localStorage.removeItem('cart');
  if (newCart.products.length) localStorage.setItem('cart', JSON.stringify(newCart));
  location.reload();
};

export default cart;
