"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCachedData = exports.getAccessToken = exports.allSiteBottomlines = exports.allReviews = exports.allProductBottomlines = void 0;
var _axios = _interopRequireDefault(require("axios"));
var getAccessToken = function getAccessToken(_ref) {
  var appKey = _ref.appKey,
    appSecret = _ref.appSecret,
    page = _ref.page,
    pageSize = _ref.pageSize;
  return new Promise(function (resolve, reject) {
    _axios["default"].post("https://api.yotpo.com/oauth/token", {
      client_id: appKey,
      client_secret: appSecret,
      grant_type: "client_credentials"
    }, {
      timeout: 3000,
      headers: {
        accept: 'application/json'
      }
    }).then(function (response) {
      resolve(response.data.access_token);
    })["catch"](function (error) {
      console.log('Get all reviews error', error);
      reject(error);
    });
  });
  /*
  const options = {
    method: "POST",
    url: `https://api.yotpo.com/oauth/token`,
    json: {
      client_id: appKey,
      client_secret: appSecret,
      grant_type: "client_credentials",
    },
  };
   return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error);
       resolve(body.access_token);
    });
  });
  */
};
exports.getAccessToken = getAccessToken;
var allReviews = function allReviews(_ref2) {
  var appKey = _ref2.appKey,
    accessToken = _ref2.accessToken,
    page = _ref2.page,
    pageSize = _ref2.pageSize;
  return new Promise(function (resolve, reject) {
    console.log("getting page ".concat(page));
    _axios["default"].get("https://api.yotpo.com/v1/apps/".concat(appKey, "/reviews"), {
      params: {
        utoken: accessToken,
        page: page,
        count: pageSize
      },
      timeout: 10000,
      headers: {
        accept: 'application/json'
      }
    }).then(function (response) {
      resolve(response.data.reviews);
    })["catch"](function (error) {
      console.log('Get all reviews error', error);
      reject(error);
    });
  });
};
exports.allReviews = allReviews;
var getCachedData = function getCachedData(assetsUrl) {
  return new Promise(function (resolve, reject) {
    _axios["default"].get("".concat(assetsUrl, "/assets/Yotpo/reviews.json"), {
      timeout: 3000,
      headers: {
        accept: 'application/json'
      }
    }).then(function (response) {
      resolve(response.data);
    })["catch"](function (error) {
      console.log('Get cached data error', error);
      reject(error);
    });
  });
};
exports.getCachedData = getCachedData;
var allProductBottomlines = function allProductBottomlines(_ref3) {
  var appKey = _ref3.appKey,
    page = _ref3.page,
    pageSize = _ref3.pageSize;
  return new Promise(function (resolve, reject) {
    _axios["default"].get("https://api.yotpo.com/v1/apps/".concat(appKey, "/bottom_lines"), {
      params: {
        page: page,
        count: pageSize
      },
      timeout: 3000,
      headers: {
        accept: 'application/json'
      }
    }).then(function (response) {
      resolve(response.data.response.bottomlines);
    })["catch"](function (error) {
      console.log('All product bottom line error', error);
      reject(error);
    });
  });
};
exports.allProductBottomlines = allProductBottomlines;
var allSiteBottomlines = function allSiteBottomlines(_ref4) {
  var appKey = _ref4.appKey,
    page = _ref4.page,
    pageSize = _ref4.pageSize;
  return new Promise(function (resolve, reject) {
    _axios["default"].get("https://api.yotpo.com/products/".concat(appKey, "/yotpo_site_reviews/bottomline"), {
      params: {
        page: page,
        count: pageSize
      },
      timeout: 3000,
      headers: {
        accept: 'application/json'
      }
    }).then(function (response) {
      resolve([response.data.response.bottomline]);
    })["catch"](function (error) {
      console.log('All site bottom line error', error);
      reject(error);
    });
  });
};
exports.allSiteBottomlines = allSiteBottomlines;
//# sourceMappingURL=yotpo.js.map