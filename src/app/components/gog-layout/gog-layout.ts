import History from '../../services/history';

import './gog-layout.scss';

/**
 * @namespace app.components.gog-layout
 * @class GogLayoutController
 */
class GogLayoutController {

  /**
   * @ngInject
   *
   * @constructor
   * @param {History} History
   */
  constructor(private History: History) { }

  /**
   * clears the history when logo clicked (for test purposes only)
   *
   * @method onLogoButtonClick
   * @return {void}
   * @private
   */
  private onLogoButtonClick(): void {
    this.History.clear();
  }
}

export const gogLayout = {
  template: require('./gog-layout.html'),
  controller: GogLayoutController
};
