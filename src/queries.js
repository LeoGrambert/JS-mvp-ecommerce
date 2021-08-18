const getProducts = async (id = null) => {
    try {
        const response = await fetch(`http://localhost:3000/api/furniture${id ? `/${id}` : ''}`);
        return response.json();
    } catch (err) {
        throw err;
    }
}

export default getProducts;