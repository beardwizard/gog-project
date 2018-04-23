import History from './history';

export enum cart_events {
  ADD_TO_CART_EVENT = 'addToCartEvent',
  REMOVE_FROM_CART_EVENT = 'removeFromCartEvent',
  REMOVE_ALL_PRODUCTS_EVENT = 'removeAllProductsEvent',
  PURCHASE_PRODUCTS_EVENT = 'purchaseProductsEvent'
}

/**
 * @namespace app.services
 * @class Cart
 */
class Cart {

  /**
   * list of product ids added to the cart
   *
   * @property {number[]} productIds
   * @private
   */
  private productIds: number[];

  /**
   * list of purchased product ids
   *
   * @property {number[]} purchasedProductIds
   * @private
   */
  private purchasedProductIds: number[];

  /**
   * @ngInject
   *
   * @constructor
   * @param {angular.IHttpService} $http
   * @param {ng.IRootScopeService} $rootScope
   * @param {History} History
   */
  constructor(
    private $http: angular.IHttpService,
    private $rootScope: ng.IRootScopeService,
    private History: History
  ) {
    this.init();
  }

  /**
   * initiates lists of in-cart and purchased product ids
   *
   * @method init
   * @return {void}
   * @private
   */
  private init(): void {
    this.productIds = [];
    this.purchasedProductIds = [];

    this.initHistory();
  }

  /**
   * initiates lists of in-cart and purchased product ids from the History
   *
   * @method initHistory
   * @return {void}
   * @private
   */
  private initHistory(): void {
    this.productIds = this.History.getCartProductIds() || [];
    this.purchasedProductIds = this.History.getPurchasedProductIds() || [];
  }

  /**
   * returns Promise with the type of number array
   * of product ids from the productIds list
   *
   * @method getProductIds
   * @return {Promise<number[]>}
   * @public
   */
  public getProductIds(): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
        resolve(this._getProductIds());
    });
  }

  /**
   * returns number array of product ids from the productIds list
   *
   * @method _getProductIds
   * @return {number[]}
   * @private
   */
  private _getProductIds(): number[] {
    return this.productIds;
  }

  /**
   * returns Promise with the type of number array
   * of product ids from the purchasedProductIds list
   *
   * @method getPurchasedProductIds
   * @return {Promise<number[]>}
   * @public
   */
  public getPurchasedProductIds(): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
        resolve(this._getPurchasedProductIds());
    });
  }

  /**
   * returns number array of product ids from the purchasedProductIds list
   *
   * @method _getPurchasedProductIds
   * @return {number[]}
   * @private
   */
  private _getPurchasedProductIds(): number[] {
    return this.purchasedProductIds;
  }

  /**
   * adds product id to the list of product ids
   * stores it in the history
   * notifies with the event: cart_events.ADD_TO_CART_EVENT
   *
   * @method addToCart
   * @param {number} productId
   * @return {Promise<any>}
   * @public
   */
  public addToCart(productId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(this._addToCart(productId));
    });
  }

  /**
   * adds product id to the list of product ids
   * stores it in the history
   * notifies with the event: cart_events.ADD_TO_CART_EVENT
   *
   * @method _addToCart
   * @param {number} productId
   * @return {void}
   * @private
   */
  private _addToCart(productId: number): void {
    if (this.productIds.indexOf(productId) > -1) {
      return;
    }

    this.productIds.push(productId);
    this.storeProductIds();
    this.notify(cart_events.ADD_TO_CART_EVENT, productId);
  }

  /**
   * removes product id from the list of product ids
   * updates the history
   * notifies with the event: cart_events.REMOVE_FROM_CART_EVENT
   *
   * @method removeFromCart
   * @param {number} productId
   * @return {Promise<any>}
   * @public
   */
  public removeFromCart(productId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(this._removeFromCart(productId));
    });
  }

  /**
   * removes product id from the list of product ids
   * updates the history
   * notifies with the event: cart_events.REMOVE_FROM_CART_EVENT
   *
   * @method _removeFromCart
   * @param {number} productId
   * @return {void}
   * @private
   */
  private _removeFromCart(productId: number): void {
    this.productIds.splice(
      this.productIds.indexOf(productId), 1
    );
    this.storeProductIds();
    this.notify(cart_events.REMOVE_FROM_CART_EVENT, productId);
  }

  /**
   * removes ALL product ids from the list of product ids
   * updates the history
   * notifies with the event: cart_events.REMOVE_ALL_PRODUCTS_EVENT
   *
   * @method removeAllProducts
   * @return {Promise<any>}
   * @public
   */
  public removeAllProducts(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(this._removeAllProducts());
    });
  }

  /**
   * removes ALL product ids from the list of product ids
   * updates the history
   * notifies with the event: cart_events.REMOVE_ALL_PRODUCTS_EVENT
   *
   * @method _removeAllProducts
   * @return {void}
   * @private
   */
  private _removeAllProducts(): void {
    this.productIds = [];
    this.storeProductIds();
    this.notify(cart_events.REMOVE_ALL_PRODUCTS_EVENT);
  }

  /**
   * moves ALL product ids from the list of product ids to the
   * list of purchased product idsLength
   * updates the history
   * notifies with the event: cart_events.PURCHASE_PRODUCTS_EVENT
   *
   * @method purchaseAllProducts
   * @return {Promise<any>}
   * @public
   */
  public purchaseAllProducts(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      resolve(this._purchaseAllProducts());
    });
  }

  /**
   * moves ALL product ids from the list of product ids to the
   * list of purchased product idsLength
   * updates the history
   * notifies with the event: cart_events.PURCHASE_PRODUCTS_EVENT
   *
   * @method _purchaseAllProducts
   * @return {void}
   * @private
   */
  private _purchaseAllProducts(): void {
    let purchasedProductIds = this.productIds;

    this.purchasedProductIds = this.purchasedProductIds.concat(purchasedProductIds);

    this.storePurchasedProductIds();
    this._removeAllProducts();
    this.notify(cart_events.PURCHASE_PRODUCTS_EVENT, purchasedProductIds);
  }

  /**
   * store the list of product ids in the history
   *
   * @method storeProductIds
   * @return {void}
   * @private
   */
  private storeProductIds(): void {
    this.History.setCartProductIds(this.productIds);
  }

  /**
   * store the list of purchased product ids in the history
   *
   * @method storePurchasedProductIds
   * @return {void}
   * @private
   */
  private storePurchasedProductIds(): void {
    this.History.setPurchasedProductIds(this.purchasedProductIds);
  }

  /**
   * allow other classes to subscribe to the certain event (cart_events)
   *
   * @method subscribe
   * @param {cart_events} event
   * @param {ng.IScope} scope
   * @param {Object} callback
   * @return {void}
   * @public
   */
  public subscribe(event: cart_events, scope: ng.IScope, callback: any): void {
    let handler;

    handler = this.$rootScope.$on(event, callback);
    scope.$on('$destroy', handler);
  }

  /**
   * notifies subscribed classes about certain event (cart_events)
   *
   * @method notify
   * @param {cart_events} event
   * @return {void}
   * @private
   */
  public notify(event: cart_events, response?: any): void {
    this.$rootScope.$emit(event, response);
  }
}

export default Cart;
