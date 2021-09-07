import { convertAndDisplayPrice, svgWishlistHtml, createGenericElement, btnClass } from '../utils/helpers';

export class Product {
  constructor(product) {
    this.id = product._id;
    this.name = product.name;
    this.description = product.description;
    this.image = product.imageUrl;
    this.price = product.price;
    this.varnish = product.varnish;
  }

  createProductCard() {
    const container = createGenericElement('div', `w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col`);
    const link = createGenericElement('a', null, null, [{ key: 'href', value: `../pages/product.html?id=${this.id}` }]);
    const img = createGenericElement('img', 'hover:grow hover:shadow-lg', null, [{ key: 'src', value: this.image }]);
    const blocNameWishlist = createGenericElement('div', 'pt-3 flex items-center justify-between');
    const name = createGenericElement('p', null, this.name);
    const svgContainer = createGenericElement('span', null, svgWishlistHtml);
    const price = createGenericElement('div', 'pt-1 text-gray-900', convertAndDisplayPrice(this.price));
    blocNameWishlist.append(name, svgContainer);
    link.append(img, blocNameWishlist, price);
    container.append(link);
    return container;
  }

  createProductPage() {
    const container = createGenericElement('div', 'flex flex-col md:flex-row');
    const leftBlock = createGenericElement('div', 'w-full pr-3 pl-3 mt-1 md:w-3/5');
    const rightBlock = createGenericElement('div', 'w-full pr-3 pl-3 md:w-2/5 md:ml-8');
    const image = createGenericElement('img', null, null, [
      { key: 'alt', value: this.name },
      { key: 'src', value: this.image },
    ]);
    const name = createGenericElement('h1', 'mb-4 mt-4 text-lg font-bold md:mt-0', this.name);
    const price = createGenericElement('div', 'mt-4 mb-4', convertAndDisplayPrice(this.price));
    const description = createGenericElement('div', 'mt-4 mb-4', this.description);
    const btnContainer = createGenericElement('div', 'flex');
    const btn = createGenericElement('button', `${btnClass} w-9/12`, 'Add to cart', [
      { key: 'id', value: 'add-to-cart' },
    ]);
    const svgContainer = createGenericElement('span', 'w-3/12 block m-auto cursor-pointer', svgWishlistHtml);
    leftBlock.append(image);
    rightBlock.append(name, price, this.displaySelectForCombinations(), description, btnContainer);
    btnContainer.append(btn, svgContainer);
    container.append(leftBlock, rightBlock);
    return container;
  }

  displaySelectForCombinations() {
    const select = createGenericElement('select', 'block w-2/4 mt-4 mt-4 cursor-pointer', null, [
      { key: 'id', value: 'varnish' },
    ]);
    this.varnish.map((combination, key) => {
      const option = createGenericElement('option', `${combination}-${key}`, combination, [
        { key: 'value', value: combination },
      ]);
      select.appendChild(option);
    });
    return select;
  }
}
