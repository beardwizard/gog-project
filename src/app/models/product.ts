/**
 * @interface IProductJSON
 */
interface IProductJSON {
  id: number;
  name: string;
  imgSrc: string;
  originalPrice: number;
  currentPrice: number;
  discount: number;
}

/**
 * @namespace app.models
 * @class Product
 */
export class Product {

  /**
   * @constructor
   * @param {number} id
   * @param {string} name
   * @param {string} imgSrc
   * @param {number} originalPrice
   * @param {number} currentPrice
   * @param {number} discount
   */
  constructor(
    private id: number,
    private name: string,
    private imgSrc: string,
    private originalPrice: number,
    private currentPrice?: number,
    private discount: number = 0
  ) {
    if (!this.currentPrice) {
      this.currentPrice = this.originalPrice;
    }
  }

  /**
   * returns id
   *
   * @method getId
   * @return {number}
   * @public
   */
  public getId(): number {
    return this.id;
  }

  /**
   * returns name
   *
   * @method getName
   * @return {string}
   * @public
   */
  public getName(): string {
    return this.name;
  }

  /**
   * returns image source
   *
   * @method getImgSrc
   * @return {string}
   * @public
   */
  public getImgSrc(): string {
    return this.imgSrc;
  }

  /**
   * returns original price
   *
   * @method getOriginalPrice
   * @return {number}
   * @public
   */
  public getOriginalPrice(): number {
    return this.originalPrice;
  }

  /**
   * returns current price
   *
   * @method getCurrentPrice
   * @return {number}
   * @public
   */
  public getCurrentPrice(): number {
    return this.currentPrice;
  }

  /**
   * returns discount
   *
   * @method getDiscount
   * @return {number}
   * @public
   */
  public getDiscount(): number {
    return this.discount;
  }

  /**
   * returns Product object converted from the JSON
   *
   * @method fromJSON
   * @param {IProductJSON} json
   * @return {Product}
   * @public
   */
  static fromJSON(json: IProductJSON): Product {
    let product;

    product = Object.create(Product.prototype);

    return Object.assign(product, json);
  }
}
