import { Product } from '../models/product';

const DATA_SRC = 'app/services/products.json';

export enum store_events {
  UPDATE_PRODUCTS_EVENT = 'updateProductsEvent'
}

/**
 * @namespace app.services
 * @class Store
 */
class Store {

  /**
   * list of products shown in the store
   *
   * @property {Product[]} products
   * @private
   */
  private products: Product[];

  /**
   * @ngInject
   *
   * @constructor
   * @param {angular.IHttpService} $http
   * @param {ng.IRootScopeService} $rootScope
   */
  constructor(
    private $http: angular.IHttpService,
    private $rootScope: ng.IRootScopeService
  ) {
    this.init();
  }

  /**
   * initiates products
   *
   * @method init
   * @return {void}
   * @private
   */
  private init(): void {
    this.products = [];

    this.updateProducts();
  }

  /**
   * gets data from the JSON file and assigns it to the products list
   *
   * @method updateProducts
   * @return {ng.IPromise<any>}
   * @public
   */
  public updateProducts(): ng.IPromise<any> {
    return this.$http
      .get(DATA_SRC)
      .then(response => {
        this._updateProducts(response);
      });
  }

  /**
   * assigns JSON data to the products list
   *
   * @method _updateProducts
   * @param {Object} response
   * @return {void}
   * @private
   */
  private _updateProducts(response: any): void {
    let data = response.data,
        dataLength = Object.keys(data).length,
        products: Product[] = [];

    for (let i = 0; i < dataLength; i++) {
      products.push(Product.fromJSON(data[i]));
    }
    this.products = products;

    this.notify(store_events.UPDATE_PRODUCTS_EVENT);
  }

  /**
   * returns Promise with the type of Product from the products list by the id
   *
   * @method getProduct
   * @param {number} id
   * @return {Promise<Product>}
   * @public
   */
  public getProduct(id: number): Promise<Product> {
    return new Promise<Product>((resolve, reject) => {
      resolve(this._getProduct(id));
    });
  }

  /**
   * returns Promise with the type of Product array
   * from the products list by the array of ids
   *
   * @method getProducts
   * @param {number[]} ids
   * @return {Promise<Product[]>}
   * @public
   */
  public getProducts(ids: number[]): Promise<Product[]> {
    return new Promise<Product[]>((resolve, reject) => {
      resolve(this._getProducts(ids));
    });
  }

  /**
   * returns Product from the products list by the id
   *
   * @method _getProduct
   * @param {number} id
   * @return {Product}
   * @private
   */
  private _getProduct(id: number): Product {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].getId() === id) {
        return this.products[i];
      }
    }

    return null;
  }

  /**
   * returns Product array from the products list by the array of ids
   *
   * @method _getProducts
   * @param {number[]} ids
   * @return {Product[]}
   * @private
   */
  private _getProducts(ids: number[]): Product[] {
    let product,
        products: Product[] = [];

    if (!ids) {
      return this.products;
    }

    for (let i = 0; i < ids.length; i++) {
      product = this._getProduct(ids[i]);
      if (product) {
        products.push(product);
      }
    }

    return products;
  }

  /**
   * returns Promise with the type of number array
   * of product ids from the products list
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
   * returns number array of product ids from the products list
   *
   * @method _getProductIds
   * @return {number[]}
   * @private
   */
  private _getProductIds(): number[] {
    let ids: number[] = [];

    for (let i = 0; i < this.products.length; i++) {
      ids.push(this.products[i].getId());
    }

    return ids;
  }

  /**
   * allow other classes to subscribe to the certain event (store_events)
   *
   * @method subscribe
   * @param {store_events} event
   * @param {ng.IScope} scope
   * @param {Object} callback
   * @return {void}
   * @public
   */
  public subscribe(event: store_events, scope: ng.IScope, callback: any): void {
    let handler;

    handler = this.$rootScope.$on(event, callback);
    scope.$on('$destroy', handler);
  }

  /**
   * notifies subscribed classes about certain event (store_events)
   *
   * @method notify
   * @param {store_events} event
   * @return {void}
   * @private
   */
  private notify(event: store_events): void {
    this.$rootScope.$emit(event);
  }
}

export default Store;
