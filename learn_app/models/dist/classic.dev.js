"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HTTP = require("../utils/http-p");

var ClassicModel =
/*#__PURE__*/
function (_HTTP) {
  _inherits(ClassicModel, _HTTP);

  function ClassicModel() {
    _classCallCheck(this, ClassicModel);

    return _possibleConstructorReturn(this, _getPrototypeOf(ClassicModel).apply(this, arguments));
  }

  _createClass(ClassicModel, [{
    key: "getLatest",
    value: function getLatest() {
      return this.request({
        url: '/classic/latest'
      });
    }
  }, {
    key: "getClassic",
    value: function getClassic(index, previousOrNext) {
      return this.request({
        url: "/classic/".concat(index, "/").concat(previousOrNext)
      });
    }
  }, {
    key: "getMyFavor",
    value: function getMyFavor() {
      return this.request({
        url: '/classic/favor'
      });
    }
  }, {
    key: "isFirst",
    value: function isFirst(index) {
      return index === 1 ? true : false;
    }
  }, {
    key: "isLatest",
    value: function isLatest(index) {
      var latestIndex = this._getLatestIndex();

      return latestIndex === index;
    }
  }, {
    key: "_getKey",
    value: function _getKey(index) {
      return 'classic-' + index;
    }
  }, {
    key: "_setLatestIndex",
    value: function _setLatestIndex(index) {
      wx.setStorageSync('latest', index);
    }
  }, {
    key: "_getLatestIndex",
    value: function _getLatestIndex() {
      return wx.getStorageSync('latest');
    }
  }]);

  return ClassicModel;
}(HTTP);

module.exports = ClassicModel;