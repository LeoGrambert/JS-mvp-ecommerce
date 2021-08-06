const getProducts = async (id = null) => {
    try {
        const response = await fetch(`http://localhost:3000/api/furniture${id ? `/${id}` : ''}`);
        console.info({
          request: `GET /api/furniture${id ? `/${id}` : ""}`,
          status: response.status,
          message: response.statusText,
        });
        return response.json();
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export default getProducts;