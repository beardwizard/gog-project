webpackJsonp([0],[function(t,e,r){"use strict";e.__esModule=!0;var o,s=r(26);!function(t){t.UPDATE_PRODUCTS_EVENT="updateProductsEvent"}(o=e.store_events||(e.store_events={}));var i=function(){function t(t,e){this.$http=t,this.$rootScope=e,this.init()}return t.$inject=["$http","$rootScope"],t.prototype.init=function(){this.products=[],this.updateProducts()},t.prototype.updateProducts=function(){var t=this;return this.$http.get("app/services/products.json").then(function(e){t._updateProducts(e)})},t.prototype._updateProducts=function(t){for(var e=t.data,r=Object.keys(e).length,i=[],n=0;n<r;n++)i.push(s.Product.fromJSON(e[n]));this.products=i,this.notify(o.UPDATE_PRODUCTS_EVENT)},t.prototype.getProduct=function(t){var e=this;return new Promise(function(r,o){r(e._getProduct(t))})},t.prototype.getProducts=function(t){var e=this;return new Promise(function(r,o){r(e._getProducts(t))})},t.prototype._getProduct=function(t){for(var e=0;e<this.products.length;e++)if(this.products[e].getId()===t)return this.products[e];return null},t.prototype._getProducts=function(t){var e,r=[];if(!t)return this.products;for(var o=0;o<t.length;o++)(e=this._getProduct(t[o]))&&r.push(e);return r},t.prototype.getProductIds=function(){var t=this;return new Promise(function(e,r){e(t._getProductIds())})},t.prototype._getProductIds=function(){for(var t=[],e=0;e<this.products.length;e++)t.push(this.products[e].getId());return t},t.prototype.subscribe=function(t,e,r){var o;o=this.$rootScope.$on(t,r),e.$on("$destroy",o)},t.prototype.notify=function(t){this.$rootScope.$emit(t)},t}();e.default=i},function(t,e,r){"use strict";e.__esModule=!0;var o;!function(t){t.ADD_TO_CART_EVENT="addToCartEvent",t.REMOVE_FROM_CART_EVENT="removeFromCartEvent",t.REMOVE_ALL_PRODUCTS_EVENT="removeAllProductsEvent",t.PURCHASE_PRODUCTS_EVENT="purchaseProductsEvent"}(o=e.cart_events||(e.cart_events={}));var s=function(){function t(t,e,r){this.$http=t,this.$rootScope=e,this.History=r,this.init()}return t.$inject=["$http","$rootScope","History"],t.prototype.init=function(){this.productIds=[],this.purchasedProductIds=[],this.initHistory()},t.prototype.initHistory=function(){this.productIds=this.History.getCartProductIds()||[],this.purchasedProductIds=this.History.getPurchasedProductIds()||[]},t.prototype.getProductIds=function(){var t=this;return new Promise(function(e,r){e(t._getProductIds())})},t.prototype._getProductIds=function(){return this.productIds},t.prototype.getPurchasedProductIds=function(){var t=this;return new Promise(function(e,r){e(t._getPurchasedProductIds())})},t.prototype._getPurchasedProductIds=function(){return this.purchasedProductIds},t.prototype.addToCart=function(t){var e=this;return new Promise(function(r,o){r(e._addToCart(t))})},t.prototype._addToCart=function(t){this.productIds.indexOf(t)>-1||(this.productIds.push(t),this.storeProductIds(),this.notify(o.ADD_TO_CART_EVENT,t))},t.prototype.removeFromCart=function(t){var e=this;return new Promise(function(r,o){r(e._removeFromCart(t))})},t.prototype._removeFromCart=function(t){this.productIds.splice(this.productIds.indexOf(t),1),this.storeProductIds(),this.notify(o.REMOVE_FROM_CART_EVENT,t)},t.prototype.removeAllProducts=function(){var t=this;return new Promise(function(e,r){e(t._removeAllProducts())})},t.prototype._removeAllProducts=function(){this.productIds=[],this.storeProductIds(),this.notify(o.REMOVE_ALL_PRODUCTS_EVENT)},t.prototype.purchaseAllProducts=function(){var t=this;return new Promise(function(e,r){e(t._purchaseAllProducts())})},t.prototype._purchaseAllProducts=function(){var t=this.productIds;this.purchasedProductIds=this.purchasedProductIds.concat(t),this.storePurchasedProductIds(),this._removeAllProducts(),this.notify(o.PURCHASE_PRODUCTS_EVENT,t)},t.prototype.storeProductIds=function(){this.History.setCartProductIds(this.productIds)},t.prototype.storePurchasedProductIds=function(){this.History.setPurchasedProductIds(this.purchasedProductIds)},t.prototype.subscribe=function(t,e,r){var o;o=this.$rootScope.$on(t,r),e.$on("$destroy",o)},t.prototype.notify=function(t,e){this.$rootScope.$emit(t,e)},t}();e.default=s},,,function(t,e){},function(t,e,r){"use strict";e.__esModule=!0,r(14);var o=r(0),s=function(){function t(t,e,r){this.$scope=t,this.Store=e,this.Cart=r,this.init()}return t.$inject=["$scope","Store","Cart"],t.prototype.$onInit=function(){var t=this;this.getProductFromStore(),this.Store.subscribe(o.store_events.UPDATE_PRODUCTS_EVENT,this.$scope,function(e){t.getProductFromStore()})},t.prototype.init=function(){this.title="",this.removeText="Remove",this.removeViewClass="hidden"},t.prototype.getProductFromStore=function(){var t=this;this.Store.getProduct(this.productid).then(function(e){return t.setProductValues(e)})},t.prototype.setProductValues=function(t){t&&(this.title=t.getName(),this.price=t.getCurrentPrice(),this.imgSrc=t.getImgSrc(),this.$scope.$apply())},t.prototype.removeItem=function(){this.Cart.removeFromCart(this.productid)},t.prototype.onMouseOver=function(){this.removeViewClass=""},t.prototype.onMouseLeave=function(){this.removeViewClass="hidden"},t}();e.cartItem={template:r(20),controller:s,bindings:{productid:"<"}}},function(t,e,r){"use strict";e.__esModule=!0,r(15);var o=r(0),s=r(1),i=function(){function t(t,e,r){this.$scope=t,this.Store=e,this.Cart=r,this.init()}return t.$inject=["$scope","Store","Cart"],t.prototype.$onInit=function(){var t=this;this.Cart.subscribe(s.cart_events.ADD_TO_CART_EVENT,this.$scope,function(e){t.onAddToCart()}),this.Cart.subscribe(s.cart_events.REMOVE_FROM_CART_EVENT,this.$scope,function(e){t.onRemoveFromCart()}),this.Cart.subscribe(s.cart_events.REMOVE_ALL_PRODUCTS_EVENT,this.$scope,function(e){t.onRemoveAllItems()}),this.Cart.subscribe(s.cart_events.PURCHASE_PRODUCTS_EVENT,this.$scope,function(e){t.onPurchaseAllItems()}),this.Store.subscribe(o.store_events.UPDATE_PRODUCTS_EVENT,this.$scope,function(e){t.onUpdateProducts()})},t.prototype.init=function(){this.numItemsText="items in cart",this.clearCartText="clear cart",this.emptyCartText="your cart is empty",this.items=[],this.numOfIems=0,this.totalPrice=0,this.isCartOpen=!1,this.cartItemsOverviewClass="hidden"},t.prototype.onAddToCart=function(){var t=this;this.Cart.getProductIds().then(function(e){return t.updateItems(e)})},t.prototype.onRemoveFromCart=function(){var t=this;this.Cart.getProductIds().then(function(e){return t.updateItems(e)})},t.prototype.onRemoveAllItems=function(){var t=this;this.Cart.getProductIds().then(function(e){return t.updateItems(e)})},t.prototype.onPurchaseAllItems=function(){var t=this;this.Cart.getProductIds().then(function(e){return t.updateItems(e)})},t.prototype.onUpdateProducts=function(){var t=this;this.Cart.getProductIds().then(function(e){return t.updateItems(e)})},t.prototype.onWrapperMouseLeave=function(){var t=this;this.closeEvent=setTimeout(function(){t.closeCart(),t.$scope.$apply()},1e3)},t.prototype.onWrapperMouseEnter=function(){clearTimeout(this.closeEvent)},t.prototype.updateItems=function(t){this.items=t,this.numOfIems=t.length,this.calcTotalPrice(),this.refreshView(),this.$scope.$apply()},t.prototype.onCartButtonClick=function(){this.isCartOpen?this.closeCart():this.openCart()},t.prototype.onClearCartButtonClick=function(){this.Cart.removeAllProducts()},t.prototype.onTotalPriceClick=function(){this.Cart.purchaseAllProducts()},t.prototype.openCart=function(){this.isCartOpen=!0,this.cartBtnViewClass="active",this.cartItemsOverviewClass="",this.refreshView()},t.prototype.closeCart=function(){this.isCartOpen=!1,this.cartBtnViewClass="",this.cartItemsOverviewClass="hidden"},t.prototype.refreshView=function(){this.numOfIems>0?(this.cartItemsViewClass="",this.cartEmptyViewClass="hidden"):(this.cartItemsViewClass="hidden",this.cartEmptyViewClass=""),1===this.numOfIems?this.numItemsText="item in cart":this.numItemsText="items in cart"},t.prototype.calcTotalPrice=function(){var t=this;this.Store.getProducts(this.items).then(function(e){return t._calcTotalPrice(e)})},t.prototype._calcTotalPrice=function(t){this.totalPrice=0;for(var e=0;e<t.length;e++)this.totalPrice+=t[e].getCurrentPrice();this.$scope.$apply()},t}();e.cart={template:r(21),controller:i}},function(t,e,r){"use strict";e.__esModule=!0,r(16);var o=function(){function t(t){this.History=t}return t.$inject=["History"],t.prototype.onLogoButtonClick=function(){this.History.clear()},t}();e.gogLayout={template:r(22),controller:o,transclude:!0}},function(t,e,r){"use strict";e.__esModule=!0,r(17);var o=r(0),s=function(){function t(t,e){this.$scope=t,this.Store=e,this.init()}return t.$inject=["$scope","Store"],t.prototype.$onInit=function(){var t=this;this.getProductIdsFromStore(),this.Store.subscribe(o.store_events.UPDATE_PRODUCTS_EVENT,this.$scope,function(e){t.getProductIdsFromStore()})},t.prototype.init=function(){this.gotwTitle="game of the week",this.productIds=[],this.secretBtnText="a secret button that I have totally implemented"},t.prototype.getProductIdsFromStore=function(){var t=this;this.Store.getProductIds().then(function(e){return t.setProductIds(e)})},t.prototype.setProductIds=function(t){this.productIds=t,this.$scope.$apply()},t}();e.productList={template:r(23),controller:s}},function(t,e,r){"use strict";e.__esModule=!0,r(18);var o,s=r(1);!function(t){t[t.DEFAULT=0]="DEFAULT",t[t.IN_CART=1]="IN_CART",t[t.OWNED=2]="OWNED"}(o||(o={}));var i=function(){function t(t,e,r){this.$scope=t,this.Store=e,this.Cart=r,this.init()}return t.$inject=["$scope","Store","Cart"],t.prototype.$onInit=function(){var t=this;this.setState(o.DEFAULT),this.Store.getProduct(this.productid).then(function(e){return t.setProductValues(e)}),this.Cart.subscribe(s.cart_events.REMOVE_ALL_PRODUCTS_EVENT,this.$scope,function(e,r){t.onRemoveAllProducts()}),this.Cart.subscribe(s.cart_events.REMOVE_FROM_CART_EVENT,this.$scope,function(e,r){t.onRemoveFromCart(r)}),this.Cart.subscribe(s.cart_events.PURCHASE_PRODUCTS_EVENT,this.$scope,function(e,r){t.onPurchase(r)})},t.prototype.init=function(){this.state=o.DEFAULT,this.ownedText="OWNED",this.inCartText="IN CART",this.defaultViewClass="hidden",this.inCartViewClass="hidden",this.ownedViewClass="hidden"},t.prototype.setProductValues=function(t){var e=this,r=t.getDiscount(),s=t.getCurrentPrice();this.setPrice(s,r),this.Cart.getProductIds().then(function(t){return e.updateState(t,o.IN_CART)}),this.Cart.getPurchasedProductIds().then(function(t){return e.updateState(t,o.OWNED)}),this.$scope.$apply()},t.prototype.updateState=function(t,e){for(var r=0;r<t.length;r++)if(this.productid===t[r])return this.setState(e),void this.$scope.$apply()},t.prototype.setState=function(t){switch(this.state=t,this.defaultViewClass="hidden",this.inCartViewClass="hidden",this.ownedViewClass="hidden",t){case o.DEFAULT:this.defaultViewClass="";break;case o.IN_CART:this.inCartViewClass="";break;case o.OWNED:this.ownedViewClass=""}},t.prototype.setPrice=function(t,e){this.price=t,e?(this.discount=e,this.discountViewClass=""):this.discountViewClass="hidden"},t.prototype.addToCart=function(){var t=this;this.Cart.addToCart(this.productid).then(function(){t.setState(o.IN_CART)})},t.prototype.onRemoveFromCart=function(t){this.productid===t&&this.state!==o.OWNED&&this.setState(o.DEFAULT)},t.prototype.onRemoveAllProducts=function(){this.state!==o.OWNED&&this.setState(o.DEFAULT)},t.prototype.onPurchase=function(t){for(var e=0;e<t.length;e++)if(this.productid===t[e])return void this.setState(o.OWNED)},t}();e.productPrice={template:r(24),controller:i,bindings:{productid:"<"}}},function(t,e,r){"use strict";e.__esModule=!0,r(19);var o=r(0),s=r(1),i=function(){function t(t,e,r){this.$scope=t,this.Store=e,this.Cart=r,this.init()}return t.$inject=["$scope","Store","Cart"],t.prototype.$onInit=function(){var t=this;this.getProductFromStore(),this.Store.subscribe(o.store_events.UPDATE_PRODUCTS_EVENT,this.$scope,function(e){t.getProductFromStore()}),this.Cart.subscribe(s.cart_events.PURCHASE_PRODUCTS_EVENT,this.$scope,function(e,r){t.onPurchase(r)})},t.prototype.init=function(){this.title="",this.productid=0,this.imgSrc="",this.defaultViewClass=""},t.prototype.getProductFromStore=function(){var t=this;this.Store.getProduct(this.productid).then(function(e){return t.setProductValues(e)})},t.prototype.setProductValues=function(t){var e=this;t&&(this.title=t.getName(),this.imgSrc=t.getImgSrc(),this.Cart.getPurchasedProductIds().then(function(t){return e.onPurchase(t)}),this.$scope.$apply())},t.prototype.onPurchase=function(t){for(var e=0;e<t.length;e++)if(this.productid===t[e])return void(this.defaultViewClass="owned")},t}();e.product={template:r(25),controller:i,bindings:{productid:"<"}}},function(t,e,r){"use strict";e.__esModule=!0;var o=function(){function t(){}return t.prototype.getItem=function(t){var e;return e=localStorage.getItem(t),null!==e&&void 0!==e&&"undefined"!==e?e:null},t.prototype.getProductIds=function(t){var e,r;e=this.getItem(t);try{r=JSON.parse(e)}catch(t){console.log("error in parsing JSON:",t),r=null}return r},t.prototype.setItem=function(t,e){localStorage.setItem(t,e)},t.prototype.removeItem=function(t){localStorage.removeItem(t)},t.prototype.clear=function(){localStorage.clear()},t.prototype.setProductIds=function(t,e){var r;r=JSON.stringify(e),this.setItem(t,r)},t.prototype.getCartProductIds=function(){return this.getProductIds("cart-product-ids")},t.prototype.setCartProductIds=function(t){this.setProductIds("cart-product-ids",t)},t.prototype.getPurchasedProductIds=function(){return this.getProductIds("purchased-product-ids")},t.prototype.setPurchasedProductIds=function(t){this.setProductIds("purchased-product-ids",t)},t}();e.default=o},function(t,e,r){"use strict";function o(t,e,r){r.html5Mode(!0).hashPrefix("!"),e.otherwise("/"),t.state("productList",{url:"/",component:"productList"})}o.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],e.__esModule=!0,e.default=o},,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){t.exports='<div class="component">\n  <div class="cart-item-wrapper"\n    ng-mouseover="$ctrl.onMouseOver($event)"\n    ng-mouseleave="$ctrl.onMouseLeave($event)">\n    <div class="img" ng-style="{\'background-image\': \'url(/app/images/\' + $ctrl.imgSrc +\')\'}"></div>\n    <div class="info">\n      <div class="title">\n        <p>{{$ctrl.title}}</p>\n      </div>\n      <div class="actions">\n        <div class="remove" ng-class="$ctrl.removeViewClass" ng-click="$ctrl.removeItem()">\n          <p>{{$ctrl.removeText}}</p>\n        </div>\n      </div>\n    </div>\n    <div class="price">\n      <p>$ {{$ctrl.price}}</p>\n    </div>\n  </div>\n</div>\n'},function(t,e){t.exports='<div class="component">\n  <div class="cart-wrapper"\n    ng-mouseleave="$ctrl.onWrapperMouseLeave()"\n    ng-mouseenter="$ctrl.onWrapperMouseEnter()">\n    <div class="cart-btn no-select"\n      ng-class="$ctrl.cartBtnViewClass"\n      ng-click="$ctrl.onCartButtonClick()">\n      <div class="icon"></div>\n      <div class="qty">\n        <p>{{$ctrl.numOfIems}}</p>\n      </div>\n    </div>\n\n    <div class="shadow-overview" ng-class="$ctrl.cartItemsOverviewClass">\n      <div class="cart-items" ng-class="$ctrl.cartItemsViewClass">\n        <div class="panel">\n          <div class="num-items">\n            <p>{{$ctrl.numOfIems}} {{$ctrl.numItemsText}}</p>\n          </div>\n          <div class="total-price" ng-click="$ctrl.onTotalPriceClick()">\n            <p>$ {{$ctrl.totalPrice}}</p>\n          </div>\n          <div class="btn btn-big btn-purple-grad clear-cart no-select"\n            ng-click="$ctrl.onClearCartButtonClick()">\n            <p>{{$ctrl.clearCartText}}</p>\n          </div>\n        </div>\n\n        <div class="items-list">\n          <cart-item ng-repeat="item in $ctrl.items" productid="item"></cart-item>\n        </div>\n      </div>\n      <div class="cart-empty" ng-class="$ctrl.cartEmptyViewClass">\n        <div class="icon"></div>\n        <div class="message">\n          <p>{{$ctrl.emptyCartText}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n'},function(t,e){t.exports='<div class="component">\n  <div class="header">\n    <div class="logo" ng-click="$ctrl.onLogoButtonClick()">\n      <div class="gog img"></div>\n      <div class="com img"></div>\n    </div>\n    <div class="cart">\n      <cart></cart>\n    </div>\n  </div>\n  <div class="content" ng-transclude>\n  </div>\n</div>\n'},function(t,e){t.exports='<div class="component">\n  <div class="gotw-title">\n    <p>{{$ctrl.gotwTitle}}</p>\n  </div>\n  <div class="gotw-wrapper">\n    <button class="btn btn-green-grad secret-btn">\n      {{$ctrl.secretBtnText}}\n    </button>\n    <div class="gotw-img"></div>\n  </div>\n  <div class="product-list">\n    <product ng-repeat="product in $ctrl.productIds" productid="product"></product>\n  </div>\n</div>\n'},function(t,e){t.exports='<div class="component">\n  <div class="price-wrapper" ng-class="$ctrl.defaultViewClass">\n    <div ng-class="$ctrl.discountViewClass" class="discount btn btn-small btn-green">\n      <p>-{{$ctrl.discount}}%</p>\n    </div>\n    <div class="price btn btn-small" ng-click="$ctrl.addToCart()">\n      <p>$ {{$ctrl.price}}</p>\n    </div>\n  </div>\n  <div ng-class="$ctrl.inCartViewClass">\n    <div class="in-cart btn btn-small">\n      <p>{{$ctrl.inCartText}}</p>\n    </div>\n  </div>\n  <div ng-class="$ctrl.ownedViewClass">\n    <div class="owned btn btn-small">\n      <p>{{$ctrl.ownedText}}</p>\n    </div>\n  </div>\n</div>\n'},function(t,e){t.exports='<div class="component">\n  <div class="product-wrapper">\n    <a href class="product-image" ng-style="{\'background-image\': \'url(/app/images/\' + $ctrl.imgSrc +\')\'}"></a>\n    <div class="product-details" ng-class="$ctrl.defaultViewClass">\n      <div class="product-name">\n        <a href>{{$ctrl.title}}</a>\n      </div>\n      <product-price class="product-price" productid="$ctrl.productid"></product-price>\n    </div>\n  </div>\n</div>\n'},function(t,e,r){"use strict";e.__esModule=!0;var o=function(){function t(t,e,r,o,s,i){void 0===i&&(i=0),this.id=t,this.name=e,this.imgSrc=r,this.originalPrice=o,this.currentPrice=s,this.discount=i,this.currentPrice||(this.currentPrice=this.originalPrice)}return t.prototype.getId=function(){return this.id},t.prototype.getName=function(){return this.name},t.prototype.getImgSrc=function(){return this.imgSrc},t.prototype.getOriginalPrice=function(){return this.originalPrice},t.prototype.getCurrentPrice=function(){return this.currentPrice},t.prototype.getDiscount=function(){return this.discount},t.fromJSON=function(e){var r;return r=Object.create(t.prototype),Object.assign(r,e)},t}();e.Product=o},function(t,e,r){"use strict";e.__esModule=!0;var o=r(2);r(3);var s=r(12),i=r(9),n=r(10),c=r(8),u=r(7),a=r(5),d=r(6),p=r(0),h=r(1),l=r(11);r(4),e.app="app",o.module(e.app,["ui.router"]).config(s.default).component("gogLayout",u.gogLayout).component("cart",d.cart).component("cartItem",a.cartItem).component("productList",c.productList).component("product",n.product).component("productPrice",i.productPrice).service("Store",p.default).service("Cart",h.default).service("History",l.default)}],[27]);