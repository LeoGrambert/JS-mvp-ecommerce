import notify from './toast';

const convertAndDisplayPrice = (price) => `${numberWithSpaces((price / 100).toFixed(2))} €`;

const numberWithSpaces = (nb) => {
  let parts = nb.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
};

const getParam = (param) => new URL(location.href).searchParams.get(param);

const createGenericElement = (type, classNa = null, text = null, attributes = []) => {
  try {
    const elt = document.createElement(type);
    if (classNa) elt.className = classNa;
    if (text) elt.innerHTML = text;
    if (attributes.length) attributes.map((attribute) => elt.setAttribute(attribute.key, attribute.value));
    return elt;
  } catch (err) {
    notify(err.message, 'danger');
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

const getInputValue = (elt) => {
  const dom = document.querySelector(elt);
  return dom.value;
};

const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const regexName = /[a-zA-Z]/g;

const checkInputRegex = (value, key, regex = null) => {
  if (value === '') {
    displayInputError(key, `${key} field cannot be empty`);
    return false;
  }
  if (value.length < 2) {
    displayInputError(key, `${key} field is too short`);
    return false;
  }
  if (!regex) return true;
  if (!value.match(regex)) {
    displayInputError(key, `wrong ${key} format`);
    return false;
  }
  return true;
};

const displayInputError = (key, err) => {
  document.querySelector(`.${key} input`).classList.replace('border-gray-200', 'border-red-500');
  document.querySelector(`.${key} p`).innerHTML = capitalizeFirstLetter(err);
};

const removeInputError = (key) => {
  document.querySelector(`.${key} input`).classList.replace('border-red-500', 'border-gray-200');
  document.querySelector(`.${key} p`).innerHTML = '';
};

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const svgTrashHtml = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>`;

const svgWishlistHtml =
  '<svg class="h-6 w-6 fill-current m-auto text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" /></svg>';

const btnClass = 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l';

export {
  convertAndDisplayPrice,
  getParam,
  createGenericElement,
  displayBadgeCart,
  getInputValue,
  checkInputRegex,
  removeInputError,
  regexEmail,
  regexName,
  svgWishlistHtml,
  svgTrashHtml,
  btnClass,
};
