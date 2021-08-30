import { postOrder } from '../utils/queries';
import { createGenericElement, btnClass } from '../utils/helpers';

export class Order {
  constructor(order) {
    this.contact = order.contact;
    this.products = order.products;
    this.id = order.id || '';
  }

  async postOrder() {
    const objForPost = this.buildBodyForRequest();
    const order = await postOrder(JSON.stringify(objForPost));
    if (order) {
      this.id = order.orderId;
      this.manageLocalStorage(order);
      location.replace('/pages/order.html');
    }
  }

  buildBodyForRequest() {
    return {
      contact: this.contact,
      products: this.products,
    };
  }

  manageLocalStorage() {
    localStorage.removeItem('order');
    localStorage.setItem('order', JSON.stringify(this));
    localStorage.removeItem('cart');
  }

  displayOrder() {
    const container = createGenericElement('div', 'm-auto');
    const title = createGenericElement(
      'h1',
      'mb-4 text-lg font-bold',
      `Thanks ${this.contact.firstName} ${this.contact.lastName} for your order !`
    );
    const deliveryMsg = createGenericElement(
      'div',
      'mb-2',
      `We will prepare it carefully and send it to you in the best delay at <strong>${this.contact.address}, ${this.contact.city}</strong>.`
    );
    const confirmationMail = createGenericElement(
      'div',
      'mb-2',
      `You have received a confirmation mail at <strong>${this.contact.email}</strong>. If not, please check yours spams.`
    );
    const customerService = createGenericElement(
      'div',
      'mb-2',
      `If you have any question, please feel free to contact us at hello@orinoco.com with your order reference: <strong>${this.id}</strong>`
    );
    const callToAction = createGenericElement('button', `${btnClass} mt-4`, 'Go back to shopping');
    container.append(title, deliveryMsg, confirmationMail, customerService, callToAction);
    callToAction.addEventListener('click', () => location.replace('/'));
    return container;
  }
}
