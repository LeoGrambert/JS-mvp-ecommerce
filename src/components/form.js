import { getInputValue } from '../utils/helpers';
import { postOrder } from '../utils/queries';

const form = async () => {
  const cart = getCart();
  if (cart && cart.products.length) {
    document.querySelector('#form').classList.replace('hidden', 'block');
  }
  const btn = document.querySelector('#pay-order');
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const contact = getContact();
    const objForPost = {
      contact,
      products: cart.products.map((product) => product._id),
    };
    const order = await postOrder(JSON.stringify(objForPost));
    if (order) {
      manageLocalStorage(order);
      location.replace('/pages/order.html');
    }
  });
};

const getCart = () => JSON.parse(localStorage.getItem('cart'));

const getContact = () => {
  const firstName = getInputValue('#grid-first-name');
  const lastName = getInputValue('#grid-last-name');
  const address = getInputValue('#grid-address');
  const city = getInputValue('#grid-city');
  const email = getInputValue('#grid-email');
  return { firstName, lastName, address, city, email };
};

const manageLocalStorage = (order) => {
  localStorage.removeItem('order');
  localStorage.setItem('order', JSON.stringify(order));
  localStorage.removeItem('cart');
};

export default form;
