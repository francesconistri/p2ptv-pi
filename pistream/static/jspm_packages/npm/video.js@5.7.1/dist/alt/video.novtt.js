/* */ 
"format cjs";
(function(Buffer, process) {
  (function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = f();
    } else if (typeof define === "function" && define.amd) {
      define([], f);
    } else {
      var g;
      if (typeof window !== "undefined") {
        g = window;
      } else if (typeof global !== "undefined") {
        g = global;
      } else if (typeof self !== "undefined") {
        g = self;
      } else {
        g = this;
      }
      g.videojs = f();
    }
  })(function() {
    var define,
        module,
        exports;
    return (function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;
            if (!u && a)
              return a(o, !0);
            if (i)
              return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
          }
          var l = n[o] = {exports: {}};
          t[o][0].call(l.exports, function(e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
      }
      var i = typeof require == "function" && require;
      for (var o = 0; o < r.length; o++)
        s(r[o]);
      return s;
    })({
      1: [function(_dereq_, module, exports) {
        (function(global) {
          var topLevel = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
          var minDoc = _dereq_('min-document');
          if (typeof document !== 'undefined') {
            module.exports = document;
          } else {
            var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];
            if (!doccy) {
              doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
            }
            module.exports = doccy;
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {"min-document": 3}],
      2: [function(_dereq_, module, exports) {
        (function(global) {
          if (typeof window !== "undefined") {
            module.exports = window;
          } else if (typeof global !== "undefined") {
            module.exports = global;
          } else if (typeof self !== "undefined") {
            module.exports = self;
          } else {
            module.exports = {};
          }
        }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}],
      3: [function(_dereq_, module, exports) {}, {}],
      4: [function(_dereq_, module, exports) {
        var getNative = _dereq_('../internal/getNative');
        var nativeNow = getNative(Date, 'now');
        var now = nativeNow || function() {
          return new Date().getTime();
        };
        module.exports = now;
      }, {"../internal/getNative": 20}],
      5: [function(_dereq_, module, exports) {
        var isObject = _dereq_('../lang/isObject'),
            now = _dereq_('../date/now');
        var FUNC_ERROR_TEXT = 'Expected a function';
        var nativeMax = Math.max;
        function debounce(func, wait, options) {
          var args,
              maxTimeoutId,
              result,
              stamp,
              thisArg,
              timeoutId,
              trailingCall,
              lastCalled = 0,
              maxWait = false,
              trailing = true;
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          wait = wait < 0 ? 0 : (+wait || 0);
          if (options === true) {
            var leading = true;
            trailing = false;
          } else if (isObject(options)) {
            leading = !!options.leading;
            maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
            trailing = 'trailing' in options ? !!options.trailing : trailing;
          }
          function cancel() {
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            if (maxTimeoutId) {
              clearTimeout(maxTimeoutId);
            }
            lastCalled = 0;
            maxTimeoutId = timeoutId = trailingCall = undefined;
          }
          function complete(isCalled, id) {
            if (id) {
              clearTimeout(id);
            }
            maxTimeoutId = timeoutId = trailingCall = undefined;
            if (isCalled) {
              lastCalled = now();
              result = func.apply(thisArg, args);
              if (!timeoutId && !maxTimeoutId) {
                args = thisArg = undefined;
              }
            }
          }
          function delayed() {
            var remaining = wait - (now() - stamp);
            if (remaining <= 0 || remaining > wait) {
              complete(trailingCall, maxTimeoutId);
            } else {
              timeoutId = setTimeout(delayed, remaining);
            }
          }
          function maxDelayed() {
            complete(trailing, timeoutId);
          }
          function debounced() {
            args = arguments;
            stamp = now();
            thisArg = this;
            trailingCall = trailing && (timeoutId || !leading);
            if (maxWait === false) {
              var leadingCall = leading && !timeoutId;
            } else {
              if (!maxTimeoutId && !leading) {
                lastCalled = stamp;
              }
              var remaining = maxWait - (stamp - lastCalled),
                  isCalled = remaining <= 0 || remaining > maxWait;
              if (isCalled) {
                if (maxTimeoutId) {
                  maxTimeoutId = clearTimeout(maxTimeoutId);
                }
                lastCalled = stamp;
                result = func.apply(thisArg, args);
              } else if (!maxTimeoutId) {
                maxTimeoutId = setTimeout(maxDelayed, remaining);
              }
            }
            if (isCalled && timeoutId) {
              timeoutId = clearTimeout(timeoutId);
            } else if (!timeoutId && wait !== maxWait) {
              timeoutId = setTimeout(delayed, wait);
            }
            if (leadingCall) {
              isCalled = true;
              result = func.apply(thisArg, args);
            }
            if (isCalled && !timeoutId && !maxTimeoutId) {
              args = thisArg = undefined;
            }
            return result;
          }
          debounced.cancel = cancel;
          return debounced;
        }
        module.exports = debounce;
      }, {
        "../date/now": 4,
        "../lang/isObject": 33
      }],
      6: [function(_dereq_, module, exports) {
        var FUNC_ERROR_TEXT = 'Expected a function';
        var nativeMax = Math.max;
        function restParam(func, start) {
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
          return function() {
            var args = arguments,
                index = -1,
                length = nativeMax(args.length - start, 0),
                rest = Array(length);
            while (++index < length) {
              rest[index] = args[start + index];
            }
            switch (start) {
              case 0:
                return func.call(this, rest);
              case 1:
                return func.call(this, args[0], rest);
              case 2:
                return func.call(this, args[0], args[1], rest);
            }
            var otherArgs = Array(start + 1);
            index = -1;
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = rest;
            return func.apply(this, otherArgs);
          };
        }
        module.exports = restParam;
      }, {}],
      7: [function(_dereq_, module, exports) {
        var debounce = _dereq_('./debounce'),
            isObject = _dereq_('../lang/isObject');
        var FUNC_ERROR_TEXT = 'Expected a function';
        function throttle(func, wait, options) {
          var leading = true,
              trailing = true;
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (options === false) {
            leading = false;
          } else if (isObject(options)) {
            leading = 'leading' in options ? !!options.leading : leading;
            trailing = 'trailing' in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            'leading': leading,
            'maxWait': +wait,
            'trailing': trailing
          });
        }
        module.exports = throttle;
      }, {
        "../lang/isObject": 33,
        "./debounce": 5
      }],
      8: [function(_dereq_, module, exports) {
        function arrayCopy(source, array) {
          var index = -1,
              length = source.length;
          array || (array = Array(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        module.exports = arrayCopy;
      }, {}],
      9: [function(_dereq_, module, exports) {
        function arrayEach(array, iteratee) {
          var index = -1,
              length = array.length;
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        module.exports = arrayEach;
      }, {}],
      10: [function(_dereq_, module, exports) {
        function baseCopy(source, props, object) {
          object || (object = {});
          var index = -1,
              length = props.length;
          while (++index < length) {
            var key = props[index];
            object[key] = source[key];
          }
          return object;
        }
        module.exports = baseCopy;
      }, {}],
      11: [function(_dereq_, module, exports) {
        var createBaseFor = _dereq_('./createBaseFor');
        var baseFor = createBaseFor();
        module.exports = baseFor;
      }, {"./createBaseFor": 18}],
      12: [function(_dereq_, module, exports) {
        var baseFor = _dereq_('./baseFor'),
            keysIn = _dereq_('../object/keysIn');
        function baseForIn(object, iteratee) {
          return baseFor(object, iteratee, keysIn);
        }
        module.exports = baseForIn;
      }, {
        "../object/keysIn": 39,
        "./baseFor": 11
      }],
      13: [function(_dereq_, module, exports) {
        var arrayEach = _dereq_('./arrayEach'),
            baseMergeDeep = _dereq_('./baseMergeDeep'),
            isArray = _dereq_('../lang/isArray'),
            isArrayLike = _dereq_('./isArrayLike'),
            isObject = _dereq_('../lang/isObject'),
            isObjectLike = _dereq_('./isObjectLike'),
            isTypedArray = _dereq_('../lang/isTypedArray'),
            keys = _dereq_('../object/keys');
        function baseMerge(object, source, customizer, stackA, stackB) {
          if (!isObject(object)) {
            return object;
          }
          var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
              props = isSrcArr ? undefined : keys(source);
          arrayEach(props || source, function(srcValue, key) {
            if (props) {
              key = srcValue;
              srcValue = source[key];
            }
            if (isObjectLike(srcValue)) {
              stackA || (stackA = []);
              stackB || (stackB = []);
              baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
            } else {
              var value = object[key],
                  result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
                  isCommon = result === undefined;
              if (isCommon) {
                result = srcValue;
              }
              if ((result !== undefined || (isSrcArr && !(key in object))) && (isCommon || (result === result ? (result !== value) : (value === value)))) {
                object[key] = result;
              }
            }
          });
          return object;
        }
        module.exports = baseMerge;
      }, {
        "../lang/isArray": 30,
        "../lang/isObject": 33,
        "../lang/isTypedArray": 36,
        "../object/keys": 38,
        "./arrayEach": 9,
        "./baseMergeDeep": 14,
        "./isArrayLike": 21,
        "./isObjectLike": 26
      }],
      14: [function(_dereq_, module, exports) {
        var arrayCopy = _dereq_('./arrayCopy'),
            isArguments = _dereq_('../lang/isArguments'),
            isArray = _dereq_('../lang/isArray'),
            isArrayLike = _dereq_('./isArrayLike'),
            isPlainObject = _dereq_('../lang/isPlainObject'),
            isTypedArray = _dereq_('../lang/isTypedArray'),
            toPlainObject = _dereq_('../lang/toPlainObject');
        function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
          var length = stackA.length,
              srcValue = source[key];
          while (length--) {
            if (stackA[length] == srcValue) {
              object[key] = stackB[length];
              return;
            }
          }
          var value = object[key],
              result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
              isCommon = result === undefined;
          if (isCommon) {
            result = srcValue;
            if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
              result = isArray(value) ? value : (isArrayLike(value) ? arrayCopy(value) : []);
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              result = isArguments(value) ? toPlainObject(value) : (isPlainObject(value) ? value : {});
            } else {
              isCommon = false;
            }
          }
          stackA.push(srcValue);
          stackB.push(result);
          if (isCommon) {
            object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
          } else if (result === result ? (result !== value) : (value === value)) {
            object[key] = result;
          }
        }
        module.exports = baseMergeDeep;
      }, {
        "../lang/isArguments": 29,
        "../lang/isArray": 30,
        "../lang/isPlainObject": 34,
        "../lang/isTypedArray": 36,
        "../lang/toPlainObject": 37,
        "./arrayCopy": 8,
        "./isArrayLike": 21
      }],
      15: [function(_dereq_, module, exports) {
        var toObject = _dereq_('./toObject');
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined : toObject(object)[key];
          };
        }
        module.exports = baseProperty;
      }, {"./toObject": 28}],
      16: [function(_dereq_, module, exports) {
        var identity = _dereq_('../utility/identity');
        function bindCallback(func, thisArg, argCount) {
          if (typeof func != 'function') {
            return identity;
          }
          if (thisArg === undefined) {
            return func;
          }
          switch (argCount) {
            case 1:
              return function(value) {
                return func.call(thisArg, value);
              };
            case 3:
              return function(value, index, collection) {
                return func.call(thisArg, value, index, collection);
              };
            case 4:
              return function(accumulator, value, index, collection) {
                return func.call(thisArg, accumulator, value, index, collection);
              };
            case 5:
              return function(value, other, key, object, source) {
                return func.call(thisArg, value, other, key, object, source);
              };
          }
          return function() {
            return func.apply(thisArg, arguments);
          };
        }
        module.exports = bindCallback;
      }, {"../utility/identity": 42}],
      17: [function(_dereq_, module, exports) {
        var bindCallback = _dereq_('./bindCallback'),
            isIterateeCall = _dereq_('./isIterateeCall'),
            restParam = _dereq_('../function/restParam');
        function createAssigner(assigner) {
          return restParam(function(object, sources) {
            var index = -1,
                length = object == null ? 0 : sources.length,
                customizer = length > 2 ? sources[length - 2] : undefined,
                guard = length > 2 ? sources[2] : undefined,
                thisArg = length > 1 ? sources[length - 1] : undefined;
            if (typeof customizer == 'function') {
              customizer = bindCallback(customizer, thisArg, 5);
              length -= 2;
            } else {
              customizer = typeof thisArg == 'function' ? thisArg : undefined;
              length -= (customizer ? 1 : 0);
            }
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined : customizer;
              length = 1;
            }
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, customizer);
              }
            }
            return object;
          });
        }
        module.exports = createAssigner;
      }, {
        "../function/restParam": 6,
        "./bindCallback": 16,
        "./isIterateeCall": 24
      }],
      18: [function(_dereq_, module, exports) {
        var toObject = _dereq_('./toObject');
        function createBaseFor(fromRight) {
          return function(object, iteratee, keysFunc) {
            var iterable = toObject(object),
                props = keysFunc(object),
                length = props.length,
                index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length)) {
              var key = props[index];
              if (iteratee(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        module.exports = createBaseFor;
      }, {"./toObject": 28}],
      19: [function(_dereq_, module, exports) {
        var baseProperty = _dereq_('./baseProperty');
        var getLength = baseProperty('length');
        module.exports = getLength;
      }, {"./baseProperty": 15}],
      20: [function(_dereq_, module, exports) {
        var isNative = _dereq_('../lang/isNative');
        function getNative(object, key) {
          var value = object == null ? undefined : object[key];
          return isNative(value) ? value : undefined;
        }
        module.exports = getNative;
      }, {"../lang/isNative": 32}],
      21: [function(_dereq_, module, exports) {
        var getLength = _dereq_('./getLength'),
            isLength = _dereq_('./isLength');
        function isArrayLike(value) {
          return value != null && isLength(getLength(value));
        }
        module.exports = isArrayLike;
      }, {
        "./getLength": 19,
        "./isLength": 25
      }],
      22: [function(_dereq_, module, exports) {
        var isHostObject = (function() {
          try {
            Object({'toString': 0} + '');
          } catch (e) {
            return function() {
              return false;
            };
          }
          return function(value) {
            return typeof value.toString != 'function' && typeof(value + '') == 'string';
          };
        }());
        module.exports = isHostObject;
      }, {}],
      23: [function(_dereq_, module, exports) {
        var reIsUint = /^\d+$/;
        var MAX_SAFE_INTEGER = 9007199254740991;
        function isIndex(value, length) {
          value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return value > -1 && value % 1 == 0 && value < length;
        }
        module.exports = isIndex;
      }, {}],
      24: [function(_dereq_, module, exports) {
        var isArrayLike = _dereq_('./isArrayLike'),
            isIndex = _dereq_('./isIndex'),
            isObject = _dereq_('../lang/isObject');
        function isIterateeCall(value, index, object) {
          if (!isObject(object)) {
            return false;
          }
          var type = typeof index;
          if (type == 'number' ? (isArrayLike(object) && isIndex(index, object.length)) : (type == 'string' && index in object)) {
            var other = object[index];
            return value === value ? (value === other) : (other !== other);
          }
          return false;
        }
        module.exports = isIterateeCall;
      }, {
        "../lang/isObject": 33,
        "./isArrayLike": 21,
        "./isIndex": 23
      }],
      25: [function(_dereq_, module, exports) {
        var MAX_SAFE_INTEGER = 9007199254740991;
        function isLength(value) {
          return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        module.exports = isLength;
      }, {}],
      26: [function(_dereq_, module, exports) {
        function isObjectLike(value) {
          return !!value && typeof value == 'object';
        }
        module.exports = isObjectLike;
      }, {}],
      27: [function(_dereq_, module, exports) {
        var isArguments = _dereq_('../lang/isArguments'),
            isArray = _dereq_('../lang/isArray'),
            isIndex = _dereq_('./isIndex'),
            isLength = _dereq_('./isLength'),
            isString = _dereq_('../lang/isString'),
            keysIn = _dereq_('../object/keysIn');
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        function shimKeys(object) {
          var props = keysIn(object),
              propsLength = props.length,
              length = propsLength && object.length;
          var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object) || isString(object));
          var index = -1,
              result = [];
          while (++index < propsLength) {
            var key = props[index];
            if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
              result.push(key);
            }
          }
          return result;
        }
        module.exports = shimKeys;
      }, {
        "../lang/isArguments": 29,
        "../lang/isArray": 30,
        "../lang/isString": 35,
        "../object/keysIn": 39,
        "./isIndex": 23,
        "./isLength": 25
      }],
      28: [function(_dereq_, module, exports) {
        var isObject = _dereq_('../lang/isObject'),
            isString = _dereq_('../lang/isString'),
            support = _dereq_('../support');
        function toObject(value) {
          if (support.unindexedChars && isString(value)) {
            var index = -1,
                length = value.length,
                result = Object(value);
            while (++index < length) {
              result[index] = value.charAt(index);
            }
            return result;
          }
          return isObject(value) ? value : Object(value);
        }
        module.exports = toObject;
      }, {
        "../lang/isObject": 33,
        "../lang/isString": 35,
        "../support": 41
      }],
      29: [function(_dereq_, module, exports) {
        var isArrayLike = _dereq_('../internal/isArrayLike'),
            isObjectLike = _dereq_('../internal/isObjectLike');
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var propertyIsEnumerable = objectProto.propertyIsEnumerable;
        function isArguments(value) {
          return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
        }
        module.exports = isArguments;
      }, {
        "../internal/isArrayLike": 21,
        "../internal/isObjectLike": 26
      }],
      30: [function(_dereq_, module, exports) {
        var getNative = _dereq_('../internal/getNative'),
            isLength = _dereq_('../internal/isLength'),
            isObjectLike = _dereq_('../internal/isObjectLike');
        var arrayTag = '[object Array]';
        var objectProto = Object.prototype;
        var objToString = objectProto.toString;
        var nativeIsArray = getNative(Array, 'isArray');
        var isArray = nativeIsArray || function(value) {
          return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
        };
        module.exports = isArray;
      }, {
        "../internal/getNative": 20,
        "../internal/isLength": 25,
        "../internal/isObjectLike": 26
      }],
      31: [function(_dereq_, module, exports) {
        var isObject = _dereq_('./isObject');
        var funcTag = '[object Function]';
        var objectProto = Object.prototype;
        var objToString = objectProto.toString;
        function isFunction(value) {
          return isObject(value) && objToString.call(value) == funcTag;
        }
        module.exports = isFunction;
      }, {"./isObject": 33}],
      32: [function(_dereq_, module, exports) {
        var isFunction = _dereq_('./isFunction'),
            isHostObject = _dereq_('../internal/isHostObject'),
            isObjectLike = _dereq_('../internal/isObjectLike');
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var objectProto = Object.prototype;
        var fnToString = Function.prototype.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
        function isNative(value) {
          if (value == null) {
            return false;
          }
          if (isFunction(value)) {
            return reIsNative.test(fnToString.call(value));
          }
          return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
        }
        module.exports = isNative;
      }, {
        "../internal/isHostObject": 22,
        "../internal/isObjectLike": 26,
        "./isFunction": 31
      }],
      33: [function(_dereq_, module, exports) {
        function isObject(value) {
          var type = typeof value;
          return !!value && (type == 'object' || type == 'function');
        }
        module.exports = isObject;
      }, {}],
      34: [function(_dereq_, module, exports) {
        var baseForIn = _dereq_('../internal/baseForIn'),
            isArguments = _dereq_('./isArguments'),
            isHostObject = _dereq_('../internal/isHostObject'),
            isObjectLike = _dereq_('../internal/isObjectLike'),
            support = _dereq_('../support');
        var objectTag = '[object Object]';
        var objectProto = Object.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var objToString = objectProto.toString;
        function isPlainObject(value) {
          var Ctor;
          if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isHostObject(value) && !isArguments(value)) || (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
            return false;
          }
          var result;
          if (support.ownLast) {
            baseForIn(value, function(subValue, key, object) {
              result = hasOwnProperty.call(object, key);
              return false;
            });
            return result !== false;
          }
          baseForIn(value, function(subValue, key) {
            result = key;
          });
          return result === undefined || hasOwnProperty.call(value, result);
        }
        module.exports = isPlainObject;
      }, {
        "../internal/baseForIn": 12,
        "../internal/isHostObject": 22,
        "../internal/isObjectLike": 26,
        "../support": 41,
        "./isArguments": 29
      }],
      35: [function(_dereq_, module, exports) {
        var isObjectLike = _dereq_('../internal/isObjectLike');
        var stringTag = '[object String]';
        var objectProto = Object.prototype;
        var objToString = objectProto.toString;
        function isString(value) {
          return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
        }
        module.exports = isString;
      }, {"../internal/isObjectLike": 26}],
      36: [function(_dereq_, module, exports) {
        var isLength = _dereq_('../internal/isLength'),
            isObjectLike = _dereq_('../internal/isObjectLike');
        var argsTag = '[object Arguments]',
            arrayTag = '[object Array]',
            boolTag = '[object Boolean]',
            dateTag = '[object Date]',
            errorTag = '[object Error]',
            funcTag = '[object Function]',
            mapTag = '[object Map]',
            numberTag = '[object Number]',
            objectTag = '[object Object]',
            regexpTag = '[object RegExp]',
            setTag = '[object Set]',
            stringTag = '[object String]',
            weakMapTag = '[object WeakMap]';
        var arrayBufferTag = '[object ArrayBuffer]',
            float32Tag = '[object Float32Array]',
            float64Tag = '[object Float64Array]',
            int8Tag = '[object Int8Array]',
            int16Tag = '[object Int16Array]',
            int32Tag = '[object Int32Array]',
            uint8Tag = '[object Uint8Array]',
            uint8ClampedTag = '[object Uint8ClampedArray]',
            uint16Tag = '[object Uint16Array]',
            uint32Tag = '[object Uint32Array]';
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var objectProto = Object.prototype;
        var objToString = objectProto.toString;
        function isTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
        }
        module.exports = isTypedArray;
      }, {
        "../internal/isLength": 25,
        "../internal/isObjectLike": 26
      }],
      37: [function(_dereq_, module, exports) {
        var baseCopy = _dereq_('../internal/baseCopy'),
            keysIn = _dereq_('../object/keysIn');
        function toPlainObject(value) {
          return baseCopy(value, keysIn(value));
        }
        module.exports = toPlainObject;
      }, {
        "../internal/baseCopy": 10,
        "../object/keysIn": 39
      }],
      38: [function(_dereq_, module, exports) {
        var getNative = _dereq_('../internal/getNative'),
            isArrayLike = _dereq_('../internal/isArrayLike'),
            isObject = _dereq_('../lang/isObject'),
            shimKeys = _dereq_('../internal/shimKeys'),
            support = _dereq_('../support');
        var nativeKeys = getNative(Object, 'keys');
        var keys = !nativeKeys ? shimKeys : function(object) {
          var Ctor = object == null ? undefined : object.constructor;
          if ((typeof Ctor == 'function' && Ctor.prototype === object) || (typeof object == 'function' ? support.enumPrototypes : isArrayLike(object))) {
            return shimKeys(object);
          }
          return isObject(object) ? nativeKeys(object) : [];
        };
        module.exports = keys;
      }, {
        "../internal/getNative": 20,
        "../internal/isArrayLike": 21,
        "../internal/shimKeys": 27,
        "../lang/isObject": 33,
        "../support": 41
      }],
      39: [function(_dereq_, module, exports) {
        var arrayEach = _dereq_('../internal/arrayEach'),
            isArguments = _dereq_('../lang/isArguments'),
            isArray = _dereq_('../lang/isArray'),
            isFunction = _dereq_('../lang/isFunction'),
            isIndex = _dereq_('../internal/isIndex'),
            isLength = _dereq_('../internal/isLength'),
            isObject = _dereq_('../lang/isObject'),
            isString = _dereq_('../lang/isString'),
            support = _dereq_('../support');
        var arrayTag = '[object Array]',
            boolTag = '[object Boolean]',
            dateTag = '[object Date]',
            errorTag = '[object Error]',
            funcTag = '[object Function]',
            numberTag = '[object Number]',
            objectTag = '[object Object]',
            regexpTag = '[object RegExp]',
            stringTag = '[object String]';
        var shadowProps = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
        var errorProto = Error.prototype,
            objectProto = Object.prototype,
            stringProto = String.prototype;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var objToString = objectProto.toString;
        var nonEnumProps = {};
        nonEnumProps[arrayTag] = nonEnumProps[dateTag] = nonEnumProps[numberTag] = {
          'constructor': true,
          'toLocaleString': true,
          'toString': true,
          'valueOf': true
        };
        nonEnumProps[boolTag] = nonEnumProps[stringTag] = {
          'constructor': true,
          'toString': true,
          'valueOf': true
        };
        nonEnumProps[errorTag] = nonEnumProps[funcTag] = nonEnumProps[regexpTag] = {
          'constructor': true,
          'toString': true
        };
        nonEnumProps[objectTag] = {'constructor': true};
        arrayEach(shadowProps, function(key) {
          for (var tag in nonEnumProps) {
            if (hasOwnProperty.call(nonEnumProps, tag)) {
              var props = nonEnumProps[tag];
              props[key] = hasOwnProperty.call(props, key);
            }
          }
        });
        function keysIn(object) {
          if (object == null) {
            return [];
          }
          if (!isObject(object)) {
            object = Object(object);
          }
          var length = object.length;
          length = (length && isLength(length) && (isArray(object) || isArguments(object) || isString(object)) && length) || 0;
          var Ctor = object.constructor,
              index = -1,
              proto = (isFunction(Ctor) && Ctor.prototype) || objectProto,
              isProto = proto === object,
              result = Array(length),
              skipIndexes = length > 0,
              skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error),
              skipProto = support.enumPrototypes && isFunction(object);
          while (++index < length) {
            result[index] = (index + '');
          }
          for (var key in object) {
            if (!(skipProto && key == 'prototype') && !(skipErrorProps && (key == 'message' || key == 'name')) && !(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
              result.push(key);
            }
          }
          if (support.nonEnumShadows && object !== objectProto) {
            var tag = object === stringProto ? stringTag : (object === errorProto ? errorTag : objToString.call(object)),
                nonEnums = nonEnumProps[tag] || nonEnumProps[objectTag];
            if (tag == objectTag) {
              proto = objectProto;
            }
            length = shadowProps.length;
            while (length--) {
              key = shadowProps[length];
              var nonEnum = nonEnums[key];
              if (!(isProto && nonEnum) && (nonEnum ? hasOwnProperty.call(object, key) : object[key] !== proto[key])) {
                result.push(key);
              }
            }
          }
          return result;
        }
        module.exports = keysIn;
      }, {
        "../internal/arrayEach": 9,
        "../internal/isIndex": 23,
        "../internal/isLength": 25,
        "../lang/isArguments": 29,
        "../lang/isArray": 30,
        "../lang/isFunction": 31,
        "../lang/isObject": 33,
        "../lang/isString": 35,
        "../support": 41
      }],
      40: [function(_dereq_, module, exports) {
        var baseMerge = _dereq_('../internal/baseMerge'),
            createAssigner = _dereq_('../internal/createAssigner');
        var merge = createAssigner(baseMerge);
        module.exports = merge;
      }, {
        "../internal/baseMerge": 13,
        "../internal/createAssigner": 17
      }],
      41: [function(_dereq_, module, exports) {
        var arrayProto = Array.prototype,
            errorProto = Error.prototype,
            objectProto = Object.prototype;
        var propertyIsEnumerable = objectProto.propertyIsEnumerable,
            splice = arrayProto.splice;
        var support = {};
        (function(x) {
          var Ctor = function() {
            this.x = x;
          },
              object = {
                '0': x,
                'length': x
              },
              props = [];
          Ctor.prototype = {
            'valueOf': x,
            'y': x
          };
          for (var key in new Ctor) {
            props.push(key);
          }
          support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');
          support.enumPrototypes = propertyIsEnumerable.call(Ctor, 'prototype');
          support.nonEnumShadows = !/valueOf/.test(props);
          support.ownLast = props[0] != 'x';
          support.spliceObjects = (splice.call(object, 0, 1), !object[0]);
          support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';
        }(1, 0));
        module.exports = support;
      }, {}],
      42: [function(_dereq_, module, exports) {
        function identity(value) {
          return value;
        }
        module.exports = identity;
      }, {}],
      43: [function(_dereq_, module, exports) {
        'use strict';
        var keys = _dereq_('object-keys');
        module.exports = function hasSymbols() {
          if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
            return false;
          }
          if (typeof Symbol.iterator === 'symbol') {
            return true;
          }
          var obj = {};
          var sym = Symbol('test');
          if (typeof sym === 'string') {
            return false;
          }
          var symVal = 42;
          obj[sym] = symVal;
          for (sym in obj) {
            return false;
          }
          if (keys(obj).length !== 0) {
            return false;
          }
          if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
            return false;
          }
          if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
            return false;
          }
          var syms = Object.getOwnPropertySymbols(obj);
          if (syms.length !== 1 || syms[0] !== sym) {
            return false;
          }
          if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
            return false;
          }
          if (typeof Object.getOwnPropertyDescriptor === 'function') {
            var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
            if (descriptor.value !== symVal || descriptor.enumerable !== true) {
              return false;
            }
          }
          return true;
        };
      }, {"object-keys": 49}],
      44: [function(_dereq_, module, exports) {
        'use strict';
        var keys = _dereq_('object-keys');
        var bind = _dereq_('function-bind');
        var canBeObject = function(obj) {
          return typeof obj !== 'undefined' && obj !== null;
        };
        var hasSymbols = _dereq_('./hasSymbols')();
        var toObject = Object;
        var push = bind.call(Function.call, Array.prototype.push);
        var propIsEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);
        module.exports = function assign(target, source1) {
          if (!canBeObject(target)) {
            throw new TypeError('target must be an object');
          }
          var objTarget = toObject(target);
          var s,
              source,
              i,
              props,
              syms,
              value,
              key;
          for (s = 1; s < arguments.length; ++s) {
            source = toObject(arguments[s]);
            props = keys(source);
            if (hasSymbols && Object.getOwnPropertySymbols) {
              syms = Object.getOwnPropertySymbols(source);
              for (i = 0; i < syms.length; ++i) {
                key = syms[i];
                if (propIsEnumerable(source, key)) {
                  push(props, key);
                }
              }
            }
            for (i = 0; i < props.length; ++i) {
              key = props[i];
              value = source[key];
              if (propIsEnumerable(source, key)) {
                objTarget[key] = value;
              }
            }
          }
          return objTarget;
        };
      }, {
        "./hasSymbols": 43,
        "function-bind": 48,
        "object-keys": 49
      }],
      45: [function(_dereq_, module, exports) {
        'use strict';
        var defineProperties = _dereq_('define-properties');
        var implementation = _dereq_('./implementation');
        var getPolyfill = _dereq_('./polyfill');
        var shim = _dereq_('./shim');
        defineProperties(implementation, {
          implementation: implementation,
          getPolyfill: getPolyfill,
          shim: shim
        });
        module.exports = implementation;
      }, {
        "./implementation": 44,
        "./polyfill": 51,
        "./shim": 52,
        "define-properties": 46
      }],
      46: [function(_dereq_, module, exports) {
        'use strict';
        var keys = _dereq_('object-keys');
        var foreach = _dereq_('foreach');
        var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
        var toStr = Object.prototype.toString;
        var isFunction = function(fn) {
          return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
        };
        var arePropertyDescriptorsSupported = function() {
          var obj = {};
          try {
            Object.defineProperty(obj, 'x', {
              enumerable: false,
              value: obj
            });
            for (var _ in obj) {
              return false;
            }
            return obj.x === obj;
          } catch (e) {
            return false;
          }
        };
        var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();
        var defineProperty = function(object, name, value, predicate) {
          if (name in object && (!isFunction(predicate) || !predicate())) {
            return;
          }
          if (supportsDescriptors) {
            Object.defineProperty(object, name, {
              configurable: true,
              enumerable: false,
              value: value,
              writable: true
            });
          } else {
            object[name] = value;
          }
        };
        var defineProperties = function(object, map) {
          var predicates = arguments.length > 2 ? arguments[2] : {};
          var props = keys(map);
          if (hasSymbols) {
            props = props.concat(Object.getOwnPropertySymbols(map));
          }
          foreach(props, function(name) {
            defineProperty(object, name, map[name], predicates[name]);
          });
        };
        defineProperties.supportsDescriptors = !!supportsDescriptors;
        module.exports = defineProperties;
      }, {
        "foreach": 47,
        "object-keys": 49
      }],
      47: [function(_dereq_, module, exports) {
        var hasOwn = Object.prototype.hasOwnProperty;
        var toString = Object.prototype.toString;
        module.exports = function forEach(obj, fn, ctx) {
          if (toString.call(fn) !== '[object Function]') {
            throw new TypeError('iterator must be a function');
          }
          var l = obj.length;
          if (l === +l) {
            for (var i = 0; i < l; i++) {
              fn.call(ctx, obj[i], i, obj);
            }
          } else {
            for (var k in obj) {
              if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
              }
            }
          }
        };
      }, {}],
      48: [function(_dereq_, module, exports) {
        var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
        var slice = Array.prototype.slice;
        var toStr = Object.prototype.toString;
        var funcType = '[object Function]';
        module.exports = function bind(that) {
          var target = this;
          if (typeof target !== 'function' || toStr.call(target) !== funcType) {
            throw new TypeError(ERROR_MESSAGE + target);
          }
          var args = slice.call(arguments, 1);
          var binder = function() {
            if (this instanceof bound) {
              var result = target.apply(this, args.concat(slice.call(arguments)));
              if (Object(result) === result) {
                return result;
              }
              return this;
            } else {
              return target.apply(that, args.concat(slice.call(arguments)));
            }
          };
          var boundLength = Math.max(0, target.length - args.length);
          var boundArgs = [];
          for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
          }
          var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);
          if (target.prototype) {
            var Empty = function Empty() {};
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            Empty.prototype = null;
          }
          return bound;
        };
      }, {}],
      49: [function(_dereq_, module, exports) {
        'use strict';
        var has = Object.prototype.hasOwnProperty;
        var toStr = Object.prototype.toString;
        var slice = Array.prototype.slice;
        var isArgs = _dereq_('./isArguments');
        var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString');
        var hasProtoEnumBug = function() {}.propertyIsEnumerable('prototype');
        var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
        var equalsConstructorPrototype = function(o) {
          var ctor = o.constructor;
          return ctor && ctor.prototype === o;
        };
        var blacklistedKeys = {
          $console: true,
          $frame: true,
          $frameElement: true,
          $frames: true,
          $parent: true,
          $self: true,
          $webkitIndexedDB: true,
          $webkitStorageInfo: true,
          $window: true
        };
        var hasAutomationEqualityBug = (function() {
          if (typeof window === 'undefined') {
            return false;
          }
          for (var k in window) {
            try {
              if (!blacklistedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
                try {
                  equalsConstructorPrototype(window[k]);
                } catch (e) {
                  return true;
                }
              }
            } catch (e) {
              return true;
            }
          }
          return false;
        }());
        var equalsConstructorPrototypeIfNotBuggy = function(o) {
          if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(o);
          }
          try {
            return equalsConstructorPrototype(o);
          } catch (e) {
            return false;
          }
        };
        var keysShim = function keys(object) {
          var isObject = object !== null && typeof object === 'object';
          var isFunction = toStr.call(object) === '[object Function]';
          var isArguments = isArgs(object);
          var isString = isObject && toStr.call(object) === '[object String]';
          var theKeys = [];
          if (!isObject && !isFunction && !isArguments) {
            throw new TypeError('Object.keys called on a non-object');
          }
          var skipProto = hasProtoEnumBug && isFunction;
          if (isString && object.length > 0 && !has.call(object, 0)) {
            for (var i = 0; i < object.length; ++i) {
              theKeys.push(String(i));
            }
          }
          if (isArguments && object.length > 0) {
            for (var j = 0; j < object.length; ++j) {
              theKeys.push(String(j));
            }
          } else {
            for (var name in object) {
              if (!(skipProto && name === 'prototype') && has.call(object, name)) {
                theKeys.push(String(name));
              }
            }
          }
          if (hasDontEnumBug) {
            var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
            for (var k = 0; k < dontEnums.length; ++k) {
              if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
                theKeys.push(dontEnums[k]);
              }
            }
          }
          return theKeys;
        };
        keysShim.shim = function shimObjectKeys() {
          if (Object.keys) {
            var keysWorksWithArguments = (function() {
              return (Object.keys(arguments) || '').length === 2;
            }(1, 2));
            if (!keysWorksWithArguments) {
              var originalKeys = Object.keys;
              Object.keys = function keys(object) {
                if (isArgs(object)) {
                  return originalKeys(slice.call(object));
                } else {
                  return originalKeys(object);
                }
              };
            }
          } else {
            Object.keys = keysShim;
          }
          return Object.keys || keysShim;
        };
        module.exports = keysShim;
      }, {"./isArguments": 50}],
      50: [function(_dereq_, module, exports) {
        'use strict';
        var toStr = Object.prototype.toString;
        module.exports = function isArguments(value) {
          var str = toStr.call(value);
          var isArgs = str === '[object Arguments]';
          if (!isArgs) {
            isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
          }
          return isArgs;
        };
      }, {}],
      51: [function(_dereq_, module, exports) {
        'use strict';
        var implementation = _dereq_('./implementation');
        var lacksProperEnumerationOrder = function() {
          if (!Object.assign) {
            return false;
          }
          var str = 'abcdefghijklmnopqrst';
          var letters = str.split('');
          var map = {};
          for (var i = 0; i < letters.length; ++i) {
            map[letters[i]] = letters[i];
          }
          var obj = Object.assign({}, map);
          var actual = '';
          for (var k in obj) {
            actual += k;
          }
          return str !== actual;
        };
        var assignHasPendingExceptions = function() {
          if (!Object.assign || !Object.preventExtensions) {
            return false;
          }
          var thrower = Object.preventExtensions({1: 2});
          try {
            Object.assign(thrower, 'xy');
          } catch (e) {
            return thrower[1] === 'y';
          }
        };
        module.exports = function getPolyfill() {
          if (!Object.assign) {
            return implementation;
          }
          if (lacksProperEnumerationOrder()) {
            return implementation;
          }
          if (assignHasPendingExceptions()) {
            return implementation;
          }
          return Object.assign;
        };
      }, {"./implementation": 44}],
      52: [function(_dereq_, module, exports) {
        'use strict';
        var define = _dereq_('define-properties');
        var getPolyfill = _dereq_('./polyfill');
        module.exports = function shimAssign() {
          var polyfill = getPolyfill();
          define(Object, {assign: polyfill}, {assign: function() {
              return Object.assign !== polyfill;
            }});
          return polyfill;
        };
      }, {
        "./polyfill": 51,
        "define-properties": 46
      }],
      53: [function(_dereq_, module, exports) {
        module.exports = SafeParseTuple;
        function SafeParseTuple(obj, reviver) {
          var json;
          var error = null;
          try {
            json = JSON.parse(obj, reviver);
          } catch (err) {
            error = err;
          }
          return [error, json];
        }
      }, {}],
      54: [function(_dereq_, module, exports) {
        function clean(s) {
          return s.replace(/\n\r?\s*/g, '');
        }
        module.exports = function tsml(sa) {
          var s = '',
              i = 0;
          for (; i < arguments.length; i++)
            s += clean(sa[i]) + (arguments[i + 1] || '');
          return s;
        };
      }, {}],
      55: [function(_dereq_, module, exports) {
        "use strict";
        var window = _dereq_("global/window");
        var once = _dereq_("once");
        var isFunction = _dereq_("is-function");
        var parseHeaders = _dereq_("parse-headers");
        var xtend = _dereq_("xtend");
        module.exports = createXHR;
        createXHR.XMLHttpRequest = window.XMLHttpRequest || noop;
        createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest;
        forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
          createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
            options = initParams(uri, options, callback);
            options.method = method.toUpperCase();
            return _createXHR(options);
          };
        });
        function forEachArray(array, iterator) {
          for (var i = 0; i < array.length; i++) {
            iterator(array[i]);
          }
        }
        function isEmpty(obj) {
          for (var i in obj) {
            if (obj.hasOwnProperty(i))
              return false;
          }
          return true;
        }
        function initParams(uri, options, callback) {
          var params = uri;
          if (isFunction(options)) {
            callback = options;
            if (typeof uri === "string") {
              params = {uri: uri};
            }
          } else {
            params = xtend(options, {uri: uri});
          }
          params.callback = callback;
          return params;
        }
        function createXHR(uri, options, callback) {
          options = initParams(uri, options, callback);
          return _createXHR(options);
        }
        function _createXHR(options) {
          var callback = options.callback;
          if (typeof callback === "undefined") {
            throw new Error("callback argument missing");
          }
          callback = once(callback);
          function readystatechange() {
            if (xhr.readyState === 4) {
              loadFunc();
            }
          }
          function getBody() {
            var body = undefined;
            if (xhr.response) {
              body = xhr.response;
            } else if (xhr.responseType === "text" || !xhr.responseType) {
              body = xhr.responseText || xhr.responseXML;
            }
            if (isJson) {
              try {
                body = JSON.parse(body);
              } catch (e) {}
            }
            return body;
          }
          var failureResponse = {
            body: undefined,
            headers: {},
            statusCode: 0,
            method: method,
            url: uri,
            rawRequest: xhr
          };
          function errorFunc(evt) {
            clearTimeout(timeoutTimer);
            if (!(evt instanceof Error)) {
              evt = new Error("" + (evt || "Unknown XMLHttpRequest Error"));
            }
            evt.statusCode = 0;
            callback(evt, failureResponse);
          }
          function loadFunc() {
            if (aborted)
              return;
            var status;
            clearTimeout(timeoutTimer);
            if (options.useXDR && xhr.status === undefined) {
              status = 200;
            } else {
              status = (xhr.status === 1223 ? 204 : xhr.status);
            }
            var response = failureResponse;
            var err = null;
            if (status !== 0) {
              response = {
                body: getBody(),
                statusCode: status,
                method: method,
                headers: {},
                url: uri,
                rawRequest: xhr
              };
              if (xhr.getAllResponseHeaders) {
                response.headers = parseHeaders(xhr.getAllResponseHeaders());
              }
            } else {
              err = new Error("Internal XMLHttpRequest Error");
            }
            callback(err, response, response.body);
          }
          var xhr = options.xhr || null;
          if (!xhr) {
            if (options.cors || options.useXDR) {
              xhr = new createXHR.XDomainRequest();
            } else {
              xhr = new createXHR.XMLHttpRequest();
            }
          }
          var key;
          var aborted;
          var uri = xhr.url = options.uri || options.url;
          var method = xhr.method = options.method || "GET";
          var body = options.body || options.data || null;
          var headers = xhr.headers = options.headers || {};
          var sync = !!options.sync;
          var isJson = false;
          var timeoutTimer;
          if ("json" in options) {
            isJson = true;
            headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json");
            if (method !== "GET" && method !== "HEAD") {
              headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json");
              body = JSON.stringify(options.json);
            }
          }
          xhr.onreadystatechange = readystatechange;
          xhr.onload = loadFunc;
          xhr.onerror = errorFunc;
          xhr.onprogress = function() {};
          xhr.ontimeout = errorFunc;
          xhr.open(method, uri, !sync, options.username, options.password);
          if (!sync) {
            xhr.withCredentials = !!options.withCredentials;
          }
          if (!sync && options.timeout > 0) {
            timeoutTimer = setTimeout(function() {
              aborted = true;
              xhr.abort("timeout");
              var e = new Error("XMLHttpRequest timeout");
              e.code = "ETIMEDOUT";
              errorFunc(e);
            }, options.timeout);
          }
          if (xhr.setRequestHeader) {
            for (key in headers) {
              if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
              }
            }
          } else if (options.headers && !isEmpty(options.headers)) {
            throw new Error("Headers cannot be set on an XDomainRequest object");
          }
          if ("responseType" in options) {
            xhr.responseType = options.responseType;
          }
          if ("beforeSend" in options && typeof options.beforeSend === "function") {
            options.beforeSend(xhr);
          }
          xhr.send(body);
          return xhr;
        }
        function noop() {}
      }, {
        "global/window": 2,
        "is-function": 56,
        "once": 57,
        "parse-headers": 60,
        "xtend": 61
      }],
      56: [function(_dereq_, module, exports) {
        module.exports = isFunction;
        var toString = Object.prototype.toString;
        function isFunction(fn) {
          var string = toString.call(fn);
          return string === '[object Function]' || (typeof fn === 'function' && string !== '[object RegExp]') || (typeof window !== 'undefined' && (fn === window.setTimeout || fn === window.alert || fn === window.confirm || fn === window.prompt));
        }
        ;
      }, {}],
      57: [function(_dereq_, module, exports) {
        module.exports = once;
        once.proto = once(function() {
          Object.defineProperty(Function.prototype, 'once', {
            value: function() {
              return once(this);
            },
            configurable: true
          });
        });
        function once(fn) {
          var called = false;
          return function() {
            if (called)
              return;
            called = true;
            return fn.apply(this, arguments);
          };
        }
      }, {}],
      58: [function(_dereq_, module, exports) {
        var isFunction = _dereq_('is-function');
        module.exports = forEach;
        var toString = Object.prototype.toString;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        function forEach(list, iterator, context) {
          if (!isFunction(iterator)) {
            throw new TypeError('iterator must be a function');
          }
          if (arguments.length < 3) {
            context = this;
          }
          if (toString.call(list) === '[object Array]')
            forEachArray(list, iterator, context);
          else if (typeof list === 'string')
            forEachString(list, iterator, context);
          else
            forEachObject(list, iterator, context);
        }
        function forEachArray(array, iterator, context) {
          for (var i = 0,
              len = array.length; i < len; i++) {
            if (hasOwnProperty.call(array, i)) {
              iterator.call(context, array[i], i, array);
            }
          }
        }
        function forEachString(string, iterator, context) {
          for (var i = 0,
              len = string.length; i < len; i++) {
            iterator.call(context, string.charAt(i), i, string);
          }
        }
        function forEachObject(object, iterator, context) {
          for (var k in object) {
            if (hasOwnProperty.call(object, k)) {
              iterator.call(context, object[k], k, object);
            }
          }
        }
      }, {"is-function": 56}],
      59: [function(_dereq_, module, exports) {
        exports = module.exports = trim;
        function trim(str) {
          return str.replace(/^\s*|\s*$/g, '');
        }
        exports.left = function(str) {
          return str.replace(/^\s*/, '');
        };
        exports.right = function(str) {
          return str.replace(/\s*$/, '');
        };
      }, {}],
      60: [function(_dereq_, module, exports) {
        var trim = _dereq_('trim'),
            forEach = _dereq_('for-each'),
            isArray = function(arg) {
              return Object.prototype.toString.call(arg) === '[object Array]';
            };
        module.exports = function(headers) {
          if (!headers)
            return {};
          var result = {};
          forEach(trim(headers).split('\n'), function(row) {
            var index = row.indexOf(':'),
                key = trim(row.slice(0, index)).toLowerCase(),
                value = trim(row.slice(index + 1));
            if (typeof(result[key]) === 'undefined') {
              result[key] = value;
            } else if (isArray(result[key])) {
              result[key].push(value);
            } else {
              result[key] = [result[key], value];
            }
          });
          return result;
        };
      }, {
        "for-each": 58,
        "trim": 59
      }],
      61: [function(_dereq_, module, exports) {
        module.exports = extend;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        function extend() {
          var target = {};
          for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        }
      }, {}],
      62: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _buttonJs = _dereq_('./button.js');
        var _buttonJs2 = _interopRequireDefault(_buttonJs);
        var _componentJs = _dereq_('./component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var BigPlayButton = (function(_Button) {
          _inherits(BigPlayButton, _Button);
          function BigPlayButton(player, options) {
            _classCallCheck(this, BigPlayButton);
            _Button.call(this, player, options);
          }
          BigPlayButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-big-play-button';
          };
          BigPlayButton.prototype.handleClick = function handleClick() {
            this.player_.play();
          };
          return BigPlayButton;
        })(_buttonJs2['default']);
        BigPlayButton.prototype.controlText_ = 'Play Video';
        _componentJs2['default'].registerComponent('BigPlayButton', BigPlayButton);
        exports['default'] = BigPlayButton;
        module.exports = exports['default'];
      }, {
        "./button.js": 63,
        "./component.js": 66
      }],
      63: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _clickableComponentJs = _dereq_('./clickable-component.js');
        var _clickableComponentJs2 = _interopRequireDefault(_clickableComponentJs);
        var _component = _dereq_('./component');
        var _component2 = _interopRequireDefault(_component);
        var _utilsEventsJs = _dereq_('./utils/events.js');
        var Events = _interopRequireWildcard(_utilsEventsJs);
        var _utilsFnJs = _dereq_('./utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsLogJs = _dereq_('./utils/log.js');
        var _utilsLogJs2 = _interopRequireDefault(_utilsLogJs);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _objectAssign = _dereq_('object.assign');
        var _objectAssign2 = _interopRequireDefault(_objectAssign);
        var Button = (function(_ClickableComponent) {
          _inherits(Button, _ClickableComponent);
          function Button(player, options) {
            _classCallCheck(this, Button);
            _ClickableComponent.call(this, player, options);
          }
          Button.prototype.createEl = function createEl() {
            var tag = arguments.length <= 0 || arguments[0] === undefined ? 'button' : arguments[0];
            var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var attributes = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            props = _objectAssign2['default']({className: this.buildCSSClass()}, props);
            if (tag !== 'button') {
              _utilsLogJs2['default'].warn('Creating a Button with an HTML element of ' + tag + ' is deprecated; use ClickableComponent instead.');
            }
            attributes = _objectAssign2['default']({
              type: 'button',
              'aria-live': 'polite'
            }, attributes);
            var el = _component2['default'].prototype.createEl.call(this, tag, props, attributes);
            this.createControlTextEl(el);
            return el;
          };
          Button.prototype.addChild = function addChild(child) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var className = this.constructor.name;
            _utilsLogJs2['default'].warn('Adding an actionable (user controllable) child to a Button (' + className + ') is not supported; use a ClickableComponent instead.');
            return _component2['default'].prototype.addChild.call(this, child, options);
          };
          Button.prototype.handleKeyPress = function handleKeyPress(event) {
            if (event.which === 32 || event.which === 13) {} else {
              _ClickableComponent.prototype.handleKeyPress.call(this, event);
            }
          };
          return Button;
        })(_clickableComponentJs2['default']);
        _component2['default'].registerComponent('Button', Button);
        exports['default'] = Button;
        module.exports = exports['default'];
      }, {
        "./clickable-component.js": 64,
        "./component": 66,
        "./utils/events.js": 132,
        "./utils/fn.js": 133,
        "./utils/log.js": 136,
        "global/document": 1,
        "object.assign": 45
      }],
      64: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _component = _dereq_('./component');
        var _component2 = _interopRequireDefault(_component);
        var _utilsDomJs = _dereq_('./utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsEventsJs = _dereq_('./utils/events.js');
        var Events = _interopRequireWildcard(_utilsEventsJs);
        var _utilsFnJs = _dereq_('./utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsLogJs = _dereq_('./utils/log.js');
        var _utilsLogJs2 = _interopRequireDefault(_utilsLogJs);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _objectAssign = _dereq_('object.assign');
        var _objectAssign2 = _interopRequireDefault(_objectAssign);
        var ClickableComponent = (function(_Component) {
          _inherits(ClickableComponent, _Component);
          function ClickableComponent(player, options) {
            _classCallCheck(this, ClickableComponent);
            _Component.call(this, player, options);
            this.emitTapEvents();
            this.on('tap', this.handleClick);
            this.on('click', this.handleClick);
            this.on('focus', this.handleFocus);
            this.on('blur', this.handleBlur);
          }
          ClickableComponent.prototype.createEl = function createEl() {
            var tag = arguments.length <= 0 || arguments[0] === undefined ? 'div' : arguments[0];
            var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var attributes = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            props = _objectAssign2['default']({
              className: this.buildCSSClass(),
              tabIndex: 0
            }, props);
            if (tag === 'button') {
              _utilsLogJs2['default'].error('Creating a ClickableComponent with an HTML element of ' + tag + ' is not supported; use a Button instead.');
            }
            attributes = _objectAssign2['default']({
              role: 'button',
              'aria-live': 'polite'
            }, attributes);
            var el = _Component.prototype.createEl.call(this, tag, props, attributes);
            this.createControlTextEl(el);
            return el;
          };
          ClickableComponent.prototype.createControlTextEl = function createControlTextEl(el) {
            this.controlTextEl_ = Dom.createEl('span', {className: 'vjs-control-text'});
            if (el) {
              el.appendChild(this.controlTextEl_);
            }
            this.controlText(this.controlText_);
            return this.controlTextEl_;
          };
          ClickableComponent.prototype.controlText = function controlText(text) {
            if (!text)
              return this.controlText_ || 'Need Text';
            this.controlText_ = text;
            this.controlTextEl_.innerHTML = this.localize(this.controlText_);
            return this;
          };
          ClickableComponent.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-control vjs-button ' + _Component.prototype.buildCSSClass.call(this);
          };
          ClickableComponent.prototype.addChild = function addChild(child) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            return _Component.prototype.addChild.call(this, child, options);
          };
          ClickableComponent.prototype.handleClick = function handleClick() {};
          ClickableComponent.prototype.handleFocus = function handleFocus() {
            Events.on(_globalDocument2['default'], 'keydown', Fn.bind(this, this.handleKeyPress));
          };
          ClickableComponent.prototype.handleKeyPress = function handleKeyPress(event) {
            if (event.which === 32 || event.which === 13) {
              event.preventDefault();
              this.handleClick(event);
            } else if (_Component.prototype.handleKeyPress) {
              _Component.prototype.handleKeyPress.call(this, event);
            }
          };
          ClickableComponent.prototype.handleBlur = function handleBlur() {
            Events.off(_globalDocument2['default'], 'keydown', Fn.bind(this, this.handleKeyPress));
          };
          return ClickableComponent;
        })(_component2['default']);
        _component2['default'].registerComponent('ClickableComponent', ClickableComponent);
        exports['default'] = ClickableComponent;
        module.exports = exports['default'];
      }, {
        "./component": 66,
        "./utils/dom.js": 131,
        "./utils/events.js": 132,
        "./utils/fn.js": 133,
        "./utils/log.js": 136,
        "global/document": 1,
        "object.assign": 45
      }],
      65: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _button = _dereq_('./button');
        var _button2 = _interopRequireDefault(_button);
        var _component = _dereq_('./component');
        var _component2 = _interopRequireDefault(_component);
        var CloseButton = (function(_Button) {
          _inherits(CloseButton, _Button);
          function CloseButton(player, options) {
            _classCallCheck(this, CloseButton);
            _Button.call(this, player, options);
            this.controlText(options && options.controlText || this.localize('Close'));
          }
          CloseButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-close-button ' + _Button.prototype.buildCSSClass.call(this);
          };
          CloseButton.prototype.handleClick = function handleClick() {
            this.trigger({
              type: 'close',
              bubbles: false
            });
          };
          return CloseButton;
        })(_button2['default']);
        _component2['default'].registerComponent('CloseButton', CloseButton);
        exports['default'] = CloseButton;
        module.exports = exports['default'];
      }, {
        "./button": 63,
        "./component": 66
      }],
      66: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var _utilsDomJs = _dereq_('./utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsFnJs = _dereq_('./utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsGuidJs = _dereq_('./utils/guid.js');
        var Guid = _interopRequireWildcard(_utilsGuidJs);
        var _utilsEventsJs = _dereq_('./utils/events.js');
        var Events = _interopRequireWildcard(_utilsEventsJs);
        var _utilsLogJs = _dereq_('./utils/log.js');
        var _utilsLogJs2 = _interopRequireDefault(_utilsLogJs);
        var _utilsToTitleCaseJs = _dereq_('./utils/to-title-case.js');
        var _utilsToTitleCaseJs2 = _interopRequireDefault(_utilsToTitleCaseJs);
        var _objectAssign = _dereq_('object.assign');
        var _objectAssign2 = _interopRequireDefault(_objectAssign);
        var _utilsMergeOptionsJs = _dereq_('./utils/merge-options.js');
        var _utilsMergeOptionsJs2 = _interopRequireDefault(_utilsMergeOptionsJs);
        var Component = (function() {
          function Component(player, options, ready) {
            _classCallCheck(this, Component);
            if (!player && this.play) {
              this.player_ = player = this;
            } else {
              this.player_ = player;
            }
            this.options_ = _utilsMergeOptionsJs2['default']({}, this.options_);
            options = this.options_ = _utilsMergeOptionsJs2['default'](this.options_, options);
            this.id_ = options.id || options.el && options.el.id;
            if (!this.id_) {
              var id = player && player.id && player.id() || 'no_player';
              this.id_ = id + '_component_' + Guid.newGUID();
            }
            this.name_ = options.name || null;
            if (options.el) {
              this.el_ = options.el;
            } else if (options.createEl !== false) {
              this.el_ = this.createEl();
            }
            this.children_ = [];
            this.childIndex_ = {};
            this.childNameIndex_ = {};
            if (options.initChildren !== false) {
              this.initChildren();
            }
            this.ready(ready);
            if (options.reportTouchActivity !== false) {
              this.enableTouchActivity();
            }
          }
          Component.prototype.dispose = function dispose() {
            this.trigger({
              type: 'dispose',
              bubbles: false
            });
            if (this.children_) {
              for (var i = this.children_.length - 1; i >= 0; i--) {
                if (this.children_[i].dispose) {
                  this.children_[i].dispose();
                }
              }
            }
            this.children_ = null;
            this.childIndex_ = null;
            this.childNameIndex_ = null;
            this.off();
            if (this.el_.parentNode) {
              this.el_.parentNode.removeChild(this.el_);
            }
            Dom.removeElData(this.el_);
            this.el_ = null;
          };
          Component.prototype.player = function player() {
            return this.player_;
          };
          Component.prototype.options = function options(obj) {
            _utilsLogJs2['default'].warn('this.options() has been deprecated and will be moved to the constructor in 6.0');
            if (!obj) {
              return this.options_;
            }
            this.options_ = _utilsMergeOptionsJs2['default'](this.options_, obj);
            return this.options_;
          };
          Component.prototype.el = function el() {
            return this.el_;
          };
          Component.prototype.createEl = function createEl(tagName, properties, attributes) {
            return Dom.createEl(tagName, properties, attributes);
          };
          Component.prototype.localize = function localize(string) {
            var code = this.player_.language && this.player_.language();
            var languages = this.player_.languages && this.player_.languages();
            if (!code || !languages) {
              return string;
            }
            var language = languages[code];
            if (language && language[string]) {
              return language[string];
            }
            var primaryCode = code.split('-')[0];
            var primaryLang = languages[primaryCode];
            if (primaryLang && primaryLang[string]) {
              return primaryLang[string];
            }
            return string;
          };
          Component.prototype.contentEl = function contentEl() {
            return this.contentEl_ || this.el_;
          };
          Component.prototype.id = function id() {
            return this.id_;
          };
          Component.prototype.name = function name() {
            return this.name_;
          };
          Component.prototype.children = function children() {
            return this.children_;
          };
          Component.prototype.getChildById = function getChildById(id) {
            return this.childIndex_[id];
          };
          Component.prototype.getChild = function getChild(name) {
            return this.childNameIndex_[name];
          };
          Component.prototype.addChild = function addChild(child) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var index = arguments.length <= 2 || arguments[2] === undefined ? this.children_.length : arguments[2];
            var component = undefined;
            var componentName = undefined;
            if (typeof child === 'string') {
              componentName = child;
              if (!options) {
                options = {};
              }
              if (options === true) {
                _utilsLogJs2['default'].warn('Initializing a child component with `true` is deprecated. Children should be defined in an array when possible, but if necessary use an object instead of `true`.');
                options = {};
              }
              var componentClassName = options.componentClass || _utilsToTitleCaseJs2['default'](componentName);
              options.name = componentName;
              var ComponentClass = Component.getComponent(componentClassName);
              if (!ComponentClass) {
                throw new Error('Component ' + componentClassName + ' does not exist');
              }
              if (typeof ComponentClass !== 'function') {
                return null;
              }
              component = new ComponentClass(this.player_ || this, options);
            } else {
              component = child;
            }
            this.children_.splice(index, 0, component);
            if (typeof component.id === 'function') {
              this.childIndex_[component.id()] = component;
            }
            componentName = componentName || component.name && component.name();
            if (componentName) {
              this.childNameIndex_[componentName] = component;
            }
            if (typeof component.el === 'function' && component.el()) {
              var childNodes = this.contentEl().children;
              var refNode = childNodes[index] || null;
              this.contentEl().insertBefore(component.el(), refNode);
            }
            return component;
          };
          Component.prototype.removeChild = function removeChild(component) {
            if (typeof component === 'string') {
              component = this.getChild(component);
            }
            if (!component || !this.children_) {
              return;
            }
            var childFound = false;
            for (var i = this.children_.length - 1; i >= 0; i--) {
              if (this.children_[i] === component) {
                childFound = true;
                this.children_.splice(i, 1);
                break;
              }
            }
            if (!childFound) {
              return;
            }
            this.childIndex_[component.id()] = null;
            this.childNameIndex_[component.name()] = null;
            var compEl = component.el();
            if (compEl && compEl.parentNode === this.contentEl()) {
              this.contentEl().removeChild(component.el());
            }
          };
          Component.prototype.initChildren = function initChildren() {
            var _this = this;
            var children = this.options_.children;
            if (children) {
              (function() {
                var parentOptions = _this.options_;
                var handleAdd = function handleAdd(child) {
                  var name = child.name;
                  var opts = child.opts;
                  if (parentOptions[name] !== undefined) {
                    opts = parentOptions[name];
                  }
                  if (opts === false) {
                    return;
                  }
                  if (opts === true) {
                    opts = {};
                  }
                  opts.playerOptions = _this.options_.playerOptions;
                  var newChild = _this.addChild(name, opts);
                  if (newChild) {
                    _this[name] = newChild;
                  }
                };
                var workingChildren = undefined;
                var Tech = Component.getComponent('Tech');
                if (Array.isArray(children)) {
                  workingChildren = children;
                } else {
                  workingChildren = Object.keys(children);
                }
                workingChildren.concat(Object.keys(_this.options_).filter(function(child) {
                  return !workingChildren.some(function(wchild) {
                    if (typeof wchild === 'string') {
                      return child === wchild;
                    } else {
                      return child === wchild.name;
                    }
                  });
                })).map(function(child) {
                  var name = undefined,
                      opts = undefined;
                  if (typeof child === 'string') {
                    name = child;
                    opts = children[name] || _this.options_[name] || {};
                  } else {
                    name = child.name;
                    opts = child;
                  }
                  return {
                    name: name,
                    opts: opts
                  };
                }).filter(function(child) {
                  var c = Component.getComponent(child.opts.componentClass || _utilsToTitleCaseJs2['default'](child.name));
                  return c && !Tech.isTech(c);
                }).forEach(handleAdd);
              })();
            }
          };
          Component.prototype.buildCSSClass = function buildCSSClass() {
            return '';
          };
          Component.prototype.on = function on(first, second, third) {
            var _this2 = this;
            if (typeof first === 'string' || Array.isArray(first)) {
              Events.on(this.el_, first, Fn.bind(this, second));
            } else {
              (function() {
                var target = first;
                var type = second;
                var fn = Fn.bind(_this2, third);
                var removeOnDispose = function removeOnDispose() {
                  return _this2.off(target, type, fn);
                };
                removeOnDispose.guid = fn.guid;
                _this2.on('dispose', removeOnDispose);
                var cleanRemover = function cleanRemover() {
                  return _this2.off('dispose', removeOnDispose);
                };
                cleanRemover.guid = fn.guid;
                if (first.nodeName) {
                  Events.on(target, type, fn);
                  Events.on(target, 'dispose', cleanRemover);
                } else if (typeof first.on === 'function') {
                  target.on(type, fn);
                  target.on('dispose', cleanRemover);
                }
              })();
            }
            return this;
          };
          Component.prototype.off = function off(first, second, third) {
            if (!first || typeof first === 'string' || Array.isArray(first)) {
              Events.off(this.el_, first, second);
            } else {
              var target = first;
              var type = second;
              var fn = Fn.bind(this, third);
              this.off('dispose', fn);
              if (first.nodeName) {
                Events.off(target, type, fn);
                Events.off(target, 'dispose', fn);
              } else {
                target.off(type, fn);
                target.off('dispose', fn);
              }
            }
            return this;
          };
          Component.prototype.one = function one(first, second, third) {
            var _this3 = this,
                _arguments = arguments;
            if (typeof first === 'string' || Array.isArray(first)) {
              Events.one(this.el_, first, Fn.bind(this, second));
            } else {
              (function() {
                var target = first;
                var type = second;
                var fn = Fn.bind(_this3, third);
                var newFunc = function newFunc() {
                  _this3.off(target, type, newFunc);
                  fn.apply(null, _arguments);
                };
                newFunc.guid = fn.guid;
                _this3.on(target, type, newFunc);
              })();
            }
            return this;
          };
          Component.prototype.trigger = function trigger(event, hash) {
            Events.trigger(this.el_, event, hash);
            return this;
          };
          Component.prototype.ready = function ready(fn) {
            var sync = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
            if (fn) {
              if (this.isReady_) {
                if (sync) {
                  fn.call(this);
                } else {
                  this.setTimeout(fn, 1);
                }
              } else {
                this.readyQueue_ = this.readyQueue_ || [];
                this.readyQueue_.push(fn);
              }
            }
            return this;
          };
          Component.prototype.triggerReady = function triggerReady() {
            this.isReady_ = true;
            this.setTimeout(function() {
              var readyQueue = this.readyQueue_;
              this.readyQueue_ = [];
              if (readyQueue && readyQueue.length > 0) {
                readyQueue.forEach(function(fn) {
                  fn.call(this);
                }, this);
              }
              this.trigger('ready');
            }, 1);
          };
          Component.prototype.$ = function $(selector, context) {
            return Dom.$(selector, context || this.contentEl());
          };
          Component.prototype.$$ = function $$(selector, context) {
            return Dom.$$(selector, context || this.contentEl());
          };
          Component.prototype.hasClass = function hasClass(classToCheck) {
            return Dom.hasElClass(this.el_, classToCheck);
          };
          Component.prototype.addClass = function addClass(classToAdd) {
            Dom.addElClass(this.el_, classToAdd);
            return this;
          };
          Component.prototype.removeClass = function removeClass(classToRemove) {
            Dom.removeElClass(this.el_, classToRemove);
            return this;
          };
          Component.prototype.toggleClass = function toggleClass(classToToggle, predicate) {
            Dom.toggleElClass(this.el_, classToToggle, predicate);
            return this;
          };
          Component.prototype.show = function show() {
            this.removeClass('vjs-hidden');
            return this;
          };
          Component.prototype.hide = function hide() {
            this.addClass('vjs-hidden');
            return this;
          };
          Component.prototype.lockShowing = function lockShowing() {
            this.addClass('vjs-lock-showing');
            return this;
          };
          Component.prototype.unlockShowing = function unlockShowing() {
            this.removeClass('vjs-lock-showing');
            return this;
          };
          Component.prototype.width = function width(num, skipListeners) {
            return this.dimension('width', num, skipListeners);
          };
          Component.prototype.height = function height(num, skipListeners) {
            return this.dimension('height', num, skipListeners);
          };
          Component.prototype.dimensions = function dimensions(width, height) {
            return this.width(width, true).height(height);
          };
          Component.prototype.dimension = function dimension(widthOrHeight, num, skipListeners) {
            if (num !== undefined) {
              if (num === null || num !== num) {
                num = 0;
              }
              if (('' + num).indexOf('%') !== -1 || ('' + num).indexOf('px') !== -1) {
                this.el_.style[widthOrHeight] = num;
              } else if (num === 'auto') {
                this.el_.style[widthOrHeight] = '';
              } else {
                this.el_.style[widthOrHeight] = num + 'px';
              }
              if (!skipListeners) {
                this.trigger('resize');
              }
              return this;
            }
            if (!this.el_) {
              return 0;
            }
            var val = this.el_.style[widthOrHeight];
            var pxIndex = val.indexOf('px');
            if (pxIndex !== -1) {
              return parseInt(val.slice(0, pxIndex), 10);
            }
            return parseInt(this.el_['offset' + _utilsToTitleCaseJs2['default'](widthOrHeight)], 10);
          };
          Component.prototype.emitTapEvents = function emitTapEvents() {
            var touchStart = 0;
            var firstTouch = null;
            var tapMovementThreshold = 10;
            var touchTimeThreshold = 200;
            var couldBeTap = undefined;
            this.on('touchstart', function(event) {
              if (event.touches.length === 1) {
                firstTouch = _objectAssign2['default']({}, event.touches[0]);
                touchStart = new Date().getTime();
                couldBeTap = true;
              }
            });
            this.on('touchmove', function(event) {
              if (event.touches.length > 1) {
                couldBeTap = false;
              } else if (firstTouch) {
                var xdiff = event.touches[0].pageX - firstTouch.pageX;
                var ydiff = event.touches[0].pageY - firstTouch.pageY;
                var touchDistance = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
                if (touchDistance > tapMovementThreshold) {
                  couldBeTap = false;
                }
              }
            });
            var noTap = function noTap() {
              couldBeTap = false;
            };
            this.on('touchleave', noTap);
            this.on('touchcancel', noTap);
            this.on('touchend', function(event) {
              firstTouch = null;
              if (couldBeTap === true) {
                var touchTime = new Date().getTime() - touchStart;
                if (touchTime < touchTimeThreshold) {
                  event.preventDefault();
                  this.trigger('tap');
                }
              }
            });
          };
          Component.prototype.enableTouchActivity = function enableTouchActivity() {
            if (!this.player() || !this.player().reportUserActivity) {
              return;
            }
            var report = Fn.bind(this.player(), this.player().reportUserActivity);
            var touchHolding = undefined;
            this.on('touchstart', function() {
              report();
              this.clearInterval(touchHolding);
              touchHolding = this.setInterval(report, 250);
            });
            var touchEnd = function touchEnd(event) {
              report();
              this.clearInterval(touchHolding);
            };
            this.on('touchmove', report);
            this.on('touchend', touchEnd);
            this.on('touchcancel', touchEnd);
          };
          Component.prototype.setTimeout = function setTimeout(fn, timeout) {
            fn = Fn.bind(this, fn);
            var timeoutId = _globalWindow2['default'].setTimeout(fn, timeout);
            var disposeFn = function disposeFn() {
              this.clearTimeout(timeoutId);
            };
            disposeFn.guid = 'vjs-timeout-' + timeoutId;
            this.on('dispose', disposeFn);
            return timeoutId;
          };
          Component.prototype.clearTimeout = function clearTimeout(timeoutId) {
            _globalWindow2['default'].clearTimeout(timeoutId);
            var disposeFn = function disposeFn() {};
            disposeFn.guid = 'vjs-timeout-' + timeoutId;
            this.off('dispose', disposeFn);
            return timeoutId;
          };
          Component.prototype.setInterval = function setInterval(fn, interval) {
            fn = Fn.bind(this, fn);
            var intervalId = _globalWindow2['default'].setInterval(fn, interval);
            var disposeFn = function disposeFn() {
              this.clearInterval(intervalId);
            };
            disposeFn.guid = 'vjs-interval-' + intervalId;
            this.on('dispose', disposeFn);
            return intervalId;
          };
          Component.prototype.clearInterval = function clearInterval(intervalId) {
            _globalWindow2['default'].clearInterval(intervalId);
            var disposeFn = function disposeFn() {};
            disposeFn.guid = 'vjs-interval-' + intervalId;
            this.off('dispose', disposeFn);
            return intervalId;
          };
          Component.registerComponent = function registerComponent(name, comp) {
            if (!Component.components_) {
              Component.components_ = {};
            }
            Component.components_[name] = comp;
            return comp;
          };
          Component.getComponent = function getComponent(name) {
            if (Component.components_ && Component.components_[name]) {
              return Component.components_[name];
            }
            if (_globalWindow2['default'] && _globalWindow2['default'].videojs && _globalWindow2['default'].videojs[name]) {
              _utilsLogJs2['default'].warn('The ' + name + ' component was added to the videojs object when it should be registered using videojs.registerComponent(name, component)');
              return _globalWindow2['default'].videojs[name];
            }
          };
          Component.extend = function extend(props) {
            props = props || {};
            _utilsLogJs2['default'].warn('Component.extend({}) has been deprecated, use videojs.extend(Component, {}) instead');
            var init = props.init || props.init || this.prototype.init || this.prototype.init || function() {};
            var subObj = function subObj() {
              init.apply(this, arguments);
            };
            subObj.prototype = Object.create(this.prototype);
            subObj.prototype.constructor = subObj;
            subObj.extend = Component.extend;
            for (var _name in props) {
              if (props.hasOwnProperty(_name)) {
                subObj.prototype[_name] = props[_name];
              }
            }
            return subObj;
          };
          return Component;
        })();
        Component.registerComponent('Component', Component);
        exports['default'] = Component;
        module.exports = exports['default'];
      }, {
        "./utils/dom.js": 131,
        "./utils/events.js": 132,
        "./utils/fn.js": 133,
        "./utils/guid.js": 135,
        "./utils/log.js": 136,
        "./utils/merge-options.js": 137,
        "./utils/to-title-case.js": 140,
        "global/window": 2,
        "object.assign": 45
      }],
      67: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _playToggleJs = _dereq_('./play-toggle.js');
        var _playToggleJs2 = _interopRequireDefault(_playToggleJs);
        var _timeControlsCurrentTimeDisplayJs = _dereq_('./time-controls/current-time-display.js');
        var _timeControlsCurrentTimeDisplayJs2 = _interopRequireDefault(_timeControlsCurrentTimeDisplayJs);
        var _timeControlsDurationDisplayJs = _dereq_('./time-controls/duration-display.js');
        var _timeControlsDurationDisplayJs2 = _interopRequireDefault(_timeControlsDurationDisplayJs);
        var _timeControlsTimeDividerJs = _dereq_('./time-controls/time-divider.js');
        var _timeControlsTimeDividerJs2 = _interopRequireDefault(_timeControlsTimeDividerJs);
        var _timeControlsRemainingTimeDisplayJs = _dereq_('./time-controls/remaining-time-display.js');
        var _timeControlsRemainingTimeDisplayJs2 = _interopRequireDefault(_timeControlsRemainingTimeDisplayJs);
        var _liveDisplayJs = _dereq_('./live-display.js');
        var _liveDisplayJs2 = _interopRequireDefault(_liveDisplayJs);
        var _progressControlProgressControlJs = _dereq_('./progress-control/progress-control.js');
        var _progressControlProgressControlJs2 = _interopRequireDefault(_progressControlProgressControlJs);
        var _fullscreenToggleJs = _dereq_('./fullscreen-toggle.js');
        var _fullscreenToggleJs2 = _interopRequireDefault(_fullscreenToggleJs);
        var _volumeControlVolumeControlJs = _dereq_('./volume-control/volume-control.js');
        var _volumeControlVolumeControlJs2 = _interopRequireDefault(_volumeControlVolumeControlJs);
        var _volumeMenuButtonJs = _dereq_('./volume-menu-button.js');
        var _volumeMenuButtonJs2 = _interopRequireDefault(_volumeMenuButtonJs);
        var _muteToggleJs = _dereq_('./mute-toggle.js');
        var _muteToggleJs2 = _interopRequireDefault(_muteToggleJs);
        var _textTrackControlsChaptersButtonJs = _dereq_('./text-track-controls/chapters-button.js');
        var _textTrackControlsChaptersButtonJs2 = _interopRequireDefault(_textTrackControlsChaptersButtonJs);
        var _textTrackControlsSubtitlesButtonJs = _dereq_('./text-track-controls/subtitles-button.js');
        var _textTrackControlsSubtitlesButtonJs2 = _interopRequireDefault(_textTrackControlsSubtitlesButtonJs);
        var _textTrackControlsCaptionsButtonJs = _dereq_('./text-track-controls/captions-button.js');
        var _textTrackControlsCaptionsButtonJs2 = _interopRequireDefault(_textTrackControlsCaptionsButtonJs);
        var _playbackRateMenuPlaybackRateMenuButtonJs = _dereq_('./playback-rate-menu/playback-rate-menu-button.js');
        var _playbackRateMenuPlaybackRateMenuButtonJs2 = _interopRequireDefault(_playbackRateMenuPlaybackRateMenuButtonJs);
        var _spacerControlsCustomControlSpacerJs = _dereq_('./spacer-controls/custom-control-spacer.js');
        var _spacerControlsCustomControlSpacerJs2 = _interopRequireDefault(_spacerControlsCustomControlSpacerJs);
        var ControlBar = (function(_Component) {
          _inherits(ControlBar, _Component);
          function ControlBar() {
            _classCallCheck(this, ControlBar);
            _Component.apply(this, arguments);
          }
          ControlBar.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {className: 'vjs-control-bar'}, {'role': 'group'});
          };
          return ControlBar;
        })(_componentJs2['default']);
        ControlBar.prototype.options_ = {
          loadEvent: 'play',
          children: ['playToggle', 'volumeMenuButton', 'currentTimeDisplay', 'timeDivider', 'durationDisplay', 'progressControl', 'liveDisplay', 'remainingTimeDisplay', 'customControlSpacer', 'playbackRateMenuButton', 'chaptersButton', 'subtitlesButton', 'captionsButton', 'fullscreenToggle']
        };
        _componentJs2['default'].registerComponent('ControlBar', ControlBar);
        exports['default'] = ControlBar;
        module.exports = exports['default'];
      }, {
        "../component.js": 66,
        "./fullscreen-toggle.js": 68,
        "./live-display.js": 69,
        "./mute-toggle.js": 70,
        "./play-toggle.js": 71,
        "./playback-rate-menu/playback-rate-menu-button.js": 72,
        "./progress-control/progress-control.js": 77,
        "./spacer-controls/custom-control-spacer.js": 79,
        "./text-track-controls/captions-button.js": 82,
        "./text-track-controls/chapters-button.js": 83,
        "./text-track-controls/subtitles-button.js": 86,
        "./time-controls/current-time-display.js": 89,
        "./time-controls/duration-display.js": 90,
        "./time-controls/remaining-time-display.js": 91,
        "./time-controls/time-divider.js": 92,
        "./volume-control/volume-control.js": 94,
        "./volume-menu-button.js": 96
      }],
      68: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _buttonJs = _dereq_('../button.js');
        var _buttonJs2 = _interopRequireDefault(_buttonJs);
        var _componentJs = _dereq_('../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var FullscreenToggle = (function(_Button) {
          _inherits(FullscreenToggle, _Button);
          function FullscreenToggle() {
            _classCallCheck(this, FullscreenToggle);
            _Button.apply(this, arguments);
          }
          FullscreenToggle.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-fullscreen-control ' + _Button.prototype.buildCSSClass.call(this);
          };
          FullscreenToggle.prototype.handleClick = function handleClick() {
            if (!this.player_.isFullscreen()) {
              this.player_.requestFullscreen();
              this.controlText('Non-Fullscreen');
            } else {
              this.player_.exitFullscreen();
              this.controlText('Fullscreen');
            }
          };
          return FullscreenToggle;
        })(_buttonJs2['default']);
        FullscreenToggle.prototype.controlText_ = 'Fullscreen';
        _componentJs2['default'].registerComponent('FullscreenToggle', FullscreenToggle);
        exports['default'] = FullscreenToggle;
        module.exports = exports['default'];
      }, {
        "../button.js": 63,
        "../component.js": 66
      }],
      69: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _component = _dereq_('../component');
        var _component2 = _interopRequireDefault(_component);
        var _utilsDomJs = _dereq_('../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var LiveDisplay = (function(_Component) {
          _inherits(LiveDisplay, _Component);
          function LiveDisplay(player, options) {
            _classCallCheck(this, LiveDisplay);
            _Component.call(this, player, options);
            this.updateShowing();
            this.on(this.player(), 'durationchange', this.updateShowing);
          }
          LiveDisplay.prototype.createEl = function createEl() {
            var el = _Component.prototype.createEl.call(this, 'div', {className: 'vjs-live-control vjs-control'});
            this.contentEl_ = Dom.createEl('div', {
              className: 'vjs-live-display',
              innerHTML: '<span class="vjs-control-text">' + this.localize('Stream Type') + '</span>' + this.localize('LIVE')
            }, {'aria-live': 'off'});
            el.appendChild(this.contentEl_);
            return el;
          };
          LiveDisplay.prototype.updateShowing = function updateShowing() {
            if (this.player().duration() === Infinity) {
              this.show();
            } else {
              this.hide();
            }
          };
          return LiveDisplay;
        })(_component2['default']);
        _component2['default'].registerComponent('LiveDisplay', LiveDisplay);
        exports['default'] = LiveDisplay;
        module.exports = exports['default'];
      }, {
        "../component": 66,
        "../utils/dom.js": 131
      }],
      70: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _button = _dereq_('../button');
        var _button2 = _interopRequireDefault(_button);
        var _component = _dereq_('../component');
        var _component2 = _interopRequireDefault(_component);
        var _utilsDomJs = _dereq_('../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var MuteToggle = (function(_Button) {
          _inherits(MuteToggle, _Button);
          function MuteToggle(player, options) {
            _classCallCheck(this, MuteToggle);
            _Button.call(this, player, options);
            this.on(player, 'volumechange', this.update);
            if (player.tech_ && player.tech_['featuresVolumeControl'] === false) {
              this.addClass('vjs-hidden');
            }
            this.on(player, 'loadstart', function() {
              this.update();
              if (player.tech_['featuresVolumeControl'] === false) {
                this.addClass('vjs-hidden');
              } else {
                this.removeClass('vjs-hidden');
              }
            });
          }
          MuteToggle.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-mute-control ' + _Button.prototype.buildCSSClass.call(this);
          };
          MuteToggle.prototype.handleClick = function handleClick() {
            this.player_.muted(this.player_.muted() ? false : true);
          };
          MuteToggle.prototype.update = function update() {
            var vol = this.player_.volume(),
                level = 3;
            if (vol === 0 || this.player_.muted()) {
              level = 0;
            } else if (vol < 0.33) {
              level = 1;
            } else if (vol < 0.67) {
              level = 2;
            }
            var toMute = this.player_.muted() ? 'Unmute' : 'Mute';
            if (this.controlText() !== toMute) {
              this.controlText(toMute);
            }
            for (var i = 0; i < 4; i++) {
              Dom.removeElClass(this.el_, 'vjs-vol-' + i);
            }
            Dom.addElClass(this.el_, 'vjs-vol-' + level);
          };
          return MuteToggle;
        })(_button2['default']);
        MuteToggle.prototype.controlText_ = 'Mute';
        _component2['default'].registerComponent('MuteToggle', MuteToggle);
        exports['default'] = MuteToggle;
        module.exports = exports['default'];
      }, {
        "../button": 63,
        "../component": 66,
        "../utils/dom.js": 131
      }],
      71: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _buttonJs = _dereq_('../button.js');
        var _buttonJs2 = _interopRequireDefault(_buttonJs);
        var _componentJs = _dereq_('../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var PlayToggle = (function(_Button) {
          _inherits(PlayToggle, _Button);
          function PlayToggle(player, options) {
            _classCallCheck(this, PlayToggle);
            _Button.call(this, player, options);
            this.on(player, 'play', this.handlePlay);
            this.on(player, 'pause', this.handlePause);
          }
          PlayToggle.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-play-control ' + _Button.prototype.buildCSSClass.call(this);
          };
          PlayToggle.prototype.handleClick = function handleClick() {
            if (this.player_.paused()) {
              this.player_.play();
            } else {
              this.player_.pause();
            }
          };
          PlayToggle.prototype.handlePlay = function handlePlay() {
            this.removeClass('vjs-paused');
            this.addClass('vjs-playing');
            this.controlText('Pause');
          };
          PlayToggle.prototype.handlePause = function handlePause() {
            this.removeClass('vjs-playing');
            this.addClass('vjs-paused');
            this.controlText('Play');
          };
          return PlayToggle;
        })(_buttonJs2['default']);
        PlayToggle.prototype.controlText_ = 'Play';
        _componentJs2['default'].registerComponent('PlayToggle', PlayToggle);
        exports['default'] = PlayToggle;
        module.exports = exports['default'];
      }, {
        "../button.js": 63,
        "../component.js": 66
      }],
      72: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _menuMenuButtonJs = _dereq_('../../menu/menu-button.js');
        var _menuMenuButtonJs2 = _interopRequireDefault(_menuMenuButtonJs);
        var _menuMenuJs = _dereq_('../../menu/menu.js');
        var _menuMenuJs2 = _interopRequireDefault(_menuMenuJs);
        var _playbackRateMenuItemJs = _dereq_('./playback-rate-menu-item.js');
        var _playbackRateMenuItemJs2 = _interopRequireDefault(_playbackRateMenuItemJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsDomJs = _dereq_('../../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var PlaybackRateMenuButton = (function(_MenuButton) {
          _inherits(PlaybackRateMenuButton, _MenuButton);
          function PlaybackRateMenuButton(player, options) {
            _classCallCheck(this, PlaybackRateMenuButton);
            _MenuButton.call(this, player, options);
            this.updateVisibility();
            this.updateLabel();
            this.on(player, 'loadstart', this.updateVisibility);
            this.on(player, 'ratechange', this.updateLabel);
          }
          PlaybackRateMenuButton.prototype.createEl = function createEl() {
            var el = _MenuButton.prototype.createEl.call(this);
            this.labelEl_ = Dom.createEl('div', {
              className: 'vjs-playback-rate-value',
              innerHTML: 1.0
            });
            el.appendChild(this.labelEl_);
            return el;
          };
          PlaybackRateMenuButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-playback-rate ' + _MenuButton.prototype.buildCSSClass.call(this);
          };
          PlaybackRateMenuButton.prototype.createMenu = function createMenu() {
            var menu = new _menuMenuJs2['default'](this.player());
            var rates = this.playbackRates();
            if (rates) {
              for (var i = rates.length - 1; i >= 0; i--) {
                menu.addChild(new _playbackRateMenuItemJs2['default'](this.player(), {'rate': rates[i] + 'x'}));
              }
            }
            return menu;
          };
          PlaybackRateMenuButton.prototype.updateARIAAttributes = function updateARIAAttributes() {
            this.el().setAttribute('aria-valuenow', this.player().playbackRate());
          };
          PlaybackRateMenuButton.prototype.handleClick = function handleClick() {
            var currentRate = this.player().playbackRate();
            var rates = this.playbackRates();
            var newRate = rates[0];
            for (var i = 0; i < rates.length; i++) {
              if (rates[i] > currentRate) {
                newRate = rates[i];
                break;
              }
            }
            this.player().playbackRate(newRate);
          };
          PlaybackRateMenuButton.prototype.playbackRates = function playbackRates() {
            return this.options_['playbackRates'] || this.options_.playerOptions && this.options_.playerOptions['playbackRates'];
          };
          PlaybackRateMenuButton.prototype.playbackRateSupported = function playbackRateSupported() {
            return this.player().tech_ && this.player().tech_['featuresPlaybackRate'] && this.playbackRates() && this.playbackRates().length > 0;
          };
          PlaybackRateMenuButton.prototype.updateVisibility = function updateVisibility() {
            if (this.playbackRateSupported()) {
              this.removeClass('vjs-hidden');
            } else {
              this.addClass('vjs-hidden');
            }
          };
          PlaybackRateMenuButton.prototype.updateLabel = function updateLabel() {
            if (this.playbackRateSupported()) {
              this.labelEl_.innerHTML = this.player().playbackRate() + 'x';
            }
          };
          return PlaybackRateMenuButton;
        })(_menuMenuButtonJs2['default']);
        PlaybackRateMenuButton.prototype.controlText_ = 'Playback Rate';
        _componentJs2['default'].registerComponent('PlaybackRateMenuButton', PlaybackRateMenuButton);
        exports['default'] = PlaybackRateMenuButton;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../menu/menu-button.js": 103,
        "../../menu/menu.js": 105,
        "../../utils/dom.js": 131,
        "./playback-rate-menu-item.js": 73
      }],
      73: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _menuMenuItemJs = _dereq_('../../menu/menu-item.js');
        var _menuMenuItemJs2 = _interopRequireDefault(_menuMenuItemJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var PlaybackRateMenuItem = (function(_MenuItem) {
          _inherits(PlaybackRateMenuItem, _MenuItem);
          function PlaybackRateMenuItem(player, options) {
            _classCallCheck(this, PlaybackRateMenuItem);
            var label = options['rate'];
            var rate = parseFloat(label, 10);
            options['label'] = label;
            options['selected'] = rate === 1;
            _MenuItem.call(this, player, options);
            this.label = label;
            this.rate = rate;
            this.on(player, 'ratechange', this.update);
          }
          PlaybackRateMenuItem.prototype.handleClick = function handleClick() {
            _MenuItem.prototype.handleClick.call(this);
            this.player().playbackRate(this.rate);
          };
          PlaybackRateMenuItem.prototype.update = function update() {
            this.selected(this.player().playbackRate() === this.rate);
          };
          return PlaybackRateMenuItem;
        })(_menuMenuItemJs2['default']);
        PlaybackRateMenuItem.prototype.contentElType = 'button';
        _componentJs2['default'].registerComponent('PlaybackRateMenuItem', PlaybackRateMenuItem);
        exports['default'] = PlaybackRateMenuItem;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../menu/menu-item.js": 104
      }],
      74: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsDomJs = _dereq_('../../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var LoadProgressBar = (function(_Component) {
          _inherits(LoadProgressBar, _Component);
          function LoadProgressBar(player, options) {
            _classCallCheck(this, LoadProgressBar);
            _Component.call(this, player, options);
            this.on(player, 'progress', this.update);
          }
          LoadProgressBar.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
              className: 'vjs-load-progress',
              innerHTML: '<span class="vjs-control-text"><span>' + this.localize('Loaded') + '</span>: 0%</span>'
            });
          };
          LoadProgressBar.prototype.update = function update() {
            var buffered = this.player_.buffered();
            var duration = this.player_.duration();
            var bufferedEnd = this.player_.bufferedEnd();
            var children = this.el_.children;
            var percentify = function percentify(time, end) {
              var percent = time / end || 0;
              return (percent >= 1 ? 1 : percent) * 100 + '%';
            };
            this.el_.style.width = percentify(bufferedEnd, duration);
            for (var i = 0; i < buffered.length; i++) {
              var start = buffered.start(i);
              var end = buffered.end(i);
              var part = children[i];
              if (!part) {
                part = this.el_.appendChild(Dom.createEl());
              }
              part.style.left = percentify(start, bufferedEnd);
              part.style.width = percentify(end - start, bufferedEnd);
            }
            for (var i = children.length; i > buffered.length; i--) {
              this.el_.removeChild(children[i - 1]);
            }
          };
          return LoadProgressBar;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('LoadProgressBar', LoadProgressBar);
        exports['default'] = LoadProgressBar;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../utils/dom.js": 131
      }],
      75: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsDomJs = _dereq_('../../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsFnJs = _dereq_('../../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsFormatTimeJs = _dereq_('../../utils/format-time.js');
        var _utilsFormatTimeJs2 = _interopRequireDefault(_utilsFormatTimeJs);
        var _lodashCompatFunctionThrottle = _dereq_('lodash-compat/function/throttle');
        var _lodashCompatFunctionThrottle2 = _interopRequireDefault(_lodashCompatFunctionThrottle);
        var MouseTimeDisplay = (function(_Component) {
          _inherits(MouseTimeDisplay, _Component);
          function MouseTimeDisplay(player, options) {
            var _this = this;
            _classCallCheck(this, MouseTimeDisplay);
            _Component.call(this, player, options);
            this.update(0, 0);
            player.on('ready', function() {
              _this.on(player.controlBar.progressControl.el(), 'mousemove', _lodashCompatFunctionThrottle2['default'](Fn.bind(_this, _this.handleMouseMove), 25));
            });
          }
          MouseTimeDisplay.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {className: 'vjs-mouse-display'});
          };
          MouseTimeDisplay.prototype.handleMouseMove = function handleMouseMove(event) {
            var duration = this.player_.duration();
            var newTime = this.calculateDistance(event) * duration;
            var position = event.pageX - Dom.findElPosition(this.el().parentNode).left;
            this.update(newTime, position);
          };
          MouseTimeDisplay.prototype.update = function update(newTime, position) {
            var time = _utilsFormatTimeJs2['default'](newTime, this.player_.duration());
            this.el().style.left = position + 'px';
            this.el().setAttribute('data-current-time', time);
          };
          MouseTimeDisplay.prototype.calculateDistance = function calculateDistance(event) {
            return Dom.getPointerPosition(this.el().parentNode, event).x;
          };
          return MouseTimeDisplay;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('MouseTimeDisplay', MouseTimeDisplay);
        exports['default'] = MouseTimeDisplay;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../utils/dom.js": 131,
        "../../utils/fn.js": 133,
        "../../utils/format-time.js": 134,
        "lodash-compat/function/throttle": 7
      }],
      76: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsFnJs = _dereq_('../../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsFormatTimeJs = _dereq_('../../utils/format-time.js');
        var _utilsFormatTimeJs2 = _interopRequireDefault(_utilsFormatTimeJs);
        var PlayProgressBar = (function(_Component) {
          _inherits(PlayProgressBar, _Component);
          function PlayProgressBar(player, options) {
            _classCallCheck(this, PlayProgressBar);
            _Component.call(this, player, options);
            this.updateDataAttr();
            this.on(player, 'timeupdate', this.updateDataAttr);
            player.ready(Fn.bind(this, this.updateDataAttr));
          }
          PlayProgressBar.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
              className: 'vjs-play-progress vjs-slider-bar',
              innerHTML: '<span class="vjs-control-text"><span>' + this.localize('Progress') + '</span>: 0%</span>'
            });
          };
          PlayProgressBar.prototype.updateDataAttr = function updateDataAttr() {
            var time = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
            this.el_.setAttribute('data-current-time', _utilsFormatTimeJs2['default'](time, this.player_.duration()));
          };
          return PlayProgressBar;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('PlayProgressBar', PlayProgressBar);
        exports['default'] = PlayProgressBar;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../utils/fn.js": 133,
        "../../utils/format-time.js": 134
      }],
      77: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _seekBarJs = _dereq_('./seek-bar.js');
        var _seekBarJs2 = _interopRequireDefault(_seekBarJs);
        var _mouseTimeDisplayJs = _dereq_('./mouse-time-display.js');
        var _mouseTimeDisplayJs2 = _interopRequireDefault(_mouseTimeDisplayJs);
        var ProgressControl = (function(_Component) {
          _inherits(ProgressControl, _Component);
          function ProgressControl() {
            _classCallCheck(this, ProgressControl);
            _Component.apply(this, arguments);
          }
          ProgressControl.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {className: 'vjs-progress-control vjs-control'});
          };
          return ProgressControl;
        })(_componentJs2['default']);
        ProgressControl.prototype.options_ = {children: ['seekBar']};
        _componentJs2['default'].registerComponent('ProgressControl', ProgressControl);
        exports['default'] = ProgressControl;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "./mouse-time-display.js": 75,
        "./seek-bar.js": 78
      }],
      78: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _sliderSliderJs = _dereq_('../../slider/slider.js');
        var _sliderSliderJs2 = _interopRequireDefault(_sliderSliderJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _loadProgressBarJs = _dereq_('./load-progress-bar.js');
        var _loadProgressBarJs2 = _interopRequireDefault(_loadProgressBarJs);
        var _playProgressBarJs = _dereq_('./play-progress-bar.js');
        var _playProgressBarJs2 = _interopRequireDefault(_playProgressBarJs);
        var _utilsFnJs = _dereq_('../../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsFormatTimeJs = _dereq_('../../utils/format-time.js');
        var _utilsFormatTimeJs2 = _interopRequireDefault(_utilsFormatTimeJs);
        var _objectAssign = _dereq_('object.assign');
        var _objectAssign2 = _interopRequireDefault(_objectAssign);
        var SeekBar = (function(_Slider) {
          _inherits(SeekBar, _Slider);
          function SeekBar(player, options) {
            _classCallCheck(this, SeekBar);
            _Slider.call(this, player, options);
            this.on(player, 'timeupdate', this.updateARIAAttributes);
            player.ready(Fn.bind(this, this.updateARIAAttributes));
          }
          SeekBar.prototype.createEl = function createEl() {
            return _Slider.prototype.createEl.call(this, 'div', {className: 'vjs-progress-holder'}, {'aria-label': 'video progress bar'});
          };
          SeekBar.prototype.updateARIAAttributes = function updateARIAAttributes() {
            var time = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
            this.el_.setAttribute('aria-valuenow', (this.getPercent() * 100).toFixed(2));
            this.el_.setAttribute('aria-valuetext', _utilsFormatTimeJs2['default'](time, this.player_.duration()));
          };
          SeekBar.prototype.getPercent = function getPercent() {
            var percent = this.player_.currentTime() / this.player_.duration();
            return percent >= 1 ? 1 : percent;
          };
          SeekBar.prototype.handleMouseDown = function handleMouseDown(event) {
            _Slider.prototype.handleMouseDown.call(this, event);
            this.player_.scrubbing(true);
            this.videoWasPlaying = !this.player_.paused();
            this.player_.pause();
          };
          SeekBar.prototype.handleMouseMove = function handleMouseMove(event) {
            var newTime = this.calculateDistance(event) * this.player_.duration();
            if (newTime === this.player_.duration()) {
              newTime = newTime - 0.1;
            }
            this.player_.currentTime(newTime);
          };
          SeekBar.prototype.handleMouseUp = function handleMouseUp(event) {
            _Slider.prototype.handleMouseUp.call(this, event);
            this.player_.scrubbing(false);
            if (this.videoWasPlaying) {
              this.player_.play();
            }
          };
          SeekBar.prototype.stepForward = function stepForward() {
            this.player_.currentTime(this.player_.currentTime() + 5);
          };
          SeekBar.prototype.stepBack = function stepBack() {
            this.player_.currentTime(this.player_.currentTime() - 5);
          };
          return SeekBar;
        })(_sliderSliderJs2['default']);
        SeekBar.prototype.options_ = {
          children: ['loadProgressBar', 'mouseTimeDisplay', 'playProgressBar'],
          'barName': 'playProgressBar'
        };
        SeekBar.prototype.playerEvent = 'timeupdate';
        _componentJs2['default'].registerComponent('SeekBar', SeekBar);
        exports['default'] = SeekBar;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../slider/slider.js": 113,
        "../../utils/fn.js": 133,
        "../../utils/format-time.js": 134,
        "./load-progress-bar.js": 74,
        "./play-progress-bar.js": 76,
        "object.assign": 45
      }],
      79: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _spacerJs = _dereq_('./spacer.js');
        var _spacerJs2 = _interopRequireDefault(_spacerJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var CustomControlSpacer = (function(_Spacer) {
          _inherits(CustomControlSpacer, _Spacer);
          function CustomControlSpacer() {
            _classCallCheck(this, CustomControlSpacer);
            _Spacer.apply(this, arguments);
          }
          CustomControlSpacer.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-custom-control-spacer ' + _Spacer.prototype.buildCSSClass.call(this);
          };
          CustomControlSpacer.prototype.createEl = function createEl() {
            var el = _Spacer.prototype.createEl.call(this, {className: this.buildCSSClass()});
            el.innerHTML = '&nbsp;';
            return el;
          };
          return CustomControlSpacer;
        })(_spacerJs2['default']);
        _componentJs2['default'].registerComponent('CustomControlSpacer', CustomControlSpacer);
        exports['default'] = CustomControlSpacer;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "./spacer.js": 80
      }],
      80: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var Spacer = (function(_Component) {
          _inherits(Spacer, _Component);
          function Spacer() {
            _classCallCheck(this, Spacer);
            _Component.apply(this, arguments);
          }
          Spacer.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-spacer ' + _Component.prototype.buildCSSClass.call(this);
          };
          Spacer.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {className: this.buildCSSClass()});
          };
          return Spacer;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('Spacer', Spacer);
        exports['default'] = Spacer;
        module.exports = exports['default'];
      }, {"../../component.js": 66}],
      81: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _textTrackMenuItemJs = _dereq_('./text-track-menu-item.js');
        var _textTrackMenuItemJs2 = _interopRequireDefault(_textTrackMenuItemJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var CaptionSettingsMenuItem = (function(_TextTrackMenuItem) {
          _inherits(CaptionSettingsMenuItem, _TextTrackMenuItem);
          function CaptionSettingsMenuItem(player, options) {
            _classCallCheck(this, CaptionSettingsMenuItem);
            options['track'] = {
              'kind': options['kind'],
              'player': player,
              'label': options['kind'] + ' settings',
              'selectable': false,
              'default': false,
              mode: 'disabled'
            };
            options['selectable'] = false;
            _TextTrackMenuItem.call(this, player, options);
            this.addClass('vjs-texttrack-settings');
            this.controlText(', opens ' + options['kind'] + ' settings dialog');
          }
          CaptionSettingsMenuItem.prototype.handleClick = function handleClick() {
            this.player().getChild('textTrackSettings').show();
            this.player().getChild('textTrackSettings').el_.focus();
          };
          return CaptionSettingsMenuItem;
        })(_textTrackMenuItemJs2['default']);
        _componentJs2['default'].registerComponent('CaptionSettingsMenuItem', CaptionSettingsMenuItem);
        exports['default'] = CaptionSettingsMenuItem;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "./text-track-menu-item.js": 88
      }],
      82: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _textTrackButtonJs = _dereq_('./text-track-button.js');
        var _textTrackButtonJs2 = _interopRequireDefault(_textTrackButtonJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _captionSettingsMenuItemJs = _dereq_('./caption-settings-menu-item.js');
        var _captionSettingsMenuItemJs2 = _interopRequireDefault(_captionSettingsMenuItemJs);
        var CaptionsButton = (function(_TextTrackButton) {
          _inherits(CaptionsButton, _TextTrackButton);
          function CaptionsButton(player, options, ready) {
            _classCallCheck(this, CaptionsButton);
            _TextTrackButton.call(this, player, options, ready);
            this.el_.setAttribute('aria-label', 'Captions Menu');
          }
          CaptionsButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-captions-button ' + _TextTrackButton.prototype.buildCSSClass.call(this);
          };
          CaptionsButton.prototype.update = function update() {
            var threshold = 2;
            _TextTrackButton.prototype.update.call(this);
            if (this.player().tech_ && this.player().tech_['featuresNativeTextTracks']) {
              threshold = 1;
            }
            if (this.items && this.items.length > threshold) {
              this.show();
            } else {
              this.hide();
            }
          };
          CaptionsButton.prototype.createItems = function createItems() {
            var items = [];
            if (!(this.player().tech_ && this.player().tech_['featuresNativeTextTracks'])) {
              items.push(new _captionSettingsMenuItemJs2['default'](this.player_, {'kind': this.kind_}));
            }
            return _TextTrackButton.prototype.createItems.call(this, items);
          };
          return CaptionsButton;
        })(_textTrackButtonJs2['default']);
        CaptionsButton.prototype.kind_ = 'captions';
        CaptionsButton.prototype.controlText_ = 'Captions';
        _componentJs2['default'].registerComponent('CaptionsButton', CaptionsButton);
        exports['default'] = CaptionsButton;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "./caption-settings-menu-item.js": 81,
        "./text-track-button.js": 87
      }],
      83: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _textTrackButtonJs = _dereq_('./text-track-button.js');
        var _textTrackButtonJs2 = _interopRequireDefault(_textTrackButtonJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _textTrackMenuItemJs = _dereq_('./text-track-menu-item.js');
        var _textTrackMenuItemJs2 = _interopRequireDefault(_textTrackMenuItemJs);
        var _chaptersTrackMenuItemJs = _dereq_('./chapters-track-menu-item.js');
        var _chaptersTrackMenuItemJs2 = _interopRequireDefault(_chaptersTrackMenuItemJs);
        var _menuMenuJs = _dereq_('../../menu/menu.js');
        var _menuMenuJs2 = _interopRequireDefault(_menuMenuJs);
        var _utilsDomJs = _dereq_('../../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsFnJs = _dereq_('../../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsToTitleCaseJs = _dereq_('../../utils/to-title-case.js');
        var _utilsToTitleCaseJs2 = _interopRequireDefault(_utilsToTitleCaseJs);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var ChaptersButton = (function(_TextTrackButton) {
          _inherits(ChaptersButton, _TextTrackButton);
          function ChaptersButton(player, options, ready) {
            _classCallCheck(this, ChaptersButton);
            _TextTrackButton.call(this, player, options, ready);
            this.el_.setAttribute('aria-label', 'Chapters Menu');
          }
          ChaptersButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-chapters-button ' + _TextTrackButton.prototype.buildCSSClass.call(this);
          };
          ChaptersButton.prototype.createItems = function createItems() {
            var items = [];
            var tracks = this.player_.textTracks();
            if (!tracks) {
              return items;
            }
            for (var i = 0; i < tracks.length; i++) {
              var track = tracks[i];
              if (track['kind'] === this.kind_) {
                items.push(new _textTrackMenuItemJs2['default'](this.player_, {'track': track}));
              }
            }
            return items;
          };
          ChaptersButton.prototype.createMenu = function createMenu() {
            var _this = this;
            var tracks = this.player_.textTracks() || [];
            var chaptersTrack = undefined;
            var items = this.items = [];
            for (var i = 0,
                _length = tracks.length; i < _length; i++) {
              var track = tracks[i];
              if (track['kind'] === this.kind_) {
                chaptersTrack = track;
                break;
              }
            }
            var menu = this.menu;
            if (menu === undefined) {
              menu = new _menuMenuJs2['default'](this.player_);
              menu.contentEl().appendChild(Dom.createEl('li', {
                className: 'vjs-menu-title',
                innerHTML: _utilsToTitleCaseJs2['default'](this.kind_),
                tabIndex: -1
              }));
            }
            if (chaptersTrack && chaptersTrack.cues == null) {
              chaptersTrack['mode'] = 'hidden';
              var remoteTextTrackEl = this.player_.remoteTextTrackEls().getTrackElementByTrack_(chaptersTrack);
              if (remoteTextTrackEl) {
                remoteTextTrackEl.addEventListener('load', function(event) {
                  return _this.update();
                });
              }
            }
            if (chaptersTrack && chaptersTrack.cues && chaptersTrack.cues.length > 0) {
              var cues = chaptersTrack['cues'],
                  cue = undefined;
              for (var i = 0,
                  l = cues.length; i < l; i++) {
                cue = cues[i];
                var mi = new _chaptersTrackMenuItemJs2['default'](this.player_, {
                  'track': chaptersTrack,
                  'cue': cue
                });
                items.push(mi);
                menu.addChild(mi);
              }
              this.addChild(menu);
            }
            if (this.items.length > 0) {
              this.show();
            }
            return menu;
          };
          return ChaptersButton;
        })(_textTrackButtonJs2['default']);
        ChaptersButton.prototype.kind_ = 'chapters';
        ChaptersButton.prototype.controlText_ = 'Chapters';
        _componentJs2['default'].registerComponent('ChaptersButton', ChaptersButton);
        exports['default'] = ChaptersButton;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../menu/menu.js": 105,
        "../../utils/dom.js": 131,
        "../../utils/fn.js": 133,
        "../../utils/to-title-case.js": 140,
        "./chapters-track-menu-item.js": 84,
        "./text-track-button.js": 87,
        "./text-track-menu-item.js": 88,
        "global/window": 2
      }],
      84: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _menuMenuItemJs = _dereq_('../../menu/menu-item.js');
        var _menuMenuItemJs2 = _interopRequireDefault(_menuMenuItemJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsFnJs = _dereq_('../../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var ChaptersTrackMenuItem = (function(_MenuItem) {
          _inherits(ChaptersTrackMenuItem, _MenuItem);
          function ChaptersTrackMenuItem(player, options) {
            _classCallCheck(this, ChaptersTrackMenuItem);
            var track = options['track'];
            var cue = options['cue'];
            var currentTime = player.currentTime();
            options['label'] = cue.text;
            options['selected'] = cue['startTime'] <= currentTime && currentTime < cue['endTime'];
            _MenuItem.call(this, player, options);
            this.track = track;
            this.cue = cue;
            track.addEventListener('cuechange', Fn.bind(this, this.update));
          }
          ChaptersTrackMenuItem.prototype.handleClick = function handleClick() {
            _MenuItem.prototype.handleClick.call(this);
            this.player_.currentTime(this.cue.startTime);
            this.update(this.cue.startTime);
          };
          ChaptersTrackMenuItem.prototype.update = function update() {
            var cue = this.cue;
            var currentTime = this.player_.currentTime();
            this.selected(cue['startTime'] <= currentTime && currentTime < cue['endTime']);
          };
          return ChaptersTrackMenuItem;
        })(_menuMenuItemJs2['default']);
        _componentJs2['default'].registerComponent('ChaptersTrackMenuItem', ChaptersTrackMenuItem);
        exports['default'] = ChaptersTrackMenuItem;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../menu/menu-item.js": 104,
        "../../utils/fn.js": 133
      }],
      85: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _textTrackMenuItemJs = _dereq_('./text-track-menu-item.js');
        var _textTrackMenuItemJs2 = _interopRequireDefault(_textTrackMenuItemJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var OffTextTrackMenuItem = (function(_TextTrackMenuItem) {
          _inherits(OffTextTrackMenuItem, _TextTrackMenuItem);
          function OffTextTrackMenuItem(player, options) {
            _classCallCheck(this, OffTextTrackMenuItem);
            options['track'] = {
              'kind': options['kind'],
              'player': player,
              'label': options['kind'] + ' off',
              'default': false,
              'mode': 'disabled'
            };
            options['selectable'] = true;
            _TextTrackMenuItem.call(this, player, options);
            this.selected(true);
          }
          OffTextTrackMenuItem.prototype.handleTracksChange = function handleTracksChange(event) {
            var tracks = this.player().textTracks();
            var selected = true;
            for (var i = 0,
                l = tracks.length; i < l; i++) {
              var track = tracks[i];
              if (track['kind'] === this.track['kind'] && track['mode'] === 'showing') {
                selected = false;
                break;
              }
            }
            this.selected(selected);
          };
          return OffTextTrackMenuItem;
        })(_textTrackMenuItemJs2['default']);
        _componentJs2['default'].registerComponent('OffTextTrackMenuItem', OffTextTrackMenuItem);
        exports['default'] = OffTextTrackMenuItem;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "./text-track-menu-item.js": 88
      }],
      86: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _textTrackButtonJs = _dereq_('./text-track-button.js');
        var _textTrackButtonJs2 = _interopRequireDefault(_textTrackButtonJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var SubtitlesButton = (function(_TextTrackButton) {
          _inherits(SubtitlesButton, _TextTrackButton);
          function SubtitlesButton(player, options, ready) {
            _classCallCheck(this, SubtitlesButton);
            _TextTrackButton.call(this, player, options, ready);
            this.el_.setAttribute('aria-label', 'Subtitles Menu');
          }
          SubtitlesButton.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-subtitles-button ' + _TextTrackButton.prototype.buildCSSClass.call(this);
          };
          return SubtitlesButton;
        })(_textTrackButtonJs2['default']);
        SubtitlesButton.prototype.kind_ = 'subtitles';
        SubtitlesButton.prototype.controlText_ = 'Subtitles';
        _componentJs2['default'].registerComponent('SubtitlesButton', SubtitlesButton);
        exports['default'] = SubtitlesButton;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "./text-track-button.js": 87
      }],
      87: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _menuMenuButtonJs = _dereq_('../../menu/menu-button.js');
        var _menuMenuButtonJs2 = _interopRequireDefault(_menuMenuButtonJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsFnJs = _dereq_('../../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _textTrackMenuItemJs = _dereq_('./text-track-menu-item.js');
        var _textTrackMenuItemJs2 = _interopRequireDefault(_textTrackMenuItemJs);
        var _offTextTrackMenuItemJs = _dereq_('./off-text-track-menu-item.js');
        var _offTextTrackMenuItemJs2 = _interopRequireDefault(_offTextTrackMenuItemJs);
        var TextTrackButton = (function(_MenuButton) {
          _inherits(TextTrackButton, _MenuButton);
          function TextTrackButton(player, options) {
            _classCallCheck(this, TextTrackButton);
            _MenuButton.call(this, player, options);
            var tracks = this.player_.textTracks();
            if (this.items.length <= 1) {
              this.hide();
            }
            if (!tracks) {
              return;
            }
            var updateHandler = Fn.bind(this, this.update);
            tracks.addEventListener('removetrack', updateHandler);
            tracks.addEventListener('addtrack', updateHandler);
            this.player_.on('dispose', function() {
              tracks.removeEventListener('removetrack', updateHandler);
              tracks.removeEventListener('addtrack', updateHandler);
            });
          }
          TextTrackButton.prototype.createItems = function createItems() {
            var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            items.push(new _offTextTrackMenuItemJs2['default'](this.player_, {'kind': this.kind_}));
            var tracks = this.player_.textTracks();
            if (!tracks) {
              return items;
            }
            for (var i = 0; i < tracks.length; i++) {
              var track = tracks[i];
              if (track['kind'] === this.kind_) {
                items.push(new _textTrackMenuItemJs2['default'](this.player_, {
                  'selectable': true,
                  'track': track
                }));
              }
            }
            return items;
          };
          return TextTrackButton;
        })(_menuMenuButtonJs2['default']);
        _componentJs2['default'].registerComponent('TextTrackButton', TextTrackButton);
        exports['default'] = TextTrackButton;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../menu/menu-button.js": 103,
        "../../utils/fn.js": 133,
        "./off-text-track-menu-item.js": 85,
        "./text-track-menu-item.js": 88
      }],
      88: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _menuMenuItemJs = _dereq_('../../menu/menu-item.js');
        var _menuMenuItemJs2 = _interopRequireDefault(_menuMenuItemJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsFnJs = _dereq_('../../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var TextTrackMenuItem = (function(_MenuItem) {
          _inherits(TextTrackMenuItem, _MenuItem);
          function TextTrackMenuItem(player, options) {
            var _this = this;
            _classCallCheck(this, TextTrackMenuItem);
            var track = options['track'];
            var tracks = player.textTracks();
            options['label'] = track['label'] || track['language'] || 'Unknown';
            options['selected'] = track['default'] || track['mode'] === 'showing';
            _MenuItem.call(this, player, options);
            this.track = track;
            if (tracks) {
              (function() {
                var changeHandler = Fn.bind(_this, _this.handleTracksChange);
                tracks.addEventListener('change', changeHandler);
                _this.on('dispose', function() {
                  tracks.removeEventListener('change', changeHandler);
                });
              })();
            }
            if (tracks && tracks.onchange === undefined) {
              (function() {
                var event = undefined;
                _this.on(['tap', 'click'], function() {
                  if (typeof _globalWindow2['default'].Event !== 'object') {
                    try {
                      event = new _globalWindow2['default'].Event('change');
                    } catch (err) {}
                  }
                  if (!event) {
                    event = _globalDocument2['default'].createEvent('Event');
                    event.initEvent('change', true, true);
                  }
                  tracks.dispatchEvent(event);
                });
              })();
            }
          }
          TextTrackMenuItem.prototype.handleClick = function handleClick(event) {
            var kind = this.track['kind'];
            var tracks = this.player_.textTracks();
            _MenuItem.prototype.handleClick.call(this, event);
            if (!tracks)
              return;
            for (var i = 0; i < tracks.length; i++) {
              var track = tracks[i];
              if (track['kind'] !== kind) {
                continue;
              }
              if (track === this.track) {
                track['mode'] = 'showing';
              } else {
                track['mode'] = 'disabled';
              }
            }
          };
          TextTrackMenuItem.prototype.handleTracksChange = function handleTracksChange(event) {
            this.selected(this.track['mode'] === 'showing');
          };
          return TextTrackMenuItem;
        })(_menuMenuItemJs2['default']);
        _componentJs2['default'].registerComponent('TextTrackMenuItem', TextTrackMenuItem);
        exports['default'] = TextTrackMenuItem;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../menu/menu-item.js": 104,
        "../../utils/fn.js": 133,
        "global/document": 1,
        "global/window": 2
      }],
      89: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsDomJs = _dereq_('../../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsFormatTimeJs = _dereq_('../../utils/format-time.js');
        var _utilsFormatTimeJs2 = _interopRequireDefault(_utilsFormatTimeJs);
        var CurrentTimeDisplay = (function(_Component) {
          _inherits(CurrentTimeDisplay, _Component);
          function CurrentTimeDisplay(player, options) {
            _classCallCheck(this, CurrentTimeDisplay);
            _Component.call(this, player, options);
            this.on(player, 'timeupdate', this.updateContent);
          }
          CurrentTimeDisplay.prototype.createEl = function createEl() {
            var el = _Component.prototype.createEl.call(this, 'div', {className: 'vjs-current-time vjs-time-control vjs-control'});
            this.contentEl_ = Dom.createEl('div', {
              className: 'vjs-current-time-display',
              innerHTML: '<span class="vjs-control-text">Current Time </span>' + '0:00'
            }, {'aria-live': 'off'});
            el.appendChild(this.contentEl_);
            return el;
          };
          CurrentTimeDisplay.prototype.updateContent = function updateContent() {
            var time = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();
            var localizedText = this.localize('Current Time');
            var formattedTime = _utilsFormatTimeJs2['default'](time, this.player_.duration());
            this.contentEl_.innerHTML = '<span class="vjs-control-text">' + localizedText + '</span> ' + formattedTime;
          };
          return CurrentTimeDisplay;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('CurrentTimeDisplay', CurrentTimeDisplay);
        exports['default'] = CurrentTimeDisplay;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../utils/dom.js": 131,
        "../../utils/format-time.js": 134
      }],
      90: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsDomJs = _dereq_('../../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsFormatTimeJs = _dereq_('../../utils/format-time.js');
        var _utilsFormatTimeJs2 = _interopRequireDefault(_utilsFormatTimeJs);
        var DurationDisplay = (function(_Component) {
          _inherits(DurationDisplay, _Component);
          function DurationDisplay(player, options) {
            _classCallCheck(this, DurationDisplay);
            _Component.call(this, player, options);
            this.on(player, 'timeupdate', this.updateContent);
            this.on(player, 'loadedmetadata', this.updateContent);
          }
          DurationDisplay.prototype.createEl = function createEl() {
            var el = _Component.prototype.createEl.call(this, 'div', {className: 'vjs-duration vjs-time-control vjs-control'});
            this.contentEl_ = Dom.createEl('div', {
              className: 'vjs-duration-display',
              innerHTML: '<span class="vjs-control-text">' + this.localize('Duration Time') + '</span> 0:00'
            }, {'aria-live': 'off'});
            el.appendChild(this.contentEl_);
            return el;
          };
          DurationDisplay.prototype.updateContent = function updateContent() {
            var duration = this.player_.duration();
            if (duration) {
              var localizedText = this.localize('Duration Time');
              var formattedTime = _utilsFormatTimeJs2['default'](duration);
              this.contentEl_.innerHTML = '<span class="vjs-control-text">' + localizedText + '</span> ' + formattedTime;
            }
          };
          return DurationDisplay;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('DurationDisplay', DurationDisplay);
        exports['default'] = DurationDisplay;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../utils/dom.js": 131,
        "../../utils/format-time.js": 134
      }],
      91: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsDomJs = _dereq_('../../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsFormatTimeJs = _dereq_('../../utils/format-time.js');
        var _utilsFormatTimeJs2 = _interopRequireDefault(_utilsFormatTimeJs);
        var RemainingTimeDisplay = (function(_Component) {
          _inherits(RemainingTimeDisplay, _Component);
          function RemainingTimeDisplay(player, options) {
            _classCallCheck(this, RemainingTimeDisplay);
            _Component.call(this, player, options);
            this.on(player, 'timeupdate', this.updateContent);
          }
          RemainingTimeDisplay.prototype.createEl = function createEl() {
            var el = _Component.prototype.createEl.call(this, 'div', {className: 'vjs-remaining-time vjs-time-control vjs-control'});
            this.contentEl_ = Dom.createEl('div', {
              className: 'vjs-remaining-time-display',
              innerHTML: '<span class="vjs-control-text">' + this.localize('Remaining Time') + '</span> -0:00'
            }, {'aria-live': 'off'});
            el.appendChild(this.contentEl_);
            return el;
          };
          RemainingTimeDisplay.prototype.updateContent = function updateContent() {
            if (this.player_.duration()) {
              var localizedText = this.localize('Remaining Time');
              var formattedTime = _utilsFormatTimeJs2['default'](this.player_.remainingTime());
              this.contentEl_.innerHTML = '<span class="vjs-control-text">' + localizedText + '</span> -' + formattedTime;
            }
          };
          return RemainingTimeDisplay;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('RemainingTimeDisplay', RemainingTimeDisplay);
        exports['default'] = RemainingTimeDisplay;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../utils/dom.js": 131,
        "../../utils/format-time.js": 134
      }],
      92: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var TimeDivider = (function(_Component) {
          _inherits(TimeDivider, _Component);
          function TimeDivider() {
            _classCallCheck(this, TimeDivider);
            _Component.apply(this, arguments);
          }
          TimeDivider.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
              className: 'vjs-time-control vjs-time-divider',
              innerHTML: '<div><span>/</span></div>'
            });
          };
          return TimeDivider;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('TimeDivider', TimeDivider);
        exports['default'] = TimeDivider;
        module.exports = exports['default'];
      }, {"../../component.js": 66}],
      93: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _sliderSliderJs = _dereq_('../../slider/slider.js');
        var _sliderSliderJs2 = _interopRequireDefault(_sliderSliderJs);
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsFnJs = _dereq_('../../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _volumeLevelJs = _dereq_('./volume-level.js');
        var _volumeLevelJs2 = _interopRequireDefault(_volumeLevelJs);
        var VolumeBar = (function(_Slider) {
          _inherits(VolumeBar, _Slider);
          function VolumeBar(player, options) {
            _classCallCheck(this, VolumeBar);
            _Slider.call(this, player, options);
            this.on(player, 'volumechange', this.updateARIAAttributes);
            player.ready(Fn.bind(this, this.updateARIAAttributes));
          }
          VolumeBar.prototype.createEl = function createEl() {
            return _Slider.prototype.createEl.call(this, 'div', {className: 'vjs-volume-bar vjs-slider-bar'}, {'aria-label': 'volume level'});
          };
          VolumeBar.prototype.handleMouseMove = function handleMouseMove(event) {
            this.checkMuted();
            this.player_.volume(this.calculateDistance(event));
          };
          VolumeBar.prototype.checkMuted = function checkMuted() {
            if (this.player_.muted()) {
              this.player_.muted(false);
            }
          };
          VolumeBar.prototype.getPercent = function getPercent() {
            if (this.player_.muted()) {
              return 0;
            } else {
              return this.player_.volume();
            }
          };
          VolumeBar.prototype.stepForward = function stepForward() {
            this.checkMuted();
            this.player_.volume(this.player_.volume() + 0.1);
          };
          VolumeBar.prototype.stepBack = function stepBack() {
            this.checkMuted();
            this.player_.volume(this.player_.volume() - 0.1);
          };
          VolumeBar.prototype.updateARIAAttributes = function updateARIAAttributes() {
            var volume = (this.player_.volume() * 100).toFixed(2);
            this.el_.setAttribute('aria-valuenow', volume);
            this.el_.setAttribute('aria-valuetext', volume + '%');
          };
          return VolumeBar;
        })(_sliderSliderJs2['default']);
        VolumeBar.prototype.options_ = {
          children: ['volumeLevel'],
          'barName': 'volumeLevel'
        };
        VolumeBar.prototype.playerEvent = 'volumechange';
        _componentJs2['default'].registerComponent('VolumeBar', VolumeBar);
        exports['default'] = VolumeBar;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "../../slider/slider.js": 113,
        "../../utils/fn.js": 133,
        "./volume-level.js": 95
      }],
      94: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _volumeBarJs = _dereq_('./volume-bar.js');
        var _volumeBarJs2 = _interopRequireDefault(_volumeBarJs);
        var VolumeControl = (function(_Component) {
          _inherits(VolumeControl, _Component);
          function VolumeControl(player, options) {
            _classCallCheck(this, VolumeControl);
            _Component.call(this, player, options);
            if (player.tech_ && player.tech_['featuresVolumeControl'] === false) {
              this.addClass('vjs-hidden');
            }
            this.on(player, 'loadstart', function() {
              if (player.tech_['featuresVolumeControl'] === false) {
                this.addClass('vjs-hidden');
              } else {
                this.removeClass('vjs-hidden');
              }
            });
          }
          VolumeControl.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {className: 'vjs-volume-control vjs-control'});
          };
          return VolumeControl;
        })(_componentJs2['default']);
        VolumeControl.prototype.options_ = {children: ['volumeBar']};
        _componentJs2['default'].registerComponent('VolumeControl', VolumeControl);
        exports['default'] = VolumeControl;
        module.exports = exports['default'];
      }, {
        "../../component.js": 66,
        "./volume-bar.js": 93
      }],
      95: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var VolumeLevel = (function(_Component) {
          _inherits(VolumeLevel, _Component);
          function VolumeLevel() {
            _classCallCheck(this, VolumeLevel);
            _Component.apply(this, arguments);
          }
          VolumeLevel.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
              className: 'vjs-volume-level',
              innerHTML: '<span class="vjs-control-text"></span>'
            });
          };
          return VolumeLevel;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('VolumeLevel', VolumeLevel);
        exports['default'] = VolumeLevel;
        module.exports = exports['default'];
      }, {"../../component.js": 66}],
      96: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _utilsFnJs = _dereq_('../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _componentJs = _dereq_('../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _popupPopupJs = _dereq_('../popup/popup.js');
        var _popupPopupJs2 = _interopRequireDefault(_popupPopupJs);
        var _popupPopupButtonJs = _dereq_('../popup/popup-button.js');
        var _popupPopupButtonJs2 = _interopRequireDefault(_popupPopupButtonJs);
        var _muteToggleJs = _dereq_('./mute-toggle.js');
        var _muteToggleJs2 = _interopRequireDefault(_muteToggleJs);
        var _volumeControlVolumeBarJs = _dereq_('./volume-control/volume-bar.js');
        var _volumeControlVolumeBarJs2 = _interopRequireDefault(_volumeControlVolumeBarJs);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var VolumeMenuButton = (function(_PopupButton) {
          _inherits(VolumeMenuButton, _PopupButton);
          function VolumeMenuButton(player) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            _classCallCheck(this, VolumeMenuButton);
            if (options.inline === undefined) {
              options.inline = true;
            }
            if (options.vertical === undefined) {
              if (options.inline) {
                options.vertical = false;
              } else {
                options.vertical = true;
              }
            }
            options.volumeBar = options.volumeBar || {};
            options.volumeBar.vertical = !!options.vertical;
            _PopupButton.call(this, player, options);
            this.on(player, 'volumechange', this.volumeUpdate);
            this.on(player, 'loadstart', this.volumeUpdate);
            function updateVisibility() {
              if (player.tech_ && player.tech_['featuresVolumeControl'] === false) {
                this.addClass('vjs-hidden');
              } else {
                this.removeClass('vjs-hidden');
              }
            }
            updateVisibility.call(this);
            this.on(player, 'loadstart', updateVisibility);
            this.on(this.volumeBar, ['slideractive', 'focus'], function() {
              this.addClass('vjs-slider-active');
            });
            this.on(this.volumeBar, ['sliderinactive', 'blur'], function() {
              this.removeClass('vjs-slider-active');
            });
            this.on(this.volumeBar, ['focus'], function() {
              this.addClass('vjs-lock-showing');
            });
            this.on(this.volumeBar, ['blur'], function() {
              this.removeClass('vjs-lock-showing');
            });
          }
          VolumeMenuButton.prototype.buildCSSClass = function buildCSSClass() {
            var orientationClass = '';
            if (!!this.options_.vertical) {
              orientationClass = 'vjs-volume-menu-button-vertical';
            } else {
              orientationClass = 'vjs-volume-menu-button-horizontal';
            }
            return 'vjs-volume-menu-button ' + _PopupButton.prototype.buildCSSClass.call(this) + ' ' + orientationClass;
          };
          VolumeMenuButton.prototype.createPopup = function createPopup() {
            var popup = new _popupPopupJs2['default'](this.player_, {contentElType: 'div'});
            var vb = new _volumeControlVolumeBarJs2['default'](this.player_, this.options_.volumeBar);
            popup.addChild(vb);
            this.volumeBar = vb;
            this.attachVolumeBarEvents();
            return popup;
          };
          VolumeMenuButton.prototype.handleClick = function handleClick() {
            _muteToggleJs2['default'].prototype.handleClick.call(this);
            _PopupButton.prototype.handleClick.call(this);
          };
          VolumeMenuButton.prototype.attachVolumeBarEvents = function attachVolumeBarEvents() {
            this.on(['mousedown', 'touchdown'], this.handleMouseDown);
          };
          VolumeMenuButton.prototype.handleMouseDown = function handleMouseDown(event) {
            this.on(['mousemove', 'touchmove'], Fn.bind(this.volumeBar, this.volumeBar.handleMouseMove));
            this.on(_globalDocument2['default'], ['mouseup', 'touchend'], this.handleMouseUp);
          };
          VolumeMenuButton.prototype.handleMouseUp = function handleMouseUp(event) {
            this.off(['mousemove', 'touchmove'], Fn.bind(this.volumeBar, this.volumeBar.handleMouseMove));
          };
          return VolumeMenuButton;
        })(_popupPopupButtonJs2['default']);
        VolumeMenuButton.prototype.volumeUpdate = _muteToggleJs2['default'].prototype.update;
        VolumeMenuButton.prototype.controlText_ = 'Mute';
        _componentJs2['default'].registerComponent('VolumeMenuButton', VolumeMenuButton);
        exports['default'] = VolumeMenuButton;
        module.exports = exports['default'];
      }, {
        "../component.js": 66,
        "../popup/popup-button.js": 109,
        "../popup/popup.js": 110,
        "../utils/fn.js": 133,
        "./mute-toggle.js": 70,
        "./volume-control/volume-bar.js": 93,
        "global/document": 1
      }],
      97: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _component = _dereq_('./component');
        var _component2 = _interopRequireDefault(_component);
        var _modalDialog = _dereq_('./modal-dialog');
        var _modalDialog2 = _interopRequireDefault(_modalDialog);
        var _utilsDom = _dereq_('./utils/dom');
        var Dom = _interopRequireWildcard(_utilsDom);
        var _utilsMergeOptions = _dereq_('./utils/merge-options');
        var _utilsMergeOptions2 = _interopRequireDefault(_utilsMergeOptions);
        var ErrorDisplay = (function(_ModalDialog) {
          _inherits(ErrorDisplay, _ModalDialog);
          function ErrorDisplay(player, options) {
            _classCallCheck(this, ErrorDisplay);
            _ModalDialog.call(this, player, options);
            this.on(player, 'error', this.open);
          }
          ErrorDisplay.prototype.buildCSSClass = function buildCSSClass() {
            return 'vjs-error-display ' + _ModalDialog.prototype.buildCSSClass.call(this);
          };
          ErrorDisplay.prototype.content = function content() {
            var error = this.player().error();
            return error ? this.localize(error.message) : '';
          };
          return ErrorDisplay;
        })(_modalDialog2['default']);
        ErrorDisplay.prototype.options_ = _utilsMergeOptions2['default'](_modalDialog2['default'].prototype.options_, {
          fillAlways: true,
          temporary: false,
          uncloseable: true
        });
        _component2['default'].registerComponent('ErrorDisplay', ErrorDisplay);
        exports['default'] = ErrorDisplay;
        module.exports = exports['default'];
      }, {
        "./component": 66,
        "./modal-dialog": 106,
        "./utils/dom": 131,
        "./utils/merge-options": 137
      }],
      98: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        var _utilsEventsJs = _dereq_('./utils/events.js');
        var Events = _interopRequireWildcard(_utilsEventsJs);
        var EventTarget = function EventTarget() {};
        EventTarget.prototype.allowedEvents_ = {};
        EventTarget.prototype.on = function(type, fn) {
          var ael = this.addEventListener;
          this.addEventListener = Function.prototype;
          Events.on(this, type, fn);
          this.addEventListener = ael;
        };
        EventTarget.prototype.addEventListener = EventTarget.prototype.on;
        EventTarget.prototype.off = function(type, fn) {
          Events.off(this, type, fn);
        };
        EventTarget.prototype.removeEventListener = EventTarget.prototype.off;
        EventTarget.prototype.one = function(type, fn) {
          Events.one(this, type, fn);
        };
        EventTarget.prototype.trigger = function(event) {
          var type = event.type || event;
          if (typeof event === 'string') {
            event = {type: type};
          }
          event = Events.fixEvent(event);
          if (this.allowedEvents_[type] && this['on' + type]) {
            this['on' + type](event);
          }
          Events.trigger(this, event);
        };
        EventTarget.prototype.dispatchEvent = EventTarget.prototype.trigger;
        exports['default'] = EventTarget;
        module.exports = exports['default'];
      }, {"./utils/events.js": 132}],
      99: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _utilsLog = _dereq_('./utils/log');
        var _utilsLog2 = _interopRequireDefault(_utilsLog);
        var _inherits = function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass) {
            subClass.super_ = superClass;
          }
        };
        var extendFn = function extendFn(superClass) {
          var subClassMethods = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          var subClass = function subClass() {
            superClass.apply(this, arguments);
          };
          var methods = {};
          if (typeof subClassMethods === 'object') {
            if (typeof subClassMethods.init === 'function') {
              _utilsLog2['default'].warn('Constructor logic via init() is deprecated; please use constructor() instead.');
              subClassMethods.constructor = subClassMethods.init;
            }
            if (subClassMethods.constructor !== Object.prototype.constructor) {
              subClass = subClassMethods.constructor;
            }
            methods = subClassMethods;
          } else if (typeof subClassMethods === 'function') {
            subClass = subClassMethods;
          }
          _inherits(subClass, superClass);
          for (var name in methods) {
            if (methods.hasOwnProperty(name)) {
              subClass.prototype[name] = methods[name];
            }
          }
          return subClass;
        };
        exports['default'] = extendFn;
        module.exports = exports['default'];
      }, {"./utils/log": 136}],
      100: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var FullscreenApi = {};
        var apiMap = [['requestFullscreen', 'exitFullscreen', 'fullscreenElement', 'fullscreenEnabled', 'fullscreenchange', 'fullscreenerror'], ['webkitRequestFullscreen', 'webkitExitFullscreen', 'webkitFullscreenElement', 'webkitFullscreenEnabled', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitCurrentFullScreenElement', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitfullscreenerror'], ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozFullScreenElement', 'mozFullScreenEnabled', 'mozfullscreenchange', 'mozfullscreenerror'], ['msRequestFullscreen', 'msExitFullscreen', 'msFullscreenElement', 'msFullscreenEnabled', 'MSFullscreenChange', 'MSFullscreenError']];
        var specApi = apiMap[0];
        var browserApi = undefined;
        for (var i = 0; i < apiMap.length; i++) {
          if (apiMap[i][1] in _globalDocument2['default']) {
            browserApi = apiMap[i];
            break;
          }
        }
        if (browserApi) {
          for (var i = 0; i < browserApi.length; i++) {
            FullscreenApi[specApi[i]] = browserApi[i];
          }
        }
        exports['default'] = FullscreenApi;
        module.exports = exports['default'];
      }, {"global/document": 1}],
      101: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _component = _dereq_('./component');
        var _component2 = _interopRequireDefault(_component);
        var LoadingSpinner = (function(_Component) {
          _inherits(LoadingSpinner, _Component);
          function LoadingSpinner() {
            _classCallCheck(this, LoadingSpinner);
            _Component.apply(this, arguments);
          }
          LoadingSpinner.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {className: 'vjs-loading-spinner'});
          };
          return LoadingSpinner;
        })(_component2['default']);
        _component2['default'].registerComponent('LoadingSpinner', LoadingSpinner);
        exports['default'] = LoadingSpinner;
        module.exports = exports['default'];
      }, {"./component": 66}],
      102: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _objectAssign = _dereq_('object.assign');
        var _objectAssign2 = _interopRequireDefault(_objectAssign);
        var MediaError = function MediaError(code) {
          if (typeof code === 'number') {
            this.code = code;
          } else if (typeof code === 'string') {
            this.message = code;
          } else if (typeof code === 'object') {
            _objectAssign2['default'](this, code);
          }
          if (!this.message) {
            this.message = MediaError.defaultMessages[this.code] || '';
          }
        };
        MediaError.prototype.code = 0;
        MediaError.prototype.message = '';
        MediaError.prototype.status = null;
        MediaError.errorTypes = ['MEDIA_ERR_CUSTOM', 'MEDIA_ERR_ABORTED', 'MEDIA_ERR_NETWORK', 'MEDIA_ERR_DECODE', 'MEDIA_ERR_SRC_NOT_SUPPORTED', 'MEDIA_ERR_ENCRYPTED'];
        MediaError.defaultMessages = {
          1: 'You aborted the media playback',
          2: 'A network error caused the media download to fail part-way.',
          3: 'The media playback was aborted due to a corruption problem or because the media used features your browser did not support.',
          4: 'The media could not be loaded, either because the server or network failed or because the format is not supported.',
          5: 'The media is encrypted and we do not have the keys to decrypt it.'
        };
        for (var errNum = 0; errNum < MediaError.errorTypes.length; errNum++) {
          MediaError[MediaError.errorTypes[errNum]] = errNum;
          MediaError.prototype[MediaError.errorTypes[errNum]] = errNum;
        }
        exports['default'] = MediaError;
        module.exports = exports['default'];
      }, {"object.assign": 45}],
      103: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _clickableComponentJs = _dereq_('../clickable-component.js');
        var _clickableComponentJs2 = _interopRequireDefault(_clickableComponentJs);
        var _componentJs = _dereq_('../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _menuJs = _dereq_('./menu.js');
        var _menuJs2 = _interopRequireDefault(_menuJs);
        var _utilsDomJs = _dereq_('../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsFnJs = _dereq_('../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsToTitleCaseJs = _dereq_('../utils/to-title-case.js');
        var _utilsToTitleCaseJs2 = _interopRequireDefault(_utilsToTitleCaseJs);
        var MenuButton = (function(_ClickableComponent) {
          _inherits(MenuButton, _ClickableComponent);
          function MenuButton(player) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            _classCallCheck(this, MenuButton);
            _ClickableComponent.call(this, player, options);
            this.update();
            this.el_.setAttribute('aria-haspopup', true);
            this.el_.setAttribute('role', 'menuitem');
            this.on('keydown', this.handleSubmenuKeyPress);
          }
          MenuButton.prototype.update = function update() {
            var menu = this.createMenu();
            if (this.menu) {
              this.removeChild(this.menu);
            }
            this.menu = menu;
            this.addChild(menu);
            this.buttonPressed_ = false;
            this.el_.setAttribute('aria-expanded', false);
            if (this.items && this.items.length === 0) {
              this.hide();
            } else if (this.items && this.items.length > 1) {
              this.show();
            }
          };
          MenuButton.prototype.createMenu = function createMenu() {
            var menu = new _menuJs2['default'](this.player_);
            if (this.options_.title) {
              menu.contentEl().appendChild(Dom.createEl('li', {
                className: 'vjs-menu-title',
                innerHTML: _utilsToTitleCaseJs2['default'](this.options_.title),
                tabIndex: -1
              }));
            }
            this.items = this['createItems']();
            if (this.items) {
              for (var i = 0; i < this.items.length; i++) {
                menu.addItem(this.items[i]);
              }
            }
            return menu;
          };
          MenuButton.prototype.createItems = function createItems() {};
          MenuButton.prototype.createEl = function createEl() {
            return _ClickableComponent.prototype.createEl.call(this, 'div', {className: this.buildCSSClass()});
          };
          MenuButton.prototype.buildCSSClass = function buildCSSClass() {
            var menuButtonClass = 'vjs-menu-button';
            if (this.options_.inline === true) {
              menuButtonClass += '-inline';
            } else {
              menuButtonClass += '-popup';
            }
            return 'vjs-menu-button ' + menuButtonClass + ' ' + _ClickableComponent.prototype.buildCSSClass.call(this);
          };
          MenuButton.prototype.handleClick = function handleClick() {
            this.one('mouseout', Fn.bind(this, function() {
              this.menu.unlockShowing();
              this.el_.blur();
            }));
            if (this.buttonPressed_) {
              this.unpressButton();
            } else {
              this.pressButton();
            }
          };
          MenuButton.prototype.handleKeyPress = function handleKeyPress(event) {
            if (event.which === 27 || event.which === 9) {
              if (this.buttonPressed_) {
                this.unpressButton();
              }
              if (event.which !== 9) {
                event.preventDefault();
              }
            } else if (event.which === 38 || event.which === 40) {
              if (!this.buttonPressed_) {
                this.pressButton();
                event.preventDefault();
              }
            } else {
              _ClickableComponent.prototype.handleKeyPress.call(this, event);
            }
          };
          MenuButton.prototype.handleSubmenuKeyPress = function handleSubmenuKeyPress(event) {
            if (event.which === 27 || event.which === 9) {
              if (this.buttonPressed_) {
                this.unpressButton();
              }
              if (event.which !== 9) {
                event.preventDefault();
              }
            }
          };
          MenuButton.prototype.pressButton = function pressButton() {
            this.buttonPressed_ = true;
            this.menu.lockShowing();
            this.el_.setAttribute('aria-expanded', true);
            this.menu.focus();
          };
          MenuButton.prototype.unpressButton = function unpressButton() {
            this.buttonPressed_ = false;
            this.menu.unlockShowing();
            this.el_.setAttribute('aria-expanded', false);
            this.el_.focus();
          };
          return MenuButton;
        })(_clickableComponentJs2['default']);
        _componentJs2['default'].registerComponent('MenuButton', MenuButton);
        exports['default'] = MenuButton;
        module.exports = exports['default'];
      }, {
        "../clickable-component.js": 64,
        "../component.js": 66,
        "../utils/dom.js": 131,
        "../utils/fn.js": 133,
        "../utils/to-title-case.js": 140,
        "./menu.js": 105
      }],
      104: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _clickableComponentJs = _dereq_('../clickable-component.js');
        var _clickableComponentJs2 = _interopRequireDefault(_clickableComponentJs);
        var _componentJs = _dereq_('../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _objectAssign = _dereq_('object.assign');
        var _objectAssign2 = _interopRequireDefault(_objectAssign);
        var MenuItem = (function(_ClickableComponent) {
          _inherits(MenuItem, _ClickableComponent);
          function MenuItem(player, options) {
            _classCallCheck(this, MenuItem);
            _ClickableComponent.call(this, player, options);
            this.selectable = options['selectable'];
            this.selected(options['selected']);
            if (this.selectable) {
              this.el_.setAttribute('role', 'menuitemcheckbox');
            } else {
              this.el_.setAttribute('role', 'menuitem');
            }
          }
          MenuItem.prototype.createEl = function createEl(type, props, attrs) {
            return _ClickableComponent.prototype.createEl.call(this, 'li', _objectAssign2['default']({
              className: 'vjs-menu-item',
              innerHTML: this.localize(this.options_['label']),
              tabIndex: -1
            }, props), attrs);
          };
          MenuItem.prototype.handleClick = function handleClick() {
            this.selected(true);
          };
          MenuItem.prototype.selected = function selected(_selected) {
            if (this.selectable) {
              if (_selected) {
                this.addClass('vjs-selected');
                this.el_.setAttribute('aria-checked', true);
                this.controlText(', selected');
              } else {
                this.removeClass('vjs-selected');
                this.el_.setAttribute('aria-checked', false);
                this.controlText(' ');
              }
            }
          };
          return MenuItem;
        })(_clickableComponentJs2['default']);
        _componentJs2['default'].registerComponent('MenuItem', MenuItem);
        exports['default'] = MenuItem;
        module.exports = exports['default'];
      }, {
        "../clickable-component.js": 64,
        "../component.js": 66,
        "object.assign": 45
      }],
      105: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsDomJs = _dereq_('../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsFnJs = _dereq_('../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsEventsJs = _dereq_('../utils/events.js');
        var Events = _interopRequireWildcard(_utilsEventsJs);
        var Menu = (function(_Component) {
          _inherits(Menu, _Component);
          function Menu(player, options) {
            _classCallCheck(this, Menu);
            _Component.call(this, player, options);
            this.focusedChild_ = -1;
            this.on('keydown', this.handleKeyPress);
          }
          Menu.prototype.addItem = function addItem(component) {
            this.addChild(component);
            component.on('click', Fn.bind(this, function() {
              this.unlockShowing();
            }));
          };
          Menu.prototype.createEl = function createEl() {
            var contentElType = this.options_.contentElType || 'ul';
            this.contentEl_ = Dom.createEl(contentElType, {className: 'vjs-menu-content'});
            this.contentEl_.setAttribute('role', 'menu');
            var el = _Component.prototype.createEl.call(this, 'div', {
              append: this.contentEl_,
              className: 'vjs-menu'
            });
            el.setAttribute('role', 'presentation');
            el.appendChild(this.contentEl_);
            Events.on(el, 'click', function(event) {
              event.preventDefault();
              event.stopImmediatePropagation();
            });
            return el;
          };
          Menu.prototype.handleKeyPress = function handleKeyPress(event) {
            if (event.which === 37 || event.which === 40) {
              event.preventDefault();
              this.stepForward();
            } else if (event.which === 38 || event.which === 39) {
              event.preventDefault();
              this.stepBack();
            }
          };
          Menu.prototype.stepForward = function stepForward() {
            var stepChild = 0;
            if (this.focusedChild_ !== undefined) {
              stepChild = this.focusedChild_ + 1;
            }
            this.focus(stepChild);
          };
          Menu.prototype.stepBack = function stepBack() {
            var stepChild = 0;
            if (this.focusedChild_ !== undefined) {
              stepChild = this.focusedChild_ - 1;
            }
            this.focus(stepChild);
          };
          Menu.prototype.focus = function focus() {
            var item = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var children = this.children();
            if (children.length > 0) {
              if (item < 0) {
                item = 0;
              } else if (item >= children.length) {
                item = children.length - 1;
              }
              this.focusedChild_ = item;
              children[item].el_.focus();
            }
          };
          return Menu;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('Menu', Menu);
        exports['default'] = Menu;
        module.exports = exports['default'];
      }, {
        "../component.js": 66,
        "../utils/dom.js": 131,
        "../utils/events.js": 132,
        "../utils/fn.js": 133
      }],
      106: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _utilsDom = _dereq_('./utils/dom');
        var Dom = _interopRequireWildcard(_utilsDom);
        var _utilsFn = _dereq_('./utils/fn');
        var Fn = _interopRequireWildcard(_utilsFn);
        var _utilsLog = _dereq_('./utils/log');
        var _utilsLog2 = _interopRequireDefault(_utilsLog);
        var _component = _dereq_('./component');
        var _component2 = _interopRequireDefault(_component);
        var _closeButton = _dereq_('./close-button');
        var _closeButton2 = _interopRequireDefault(_closeButton);
        var MODAL_CLASS_NAME = 'vjs-modal-dialog';
        var ESC = 27;
        var ModalDialog = (function(_Component) {
          _inherits(ModalDialog, _Component);
          function ModalDialog(player, options) {
            _classCallCheck(this, ModalDialog);
            _Component.call(this, player, options);
            this.opened_ = this.hasBeenOpened_ = this.hasBeenFilled_ = false;
            this.closeable(!this.options_.uncloseable);
            this.content(this.options_.content);
            this.contentEl_ = Dom.createEl('div', {className: MODAL_CLASS_NAME + '-content'}, {role: 'document'});
            this.descEl_ = Dom.createEl('p', {
              className: MODAL_CLASS_NAME + '-description vjs-offscreen',
              id: this.el().getAttribute('aria-describedby')
            });
            Dom.textContent(this.descEl_, this.description());
            this.el_.appendChild(this.descEl_);
            this.el_.appendChild(this.contentEl_);
          }
          ModalDialog.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
              className: this.buildCSSClass(),
              tabIndex: -1
            }, {
              'aria-describedby': this.id() + '_description',
              'aria-hidden': 'true',
              'aria-label': this.label(),
              role: 'dialog'
            });
          };
          ModalDialog.prototype.buildCSSClass = function buildCSSClass() {
            return MODAL_CLASS_NAME + ' vjs-hidden ' + _Component.prototype.buildCSSClass.call(this);
          };
          ModalDialog.prototype.handleKeyPress = function handleKeyPress(e) {
            if (e.which === ESC && this.closeable()) {
              this.close();
            }
          };
          ModalDialog.prototype.label = function label() {
            return this.options_.label || this.localize('Modal Window');
          };
          ModalDialog.prototype.description = function description() {
            var desc = this.options_.description || this.localize('This is a modal window.');
            if (this.closeable()) {
              desc += ' ' + this.localize('This modal can be closed by pressing the Escape key or activating the close button.');
            }
            return desc;
          };
          ModalDialog.prototype.open = function open() {
            if (!this.opened_) {
              var player = this.player();
              this.trigger('beforemodalopen');
              this.opened_ = true;
              if (this.options_.fillAlways || !this.hasBeenOpened_ && !this.hasBeenFilled_) {
                this.fill();
              }
              this.wasPlaying_ = !player.paused();
              if (this.wasPlaying_) {
                player.pause();
              }
              if (this.closeable()) {
                this.on(_globalDocument2['default'], 'keydown', Fn.bind(this, this.handleKeyPress));
              }
              player.controls(false);
              this.show();
              this.el().setAttribute('aria-hidden', 'false');
              this.trigger('modalopen');
              this.hasBeenOpened_ = true;
            }
            return this;
          };
          ModalDialog.prototype.opened = function opened(value) {
            if (typeof value === 'boolean') {
              this[value ? 'open' : 'close']();
            }
            return this.opened_;
          };
          ModalDialog.prototype.close = function close() {
            if (this.opened_) {
              var player = this.player();
              this.trigger('beforemodalclose');
              this.opened_ = false;
              if (this.wasPlaying_) {
                player.play();
              }
              if (this.closeable()) {
                this.off(_globalDocument2['default'], 'keydown', Fn.bind(this, this.handleKeyPress));
              }
              player.controls(true);
              this.hide();
              this.el().setAttribute('aria-hidden', 'true');
              this.trigger('modalclose');
              if (this.options_.temporary) {
                this.dispose();
              }
            }
            return this;
          };
          ModalDialog.prototype.closeable = function closeable(value) {
            if (typeof value === 'boolean') {
              var closeable = this.closeable_ = !!value;
              var _close = this.getChild('closeButton');
              if (closeable && !_close) {
                var temp = this.contentEl_;
                this.contentEl_ = this.el_;
                _close = this.addChild('closeButton');
                this.contentEl_ = temp;
                this.on(_close, 'close', this.close);
              }
              if (!closeable && _close) {
                this.off(_close, 'close', this.close);
                this.removeChild(_close);
                _close.dispose();
              }
            }
            return this.closeable_;
          };
          ModalDialog.prototype.fill = function fill() {
            return this.fillWith(this.content());
          };
          ModalDialog.prototype.fillWith = function fillWith(content) {
            var contentEl = this.contentEl();
            var parentEl = contentEl.parentNode;
            var nextSiblingEl = contentEl.nextSibling;
            this.trigger('beforemodalfill');
            this.hasBeenFilled_ = true;
            parentEl.removeChild(contentEl);
            this.empty();
            Dom.insertContent(contentEl, content);
            this.trigger('modalfill');
            if (nextSiblingEl) {
              parentEl.insertBefore(contentEl, nextSiblingEl);
            } else {
              parentEl.appendChild(contentEl);
            }
            return this;
          };
          ModalDialog.prototype.empty = function empty() {
            this.trigger('beforemodalempty');
            Dom.emptyEl(this.contentEl());
            this.trigger('modalempty');
            return this;
          };
          ModalDialog.prototype.content = function content(value) {
            if (typeof value !== 'undefined') {
              this.content_ = value;
            }
            return this.content_;
          };
          return ModalDialog;
        })(_component2['default']);
        ModalDialog.prototype.options_ = {temporary: true};
        _component2['default'].registerComponent('ModalDialog', ModalDialog);
        exports['default'] = ModalDialog;
        module.exports = exports['default'];
      }, {
        "./close-button": 65,
        "./component": 66,
        "./utils/dom": 131,
        "./utils/fn": 133,
        "./utils/log": 136,
        "global/document": 1
      }],
      107: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('./component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var _utilsEventsJs = _dereq_('./utils/events.js');
        var Events = _interopRequireWildcard(_utilsEventsJs);
        var _utilsDomJs = _dereq_('./utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsFnJs = _dereq_('./utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsGuidJs = _dereq_('./utils/guid.js');
        var Guid = _interopRequireWildcard(_utilsGuidJs);
        var _utilsBrowserJs = _dereq_('./utils/browser.js');
        var browser = _interopRequireWildcard(_utilsBrowserJs);
        var _utilsLogJs = _dereq_('./utils/log.js');
        var _utilsLogJs2 = _interopRequireDefault(_utilsLogJs);
        var _utilsToTitleCaseJs = _dereq_('./utils/to-title-case.js');
        var _utilsToTitleCaseJs2 = _interopRequireDefault(_utilsToTitleCaseJs);
        var _utilsTimeRangesJs = _dereq_('./utils/time-ranges.js');
        var _utilsBufferJs = _dereq_('./utils/buffer.js');
        var _utilsStylesheetJs = _dereq_('./utils/stylesheet.js');
        var stylesheet = _interopRequireWildcard(_utilsStylesheetJs);
        var _fullscreenApiJs = _dereq_('./fullscreen-api.js');
        var _fullscreenApiJs2 = _interopRequireDefault(_fullscreenApiJs);
        var _mediaErrorJs = _dereq_('./media-error.js');
        var _mediaErrorJs2 = _interopRequireDefault(_mediaErrorJs);
        var _safeJsonParseTuple = _dereq_('safe-json-parse/tuple');
        var _safeJsonParseTuple2 = _interopRequireDefault(_safeJsonParseTuple);
        var _objectAssign = _dereq_('object.assign');
        var _objectAssign2 = _interopRequireDefault(_objectAssign);
        var _utilsMergeOptionsJs = _dereq_('./utils/merge-options.js');
        var _utilsMergeOptionsJs2 = _interopRequireDefault(_utilsMergeOptionsJs);
        var _tracksTextTrackListConverterJs = _dereq_('./tracks/text-track-list-converter.js');
        var _tracksTextTrackListConverterJs2 = _interopRequireDefault(_tracksTextTrackListConverterJs);
        var _techLoaderJs = _dereq_('./tech/loader.js');
        var _techLoaderJs2 = _interopRequireDefault(_techLoaderJs);
        var _posterImageJs = _dereq_('./poster-image.js');
        var _posterImageJs2 = _interopRequireDefault(_posterImageJs);
        var _tracksTextTrackDisplayJs = _dereq_('./tracks/text-track-display.js');
        var _tracksTextTrackDisplayJs2 = _interopRequireDefault(_tracksTextTrackDisplayJs);
        var _loadingSpinnerJs = _dereq_('./loading-spinner.js');
        var _loadingSpinnerJs2 = _interopRequireDefault(_loadingSpinnerJs);
        var _bigPlayButtonJs = _dereq_('./big-play-button.js');
        var _bigPlayButtonJs2 = _interopRequireDefault(_bigPlayButtonJs);
        var _controlBarControlBarJs = _dereq_('./control-bar/control-bar.js');
        var _controlBarControlBarJs2 = _interopRequireDefault(_controlBarControlBarJs);
        var _errorDisplayJs = _dereq_('./error-display.js');
        var _errorDisplayJs2 = _interopRequireDefault(_errorDisplayJs);
        var _tracksTextTrackSettingsJs = _dereq_('./tracks/text-track-settings.js');
        var _tracksTextTrackSettingsJs2 = _interopRequireDefault(_tracksTextTrackSettingsJs);
        var _modalDialog = _dereq_('./modal-dialog');
        var _modalDialog2 = _interopRequireDefault(_modalDialog);
        var _techTechJs = _dereq_('./tech/tech.js');
        var _techTechJs2 = _interopRequireDefault(_techTechJs);
        var _techHtml5Js = _dereq_('./tech/html5.js');
        var _techHtml5Js2 = _interopRequireDefault(_techHtml5Js);
        var Player = (function(_Component) {
          _inherits(Player, _Component);
          function Player(tag, options, ready) {
            var _this = this;
            _classCallCheck(this, Player);
            tag.id = tag.id || 'vjs_video_' + Guid.newGUID();
            options = _objectAssign2['default'](Player.getTagSettings(tag), options);
            options.initChildren = false;
            options.createEl = false;
            options.reportTouchActivity = false;
            _Component.call(this, null, options, ready);
            if (!this.options_ || !this.options_.techOrder || !this.options_.techOrder.length) {
              throw new Error('No techOrder specified. Did you overwrite ' + 'videojs.options instead of just changing the ' + 'properties you want to override?');
            }
            this.tag = tag;
            this.tagAttributes = tag && Dom.getElAttributes(tag);
            this.language(this.options_.language);
            if (options.languages) {
              (function() {
                var languagesToLower = {};
                Object.getOwnPropertyNames(options.languages).forEach(function(name) {
                  languagesToLower[name.toLowerCase()] = options.languages[name];
                });
                _this.languages_ = languagesToLower;
              })();
            } else {
              this.languages_ = Player.prototype.options_.languages;
            }
            this.cache_ = {};
            this.poster_ = options.poster || '';
            this.controls_ = !!options.controls;
            tag.controls = false;
            this.scrubbing_ = false;
            this.el_ = this.createEl();
            var playerOptionsCopy = _utilsMergeOptionsJs2['default'](this.options_);
            if (options.plugins) {
              (function() {
                var plugins = options.plugins;
                Object.getOwnPropertyNames(plugins).forEach(function(name) {
                  if (typeof this[name] === 'function') {
                    this[name](plugins[name]);
                  } else {
                    _utilsLogJs2['default'].error('Unable to find plugin:', name);
                  }
                }, _this);
              })();
            }
            this.options_.playerOptions = playerOptionsCopy;
            this.initChildren();
            this.isAudio(tag.nodeName.toLowerCase() === 'audio');
            if (this.controls()) {
              this.addClass('vjs-controls-enabled');
            } else {
              this.addClass('vjs-controls-disabled');
            }
            if (this.isAudio()) {
              this.addClass('vjs-audio');
            }
            if (this.flexNotSupported_()) {
              this.addClass('vjs-no-flex');
            }
            Player.players[this.id_] = this;
            this.userActive(true);
            this.reportUserActivity();
            this.listenForUserActivity_();
            this.on('fullscreenchange', this.handleFullscreenChange_);
            this.on('stageclick', this.handleStageClick_);
          }
          Player.prototype.dispose = function dispose() {
            this.trigger('dispose');
            this.off('dispose');
            if (this.styleEl_ && this.styleEl_.parentNode) {
              this.styleEl_.parentNode.removeChild(this.styleEl_);
            }
            Player.players[this.id_] = null;
            if (this.tag && this.tag.player) {
              this.tag.player = null;
            }
            if (this.el_ && this.el_.player) {
              this.el_.player = null;
            }
            if (this.tech_) {
              this.tech_.dispose();
            }
            _Component.prototype.dispose.call(this);
          };
          Player.prototype.createEl = function createEl() {
            var el = this.el_ = _Component.prototype.createEl.call(this, 'div');
            var tag = this.tag;
            tag.removeAttribute('width');
            tag.removeAttribute('height');
            var attrs = Dom.getElAttributes(tag);
            Object.getOwnPropertyNames(attrs).forEach(function(attr) {
              if (attr === 'class') {
                el.className = attrs[attr];
              } else {
                el.setAttribute(attr, attrs[attr]);
              }
            });
            tag.playerId = tag.id;
            tag.id += '_html5_api';
            tag.className = 'vjs-tech';
            tag.player = el.player = this;
            this.addClass('vjs-paused');
            this.styleEl_ = stylesheet.createStyleElement('vjs-styles-dimensions');
            var defaultsStyleEl = Dom.$('.vjs-styles-defaults');
            var head = Dom.$('head');
            head.insertBefore(this.styleEl_, defaultsStyleEl ? defaultsStyleEl.nextSibling : head.firstChild);
            this.width(this.options_.width);
            this.height(this.options_.height);
            this.fluid(this.options_.fluid);
            this.aspectRatio(this.options_.aspectRatio);
            tag.initNetworkState_ = tag.networkState;
            if (tag.parentNode) {
              tag.parentNode.insertBefore(el, tag);
            }
            Dom.insertElFirst(tag, el);
            this.children_.unshift(tag);
            this.el_ = el;
            return el;
          };
          Player.prototype.width = function width(value) {
            return this.dimension('width', value);
          };
          Player.prototype.height = function height(value) {
            return this.dimension('height', value);
          };
          Player.prototype.dimension = function dimension(_dimension, value) {
            var privDimension = _dimension + '_';
            if (value === undefined) {
              return this[privDimension] || 0;
            }
            if (value === '') {
              this[privDimension] = undefined;
            } else {
              var parsedVal = parseFloat(value);
              if (isNaN(parsedVal)) {
                _utilsLogJs2['default'].error('Improper value "' + value + '" supplied for for ' + _dimension);
                return this;
              }
              this[privDimension] = parsedVal;
            }
            this.updateStyleEl_();
            return this;
          };
          Player.prototype.fluid = function fluid(bool) {
            if (bool === undefined) {
              return !!this.fluid_;
            }
            this.fluid_ = !!bool;
            if (bool) {
              this.addClass('vjs-fluid');
            } else {
              this.removeClass('vjs-fluid');
            }
          };
          Player.prototype.aspectRatio = function aspectRatio(ratio) {
            if (ratio === undefined) {
              return this.aspectRatio_;
            }
            if (!/^\d+\:\d+$/.test(ratio)) {
              throw new Error('Improper value supplied for aspect ratio. The format should be width:height, for example 16:9.');
            }
            this.aspectRatio_ = ratio;
            this.fluid(true);
            this.updateStyleEl_();
          };
          Player.prototype.updateStyleEl_ = function updateStyleEl_() {
            var width = undefined;
            var height = undefined;
            var aspectRatio = undefined;
            var idClass = undefined;
            if (this.aspectRatio_ !== undefined && this.aspectRatio_ !== 'auto') {
              aspectRatio = this.aspectRatio_;
            } else if (this.videoWidth()) {
              aspectRatio = this.videoWidth() + ':' + this.videoHeight();
            } else {
              aspectRatio = '16:9';
            }
            var ratioParts = aspectRatio.split(':');
            var ratioMultiplier = ratioParts[1] / ratioParts[0];
            if (this.width_ !== undefined) {
              width = this.width_;
            } else if (this.height_ !== undefined) {
              width = this.height_ / ratioMultiplier;
            } else {
              width = this.videoWidth() || 300;
            }
            if (this.height_ !== undefined) {
              height = this.height_;
            } else {
              height = width * ratioMultiplier;
            }
            if (/^[^a-zA-Z]/.test(this.id())) {
              idClass = 'dimensions-' + this.id();
            } else {
              idClass = this.id() + '-dimensions';
            }
            this.addClass(idClass);
            stylesheet.setTextContent(this.styleEl_, '\n      .' + idClass + ' {\n        width: ' + width + 'px;\n        height: ' + height + 'px;\n      }\n\n      .' + idClass + '.vjs-fluid {\n        padding-top: ' + ratioMultiplier * 100 + '%;\n      }\n    ');
          };
          Player.prototype.loadTech_ = function loadTech_(techName, source) {
            if (this.tech_) {
              this.unloadTech_();
            }
            if (techName !== 'Html5' && this.tag) {
              _techTechJs2['default'].getTech('Html5').disposeMediaElement(this.tag);
              this.tag.player = null;
              this.tag = null;
            }
            this.techName_ = techName;
            this.isReady_ = false;
            var techOptions = _objectAssign2['default']({
              'nativeControlsForTouch': this.options_.nativeControlsForTouch,
              'source': source,
              'playerId': this.id(),
              'techId': this.id() + '_' + techName + '_api',
              'textTracks': this.textTracks_,
              'autoplay': this.options_.autoplay,
              'preload': this.options_.preload,
              'loop': this.options_.loop,
              'muted': this.options_.muted,
              'poster': this.poster(),
              'language': this.language(),
              'vtt.js': this.options_['vtt.js']
            }, this.options_[techName.toLowerCase()]);
            if (this.tag) {
              techOptions.tag = this.tag;
            }
            if (source) {
              this.currentType_ = source.type;
              if (source.src === this.cache_.src && this.cache_.currentTime > 0) {
                techOptions.startTime = this.cache_.currentTime;
              }
              this.cache_.src = source.src;
            }
            var techComponent = _techTechJs2['default'].getTech(techName);
            if (!techComponent) {
              techComponent = _componentJs2['default'].getComponent(techName);
            }
            this.tech_ = new techComponent(techOptions);
            this.tech_.ready(Fn.bind(this, this.handleTechReady_), true);
            _tracksTextTrackListConverterJs2['default'].jsonToTextTracks(this.textTracksJson_ || [], this.tech_);
            this.on(this.tech_, 'loadstart', this.handleTechLoadStart_);
            this.on(this.tech_, 'waiting', this.handleTechWaiting_);
            this.on(this.tech_, 'canplay', this.handleTechCanPlay_);
            this.on(this.tech_, 'canplaythrough', this.handleTechCanPlayThrough_);
            this.on(this.tech_, 'playing', this.handleTechPlaying_);
            this.on(this.tech_, 'ended', this.handleTechEnded_);
            this.on(this.tech_, 'seeking', this.handleTechSeeking_);
            this.on(this.tech_, 'seeked', this.handleTechSeeked_);
            this.on(this.tech_, 'play', this.handleTechPlay_);
            this.on(this.tech_, 'firstplay', this.handleTechFirstPlay_);
            this.on(this.tech_, 'pause', this.handleTechPause_);
            this.on(this.tech_, 'progress', this.handleTechProgress_);
            this.on(this.tech_, 'durationchange', this.handleTechDurationChange_);
            this.on(this.tech_, 'fullscreenchange', this.handleTechFullscreenChange_);
            this.on(this.tech_, 'error', this.handleTechError_);
            this.on(this.tech_, 'suspend', this.handleTechSuspend_);
            this.on(this.tech_, 'abort', this.handleTechAbort_);
            this.on(this.tech_, 'emptied', this.handleTechEmptied_);
            this.on(this.tech_, 'stalled', this.handleTechStalled_);
            this.on(this.tech_, 'loadedmetadata', this.handleTechLoadedMetaData_);
            this.on(this.tech_, 'loadeddata', this.handleTechLoadedData_);
            this.on(this.tech_, 'timeupdate', this.handleTechTimeUpdate_);
            this.on(this.tech_, 'ratechange', this.handleTechRateChange_);
            this.on(this.tech_, 'volumechange', this.handleTechVolumeChange_);
            this.on(this.tech_, 'texttrackchange', this.handleTechTextTrackChange_);
            this.on(this.tech_, 'loadedmetadata', this.updateStyleEl_);
            this.on(this.tech_, 'posterchange', this.handleTechPosterChange_);
            this.usingNativeControls(this.techGet_('controls'));
            if (this.controls() && !this.usingNativeControls()) {
              this.addTechControlsListeners_();
            }
            if (this.tech_.el().parentNode !== this.el() && (techName !== 'Html5' || !this.tag)) {
              Dom.insertElFirst(this.tech_.el(), this.el());
            }
            if (this.tag) {
              this.tag.player = null;
              this.tag = null;
            }
          };
          Player.prototype.unloadTech_ = function unloadTech_() {
            this.textTracks_ = this.textTracks();
            this.textTracksJson_ = _tracksTextTrackListConverterJs2['default'].textTracksToJson(this.tech_);
            this.isReady_ = false;
            this.tech_.dispose();
            this.tech_ = false;
          };
          Player.prototype.tech = function tech(safety) {
            if (safety && safety.IWillNotUseThisInPlugins) {
              return this.tech_;
            }
            var errorText = '\n      Please make sure that you are not using this inside of a plugin.\n      To disable this alert and error, please pass in an object with\n      `IWillNotUseThisInPlugins` to the `tech` method. See\n      https://github.com/videojs/video.js/issues/2617 for more info.\n    ';
            _globalWindow2['default'].alert(errorText);
            throw new Error(errorText);
          };
          Player.prototype.addTechControlsListeners_ = function addTechControlsListeners_() {
            this.removeTechControlsListeners_();
            this.on(this.tech_, 'mousedown', this.handleTechClick_);
            this.on(this.tech_, 'touchstart', this.handleTechTouchStart_);
            this.on(this.tech_, 'touchmove', this.handleTechTouchMove_);
            this.on(this.tech_, 'touchend', this.handleTechTouchEnd_);
            this.on(this.tech_, 'tap', this.handleTechTap_);
          };
          Player.prototype.removeTechControlsListeners_ = function removeTechControlsListeners_() {
            this.off(this.tech_, 'tap', this.handleTechTap_);
            this.off(this.tech_, 'touchstart', this.handleTechTouchStart_);
            this.off(this.tech_, 'touchmove', this.handleTechTouchMove_);
            this.off(this.tech_, 'touchend', this.handleTechTouchEnd_);
            this.off(this.tech_, 'mousedown', this.handleTechClick_);
          };
          Player.prototype.handleTechReady_ = function handleTechReady_() {
            this.triggerReady();
            if (this.cache_.volume) {
              this.techCall_('setVolume', this.cache_.volume);
            }
            this.handleTechPosterChange_();
            this.handleTechDurationChange_();
            if (this.src() && this.tag && this.options_.autoplay && this.paused()) {
              delete this.tag.poster;
              this.play();
            }
          };
          Player.prototype.handleTechLoadStart_ = function handleTechLoadStart_() {
            this.removeClass('vjs-ended');
            this.error(null);
            if (!this.paused()) {
              this.trigger('loadstart');
              this.trigger('firstplay');
            } else {
              this.hasStarted(false);
              this.trigger('loadstart');
            }
          };
          Player.prototype.hasStarted = function hasStarted(_hasStarted) {
            if (_hasStarted !== undefined) {
              if (this.hasStarted_ !== _hasStarted) {
                this.hasStarted_ = _hasStarted;
                if (_hasStarted) {
                  this.addClass('vjs-has-started');
                  this.trigger('firstplay');
                } else {
                  this.removeClass('vjs-has-started');
                }
              }
              return this;
            }
            return !!this.hasStarted_;
          };
          Player.prototype.handleTechPlay_ = function handleTechPlay_() {
            this.removeClass('vjs-ended');
            this.removeClass('vjs-paused');
            this.addClass('vjs-playing');
            this.hasStarted(true);
            this.trigger('play');
          };
          Player.prototype.handleTechWaiting_ = function handleTechWaiting_() {
            this.addClass('vjs-waiting');
            this.trigger('waiting');
          };
          Player.prototype.handleTechCanPlay_ = function handleTechCanPlay_() {
            this.removeClass('vjs-waiting');
            this.trigger('canplay');
          };
          Player.prototype.handleTechCanPlayThrough_ = function handleTechCanPlayThrough_() {
            this.removeClass('vjs-waiting');
            this.trigger('canplaythrough');
          };
          Player.prototype.handleTechPlaying_ = function handleTechPlaying_() {
            this.removeClass('vjs-waiting');
            this.trigger('playing');
          };
          Player.prototype.handleTechSeeking_ = function handleTechSeeking_() {
            this.addClass('vjs-seeking');
            this.trigger('seeking');
          };
          Player.prototype.handleTechSeeked_ = function handleTechSeeked_() {
            this.removeClass('vjs-seeking');
            this.trigger('seeked');
          };
          Player.prototype.handleTechFirstPlay_ = function handleTechFirstPlay_() {
            if (this.options_.starttime) {
              this.currentTime(this.options_.starttime);
            }
            this.addClass('vjs-has-started');
            this.trigger('firstplay');
          };
          Player.prototype.handleTechPause_ = function handleTechPause_() {
            this.removeClass('vjs-playing');
            this.addClass('vjs-paused');
            this.trigger('pause');
          };
          Player.prototype.handleTechProgress_ = function handleTechProgress_() {
            this.trigger('progress');
          };
          Player.prototype.handleTechEnded_ = function handleTechEnded_() {
            this.addClass('vjs-ended');
            if (this.options_.loop) {
              this.currentTime(0);
              this.play();
            } else if (!this.paused()) {
              this.pause();
            }
            this.trigger('ended');
          };
          Player.prototype.handleTechDurationChange_ = function handleTechDurationChange_() {
            this.duration(this.techGet_('duration'));
          };
          Player.prototype.handleTechClick_ = function handleTechClick_(event) {
            if (event.button !== 0)
              return;
            if (this.controls()) {
              if (this.paused()) {
                this.play();
              } else {
                this.pause();
              }
            }
          };
          Player.prototype.handleTechTap_ = function handleTechTap_() {
            this.userActive(!this.userActive());
          };
          Player.prototype.handleTechTouchStart_ = function handleTechTouchStart_() {
            this.userWasActive = this.userActive();
          };
          Player.prototype.handleTechTouchMove_ = function handleTechTouchMove_() {
            if (this.userWasActive) {
              this.reportUserActivity();
            }
          };
          Player.prototype.handleTechTouchEnd_ = function handleTechTouchEnd_(event) {
            event.preventDefault();
          };
          Player.prototype.handleFullscreenChange_ = function handleFullscreenChange_() {
            if (this.isFullscreen()) {
              this.addClass('vjs-fullscreen');
            } else {
              this.removeClass('vjs-fullscreen');
            }
          };
          Player.prototype.handleStageClick_ = function handleStageClick_() {
            this.reportUserActivity();
          };
          Player.prototype.handleTechFullscreenChange_ = function handleTechFullscreenChange_(event, data) {
            if (data) {
              this.isFullscreen(data.isFullscreen);
            }
            this.trigger('fullscreenchange');
          };
          Player.prototype.handleTechError_ = function handleTechError_() {
            var error = this.tech_.error();
            this.error(error && error.code);
          };
          Player.prototype.handleTechSuspend_ = function handleTechSuspend_() {
            this.trigger('suspend');
          };
          Player.prototype.handleTechAbort_ = function handleTechAbort_() {
            this.trigger('abort');
          };
          Player.prototype.handleTechEmptied_ = function handleTechEmptied_() {
            this.trigger('emptied');
          };
          Player.prototype.handleTechStalled_ = function handleTechStalled_() {
            this.trigger('stalled');
          };
          Player.prototype.handleTechLoadedMetaData_ = function handleTechLoadedMetaData_() {
            this.trigger('loadedmetadata');
          };
          Player.prototype.handleTechLoadedData_ = function handleTechLoadedData_() {
            this.trigger('loadeddata');
          };
          Player.prototype.handleTechTimeUpdate_ = function handleTechTimeUpdate_() {
            this.trigger('timeupdate');
          };
          Player.prototype.handleTechRateChange_ = function handleTechRateChange_() {
            this.trigger('ratechange');
          };
          Player.prototype.handleTechVolumeChange_ = function handleTechVolumeChange_() {
            this.trigger('volumechange');
          };
          Player.prototype.handleTechTextTrackChange_ = function handleTechTextTrackChange_() {
            this.trigger('texttrackchange');
          };
          Player.prototype.getCache = function getCache() {
            return this.cache_;
          };
          Player.prototype.techCall_ = function techCall_(method, arg) {
            if (this.tech_ && !this.tech_.isReady_) {
              this.tech_.ready(function() {
                this[method](arg);
              }, true);
            } else {
              try {
                this.tech_[method](arg);
              } catch (e) {
                _utilsLogJs2['default'](e);
                throw e;
              }
            }
          };
          Player.prototype.techGet_ = function techGet_(method) {
            if (this.tech_ && this.tech_.isReady_) {
              try {
                return this.tech_[method]();
              } catch (e) {
                if (this.tech_[method] === undefined) {
                  _utilsLogJs2['default']('Video.js: ' + method + ' method not defined for ' + this.techName_ + ' playback technology.', e);
                } else {
                  if (e.name === 'TypeError') {
                    _utilsLogJs2['default']('Video.js: ' + method + ' unavailable on ' + this.techName_ + ' playback technology element.', e);
                    this.tech_.isReady_ = false;
                  } else {
                    _utilsLogJs2['default'](e);
                  }
                }
                throw e;
              }
            }
            return;
          };
          Player.prototype.play = function play() {
            this.techCall_('play');
            return this;
          };
          Player.prototype.pause = function pause() {
            this.techCall_('pause');
            return this;
          };
          Player.prototype.paused = function paused() {
            return this.techGet_('paused') === false ? false : true;
          };
          Player.prototype.scrubbing = function scrubbing(isScrubbing) {
            if (isScrubbing !== undefined) {
              this.scrubbing_ = !!isScrubbing;
              if (isScrubbing) {
                this.addClass('vjs-scrubbing');
              } else {
                this.removeClass('vjs-scrubbing');
              }
              return this;
            }
            return this.scrubbing_;
          };
          Player.prototype.currentTime = function currentTime(seconds) {
            if (seconds !== undefined) {
              this.techCall_('setCurrentTime', seconds);
              return this;
            }
            return this.cache_.currentTime = this.techGet_('currentTime') || 0;
          };
          Player.prototype.duration = function duration(seconds) {
            if (seconds === undefined) {
              return this.cache_.duration || 0;
            }
            seconds = parseFloat(seconds) || 0;
            if (seconds < 0) {
              seconds = Infinity;
            }
            if (seconds !== this.cache_.duration) {
              this.cache_.duration = seconds;
              if (seconds === Infinity) {
                this.addClass('vjs-live');
              } else {
                this.removeClass('vjs-live');
              }
              this.trigger('durationchange');
            }
            return this;
          };
          Player.prototype.remainingTime = function remainingTime() {
            return this.duration() - this.currentTime();
          };
          Player.prototype.buffered = function buffered() {
            var buffered = this.techGet_('buffered');
            if (!buffered || !buffered.length) {
              buffered = _utilsTimeRangesJs.createTimeRange(0, 0);
            }
            return buffered;
          };
          Player.prototype.bufferedPercent = function bufferedPercent() {
            return _utilsBufferJs.bufferedPercent(this.buffered(), this.duration());
          };
          Player.prototype.bufferedEnd = function bufferedEnd() {
            var buffered = this.buffered(),
                duration = this.duration(),
                end = buffered.end(buffered.length - 1);
            if (end > duration) {
              end = duration;
            }
            return end;
          };
          Player.prototype.volume = function volume(percentAsDecimal) {
            var vol = undefined;
            if (percentAsDecimal !== undefined) {
              vol = Math.max(0, Math.min(1, parseFloat(percentAsDecimal)));
              this.cache_.volume = vol;
              this.techCall_('setVolume', vol);
              return this;
            }
            vol = parseFloat(this.techGet_('volume'));
            return isNaN(vol) ? 1 : vol;
          };
          Player.prototype.muted = function muted(_muted) {
            if (_muted !== undefined) {
              this.techCall_('setMuted', _muted);
              return this;
            }
            return this.techGet_('muted') || false;
          };
          Player.prototype.supportsFullScreen = function supportsFullScreen() {
            return this.techGet_('supportsFullScreen') || false;
          };
          Player.prototype.isFullscreen = function isFullscreen(isFS) {
            if (isFS !== undefined) {
              this.isFullscreen_ = !!isFS;
              return this;
            }
            return !!this.isFullscreen_;
          };
          Player.prototype.requestFullscreen = function requestFullscreen() {
            var fsApi = _fullscreenApiJs2['default'];
            this.isFullscreen(true);
            if (fsApi.requestFullscreen) {
              Events.on(_globalDocument2['default'], fsApi.fullscreenchange, Fn.bind(this, function documentFullscreenChange(e) {
                this.isFullscreen(_globalDocument2['default'][fsApi.fullscreenElement]);
                if (this.isFullscreen() === false) {
                  Events.off(_globalDocument2['default'], fsApi.fullscreenchange, documentFullscreenChange);
                }
                this.trigger('fullscreenchange');
              }));
              this.el_[fsApi.requestFullscreen]();
            } else if (this.tech_.supportsFullScreen()) {
              this.techCall_('enterFullScreen');
            } else {
              this.enterFullWindow();
              this.trigger('fullscreenchange');
            }
            return this;
          };
          Player.prototype.exitFullscreen = function exitFullscreen() {
            var fsApi = _fullscreenApiJs2['default'];
            this.isFullscreen(false);
            if (fsApi.requestFullscreen) {
              _globalDocument2['default'][fsApi.exitFullscreen]();
            } else if (this.tech_.supportsFullScreen()) {
              this.techCall_('exitFullScreen');
            } else {
              this.exitFullWindow();
              this.trigger('fullscreenchange');
            }
            return this;
          };
          Player.prototype.enterFullWindow = function enterFullWindow() {
            this.isFullWindow = true;
            this.docOrigOverflow = _globalDocument2['default'].documentElement.style.overflow;
            Events.on(_globalDocument2['default'], 'keydown', Fn.bind(this, this.fullWindowOnEscKey));
            _globalDocument2['default'].documentElement.style.overflow = 'hidden';
            Dom.addElClass(_globalDocument2['default'].body, 'vjs-full-window');
            this.trigger('enterFullWindow');
          };
          Player.prototype.fullWindowOnEscKey = function fullWindowOnEscKey(event) {
            if (event.keyCode === 27) {
              if (this.isFullscreen() === true) {
                this.exitFullscreen();
              } else {
                this.exitFullWindow();
              }
            }
          };
          Player.prototype.exitFullWindow = function exitFullWindow() {
            this.isFullWindow = false;
            Events.off(_globalDocument2['default'], 'keydown', this.fullWindowOnEscKey);
            _globalDocument2['default'].documentElement.style.overflow = this.docOrigOverflow;
            Dom.removeElClass(_globalDocument2['default'].body, 'vjs-full-window');
            this.trigger('exitFullWindow');
          };
          Player.prototype.canPlayType = function canPlayType(type) {
            var can = undefined;
            for (var i = 0,
                j = this.options_.techOrder; i < j.length; i++) {
              var techName = _utilsToTitleCaseJs2['default'](j[i]);
              var tech = _techTechJs2['default'].getTech(techName);
              if (!tech) {
                tech = _componentJs2['default'].getComponent(techName);
              }
              if (!tech) {
                _utilsLogJs2['default'].error('The "' + techName + '" tech is undefined. Skipped browser support check for that tech.');
                continue;
              }
              if (tech.isSupported()) {
                can = tech.canPlayType(type);
                if (can) {
                  return can;
                }
              }
            }
            return '';
          };
          Player.prototype.selectSource = function selectSource(sources) {
            var techs = this.options_.techOrder.map(_utilsToTitleCaseJs2['default']).map(function(techName) {
              return [techName, _techTechJs2['default'].getTech(techName) || _componentJs2['default'].getComponent(techName)];
            }).filter(function(_ref) {
              var techName = _ref[0];
              var tech = _ref[1];
              if (tech) {
                return tech.isSupported();
              }
              _utilsLogJs2['default'].error('The "' + techName + '" tech is undefined. Skipped browser support check for that tech.');
              return false;
            });
            var findFirstPassingTechSourcePair = function findFirstPassingTechSourcePair(outerArray, innerArray, tester) {
              var found = undefined;
              outerArray.some(function(outerChoice) {
                return innerArray.some(function(innerChoice) {
                  found = tester(outerChoice, innerChoice);
                  if (found) {
                    return true;
                  }
                });
              });
              return found;
            };
            var foundSourceAndTech = undefined;
            var flip = function flip(fn) {
              return function(a, b) {
                return fn(b, a);
              };
            };
            var finder = function finder(_ref2, source) {
              var techName = _ref2[0];
              var tech = _ref2[1];
              if (tech.canPlaySource(source)) {
                return {
                  source: source,
                  tech: techName
                };
              }
            };
            if (this.options_.sourceOrder) {
              foundSourceAndTech = findFirstPassingTechSourcePair(sources, techs, flip(finder));
            } else {
              foundSourceAndTech = findFirstPassingTechSourcePair(techs, sources, finder);
            }
            return foundSourceAndTech || false;
          };
          Player.prototype.src = function src(source) {
            if (source === undefined) {
              return this.techGet_('src');
            }
            var currentTech = _techTechJs2['default'].getTech(this.techName_);
            if (!currentTech) {
              currentTech = _componentJs2['default'].getComponent(this.techName_);
            }
            if (Array.isArray(source)) {
              this.sourceList_(source);
            } else if (typeof source === 'string') {
              this.src({src: source});
            } else if (source instanceof Object) {
              if (source.type && !currentTech.canPlaySource(source)) {
                this.sourceList_([source]);
              } else {
                this.cache_.src = source.src;
                this.currentType_ = source.type || '';
                this.ready(function() {
                  if (currentTech.prototype.hasOwnProperty('setSource')) {
                    this.techCall_('setSource', source);
                  } else {
                    this.techCall_('src', source.src);
                  }
                  if (this.options_.preload === 'auto') {
                    this.load();
                  }
                  if (this.options_.autoplay) {
                    this.play();
                  }
                }, true);
              }
            }
            return this;
          };
          Player.prototype.sourceList_ = function sourceList_(sources) {
            var sourceTech = this.selectSource(sources);
            if (sourceTech) {
              if (sourceTech.tech === this.techName_) {
                this.src(sourceTech.source);
              } else {
                this.loadTech_(sourceTech.tech, sourceTech.source);
              }
            } else {
              this.setTimeout(function() {
                this.error({
                  code: 4,
                  message: this.localize(this.options_.notSupportedMessage)
                });
              }, 0);
              this.triggerReady();
            }
          };
          Player.prototype.load = function load() {
            this.techCall_('load');
            return this;
          };
          Player.prototype.reset = function reset() {
            this.loadTech_(_utilsToTitleCaseJs2['default'](this.options_.techOrder[0]), null);
            this.techCall_('reset');
            return this;
          };
          Player.prototype.currentSrc = function currentSrc() {
            return this.techGet_('currentSrc') || this.cache_.src || '';
          };
          Player.prototype.currentType = function currentType() {
            return this.currentType_ || '';
          };
          Player.prototype.preload = function preload(value) {
            if (value !== undefined) {
              this.techCall_('setPreload', value);
              this.options_.preload = value;
              return this;
            }
            return this.techGet_('preload');
          };
          Player.prototype.autoplay = function autoplay(value) {
            if (value !== undefined) {
              this.techCall_('setAutoplay', value);
              this.options_.autoplay = value;
              return this;
            }
            return this.techGet_('autoplay', value);
          };
          Player.prototype.loop = function loop(value) {
            if (value !== undefined) {
              this.techCall_('setLoop', value);
              this.options_['loop'] = value;
              return this;
            }
            return this.techGet_('loop');
          };
          Player.prototype.poster = function poster(src) {
            if (src === undefined) {
              return this.poster_;
            }
            if (!src) {
              src = '';
            }
            this.poster_ = src;
            this.techCall_('setPoster', src);
            this.trigger('posterchange');
            return this;
          };
          Player.prototype.handleTechPosterChange_ = function handleTechPosterChange_() {
            if (!this.poster_ && this.tech_ && this.tech_.poster) {
              this.poster_ = this.tech_.poster() || '';
              this.trigger('posterchange');
            }
          };
          Player.prototype.controls = function controls(bool) {
            if (bool !== undefined) {
              bool = !!bool;
              if (this.controls_ !== bool) {
                this.controls_ = bool;
                if (this.usingNativeControls()) {
                  this.techCall_('setControls', bool);
                }
                if (bool) {
                  this.removeClass('vjs-controls-disabled');
                  this.addClass('vjs-controls-enabled');
                  this.trigger('controlsenabled');
                  if (!this.usingNativeControls()) {
                    this.addTechControlsListeners_();
                  }
                } else {
                  this.removeClass('vjs-controls-enabled');
                  this.addClass('vjs-controls-disabled');
                  this.trigger('controlsdisabled');
                  if (!this.usingNativeControls()) {
                    this.removeTechControlsListeners_();
                  }
                }
              }
              return this;
            }
            return !!this.controls_;
          };
          Player.prototype.usingNativeControls = function usingNativeControls(bool) {
            if (bool !== undefined) {
              bool = !!bool;
              if (this.usingNativeControls_ !== bool) {
                this.usingNativeControls_ = bool;
                if (bool) {
                  this.addClass('vjs-using-native-controls');
                  this.trigger('usingnativecontrols');
                } else {
                  this.removeClass('vjs-using-native-controls');
                  this.trigger('usingcustomcontrols');
                }
              }
              return this;
            }
            return !!this.usingNativeControls_;
          };
          Player.prototype.error = function error(err) {
            if (err === undefined) {
              return this.error_ || null;
            }
            if (err === null) {
              this.error_ = err;
              this.removeClass('vjs-error');
              this.errorDisplay.close();
              return this;
            }
            if (err instanceof _mediaErrorJs2['default']) {
              this.error_ = err;
            } else {
              this.error_ = new _mediaErrorJs2['default'](err);
            }
            this.addClass('vjs-error');
            _utilsLogJs2['default'].error('(CODE:' + this.error_.code + ' ' + _mediaErrorJs2['default'].errorTypes[this.error_.code] + ')', this.error_.message, this.error_);
            this.trigger('error');
            return this;
          };
          Player.prototype.ended = function ended() {
            return this.techGet_('ended');
          };
          Player.prototype.seeking = function seeking() {
            return this.techGet_('seeking');
          };
          Player.prototype.seekable = function seekable() {
            return this.techGet_('seekable');
          };
          Player.prototype.reportUserActivity = function reportUserActivity(event) {
            this.userActivity_ = true;
          };
          Player.prototype.userActive = function userActive(bool) {
            if (bool !== undefined) {
              bool = !!bool;
              if (bool !== this.userActive_) {
                this.userActive_ = bool;
                if (bool) {
                  this.userActivity_ = true;
                  this.removeClass('vjs-user-inactive');
                  this.addClass('vjs-user-active');
                  this.trigger('useractive');
                } else {
                  this.userActivity_ = false;
                  if (this.tech_) {
                    this.tech_.one('mousemove', function(e) {
                      e.stopPropagation();
                      e.preventDefault();
                    });
                  }
                  this.removeClass('vjs-user-active');
                  this.addClass('vjs-user-inactive');
                  this.trigger('userinactive');
                }
              }
              return this;
            }
            return this.userActive_;
          };
          Player.prototype.listenForUserActivity_ = function listenForUserActivity_() {
            var mouseInProgress = undefined,
                lastMoveX = undefined,
                lastMoveY = undefined;
            var handleActivity = Fn.bind(this, this.reportUserActivity);
            var handleMouseMove = function handleMouseMove(e) {
              if (e.screenX !== lastMoveX || e.screenY !== lastMoveY) {
                lastMoveX = e.screenX;
                lastMoveY = e.screenY;
                handleActivity();
              }
            };
            var handleMouseDown = function handleMouseDown() {
              handleActivity();
              this.clearInterval(mouseInProgress);
              mouseInProgress = this.setInterval(handleActivity, 250);
            };
            var handleMouseUp = function handleMouseUp(event) {
              handleActivity();
              this.clearInterval(mouseInProgress);
            };
            this.on('mousedown', handleMouseDown);
            this.on('mousemove', handleMouseMove);
            this.on('mouseup', handleMouseUp);
            this.on('keydown', handleActivity);
            this.on('keyup', handleActivity);
            var inactivityTimeout = undefined;
            var activityCheck = this.setInterval(function() {
              if (this.userActivity_) {
                this.userActivity_ = false;
                this.userActive(true);
                this.clearTimeout(inactivityTimeout);
                var timeout = this.options_['inactivityTimeout'];
                if (timeout > 0) {
                  inactivityTimeout = this.setTimeout(function() {
                    if (!this.userActivity_) {
                      this.userActive(false);
                    }
                  }, timeout);
                }
              }
            }, 250);
          };
          Player.prototype.playbackRate = function playbackRate(rate) {
            if (rate !== undefined) {
              this.techCall_('setPlaybackRate', rate);
              return this;
            }
            if (this.tech_ && this.tech_['featuresPlaybackRate']) {
              return this.techGet_('playbackRate');
            } else {
              return 1.0;
            }
          };
          Player.prototype.isAudio = function isAudio(bool) {
            if (bool !== undefined) {
              this.isAudio_ = !!bool;
              return this;
            }
            return !!this.isAudio_;
          };
          Player.prototype.networkState = function networkState() {
            return this.techGet_('networkState');
          };
          Player.prototype.readyState = function readyState() {
            return this.techGet_('readyState');
          };
          Player.prototype.textTracks = function textTracks() {
            return this.tech_ && this.tech_['textTracks']();
          };
          Player.prototype.remoteTextTracks = function remoteTextTracks() {
            return this.tech_ && this.tech_['remoteTextTracks']();
          };
          Player.prototype.remoteTextTrackEls = function remoteTextTrackEls() {
            return this.tech_ && this.tech_['remoteTextTrackEls']();
          };
          Player.prototype.addTextTrack = function addTextTrack(kind, label, language) {
            return this.tech_ && this.tech_['addTextTrack'](kind, label, language);
          };
          Player.prototype.addRemoteTextTrack = function addRemoteTextTrack(options) {
            return this.tech_ && this.tech_['addRemoteTextTrack'](options);
          };
          Player.prototype.removeRemoteTextTrack = function removeRemoteTextTrack(track) {
            this.tech_ && this.tech_['removeRemoteTextTrack'](track);
          };
          Player.prototype.videoWidth = function videoWidth() {
            return this.tech_ && this.tech_.videoWidth && this.tech_.videoWidth() || 0;
          };
          Player.prototype.videoHeight = function videoHeight() {
            return this.tech_ && this.tech_.videoHeight && this.tech_.videoHeight() || 0;
          };
          Player.prototype.language = function language(code) {
            if (code === undefined) {
              return this.language_;
            }
            this.language_ = ('' + code).toLowerCase();
            return this;
          };
          Player.prototype.languages = function languages() {
            return _utilsMergeOptionsJs2['default'](Player.prototype.options_.languages, this.languages_);
          };
          Player.prototype.toJSON = function toJSON() {
            var options = _utilsMergeOptionsJs2['default'](this.options_);
            var tracks = options.tracks;
            options.tracks = [];
            for (var i = 0; i < tracks.length; i++) {
              var track = tracks[i];
              track = _utilsMergeOptionsJs2['default'](track);
              track.player = undefined;
              options.tracks[i] = track;
            }
            return options;
          };
          Player.prototype.createModal = function createModal(content, options) {
            var player = this;
            options = options || {};
            options.content = content || '';
            var modal = new _modalDialog2['default'](player, options);
            player.addChild(modal);
            modal.on('dispose', function() {
              player.removeChild(modal);
            });
            return modal.open();
          };
          Player.getTagSettings = function getTagSettings(tag) {
            var baseOptions = {
              'sources': [],
              'tracks': []
            };
            var tagOptions = Dom.getElAttributes(tag);
            var dataSetup = tagOptions['data-setup'];
            if (dataSetup !== null) {
              var _safeParseTuple = _safeJsonParseTuple2['default'](dataSetup || '{}');
              var err = _safeParseTuple[0];
              var data = _safeParseTuple[1];
              if (err) {
                _utilsLogJs2['default'].error(err);
              }
              _objectAssign2['default'](tagOptions, data);
            }
            _objectAssign2['default'](baseOptions, tagOptions);
            if (tag.hasChildNodes()) {
              var children = tag.childNodes;
              for (var i = 0,
                  j = children.length; i < j; i++) {
                var child = children[i];
                var childName = child.nodeName.toLowerCase();
                if (childName === 'source') {
                  baseOptions.sources.push(Dom.getElAttributes(child));
                } else if (childName === 'track') {
                  baseOptions.tracks.push(Dom.getElAttributes(child));
                }
              }
            }
            return baseOptions;
          };
          return Player;
        })(_componentJs2['default']);
        Player.players = {};
        var navigator = _globalWindow2['default'].navigator;
        Player.prototype.options_ = {
          techOrder: ['html5', 'flash'],
          html5: {},
          flash: {},
          defaultVolume: 0.00,
          inactivityTimeout: 2000,
          playbackRates: [],
          children: ['mediaLoader', 'posterImage', 'textTrackDisplay', 'loadingSpinner', 'bigPlayButton', 'controlBar', 'errorDisplay', 'textTrackSettings'],
          language: _globalDocument2['default'].getElementsByTagName('html')[0].getAttribute('lang') || navigator.languages && navigator.languages[0] || navigator.userLanguage || navigator.language || 'en',
          languages: {},
          notSupportedMessage: 'No compatible source was found for this video.'
        };
        Player.prototype.handleLoadedMetaData_;
        Player.prototype.handleLoadedData_;
        Player.prototype.handleUserActive_;
        Player.prototype.handleUserInactive_;
        Player.prototype.handleTimeUpdate_;
        Player.prototype.handleTechEnded_;
        Player.prototype.handleVolumeChange_;
        Player.prototype.handleError_;
        Player.prototype.flexNotSupported_ = function() {
          var elem = _globalDocument2['default'].createElement('i');
          return !('flexBasis' in elem.style || 'webkitFlexBasis' in elem.style || 'mozFlexBasis' in elem.style || 'msFlexBasis' in elem.style || 'msFlexOrder' in elem.style);
        };
        _componentJs2['default'].registerComponent('Player', Player);
        exports['default'] = Player;
        module.exports = exports['default'];
      }, {
        "./big-play-button.js": 62,
        "./component.js": 66,
        "./control-bar/control-bar.js": 67,
        "./error-display.js": 97,
        "./fullscreen-api.js": 100,
        "./loading-spinner.js": 101,
        "./media-error.js": 102,
        "./modal-dialog": 106,
        "./poster-image.js": 111,
        "./tech/html5.js": 116,
        "./tech/loader.js": 117,
        "./tech/tech.js": 118,
        "./tracks/text-track-display.js": 122,
        "./tracks/text-track-list-converter.js": 124,
        "./tracks/text-track-settings.js": 126,
        "./utils/browser.js": 128,
        "./utils/buffer.js": 129,
        "./utils/dom.js": 131,
        "./utils/events.js": 132,
        "./utils/fn.js": 133,
        "./utils/guid.js": 135,
        "./utils/log.js": 136,
        "./utils/merge-options.js": 137,
        "./utils/stylesheet.js": 138,
        "./utils/time-ranges.js": 139,
        "./utils/to-title-case.js": 140,
        "global/document": 1,
        "global/window": 2,
        "object.assign": 45,
        "safe-json-parse/tuple": 53
      }],
      108: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _playerJs = _dereq_('./player.js');
        var _playerJs2 = _interopRequireDefault(_playerJs);
        var plugin = function plugin(name, init) {
          _playerJs2['default'].prototype[name] = init;
        };
        exports['default'] = plugin;
        module.exports = exports['default'];
      }, {"./player.js": 107}],
      109: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _clickableComponentJs = _dereq_('../clickable-component.js');
        var _clickableComponentJs2 = _interopRequireDefault(_clickableComponentJs);
        var _componentJs = _dereq_('../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _popupJs = _dereq_('./popup.js');
        var _popupJs2 = _interopRequireDefault(_popupJs);
        var _utilsDomJs = _dereq_('../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsFnJs = _dereq_('../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsToTitleCaseJs = _dereq_('../utils/to-title-case.js');
        var _utilsToTitleCaseJs2 = _interopRequireDefault(_utilsToTitleCaseJs);
        var PopupButton = (function(_ClickableComponent) {
          _inherits(PopupButton, _ClickableComponent);
          function PopupButton(player) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            _classCallCheck(this, PopupButton);
            _ClickableComponent.call(this, player, options);
            this.update();
          }
          PopupButton.prototype.update = function update() {
            var popup = this.createPopup();
            if (this.popup) {
              this.removeChild(this.popup);
            }
            this.popup = popup;
            this.addChild(popup);
            if (this.items && this.items.length === 0) {
              this.hide();
            } else if (this.items && this.items.length > 1) {
              this.show();
            }
          };
          PopupButton.prototype.createPopup = function createPopup() {};
          PopupButton.prototype.createEl = function createEl() {
            return _ClickableComponent.prototype.createEl.call(this, 'div', {className: this.buildCSSClass()});
          };
          PopupButton.prototype.buildCSSClass = function buildCSSClass() {
            var menuButtonClass = 'vjs-menu-button';
            if (this.options_.inline === true) {
              menuButtonClass += '-inline';
            } else {
              menuButtonClass += '-popup';
            }
            return 'vjs-menu-button ' + menuButtonClass + ' ' + _ClickableComponent.prototype.buildCSSClass.call(this);
          };
          return PopupButton;
        })(_clickableComponentJs2['default']);
        _componentJs2['default'].registerComponent('PopupButton', PopupButton);
        exports['default'] = PopupButton;
        module.exports = exports['default'];
      }, {
        "../clickable-component.js": 64,
        "../component.js": 66,
        "../utils/dom.js": 131,
        "../utils/fn.js": 133,
        "../utils/to-title-case.js": 140,
        "./popup.js": 110
      }],
      110: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsDomJs = _dereq_('../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsFnJs = _dereq_('../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsEventsJs = _dereq_('../utils/events.js');
        var Events = _interopRequireWildcard(_utilsEventsJs);
        var Popup = (function(_Component) {
          _inherits(Popup, _Component);
          function Popup() {
            _classCallCheck(this, Popup);
            _Component.apply(this, arguments);
          }
          Popup.prototype.addItem = function addItem(component) {
            this.addChild(component);
            component.on('click', Fn.bind(this, function() {
              this.unlockShowing();
            }));
          };
          Popup.prototype.createEl = function createEl() {
            var contentElType = this.options_.contentElType || 'ul';
            this.contentEl_ = Dom.createEl(contentElType, {className: 'vjs-menu-content'});
            var el = _Component.prototype.createEl.call(this, 'div', {
              append: this.contentEl_,
              className: 'vjs-menu'
            });
            el.appendChild(this.contentEl_);
            Events.on(el, 'click', function(event) {
              event.preventDefault();
              event.stopImmediatePropagation();
            });
            return el;
          };
          return Popup;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('Popup', Popup);
        exports['default'] = Popup;
        module.exports = exports['default'];
      }, {
        "../component.js": 66,
        "../utils/dom.js": 131,
        "../utils/events.js": 132,
        "../utils/fn.js": 133
      }],
      111: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _clickableComponentJs = _dereq_('./clickable-component.js');
        var _clickableComponentJs2 = _interopRequireDefault(_clickableComponentJs);
        var _componentJs = _dereq_('./component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsFnJs = _dereq_('./utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsDomJs = _dereq_('./utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsBrowserJs = _dereq_('./utils/browser.js');
        var browser = _interopRequireWildcard(_utilsBrowserJs);
        var PosterImage = (function(_ClickableComponent) {
          _inherits(PosterImage, _ClickableComponent);
          function PosterImage(player, options) {
            _classCallCheck(this, PosterImage);
            _ClickableComponent.call(this, player, options);
            this.update();
            player.on('posterchange', Fn.bind(this, this.update));
          }
          PosterImage.prototype.dispose = function dispose() {
            this.player().off('posterchange', this.update);
            _ClickableComponent.prototype.dispose.call(this);
          };
          PosterImage.prototype.createEl = function createEl() {
            var el = Dom.createEl('div', {
              className: 'vjs-poster',
              tabIndex: -1
            });
            if (!browser.BACKGROUND_SIZE_SUPPORTED) {
              this.fallbackImg_ = Dom.createEl('img');
              el.appendChild(this.fallbackImg_);
            }
            return el;
          };
          PosterImage.prototype.update = function update() {
            var url = this.player().poster();
            this.setSrc(url);
            if (url) {
              this.show();
            } else {
              this.hide();
            }
          };
          PosterImage.prototype.setSrc = function setSrc(url) {
            if (this.fallbackImg_) {
              this.fallbackImg_.src = url;
            } else {
              var backgroundImage = '';
              if (url) {
                backgroundImage = 'url("' + url + '")';
              }
              this.el_.style.backgroundImage = backgroundImage;
            }
          };
          PosterImage.prototype.handleClick = function handleClick() {
            if (this.player_.paused()) {
              this.player_.play();
            } else {
              this.player_.pause();
            }
          };
          return PosterImage;
        })(_clickableComponentJs2['default']);
        _componentJs2['default'].registerComponent('PosterImage', PosterImage);
        exports['default'] = PosterImage;
        module.exports = exports['default'];
      }, {
        "./clickable-component.js": 64,
        "./component.js": 66,
        "./utils/browser.js": 128,
        "./utils/dom.js": 131,
        "./utils/fn.js": 133
      }],
      112: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        var _utilsEventsJs = _dereq_('./utils/events.js');
        var Events = _interopRequireWildcard(_utilsEventsJs);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var _windowLoaded = false;
        var videojs = undefined;
        var autoSetup = function autoSetup() {
          var vids = _globalDocument2['default'].getElementsByTagName('video');
          var audios = _globalDocument2['default'].getElementsByTagName('audio');
          var mediaEls = [];
          if (vids && vids.length > 0) {
            for (var i = 0,
                e = vids.length; i < e; i++) {
              mediaEls.push(vids[i]);
            }
          }
          if (audios && audios.length > 0) {
            for (var i = 0,
                e = audios.length; i < e; i++) {
              mediaEls.push(audios[i]);
            }
          }
          if (mediaEls && mediaEls.length > 0) {
            for (var i = 0,
                e = mediaEls.length; i < e; i++) {
              var mediaEl = mediaEls[i];
              if (mediaEl && mediaEl.getAttribute) {
                if (mediaEl['player'] === undefined) {
                  var options = mediaEl.getAttribute('data-setup');
                  if (options !== null) {
                    var player = videojs(mediaEl);
                  }
                }
              } else {
                autoSetupTimeout(1);
                break;
              }
            }
          } else if (!_windowLoaded) {
            autoSetupTimeout(1);
          }
        };
        var autoSetupTimeout = function autoSetupTimeout(wait, vjs) {
          videojs = vjs;
          setTimeout(autoSetup, wait);
        };
        if (_globalDocument2['default'].readyState === 'complete') {
          _windowLoaded = true;
        } else {
          Events.one(_globalWindow2['default'], 'load', function() {
            _windowLoaded = true;
          });
        }
        var hasLoaded = function hasLoaded() {
          return _windowLoaded;
        };
        exports.autoSetup = autoSetup;
        exports.autoSetupTimeout = autoSetupTimeout;
        exports.hasLoaded = hasLoaded;
      }, {
        "./utils/events.js": 132,
        "global/document": 1,
        "global/window": 2
      }],
      113: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _utilsDomJs = _dereq_('../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _objectAssign = _dereq_('object.assign');
        var _objectAssign2 = _interopRequireDefault(_objectAssign);
        var Slider = (function(_Component) {
          _inherits(Slider, _Component);
          function Slider(player, options) {
            _classCallCheck(this, Slider);
            _Component.call(this, player, options);
            this.bar = this.getChild(this.options_.barName);
            this.vertical(!!this.options_.vertical);
            this.on('mousedown', this.handleMouseDown);
            this.on('touchstart', this.handleMouseDown);
            this.on('focus', this.handleFocus);
            this.on('blur', this.handleBlur);
            this.on('click', this.handleClick);
            this.on(player, 'controlsvisible', this.update);
            this.on(player, this.playerEvent, this.update);
          }
          Slider.prototype.createEl = function createEl(type) {
            var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var attributes = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            props.className = props.className + ' vjs-slider';
            props = _objectAssign2['default']({tabIndex: 0}, props);
            attributes = _objectAssign2['default']({
              'role': 'slider',
              'aria-valuenow': 0,
              'aria-valuemin': 0,
              'aria-valuemax': 100,
              tabIndex: 0
            }, attributes);
            return _Component.prototype.createEl.call(this, type, props, attributes);
          };
          Slider.prototype.handleMouseDown = function handleMouseDown(event) {
            event.preventDefault();
            Dom.blockTextSelection();
            this.addClass('vjs-sliding');
            this.trigger('slideractive');
            this.on(_globalDocument2['default'], 'mousemove', this.handleMouseMove);
            this.on(_globalDocument2['default'], 'mouseup', this.handleMouseUp);
            this.on(_globalDocument2['default'], 'touchmove', this.handleMouseMove);
            this.on(_globalDocument2['default'], 'touchend', this.handleMouseUp);
            this.handleMouseMove(event);
          };
          Slider.prototype.handleMouseMove = function handleMouseMove() {};
          Slider.prototype.handleMouseUp = function handleMouseUp() {
            Dom.unblockTextSelection();
            this.removeClass('vjs-sliding');
            this.trigger('sliderinactive');
            this.off(_globalDocument2['default'], 'mousemove', this.handleMouseMove);
            this.off(_globalDocument2['default'], 'mouseup', this.handleMouseUp);
            this.off(_globalDocument2['default'], 'touchmove', this.handleMouseMove);
            this.off(_globalDocument2['default'], 'touchend', this.handleMouseUp);
            this.update();
          };
          Slider.prototype.update = function update() {
            if (!this.el_)
              return;
            var progress = this.getPercent();
            var bar = this.bar;
            if (!bar)
              return;
            if (typeof progress !== 'number' || progress !== progress || progress < 0 || progress === Infinity) {
              progress = 0;
            }
            var percentage = (progress * 100).toFixed(2) + '%';
            if (this.vertical()) {
              bar.el().style.height = percentage;
            } else {
              bar.el().style.width = percentage;
            }
          };
          Slider.prototype.calculateDistance = function calculateDistance(event) {
            var position = Dom.getPointerPosition(this.el_, event);
            if (this.vertical()) {
              return position.y;
            }
            return position.x;
          };
          Slider.prototype.handleFocus = function handleFocus() {
            this.on(_globalDocument2['default'], 'keydown', this.handleKeyPress);
          };
          Slider.prototype.handleKeyPress = function handleKeyPress(event) {
            if (event.which === 37 || event.which === 40) {
              event.preventDefault();
              this.stepBack();
            } else if (event.which === 38 || event.which === 39) {
              event.preventDefault();
              this.stepForward();
            }
          };
          Slider.prototype.handleBlur = function handleBlur() {
            this.off(_globalDocument2['default'], 'keydown', this.handleKeyPress);
          };
          Slider.prototype.handleClick = function handleClick(event) {
            event.stopImmediatePropagation();
            event.preventDefault();
          };
          Slider.prototype.vertical = function vertical(bool) {
            if (bool === undefined) {
              return this.vertical_ || false;
            }
            this.vertical_ = !!bool;
            if (this.vertical_) {
              this.addClass('vjs-slider-vertical');
            } else {
              this.addClass('vjs-slider-horizontal');
            }
            return this;
          };
          return Slider;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('Slider', Slider);
        exports['default'] = Slider;
        module.exports = exports['default'];
      }, {
        "../component.js": 66,
        "../utils/dom.js": 131,
        "global/document": 1,
        "object.assign": 45
      }],
      114: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function FlashRtmpDecorator(Flash) {
          Flash.streamingFormats = {
            'rtmp/mp4': 'MP4',
            'rtmp/flv': 'FLV'
          };
          Flash.streamFromParts = function(connection, stream) {
            return connection + '&' + stream;
          };
          Flash.streamToParts = function(src) {
            var parts = {
              connection: '',
              stream: ''
            };
            if (!src)
              return parts;
            var connEnd = src.search(/&(?!\w+=)/);
            var streamBegin = undefined;
            if (connEnd !== -1) {
              streamBegin = connEnd + 1;
            } else {
              connEnd = streamBegin = src.lastIndexOf('/') + 1;
              if (connEnd === 0) {
                connEnd = streamBegin = src.length;
              }
            }
            parts.connection = src.substring(0, connEnd);
            parts.stream = src.substring(streamBegin, src.length);
            return parts;
          };
          Flash.isStreamingType = function(srcType) {
            return srcType in Flash.streamingFormats;
          };
          Flash.RTMP_RE = /^rtmp[set]?:\/\//i;
          Flash.isStreamingSrc = function(src) {
            return Flash.RTMP_RE.test(src);
          };
          Flash.rtmpSourceHandler = {};
          Flash.rtmpSourceHandler.canPlayType = function(type) {
            if (Flash.isStreamingType(type)) {
              return 'maybe';
            }
            return '';
          };
          Flash.rtmpSourceHandler.canHandleSource = function(source) {
            var can = Flash.rtmpSourceHandler.canPlayType(source.type);
            if (can) {
              return can;
            }
            if (Flash.isStreamingSrc(source.src)) {
              return 'maybe';
            }
            return '';
          };
          Flash.rtmpSourceHandler.handleSource = function(source, tech) {
            var srcParts = Flash.streamToParts(source.src);
            tech['setRtmpConnection'](srcParts.connection);
            tech['setRtmpStream'](srcParts.stream);
          };
          Flash.registerSourceHandler(Flash.rtmpSourceHandler);
          return Flash;
        }
        exports['default'] = FlashRtmpDecorator;
        module.exports = exports['default'];
      }, {}],
      115: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _tech = _dereq_('./tech');
        var _tech2 = _interopRequireDefault(_tech);
        var _utilsDomJs = _dereq_('../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsUrlJs = _dereq_('../utils/url.js');
        var Url = _interopRequireWildcard(_utilsUrlJs);
        var _utilsTimeRangesJs = _dereq_('../utils/time-ranges.js');
        var _flashRtmp = _dereq_('./flash-rtmp');
        var _flashRtmp2 = _interopRequireDefault(_flashRtmp);
        var _component = _dereq_('../component');
        var _component2 = _interopRequireDefault(_component);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var _objectAssign = _dereq_('object.assign');
        var _objectAssign2 = _interopRequireDefault(_objectAssign);
        var navigator = _globalWindow2['default'].navigator;
        var Flash = (function(_Tech) {
          _inherits(Flash, _Tech);
          function Flash(options, ready) {
            _classCallCheck(this, Flash);
            _Tech.call(this, options, ready);
            if (options.source) {
              this.ready(function() {
                this.setSource(options.source);
              }, true);
            }
            if (options.startTime) {
              this.ready(function() {
                this.load();
                this.play();
                this.currentTime(options.startTime);
              }, true);
            }
            _globalWindow2['default'].videojs = _globalWindow2['default'].videojs || {};
            _globalWindow2['default'].videojs.Flash = _globalWindow2['default'].videojs.Flash || {};
            _globalWindow2['default'].videojs.Flash.onReady = Flash.onReady;
            _globalWindow2['default'].videojs.Flash.onEvent = Flash.onEvent;
            _globalWindow2['default'].videojs.Flash.onError = Flash.onError;
            this.on('seeked', function() {
              this.lastSeekTarget_ = undefined;
            });
          }
          Flash.prototype.createEl = function createEl() {
            var options = this.options_;
            if (!options.swf) {
              options.swf = '//vjs.zencdn.net/swf/5.0.1/video-js.swf';
            }
            var objId = options.techId;
            var flashVars = _objectAssign2['default']({
              'readyFunction': 'videojs.Flash.onReady',
              'eventProxyFunction': 'videojs.Flash.onEvent',
              'errorEventProxyFunction': 'videojs.Flash.onError',
              'autoplay': options.autoplay,
              'preload': options.preload,
              'loop': options.loop,
              'muted': options.muted
            }, options.flashVars);
            var params = _objectAssign2['default']({
              'wmode': 'opaque',
              'bgcolor': '#000000'
            }, options.params);
            var attributes = _objectAssign2['default']({
              'id': objId,
              'name': objId,
              'class': 'vjs-tech'
            }, options.attributes);
            this.el_ = Flash.embed(options.swf, flashVars, params, attributes);
            this.el_.tech = this;
            return this.el_;
          };
          Flash.prototype.play = function play() {
            if (this.ended()) {
              this.setCurrentTime(0);
            }
            this.el_.vjs_play();
          };
          Flash.prototype.pause = function pause() {
            this.el_.vjs_pause();
          };
          Flash.prototype.src = function src(_src) {
            if (_src === undefined) {
              return this.currentSrc();
            }
            return this.setSrc(_src);
          };
          Flash.prototype.setSrc = function setSrc(src) {
            src = Url.getAbsoluteURL(src);
            this.el_.vjs_src(src);
            if (this.autoplay()) {
              var tech = this;
              this.setTimeout(function() {
                tech.play();
              }, 0);
            }
          };
          Flash.prototype.seeking = function seeking() {
            return this.lastSeekTarget_ !== undefined;
          };
          Flash.prototype.setCurrentTime = function setCurrentTime(time) {
            var seekable = this.seekable();
            if (seekable.length) {
              time = time > seekable.start(0) ? time : seekable.start(0);
              time = time < seekable.end(seekable.length - 1) ? time : seekable.end(seekable.length - 1);
              this.lastSeekTarget_ = time;
              this.trigger('seeking');
              this.el_.vjs_setProperty('currentTime', time);
              _Tech.prototype.setCurrentTime.call(this);
            }
          };
          Flash.prototype.currentTime = function currentTime(time) {
            if (this.seeking()) {
              return this.lastSeekTarget_ || 0;
            }
            return this.el_.vjs_getProperty('currentTime');
          };
          Flash.prototype.currentSrc = function currentSrc() {
            if (this.currentSource_) {
              return this.currentSource_.src;
            } else {
              return this.el_.vjs_getProperty('currentSrc');
            }
          };
          Flash.prototype.load = function load() {
            this.el_.vjs_load();
          };
          Flash.prototype.poster = function poster() {
            this.el_.vjs_getProperty('poster');
          };
          Flash.prototype.setPoster = function setPoster() {};
          Flash.prototype.seekable = function seekable() {
            var duration = this.duration();
            if (duration === 0) {
              return _utilsTimeRangesJs.createTimeRange();
            }
            return _utilsTimeRangesJs.createTimeRange(0, duration);
          };
          Flash.prototype.buffered = function buffered() {
            var ranges = this.el_.vjs_getProperty('buffered');
            if (ranges.length === 0) {
              return _utilsTimeRangesJs.createTimeRange();
            }
            return _utilsTimeRangesJs.createTimeRange(ranges[0][0], ranges[0][1]);
          };
          Flash.prototype.supportsFullScreen = function supportsFullScreen() {
            return false;
          };
          Flash.prototype.enterFullScreen = function enterFullScreen() {
            return false;
          };
          return Flash;
        })(_tech2['default']);
        var _api = Flash.prototype;
        var _readWrite = 'rtmpConnection,rtmpStream,preload,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted'.split(',');
        var _readOnly = 'networkState,readyState,initialTime,duration,startOffsetTime,paused,ended,videoTracks,audioTracks,videoWidth,videoHeight'.split(',');
        function _createSetter(attr) {
          var attrUpper = attr.charAt(0).toUpperCase() + attr.slice(1);
          _api['set' + attrUpper] = function(val) {
            return this.el_.vjs_setProperty(attr, val);
          };
        }
        function _createGetter(attr) {
          _api[attr] = function() {
            return this.el_.vjs_getProperty(attr);
          };
        }
        for (var i = 0; i < _readWrite.length; i++) {
          _createGetter(_readWrite[i]);
          _createSetter(_readWrite[i]);
        }
        for (var i = 0; i < _readOnly.length; i++) {
          _createGetter(_readOnly[i]);
        }
        Flash.isSupported = function() {
          return Flash.version()[0] >= 10;
        };
        _tech2['default'].withSourceHandlers(Flash);
        Flash.nativeSourceHandler = {};
        Flash.nativeSourceHandler.canPlayType = function(type) {
          if (type in Flash.formats) {
            return 'maybe';
          }
          return '';
        };
        Flash.nativeSourceHandler.canHandleSource = function(source) {
          var type;
          function guessMimeType(src) {
            var ext = Url.getFileExtension(src);
            if (ext) {
              return 'video/' + ext;
            }
            return '';
          }
          if (!source.type) {
            type = guessMimeType(source.src);
          } else {
            type = source.type.replace(/;.*/, '').toLowerCase();
          }
          return Flash.nativeSourceHandler.canPlayType(type);
        };
        Flash.nativeSourceHandler.handleSource = function(source, tech) {
          tech.setSrc(source.src);
        };
        Flash.nativeSourceHandler.dispose = function() {};
        Flash.registerSourceHandler(Flash.nativeSourceHandler);
        Flash.formats = {
          'video/flv': 'FLV',
          'video/x-flv': 'FLV',
          'video/mp4': 'MP4',
          'video/m4v': 'MP4'
        };
        Flash.onReady = function(currSwf) {
          var el = Dom.getEl(currSwf);
          var tech = el && el.tech;
          if (tech && tech.el()) {
            Flash.checkReady(tech);
          }
        };
        Flash.checkReady = function(tech) {
          if (!tech.el()) {
            return;
          }
          if (tech.el().vjs_getProperty) {
            tech.triggerReady();
          } else {
            this.setTimeout(function() {
              Flash['checkReady'](tech);
            }, 50);
          }
        };
        Flash.onEvent = function(swfID, eventName) {
          var tech = Dom.getEl(swfID).tech;
          tech.trigger(eventName);
        };
        Flash.onError = function(swfID, err) {
          var tech = Dom.getEl(swfID).tech;
          if (err === 'srcnotfound') {
            return tech.error(4);
          }
          tech.error('FLASH: ' + err);
        };
        Flash.version = function() {
          var version = '0,0,0';
          try {
            version = new _globalWindow2['default'].ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
          } catch (e) {
            try {
              if (navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
                version = (navigator.plugins['Shockwave Flash 2.0'] || navigator.plugins['Shockwave Flash']).description.replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
              }
            } catch (err) {}
          }
          return version.split(',');
        };
        Flash.embed = function(swf, flashVars, params, attributes) {
          var code = Flash.getEmbedCode(swf, flashVars, params, attributes);
          var obj = Dom.createEl('div', {innerHTML: code}).childNodes[0];
          return obj;
        };
        Flash.getEmbedCode = function(swf, flashVars, params, attributes) {
          var objTag = '<object type="application/x-shockwave-flash" ';
          var flashVarsString = '';
          var paramsString = '';
          var attrsString = '';
          if (flashVars) {
            Object.getOwnPropertyNames(flashVars).forEach(function(key) {
              flashVarsString += key + '=' + flashVars[key] + '&amp;';
            });
          }
          params = _objectAssign2['default']({
            'movie': swf,
            'flashvars': flashVarsString,
            'allowScriptAccess': 'always',
            'allowNetworking': 'all'
          }, params);
          Object.getOwnPropertyNames(params).forEach(function(key) {
            paramsString += '<param name="' + key + '" value="' + params[key] + '" />';
          });
          attributes = _objectAssign2['default']({
            'data': swf,
            'width': '100%',
            'height': '100%'
          }, attributes);
          Object.getOwnPropertyNames(attributes).forEach(function(key) {
            attrsString += key + '="' + attributes[key] + '" ';
          });
          return '' + objTag + attrsString + '>' + paramsString + '</object>';
        };
        _flashRtmp2['default'](Flash);
        _component2['default'].registerComponent('Flash', Flash);
        _tech2['default'].registerTech('Flash', Flash);
        exports['default'] = Flash;
        module.exports = exports['default'];
      }, {
        "../component": 66,
        "../utils/dom.js": 131,
        "../utils/time-ranges.js": 139,
        "../utils/url.js": 141,
        "./flash-rtmp": 114,
        "./tech": 118,
        "global/window": 2,
        "object.assign": 45
      }],
      116: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _techJs = _dereq_('./tech.js');
        var _techJs2 = _interopRequireDefault(_techJs);
        var _component = _dereq_('../component');
        var _component2 = _interopRequireDefault(_component);
        var _utilsDomJs = _dereq_('../utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsUrlJs = _dereq_('../utils/url.js');
        var Url = _interopRequireWildcard(_utilsUrlJs);
        var _utilsFnJs = _dereq_('../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsLogJs = _dereq_('../utils/log.js');
        var _utilsLogJs2 = _interopRequireDefault(_utilsLogJs);
        var _utilsBrowserJs = _dereq_('../utils/browser.js');
        var browser = _interopRequireWildcard(_utilsBrowserJs);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var _objectAssign = _dereq_('object.assign');
        var _objectAssign2 = _interopRequireDefault(_objectAssign);
        var _utilsMergeOptionsJs = _dereq_('../utils/merge-options.js');
        var _utilsMergeOptionsJs2 = _interopRequireDefault(_utilsMergeOptionsJs);
        var Html5 = (function(_Tech) {
          _inherits(Html5, _Tech);
          function Html5(options, ready) {
            _classCallCheck(this, Html5);
            _Tech.call(this, options, ready);
            var source = options.source;
            if (source && (this.el_.currentSrc !== source.src || options.tag && options.tag.initNetworkState_ === 3)) {
              this.setSource(source);
            } else {
              this.handleLateInit_(this.el_);
            }
            if (this.el_.hasChildNodes()) {
              var nodes = this.el_.childNodes;
              var nodesLength = nodes.length;
              var removeNodes = [];
              while (nodesLength--) {
                var node = nodes[nodesLength];
                var nodeName = node.nodeName.toLowerCase();
                if (nodeName === 'track') {
                  if (!this.featuresNativeTextTracks) {
                    removeNodes.push(node);
                  } else {
                    this.remoteTextTrackEls().addTrackElement_(node);
                    this.remoteTextTracks().addTrack_(node.track);
                  }
                }
              }
              for (var i = 0; i < removeNodes.length; i++) {
                this.el_.removeChild(removeNodes[i]);
              }
            }
            if (this.featuresNativeTextTracks) {
              this.handleTextTrackChange_ = Fn.bind(this, this.handleTextTrackChange);
              this.handleTextTrackAdd_ = Fn.bind(this, this.handleTextTrackAdd);
              this.handleTextTrackRemove_ = Fn.bind(this, this.handleTextTrackRemove);
              this.proxyNativeTextTracks_();
            }
            if (browser.TOUCH_ENABLED && options.nativeControlsForTouch === true || browser.IS_IPHONE || browser.IS_NATIVE_ANDROID) {
              this.setControls(true);
            }
            this.triggerReady();
          }
          Html5.prototype.dispose = function dispose() {
            var tt = this.el().textTracks;
            var emulatedTt = this.textTracks();
            if (tt && tt.removeEventListener) {
              tt.removeEventListener('change', this.handleTextTrackChange_);
              tt.removeEventListener('addtrack', this.handleTextTrackAdd_);
              tt.removeEventListener('removetrack', this.handleTextTrackRemove_);
            }
            var i = emulatedTt.length;
            while (i--) {
              emulatedTt.removeTrack_(emulatedTt[i]);
            }
            Html5.disposeMediaElement(this.el_);
            _Tech.prototype.dispose.call(this);
          };
          Html5.prototype.createEl = function createEl() {
            var el = this.options_.tag;
            if (!el || this['movingMediaElementInDOM'] === false) {
              if (el) {
                var clone = el.cloneNode(true);
                el.parentNode.insertBefore(clone, el);
                Html5.disposeMediaElement(el);
                el = clone;
              } else {
                el = _globalDocument2['default'].createElement('video');
                var tagAttributes = this.options_.tag && Dom.getElAttributes(this.options_.tag);
                var attributes = _utilsMergeOptionsJs2['default']({}, tagAttributes);
                if (!browser.TOUCH_ENABLED || this.options_.nativeControlsForTouch !== true) {
                  delete attributes.controls;
                }
                Dom.setElAttributes(el, _objectAssign2['default'](attributes, {
                  id: this.options_.techId,
                  'class': 'vjs-tech'
                }));
              }
            }
            var settingsAttrs = ['autoplay', 'preload', 'loop', 'muted'];
            for (var i = settingsAttrs.length - 1; i >= 0; i--) {
              var attr = settingsAttrs[i];
              var overwriteAttrs = {};
              if (typeof this.options_[attr] !== 'undefined') {
                overwriteAttrs[attr] = this.options_[attr];
              }
              Dom.setElAttributes(el, overwriteAttrs);
            }
            return el;
          };
          Html5.prototype.handleLateInit_ = function handleLateInit_(el) {
            var _this = this;
            if (el.networkState === 0 || el.networkState === 3) {
              return;
            }
            if (el.readyState === 0) {
              var _ret = (function() {
                var loadstartFired = false;
                var setLoadstartFired = function setLoadstartFired() {
                  loadstartFired = true;
                };
                _this.on('loadstart', setLoadstartFired);
                var triggerLoadstart = function triggerLoadstart() {
                  if (!loadstartFired) {
                    this.trigger('loadstart');
                  }
                };
                _this.on('loadedmetadata', triggerLoadstart);
                _this.ready(function() {
                  this.off('loadstart', setLoadstartFired);
                  this.off('loadedmetadata', triggerLoadstart);
                  if (!loadstartFired) {
                    this.trigger('loadstart');
                  }
                });
                return {v: undefined};
              })();
              if (typeof _ret === 'object')
                return _ret.v;
            }
            var eventsToTrigger = ['loadstart'];
            eventsToTrigger.push('loadedmetadata');
            if (el.readyState >= 2) {
              eventsToTrigger.push('loadeddata');
            }
            if (el.readyState >= 3) {
              eventsToTrigger.push('canplay');
            }
            if (el.readyState >= 4) {
              eventsToTrigger.push('canplaythrough');
            }
            this.ready(function() {
              eventsToTrigger.forEach(function(type) {
                this.trigger(type);
              }, this);
            });
          };
          Html5.prototype.proxyNativeTextTracks_ = function proxyNativeTextTracks_() {
            var tt = this.el().textTracks;
            if (tt && tt.addEventListener) {
              tt.addEventListener('change', this.handleTextTrackChange_);
              tt.addEventListener('addtrack', this.handleTextTrackAdd_);
              tt.addEventListener('removetrack', this.handleTextTrackRemove_);
            }
          };
          Html5.prototype.handleTextTrackChange = function handleTextTrackChange(e) {
            var tt = this.textTracks();
            this.textTracks().trigger({
              type: 'change',
              target: tt,
              currentTarget: tt,
              srcElement: tt
            });
          };
          Html5.prototype.handleTextTrackAdd = function handleTextTrackAdd(e) {
            this.textTracks().addTrack_(e.track);
          };
          Html5.prototype.handleTextTrackRemove = function handleTextTrackRemove(e) {
            this.textTracks().removeTrack_(e.track);
          };
          Html5.prototype.play = function play() {
            this.el_.play();
          };
          Html5.prototype.pause = function pause() {
            this.el_.pause();
          };
          Html5.prototype.paused = function paused() {
            return this.el_.paused;
          };
          Html5.prototype.currentTime = function currentTime() {
            return this.el_.currentTime;
          };
          Html5.prototype.setCurrentTime = function setCurrentTime(seconds) {
            try {
              this.el_.currentTime = seconds;
            } catch (e) {
              _utilsLogJs2['default'](e, 'Video is not ready. (Video.js)');
            }
          };
          Html5.prototype.duration = function duration() {
            return this.el_.duration || 0;
          };
          Html5.prototype.buffered = function buffered() {
            return this.el_.buffered;
          };
          Html5.prototype.volume = function volume() {
            return this.el_.volume;
          };
          Html5.prototype.setVolume = function setVolume(percentAsDecimal) {
            this.el_.volume = percentAsDecimal;
          };
          Html5.prototype.muted = function muted() {
            return this.el_.muted;
          };
          Html5.prototype.setMuted = function setMuted(muted) {
            this.el_.muted = muted;
          };
          Html5.prototype.width = function width() {
            return this.el_.offsetWidth;
          };
          Html5.prototype.height = function height() {
            return this.el_.offsetHeight;
          };
          Html5.prototype.supportsFullScreen = function supportsFullScreen() {
            if (typeof this.el_.webkitEnterFullScreen === 'function') {
              var userAgent = _globalWindow2['default'].navigator.userAgent;
              if (/Android/.test(userAgent) || !/Chrome|Mac OS X 10.5/.test(userAgent)) {
                return true;
              }
            }
            return false;
          };
          Html5.prototype.enterFullScreen = function enterFullScreen() {
            var video = this.el_;
            if ('webkitDisplayingFullscreen' in video) {
              this.one('webkitbeginfullscreen', function() {
                this.one('webkitendfullscreen', function() {
                  this.trigger('fullscreenchange', {isFullscreen: false});
                });
                this.trigger('fullscreenchange', {isFullscreen: true});
              });
            }
            if (video.paused && video.networkState <= video.HAVE_METADATA) {
              this.el_.play();
              this.setTimeout(function() {
                video.pause();
                video.webkitEnterFullScreen();
              }, 0);
            } else {
              video.webkitEnterFullScreen();
            }
          };
          Html5.prototype.exitFullScreen = function exitFullScreen() {
            this.el_.webkitExitFullScreen();
          };
          Html5.prototype.src = function src(_src) {
            if (_src === undefined) {
              return this.el_.src;
            } else {
              this.setSrc(_src);
            }
          };
          Html5.prototype.setSrc = function setSrc(src) {
            this.el_.src = src;
          };
          Html5.prototype.load = function load() {
            this.el_.load();
          };
          Html5.prototype.reset = function reset() {
            Html5.resetMediaElement(this.el_);
          };
          Html5.prototype.currentSrc = function currentSrc() {
            if (this.currentSource_) {
              return this.currentSource_.src;
            } else {
              return this.el_.currentSrc;
            }
          };
          Html5.prototype.poster = function poster() {
            return this.el_.poster;
          };
          Html5.prototype.setPoster = function setPoster(val) {
            this.el_.poster = val;
          };
          Html5.prototype.preload = function preload() {
            return this.el_.preload;
          };
          Html5.prototype.setPreload = function setPreload(val) {
            this.el_.preload = val;
          };
          Html5.prototype.autoplay = function autoplay() {
            return this.el_.autoplay;
          };
          Html5.prototype.setAutoplay = function setAutoplay(val) {
            this.el_.autoplay = val;
          };
          Html5.prototype.controls = function controls() {
            return this.el_.controls;
          };
          Html5.prototype.setControls = function setControls(val) {
            this.el_.controls = !!val;
          };
          Html5.prototype.loop = function loop() {
            return this.el_.loop;
          };
          Html5.prototype.setLoop = function setLoop(val) {
            this.el_.loop = val;
          };
          Html5.prototype.error = function error() {
            return this.el_.error;
          };
          Html5.prototype.seeking = function seeking() {
            return this.el_.seeking;
          };
          Html5.prototype.seekable = function seekable() {
            return this.el_.seekable;
          };
          Html5.prototype.ended = function ended() {
            return this.el_.ended;
          };
          Html5.prototype.defaultMuted = function defaultMuted() {
            return this.el_.defaultMuted;
          };
          Html5.prototype.playbackRate = function playbackRate() {
            return this.el_.playbackRate;
          };
          Html5.prototype.played = function played() {
            return this.el_.played;
          };
          Html5.prototype.setPlaybackRate = function setPlaybackRate(val) {
            this.el_.playbackRate = val;
          };
          Html5.prototype.networkState = function networkState() {
            return this.el_.networkState;
          };
          Html5.prototype.readyState = function readyState() {
            return this.el_.readyState;
          };
          Html5.prototype.videoWidth = function videoWidth() {
            return this.el_.videoWidth;
          };
          Html5.prototype.videoHeight = function videoHeight() {
            return this.el_.videoHeight;
          };
          Html5.prototype.textTracks = function textTracks() {
            return _Tech.prototype.textTracks.call(this);
          };
          Html5.prototype.addTextTrack = function addTextTrack(kind, label, language) {
            if (!this['featuresNativeTextTracks']) {
              return _Tech.prototype.addTextTrack.call(this, kind, label, language);
            }
            return this.el_.addTextTrack(kind, label, language);
          };
          Html5.prototype.addRemoteTextTrack = function addRemoteTextTrack() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            if (!this['featuresNativeTextTracks']) {
              return _Tech.prototype.addRemoteTextTrack.call(this, options);
            }
            var htmlTrackElement = _globalDocument2['default'].createElement('track');
            if (options.kind) {
              htmlTrackElement.kind = options.kind;
            }
            if (options.label) {
              htmlTrackElement.label = options.label;
            }
            if (options.language || options.srclang) {
              htmlTrackElement.srclang = options.language || options.srclang;
            }
            if (options['default']) {
              htmlTrackElement['default'] = options['default'];
            }
            if (options.id) {
              htmlTrackElement.id = options.id;
            }
            if (options.src) {
              htmlTrackElement.src = options.src;
            }
            this.el().appendChild(htmlTrackElement);
            this.remoteTextTrackEls().addTrackElement_(htmlTrackElement);
            this.remoteTextTracks().addTrack_(htmlTrackElement.track);
            return htmlTrackElement;
          };
          Html5.prototype.removeRemoteTextTrack = function removeRemoteTextTrack(track) {
            if (!this['featuresNativeTextTracks']) {
              return _Tech.prototype.removeRemoteTextTrack.call(this, track);
            }
            var tracks = undefined,
                i = undefined;
            var trackElement = this.remoteTextTrackEls().getTrackElementByTrack_(track);
            this.remoteTextTrackEls().removeTrackElement_(trackElement);
            this.remoteTextTracks().removeTrack_(track);
            tracks = this.$$('track');
            i = tracks.length;
            while (i--) {
              if (track === tracks[i] || track === tracks[i].track) {
                this.el().removeChild(tracks[i]);
              }
            }
          };
          return Html5;
        })(_techJs2['default']);
        Html5.TEST_VID = _globalDocument2['default'].createElement('video');
        var track = _globalDocument2['default'].createElement('track');
        track.kind = 'captions';
        track.srclang = 'en';
        track.label = 'English';
        Html5.TEST_VID.appendChild(track);
        Html5.isSupported = function() {
          try {
            Html5.TEST_VID['volume'] = 0.5;
          } catch (e) {
            return false;
          }
          return !!Html5.TEST_VID.canPlayType;
        };
        _techJs2['default'].withSourceHandlers(Html5);
        Html5.nativeSourceHandler = {};
        Html5.nativeSourceHandler.canPlayType = function(type) {
          try {
            return Html5.TEST_VID.canPlayType(type);
          } catch (e) {
            return '';
          }
        };
        Html5.nativeSourceHandler.canHandleSource = function(source) {
          var match,
              ext;
          if (source.type) {
            return Html5.nativeSourceHandler.canPlayType(source.type);
          } else if (source.src) {
            ext = Url.getFileExtension(source.src);
            return Html5.nativeSourceHandler.canPlayType('video/' + ext);
          }
          return '';
        };
        Html5.nativeSourceHandler.handleSource = function(source, tech) {
          tech.setSrc(source.src);
        };
        Html5.nativeSourceHandler.dispose = function() {};
        Html5.registerSourceHandler(Html5.nativeSourceHandler);
        Html5.canControlVolume = function() {
          var volume = Html5.TEST_VID.volume;
          Html5.TEST_VID.volume = volume / 2 + 0.1;
          return volume !== Html5.TEST_VID.volume;
        };
        Html5.canControlPlaybackRate = function() {
          var playbackRate = Html5.TEST_VID.playbackRate;
          Html5.TEST_VID.playbackRate = playbackRate / 2 + 0.1;
          return playbackRate !== Html5.TEST_VID.playbackRate;
        };
        Html5.supportsNativeTextTracks = function() {
          var supportsTextTracks;
          supportsTextTracks = !!Html5.TEST_VID.textTracks;
          if (supportsTextTracks && Html5.TEST_VID.textTracks.length > 0) {
            supportsTextTracks = typeof Html5.TEST_VID.textTracks[0]['mode'] !== 'number';
          }
          if (supportsTextTracks && browser.IS_FIREFOX) {
            supportsTextTracks = false;
          }
          if (supportsTextTracks && !('onremovetrack' in Html5.TEST_VID.textTracks)) {
            supportsTextTracks = false;
          }
          return supportsTextTracks;
        };
        Html5.Events = ['loadstart', 'suspend', 'abort', 'error', 'emptied', 'stalled', 'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'playing', 'waiting', 'seeking', 'seeked', 'ended', 'durationchange', 'timeupdate', 'progress', 'play', 'pause', 'ratechange', 'volumechange'];
        Html5.prototype['featuresVolumeControl'] = Html5.canControlVolume();
        Html5.prototype['featuresPlaybackRate'] = Html5.canControlPlaybackRate();
        Html5.prototype['movingMediaElementInDOM'] = !browser.IS_IOS;
        Html5.prototype['featuresFullscreenResize'] = true;
        Html5.prototype['featuresProgressEvents'] = true;
        Html5.prototype['featuresNativeTextTracks'] = Html5.supportsNativeTextTracks();
        var canPlayType = undefined;
        var mpegurlRE = /^application\/(?:x-|vnd\.apple\.)mpegurl/i;
        var mp4RE = /^video\/mp4/i;
        Html5.patchCanPlayType = function() {
          if (browser.ANDROID_VERSION >= 4.0) {
            if (!canPlayType) {
              canPlayType = Html5.TEST_VID.constructor.prototype.canPlayType;
            }
            Html5.TEST_VID.constructor.prototype.canPlayType = function(type) {
              if (type && mpegurlRE.test(type)) {
                return 'maybe';
              }
              return canPlayType.call(this, type);
            };
          }
          if (browser.IS_OLD_ANDROID) {
            if (!canPlayType) {
              canPlayType = Html5.TEST_VID.constructor.prototype.canPlayType;
            }
            Html5.TEST_VID.constructor.prototype.canPlayType = function(type) {
              if (type && mp4RE.test(type)) {
                return 'maybe';
              }
              return canPlayType.call(this, type);
            };
          }
        };
        Html5.unpatchCanPlayType = function() {
          var r = Html5.TEST_VID.constructor.prototype.canPlayType;
          Html5.TEST_VID.constructor.prototype.canPlayType = canPlayType;
          canPlayType = null;
          return r;
        };
        Html5.patchCanPlayType();
        Html5.disposeMediaElement = function(el) {
          if (!el) {
            return;
          }
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
          while (el.hasChildNodes()) {
            el.removeChild(el.firstChild);
          }
          el.removeAttribute('src');
          if (typeof el.load === 'function') {
            (function() {
              try {
                el.load();
              } catch (e) {}
            })();
          }
        };
        Html5.resetMediaElement = function(el) {
          if (!el) {
            return;
          }
          var sources = el.querySelectorAll('source');
          var i = sources.length;
          while (i--) {
            el.removeChild(sources[i]);
          }
          el.removeAttribute('src');
          if (typeof el.load === 'function') {
            (function() {
              try {
                el.load();
              } catch (e) {}
            })();
          }
        };
        _component2['default'].registerComponent('Html5', Html5);
        _techJs2['default'].registerTech('Html5', Html5);
        exports['default'] = Html5;
        module.exports = exports['default'];
      }, {
        "../component": 66,
        "../utils/browser.js": 128,
        "../utils/dom.js": 131,
        "../utils/fn.js": 133,
        "../utils/log.js": 136,
        "../utils/merge-options.js": 137,
        "../utils/url.js": 141,
        "./tech.js": 118,
        "global/document": 1,
        "global/window": 2,
        "object.assign": 45
      }],
      117: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _componentJs = _dereq_('../component.js');
        var _componentJs2 = _interopRequireDefault(_componentJs);
        var _techJs = _dereq_('./tech.js');
        var _techJs2 = _interopRequireDefault(_techJs);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var _utilsToTitleCaseJs = _dereq_('../utils/to-title-case.js');
        var _utilsToTitleCaseJs2 = _interopRequireDefault(_utilsToTitleCaseJs);
        var MediaLoader = (function(_Component) {
          _inherits(MediaLoader, _Component);
          function MediaLoader(player, options, ready) {
            _classCallCheck(this, MediaLoader);
            _Component.call(this, player, options, ready);
            if (!options.playerOptions['sources'] || options.playerOptions['sources'].length === 0) {
              for (var i = 0,
                  j = options.playerOptions['techOrder']; i < j.length; i++) {
                var techName = _utilsToTitleCaseJs2['default'](j[i]);
                var tech = _techJs2['default'].getTech(techName);
                if (!techName) {
                  tech = _componentJs2['default'].getComponent(techName);
                }
                if (tech && tech.isSupported()) {
                  player.loadTech_(techName);
                  break;
                }
              }
            } else {
              player.src(options.playerOptions['sources']);
            }
          }
          return MediaLoader;
        })(_componentJs2['default']);
        _componentJs2['default'].registerComponent('MediaLoader', MediaLoader);
        exports['default'] = MediaLoader;
        module.exports = exports['default'];
      }, {
        "../component.js": 66,
        "../utils/to-title-case.js": 140,
        "./tech.js": 118,
        "global/window": 2
      }],
      118: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _component = _dereq_('../component');
        var _component2 = _interopRequireDefault(_component);
        var _tracksHtmlTrackElement = _dereq_('../tracks/html-track-element');
        var _tracksHtmlTrackElement2 = _interopRequireDefault(_tracksHtmlTrackElement);
        var _tracksHtmlTrackElementList = _dereq_('../tracks/html-track-element-list');
        var _tracksHtmlTrackElementList2 = _interopRequireDefault(_tracksHtmlTrackElementList);
        var _utilsMergeOptionsJs = _dereq_('../utils/merge-options.js');
        var _utilsMergeOptionsJs2 = _interopRequireDefault(_utilsMergeOptionsJs);
        var _tracksTextTrack = _dereq_('../tracks/text-track');
        var _tracksTextTrack2 = _interopRequireDefault(_tracksTextTrack);
        var _tracksTextTrackList = _dereq_('../tracks/text-track-list');
        var _tracksTextTrackList2 = _interopRequireDefault(_tracksTextTrackList);
        var _utilsFnJs = _dereq_('../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsLogJs = _dereq_('../utils/log.js');
        var _utilsLogJs2 = _interopRequireDefault(_utilsLogJs);
        var _utilsTimeRangesJs = _dereq_('../utils/time-ranges.js');
        var _utilsBufferJs = _dereq_('../utils/buffer.js');
        var _mediaErrorJs = _dereq_('../media-error.js');
        var _mediaErrorJs2 = _interopRequireDefault(_mediaErrorJs);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var Tech = (function(_Component) {
          _inherits(Tech, _Component);
          function Tech() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var ready = arguments.length <= 1 || arguments[1] === undefined ? function() {} : arguments[1];
            _classCallCheck(this, Tech);
            options.reportTouchActivity = false;
            _Component.call(this, null, options, ready);
            this.hasStarted_ = false;
            this.on('playing', function() {
              this.hasStarted_ = true;
            });
            this.on('loadstart', function() {
              this.hasStarted_ = false;
            });
            this.textTracks_ = options.textTracks;
            if (!this.featuresProgressEvents) {
              this.manualProgressOn();
            }
            if (!this.featuresTimeupdateEvents) {
              this.manualTimeUpdatesOn();
            }
            if (options.nativeCaptions === false || options.nativeTextTracks === false) {
              this.featuresNativeTextTracks = false;
            }
            if (!this.featuresNativeTextTracks) {
              this.on('ready', this.emulateTextTracks);
            }
            this.initTextTrackListeners();
            this.emitTapEvents();
          }
          Tech.prototype.manualProgressOn = function manualProgressOn() {
            this.on('durationchange', this.onDurationChange);
            this.manualProgress = true;
            this.one('ready', this.trackProgress);
          };
          Tech.prototype.manualProgressOff = function manualProgressOff() {
            this.manualProgress = false;
            this.stopTrackingProgress();
            this.off('durationchange', this.onDurationChange);
          };
          Tech.prototype.trackProgress = function trackProgress() {
            this.stopTrackingProgress();
            this.progressInterval = this.setInterval(Fn.bind(this, function() {
              var numBufferedPercent = this.bufferedPercent();
              if (this.bufferedPercent_ !== numBufferedPercent) {
                this.trigger('progress');
              }
              this.bufferedPercent_ = numBufferedPercent;
              if (numBufferedPercent === 1) {
                this.stopTrackingProgress();
              }
            }), 500);
          };
          Tech.prototype.onDurationChange = function onDurationChange() {
            this.duration_ = this.duration();
          };
          Tech.prototype.buffered = function buffered() {
            return _utilsTimeRangesJs.createTimeRange(0, 0);
          };
          Tech.prototype.bufferedPercent = function bufferedPercent() {
            return _utilsBufferJs.bufferedPercent(this.buffered(), this.duration_);
          };
          Tech.prototype.stopTrackingProgress = function stopTrackingProgress() {
            this.clearInterval(this.progressInterval);
          };
          Tech.prototype.manualTimeUpdatesOn = function manualTimeUpdatesOn() {
            this.manualTimeUpdates = true;
            this.on('play', this.trackCurrentTime);
            this.on('pause', this.stopTrackingCurrentTime);
          };
          Tech.prototype.manualTimeUpdatesOff = function manualTimeUpdatesOff() {
            this.manualTimeUpdates = false;
            this.stopTrackingCurrentTime();
            this.off('play', this.trackCurrentTime);
            this.off('pause', this.stopTrackingCurrentTime);
          };
          Tech.prototype.trackCurrentTime = function trackCurrentTime() {
            if (this.currentTimeInterval) {
              this.stopTrackingCurrentTime();
            }
            this.currentTimeInterval = this.setInterval(function() {
              this.trigger({
                type: 'timeupdate',
                target: this,
                manuallyTriggered: true
              });
            }, 250);
          };
          Tech.prototype.stopTrackingCurrentTime = function stopTrackingCurrentTime() {
            this.clearInterval(this.currentTimeInterval);
            this.trigger({
              type: 'timeupdate',
              target: this,
              manuallyTriggered: true
            });
          };
          Tech.prototype.dispose = function dispose() {
            var textTracks = this.textTracks();
            if (textTracks) {
              var i = textTracks.length;
              while (i--) {
                this.removeRemoteTextTrack(textTracks[i]);
              }
            }
            if (this.manualProgress) {
              this.manualProgressOff();
            }
            if (this.manualTimeUpdates) {
              this.manualTimeUpdatesOff();
            }
            _Component.prototype.dispose.call(this);
          };
          Tech.prototype.reset = function reset() {};
          Tech.prototype.error = function error(err) {
            if (err !== undefined) {
              if (err instanceof _mediaErrorJs2['default']) {
                this.error_ = err;
              } else {
                this.error_ = new _mediaErrorJs2['default'](err);
              }
              this.trigger('error');
            }
            return this.error_;
          };
          Tech.prototype.played = function played() {
            if (this.hasStarted_) {
              return _utilsTimeRangesJs.createTimeRange(0, 0);
            }
            return _utilsTimeRangesJs.createTimeRange();
          };
          Tech.prototype.setCurrentTime = function setCurrentTime() {
            if (this.manualTimeUpdates) {
              this.trigger({
                type: 'timeupdate',
                target: this,
                manuallyTriggered: true
              });
            }
          };
          Tech.prototype.initTextTrackListeners = function initTextTrackListeners() {
            var textTrackListChanges = Fn.bind(this, function() {
              this.trigger('texttrackchange');
            });
            var tracks = this.textTracks();
            if (!tracks)
              return;
            tracks.addEventListener('removetrack', textTrackListChanges);
            tracks.addEventListener('addtrack', textTrackListChanges);
            this.on('dispose', Fn.bind(this, function() {
              tracks.removeEventListener('removetrack', textTrackListChanges);
              tracks.removeEventListener('addtrack', textTrackListChanges);
            }));
          };
          Tech.prototype.emulateTextTracks = function emulateTextTracks() {
            var _this = this;
            var tracks = this.textTracks();
            if (!tracks) {
              return;
            }
            if (!_globalWindow2['default']['WebVTT'] && this.el().parentNode != null) {
              var script = _globalDocument2['default'].createElement('script');
              script.src = this.options_['vtt.js'] || 'https://cdn.rawgit.com/gkatsev/vtt.js/vjs-v0.12.1/dist/vtt.min.js';
              this.el().parentNode.appendChild(script);
              _globalWindow2['default']['WebVTT'] = true;
            }
            var updateDisplay = function updateDisplay() {
              return _this.trigger('texttrackchange');
            };
            var textTracksChanges = function textTracksChanges() {
              updateDisplay();
              for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                track.removeEventListener('cuechange', updateDisplay);
                if (track.mode === 'showing') {
                  track.addEventListener('cuechange', updateDisplay);
                }
              }
            };
            textTracksChanges();
            tracks.addEventListener('change', textTracksChanges);
            this.on('dispose', function() {
              tracks.removeEventListener('change', textTracksChanges);
            });
          };
          Tech.prototype.textTracks = function textTracks() {
            this.textTracks_ = this.textTracks_ || new _tracksTextTrackList2['default']();
            return this.textTracks_;
          };
          Tech.prototype.remoteTextTracks = function remoteTextTracks() {
            this.remoteTextTracks_ = this.remoteTextTracks_ || new _tracksTextTrackList2['default']();
            return this.remoteTextTracks_;
          };
          Tech.prototype.remoteTextTrackEls = function remoteTextTrackEls() {
            this.remoteTextTrackEls_ = this.remoteTextTrackEls_ || new _tracksHtmlTrackElementList2['default']();
            return this.remoteTextTrackEls_;
          };
          Tech.prototype.addTextTrack = function addTextTrack(kind, label, language) {
            if (!kind) {
              throw new Error('TextTrack kind is required but was not provided');
            }
            return createTrackHelper(this, kind, label, language);
          };
          Tech.prototype.addRemoteTextTrack = function addRemoteTextTrack(options) {
            var track = _utilsMergeOptionsJs2['default'](options, {tech: this});
            var htmlTrackElement = new _tracksHtmlTrackElement2['default'](track);
            this.remoteTextTrackEls().addTrackElement_(htmlTrackElement);
            this.remoteTextTracks().addTrack_(htmlTrackElement.track);
            this.textTracks().addTrack_(htmlTrackElement.track);
            return htmlTrackElement;
          };
          Tech.prototype.removeRemoteTextTrack = function removeRemoteTextTrack(track) {
            this.textTracks().removeTrack_(track);
            var trackElement = this.remoteTextTrackEls().getTrackElementByTrack_(track);
            this.remoteTextTrackEls().removeTrackElement_(trackElement);
            this.remoteTextTracks().removeTrack_(track);
          };
          Tech.prototype.setPoster = function setPoster() {};
          Tech.prototype.canPlayType = function canPlayType() {
            return '';
          };
          Tech.isTech = function isTech(component) {
            return component.prototype instanceof Tech || component instanceof Tech || component === Tech;
          };
          Tech.registerTech = function registerTech(name, tech) {
            if (!Tech.techs_) {
              Tech.techs_ = {};
            }
            if (!Tech.isTech(tech)) {
              throw new Error('Tech ' + name + ' must be a Tech');
            }
            Tech.techs_[name] = tech;
            return tech;
          };
          Tech.getTech = function getTech(name) {
            if (Tech.techs_ && Tech.techs_[name]) {
              return Tech.techs_[name];
            }
            if (_globalWindow2['default'] && _globalWindow2['default'].videojs && _globalWindow2['default'].videojs[name]) {
              _utilsLogJs2['default'].warn('The ' + name + ' tech was added to the videojs object when it should be registered using videojs.registerTech(name, tech)');
              return _globalWindow2['default'].videojs[name];
            }
          };
          return Tech;
        })(_component2['default']);
        Tech.prototype.textTracks_;
        var createTrackHelper = function createTrackHelper(self, kind, label, language) {
          var options = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
          var tracks = self.textTracks();
          options.kind = kind;
          if (label) {
            options.label = label;
          }
          if (language) {
            options.language = language;
          }
          options.tech = self;
          var track = new _tracksTextTrack2['default'](options);
          tracks.addTrack_(track);
          return track;
        };
        Tech.prototype.featuresVolumeControl = true;
        Tech.prototype.featuresFullscreenResize = false;
        Tech.prototype.featuresPlaybackRate = false;
        Tech.prototype.featuresProgressEvents = false;
        Tech.prototype.featuresTimeupdateEvents = false;
        Tech.prototype.featuresNativeTextTracks = false;
        Tech.withSourceHandlers = function(_Tech) {
          _Tech.registerSourceHandler = function(handler, index) {
            var handlers = _Tech.sourceHandlers;
            if (!handlers) {
              handlers = _Tech.sourceHandlers = [];
            }
            if (index === undefined) {
              index = handlers.length;
            }
            handlers.splice(index, 0, handler);
          };
          _Tech.canPlayType = function(type) {
            var handlers = _Tech.sourceHandlers || [];
            var can = undefined;
            for (var i = 0; i < handlers.length; i++) {
              can = handlers[i].canPlayType(type);
              if (can) {
                return can;
              }
            }
            return '';
          };
          _Tech.selectSourceHandler = function(source) {
            var handlers = _Tech.sourceHandlers || [];
            var can = undefined;
            for (var i = 0; i < handlers.length; i++) {
              can = handlers[i].canHandleSource(source);
              if (can) {
                return handlers[i];
              }
            }
            return null;
          };
          _Tech.canPlaySource = function(srcObj) {
            var sh = _Tech.selectSourceHandler(srcObj);
            if (sh) {
              return sh.canHandleSource(srcObj);
            }
            return '';
          };
          var deferrable = ['seekable', 'duration'];
          deferrable.forEach(function(fnName) {
            var originalFn = this[fnName];
            if (typeof originalFn !== 'function') {
              return;
            }
            this[fnName] = function() {
              if (this.sourceHandler_ && this.sourceHandler_[fnName]) {
                return this.sourceHandler_[fnName].apply(this.sourceHandler_, arguments);
              }
              return originalFn.apply(this, arguments);
            };
          }, _Tech.prototype);
          _Tech.prototype.setSource = function(source) {
            var sh = _Tech.selectSourceHandler(source);
            if (!sh) {
              if (_Tech.nativeSourceHandler) {
                sh = _Tech.nativeSourceHandler;
              } else {
                _utilsLogJs2['default'].error('No source hander found for the current source.');
              }
            }
            this.disposeSourceHandler();
            this.off('dispose', this.disposeSourceHandler);
            this.currentSource_ = source;
            this.sourceHandler_ = sh.handleSource(source, this);
            this.on('dispose', this.disposeSourceHandler);
            return this;
          };
          _Tech.prototype.disposeSourceHandler = function() {
            if (this.sourceHandler_ && this.sourceHandler_.dispose) {
              this.sourceHandler_.dispose();
            }
          };
        };
        _component2['default'].registerComponent('Tech', Tech);
        _component2['default'].registerComponent('MediaTechController', Tech);
        Tech.registerTech('Tech', Tech);
        exports['default'] = Tech;
        module.exports = exports['default'];
      }, {
        "../component": 66,
        "../media-error.js": 102,
        "../tracks/html-track-element": 120,
        "../tracks/html-track-element-list": 119,
        "../tracks/text-track": 127,
        "../tracks/text-track-list": 125,
        "../utils/buffer.js": 129,
        "../utils/fn.js": 133,
        "../utils/log.js": 136,
        "../utils/merge-options.js": 137,
        "../utils/time-ranges.js": 139,
        "global/document": 1,
        "global/window": 2
      }],
      119: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        var _utilsBrowserJs = _dereq_('../utils/browser.js');
        var browser = _interopRequireWildcard(_utilsBrowserJs);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var HtmlTrackElementList = (function() {
          function HtmlTrackElementList() {
            var trackElements = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            _classCallCheck(this, HtmlTrackElementList);
            var list = this;
            if (browser.IS_IE8) {
              list = _globalDocument2['default'].createElement('custom');
              for (var prop in HtmlTrackElementList.prototype) {
                if (prop !== 'constructor') {
                  list[prop] = HtmlTrackElementList.prototype[prop];
                }
              }
            }
            list.trackElements_ = [];
            Object.defineProperty(list, 'length', {get: function get() {
                return this.trackElements_.length;
              }});
            for (var i = 0,
                _length = trackElements.length; i < _length; i++) {
              list.addTrackElement_(trackElements[i]);
            }
            if (browser.IS_IE8) {
              return list;
            }
          }
          HtmlTrackElementList.prototype.addTrackElement_ = function addTrackElement_(trackElement) {
            this.trackElements_.push(trackElement);
          };
          HtmlTrackElementList.prototype.getTrackElementByTrack_ = function getTrackElementByTrack_(track) {
            var trackElement_ = undefined;
            for (var i = 0,
                _length2 = this.trackElements_.length; i < _length2; i++) {
              if (track === this.trackElements_[i].track) {
                trackElement_ = this.trackElements_[i];
                break;
              }
            }
            return trackElement_;
          };
          HtmlTrackElementList.prototype.removeTrackElement_ = function removeTrackElement_(trackElement) {
            for (var i = 0,
                _length3 = this.trackElements_.length; i < _length3; i++) {
              if (trackElement === this.trackElements_[i]) {
                this.trackElements_.splice(i, 1);
                break;
              }
            }
          };
          return HtmlTrackElementList;
        })();
        exports['default'] = HtmlTrackElementList;
        module.exports = exports['default'];
      }, {
        "../utils/browser.js": 128,
        "global/document": 1
      }],
      120: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _utilsBrowserJs = _dereq_('../utils/browser.js');
        var browser = _interopRequireWildcard(_utilsBrowserJs);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _eventTarget = _dereq_('../event-target');
        var _eventTarget2 = _interopRequireDefault(_eventTarget);
        var _tracksTextTrack = _dereq_('../tracks/text-track');
        var _tracksTextTrack2 = _interopRequireDefault(_tracksTextTrack);
        var NONE = 0;
        var LOADING = 1;
        var LOADED = 2;
        var ERROR = 3;
        var HTMLTrackElement = (function(_EventTarget) {
          _inherits(HTMLTrackElement, _EventTarget);
          function HTMLTrackElement() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            _classCallCheck(this, HTMLTrackElement);
            _EventTarget.call(this);
            var readyState = undefined,
                trackElement = this;
            if (browser.IS_IE8) {
              trackElement = _globalDocument2['default'].createElement('custom');
              for (var prop in HTMLTrackElement.prototype) {
                if (prop !== 'constructor') {
                  trackElement[prop] = HTMLTrackElement.prototype[prop];
                }
              }
            }
            var track = new _tracksTextTrack2['default'](options);
            trackElement.kind = track.kind;
            trackElement.src = track.src;
            trackElement.srclang = track.language;
            trackElement.label = track.label;
            trackElement['default'] = track['default'];
            Object.defineProperty(trackElement, 'readyState', {get: function get() {
                return readyState;
              }});
            Object.defineProperty(trackElement, 'track', {get: function get() {
                return track;
              }});
            readyState = NONE;
            track.addEventListener('loadeddata', function() {
              readyState = LOADED;
              trackElement.trigger({
                type: 'load',
                target: trackElement
              });
            });
            if (browser.IS_IE8) {
              return trackElement;
            }
          }
          return HTMLTrackElement;
        })(_eventTarget2['default']);
        HTMLTrackElement.prototype.allowedEvents_ = {load: 'load'};
        HTMLTrackElement.NONE = NONE;
        HTMLTrackElement.LOADING = LOADING;
        HTMLTrackElement.LOADED = LOADED;
        HTMLTrackElement.ERROR = ERROR;
        exports['default'] = HTMLTrackElement;
        module.exports = exports['default'];
      }, {
        "../event-target": 98,
        "../tracks/text-track": 127,
        "../utils/browser.js": 128,
        "global/document": 1
      }],
      121: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        var _utilsBrowserJs = _dereq_('../utils/browser.js');
        var browser = _interopRequireWildcard(_utilsBrowserJs);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        function TextTrackCueList(cues) {
          var list = this;
          if (browser.IS_IE8) {
            list = _globalDocument2['default'].createElement('custom');
            for (var prop in TextTrackCueList.prototype) {
              if (prop !== 'constructor') {
                list[prop] = TextTrackCueList.prototype[prop];
              }
            }
          }
          TextTrackCueList.prototype.setCues_.call(list, cues);
          Object.defineProperty(list, 'length', {get: function get() {
              return this.length_;
            }});
          if (browser.IS_IE8) {
            return list;
          }
        }
        TextTrackCueList.prototype.setCues_ = function(cues) {
          var oldLength = this.length || 0;
          var i = 0;
          var l = cues.length;
          this.cues_ = cues;
          this.length_ = cues.length;
          var defineProp = function defineProp(i) {
            if (!('' + i in this)) {
              Object.defineProperty(this, '' + i, {get: function get() {
                  return this.cues_[i];
                }});
            }
          };
          if (oldLength < l) {
            i = oldLength;
            for (; i < l; i++) {
              defineProp.call(this, i);
            }
          }
        };
        TextTrackCueList.prototype.getCueById = function(id) {
          var result = null;
          for (var i = 0,
              l = this.length; i < l; i++) {
            var cue = this[i];
            if (cue.id === id) {
              result = cue;
              break;
            }
          }
          return result;
        };
        exports['default'] = TextTrackCueList;
        module.exports = exports['default'];
      }, {
        "../utils/browser.js": 128,
        "global/document": 1
      }],
      122: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _component = _dereq_('../component');
        var _component2 = _interopRequireDefault(_component);
        var _menuMenuJs = _dereq_('../menu/menu.js');
        var _menuMenuJs2 = _interopRequireDefault(_menuMenuJs);
        var _menuMenuItemJs = _dereq_('../menu/menu-item.js');
        var _menuMenuItemJs2 = _interopRequireDefault(_menuMenuItemJs);
        var _menuMenuButtonJs = _dereq_('../menu/menu-button.js');
        var _menuMenuButtonJs2 = _interopRequireDefault(_menuMenuButtonJs);
        var _utilsFnJs = _dereq_('../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var darkGray = '#222';
        var lightGray = '#ccc';
        var fontMap = {
          monospace: 'monospace',
          sansSerif: 'sans-serif',
          serif: 'serif',
          monospaceSansSerif: '"Andale Mono", "Lucida Console", monospace',
          monospaceSerif: '"Courier New", monospace',
          proportionalSansSerif: 'sans-serif',
          proportionalSerif: 'serif',
          casual: '"Comic Sans MS", Impact, fantasy',
          script: '"Monotype Corsiva", cursive',
          smallcaps: '"Andale Mono", "Lucida Console", monospace, sans-serif'
        };
        var TextTrackDisplay = (function(_Component) {
          _inherits(TextTrackDisplay, _Component);
          function TextTrackDisplay(player, options, ready) {
            _classCallCheck(this, TextTrackDisplay);
            _Component.call(this, player, options, ready);
            player.on('loadstart', Fn.bind(this, this.toggleDisplay));
            player.on('texttrackchange', Fn.bind(this, this.updateDisplay));
            player.ready(Fn.bind(this, function() {
              if (player.tech_ && player.tech_['featuresNativeTextTracks']) {
                this.hide();
                return;
              }
              player.on('fullscreenchange', Fn.bind(this, this.updateDisplay));
              var tracks = this.options_.playerOptions['tracks'] || [];
              for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                this.player_.addRemoteTextTrack(track);
              }
            }));
          }
          TextTrackDisplay.prototype.toggleDisplay = function toggleDisplay() {
            if (this.player_.tech_ && this.player_.tech_['featuresNativeTextTracks']) {
              this.hide();
            } else {
              this.show();
            }
          };
          TextTrackDisplay.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {className: 'vjs-text-track-display'});
          };
          TextTrackDisplay.prototype.clearDisplay = function clearDisplay() {
            if (typeof _globalWindow2['default']['WebVTT'] === 'function') {
              _globalWindow2['default']['WebVTT']['processCues'](_globalWindow2['default'], [], this.el_);
            }
          };
          TextTrackDisplay.prototype.updateDisplay = function updateDisplay() {
            var tracks = this.player_.textTracks();
            this.clearDisplay();
            if (!tracks) {
              return;
            }
            for (var i = 0; i < tracks.length; i++) {
              var track = tracks[i];
              if (track['mode'] === 'showing') {
                this.updateForTrack(track);
              }
            }
          };
          TextTrackDisplay.prototype.updateForTrack = function updateForTrack(track) {
            if (typeof _globalWindow2['default']['WebVTT'] !== 'function' || !track['activeCues']) {
              return;
            }
            var overrides = this.player_['textTrackSettings'].getValues();
            var cues = [];
            for (var _i = 0; _i < track['activeCues'].length; _i++) {
              cues.push(track['activeCues'][_i]);
            }
            _globalWindow2['default']['WebVTT']['processCues'](_globalWindow2['default'], track['activeCues'], this.el_);
            var i = cues.length;
            while (i--) {
              var cue = cues[i];
              if (!cue) {
                continue;
              }
              var cueDiv = cue.displayState;
              if (overrides.color) {
                cueDiv.firstChild.style.color = overrides.color;
              }
              if (overrides.textOpacity) {
                tryUpdateStyle(cueDiv.firstChild, 'color', constructColor(overrides.color || '#fff', overrides.textOpacity));
              }
              if (overrides.backgroundColor) {
                cueDiv.firstChild.style.backgroundColor = overrides.backgroundColor;
              }
              if (overrides.backgroundOpacity) {
                tryUpdateStyle(cueDiv.firstChild, 'backgroundColor', constructColor(overrides.backgroundColor || '#000', overrides.backgroundOpacity));
              }
              if (overrides.windowColor) {
                if (overrides.windowOpacity) {
                  tryUpdateStyle(cueDiv, 'backgroundColor', constructColor(overrides.windowColor, overrides.windowOpacity));
                } else {
                  cueDiv.style.backgroundColor = overrides.windowColor;
                }
              }
              if (overrides.edgeStyle) {
                if (overrides.edgeStyle === 'dropshadow') {
                  cueDiv.firstChild.style.textShadow = '2px 2px 3px ' + darkGray + ', 2px 2px 4px ' + darkGray + ', 2px 2px 5px ' + darkGray;
                } else if (overrides.edgeStyle === 'raised') {
                  cueDiv.firstChild.style.textShadow = '1px 1px ' + darkGray + ', 2px 2px ' + darkGray + ', 3px 3px ' + darkGray;
                } else if (overrides.edgeStyle === 'depressed') {
                  cueDiv.firstChild.style.textShadow = '1px 1px ' + lightGray + ', 0 1px ' + lightGray + ', -1px -1px ' + darkGray + ', 0 -1px ' + darkGray;
                } else if (overrides.edgeStyle === 'uniform') {
                  cueDiv.firstChild.style.textShadow = '0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray + ', 0 0 4px ' + darkGray;
                }
              }
              if (overrides.fontPercent && overrides.fontPercent !== 1) {
                var fontSize = _globalWindow2['default'].parseFloat(cueDiv.style.fontSize);
                cueDiv.style.fontSize = fontSize * overrides.fontPercent + 'px';
                cueDiv.style.height = 'auto';
                cueDiv.style.top = 'auto';
                cueDiv.style.bottom = '2px';
              }
              if (overrides.fontFamily && overrides.fontFamily !== 'default') {
                if (overrides.fontFamily === 'small-caps') {
                  cueDiv.firstChild.style.fontVariant = 'small-caps';
                } else {
                  cueDiv.firstChild.style.fontFamily = fontMap[overrides.fontFamily];
                }
              }
            }
          };
          return TextTrackDisplay;
        })(_component2['default']);
        function constructColor(color, opacity) {
          return 'rgba(' + parseInt(color[1] + color[1], 16) + ',' + parseInt(color[2] + color[2], 16) + ',' + parseInt(color[3] + color[3], 16) + ',' + opacity + ')';
        }
        function tryUpdateStyle(el, style, rule) {
          try {
            el.style[style] = rule;
          } catch (e) {}
        }
        _component2['default'].registerComponent('TextTrackDisplay', TextTrackDisplay);
        exports['default'] = TextTrackDisplay;
        module.exports = exports['default'];
      }, {
        "../component": 66,
        "../menu/menu-button.js": 103,
        "../menu/menu-item.js": 104,
        "../menu/menu.js": 105,
        "../utils/fn.js": 133,
        "global/document": 1,
        "global/window": 2
      }],
      123: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        var TextTrackMode = {
          'disabled': 'disabled',
          'hidden': 'hidden',
          'showing': 'showing'
        };
        var TextTrackKind = {
          'subtitles': 'subtitles',
          'captions': 'captions',
          'descriptions': 'descriptions',
          'chapters': 'chapters',
          'metadata': 'metadata'
        };
        exports.TextTrackMode = TextTrackMode;
        exports.TextTrackKind = TextTrackKind;
      }, {}],
      124: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        var trackToJson_ = function trackToJson_(track) {
          var ret = ['kind', 'label', 'language', 'id', 'inBandMetadataTrackDispatchType', 'mode', 'src'].reduce(function(acc, prop, i) {
            if (track[prop]) {
              acc[prop] = track[prop];
            }
            return acc;
          }, {cues: track.cues && Array.prototype.map.call(track.cues, function(cue) {
              return {
                startTime: cue.startTime,
                endTime: cue.endTime,
                text: cue.text,
                id: cue.id
              };
            })});
          return ret;
        };
        var textTracksToJson = function textTracksToJson(tech) {
          var trackEls = tech.$$('track');
          var trackObjs = Array.prototype.map.call(trackEls, function(t) {
            return t.track;
          });
          var tracks = Array.prototype.map.call(trackEls, function(trackEl) {
            var json = trackToJson_(trackEl.track);
            if (trackEl.src) {
              json.src = trackEl.src;
            }
            return json;
          });
          return tracks.concat(Array.prototype.filter.call(tech.textTracks(), function(track) {
            return trackObjs.indexOf(track) === -1;
          }).map(trackToJson_));
        };
        var jsonToTextTracks = function jsonToTextTracks(json, tech) {
          json.forEach(function(track) {
            var addedTrack = tech.addRemoteTextTrack(track).track;
            if (!track.src && track.cues) {
              track.cues.forEach(function(cue) {
                return addedTrack.addCue(cue);
              });
            }
          });
          return tech.textTracks();
        };
        exports['default'] = {
          textTracksToJson: textTracksToJson,
          jsonToTextTracks: jsonToTextTracks,
          trackToJson_: trackToJson_
        };
        module.exports = exports['default'];
      }, {}],
      125: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _eventTarget = _dereq_('../event-target');
        var _eventTarget2 = _interopRequireDefault(_eventTarget);
        var _utilsFnJs = _dereq_('../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsBrowserJs = _dereq_('../utils/browser.js');
        var browser = _interopRequireWildcard(_utilsBrowserJs);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        function TextTrackList(tracks) {
          var list = this;
          if (browser.IS_IE8) {
            list = _globalDocument2['default'].createElement('custom');
            for (var prop in TextTrackList.prototype) {
              if (prop !== 'constructor') {
                list[prop] = TextTrackList.prototype[prop];
              }
            }
          }
          tracks = tracks || [];
          list.tracks_ = [];
          Object.defineProperty(list, 'length', {get: function get() {
              return this.tracks_.length;
            }});
          for (var i = 0; i < tracks.length; i++) {
            list.addTrack_(tracks[i]);
          }
          if (browser.IS_IE8) {
            return list;
          }
        }
        TextTrackList.prototype = Object.create(_eventTarget2['default'].prototype);
        TextTrackList.prototype.constructor = TextTrackList;
        TextTrackList.prototype.allowedEvents_ = {
          'change': 'change',
          'addtrack': 'addtrack',
          'removetrack': 'removetrack'
        };
        for (var _event in TextTrackList.prototype.allowedEvents_) {
          TextTrackList.prototype['on' + _event] = null;
        }
        TextTrackList.prototype.addTrack_ = function(track) {
          var index = this.tracks_.length;
          if (!('' + index in this)) {
            Object.defineProperty(this, index, {get: function get() {
                return this.tracks_[index];
              }});
          }
          track.addEventListener('modechange', Fn.bind(this, function() {
            this.trigger('change');
          }));
          this.tracks_.push(track);
          this.trigger({
            type: 'addtrack',
            track: track
          });
        };
        TextTrackList.prototype.removeTrack_ = function(rtrack) {
          var track = undefined;
          for (var i = 0,
              l = this.length; i < l; i++) {
            if (this[i] === rtrack) {
              track = this[i];
              if (track.off) {
                track.off();
              }
              this.tracks_.splice(i, 1);
              break;
            }
          }
          if (!track) {
            return;
          }
          this.trigger({
            type: 'removetrack',
            track: track
          });
        };
        TextTrackList.prototype.getTrackById = function(id) {
          var result = null;
          for (var i = 0,
              l = this.length; i < l; i++) {
            var track = this[i];
            if (track.id === id) {
              result = track;
              break;
            }
          }
          return result;
        };
        exports['default'] = TextTrackList;
        module.exports = exports['default'];
      }, {
        "../event-target": 98,
        "../utils/browser.js": 128,
        "../utils/fn.js": 133,
        "global/document": 1
      }],
      126: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
          }
          subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }});
          if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var _component = _dereq_('../component');
        var _component2 = _interopRequireDefault(_component);
        var _utilsEventsJs = _dereq_('../utils/events.js');
        var Events = _interopRequireWildcard(_utilsEventsJs);
        var _utilsFnJs = _dereq_('../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsLogJs = _dereq_('../utils/log.js');
        var _utilsLogJs2 = _interopRequireDefault(_utilsLogJs);
        var _safeJsonParseTuple = _dereq_('safe-json-parse/tuple');
        var _safeJsonParseTuple2 = _interopRequireDefault(_safeJsonParseTuple);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var TextTrackSettings = (function(_Component) {
          _inherits(TextTrackSettings, _Component);
          function TextTrackSettings(player, options) {
            _classCallCheck(this, TextTrackSettings);
            _Component.call(this, player, options);
            this.hide();
            if (options.persistTextTrackSettings === undefined) {
              this.options_.persistTextTrackSettings = this.options_.playerOptions.persistTextTrackSettings;
            }
            Events.on(this.$('.vjs-done-button'), 'click', Fn.bind(this, function() {
              this.saveSettings();
              this.hide();
            }));
            Events.on(this.$('.vjs-default-button'), 'click', Fn.bind(this, function() {
              this.$('.vjs-fg-color > select').selectedIndex = 0;
              this.$('.vjs-bg-color > select').selectedIndex = 0;
              this.$('.window-color > select').selectedIndex = 0;
              this.$('.vjs-text-opacity > select').selectedIndex = 0;
              this.$('.vjs-bg-opacity > select').selectedIndex = 0;
              this.$('.vjs-window-opacity > select').selectedIndex = 0;
              this.$('.vjs-edge-style select').selectedIndex = 0;
              this.$('.vjs-font-family select').selectedIndex = 0;
              this.$('.vjs-font-percent select').selectedIndex = 2;
              this.updateDisplay();
            }));
            Events.on(this.$('.vjs-fg-color > select'), 'change', Fn.bind(this, this.updateDisplay));
            Events.on(this.$('.vjs-bg-color > select'), 'change', Fn.bind(this, this.updateDisplay));
            Events.on(this.$('.window-color > select'), 'change', Fn.bind(this, this.updateDisplay));
            Events.on(this.$('.vjs-text-opacity > select'), 'change', Fn.bind(this, this.updateDisplay));
            Events.on(this.$('.vjs-bg-opacity > select'), 'change', Fn.bind(this, this.updateDisplay));
            Events.on(this.$('.vjs-window-opacity > select'), 'change', Fn.bind(this, this.updateDisplay));
            Events.on(this.$('.vjs-font-percent select'), 'change', Fn.bind(this, this.updateDisplay));
            Events.on(this.$('.vjs-edge-style select'), 'change', Fn.bind(this, this.updateDisplay));
            Events.on(this.$('.vjs-font-family select'), 'change', Fn.bind(this, this.updateDisplay));
            if (this.options_.persistTextTrackSettings) {
              this.restoreSettings();
            }
          }
          TextTrackSettings.prototype.createEl = function createEl() {
            return _Component.prototype.createEl.call(this, 'div', {
              className: 'vjs-caption-settings vjs-modal-overlay',
              innerHTML: captionOptionsMenuTemplate()
            });
          };
          TextTrackSettings.prototype.getValues = function getValues() {
            var textEdge = getSelectedOptionValue(this.$('.vjs-edge-style select'));
            var fontFamily = getSelectedOptionValue(this.$('.vjs-font-family select'));
            var fgColor = getSelectedOptionValue(this.$('.vjs-fg-color > select'));
            var textOpacity = getSelectedOptionValue(this.$('.vjs-text-opacity > select'));
            var bgColor = getSelectedOptionValue(this.$('.vjs-bg-color > select'));
            var bgOpacity = getSelectedOptionValue(this.$('.vjs-bg-opacity > select'));
            var windowColor = getSelectedOptionValue(this.$('.window-color > select'));
            var windowOpacity = getSelectedOptionValue(this.$('.vjs-window-opacity > select'));
            var fontPercent = _globalWindow2['default']['parseFloat'](getSelectedOptionValue(this.$('.vjs-font-percent > select')));
            var result = {
              'backgroundOpacity': bgOpacity,
              'textOpacity': textOpacity,
              'windowOpacity': windowOpacity,
              'edgeStyle': textEdge,
              'fontFamily': fontFamily,
              'color': fgColor,
              'backgroundColor': bgColor,
              'windowColor': windowColor,
              'fontPercent': fontPercent
            };
            for (var _name in result) {
              if (result[_name] === '' || result[_name] === 'none' || _name === 'fontPercent' && result[_name] === 1.00) {
                delete result[_name];
              }
            }
            return result;
          };
          TextTrackSettings.prototype.setValues = function setValues(values) {
            setSelectedOption(this.$('.vjs-edge-style select'), values.edgeStyle);
            setSelectedOption(this.$('.vjs-font-family select'), values.fontFamily);
            setSelectedOption(this.$('.vjs-fg-color > select'), values.color);
            setSelectedOption(this.$('.vjs-text-opacity > select'), values.textOpacity);
            setSelectedOption(this.$('.vjs-bg-color > select'), values.backgroundColor);
            setSelectedOption(this.$('.vjs-bg-opacity > select'), values.backgroundOpacity);
            setSelectedOption(this.$('.window-color > select'), values.windowColor);
            setSelectedOption(this.$('.vjs-window-opacity > select'), values.windowOpacity);
            var fontPercent = values.fontPercent;
            if (fontPercent) {
              fontPercent = fontPercent.toFixed(2);
            }
            setSelectedOption(this.$('.vjs-font-percent > select'), fontPercent);
          };
          TextTrackSettings.prototype.restoreSettings = function restoreSettings() {
            var _safeParseTuple = _safeJsonParseTuple2['default'](_globalWindow2['default'].localStorage.getItem('vjs-text-track-settings'));
            var err = _safeParseTuple[0];
            var values = _safeParseTuple[1];
            if (err) {
              _utilsLogJs2['default'].error(err);
            }
            if (values) {
              this.setValues(values);
            }
          };
          TextTrackSettings.prototype.saveSettings = function saveSettings() {
            if (!this.options_.persistTextTrackSettings) {
              return;
            }
            var values = this.getValues();
            try {
              if (Object.getOwnPropertyNames(values).length > 0) {
                _globalWindow2['default'].localStorage.setItem('vjs-text-track-settings', JSON.stringify(values));
              } else {
                _globalWindow2['default'].localStorage.removeItem('vjs-text-track-settings');
              }
            } catch (e) {}
          };
          TextTrackSettings.prototype.updateDisplay = function updateDisplay() {
            var ttDisplay = this.player_.getChild('textTrackDisplay');
            if (ttDisplay) {
              ttDisplay.updateDisplay();
            }
          };
          return TextTrackSettings;
        })(_component2['default']);
        _component2['default'].registerComponent('TextTrackSettings', TextTrackSettings);
        function getSelectedOptionValue(target) {
          var selectedOption = undefined;
          if (target.selectedOptions) {
            selectedOption = target.selectedOptions[0];
          } else if (target.options) {
            selectedOption = target.options[target.options.selectedIndex];
          }
          return selectedOption.value;
        }
        function setSelectedOption(target, value) {
          if (!value) {
            return;
          }
          var i = undefined;
          for (i = 0; i < target.options.length; i++) {
            var option = target.options[i];
            if (option.value === value) {
              break;
            }
          }
          target.selectedIndex = i;
        }
        function captionOptionsMenuTemplate() {
          var template = '<div class="vjs-tracksettings">\n      <div class="vjs-tracksettings-colors">\n        <div class="vjs-fg-color vjs-tracksetting">\n            <label class="vjs-label">Foreground</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-text-opacity vjs-opacity">\n              <select>\n                <option value="">---</option>\n                <option value="1">Opaque</option>\n                <option value="0.5">Semi-Opaque</option>\n              </select>\n            </span>\n        </div> <!-- vjs-fg-color -->\n        <div class="vjs-bg-color vjs-tracksetting">\n            <label class="vjs-label">Background</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-bg-opacity vjs-opacity">\n                <select>\n                  <option value="">---</option>\n                  <option value="1">Opaque</option>\n                  <option value="0.5">Semi-Transparent</option>\n                  <option value="0">Transparent</option>\n                </select>\n            </span>\n        </div> <!-- vjs-bg-color -->\n        <div class="window-color vjs-tracksetting">\n            <label class="vjs-label">Window</label>\n            <select>\n              <option value="">---</option>\n              <option value="#FFF">White</option>\n              <option value="#000">Black</option>\n              <option value="#F00">Red</option>\n              <option value="#0F0">Green</option>\n              <option value="#00F">Blue</option>\n              <option value="#FF0">Yellow</option>\n              <option value="#F0F">Magenta</option>\n              <option value="#0FF">Cyan</option>\n            </select>\n            <span class="vjs-window-opacity vjs-opacity">\n                <select>\n                  <option value="">---</option>\n                  <option value="1">Opaque</option>\n                  <option value="0.5">Semi-Transparent</option>\n                  <option value="0">Transparent</option>\n                </select>\n            </span>\n        </div> <!-- vjs-window-color -->\n      </div> <!-- vjs-tracksettings -->\n      <div class="vjs-tracksettings-font">\n        <div class="vjs-font-percent vjs-tracksetting">\n          <label class="vjs-label">Font Size</label>\n          <select>\n            <option value="0.50">50%</option>\n            <option value="0.75">75%</option>\n            <option value="1.00" selected>100%</option>\n            <option value="1.25">125%</option>\n            <option value="1.50">150%</option>\n            <option value="1.75">175%</option>\n            <option value="2.00">200%</option>\n            <option value="3.00">300%</option>\n            <option value="4.00">400%</option>\n          </select>\n        </div> <!-- vjs-font-percent -->\n        <div class="vjs-edge-style vjs-tracksetting">\n          <label class="vjs-label">Text Edge Style</label>\n          <select>\n            <option value="none">None</option>\n            <option value="raised">Raised</option>\n            <option value="depressed">Depressed</option>\n            <option value="uniform">Uniform</option>\n            <option value="dropshadow">Dropshadow</option>\n          </select>\n        </div> <!-- vjs-edge-style -->\n        <div class="vjs-font-family vjs-tracksetting">\n          <label class="vjs-label">Font Family</label>\n          <select>\n            <option value="">Default</option>\n            <option value="monospaceSerif">Monospace Serif</option>\n            <option value="proportionalSerif">Proportional Serif</option>\n            <option value="monospaceSansSerif">Monospace Sans-Serif</option>\n            <option value="proportionalSansSerif">Proportional Sans-Serif</option>\n            <option value="casual">Casual</option>\n            <option value="script">Script</option>\n            <option value="small-caps">Small Caps</option>\n          </select>\n        </div> <!-- vjs-font-family -->\n      </div>\n    </div>\n    <div class="vjs-tracksettings-controls">\n      <button class="vjs-default-button">Defaults</button>\n      <button class="vjs-done-button">Done</button>\n    </div>';
          return template;
        }
        exports['default'] = TextTrackSettings;
        module.exports = exports['default'];
      }, {
        "../component": 66,
        "../utils/events.js": 132,
        "../utils/fn.js": 133,
        "../utils/log.js": 136,
        "global/window": 2,
        "safe-json-parse/tuple": 53
      }],
      127: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _textTrackCueList = _dereq_('./text-track-cue-list');
        var _textTrackCueList2 = _interopRequireDefault(_textTrackCueList);
        var _utilsFnJs = _dereq_('../utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _utilsGuidJs = _dereq_('../utils/guid.js');
        var Guid = _interopRequireWildcard(_utilsGuidJs);
        var _utilsBrowserJs = _dereq_('../utils/browser.js');
        var browser = _interopRequireWildcard(_utilsBrowserJs);
        var _textTrackEnums = _dereq_('./text-track-enums');
        var TextTrackEnum = _interopRequireWildcard(_textTrackEnums);
        var _utilsLogJs = _dereq_('../utils/log.js');
        var _utilsLogJs2 = _interopRequireDefault(_utilsLogJs);
        var _eventTarget = _dereq_('../event-target');
        var _eventTarget2 = _interopRequireDefault(_eventTarget);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var _utilsUrlJs = _dereq_('../utils/url.js');
        var _xhr = _dereq_('xhr');
        var _xhr2 = _interopRequireDefault(_xhr);
        function TextTrack() {
          var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
          if (!options.tech) {
            throw new Error('A tech was not provided.');
          }
          var tt = this;
          if (browser.IS_IE8) {
            tt = _globalDocument2['default'].createElement('custom');
            for (var prop in TextTrack.prototype) {
              if (prop !== 'constructor') {
                tt[prop] = TextTrack.prototype[prop];
              }
            }
          }
          tt.tech_ = options.tech;
          var mode = TextTrackEnum.TextTrackMode[options['mode']] || 'disabled';
          var kind = TextTrackEnum.TextTrackKind[options['kind']] || 'subtitles';
          var label = options['label'] || '';
          var language = options['language'] || options['srclang'] || '';
          var id = options['id'] || 'vjs_text_track_' + Guid.newGUID();
          if (kind === 'metadata' || kind === 'chapters') {
            mode = 'hidden';
          }
          tt.cues_ = [];
          tt.activeCues_ = [];
          var cues = new _textTrackCueList2['default'](tt.cues_);
          var activeCues = new _textTrackCueList2['default'](tt.activeCues_);
          var changed = false;
          var timeupdateHandler = Fn.bind(tt, function() {
            this['activeCues'];
            if (changed) {
              this['trigger']('cuechange');
              changed = false;
            }
          });
          if (mode !== 'disabled') {
            tt.tech_.on('timeupdate', timeupdateHandler);
          }
          Object.defineProperty(tt, 'kind', {
            get: function get() {
              return kind;
            },
            set: Function.prototype
          });
          Object.defineProperty(tt, 'label', {
            get: function get() {
              return label;
            },
            set: Function.prototype
          });
          Object.defineProperty(tt, 'language', {
            get: function get() {
              return language;
            },
            set: Function.prototype
          });
          Object.defineProperty(tt, 'id', {
            get: function get() {
              return id;
            },
            set: Function.prototype
          });
          Object.defineProperty(tt, 'mode', {
            get: function get() {
              return mode;
            },
            set: function set(newMode) {
              if (!TextTrackEnum.TextTrackMode[newMode]) {
                return;
              }
              mode = newMode;
              if (mode === 'showing') {
                this.tech_.on('timeupdate', timeupdateHandler);
              }
              this.trigger('modechange');
            }
          });
          Object.defineProperty(tt, 'cues', {
            get: function get() {
              if (!this.loaded_) {
                return null;
              }
              return cues;
            },
            set: Function.prototype
          });
          Object.defineProperty(tt, 'activeCues', {
            get: function get() {
              if (!this.loaded_) {
                return null;
              }
              if (this['cues'].length === 0) {
                return activeCues;
              }
              var ct = this.tech_.currentTime();
              var active = [];
              for (var i = 0,
                  l = this['cues'].length; i < l; i++) {
                var cue = this['cues'][i];
                if (cue['startTime'] <= ct && cue['endTime'] >= ct) {
                  active.push(cue);
                } else if (cue['startTime'] === cue['endTime'] && cue['startTime'] <= ct && cue['startTime'] + 0.5 >= ct) {
                  active.push(cue);
                }
              }
              changed = false;
              if (active.length !== this.activeCues_.length) {
                changed = true;
              } else {
                for (var i = 0; i < active.length; i++) {
                  if (indexOf.call(this.activeCues_, active[i]) === -1) {
                    changed = true;
                  }
                }
              }
              this.activeCues_ = active;
              activeCues.setCues_(this.activeCues_);
              return activeCues;
            },
            set: Function.prototype
          });
          if (options.src) {
            tt.src = options.src;
            loadTrack(options.src, tt);
          } else {
            tt.loaded_ = true;
          }
          if (browser.IS_IE8) {
            return tt;
          }
        }
        TextTrack.prototype = Object.create(_eventTarget2['default'].prototype);
        TextTrack.prototype.constructor = TextTrack;
        TextTrack.prototype.allowedEvents_ = {'cuechange': 'cuechange'};
        TextTrack.prototype.addCue = function(cue) {
          var tracks = this.tech_.textTracks();
          if (tracks) {
            for (var i = 0; i < tracks.length; i++) {
              if (tracks[i] !== this) {
                tracks[i].removeCue(cue);
              }
            }
          }
          this.cues_.push(cue);
          this['cues'].setCues_(this.cues_);
        };
        TextTrack.prototype.removeCue = function(removeCue) {
          var removed = false;
          for (var i = 0,
              l = this.cues_.length; i < l; i++) {
            var cue = this.cues_[i];
            if (cue === removeCue) {
              this.cues_.splice(i, 1);
              removed = true;
            }
          }
          if (removed) {
            this.cues.setCues_(this.cues_);
          }
        };
        var parseCues = function parseCues(srcContent, track) {
          var parser = new _globalWindow2['default'].WebVTT.Parser(_globalWindow2['default'], _globalWindow2['default'].vttjs, _globalWindow2['default'].WebVTT.StringDecoder());
          parser.oncue = function(cue) {
            track.addCue(cue);
          };
          parser.onparsingerror = function(error) {
            _utilsLogJs2['default'].error(error);
          };
          parser.onflush = function() {
            track.trigger({
              type: 'loadeddata',
              target: track
            });
          };
          parser.parse(srcContent);
          parser.flush();
        };
        var loadTrack = function loadTrack(src, track) {
          var opts = {uri: src};
          var crossOrigin = _utilsUrlJs.isCrossOrigin(src);
          if (crossOrigin) {
            opts.cors = crossOrigin;
          }
          _xhr2['default'](opts, Fn.bind(this, function(err, response, responseBody) {
            if (err) {
              return _utilsLogJs2['default'].error(err, response);
            }
            track.loaded_ = true;
            if (typeof _globalWindow2['default'].WebVTT !== 'function') {
              _globalWindow2['default'].setTimeout(function() {
                parseCues(responseBody, track);
              }, 100);
            } else {
              parseCues(responseBody, track);
            }
          }));
        };
        var indexOf = function indexOf(searchElement, fromIndex) {
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }
          var O = Object(this);
          var len = O.length >>> 0;
          if (len === 0) {
            return -1;
          }
          var n = +fromIndex || 0;
          if (Math.abs(n) === Infinity) {
            n = 0;
          }
          if (n >= len) {
            return -1;
          }
          var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
          while (k < len) {
            if (k in O && O[k] === searchElement) {
              return k;
            }
            k++;
          }
          return -1;
        };
        exports['default'] = TextTrack;
        module.exports = exports['default'];
      }, {
        "../event-target": 98,
        "../utils/browser.js": 128,
        "../utils/fn.js": 133,
        "../utils/guid.js": 135,
        "../utils/log.js": 136,
        "../utils/url.js": 141,
        "./text-track-cue-list": 121,
        "./text-track-enums": 123,
        "global/document": 1,
        "global/window": 2,
        "xhr": 55
      }],
      128: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var USER_AGENT = _globalWindow2['default'].navigator.userAgent;
        var webkitVersionMap = /AppleWebKit\/([\d.]+)/i.exec(USER_AGENT);
        var appleWebkitVersion = webkitVersionMap ? parseFloat(webkitVersionMap.pop()) : null;
        var IS_IPAD = /iPad/i.test(USER_AGENT);
        exports.IS_IPAD = IS_IPAD;
        var IS_IPHONE = /iPhone/i.test(USER_AGENT) && !IS_IPAD;
        exports.IS_IPHONE = IS_IPHONE;
        var IS_IPOD = /iPod/i.test(USER_AGENT);
        exports.IS_IPOD = IS_IPOD;
        var IS_IOS = IS_IPHONE || IS_IPAD || IS_IPOD;
        exports.IS_IOS = IS_IOS;
        var IOS_VERSION = (function() {
          var match = USER_AGENT.match(/OS (\d+)_/i);
          if (match && match[1]) {
            return match[1];
          }
        })();
        exports.IOS_VERSION = IOS_VERSION;
        var IS_ANDROID = /Android/i.test(USER_AGENT);
        exports.IS_ANDROID = IS_ANDROID;
        var ANDROID_VERSION = (function() {
          var match = USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
              major,
              minor;
          if (!match) {
            return null;
          }
          major = match[1] && parseFloat(match[1]);
          minor = match[2] && parseFloat(match[2]);
          if (major && minor) {
            return parseFloat(match[1] + '.' + match[2]);
          } else if (major) {
            return major;
          } else {
            return null;
          }
        })();
        exports.ANDROID_VERSION = ANDROID_VERSION;
        var IS_OLD_ANDROID = IS_ANDROID && /webkit/i.test(USER_AGENT) && ANDROID_VERSION < 2.3;
        exports.IS_OLD_ANDROID = IS_OLD_ANDROID;
        var IS_NATIVE_ANDROID = IS_ANDROID && ANDROID_VERSION < 5 && appleWebkitVersion < 537;
        exports.IS_NATIVE_ANDROID = IS_NATIVE_ANDROID;
        var IS_FIREFOX = /Firefox/i.test(USER_AGENT);
        exports.IS_FIREFOX = IS_FIREFOX;
        var IS_CHROME = /Chrome/i.test(USER_AGENT);
        exports.IS_CHROME = IS_CHROME;
        var IS_IE8 = /MSIE\s8\.0/.test(USER_AGENT);
        exports.IS_IE8 = IS_IE8;
        var TOUCH_ENABLED = !!('ontouchstart' in _globalWindow2['default'] || _globalWindow2['default'].DocumentTouch && _globalDocument2['default'] instanceof _globalWindow2['default'].DocumentTouch);
        exports.TOUCH_ENABLED = TOUCH_ENABLED;
        var BACKGROUND_SIZE_SUPPORTED = ('backgroundSize' in _globalDocument2['default'].createElement('video').style);
        exports.BACKGROUND_SIZE_SUPPORTED = BACKGROUND_SIZE_SUPPORTED;
      }, {
        "global/document": 1,
        "global/window": 2
      }],
      129: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        exports.bufferedPercent = bufferedPercent;
        var _timeRangesJs = _dereq_('./time-ranges.js');
        function bufferedPercent(buffered, duration) {
          var bufferedDuration = 0,
              start,
              end;
          if (!duration) {
            return 0;
          }
          if (!buffered || !buffered.length) {
            buffered = _timeRangesJs.createTimeRange(0, 0);
          }
          for (var i = 0; i < buffered.length; i++) {
            start = buffered.start(i);
            end = buffered.end(i);
            if (end > duration) {
              end = duration;
            }
            bufferedDuration += end - start;
          }
          return bufferedDuration / duration;
        }
      }, {"./time-ranges.js": 139}],
      130: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _logJs = _dereq_('./log.js');
        var _logJs2 = _interopRequireDefault(_logJs);
        var defaultBehaviors = {
          get: function get(obj, key) {
            return obj[key];
          },
          set: function set(obj, key, value) {
            obj[key] = value;
            return true;
          }
        };
        exports['default'] = function(target) {
          var messages = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          if (typeof Proxy === 'function') {
            var _ret = (function() {
              var handler = {};
              Object.keys(messages).forEach(function(key) {
                if (defaultBehaviors.hasOwnProperty(key)) {
                  handler[key] = function() {
                    _logJs2['default'].warn(messages[key]);
                    return defaultBehaviors[key].apply(this, arguments);
                  };
                }
              });
              return {v: new Proxy(target, handler)};
            })();
            if (typeof _ret === 'object')
              return _ret.v;
          }
          return target;
        };
        module.exports = exports['default'];
      }, {"./log.js": 136}],
      131: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        exports.getEl = getEl;
        exports.createEl = createEl;
        exports.textContent = textContent;
        exports.insertElFirst = insertElFirst;
        exports.getElData = getElData;
        exports.hasElData = hasElData;
        exports.removeElData = removeElData;
        exports.hasElClass = hasElClass;
        exports.addElClass = addElClass;
        exports.removeElClass = removeElClass;
        exports.toggleElClass = toggleElClass;
        exports.setElAttributes = setElAttributes;
        exports.getElAttributes = getElAttributes;
        exports.blockTextSelection = blockTextSelection;
        exports.unblockTextSelection = unblockTextSelection;
        exports.findElPosition = findElPosition;
        exports.getPointerPosition = getPointerPosition;
        exports.isEl = isEl;
        exports.isTextNode = isTextNode;
        exports.emptyEl = emptyEl;
        exports.normalizeContent = normalizeContent;
        exports.appendContent = appendContent;
        exports.insertContent = insertContent;
        var _templateObject = _taggedTemplateLiteralLoose(['Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ', ' to ', '.'], ['Setting attributes in the second argument of createEl()\n                has been deprecated. Use the third argument instead.\n                createEl(type, properties, attributes). Attempting to set ', ' to ', '.']);
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _taggedTemplateLiteralLoose(strings, raw) {
          strings.raw = raw;
          return strings;
        }
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var _guidJs = _dereq_('./guid.js');
        var Guid = _interopRequireWildcard(_guidJs);
        var _logJs = _dereq_('./log.js');
        var _logJs2 = _interopRequireDefault(_logJs);
        var _tsml = _dereq_('tsml');
        var _tsml2 = _interopRequireDefault(_tsml);
        function isNonBlankString(str) {
          return typeof str === 'string' && /\S/.test(str);
        }
        function throwIfWhitespace(str) {
          if (/\s/.test(str)) {
            throw new Error('class has illegal whitespace characters');
          }
        }
        function classRegExp(className) {
          return new RegExp('(^|\\s)' + className + '($|\\s)');
        }
        function createQuerier(method) {
          return function(selector, context) {
            if (!isNonBlankString(selector)) {
              return _globalDocument2['default'][method](null);
            }
            if (isNonBlankString(context)) {
              context = _globalDocument2['default'].querySelector(context);
            }
            return (isEl(context) ? context : _globalDocument2['default'])[method](selector);
          };
        }
        function getEl(id) {
          if (id.indexOf('#') === 0) {
            id = id.slice(1);
          }
          return _globalDocument2['default'].getElementById(id);
        }
        function createEl() {
          var tagName = arguments.length <= 0 || arguments[0] === undefined ? 'div' : arguments[0];
          var properties = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
          var attributes = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
          var el = _globalDocument2['default'].createElement(tagName);
          Object.getOwnPropertyNames(properties).forEach(function(propName) {
            var val = properties[propName];
            if (propName.indexOf('aria-') !== -1 || propName === 'role' || propName === 'type') {
              _logJs2['default'].warn(_tsml2['default'](_templateObject, propName, val));
              el.setAttribute(propName, val);
            } else {
              el[propName] = val;
            }
          });
          Object.getOwnPropertyNames(attributes).forEach(function(attrName) {
            var val = attributes[attrName];
            el.setAttribute(attrName, attributes[attrName]);
          });
          return el;
        }
        function textContent(el, text) {
          if (typeof el.textContent === 'undefined') {
            el.innerText = text;
          } else {
            el.textContent = text;
          }
        }
        function insertElFirst(child, parent) {
          if (parent.firstChild) {
            parent.insertBefore(child, parent.firstChild);
          } else {
            parent.appendChild(child);
          }
        }
        var elData = {};
        var elIdAttr = 'vdata' + new Date().getTime();
        function getElData(el) {
          var id = el[elIdAttr];
          if (!id) {
            id = el[elIdAttr] = Guid.newGUID();
          }
          if (!elData[id]) {
            elData[id] = {};
          }
          return elData[id];
        }
        function hasElData(el) {
          var id = el[elIdAttr];
          if (!id) {
            return false;
          }
          return !!Object.getOwnPropertyNames(elData[id]).length;
        }
        function removeElData(el) {
          var id = el[elIdAttr];
          if (!id) {
            return;
          }
          delete elData[id];
          try {
            delete el[elIdAttr];
          } catch (e) {
            if (el.removeAttribute) {
              el.removeAttribute(elIdAttr);
            } else {
              el[elIdAttr] = null;
            }
          }
        }
        function hasElClass(element, classToCheck) {
          if (element.classList) {
            return element.classList.contains(classToCheck);
          } else {
            throwIfWhitespace(classToCheck);
            return classRegExp(classToCheck).test(element.className);
          }
        }
        function addElClass(element, classToAdd) {
          if (element.classList) {
            element.classList.add(classToAdd);
          } else if (!hasElClass(element, classToAdd)) {
            element.className = (element.className + ' ' + classToAdd).trim();
          }
          return element;
        }
        function removeElClass(element, classToRemove) {
          if (element.classList) {
            element.classList.remove(classToRemove);
          } else {
            throwIfWhitespace(classToRemove);
            element.className = element.className.split(/\s+/).filter(function(c) {
              return c !== classToRemove;
            }).join(' ');
          }
          return element;
        }
        function toggleElClass(element, classToToggle, predicate) {
          var has = hasElClass(element, classToToggle);
          if (typeof predicate === 'function') {
            predicate = predicate(element, classToToggle);
          }
          if (typeof predicate !== 'boolean') {
            predicate = !has;
          }
          if (predicate === has) {
            return;
          }
          if (predicate) {
            addElClass(element, classToToggle);
          } else {
            removeElClass(element, classToToggle);
          }
          return element;
        }
        function setElAttributes(el, attributes) {
          Object.getOwnPropertyNames(attributes).forEach(function(attrName) {
            var attrValue = attributes[attrName];
            if (attrValue === null || typeof attrValue === 'undefined' || attrValue === false) {
              el.removeAttribute(attrName);
            } else {
              el.setAttribute(attrName, attrValue === true ? '' : attrValue);
            }
          });
        }
        function getElAttributes(tag) {
          var obj,
              knownBooleans,
              attrs,
              attrName,
              attrVal;
          obj = {};
          knownBooleans = ',' + 'autoplay,controls,loop,muted,default' + ',';
          if (tag && tag.attributes && tag.attributes.length > 0) {
            attrs = tag.attributes;
            for (var i = attrs.length - 1; i >= 0; i--) {
              attrName = attrs[i].name;
              attrVal = attrs[i].value;
              if (typeof tag[attrName] === 'boolean' || knownBooleans.indexOf(',' + attrName + ',') !== -1) {
                attrVal = attrVal !== null ? true : false;
              }
              obj[attrName] = attrVal;
            }
          }
          return obj;
        }
        function blockTextSelection() {
          _globalDocument2['default'].body.focus();
          _globalDocument2['default'].onselectstart = function() {
            return false;
          };
        }
        function unblockTextSelection() {
          _globalDocument2['default'].onselectstart = function() {
            return true;
          };
        }
        function findElPosition(el) {
          var box = undefined;
          if (el.getBoundingClientRect && el.parentNode) {
            box = el.getBoundingClientRect();
          }
          if (!box) {
            return {
              left: 0,
              top: 0
            };
          }
          var docEl = _globalDocument2['default'].documentElement;
          var body = _globalDocument2['default'].body;
          var clientLeft = docEl.clientLeft || body.clientLeft || 0;
          var scrollLeft = _globalWindow2['default'].pageXOffset || body.scrollLeft;
          var left = box.left + scrollLeft - clientLeft;
          var clientTop = docEl.clientTop || body.clientTop || 0;
          var scrollTop = _globalWindow2['default'].pageYOffset || body.scrollTop;
          var top = box.top + scrollTop - clientTop;
          return {
            left: Math.round(left),
            top: Math.round(top)
          };
        }
        function getPointerPosition(el, event) {
          var position = {};
          var box = findElPosition(el);
          var boxW = el.offsetWidth;
          var boxH = el.offsetHeight;
          var boxY = box.top;
          var boxX = box.left;
          var pageY = event.pageY;
          var pageX = event.pageX;
          if (event.changedTouches) {
            pageX = event.changedTouches[0].pageX;
            pageY = event.changedTouches[0].pageY;
          }
          position.y = Math.max(0, Math.min(1, (boxY - pageY + boxH) / boxH));
          position.x = Math.max(0, Math.min(1, (pageX - boxX) / boxW));
          return position;
        }
        function isEl(value) {
          return !!value && typeof value === 'object' && value.nodeType === 1;
        }
        function isTextNode(value) {
          return !!value && typeof value === 'object' && value.nodeType === 3;
        }
        function emptyEl(el) {
          while (el.firstChild) {
            el.removeChild(el.firstChild);
          }
          return el;
        }
        function normalizeContent(content) {
          if (typeof content === 'function') {
            content = content();
          }
          return (Array.isArray(content) ? content : [content]).map(function(value) {
            if (typeof value === 'function') {
              value = value();
            }
            if (isEl(value) || isTextNode(value)) {
              return value;
            }
            if (typeof value === 'string' && /\S/.test(value)) {
              return _globalDocument2['default'].createTextNode(value);
            }
          }).filter(function(value) {
            return value;
          });
        }
        function appendContent(el, content) {
          normalizeContent(content).forEach(function(node) {
            return el.appendChild(node);
          });
          return el;
        }
        function insertContent(el, content) {
          return appendContent(emptyEl(el), content);
        }
        var $ = createQuerier('querySelector');
        exports.$ = $;
        var $$ = createQuerier('querySelectorAll');
        exports.$$ = $$;
      }, {
        "./guid.js": 135,
        "./log.js": 136,
        "global/document": 1,
        "global/window": 2,
        "tsml": 54
      }],
      132: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        exports.on = on;
        exports.off = off;
        exports.trigger = trigger;
        exports.one = one;
        exports.fixEvent = fixEvent;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        var _domJs = _dereq_('./dom.js');
        var Dom = _interopRequireWildcard(_domJs);
        var _guidJs = _dereq_('./guid.js');
        var Guid = _interopRequireWildcard(_guidJs);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        function on(elem, type, fn) {
          if (Array.isArray(type)) {
            return _handleMultipleEvents(on, elem, type, fn);
          }
          var data = Dom.getElData(elem);
          if (!data.handlers)
            data.handlers = {};
          if (!data.handlers[type])
            data.handlers[type] = [];
          if (!fn.guid)
            fn.guid = Guid.newGUID();
          data.handlers[type].push(fn);
          if (!data.dispatcher) {
            data.disabled = false;
            data.dispatcher = function(event, hash) {
              if (data.disabled)
                return;
              event = fixEvent(event);
              var handlers = data.handlers[event.type];
              if (handlers) {
                var handlersCopy = handlers.slice(0);
                for (var m = 0,
                    n = handlersCopy.length; m < n; m++) {
                  if (event.isImmediatePropagationStopped()) {
                    break;
                  } else {
                    handlersCopy[m].call(elem, event, hash);
                  }
                }
              }
            };
          }
          if (data.handlers[type].length === 1) {
            if (elem.addEventListener) {
              elem.addEventListener(type, data.dispatcher, false);
            } else if (elem.attachEvent) {
              elem.attachEvent('on' + type, data.dispatcher);
            }
          }
        }
        function off(elem, type, fn) {
          if (!Dom.hasElData(elem))
            return;
          var data = Dom.getElData(elem);
          if (!data.handlers) {
            return;
          }
          if (Array.isArray(type)) {
            return _handleMultipleEvents(off, elem, type, fn);
          }
          var removeType = function removeType(t) {
            data.handlers[t] = [];
            _cleanUpEvents(elem, t);
          };
          if (!type) {
            for (var t in data.handlers) {
              removeType(t);
            }
            return;
          }
          var handlers = data.handlers[type];
          if (!handlers)
            return;
          if (!fn) {
            removeType(type);
            return;
          }
          if (fn.guid) {
            for (var n = 0; n < handlers.length; n++) {
              if (handlers[n].guid === fn.guid) {
                handlers.splice(n--, 1);
              }
            }
          }
          _cleanUpEvents(elem, type);
        }
        function trigger(elem, event, hash) {
          var elemData = Dom.hasElData(elem) ? Dom.getElData(elem) : {};
          var parent = elem.parentNode || elem.ownerDocument;
          if (typeof event === 'string') {
            event = {
              type: event,
              target: elem
            };
          }
          event = fixEvent(event);
          if (elemData.dispatcher) {
            elemData.dispatcher.call(elem, event, hash);
          }
          if (parent && !event.isPropagationStopped() && event.bubbles === true) {
            trigger.call(null, parent, event, hash);
          } else if (!parent && !event.defaultPrevented) {
            var targetData = Dom.getElData(event.target);
            if (event.target[event.type]) {
              targetData.disabled = true;
              if (typeof event.target[event.type] === 'function') {
                event.target[event.type]();
              }
              targetData.disabled = false;
            }
          }
          return !event.defaultPrevented;
        }
        function one(elem, type, fn) {
          if (Array.isArray(type)) {
            return _handleMultipleEvents(one, elem, type, fn);
          }
          var func = function func() {
            off(elem, type, func);
            fn.apply(this, arguments);
          };
          func.guid = fn.guid = fn.guid || Guid.newGUID();
          on(elem, type, func);
        }
        function fixEvent(event) {
          function returnTrue() {
            return true;
          }
          function returnFalse() {
            return false;
          }
          if (!event || !event.isPropagationStopped) {
            var old = event || _globalWindow2['default'].event;
            event = {};
            for (var key in old) {
              if (key !== 'layerX' && key !== 'layerY' && key !== 'keyLocation' && key !== 'webkitMovementX' && key !== 'webkitMovementY') {
                if (!(key === 'returnValue' && old.preventDefault)) {
                  event[key] = old[key];
                }
              }
            }
            if (!event.target) {
              event.target = event.srcElement || _globalDocument2['default'];
            }
            if (!event.relatedTarget) {
              event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
            }
            event.preventDefault = function() {
              if (old.preventDefault) {
                old.preventDefault();
              }
              event.returnValue = false;
              old.returnValue = false;
              event.defaultPrevented = true;
            };
            event.defaultPrevented = false;
            event.stopPropagation = function() {
              if (old.stopPropagation) {
                old.stopPropagation();
              }
              event.cancelBubble = true;
              old.cancelBubble = true;
              event.isPropagationStopped = returnTrue;
            };
            event.isPropagationStopped = returnFalse;
            event.stopImmediatePropagation = function() {
              if (old.stopImmediatePropagation) {
                old.stopImmediatePropagation();
              }
              event.isImmediatePropagationStopped = returnTrue;
              event.stopPropagation();
            };
            event.isImmediatePropagationStopped = returnFalse;
            if (event.clientX != null) {
              var doc = _globalDocument2['default'].documentElement,
                  body = _globalDocument2['default'].body;
              event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
              event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
            }
            event.which = event.charCode || event.keyCode;
            if (event.button != null) {
              event.button = event.button & 1 ? 0 : event.button & 4 ? 1 : event.button & 2 ? 2 : 0;
            }
          }
          return event;
        }
        function _cleanUpEvents(elem, type) {
          var data = Dom.getElData(elem);
          if (data.handlers[type].length === 0) {
            delete data.handlers[type];
            if (elem.removeEventListener) {
              elem.removeEventListener(type, data.dispatcher, false);
            } else if (elem.detachEvent) {
              elem.detachEvent('on' + type, data.dispatcher);
            }
          }
          if (Object.getOwnPropertyNames(data.handlers).length <= 0) {
            delete data.handlers;
            delete data.dispatcher;
            delete data.disabled;
          }
          if (Object.getOwnPropertyNames(data).length === 0) {
            Dom.removeElData(elem);
          }
        }
        function _handleMultipleEvents(fn, elem, types, callback) {
          types.forEach(function(type) {
            fn(elem, type, callback);
          });
        }
      }, {
        "./dom.js": 131,
        "./guid.js": 135,
        "global/document": 1,
        "global/window": 2
      }],
      133: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        var _guidJs = _dereq_('./guid.js');
        var bind = function bind(context, fn, uid) {
          if (!fn.guid) {
            fn.guid = _guidJs.newGUID();
          }
          var ret = function ret() {
            return fn.apply(context, arguments);
          };
          ret.guid = uid ? uid + '_' + fn.guid : fn.guid;
          return ret;
        };
        exports.bind = bind;
      }, {"./guid.js": 135}],
      134: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function formatTime(seconds) {
          var guide = arguments.length <= 1 || arguments[1] === undefined ? seconds : arguments[1];
          return (function() {
            seconds = seconds < 0 ? 0 : seconds;
            var s = Math.floor(seconds % 60);
            var m = Math.floor(seconds / 60 % 60);
            var h = Math.floor(seconds / 3600);
            var gm = Math.floor(guide / 60 % 60);
            var gh = Math.floor(guide / 3600);
            if (isNaN(seconds) || seconds === Infinity) {
              h = m = s = '-';
            }
            h = h > 0 || gh > 0 ? h + ':' : '';
            m = ((h || gm >= 10) && m < 10 ? '0' + m : m) + ':';
            s = s < 10 ? '0' + s : s;
            return h + m + s;
          })();
        }
        exports['default'] = formatTime;
        module.exports = exports['default'];
      }, {}],
      135: [function(_dereq_, module, exports) {
        "use strict";
        exports.__esModule = true;
        exports.newGUID = newGUID;
        var _guid = 1;
        function newGUID() {
          return _guid++;
        }
      }, {}],
      136: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var log = function log() {
          _logType(null, arguments);
        };
        log.history = [];
        log.error = function() {
          _logType('error', arguments);
        };
        log.warn = function() {
          _logType('warn', arguments);
        };
        function _logType(type, args) {
          var argsArray = Array.prototype.slice.call(args);
          var noop = function noop() {};
          var console = _globalWindow2['default']['console'] || {
            'log': noop,
            'warn': noop,
            'error': noop
          };
          if (type) {
            argsArray.unshift(type.toUpperCase() + ':');
          } else {
            type = 'log';
          }
          log.history.push(argsArray);
          argsArray.unshift('VIDEOJS:');
          if (console[type].apply) {
            console[type].apply(console, argsArray);
          } else {
            console[type](argsArray.join(' '));
          }
        }
        exports['default'] = log;
        module.exports = exports['default'];
      }, {"global/window": 2}],
      137: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        exports['default'] = mergeOptions;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _lodashCompatObjectMerge = _dereq_('lodash-compat/object/merge');
        var _lodashCompatObjectMerge2 = _interopRequireDefault(_lodashCompatObjectMerge);
        function isPlain(obj) {
          return !!obj && typeof obj === 'object' && obj.toString() === '[object Object]' && obj.constructor === Object;
        }
        var customizer = function customizer(destination, source) {
          if (!isPlain(source)) {
            return source;
          }
          if (!isPlain(destination)) {
            return mergeOptions(source);
          }
        };
        function mergeOptions() {
          var args = Array.prototype.slice.call(arguments);
          args.unshift({});
          args.push(customizer);
          _lodashCompatObjectMerge2['default'].apply(null, args);
          return args[0];
        }
        module.exports = exports['default'];
      }, {"lodash-compat/object/merge": 40}],
      138: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var createStyleElement = function createStyleElement(className) {
          var style = _globalDocument2['default'].createElement('style');
          style.className = className;
          return style;
        };
        exports.createStyleElement = createStyleElement;
        var setTextContent = function setTextContent(el, content) {
          if (el.styleSheet) {
            el.styleSheet.cssText = content;
          } else {
            el.textContent = content;
          }
        };
        exports.setTextContent = setTextContent;
      }, {"global/document": 1}],
      139: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        exports.createTimeRanges = createTimeRanges;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _logJs = _dereq_('./log.js');
        var _logJs2 = _interopRequireDefault(_logJs);
        function createTimeRanges(start, end) {
          if (Array.isArray(start)) {
            return createTimeRangesObj(start);
          } else if (start === undefined || end === undefined) {
            return createTimeRangesObj();
          }
          return createTimeRangesObj([[start, end]]);
        }
        exports.createTimeRange = createTimeRanges;
        function createTimeRangesObj(ranges) {
          if (ranges === undefined || ranges.length === 0) {
            return {
              length: 0,
              start: function start() {
                throw new Error('This TimeRanges object is empty');
              },
              end: function end() {
                throw new Error('This TimeRanges object is empty');
              }
            };
          }
          return {
            length: ranges.length,
            start: getRange.bind(null, 'start', 0, ranges),
            end: getRange.bind(null, 'end', 1, ranges)
          };
        }
        function getRange(fnName, valueIndex, ranges, rangeIndex) {
          if (rangeIndex === undefined) {
            _logJs2['default'].warn('DEPRECATED: Function \'' + fnName + '\' on \'TimeRanges\' called without an index argument.');
            rangeIndex = 0;
          }
          rangeCheck(fnName, rangeIndex, ranges.length - 1);
          return ranges[rangeIndex][valueIndex];
        }
        function rangeCheck(fnName, index, maxIndex) {
          if (index < 0 || index > maxIndex) {
            throw new Error('Failed to execute \'' + fnName + '\' on \'TimeRanges\': The index provided (' + index + ') is greater than or equal to the maximum bound (' + maxIndex + ').');
          }
        }
      }, {"./log.js": 136}],
      140: [function(_dereq_, module, exports) {
        "use strict";
        exports.__esModule = true;
        function toTitleCase(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
        exports["default"] = toTitleCase;
        module.exports = exports["default"];
      }, {}],
      141: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _globalWindow = _dereq_('global/window');
        var _globalWindow2 = _interopRequireDefault(_globalWindow);
        var parseUrl = function parseUrl(url) {
          var props = ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'host'];
          var a = _globalDocument2['default'].createElement('a');
          a.href = url;
          var addToBody = a.host === '' && a.protocol !== 'file:';
          var div = undefined;
          if (addToBody) {
            div = _globalDocument2['default'].createElement('div');
            div.innerHTML = '<a href="' + url + '"></a>';
            a = div.firstChild;
            div.setAttribute('style', 'display:none; position:absolute;');
            _globalDocument2['default'].body.appendChild(div);
          }
          var details = {};
          for (var i = 0; i < props.length; i++) {
            details[props[i]] = a[props[i]];
          }
          if (details.protocol === 'http:') {
            details.host = details.host.replace(/:80$/, '');
          }
          if (details.protocol === 'https:') {
            details.host = details.host.replace(/:443$/, '');
          }
          if (addToBody) {
            _globalDocument2['default'].body.removeChild(div);
          }
          return details;
        };
        exports.parseUrl = parseUrl;
        var getAbsoluteURL = function getAbsoluteURL(url) {
          if (!url.match(/^https?:\/\//)) {
            var div = _globalDocument2['default'].createElement('div');
            div.innerHTML = '<a href="' + url + '">x</a>';
            url = div.firstChild.href;
          }
          return url;
        };
        exports.getAbsoluteURL = getAbsoluteURL;
        var getFileExtension = function getFileExtension(path) {
          if (typeof path === 'string') {
            var splitPathRe = /^(\/?)([\s\S]*?)((?:\.{1,2}|[^\/]+?)(\.([^\.\/\?]+)))(?:[\/]*|[\?].*)$/i;
            var pathParts = splitPathRe.exec(path);
            if (pathParts) {
              return pathParts.pop().toLowerCase();
            }
          }
          return '';
        };
        exports.getFileExtension = getFileExtension;
        var isCrossOrigin = function isCrossOrigin(url) {
          var winLoc = _globalWindow2['default'].location;
          var urlInfo = parseUrl(url);
          var srcProtocol = urlInfo.protocol === ':' ? winLoc.protocol : urlInfo.protocol;
          var crossOrigin = srcProtocol + urlInfo.host !== winLoc.protocol + winLoc.host;
          return crossOrigin;
        };
        exports.isCrossOrigin = isCrossOrigin;
      }, {
        "global/document": 1,
        "global/window": 2
      }],
      142: [function(_dereq_, module, exports) {
        'use strict';
        exports.__esModule = true;
        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};
            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                  newObj[key] = obj[key];
              }
            }
            newObj['default'] = obj;
            return newObj;
          }
        }
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {'default': obj};
        }
        var _globalDocument = _dereq_('global/document');
        var _globalDocument2 = _interopRequireDefault(_globalDocument);
        var _setup = _dereq_('./setup');
        var setup = _interopRequireWildcard(_setup);
        var _utilsStylesheetJs = _dereq_('./utils/stylesheet.js');
        var stylesheet = _interopRequireWildcard(_utilsStylesheetJs);
        var _component = _dereq_('./component');
        var _component2 = _interopRequireDefault(_component);
        var _eventTarget = _dereq_('./event-target');
        var _eventTarget2 = _interopRequireDefault(_eventTarget);
        var _utilsEventsJs = _dereq_('./utils/events.js');
        var Events = _interopRequireWildcard(_utilsEventsJs);
        var _player = _dereq_('./player');
        var _player2 = _interopRequireDefault(_player);
        var _pluginsJs = _dereq_('./plugins.js');
        var _pluginsJs2 = _interopRequireDefault(_pluginsJs);
        var _srcJsUtilsMergeOptionsJs = _dereq_('../../src/js/utils/merge-options.js');
        var _srcJsUtilsMergeOptionsJs2 = _interopRequireDefault(_srcJsUtilsMergeOptionsJs);
        var _utilsFnJs = _dereq_('./utils/fn.js');
        var Fn = _interopRequireWildcard(_utilsFnJs);
        var _tracksTextTrackJs = _dereq_('./tracks/text-track.js');
        var _tracksTextTrackJs2 = _interopRequireDefault(_tracksTextTrackJs);
        var _objectAssign = _dereq_('object.assign');
        var _objectAssign2 = _interopRequireDefault(_objectAssign);
        var _utilsTimeRangesJs = _dereq_('./utils/time-ranges.js');
        var _utilsFormatTimeJs = _dereq_('./utils/format-time.js');
        var _utilsFormatTimeJs2 = _interopRequireDefault(_utilsFormatTimeJs);
        var _utilsLogJs = _dereq_('./utils/log.js');
        var _utilsLogJs2 = _interopRequireDefault(_utilsLogJs);
        var _utilsDomJs = _dereq_('./utils/dom.js');
        var Dom = _interopRequireWildcard(_utilsDomJs);
        var _utilsBrowserJs = _dereq_('./utils/browser.js');
        var browser = _interopRequireWildcard(_utilsBrowserJs);
        var _utilsUrlJs = _dereq_('./utils/url.js');
        var Url = _interopRequireWildcard(_utilsUrlJs);
        var _extendJs = _dereq_('./extend.js');
        var _extendJs2 = _interopRequireDefault(_extendJs);
        var _lodashCompatObjectMerge = _dereq_('lodash-compat/object/merge');
        var _lodashCompatObjectMerge2 = _interopRequireDefault(_lodashCompatObjectMerge);
        var _utilsCreateDeprecationProxyJs = _dereq_('./utils/create-deprecation-proxy.js');
        var _utilsCreateDeprecationProxyJs2 = _interopRequireDefault(_utilsCreateDeprecationProxyJs);
        var _xhr = _dereq_('xhr');
        var _xhr2 = _interopRequireDefault(_xhr);
        var _techTechJs = _dereq_('./tech/tech.js');
        var _techTechJs2 = _interopRequireDefault(_techTechJs);
        var _techHtml5Js = _dereq_('./tech/html5.js');
        var _techHtml5Js2 = _interopRequireDefault(_techHtml5Js);
        var _techFlashJs = _dereq_('./tech/flash.js');
        var _techFlashJs2 = _interopRequireDefault(_techFlashJs);
        if (typeof HTMLVideoElement === 'undefined') {
          _globalDocument2['default'].createElement('video');
          _globalDocument2['default'].createElement('audio');
          _globalDocument2['default'].createElement('track');
        }
        var videojs = function videojs(id, options, ready) {
          var tag = undefined;
          if (typeof id === 'string') {
            if (id.indexOf('#') === 0) {
              id = id.slice(1);
            }
            if (videojs.getPlayers()[id]) {
              if (options) {
                _utilsLogJs2['default'].warn('Player "' + id + '" is already initialised. Options will not be applied.');
              }
              if (ready) {
                videojs.getPlayers()[id].ready(ready);
              }
              return videojs.getPlayers()[id];
            } else {
              tag = Dom.getEl(id);
            }
          } else {
            tag = id;
          }
          if (!tag || !tag.nodeName) {
            throw new TypeError('The element or ID supplied is not valid. (videojs)');
          }
          return tag['player'] || _player2['default'].players[tag.playerId] || new _player2['default'](tag, options, ready);
        };
        var style = Dom.$('.vjs-styles-defaults');
        if (!style) {
          style = stylesheet.createStyleElement('vjs-styles-defaults');
          var head = Dom.$('head');
          head.insertBefore(style, head.firstChild);
          stylesheet.setTextContent(style, '\n    .video-js {\n      width: 300px;\n      height: 150px;\n    }\n\n    .vjs-fluid {\n      padding-top: 56.25%\n    }\n  ');
        }
        setup.autoSetupTimeout(1, videojs);
        videojs.VERSION = '5.7.1';
        videojs.options = _player2['default'].prototype.options_;
        videojs.getPlayers = function() {
          return _player2['default'].players;
        };
        videojs.players = _utilsCreateDeprecationProxyJs2['default'](_player2['default'].players, {
          get: 'Access to videojs.players is deprecated; use videojs.getPlayers instead',
          set: 'Modification of videojs.players is deprecated'
        });
        videojs.getComponent = _component2['default'].getComponent;
        videojs.registerComponent = function(name, comp) {
          if (_techTechJs2['default'].isTech(comp)) {
            _utilsLogJs2['default'].warn('The ' + name + ' tech was registered as a component. It should instead be registered using videojs.registerTech(name, tech)');
          }
          _component2['default'].registerComponent.call(_component2['default'], name, comp);
        };
        videojs.getTech = _techTechJs2['default'].getTech;
        videojs.registerTech = _techTechJs2['default'].registerTech;
        videojs.browser = browser;
        videojs.TOUCH_ENABLED = browser.TOUCH_ENABLED;
        videojs.extend = _extendJs2['default'];
        videojs.mergeOptions = _srcJsUtilsMergeOptionsJs2['default'];
        videojs.bind = Fn.bind;
        videojs.plugin = _pluginsJs2['default'];
        videojs.addLanguage = function(code, data) {
          var _merge;
          code = ('' + code).toLowerCase();
          return _lodashCompatObjectMerge2['default'](videojs.options.languages, (_merge = {}, _merge[code] = data, _merge))[code];
        };
        videojs.log = _utilsLogJs2['default'];
        videojs.createTimeRange = videojs.createTimeRanges = _utilsTimeRangesJs.createTimeRanges;
        videojs.formatTime = _utilsFormatTimeJs2['default'];
        videojs.parseUrl = Url.parseUrl;
        videojs.isCrossOrigin = Url.isCrossOrigin;
        videojs.EventTarget = _eventTarget2['default'];
        videojs.on = Events.on;
        videojs.one = Events.one;
        videojs.off = Events.off;
        videojs.trigger = Events.trigger;
        videojs.xhr = _xhr2['default'];
        videojs.TextTrack = _tracksTextTrackJs2['default'];
        videojs.isEl = Dom.isEl;
        videojs.isTextNode = Dom.isTextNode;
        videojs.createEl = Dom.createEl;
        videojs.hasClass = Dom.hasElClass;
        videojs.addClass = Dom.addElClass;
        videojs.removeClass = Dom.removeElClass;
        videojs.toggleClass = Dom.toggleElClass;
        videojs.setAttributes = Dom.setElAttributes;
        videojs.getAttributes = Dom.getElAttributes;
        videojs.emptyEl = Dom.emptyEl;
        videojs.appendContent = Dom.appendContent;
        videojs.insertContent = Dom.insertContent;
        if (typeof define === 'function' && define['amd']) {
          define('videojs', [], function() {
            return videojs;
          });
        } else if (typeof exports === 'object' && typeof module === 'object') {
          module['exports'] = videojs;
        }
        exports['default'] = videojs;
        module.exports = exports['default'];
      }, {
        "../../src/js/utils/merge-options.js": 137,
        "./component": 66,
        "./event-target": 98,
        "./extend.js": 99,
        "./player": 107,
        "./plugins.js": 108,
        "./setup": 112,
        "./tech/flash.js": 115,
        "./tech/html5.js": 116,
        "./tech/tech.js": 118,
        "./tracks/text-track.js": 127,
        "./utils/browser.js": 128,
        "./utils/create-deprecation-proxy.js": 130,
        "./utils/dom.js": 131,
        "./utils/events.js": 132,
        "./utils/fn.js": 133,
        "./utils/format-time.js": 134,
        "./utils/log.js": 136,
        "./utils/stylesheet.js": 138,
        "./utils/time-ranges.js": 139,
        "./utils/url.js": 141,
        "global/document": 1,
        "lodash-compat/object/merge": 40,
        "object.assign": 45,
        "xhr": 55
      }]
    }, {}, [142])(142);
  });
})(require('buffer').Buffer, require('process'));
