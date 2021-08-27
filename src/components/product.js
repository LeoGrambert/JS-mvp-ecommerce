import getProducts from '../utils/queries';
import { convertAndDisplayPrice, svgWishlistHtml, createGenericElement, btnClass } from '../utils/helpers';

const product = async () => {
  const id = new URL(location.href).searchParams.get('id');
  const product = await getProducts(id);
  hydrateProduct(product);
};

const hydrateProduct = (product) => {
  const productDom = document.querySelector('#product');
  const container = createGenericElement('div', 'flex');
  const leftBlock = createGenericElement('div', 'w-3/5 mt-1');
  const rightBlock = createGenericElement('div', 'w-2/5 ml-8');
  const image = createGenericElement('img', null, null, [
    { key: 'alt', value: product.name },
    { key: 'src', value: product.imageUrl },
  ]);
  const name = createGenericElement('h1', 'mb-4 text-lg font-bold', product.name);
  const price = createGenericElement('div', 'mt-4 mb-4', convertAndDisplayPrice(product.price));
  const description = createGenericElement('div', 'mt-4 mb-4', product.description);
  const btnContainer = createGenericElement('div', 'flex');
  const btn = createGenericElement('button', `${btnClass} w-9/12`, 'Add to cart');
  const svgContainer = createGenericElement('span', 'w-3/12 block m-auto cursor-pointer', svgWishlistHtml);
  leftBlock.append(image);
  rightBlock.append(name, price, displaySelectForCombinations(product), description, btnContainer);
  btnContainer.append(btn, svgContainer);
  container.append(leftBlock, rightBlock);
  productDom.append(container);

  btn.addEventListener('click', () => {
    const cart = getCart();
    const varnish = document.querySelector('#varnish').value;
    console.log(cart);
    const productsAlreadyInCart = cart.products.length ? returnIfAlreadyInCart(cart.products, product) : [];
    cart.nb_products++;
    cart.total_price += product.price;
    if (productsAlreadyInCart.length) {
      productsAlreadyInCart[0].qty++;
      cart.products = [
        ...cart.products.filter((cartProduct) => cartProduct._id !== product._id),
        ...productsAlreadyInCart,
      ];
    } else {
      cart.products = [...cart.products, { ...product, varnish, qty: 1 }];
    }
    setCart(cart);
    location.replace('/pages/cart.html');
  });
};

const returnIfAlreadyInCart = (products, product) => products.filter((cartProduct) => cartProduct._id === product._id);

const displaySelectForCombinations = (product) => {
  const select = createGenericElement('select', 'block w-2/4 mt-4 mt-4 cursor-pointer', null, [
    { key: 'id', value: 'varnish' },
  ]);
  product.varnish.map((combination, key) => {
    const option = createGenericElement('option', `${combination}-${key}`, combination, [
      { key: 'value', value: combination },
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
