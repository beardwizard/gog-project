import { Product } from '../models/product';

const CART_PRODUCT_IDS = 'cart-product-ids';
const PURCHASED_PRODUCT_IDS = 'purchased-product-ids';

/**
 * @namespace app.services
 * @class History
 */
class History {

  /**
   * returns data from localStorage
   *
   * @method getItem
   * @param {string} key
   * @return {string | null}
   * @private
   */
  private getItem(key: string): string {
    let item;

    item = localStorage.getItem(key);

    if (item !== null && typeof item !== 'undefined' && item !== 'undefined') {
        return item;
    }

    return null;
  }

  /**
   * returns parsed data from localStorage
   *
   * @method getProductIds
   * @param {string} key
   * @return {number[] | null}
   * @private
   */
  private getProductIds(key: string): number[] {
    let item,
        productIds;

    item = this.getItem(key);

    try {
      productIds = JSON.parse(item);
    } catch (e) {
      console.log('error in parsing JSON:', e);
      productIds = null;
    }

    return productIds;
  }

  /**
   * stores data in localStorage
   *
   * @method setItem
   * @param {string} key
   * @param {string} item
   * @return {void}
   * @private
   */
  private setItem(key: string, item: string): void {
    localStorage.setItem(key, item);
  }

  /**
   * removes data from localStorage
   *
   * @method removeItem
   * @param {string} key
   * @return {void}
   * @public
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * clears WHOLE data from localStorage
   *
   * @method clear
   * @return {void}
   * @public
   */
  public clear(): void {
    localStorage.clear();
  }

  /**
   * converts data to JSON string and stores it in localStorage
   *
   * @method setProductIds
   * @param {string} key
   * @param {number[]} productIds
   * @return {void}
   * @private
   */
  private setProductIds(key: string, productIds: number[]): void {
    let productIdsString;

    productIdsString = JSON.stringify(productIds);
    this.setItem(key, productIdsString);
  }

  /**
   * returns cart product ids from localStorage
   *
   * @method getCartProductIds
   * @return {number[]}
   * @public
   */
  public getCartProductIds(): number[] {
    return this.getProductIds(CART_PRODUCT_IDS);
  }

  /**
   * stores cart product ids in localStorage
   *
   * @method setCartProductIds
   * @param {number[]} productIds
   * @return {void}
   * @public
   */
  public setCartProductIds(productIds: number[]): void {
    this.setProductIds(CART_PRODUCT_IDS, productIds);
  }

  /**
   * returns cart purchased product ids from localStorage
   *
   * @method getPurchasedProductIds
   * @return {number[]}
   * @public
   */
  public getPurchasedProductIds(): number[] {
    return this.getProductIds(PURCHASED_PRODUCT_IDS);
  }

  /**
   * stores cart purchased product ids in localStorage
   *
   * @method setPurchasedProductIds
   * @param {number[]} productIds
   * @return {void}
   * @public
   */
  public setPurchasedProductIds(productIds: number[]): void {
    this.setProductIds(PURCHASED_PRODUCT_IDS, productIds);
  }
}

export default History;
