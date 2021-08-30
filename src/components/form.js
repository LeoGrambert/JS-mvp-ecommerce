import { checkInputAddress, checkInputMail, checkInputName, getInputValue, removeInputError } from '../utils/helpers';
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
    const formIsValid = checkForm(contact);
    if (!formIsValid) return false;
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

const checkForm = (contact) => {
  const isValid = {};
  Object.entries(contact).map((input) => {
    const key = input[0];
    const value = input[1];
    removeInputError(key);
    if (key === 'firstName') isValid[key] = checkInputName(key, value);
    if (key === 'lastName') isValid[key] = checkInputName(key, value);
    if (key === 'email') isValid[key] = checkInputMail(key, value);
    if (key === 'address') isValid[key] = checkInputAddress(key, value);
    if (key === 'city') isValid[key] = checkInputAddress(key, value);
  });
  const wrongInput = Object.entries(isValid).filter(([key, value]) => !value);
  return !wrongInput.length;
};

export default form;
