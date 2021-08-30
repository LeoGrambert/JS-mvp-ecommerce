import { getProducts } from '../utils/queries';
import { Product } from '../classes/Product';

const products = async () => {
  const products = await getProducts();
  const productsDom = document.querySelector('#products');

  const createProductsInDom = (products) => products.map((product, index) => createProductCards(product, index));

  const createProductCards = (product, index) => {
    const myProduct = new Product(product);
    const container = myProduct.createProductCard();
    container.classList.add(`product_${index}`);
    productsDom.append(container);
  };

  createProductsInDom(products);
};

export default products;
