"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceNodes = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _gatsbyNodeHelpers = require("gatsby-node-helpers");
var _fetch = _interopRequireDefault(require("./fetch"));
var sourceNodes = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(gatsbyArgs, pluginOptions) {
    var actions, createNodeId, createContentDigest, nodeHelpers, createNodeFactory, createNode, _yield$fetchData, reviews, productBottomlines, siteBottomlines;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            actions = gatsbyArgs.actions, createNodeId = gatsbyArgs.createNodeId, createContentDigest = gatsbyArgs.createContentDigest;
            nodeHelpers = (0, _gatsbyNodeHelpers.createNodeHelpers)({
              typePrefix: "Yotpo",
              createNodeId: createNodeId,
              createContentDigest: createContentDigest
            });
            createNodeFactory = nodeHelpers.createNodeFactory;
            createNode = actions.createNode;
            if (!pluginOptions.appKey) {
              console.log("\nMake sure options has appKey");
              process.exit(1);
            }
            if (!pluginOptions.appSecret) {
              console.log("\nMake sure options has appSecret");
              process.exit(1);
            }
            _context7.next = 8;
            return (0, _fetch["default"])(process.env.ASSETS_URL);
          case 8:
            _yield$fetchData = _context7.sent;
            reviews = _yield$fetchData.reviews;
            productBottomlines = _yield$fetchData.productBottomlines;
            siteBottomlines = _yield$fetchData.siteBottomlines;
            _context7.next = 14;
            return Promise.all(reviews.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(review) {
                var type, Node, data, node;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        type = review.sku === "yotpo_site_reviews" ? "SiteReview" : "ProductReview";
                        Node = createNodeFactory(type, /*#__PURE__*/function () {
                          var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(node) {
                            return _regenerator["default"].wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    node.dataString = JSON.stringify(node.data);
                                    return _context.abrupt("return", node);
                                  case 2:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          }));
                          return function (_x4) {
                            return _ref3.apply(this, arguments);
                          };
                        }());
                        if (!review.sku) {
                          _context2.next = 8;
                          break;
                        }
                        data = {
                          id: review.id,
                          title: review.title,
                          content: review.content,
                          score: review.score,
                          productIdentifier: review.sku.toLowerCase(),
                          sentiment: review.sentiment,
                          votesUp: review.votes_up,
                          votesDown: review.votes_down,
                          name: review.name,
                          email: review.email,
                          reviewerType: review.reviewer_type,
                          createdAt: review.created_at,
                          updatedAt: review.updated_at
                        };
                        _context2.next = 6;
                        return Node(data);
                      case 6:
                        node = _context2.sent;
                        createNode(node);
                      case 8:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }()), productBottomlines.map( /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(bottomline) {
                var type, Node, data, node;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        type = "ProductBottomline";
                        Node = createNodeFactory(type, /*#__PURE__*/function () {
                          var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(node) {
                            return _regenerator["default"].wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    node.dataString = JSON.stringify(node.data);
                                    return _context3.abrupt("return", node);
                                  case 2:
                                  case "end":
                                    return _context3.stop();
                                }
                              }
                            }, _callee3);
                          }));
                          return function (_x6) {
                            return _ref5.apply(this, arguments);
                          };
                        }());
                        data = {
                          id: bottomline.domain_key,
                          score: bottomline.product_score,
                          totalReviews: bottomline.total_reviews,
                          productIdentifier: bottomline.domain_key.toLowerCase()
                        };
                        _context4.next = 5;
                        return Node(data);
                      case 5:
                        node = _context4.sent;
                        createNode(node);
                      case 7:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));
              return function (_x5) {
                return _ref4.apply(this, arguments);
              };
            }()), siteBottomlines.map( /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(bottomline) {
                var type, Node, data, node;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        type = "SiteBottomline";
                        Node = createNodeFactory(type, /*#__PURE__*/function () {
                          var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(node) {
                            return _regenerator["default"].wrap(function _callee5$(_context5) {
                              while (1) {
                                switch (_context5.prev = _context5.next) {
                                  case 0:
                                    node.dataString = JSON.stringify(node.data);
                                    return _context5.abrupt("return", node);
                                  case 2:
                                  case "end":
                                    return _context5.stop();
                                }
                              }
                            }, _callee5);
                          }));
                          return function (_x8) {
                            return _ref7.apply(this, arguments);
                          };
                        }());
                        data = {
                          id: "SiteBottomline",
                          score: bottomline.average_score,
                          totalReviews: bottomline.total_reviews
                        };
                        _context6.next = 5;
                        return Node(data);
                      case 5:
                        node = _context6.sent;
                        createNode(node);
                      case 7:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));
              return function (_x7) {
                return _ref6.apply(this, arguments);
              };
            }()));
          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function sourceNodes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.sourceNodes = sourceNodes;
//# sourceMappingURL=gatsby-node.js.map