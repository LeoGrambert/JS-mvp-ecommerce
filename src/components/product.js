import getProducts from '../utils/queries';
import { convertAndDisplayPrice, svgWishlistHtml } from '../utils/helpers';

const product = async () => {
  const id = new URL(location.href).searchParams.get('id');
  const product = await getProducts(id);
  hydrateProduct(product);
  console.log(product);
};

const hydrateProduct = (product) => {
  const productDom = document.querySelector('#product');
  const container = document.createElement('div');
  const leftBlock = document.createElement('div');
  const rightBlock = document.createElement('div');
  const image = document.createElement('img');
  const name = document.createElement('h1');
  const price = document.createElement('div');
  const description = document.createElement('div');
  const btnContainer = document.createElement('div');
  const btn = document.createElement('button');
  const svg = document.createElement('span');
  image.src = product.imageUrl;
  image.alt = product.name;
  name.innerText = product.name;
  description.innerText = product.description;
  price.innerText = convertAndDisplayPrice(product.price);
  btn.innerText = 'Add to cart';
  svg.innerHTML = svgWishlistHtml();
  container.className = 'flex';
  leftBlock.className = 'w-2/4 mt-1';
  rightBlock.className = 'w-2/4 ml-8';
  name.className = 'mb-4 text-lg font-bold';
  price.className = 'mt-4 mb-4';
  description.className = 'mt-4 mb-4';
  btnContainer.className = 'flex';
  btn.className = 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l w-9/12';
  svg.className = 'w-3/12 block m-auto cursor-pointer';
  leftBlock.appendChild(image);
  rightBlock.appendChild(name);
  rightBlock.appendChild(price);
  rightBlock.appendChild(displaySelectForCombinations(product));
  rightBlock.appendChild(description);
  rightBlock.appendChild(btnContainer);
  btnContainer.appendChild(btn);
  btnContainer.appendChild(svg);
  container.appendChild(leftBlock);
  container.appendChild(rightBlock);
  productDom.appendChild(container);
};

const displaySelectForCombinations = (product) => {
  const select = document.createElement('select');
  select.className = 'block w-2/4 mt-4 mt-4 cursor-pointer';
  product.varnish.map((combination, key) => {
    const option = document.createElement('option');
    option.value = combination;
    option.innerText = combination;
    option.className = `${combination}-${key}`;
    select.appendChild(option);
  });
  return select;
};

export default product;
