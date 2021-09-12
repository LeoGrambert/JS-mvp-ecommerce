import notify from './toast';

const host = 'https://aeki-api.herokuapp.com/';

const getProducts = async (id = null) => {
  try {
    const response = await fetch(`${host}api/furniture${id ? `/${id}` : ''}`);
    if (!response.ok) return displayError(response.statusText, response.status);
    return response.json();
  } catch (err) {
    displayError(err.message);
  }
};

const postOrder = async (body) => {
  try {
    const response = await fetch(`${host}api/furniture/order`, {
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
