import { createGenericElement, btnClass } from '../utils/helpers';

const order = async () => {
  const order = getOrder();
  const orderElt = document.querySelector('#order');
  hydrateOrder(order, orderElt);
};

const getOrder = () => JSON.parse(localStorage.getItem('order'));

const hydrateOrder = (order, orderElt) => {
  const container = createGenericElement('div', 'm-auto');
  const title = createGenericElement(
    'h1',
    'mb-4 text-lg font-bold',
    `Thanks ${order.contact.firstName} ${order.contact.lastName} for your order !`
  );
  const deliveryMsg = createGenericElement(
    'div',
    'mb-2',
    `We will prepare it carefully and send it to you in the best delay at <strong>${order.contact.address}, ${order.contact.city}</strong>.`
  );
  const confirmationMail = createGenericElement(
    'div',
    'mb-2',
    `You have received a confirmation mail at <strong>${order.contact.email}</strong>. If not, please check yours spams.`
  );
  const customerService = createGenericElement(
    'div',
    'mb-2',
    `If you have any question, please feel free to contact us at hello@orinoco.com with your order reference: <strong>${order.orderId}</strong>`
  );
  const callToAction = createGenericElement('button', `${btnClass} mt-4`, 'Go back to shopping');
  container.append(title, deliveryMsg, confirmationMail, customerService, callToAction);
  orderElt.append(container);

  callToAction.addEventListener('click', () => location.replace('/'));
};

export default order;
