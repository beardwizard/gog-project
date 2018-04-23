import './cart.scss';
import { Product } from '../../models/product';
import Store from '../../services/store';
import Cart from '../../services/cart';
import { store_events } from '../../services/store';
import { cart_events } from '../../services/cart';

const NUM_ITEMS_TEXT = 'items in cart';
const NUM_ITEM_TEXT = 'item in cart';
const CLEAR_CART_TEXT = 'clear cart';
const EMPTY_CART_TEXT = 'your cart is empty';

const MOUSE_LEAVE_CLOSE_CART_TIME = 1000;

/**
 * @namespace app.components.cart
 * @class CartController
 */
class CartController {

  /**
   * list of product ids added to the cart
   *
   * @property {number[]} items
   * @private
   */
  private items: number[];

  /**
   * number of product ids added to the cart
   *
   * @property {number} numOfIems
   * @private
   */
  private numOfIems: number;

  /**
   * total price of products added to the cart
   *
   * @property {number} totalPrice
   * @private
   */
  private totalPrice: number;

  /**
   * logical state of cart being open
   *
   * @property {boolean} isCartOpen
   * @private
   */
  private isCartOpen: boolean;

  /**
   * text of number of items in cart
   *
   * @property {string} numItemsText
   * @private
   */
  private numItemsText: string;

  /**
   * text of clear cart button
   *
   * @property {string} clearCartText
   * @private
   */
  private clearCartText: string;

  /**
   * text of empty cart
   *
   * @property {string} emptyCartText
   * @private
   */
  private emptyCartText: string;

  /**
   * event for closing cart (on timeout)
   *
   * @property {Object} closeEvent
   * @private
   */
  private closeEvent: any;

  /**
   * style class for cart items
   *
   * @property {string} cartItemsViewClass
   * @private
   */
  private cartItemsViewClass: string;

  /**
   * style class for empty cart
   *
   * @property {string} cartEmptyViewClass
   * @private
   */
  private cartEmptyViewClass: string;

  /**
   * style class for main cart button
   *
   * @property {string} cartBtnViewClass
   * @private
   */
  private cartBtnViewClass: string;

