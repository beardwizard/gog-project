import './product-price.scss';
import Store from '../../services/store';
import Cart from '../../services/cart';
import { Product } from '../../models/product';
import { cart_events } from '../../services/cart';

enum price_state {
  DEFAULT,
  IN_CART,
  OWNED
}

const IN_CART_TEXT = 'IN CART';
const OWNED_TEXT = 'OWNED';

/**
 * @namespace app.components.product-price
 * @class ProductPriceController
 */
class ProductPriceController {

  /**
   * id of a product
   *
   * @property {number} productid
   * @private
   */
  public productid: number;

  /**
   * discount of a product
   *
   * @property {number} discount
   * @private
   */
  public discount: number;

  /**
   * price of a product
   *
   * @property {number} price
   * @private
   */
  public price: number;

  /**
   * state of a product
   *
   * @property {price_state} state
   * @private
   */
  public state: price_state;

  /**
   * style class for price wrapper view
   *
   * @property {string} defaultViewClass
   * @private
   */
  public defaultViewClass: string;

  /**
   * style class for in-cart view
   *
   * @property {string} inCartViewClass
   * @private
   */
  public inCartViewClass: string;

  /**
   * style class for owned view
   *
   * @property {string} ownedViewClass
   * @private
   */
  public ownedViewClass: string;

  /**
   * style class for discount view
   *
   * @property {string} discountViewClass
   * @private
   */
  public discountViewClass: string;

  /**
   * text of 'own' placeholder
   *
   * @property {string} ownedText
   * @private
   */
  public ownedText: string;

  /**
   * text of 'in cart' placeholder
   *
   * @property {string} inCartText
   * @private
   */
  public inCartText: string;

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
   * subscribes events and assigns default state
   *
   * @method $onInit
   */
  $onInit() {
    this.setState(price_state.DEFAULT);

    this.Store
      .getProduct(this.productid)
      .then(product => this.setProductValues(product));

    this.Cart.subscribe(
      cart_events.REMOVE_ALL_PRODUCTS_EVENT,
      this.$scope,
      (response, data) => {
        this.onRemoveAllProducts();
      }
    );

    this.Cart.subscribe(
      cart_events.REMOVE_FROM_CART_EVENT,
      this.$scope,
      (response, data) => {
        this.onRemoveFromCart(data);
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
    this.state = price_state.DEFAULT;

    this.ownedText = OWNED_TEXT;
    this.inCartText = IN_CART_TEXT;

    this.defaultViewClass = 'hidden';
    this.inCartViewClass = 'hidden';
    this.ownedViewClass = 'hidden';
  }

  /**
   * assigns values from Product, updates state and refreshes view
   *
   * @method setProductValues
   * @param {Product} product
   * @return {void}
   * @private
   */
  private setProductValues(product: Product): void {
    let discount = product.getDiscount(),
        price = product.getCurrentPrice();

    this.setPrice(price, discount);

    this.Cart
      .getProductIds()
      .then(productIds => this.updateState(productIds, price_state.IN_CART));
    this.Cart
      .getPurchasedProductIds()
      .then(productIds => this.updateState(productIds, price_state.OWNED));

    this.$scope.$apply(); // to refresh view
  }

  /**
   * updates state and refreshes view
   *
   * @method updateState
   * @param {number[]} productIds
   * @param {price_state} state
   * @return {void}
   * @private
   */
  private updateState(productIds: number[], state: price_state): void {
    let i,
        productIdsLength;

    productIdsLength = productIds.length;
    for (i = 0; i < productIdsLength; i++) {
      if (this.productid === productIds[i]) {
        this.setState(state);
        this.$scope.$apply(); // to refresh view
        return;
      }
    }
  }

  /**
   * sets state and manages view classes
   *
   * @method setState
   * @param {price_state} newState
   * @return {void}
   * @private
   */
  private setState(newState: price_state): void {
    this.state = newState;

    this.defaultViewClass = 'hidden';
    this.inCartViewClass = 'hidden';
    this.ownedViewClass = 'hidden';

    switch (newState) {
      case price_state.DEFAULT: this.defaultViewClass = ''; break;
      case price_state.IN_CART: this.inCartViewClass = ''; break;
      case price_state.OWNED: this.ownedViewClass = ''; break;
    }
  }

  /**
   * sets price and manages discount view class
   *
   * @method setPrice
   * @param {number} newPrice
   * @param {number} newDiscount
   * @return {void}
   * @private
   */
  private setPrice(newPrice: number, newDiscount?: number): void {
    this.price = newPrice;

    if (newDiscount) {
      this.discount = newDiscount;
      this.discountViewClass = '';
    } else {
      this.discountViewClass = 'hidden';
    }
  }

  /**
   * adds product id to the cart's list of product ids
   *
   * @method addToCart
   * @return {void}
   * @private
   */
  private addToCart(): void {
    this.Cart.addToCart(this.productid).then(() => {
      this.setState(price_state.IN_CART);
    });
  }

  /**
   * sets proper state when product removed from cart
   *
   * @method onRemoveFromCart
   * @param {number} productId
   * @return {void}
   * @private
   */
  private onRemoveFromCart(productId: number): void {
    if (this.productid === productId &&
        this.state !== price_state.OWNED) {
      this.setState(price_state.DEFAULT);
    }
  }

  /**
   * sets proper state when all products removed from cart
   *
   * @method onRemoveAllProducts
   * @return {void}
   * @private
   */
  private onRemoveAllProducts(): void {
    if (this.state !== price_state.OWNED) {
      this.setState(price_state.DEFAULT);
    }
  }

  /**
   * sets proper state when product has been purchasedProductIds 
   *
   * @method onPurchase
   * @param {number[]} productIds
   * @return {void}
   * @private
   */
  private onPurchase(productIds: number[]): void {
    let i,
        productIdsLength;

    productIdsLength = productIds.length;
    for (i = 0; i < productIdsLength; i++) {
      if (this.productid === productIds[i]) {
        this.setState(price_state.OWNED);
        return;
      }
    }
  }
}

export const productPrice = {
  template: require('./product-price.html'),
  controller: ProductPriceController,
  bindings: {
    productid: '<'
  }
};
