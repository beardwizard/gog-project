import './cart-item.scss';
import Store from '../../services/store';
import Cart from '../../services/cart';
import { Product } from '../../models/product';
import { store_events } from '../../services/store';

const REMOVE_TEXT = 'Remove';

/**
 * @namespace app.components.cart-item
 * @class CartItemController
 */
class CartItemController {

  /**
   * id of a product added to the cart
   *
   * @property {number} productid
   * @private
   */
  public productid: number;

  /**
   * title of a product added to the cart
   *
   * @property {string} title
   * @private
   */
  public title: string;

  /**
   * image source of a product added to the cart
   *
   * @property {string} imgSrc
   * @private
   */
  public imgSrc: string;

  /**
   * price of a product added to the cart
   *
   * @property {number} price
   * @private
   */
  public price: number;

  /**
   * text of remove button
   *
   * @property {string} removeText
   * @private
   */
  public removeText: string;

  /**
   * style class for remove button
   *
   * @property {string} removeViewClass
   * @private
   */
  public removeViewClass: string;

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
    this.removeText = REMOVE_TEXT;
    this.removeViewClass = 'hidden';
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
    this.price = product.getCurrentPrice();
    this.imgSrc = product.getImgSrc();
    this.$scope.$apply(); // to refresh view
  }

  /**
   * removes item from cart
   *
   * @method removeItem
   * @return {void}
   * @private
   */
  private removeItem(): void {
    this.Cart.removeFromCart(this.productid);
  }

  /**
   * shows remove button
   *
   * @method onMouseOver
   * @return {void}
   * @private
   */
  private onMouseOver(): void {
    this.removeViewClass = '';
  }

  /**
   * hides remove button
   *
   * @method onMouseLeave
   * @return {void}
   * @private
   */
  private onMouseLeave(): void {
    this.removeViewClass = 'hidden';
  }
}

export const cartItem = {
  template: require('./cart-item.html'),
  controller: CartItemController,
  bindings: {
    productid: '<'
  }
};
