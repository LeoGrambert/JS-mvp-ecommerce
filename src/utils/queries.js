import notify from './toast';

const getProducts = async (id = null) => {
  try {
    const response = await fetch(`http://localhost:3000/api/furniture${id ? `/${id}` : ''}`);
    if (!response.ok) return displayError(response.statusText, response.status);
    return response.json();
  } catch (err) {
    displayError(err.message);
  }
};

const postOrder = async (body) => {
  try {
    const response = await fetch(`http://localhost:3000/api/furniture/order`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });
    if (!response.ok) return displayError(response.statusText, response.status);
    return response.json();
  } catch (err) {
    displayError(err.message);
  }
};

const displayError = (message, code = null) => notify(`${code && code} ${message}`, 'danger');

export { getProducts, postOrder };
