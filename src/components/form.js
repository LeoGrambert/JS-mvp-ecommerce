import { Cart } from '../classes/Cart';
import { Order } from '../classes/Order';
import { checkInputAddress, checkInputMail, checkInputName, getInputValue, removeInputError } from '../utils/helpers';

const form = async () => {
  const myCart = new Cart();
  if (!myCart.isEmptyCart()) document.querySelector('#form').classList.replace('hidden', 'block');
  const btn = document.querySelector('#pay-order');
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const contact = getContact();
    const formIsValid = checkForm(contact);
    if (!formIsValid) return false;
    const myOrder = new Order({ contact, products: myCart.products.map((product) => product.id) });
    myOrder.postOrder();
  });
};

const getContact = () => {
  const firstName = getInputValue('#grid-first-name');
  const lastName = getInputValue('#grid-last-name');
  const address = getInputValue('#grid-address');
  const city = getInputValue('#grid-city');
  const email = getInputValue('#grid-email');
  return { firstName, lastName, address, city, email };
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
