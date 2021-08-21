import getProducts from '../utils/queries';
import { convertAndDisplayPrice, svgWishlistHtml } from '../utils/helpers';

const products = async () => {
  const products = await getProducts();
  const productsDom = document.querySelector('#products');

  const createProductsInDom = (products) => products.map((product, index) => hydrateProduct(product, index));

  const hydrateProduct = (product, index) => {
    const container = document.createElement('div');
    const link = document.createElement('a');
    const img = document.createElement('img');
    const blocNameWishlisth = document.createElement('div');
    const name = document.createElement('p');
    const svg = document.createElement('span');
    const price = document.createElement('div');
    container.className = `w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col product_${index}`;
    link.href = `../pages/product.html?id=${product._id}`;
    img.className = 'hover:grow hover:shadow-lg';
    img.src = product.imageUrl;
    blocNameWishlisth.className = 'pt-3 flex items-center justify-between';
    name.innerText = product.name;
    svg.innerHTML = svgWishlistHtml();
    price.className = 'pt-1 text-gray-900';
    price.innerText = convertAndDisplayPrice(product.price);
    blocNameWishlisth.appendChild(name);
    blocNameWishlisth.appendChild(svg);
    link.appendChild(img);
    link.appendChild(blocNameWishlisth);
    link.appendChild(price);
    container.appendChild(link);
    productsDom.appendChild(container);
  };

  createProductsInDom(products);
};

export default products;
