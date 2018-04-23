import './product-list.scss';
import Store from '../../services/store';
import { store_events } from '../../services/store';

const GAME_OF_THE_WEEK_TITLE = 'game of the week';
const SECRET_BUTTON_TEXT = 'a secret button that I have totally implemented';

/**
 * @namespace app.components.product-list
 * @class ProductListController
 */
class ProductListController {

  /**
   * list of product ids added to the cart
   *
   * @property {number[]} productIds
   * @private
   */
  public productIds: number[];

  /**
   * text of the secret button
   *
   * @property {string} secretBtnText
   * @private
   */
  public secretBtnText: string;

  /**
   * text of 'gotw' title
   *
   * @property {string} gotwTitle
   * @private
   */
  public gotwTitle: string;

  /**
   * @ngInject
   *
   * @constructor
   * @param {ng.IScope} $scope
   * @param {Store} Store
   */
  constructor(private $scope: ng.IScope, private Store: Store) {
    this.init();
  }

  /**
   * subscribes events and assigns proper values
   *
   * @method $onInit
   */
  $onInit() {
    this.getProductIdsFromStore();

    this.Store.subscribe(
      store_events.UPDATE_PRODUCTS_EVENT,
      this.$scope,
      (response) => {
        this.getProductIdsFromStore();
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
    this.gotwTitle = GAME_OF_THE_WEEK_TITLE;
    this.productIds = [];
    this.secretBtnText = SECRET_BUTTON_TEXT;
  }

  /**
   * returns product ids from the Store
   *
   * @method getProductIdsFromStore
   * @return {void}
   * @private
   */
  private getProductIdsFromStore(): void {
    this.Store
      .getProductIds()
      .then(productIds => this.setProductIds(productIds));
  }

  /**
   * assigns product ids and refreshes view
   *
   * @method setProductIds
   * @param {number[]} productIds
   * @return {void}
   * @private
   */
  private setProductIds(productIds: number[]): void {
      this.productIds = productIds;
      this.$scope.$apply(); // to refresh view
  }
}

export const productList = {
  template: require('./product-list.html'),
  controller: ProductListController
};
