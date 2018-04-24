import './product.scss';
import Store from '../../services/store';
import Cart from '../../services/cart';
import { Product } from '../../models/product';
import { store_events } from '../../services/store';
import { cart_events } from '../../services/cart';

/**
 * @namespace app.components.product
 * @class ProductController
 */
class ProductController {

  /**
   * id of a product
   *
   * @property {number} productid
   * @private
   */
  public productid: number;

  /**
   * title of a product
   *
   * @property {string} title
   * @private
   */
  public title: string;

  /**
   * image source of a product
   *
   * @property {string} imgSrc
   * @private
   */
  public imgSrc: string;

  /**
   * style class for product detail view
   *
   * @property {string} defaultViewClass
   * @private
   */
  public defaultViewClass: string;

  /**
   * @ngInject
   *
   * @constructor
   * @param {ng.IScope} $scope
   * @param {Store} Store
   * @param {Cart} Cart
   */
  constructor(
    private $scope: ng.IScope,
    private Store: Store,
    private Cart: Cart
  ) {
    this.init();
  }

  /**
   * subscribes events and assigns proper values
   *
   * @method $onInit
   */
  $onInit() {
    this.getProductFromStore();

    this.Store.subscribe(
      store_events.UPDATE_PRODUCTS_EVENT,
      this.$scope,
      (response) => {
        this.getProductFromStore();
      }
    );

    this.Cart.subscribe(
      cart_events.PURCHASE_PRODUCTS_EVENT,
      this.$scope,
      (response, data) => {
        this.onPurchase(data);
      }
    );
  }

  /**
   * initiates controller attributes
   *
   * @method init
   * @return {void}
   * @private
   */
  private init(): void {
    this.title = '';
    this.productid = 0;
    this.imgSrc = '';

    this.defaultViewClass = '';
  }

  /**
   * returns Product from the Store corresponding to productid
   *
   * @method getProductFromStore
   * @return {void}
   * @private
   */
  private getProductFromStore(): void {
    this.Store
      .getProduct(this.productid)
      .then(product => this.setProductValues(product));
  }

  /**
   * assigns values from Product and refreshes view
   *
   * @method setProductValues
   * @param {Product} product
   * @return {void}
   * @private
   */
  private setProductValues(product: Product): void {
    if (!product) {
      return;
    }
    this.title = product.getName();
    this.imgSrc = product.getImgSrc();

    this.Cart
      .getPurchasedProductIds()
      .then(productIds => this.onPurchase(productIds));

    this.$scope.$apply(); // to refresh view
  }

  /**
   * manages view afer product purchase
   *
   * @method onPurchase
   * @param {number[]} productIds
   * @return {void}
   * @private
   */
  private onPurchase(productIds: number[]): void {
    for (let i = 0; i < productIds.length; i++) {
      if (this.productid === productIds[i]) {
        this.defaultViewClass = 'owned';
        return;
      }
    }
  }
}

export const product = {
  template: require('./product.html'),
  controller: ProductController,
  bindings: {
    productid: '<'
  }
};