  /**
   * style class for cart items overview (for proper shadowing)
   *
   * @property {string} cartItemsOverviewClass
   * @private
   */
  private cartItemsOverviewClass: string;

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
   * subscribes events
   *
   * @method $onInit
   */
  $onInit() {
    this.Cart.subscribe(
      cart_events.ADD_TO_CART_EVENT,
      this.$scope,
      (response) => {
        this.onAddToCart();
      }
    );
    this.Cart.subscribe(
      cart_events.REMOVE_FROM_CART_EVENT,
      this.$scope,
      (response) => {
        this.onRemoveFromCart();
      }
    );
    this.Cart.subscribe(
      cart_events.REMOVE_ALL_PRODUCTS_EVENT,
      this.$scope,
      (response) => {
        this.onRemoveAllItems();
      }
    );
    this.Cart.subscribe(
      cart_events.PURCHASE_PRODUCTS_EVENT,
      this.$scope,
      (response) => {
        this.onPurchaseAllItems();
      }
    );
    this.Store.subscribe(
      store_events.UPDATE_PRODUCTS_EVENT,
      this.$scope,
      (response) => {
        this.onUpdateProducts();
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
    this.numItemsText = NUM_ITEMS_TEXT;
    this.clearCartText = CLEAR_CART_TEXT;
    this.emptyCartText = EMPTY_CART_TEXT;
    this.items = [];
    this.numOfIems = 0;
    this.totalPrice = 0;
    this.isCartOpen = false;
    this.cartItemsOverviewClass = 'hidden';
  }

  /**
   * updates list of cart items after adding product to cart
   *
   * @method onAddToCart
   * @return {void}
   * @private
   */
  private onAddToCart(): void {
    this.Cart
      .getProductIds()
      .then(productIds => this.updateItems(productIds));
  }

  /**
   * updates list of cart items after removing product from cart
   *
   * @method onRemoveFromCart
   * @return {void}
   * @private
   */
  private onRemoveFromCart(): void {
    this.Cart
      .getProductIds()
      .then(productIds => this.updateItems(productIds));
  }

  /**
   * updates list of cart items after removing all products from cart
   *
   * @method onRemoveAllItems
   * @return {void}
   * @private
   */
  private onRemoveAllItems(): void {
    this.Cart
      .getProductIds()
      .then(productIds => this.updateItems(productIds));
  }

  /**
   * updates list of cart items after purchasing all products from cart
   *
   * @method onPurchaseAllItems
   * @return {void}
   * @private
   */
  private onPurchaseAllItems(): void {
    this.Cart
      .getProductIds()
      .then(productIds => this.updateItems(productIds));
  }

  /**
   * updates list of cart items after store products been updated
   *
   * @method onUpdateProducts
   * @return {void}
   * @private
   */
  private onUpdateProducts(): void {
    this.Cart
      .getProductIds()
      .then(productIds => this.updateItems(productIds));
  }

  /**
   * closes cart after time when mouse leave it
   *
   * @method onWrapperMouseLeave
   * @return {void}
   * @private
   */
  private onWrapperMouseLeave(): void {
    this.closeEvent = setTimeout(() => {
        this.closeCart();
        this.$scope.$apply(); // to refresh view
      }, MOUSE_LEAVE_CLOSE_CART_TIME
    );
  }

  /**
   * clears cart closing timeout when mouse re-enters it
   *
   * @method onWrapperMouseEnter
   * @return {void}
   * @private
   */
  private onWrapperMouseEnter(): void {
    clearTimeout(this.closeEvent);
  }

  /**
   * updates list of cart items and refreshes view
   *
   * @method updateItems
   * @param {number[]} items
   * @return {void}
   * @private
   */
  private updateItems(items: number[]): void {
    this.items = items;
    this.numOfIems = items.length;
    this.calcTotalPrice();
    this.refreshView();
    this.$scope.$apply(); // to refresh view
  }

  /**
   * manages open/close cart when cart icon clicked
   *
   * @method onCartButtonClick
   * @return {void}
   * @private
   */
  private onCartButtonClick(): void {
    this.isCartOpen ? this.closeCart() : this.openCart();
  }

  /**
   * removes all items from cart when clear button clicked
   *
   * @method onClearCartButtonClick
   * @return {void}
   * @private
   */
  private onClearCartButtonClick(): void {
    this.Cart.removeAllProducts();
  }

  /**
   * 'purchases' all items from cart when total price clicked
   *
   * @method onTotalPriceClick
   * @return {void}
   * @private
   */
  private onTotalPriceClick(): void {
    this.Cart.purchaseAllProducts();
  }

  /**
   * opens cart
   *
   * @method openCart
   * @return {void}
   * @private
   */
  private openCart(): void {
    this.isCartOpen = true;
    this.cartBtnViewClass = 'active';
    this.cartItemsOverviewClass = '';
    this.refreshView();
  }

  /**
   * closes cart
   *
   * @method openCart
   * @return {void}
   * @private
   */
  private closeCart(): void {
    this.isCartOpen = false;
    this.cartBtnViewClass = '';
    this.cartItemsOverviewClass = 'hidden';
  }

  /**
   * shows either empty or cart-list view
   * sets proper number of items text
   *
   * @method refreshView
   * @return {void}
   * @private
   */
  private refreshView(): void {
    if (this.numOfIems > 0) {
      this.cartItemsViewClass = '';
      this.cartEmptyViewClass = 'hidden';
    } else {
      this.cartItemsViewClass = 'hidden';
      this.cartEmptyViewClass = '';
    }

    if (this.numOfIems === 1) {
      this.numItemsText = NUM_ITEM_TEXT;
    } else {
      this.numItemsText = NUM_ITEMS_TEXT;
    }
  }

  /**
   * calculates and shows total price of cart items
   *
   * @method calcTotalPrice
   * @return {void}
   * @private
   */
  private calcTotalPrice(): void {
    this.Store
      .getProducts(this.items)
      .then(products => this._calcTotalPrice(products));
  }

  /**
   * calculates and shows total price of cart items
   *
   * @method _calcTotalPrice
   * @param {Product[]} products
   * @return {void}
   * @private
   */
  private _calcTotalPrice(products: Product[]): void {
    let i,
        productsLength;

    this.totalPrice = 0;

    productsLength = products.length;
    for (i = 0; i < productsLength; i++) {
      this.totalPrice += products[i].getCurrentPrice();
    }
    this.$scope.$apply(); // to refresh view
  }
}

export const cart = {
  template: require('./cart.html'),
  controller: CartController
};
