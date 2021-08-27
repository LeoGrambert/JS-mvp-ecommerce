import { getProducts } from '../utils/queries';
import { convertAndDisplayPrice, svgWishlistHtml, createGenericElement } from '../utils/helpers';

const products = async () => {
  const products = await getProducts();
  const productsDom = document.querySelector('#products');

  const createProductsInDom = (products) => products.map((product, index) => hydrateProduct(product, index));

  const hydrateProduct = (product, index) => {
    const container = createGenericElement('div', `w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col product_${index}`);
    const link = createGenericElement('a', null, null, [
      { key: 'href', value: `../pages/product.html?id=${product._id}` },
    ]);
    const img = createGenericElement('img', 'hover:grow hover:shadow-lg', null, [
      { key: 'src', value: product.imageUrl },
    ]);
    const blocNameWishlist = createGenericElement('div', 'pt-3 flex items-center justify-between');
    const name = createGenericElement('p', null, product.name);
    const svgContainer = createGenericElement('span', null, svgWishlistHtml);
    const price = createGenericElement('div', 'pt-1 text-gray-900', convertAndDisplayPrice(product.price));
    blocNameWishlist.append(name, svgContainer);
    link.append(img, blocNameWishlist, price);
    container.append(link);
    productsDom.append(container);
  };

  createProductsInDom(products);
};

export default products;
