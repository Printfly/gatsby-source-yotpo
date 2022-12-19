"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _yotpo = require("./yotpo");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
    var appKey, appSecret, accessToken, reviews, productBottomlines, siteBottomlines;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            appKey = _ref2.appKey, appSecret = _ref2.appSecret;
            console.time("Fetch Yotpo reviews");
            console.log("Starting to fetch reviews from Yotpo");
            _context.next = 5;
            return (0, _yotpo.getAccessToken)({
              appKey: appKey,
              appSecret: appSecret
            });
          case 5:
            accessToken = _context.sent;
            if (accessToken) {
              _context.next = 8;
              break;
            }
            throw new Error('Access token not found!!!');
          case 8:
            _context.next = 10;
            return pagedGet(_yotpo.allReviews, {
              appKey: appKey,
              accessToken: accessToken
            });
          case 10:
            reviews = _context.sent;
            _context.next = 13;
            return pagedGet(_yotpo.allProductBottomlines, {
              appKey: appKey,
              accessToken: accessToken
            });
          case 13:
            productBottomlines = _context.sent;
            _context.next = 16;
            return (0, _yotpo.allSiteBottomlines)({
              appKey: appKey,
              accessToken: accessToken,
              page: 1,
              pageSize: 1
            });
          case 16:
            siteBottomlines = _context.sent;
            console.timeEnd("Fetch Yotpo reviews");
            return _context.abrupt("return", {
              reviews: reviews,
              productBottomlines: productBottomlines,
              siteBottomlines: siteBottomlines
            });
          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
exports["default"] = _default;
function pagedGet(_x2, _x3) {
  return _pagedGet.apply(this, arguments);
}
function _pagedGet() {
  _pagedGet = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(method, options) {
    var page,
      pageSize,
      aggregatedResponse,
      reviews,
      _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            page = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 1;
            pageSize = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : 75;
            aggregatedResponse = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : null;
            _context2.next = 5;
            return method(_objectSpread(_objectSpread({}, options), {}, {
              page: page,
              pageSize: pageSize
            }));
          case 5:
            reviews = _context2.sent;
            if (!aggregatedResponse) {
              aggregatedResponse = reviews;
            } else {
              aggregatedResponse = aggregatedResponse.concat(reviews);
            }
            if (!(reviews && reviews.length > 0)) {
              _context2.next = 9;
              break;
            }
            return _context2.abrupt("return", pagedGet(method, options, page + 1, pageSize, aggregatedResponse));
          case 9:
            return _context2.abrupt("return", aggregatedResponse);
          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _pagedGet.apply(this, arguments);
}
//# sourceMappingURL=fetch-source.js.map