import { Order } from '../classes/Order';

const order = async () => {
  const myOrder = new Order(JSON.parse(localStorage.getItem('order')));
  const orderElt = document.querySelector('#order');
  createOrderPage(myOrder, orderElt);
};

const createOrderPage = (myOrder, orderElt) => {
  const container = myOrder.displayOrder();
  orderElt.append(container);
};

export default order;
