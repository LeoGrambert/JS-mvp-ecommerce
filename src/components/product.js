import getProducts from '../utils/queries';
import { convertAndDisplayPrice, svgWishlistHtml, createGenericElement } from '../utils/helpers';

const product = async () => {
  const id = new URL(location.href).searchParams.get('id');
  const product = await getProducts(id);
  hydrateProduct(product);
};

const hydrateProduct = (product) => {
  const productDom = document.querySelector('#product');
  const container = createGenericElement('div', 'flex');
  const leftBlock = createGenericElement('div', 'w-2/4 mt-1');
  const rightBlock = createGenericElement('div', 'w-2/4 ml-8');
  const image = createGenericElement('img', null, null, [
    { key: 'alt', value: product.name },
    { key: 'src', value: product.imageUrl },
  ]);
  const name = createGenericElement('h1', 'mb-4 text-lg font-bold', product.name);
  const price = createGenericElement('div', 'mt-4 mb-4', convertAndDisplayPrice(product.price));
  const description = createGenericElement('div', 'mt-4 mb-4', product.description);
  const btnContainer = createGenericElement('div', 'flex');
  const btn = createGenericElement(
    'button',
    'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l w-9/12',
    'Add to cart'
  );
  const svgContainer = createGenericElement('span', 'w-3/12 block m-auto cursor-pointer', svgWishlistHtml());
  leftBlock.append(image);
  rightBlock.append(name, price, displaySelectForCombinations(product), description, btnContainer);
  btnContainer.append(btn, svgContainer);
  container.append(leftBlock, rightBlock);
  productDom.append(container);

  btn.addEventListener('click', (event) => {
    event.preventDefault();
    const cart = getCart();
    cart.nb_products++;
    cart.total_price += product.price;
    cart.products = [...cart.products, product];
    setCart(cart);
    location.replace('/pages/cart.html');
  });
};

const displaySelectForCombinations = (product) => {
  const select = createGenericElement('select', 'block w-2/4 mt-4 mt-4 cursor-pointer');
  product.varnish.map((combination, key) => {
    const option = createGenericElement('option', `${combination}-${key}`, combination, [
      { key: 'value', value: 'combination' },
    ]);
    select.appendChild(option);
  });
  return select;
};

const getCart = () =>
  localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : {
        nb_products: 0,
        total_price: 0,
        products: [],
      };

const setCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

export default product;
