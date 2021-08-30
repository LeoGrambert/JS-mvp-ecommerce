import { convertAndDisplayPrice, svgTrashHtml, createGenericElement, btnClass } from '../utils/helpers';

export class Cart {
  constructor() {
    const cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : {
          nb_products: 0,
          total_price: 0,
          products: [],
        };
    this.nb_products = cart.nb_products;
    this.total_price = cart.total_price;
    this.products = cart.products;
  }

  addProductToCart(product) {
    const varnish = this.getVarnish();
    const productsAlreadyInCart = this.products.length ? this.returnIfAlreadyInCart(product) : [];
    this.nb_products++;
    this.total_price += product.price;
    if (productsAlreadyInCart.length) {
      productsAlreadyInCart[0].qty++;
      this.products = [
        ...this.products.filter((cartProduct) => cartProduct.id !== product.id),
        ...productsAlreadyInCart,
      ];
    } else {
      this.products = [...this.products, { ...product, varnish, qty: 1 }];
    }
    this.setCart();
    location.replace('/pages/cart.html');
  }

  getVarnish() {
    return document.querySelector('#varnish').value;
  }

  returnIfAlreadyInCart(product) {
    return this.products.filter((cartProduct) => cartProduct.id === product.id);
  }

  setCart() {
    return localStorage.setItem('cart', JSON.stringify(this));
  }

  isEmptyCart() {
    return this.nb_products === 0;
  }

  displayEmptyCart() {
    const container = createGenericElement('div', 'w-full text-center');
    const message = createGenericElement('div', 'mt-2 mb-4', 'You cart is empty');
    const callToAction = createGenericElement('button', btnClass, 'Start shopping');
    container.append(message, callToAction);
    callToAction.addEventListener('click', () => location.replace('/'));
    return container;
  }

  displayCart() {
    const productsElt = createGenericElement('div', 'w-full divide-y divide-light-blue-400');
    this.products.map((product, index) => {
      const container = this.displayProductCart(product);
      container.classList.add(index);
      productsElt.append(container);
    });
    return productsElt;
  }

  displayProductCart(product) {
    const container = createGenericElement('div', `flex w-full mt-2 mb-2 pt-4 pb-2`);
    const image = createGenericElement('img', 'w-1/6 max-h-24 object-cover', null, [
      { key: 'alt', value: product.name },
      { key: 'src', value: product.image },
    ]);
    const information = createGenericElement('div', 'w-4/6 ml-10 -mt-2');
    const name = createGenericElement('a', 'font-bold', product.name, [
      { key: 'href', value: `/pages/product.html?id=${product.id}` },
    ]);
    const varnish = createGenericElement('div', null, `Varnish: ${product.varnish}`);
    const qties = createGenericElement('div', null, `Quantity: ${product.qty}`);
    const price = createGenericElement('div', 'w-1/6 text-right', convertAndDisplayPrice(product.price * product.qty));
    const svgContainer = createGenericElement('span', 'block cursor-pointer mt-2', svgTrashHtml, [
      { key: 'id', value: 'delete-from-cart' },
    ]);
    information.append(name, varnish, qties, svgContainer);
    container.append(image, information, price);
    svgContainer.addEventListener('click', () => this.deleteProductFromCart(product));
    return container;
  }

  deleteProductFromCart(product) {
    const newCart = this;
    newCart.products = this.products.filter((cartProduct) => cartProduct.id !== product.id);
    newCart.nb_products -= product.qty;
    newCart.total_price -= product.price * product.qty;
    localStorage.removeItem('cart');
    if (newCart.products.length) localStorage.setItem('cart', JSON.stringify(newCart));
    location.reload();
  }

  getTotal() {
    const totalElt = createGenericElement('div', 'w-full text-right mt-2 font-bold text-lg');
    const title = createGenericElement('span', null, 'Total:');
    const price = createGenericElement('span', 'ml-2', convertAndDisplayPrice(this.total_price));
    totalElt.append(title, price);
    return totalElt;
  }
}
