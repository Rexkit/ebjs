!(function (global, factory) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = factory())
    : "function" == typeof define && define.amd
    ? define(factory)
    : ((global =
        "undefined" != typeof globalThis
          ? globalThis
          : global || self).monaco_loader = factory());
})(this, function () {
  "use strict";
  function _defineProperty(obj, key, value) {
    return (
      key in obj
        ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (obj[key] = value),
      obj
    );
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys(Object(source), !0).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }
  function _arrayLikeToArray(arr, len) {
    (null == len || len > arr.length) && (len = arr.length);
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _defineProperty$1(obj, key, value) {
    return (
      key in obj
        ? Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (obj[key] = value),
      obj
    );
  }
  function ownKeys$1(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2$1(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys$1(Object(source), !0).forEach(function (key) {
            _defineProperty$1(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys$1(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }
  function compose() {
    for (
      var _len = arguments.length, fns = new Array(_len), _key = 0;
      _key < _len;
      _key++
    )
      fns[_key] = arguments[_key];
    return function (x) {
      return fns.reduceRight(function (y, f) {
        return f(y);
      }, x);
    };
  }
  function curry(fn) {
    return function curried() {
      for (
        var _this = this,
          _len2 = arguments.length,
          args = new Array(_len2),
          _key2 = 0;
        _key2 < _len2;
        _key2++
      )
        args[_key2] = arguments[_key2];
      return args.length >= fn.length
        ? fn.apply(this, args)
        : function () {
            for (
              var _len3 = arguments.length,
                nextArgs = new Array(_len3),
                _key3 = 0;
              _key3 < _len3;
              _key3++
            )
              nextArgs[_key3] = arguments[_key3];
            return curried.apply(_this, [].concat(args, nextArgs));
          };
    };
  }
  function isObject(value) {
    return {}.toString.call(value).includes("Object");
  }
  function isFunction(value) {
    return "function" == typeof value;
  }
  var errorHandler = curry(function (errorMessages, type) {
      throw new Error(errorMessages[type] || errorMessages.default);
    })({
      initialIsRequired: "initial state is required",
      initialType: "initial state should be an object",
      initialContent: "initial state shouldn't be an empty object",
      handlerType: "handler should be an object or a function",
      handlersType: "all handlers should be a functions",
      selectorType: "selector should be a function",
      changeType: "provided value of changes should be an object",
      changeField:
        'it seams you want to change a field in the state which is not specified in the "initial" state',
      default: "an unknown error accured in `state-local` package",
    }),
    validators = {
      changes: function (initial, changes) {
        return (
          isObject(changes) || errorHandler("changeType"),
          Object.keys(changes).some(function (field) {
            return (
              (object = initial),
              (property = field),
              !Object.prototype.hasOwnProperty.call(object, property)
            );
            var object, property;
          }) && errorHandler("changeField"),
          changes
        );
      },
      selector: function (selector) {
        isFunction(selector) || errorHandler("selectorType");
      },
      handler: function (handler) {
        isFunction(handler) || isObject(handler) || errorHandler("handlerType"),
          isObject(handler) &&
            Object.values(handler).some(function (_handler) {
              return !isFunction(_handler);
            }) &&
            errorHandler("handlersType");
      },
      initial: function (initial) {
        var obj;
        initial || errorHandler("initialIsRequired"),
          isObject(initial) || errorHandler("initialType"),
          (obj = initial),
          Object.keys(obj).length || errorHandler("initialContent");
      },
    };
  function extractChanges(state, causedChanges) {
    return isFunction(causedChanges)
      ? causedChanges(state.current)
      : causedChanges;
  }
  function updateState(state, changes) {
    return (
      (state.current = _objectSpread2$1(
        _objectSpread2$1({}, state.current),
        changes
      )),
      changes
    );
  }
  function didStateUpdate(state, handler, changes) {
    return (
      isFunction(handler)
        ? handler(state.current)
        : Object.keys(changes).forEach(function (field) {
            var _handler$field;
            return null === (_handler$field = handler[field]) ||
              void 0 === _handler$field
              ? void 0
              : _handler$field.call(handler, state.current[field]);
          }),
      changes
    );
  }
  var index = {
    create: function (initial) {
      var handler =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      validators.initial(initial), validators.handler(handler);
      var state = { current: initial },
        didUpdate = curry(didStateUpdate)(state, handler),
        update = curry(updateState)(state),
        validate = curry(validators.changes)(initial),
        getChanges = curry(extractChanges)(state);
      function getState() {
        var selector =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : function (state) {
                return state;
              };
        return validators.selector(selector), selector(state.current);
      }
      function setState(causedChanges) {
        compose(didUpdate, update, validate, getChanges)(causedChanges);
      }
      return [getState, setState];
    },
  };
  var fn,
    errorMessages$1 = {
      configIsRequired: "the configuration object is required",
      configType: "the configuration object should be an object",
      default: "an unknown error accured in `@monaco-editor/loader` package",
      deprecation:
        "Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  ",
    },
    errorHandler$1 = ((fn = function (errorMessages, type) {
      throw new Error(errorMessages[type] || errorMessages.default);
    }),
    function curried() {
      for (
        var _this = this,
          _len = arguments.length,
          args = new Array(_len),
          _key = 0;
        _key < _len;
        _key++
      )
        args[_key] = arguments[_key];
      return args.length >= fn.length
        ? fn.apply(this, args)
        : function () {
            for (
              var _len2 = arguments.length,
                nextArgs = new Array(_len2),
                _key2 = 0;
              _key2 < _len2;
              _key2++
            )
              nextArgs[_key2] = arguments[_key2];
            return curried.apply(_this, [].concat(args, nextArgs));
          };
    })(errorMessages$1),
    validators$1 = {
      config: function (config) {
        var value;
        return (
          config || errorHandler$1("configIsRequired"),
          (value = config),
          {}.toString.call(value).includes("Object") ||
            errorHandler$1("configType"),
          config.urls
            ? (console.warn(errorMessages$1.deprecation),
              { paths: { vs: config.urls.monacoBase } })
            : config
        );
      },
    };
  function merge(target, source) {
    return (
      Object.keys(source).forEach(function (key) {
        source[key] instanceof Object &&
          target[key] &&
          Object.assign(source[key], merge(target[key], source[key]));
      }),
      _objectSpread2(_objectSpread2({}, target), source)
    );
  }
  var CANCELATION_MESSAGE = {
    type: "cancelation",
    msg: "operation is manually canceled",
  };
  function makeCancelable(promise) {
    var hasCanceled_ = !1,
      wrappedPromise = new Promise(function (resolve, reject) {
        promise.then(function (val) {
          return hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val);
        }),
          promise.catch(reject);
      });
    return (
      (wrappedPromise.cancel = function () {
        return (hasCanceled_ = !0);
      }),
      wrappedPromise
    );
  }
  var arr,
    i,
    _state$create = index.create({
      config: {
        paths: {
          vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.28.1/min/vs",
        },
      },
      isInitialized: !1,
      resolve: null,
      reject: null,
      monaco: null,
    }),
    _state$create2 =
      ((i = 2),
      (function (arr) {
        if (Array.isArray(arr)) return arr;
      })((arr = _state$create)) ||
        (function (arr, i) {
          if ("undefined" != typeof Symbol && Symbol.iterator in Object(arr)) {
            var _arr = [],
              _n = !0,
              _d = !1,
              _e = void 0;
            try {
              for (
                var _s, _i = arr[Symbol.iterator]();
                !(_n = (_s = _i.next()).done) &&
                (_arr.push(_s.value), !i || _arr.length !== i);
                _n = !0
              );
            } catch (err) {
              (_d = !0), (_e = err);
            } finally {
              try {
                _n || null == _i.return || _i.return();
              } finally {
                if (_d) throw _e;
              }
            }
            return _arr;
          }
        })(arr, i) ||
        (function (o, minLen) {
          if (o) {
            if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            return (
              "Object" === n && o.constructor && (n = o.constructor.name),
              "Map" === n || "Set" === n
                ? Array.from(o)
                : "Arguments" === n ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                ? _arrayLikeToArray(o, minLen)
                : void 0
            );
          }
        })(arr, i) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        })()),
    getState = _state$create2[0],
    setState = _state$create2[1];
  function injectScripts(script) {
    return document.body.appendChild(script);
  }
  function getMonacoLoaderScript(configureLoader) {
    var src,
      script,
      state = getState(function (_ref2) {
        return { config: _ref2.config, reject: _ref2.reject };
      }),
      loaderScript =
        ((src = "".concat(state.config.paths.vs, "/loader.js")),
        (script = document.createElement("script")),
        src && (script.src = src),
        script);
    return (
      (loaderScript.onload = function () {
        return configureLoader();
      }),
      (loaderScript.onerror = state.reject),
      loaderScript
    );
  }
  function configureLoader() {
    var state = getState(function (_ref3) {
        return {
          config: _ref3.config,
          resolve: _ref3.resolve,
          reject: _ref3.reject,
        };
      }),
      require = window.require;
    require.config(state.config),
      require(["vs/editor/editor.main"], function (monaco) {
        storeMonacoInstance(monaco), state.resolve(monaco);
      }, function (error) {
        state.reject(error);
      });
  }
  function storeMonacoInstance(monaco) {
    getState().monaco || setState({ monaco: monaco });
  }
  var wrapperPromise = new Promise(function (resolve, reject) {
    return setState({ resolve: resolve, reject: reject });
  });
  return {
    config: function (config) {
      setState(function (state) {
        return { config: merge(state.config, validators$1.config(config)) };
      });
    },
    init: function () {
      if (
        !getState(function (_ref) {
          return { isInitialized: _ref.isInitialized };
        }).isInitialized
      ) {
        if (window.monaco && window.monaco.editor)
          return (
            storeMonacoInstance(window.monaco),
            makeCancelable(Promise.resolve(window.monaco))
          );
        !(function () {
          for (
            var _len = arguments.length, fns = new Array(_len), _key = 0;
            _key < _len;
            _key++
          )
            fns[_key] = arguments[_key];
          return function (x) {
            return fns.reduceRight(function (y, f) {
              return f(y);
            }, x);
          };
        })(
          injectScripts,
          getMonacoLoaderScript
        )(configureLoader),
          setState({ isInitialized: !0 });
      }
      return makeCancelable(wrapperPromise);
    },
    __getMonacoInstance: function () {
      return getState(function (_ref4) {
        return _ref4.monaco;
      });
    },
  };
});
