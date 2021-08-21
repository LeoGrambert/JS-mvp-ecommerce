import notify from './toast';

const getProducts = async (id = null) => {
  try {
    const response = await fetch(`http://localhost:3000/api/furniture${id ? `/${id}` : ''}`);
    return response.json();
  } catch (err) {
    notify(err.message, 'danger');
  }
};

export default getProducts;
