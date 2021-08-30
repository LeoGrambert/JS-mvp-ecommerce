import { getProducts } from '../utils/queries';
import { getParam } from '../utils/helpers';
import { Product } from '../classes/Product';
import { Cart } from '../classes/Cart';

const product = async () => {
  const id = getParam('id');
  const product = await getProducts(id);
  const myProduct = new Product(product);
  hydrateProduct(myProduct);
};

const hydrateProduct = (myProduct) => {
  const productDom = document.querySelector('#product');
  const container = myProduct.createProductPage();
  productDom.append(container);

  const btn = document.querySelector('#add-to-cart');
  btn.addEventListener('click', () => {
    const myCart = new Cart();
    myCart.addProductToCart(myProduct);
  });
};

export default product;
