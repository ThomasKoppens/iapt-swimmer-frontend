import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addQuarters,
  addSeconds,
  addWeeks,
  addYears,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarQuarters,
  differenceInCalendarYears,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  getDate,
  getDay,
  getHours,
  getISOWeek,
  getMinutes,
  getMonth,
  getQuarter,
  getSeconds,
  getTime,
  getYear,
  isAfter,
  isBefore,
  isDate,
  isEqual,
  isSameDay,
  isSameMonth,
  isSameQuarter,
  isSameYear,
  isValid,
  isWithinInterval,
  longFormatters,
  max,
  min,
  parse,
  parseISO,
  set,
  setHours,
  setMinutes,
  setMonth,
  setQuarter,
  setSeconds,
  setYear,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
  toDate
} from "./chunk-RLMYTNEQ.js";
import {
  arrow,
  flip,
  offset,
  useFloating
} from "./chunk-CKWBNR3A.js";
import {
  autoUpdate,
  floor,
  isElement,
  platform
} from "./chunk-CVRCU2N4.js";
import {
  require_react_dom
} from "./chunk-IORIF2SG.js";
import {
  clsx,
  init_clsx
} from "./chunk-MOQSQ2TW.js";
import {
  require_react
} from "./chunk-EOEELKMK.js";
import {
  __toESM
} from "./chunk-LK32TJAX.js";

// node_modules/react-datepicker/dist/es/index.js
init_clsx();
var import_react3 = __toESM(require_react());

// node_modules/react-onclickoutside/dist/react-onclickoutside.es.js
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function isNodeFound(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  }
  if (current.correspondingElement) {
    return current.correspondingElement.classList.contains(ignoreClass);
  }
  return current.classList.contains(ignoreClass);
}
function findHighest(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  }
  while (current.parentNode || current.host) {
    if (current.parentNode && isNodeFound(current, componentNode, ignoreClass)) {
      return true;
    }
    current = current.parentNode || current.host;
  }
  return current;
}
function clickedScrollbar(evt) {
  return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY;
}
var testPassiveEventSupport = function testPassiveEventSupport2() {
  if (typeof window === "undefined" || typeof window.addEventListener !== "function") {
    return;
  }
  var passive = false;
  var options = Object.defineProperty({}, "passive", {
    get: function get() {
      passive = true;
    }
  });
  var noop = function noop2() {
  };
  window.addEventListener("testPassiveEventSupport", noop, options);
  window.removeEventListener("testPassiveEventSupport", noop, options);
  return passive;
};
function autoInc(seed) {
  if (seed === void 0) {
    seed = 0;
  }
  return function() {
    return ++seed;
  };
}
var uid = autoInc();
var passiveEventSupport;
var handlersMap = {};
var enabledInstances = {};
var touchEvents = ["touchstart", "touchmove"];
var IGNORE_CLASS_NAME = "ignore-react-onclickoutside";
function getEventHandlerOptions(instance, eventName) {
  var handlerOptions = {};
  var isTouchEvent = touchEvents.indexOf(eventName) !== -1;
  if (isTouchEvent && passiveEventSupport) {
    handlerOptions.passive = !instance.props.preventDefault;
  }
  return handlerOptions;
}
function onClickOutsideHOC(WrappedComponent, config) {
  var _class, _temp;
  var componentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
  return _temp = _class = function(_Component) {
    _inheritsLoose(onClickOutside, _Component);
    function onClickOutside(props) {
      var _this;
      _this = _Component.call(this, props) || this;
      _this.__outsideClickHandler = function(event) {
        if (typeof _this.__clickOutsideHandlerProp === "function") {
          _this.__clickOutsideHandlerProp(event);
          return;
        }
        var instance = _this.getInstance();
        if (typeof instance.props.handleClickOutside === "function") {
          instance.props.handleClickOutside(event);
          return;
        }
        if (typeof instance.handleClickOutside === "function") {
          instance.handleClickOutside(event);
          return;
        }
        throw new Error("WrappedComponent: " + componentName + " lacks a handleClickOutside(event) function for processing outside click events.");
      };
      _this.__getComponentNode = function() {
        var instance = _this.getInstance();
        if (config && typeof config.setClickOutsideRef === "function") {
          return config.setClickOutsideRef()(instance);
        }
        if (typeof instance.setClickOutsideRef === "function") {
          return instance.setClickOutsideRef();
        }
        return (0, import_react_dom.findDOMNode)(instance);
      };
      _this.enableOnClickOutside = function() {
        if (typeof document === "undefined" || enabledInstances[_this._uid]) {
          return;
        }
        if (typeof passiveEventSupport === "undefined") {
          passiveEventSupport = testPassiveEventSupport();
        }
        enabledInstances[_this._uid] = true;
        var events = _this.props.eventTypes;
        if (!events.forEach) {
          events = [events];
        }
        handlersMap[_this._uid] = function(event) {
          if (_this.componentNode === null) return;
          if (_this.initTimeStamp > event.timeStamp) return;
          if (_this.props.preventDefault) {
            event.preventDefault();
          }
          if (_this.props.stopPropagation) {
            event.stopPropagation();
          }
          if (_this.props.excludeScrollbar && clickedScrollbar(event)) return;
          var current = event.composed && event.composedPath && event.composedPath().shift() || event.target;
          if (findHighest(current, _this.componentNode, _this.props.outsideClickIgnoreClass) !== document) {
            return;
          }
          _this.__outsideClickHandler(event);
        };
        events.forEach(function(eventName) {
          document.addEventListener(eventName, handlersMap[_this._uid], getEventHandlerOptions(_assertThisInitialized(_this), eventName));
        });
      };
      _this.disableOnClickOutside = function() {
        delete enabledInstances[_this._uid];
        var fn = handlersMap[_this._uid];
        if (fn && typeof document !== "undefined") {
          var events = _this.props.eventTypes;
          if (!events.forEach) {
            events = [events];
          }
          events.forEach(function(eventName) {
            return document.removeEventListener(eventName, fn, getEventHandlerOptions(_assertThisInitialized(_this), eventName));
          });
          delete handlersMap[_this._uid];
        }
      };
      _this.getRef = function(ref) {
        return _this.instanceRef = ref;
      };
      _this._uid = uid();
      _this.initTimeStamp = performance.now();
      return _this;
    }
    var _proto = onClickOutside.prototype;
    _proto.getInstance = function getInstance() {
      if (WrappedComponent.prototype && !WrappedComponent.prototype.isReactComponent) {
        return this;
      }
      var ref = this.instanceRef;
      return ref.getInstance ? ref.getInstance() : ref;
    };
    _proto.componentDidMount = function componentDidMount() {
      if (typeof document === "undefined" || !document.createElement) {
        return;
      }
      var instance = this.getInstance();
      if (config && typeof config.handleClickOutside === "function") {
        this.__clickOutsideHandlerProp = config.handleClickOutside(instance);
        if (typeof this.__clickOutsideHandlerProp !== "function") {
          throw new Error("WrappedComponent: " + componentName + " lacks a function for processing outside click events specified by the handleClickOutside config option.");
        }
      }
      this.componentNode = this.__getComponentNode();
      if (this.props.disableOnClickOutside) return;
      this.enableOnClickOutside();
    };
    _proto.componentDidUpdate = function componentDidUpdate() {
      this.componentNode = this.__getComponentNode();
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      this.disableOnClickOutside();
    };
    _proto.render = function render() {
      var _this$props = this.props;
      _this$props.excludeScrollbar;
      var props = _objectWithoutPropertiesLoose(_this$props, ["excludeScrollbar"]);
      if (WrappedComponent.prototype && WrappedComponent.prototype.isReactComponent) {
        props.ref = this.getRef;
      } else {
        props.wrappedRef = this.getRef;
      }
      props.disableOnClickOutside = this.disableOnClickOutside;
      props.enableOnClickOutside = this.enableOnClickOutside;
      return (0, import_react.createElement)(WrappedComponent, props);
    };
    return onClickOutside;
  }(import_react.Component), _class.displayName = "OnClickOutside(" + componentName + ")", _class.defaultProps = {
    eventTypes: ["mousedown", "touchstart"],
    excludeScrollbar: config && config.excludeScrollbar || false,
    outsideClickIgnoreClass: IGNORE_CLASS_NAME,
    preventDefault: false,
    stopPropagation: false
  }, _class.getClass = function() {
    return WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent;
  }, _temp;
}
var react_onclickoutside_es_default = onClickOutsideHOC;

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
var React = __toESM(require_react(), 1);
var import_react2 = __toESM(require_react(), 1);

// node_modules/@floating-ui/react/dist/floating-ui.react.utils.mjs
function getPlatform() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.platform) {
    return uaData.platform;
  }
  return navigator.platform;
}
function isSafari() {
  return /apple/i.test(navigator.vendor);
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

// node_modules/tabbable/dist/index.esm.js
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var focusableCandidateSelector = candidateSelectors.concat("iframe").join(",");

// node_modules/@floating-ui/react/dist/floating-ui.react.mjs
var import_react_dom4 = __toESM(require_react_dom(), 1);
function useMergeRefs(refs) {
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          ref.current = value;
        }
      });
    };
  }, refs);
}
var SafeReact = {
  ...React
};
var useInsertionEffect = SafeReact.useInsertionEffect;
var useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());
function useEffectEvent(callback) {
  const ref = React.useRef(() => {
    if (true) {
      throw new Error("Cannot call an event handler while rendering.");
    }
  });
  useSafeInsertionEffect(() => {
    ref.current = callback;
  });
  return React.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}
var ARROW_UP = "ArrowUp";
var ARROW_DOWN = "ArrowDown";
var ARROW_LEFT = "ArrowLeft";
var ARROW_RIGHT = "ArrowRight";
function isDifferentRow(index2, cols, prevRow) {
  return Math.floor(index2 / cols) !== prevRow;
}
function isIndexOutOfBounds(listRef, index2) {
  return index2 < 0 || index2 >= listRef.current.length;
}
function getMinIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    disabledIndices
  });
}
function getMaxIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices
  });
}
function findNonDisabledIndex(listRef, _temp) {
  let {
    startingIndex = -1,
    decrement = false,
    disabledIndices,
    amount = 1
  } = _temp === void 0 ? {} : _temp;
  const list = listRef.current;
  let index2 = startingIndex;
  do {
    index2 += decrement ? -amount : amount;
  } while (index2 >= 0 && index2 <= list.length - 1 && isDisabled(list, index2, disabledIndices));
  return index2;
}
function getGridNavigatedIndex(elementsRef, _ref) {
  let {
    event,
    orientation,
    loop,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex,
    stopEvent: stop = false
  } = _ref;
  let nextIndex = prevIndex;
  if (event.key === ARROW_UP) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = maxIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: nextIndex,
        amount: cols,
        decrement: true,
        disabledIndices
      });
      if (loop && (prevIndex - cols < minIndex || nextIndex < 0)) {
        const col = prevIndex % cols;
        const maxCol = maxIndex % cols;
        const offset2 = maxIndex - (maxCol - col);
        if (maxCol === col) {
          nextIndex = maxIndex;
        } else {
          nextIndex = maxCol > col ? offset2 : offset2 - cols;
        }
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (event.key === ARROW_DOWN) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = minIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: prevIndex,
        amount: cols,
        disabledIndices
      });
      if (loop && prevIndex + cols > maxIndex) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex % cols - cols,
          amount: cols,
          disabledIndices
        });
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (orientation === "both") {
    const prevRow = floor(prevIndex / cols);
    if (event.key === ARROW_RIGHT) {
      stop && stopEvent(event);
      if (prevIndex % cols !== cols - 1) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex - prevIndex % cols - 1,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    if (event.key === ARROW_LEFT) {
      stop && stopEvent(event);
      if (prevIndex % cols !== 0) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          decrement: true,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex + (cols - prevIndex % cols),
            decrement: true,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex + (cols - prevIndex % cols),
          decrement: true,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    const lastRow = floor(maxIndex / cols) === prevRow;
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      if (loop && lastRow) {
        nextIndex = event.key === ARROW_LEFT ? maxIndex : findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      } else {
        nextIndex = prevIndex;
      }
    }
  }
  return nextIndex;
}
function buildCellMap(sizes, cols, dense) {
  const cellMap = [];
  let startIndex = 0;
  sizes.forEach((_ref2, index2) => {
    let {
      width,
      height
    } = _ref2;
    if (width > cols) {
      if (true) {
        throw new Error("[Floating UI]: Invalid grid - item width at index " + index2 + " is greater than grid columns");
      }
    }
    let itemPlaced = false;
    if (dense) {
      startIndex = 0;
    }
    while (!itemPlaced) {
      const targetCells = [];
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          targetCells.push(startIndex + i + j * cols);
        }
      }
      if (startIndex % cols + width <= cols && targetCells.every((cell) => cellMap[cell] == null)) {
        targetCells.forEach((cell) => {
          cellMap[cell] = index2;
        });
        itemPlaced = true;
      } else {
        startIndex++;
      }
    }
  });
  return [...cellMap];
}
function getCellIndexOfCorner(index2, sizes, cellMap, cols, corner) {
  if (index2 === -1) return -1;
  const firstCellIndex = cellMap.indexOf(index2);
  const sizeItem = sizes[index2];
  switch (corner) {
    case "tl":
      return firstCellIndex;
    case "tr":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + sizeItem.width - 1;
    case "bl":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + (sizeItem.height - 1) * cols;
    case "br":
      return cellMap.lastIndexOf(index2);
  }
}
function getCellIndices(indices, cellMap) {
  return cellMap.flatMap((index2, cellIndex) => indices.includes(index2) ? [cellIndex] : []);
}
function isDisabled(list, index2, disabledIndices) {
  if (disabledIndices) {
    return disabledIndices.includes(index2);
  }
  const element = list[index2];
  return element == null || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
}
var rafId = 0;
function enqueueFocus(el, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    preventScroll = false,
    cancelPrevious = true,
    sync = false
  } = options;
  cancelPrevious && cancelAnimationFrame(rafId);
  const exec = () => el == null ? void 0 : el.focus({
    preventScroll
  });
  if (sync) {
    exec();
  } else {
    rafId = requestAnimationFrame(exec);
  }
}
var index = typeof document !== "undefined" ? import_react2.useLayoutEffect : import_react2.useEffect;
function sortByDocumentPosition(a, b) {
  const position = a.compareDocumentPosition(b);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    return -1;
  }
  if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
    return 1;
  }
  return 0;
}
function areMapsEqual(map1, map2) {
  if (map1.size !== map2.size) {
    return false;
  }
  for (const [key, value] of map1.entries()) {
    if (value !== map2.get(key)) {
      return false;
    }
  }
  return true;
}
var FloatingListContext = React.createContext({
  register: () => {
  },
  unregister: () => {
  },
  map: /* @__PURE__ */ new Map(),
  elementsRef: {
    current: []
  }
});
function FloatingList(props) {
  const {
    children,
    elementsRef,
    labelsRef
  } = props;
  const [map, setMap] = React.useState(() => /* @__PURE__ */ new Map());
  const register = React.useCallback((node) => {
    setMap((prevMap) => new Map(prevMap).set(node, null));
  }, []);
  const unregister = React.useCallback((node) => {
    setMap((prevMap) => {
      const map2 = new Map(prevMap);
      map2.delete(node);
      return map2;
    });
  }, []);
  index(() => {
    const newMap = new Map(map);
    const nodes = Array.from(newMap.keys()).sort(sortByDocumentPosition);
    nodes.forEach((node, index2) => {
      newMap.set(node, index2);
    });
    if (!areMapsEqual(map, newMap)) {
      setMap(newMap);
    }
  }, [map]);
  return React.createElement(FloatingListContext.Provider, {
    value: React.useMemo(() => ({
      register,
      unregister,
      map,
      elementsRef,
      labelsRef
    }), [register, unregister, map, elementsRef, labelsRef])
  }, children);
}
function useListItem(props) {
  if (props === void 0) {
    props = {};
  }
  const {
    label
  } = props;
  const {
    register,
    unregister,
    map,
    elementsRef,
    labelsRef
  } = React.useContext(FloatingListContext);
  const [index$1, setIndex] = React.useState(null);
  const componentRef = React.useRef(null);
  const ref = React.useCallback((node) => {
    componentRef.current = node;
    if (index$1 !== null) {
      elementsRef.current[index$1] = node;
      if (labelsRef) {
        var _node$textContent;
        const isLabelDefined = label !== void 0;
        labelsRef.current[index$1] = isLabelDefined ? label : (_node$textContent = node == null ? void 0 : node.textContent) != null ? _node$textContent : null;
      }
    }
  }, [index$1, elementsRef, labelsRef, label]);
  index(() => {
    const node = componentRef.current;
    if (node) {
      register(node);
      return () => {
        unregister(node);
      };
    }
  }, [register, unregister]);
  index(() => {
    const index2 = componentRef.current ? map.get(componentRef.current) : null;
    if (index2 != null) {
      setIndex(index2);
    }
  }, [map]);
  return React.useMemo(() => ({
    ref,
    index: index$1 == null ? -1 : index$1
  }), [index$1, ref]);
}
function renderJsx(render, computedProps) {
  if (typeof render === "function") {
    return render(computedProps);
  }
  if (render) {
    return React.cloneElement(render, computedProps);
  }
  return React.createElement("div", computedProps);
}
var CompositeContext = React.createContext({
  activeIndex: 0,
  onNavigate: () => {
  }
});
var horizontalKeys = [ARROW_LEFT, ARROW_RIGHT];
var verticalKeys = [ARROW_UP, ARROW_DOWN];
var allKeys = [...horizontalKeys, ...verticalKeys];
var Composite = React.forwardRef(function Composite2(props, forwardedRef) {
  const {
    render,
    orientation = "both",
    loop = true,
    cols = 1,
    disabledIndices,
    activeIndex: externalActiveIndex,
    onNavigate: externalSetActiveIndex,
    itemSizes,
    dense = false,
    ...domProps
  } = props;
  const [internalActiveIndex, internalSetActiveIndex] = React.useState(0);
  const activeIndex = externalActiveIndex != null ? externalActiveIndex : internalActiveIndex;
  const onNavigate = useEffectEvent(externalSetActiveIndex != null ? externalSetActiveIndex : internalSetActiveIndex);
  const elementsRef = React.useRef([]);
  const renderElementProps = render && typeof render !== "function" ? render.props : {};
  const contextValue = React.useMemo(() => ({
    activeIndex,
    onNavigate
  }), [activeIndex, onNavigate]);
  const isGrid = cols > 1;
  function handleKeyDown(event) {
    if (!allKeys.includes(event.key)) return;
    let nextIndex = activeIndex;
    const minIndex = getMinIndex(elementsRef, disabledIndices);
    const maxIndex = getMaxIndex(elementsRef, disabledIndices);
    if (isGrid) {
      const sizes = itemSizes || Array.from({
        length: elementsRef.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      const cellMap = buildCellMap(sizes, cols, dense);
      const minGridIndex = cellMap.findIndex((index2) => index2 != null && !isDisabled(elementsRef.current, index2, disabledIndices));
      const maxGridIndex = cellMap.reduce((foundIndex, index2, cellIndex) => index2 != null && !isDisabled(elementsRef.current, index2, disabledIndices) ? cellIndex : foundIndex, -1);
      nextIndex = cellMap[getGridNavigatedIndex({
        current: cellMap.map((itemIndex) => itemIndex ? elementsRef.current[itemIndex] : null)
      }, {
        event,
        orientation,
        loop,
        cols,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: getCellIndices([...disabledIndices || elementsRef.current.map((_, index2) => isDisabled(elementsRef.current, index2) ? index2 : void 0), void 0], cellMap),
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: getCellIndexOfCorner(
          activeIndex > maxIndex ? minIndex : activeIndex,
          sizes,
          cellMap,
          cols,
          // use a corner matching the edge closest to the direction we're
          // moving in so we don't end up in the same item. Prefer
          // top/left over bottom/right.
          event.key === ARROW_DOWN ? "bl" : event.key === ARROW_RIGHT ? "tr" : "tl"
        )
      })];
    }
    const toEndKeys = {
      horizontal: [ARROW_RIGHT],
      vertical: [ARROW_DOWN],
      both: [ARROW_RIGHT, ARROW_DOWN]
    }[orientation];
    const toStartKeys = {
      horizontal: [ARROW_LEFT],
      vertical: [ARROW_UP],
      both: [ARROW_LEFT, ARROW_UP]
    }[orientation];
    const preventedKeys = isGrid ? allKeys : {
      horizontal: horizontalKeys,
      vertical: verticalKeys,
      both: allKeys
    }[orientation];
    if (nextIndex === activeIndex && [...toEndKeys, ...toStartKeys].includes(event.key)) {
      if (loop && nextIndex === maxIndex && toEndKeys.includes(event.key)) {
        nextIndex = minIndex;
      } else if (loop && nextIndex === minIndex && toStartKeys.includes(event.key)) {
        nextIndex = maxIndex;
      } else {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: nextIndex,
          decrement: toStartKeys.includes(event.key),
          disabledIndices
        });
      }
    }
    if (nextIndex !== activeIndex && !isIndexOutOfBounds(elementsRef, nextIndex)) {
      event.stopPropagation();
      if (preventedKeys.includes(event.key)) {
        event.preventDefault();
      }
      onNavigate(nextIndex);
      queueMicrotask(() => {
        enqueueFocus(elementsRef.current[nextIndex]);
      });
    }
  }
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: forwardedRef,
    "aria-orientation": orientation === "both" ? void 0 : orientation,
    onKeyDown(e) {
      domProps.onKeyDown == null || domProps.onKeyDown(e);
      renderElementProps.onKeyDown == null || renderElementProps.onKeyDown(e);
      handleKeyDown(e);
    }
  };
  return React.createElement(CompositeContext.Provider, {
    value: contextValue
  }, React.createElement(FloatingList, {
    elementsRef
  }, renderJsx(render, computedProps)));
});
var CompositeItem = React.forwardRef(function CompositeItem2(props, forwardedRef) {
  const {
    render,
    ...domProps
  } = props;
  const renderElementProps = render && typeof render !== "function" ? render.props : {};
  const {
    activeIndex,
    onNavigate
  } = React.useContext(CompositeContext);
  const {
    ref,
    index: index2
  } = useListItem();
  const mergedRef = useMergeRefs([ref, forwardedRef, renderElementProps.ref]);
  const isActive = activeIndex === index2;
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: mergedRef,
    tabIndex: isActive ? 0 : -1,
    "data-active": isActive ? "" : void 0,
    onFocus(e) {
      domProps.onFocus == null || domProps.onFocus(e);
      renderElementProps.onFocus == null || renderElementProps.onFocus(e);
      onNavigate(index2);
    }
  };
  return renderJsx(render, computedProps);
});
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var serverHandoffComplete = false;
var count = 0;
var genId = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++
);
function useFloatingId() {
  const [id, setId] = React.useState(() => serverHandoffComplete ? genId() : void 0);
  index(() => {
    if (id == null) {
      setId(genId());
    }
  }, []);
  React.useEffect(() => {
    serverHandoffComplete = true;
  }, []);
  return id;
}
var useReactId = SafeReact.useId;
var useId = useReactId || useFloatingId;
var devMessageSet;
if (true) {
  devMessageSet = /* @__PURE__ */ new Set();
}
function warn() {
  var _devMessageSet;
  for (var _len = arguments.length, messages = new Array(_len), _key = 0; _key < _len; _key++) {
    messages[_key] = arguments[_key];
  }
  const message = "Floating UI: " + messages.join(" ");
  if (!((_devMessageSet = devMessageSet) != null && _devMessageSet.has(message))) {
    var _devMessageSet2;
    (_devMessageSet2 = devMessageSet) == null || _devMessageSet2.add(message);
    console.warn(message);
  }
}
function error() {
  var _devMessageSet3;
  for (var _len2 = arguments.length, messages = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    messages[_key2] = arguments[_key2];
  }
  const message = "Floating UI: " + messages.join(" ");
  if (!((_devMessageSet3 = devMessageSet) != null && _devMessageSet3.has(message))) {
    var _devMessageSet4;
    (_devMessageSet4 = devMessageSet) == null || _devMessageSet4.add(message);
    console.error(message);
  }
}
var FloatingArrow = React.forwardRef(function FloatingArrow2(props, ref) {
  const {
    context: {
      placement,
      elements: {
        floating
      },
      middlewareData: {
        arrow: arrow2
      }
    },
    width = 14,
    height = 7,
    tipRadius = 0,
    strokeWidth = 0,
    staticOffset,
    stroke,
    d,
    style: {
      transform,
      ...restStyle
    } = {},
    ...rest
  } = props;
  if (true) {
    if (!ref) {
      warn("The `ref` prop is required for `FloatingArrow`.");
    }
  }
  const clipPathId = useId();
  if (!floating) {
    return null;
  }
  const computedStrokeWidth = strokeWidth * 2;
  const halfStrokeWidth = computedStrokeWidth / 2;
  const svgX = width / 2 * (tipRadius / -8 + 1);
  const svgY = height / 2 * tipRadius / 4;
  const [side, alignment] = placement.split("-");
  const isRTL = platform.isRTL(floating);
  const isCustomShape = !!d;
  const isVerticalSide = side === "top" || side === "bottom";
  const yOffsetProp = staticOffset && alignment === "end" ? "bottom" : "top";
  let xOffsetProp = staticOffset && alignment === "end" ? "right" : "left";
  if (staticOffset && isRTL) {
    xOffsetProp = alignment === "end" ? "left" : "right";
  }
  const arrowX = (arrow2 == null ? void 0 : arrow2.x) != null ? staticOffset || arrow2.x : "";
  const arrowY = (arrow2 == null ? void 0 : arrow2.y) != null ? staticOffset || arrow2.y : "";
  const dValue = d || "M0,0" + (" H" + width) + (" L" + (width - svgX) + "," + (height - svgY)) + (" Q" + width / 2 + "," + height + " " + svgX + "," + (height - svgY)) + " Z";
  const rotation = {
    top: isCustomShape ? "rotate(180deg)" : "",
    left: isCustomShape ? "rotate(90deg)" : "rotate(-90deg)",
    bottom: isCustomShape ? "" : "rotate(180deg)",
    right: isCustomShape ? "rotate(-90deg)" : "rotate(90deg)"
  }[side];
  return React.createElement("svg", _extends({}, rest, {
    "aria-hidden": true,
    ref,
    width: isCustomShape ? width : width + computedStrokeWidth,
    height: width,
    viewBox: "0 0 " + width + " " + (height > width ? height : width),
    style: {
      position: "absolute",
      pointerEvents: "none",
      [xOffsetProp]: arrowX,
      [yOffsetProp]: arrowY,
      [side]: isVerticalSide || isCustomShape ? "100%" : "calc(100% - " + computedStrokeWidth / 2 + "px)",
      transform: "" + rotation + (transform != null ? transform : ""),
      ...restStyle
    }
  }), computedStrokeWidth > 0 && React.createElement("path", {
    clipPath: "url(#" + clipPathId + ")",
    fill: "none",
    stroke,
    strokeWidth: computedStrokeWidth + (d ? 0 : 1),
    d: dValue
  }), React.createElement("path", {
    stroke: computedStrokeWidth && !d ? rest.fill : "none",
    d: dValue
  }), React.createElement("clipPath", {
    id: clipPathId
  }, React.createElement("rect", {
    x: -halfStrokeWidth,
    y: halfStrokeWidth * (isCustomShape ? -1 : 1),
    width: width + computedStrokeWidth,
    height: width
  })));
});
function createPubSub() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null || _map$get.forEach((handler) => handler(data));
    },
    on(event, listener) {
      map.set(event, [...map.get(event) || [], listener]);
    },
    off(event, listener) {
      var _map$get2;
      map.set(event, ((_map$get2 = map.get(event)) == null ? void 0 : _map$get2.filter((l) => l !== listener)) || []);
    }
  };
}
var FloatingNodeContext = React.createContext(null);
var FloatingTreeContext = React.createContext(null);
var useFloatingParentNodeId = () => {
  var _React$useContext;
  return ((_React$useContext = React.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};
var useFloatingTree = () => React.useContext(FloatingTreeContext);
function createAttribute(name) {
  return "data-floating-ui-" + name;
}
var safePolygonIdentifier = createAttribute("safe-polygon");
var NOOP = () => {
};
var FloatingDelayGroupContext = React.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: NOOP,
  setState: NOOP,
  isInstantPhase: false
});
var HIDDEN_STYLES = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
};
var timeoutId;
function setActiveElementOnTab(event) {
  if (event.key === "Tab") {
    event.target;
    clearTimeout(timeoutId);
  }
}
var FocusGuard = React.forwardRef(function FocusGuard2(props, ref) {
  const [role, setRole] = React.useState();
  index(() => {
    if (isSafari()) {
      setRole("button");
    }
    document.addEventListener("keydown", setActiveElementOnTab);
    return () => {
      document.removeEventListener("keydown", setActiveElementOnTab);
    };
  }, []);
  const restProps = {
    ref,
    tabIndex: 0,
    // Role is only for VoiceOver
    role,
    "aria-hidden": role ? void 0 : true,
    [createAttribute("focus-guard")]: "",
    style: HIDDEN_STYLES
  };
  return React.createElement("span", _extends({}, props, restProps));
});
var PortalContext = React.createContext(null);
var attr = createAttribute("portal");
var VisuallyHiddenDismiss = React.forwardRef(function VisuallyHiddenDismiss2(props, ref) {
  return React.createElement("button", _extends({}, props, {
    type: "button",
    ref,
    tabIndex: -1,
    style: HIDDEN_STYLES
  }));
});
var activeLocks = /* @__PURE__ */ new Set();
var FloatingOverlay = React.forwardRef(function FloatingOverlay2(props, ref) {
  const {
    lockScroll = false,
    ...rest
  } = props;
  const lockId = useId();
  index(() => {
    if (!lockScroll) return;
    activeLocks.add(lockId);
    const isIOS = /iP(hone|ad|od)|iOS/.test(getPlatform());
    const bodyStyle = document.body.style;
    const scrollbarX = Math.round(document.documentElement.getBoundingClientRect().left) + document.documentElement.scrollLeft;
    const paddingProp = scrollbarX ? "paddingLeft" : "paddingRight";
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const scrollX = bodyStyle.left ? parseFloat(bodyStyle.left) : window.pageXOffset;
    const scrollY = bodyStyle.top ? parseFloat(bodyStyle.top) : window.pageYOffset;
    bodyStyle.overflow = "hidden";
    if (scrollbarWidth) {
      bodyStyle[paddingProp] = scrollbarWidth + "px";
    }
    if (isIOS) {
      var _window$visualViewpor, _window$visualViewpor2;
      const offsetLeft = ((_window$visualViewpor = window.visualViewport) == null ? void 0 : _window$visualViewpor.offsetLeft) || 0;
      const offsetTop = ((_window$visualViewpor2 = window.visualViewport) == null ? void 0 : _window$visualViewpor2.offsetTop) || 0;
      Object.assign(bodyStyle, {
        position: "fixed",
        top: -(scrollY - Math.floor(offsetTop)) + "px",
        left: -(scrollX - Math.floor(offsetLeft)) + "px",
        right: "0"
      });
    }
    return () => {
      activeLocks.delete(lockId);
      if (activeLocks.size === 0) {
        Object.assign(bodyStyle, {
          overflow: "",
          [paddingProp]: ""
        });
        if (isIOS) {
          Object.assign(bodyStyle, {
            position: "",
            top: "",
            left: "",
            right: ""
          });
          window.scrollTo(scrollX, scrollY);
        }
      }
    };
  }, [lockId, lockScroll]);
  return React.createElement("div", _extends({
    ref
  }, rest, {
    style: {
      position: "fixed",
      overflow: "auto",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...rest.style
    }
  }));
});
function useFloatingRootContext(options) {
  const {
    open = false,
    onOpenChange: onOpenChangeProp,
    elements: elementsProp
  } = options;
  const floatingId = useId();
  const dataRef = React.useRef({});
  const [events] = React.useState(() => createPubSub());
  const nested = useFloatingParentNodeId() != null;
  if (true) {
    const optionDomReference = elementsProp.reference;
    if (optionDomReference && !isElement(optionDomReference)) {
      error("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `refs.setPositionReference()`", "instead.");
    }
  }
  const [positionReference, setPositionReference] = React.useState(elementsProp.reference);
  const onOpenChange = useEffectEvent((open2, event, reason) => {
    dataRef.current.openEvent = open2 ? event : void 0;
    events.emit("openchange", {
      open: open2,
      event,
      reason,
      nested
    });
    onOpenChangeProp == null || onOpenChangeProp(open2, event, reason);
  });
  const refs = React.useMemo(() => ({
    setPositionReference
  }), []);
  const elements = React.useMemo(() => ({
    reference: positionReference || elementsProp.reference || null,
    floating: elementsProp.floating || null,
    domReference: elementsProp.reference
  }), [positionReference, elementsProp.reference, elementsProp.floating]);
  return React.useMemo(() => ({
    dataRef,
    open,
    onOpenChange,
    elements,
    events,
    floatingId,
    refs
  }), [open, onOpenChange, elements, events, floatingId, refs]);
}
function useFloating2(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    nodeId
  } = options;
  const internalRootContext = useFloatingRootContext({
    ...options,
    elements: {
      reference: null,
      floating: null,
      ...options.elements
    }
  });
  const rootContext = options.rootContext || internalRootContext;
  const computedElements = rootContext.elements;
  const [_domReference, setDomReference] = React.useState(null);
  const [positionReference, _setPositionReference] = React.useState(null);
  const optionDomReference = computedElements == null ? void 0 : computedElements.reference;
  const domReference = optionDomReference || _domReference;
  const domReferenceRef = React.useRef(null);
  const tree = useFloatingTree();
  index(() => {
    if (domReference) {
      domReferenceRef.current = domReference;
    }
  }, [domReference]);
  const position = useFloating({
    ...options,
    elements: {
      ...computedElements,
      ...positionReference && {
        reference: positionReference
      }
    }
  });
  const setPositionReference = React.useCallback((node) => {
    const computedPositionReference = isElement(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      contextElement: node
    } : node;
    _setPositionReference(computedPositionReference);
    position.refs.setReference(computedPositionReference);
  }, [position.refs]);
  const setReference = React.useCallback((node) => {
    if (isElement(node) || node === null) {
      domReferenceRef.current = node;
      setDomReference(node);
    }
    if (isElement(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    node !== null && !isElement(node)) {
      position.refs.setReference(node);
    }
  }, [position.refs]);
  const refs = React.useMemo(() => ({
    ...position.refs,
    setReference,
    setPositionReference,
    domReference: domReferenceRef
  }), [position.refs, setReference, setPositionReference]);
  const elements = React.useMemo(() => ({
    ...position.elements,
    domReference
  }), [position.elements, domReference]);
  const context = React.useMemo(() => ({
    ...position,
    ...rootContext,
    refs,
    elements,
    nodeId
  }), [position, refs, elements, nodeId, rootContext]);
  index(() => {
    rootContext.dataRef.current.floatingContext = context;
    const node = tree == null ? void 0 : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return React.useMemo(() => ({
    ...position,
    context,
    refs,
    elements
  }), [position, refs, elements, context]);
}

// node_modules/react-datepicker/dist/es/index.js
var import_react_dom5 = __toESM(require_react_dom());
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
  };
  return _extendStatics(d, b);
};
function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  _extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var _assign = function __assign() {
  _assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return _assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
var CalendarContainer = function(_a2) {
  var _b = _a2.showTimeSelectOnly, showTimeSelectOnly = _b === void 0 ? false : _b, _c = _a2.showTime, showTime = _c === void 0 ? false : _c, className = _a2.className, children = _a2.children;
  var ariaLabel = showTimeSelectOnly ? "Choose Time" : "Choose Date".concat(showTime ? " and Time" : "");
  return import_react3.default.createElement("div", { className, role: "dialog", "aria-label": ariaLabel, "aria-modal": "true" }, children);
};
var KeyType;
(function(KeyType2) {
  KeyType2["ArrowUp"] = "ArrowUp";
  KeyType2["ArrowDown"] = "ArrowDown";
  KeyType2["ArrowLeft"] = "ArrowLeft";
  KeyType2["ArrowRight"] = "ArrowRight";
  KeyType2["PageUp"] = "PageUp";
  KeyType2["PageDown"] = "PageDown";
  KeyType2["Home"] = "Home";
  KeyType2["End"] = "End";
  KeyType2["Enter"] = "Enter";
  KeyType2["Space"] = " ";
  KeyType2["Tab"] = "Tab";
  KeyType2["Escape"] = "Escape";
  KeyType2["Backspace"] = "Backspace";
  KeyType2["X"] = "x";
})(KeyType || (KeyType = {}));
function getLocaleScope() {
  var scope = typeof window !== "undefined" ? window : globalThis;
  return scope;
}
var DEFAULT_YEAR_ITEM_NUMBER = 12;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
function newDate(value) {
  if (value == null) {
    return /* @__PURE__ */ new Date();
  }
  var d = typeof value === "string" ? parseISO(value) : toDate(value);
  return isValid2(d) ? d : /* @__PURE__ */ new Date();
}
function parseDate(value, dateFormat, locale, strictParsing, minDate) {
  var _a2;
  var parsedDate = null;
  var localeObject = getLocaleObject(locale) || getLocaleObject(getDefaultLocale());
  var strictParsingValueMatch = true;
  if (Array.isArray(dateFormat)) {
    dateFormat.forEach(function(df) {
      var tryParseDate = parse(value, df, /* @__PURE__ */ new Date(), {
        locale: localeObject,
        useAdditionalWeekYearTokens: true,
        useAdditionalDayOfYearTokens: true
      });
      if (strictParsing) {
        strictParsingValueMatch = isValid2(tryParseDate, minDate) && value === formatDate(tryParseDate, df, locale);
      }
      if (isValid2(tryParseDate, minDate) && strictParsingValueMatch) {
        parsedDate = tryParseDate;
      }
    });
    return parsedDate;
  }
  parsedDate = parse(value, dateFormat, /* @__PURE__ */ new Date(), {
    locale: localeObject,
    useAdditionalWeekYearTokens: true,
    useAdditionalDayOfYearTokens: true
  });
  if (strictParsing) {
    strictParsingValueMatch = isValid2(parsedDate) && value === formatDate(parsedDate, dateFormat, locale);
  } else if (!isValid2(parsedDate)) {
    var format_1 = ((_a2 = dateFormat.match(longFormattingTokensRegExp)) !== null && _a2 !== void 0 ? _a2 : []).map(function(substring) {
      var firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        var longFormatter = longFormatters[firstCharacter];
        return localeObject ? longFormatter(substring, localeObject.formatLong) : firstCharacter;
      }
      return substring;
    }).join("");
    if (value.length > 0) {
      parsedDate = parse(value, format_1.slice(0, value.length), /* @__PURE__ */ new Date(), {
        useAdditionalWeekYearTokens: true,
        useAdditionalDayOfYearTokens: true
      });
    }
    if (!isValid2(parsedDate)) {
      parsedDate = new Date(value);
    }
  }
  return isValid2(parsedDate) && strictParsingValueMatch ? parsedDate : null;
}
function isValid2(date, minDate) {
  return isValid(date) && !isBefore(date, minDate !== null && minDate !== void 0 ? minDate : /* @__PURE__ */ new Date("1/1/1800"));
}
function formatDate(date, formatStr, locale) {
  if (locale === "en") {
    return format(date, formatStr, {
      useAdditionalWeekYearTokens: true,
      useAdditionalDayOfYearTokens: true
    });
  }
  var localeObj = locale ? getLocaleObject(locale) : void 0;
  if (locale && !localeObj) {
    console.warn('A locale object was not found for the provided string ["'.concat(locale, '"].'));
  }
  if (!localeObj && !!getDefaultLocale() && !!getLocaleObject(getDefaultLocale())) {
    localeObj = getLocaleObject(getDefaultLocale());
  }
  return format(date, formatStr, {
    locale: localeObj,
    useAdditionalWeekYearTokens: true,
    useAdditionalDayOfYearTokens: true
  });
}
function safeDateFormat(date, _a2) {
  var dateFormat = _a2.dateFormat, locale = _a2.locale;
  var formatStr = Array.isArray(dateFormat) && dateFormat.length > 0 ? dateFormat[0] : dateFormat;
  return date && formatDate(date, formatStr, locale) || "";
}
function safeDateRangeFormat(startDate, endDate, props) {
  if (!startDate) {
    return "";
  }
  var formattedStartDate = safeDateFormat(startDate, props);
  var formattedEndDate = endDate ? safeDateFormat(endDate, props) : "";
  return "".concat(formattedStartDate, " - ").concat(formattedEndDate);
}
function safeMultipleDatesFormat(dates, props) {
  if (!(dates === null || dates === void 0 ? void 0 : dates.length)) {
    return "";
  }
  var formattedFirstDate = dates[0] ? safeDateFormat(dates[0], props) : "";
  if (dates.length === 1) {
    return formattedFirstDate;
  }
  if (dates.length === 2 && dates[1]) {
    var formattedSecondDate = safeDateFormat(dates[1], props);
    return "".concat(formattedFirstDate, ", ").concat(formattedSecondDate);
  }
  var extraDatesCount = dates.length - 1;
  return "".concat(formattedFirstDate, " (+").concat(extraDatesCount, ")");
}
function setTime(date, _a2) {
  var _b = _a2.hour, hour = _b === void 0 ? 0 : _b, _c = _a2.minute, minute = _c === void 0 ? 0 : _c, _d = _a2.second, second = _d === void 0 ? 0 : _d;
  return setHours(setMinutes(setSeconds(date, second), minute), hour);
}
function getWeek(date) {
  return getISOWeek(date);
}
function getDayOfWeekCode(day, locale) {
  return formatDate(day, "ddd", locale);
}
function getStartOfDay(date) {
  return startOfDay(date);
}
function getStartOfWeek(date, locale, calendarStartDay) {
  var localeObj = locale ? getLocaleObject(locale) : getLocaleObject(getDefaultLocale());
  return startOfWeek(date, {
    locale: localeObj,
    weekStartsOn: calendarStartDay
  });
}
function getStartOfMonth(date) {
  return startOfMonth(date);
}
function getStartOfYear(date) {
  return startOfYear(date);
}
function getStartOfQuarter(date) {
  return startOfQuarter(date);
}
function getStartOfToday() {
  return startOfDay(newDate());
}
function getEndOfDay(date) {
  return endOfDay(date);
}
function getEndOfWeek(date) {
  return endOfWeek(date);
}
function isSameYear2(date1, date2) {
  if (date1 && date2) {
    return isSameYear(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameMonth2(date1, date2) {
  if (date1 && date2) {
    return isSameMonth(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameQuarter2(date1, date2) {
  if (date1 && date2) {
    return isSameQuarter(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isSameDay2(date1, date2) {
  if (date1 && date2) {
    return isSameDay(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isEqual2(date1, date2) {
  if (date1 && date2) {
    return isEqual(date1, date2);
  } else {
    return !date1 && !date2;
  }
}
function isDayInRange(day, startDate, endDate) {
  var valid;
  var start = startOfDay(startDate);
  var end = endOfDay(endDate);
  try {
    valid = isWithinInterval(day, { start, end });
  } catch (err) {
    valid = false;
  }
  return valid;
}
function registerLocale(localeName, localeData) {
  var scope = getLocaleScope();
  if (!scope.__localeData__) {
    scope.__localeData__ = {};
  }
  scope.__localeData__[localeName] = localeData;
}
function setDefaultLocale(localeName) {
  var scope = getLocaleScope();
  scope.__localeId__ = localeName;
}
function getDefaultLocale() {
  var scope = getLocaleScope();
  return scope.__localeId__;
}
function getLocaleObject(localeSpec) {
  if (typeof localeSpec === "string") {
    var scope = getLocaleScope();
    return scope.__localeData__ ? scope.__localeData__[localeSpec] : void 0;
  } else {
    return localeSpec;
  }
}
function getFormattedWeekdayInLocale(date, formatFunc, locale) {
  return formatFunc(formatDate(date, "EEEE", locale));
}
function getWeekdayMinInLocale(date, locale) {
  return formatDate(date, "EEEEEE", locale);
}
function getWeekdayShortInLocale(date, locale) {
  return formatDate(date, "EEE", locale);
}
function getMonthInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLLL", locale);
}
function getMonthShortInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLL", locale);
}
function getQuarterShortInLocale(quarter, locale) {
  return formatDate(setQuarter(newDate(), quarter), "QQQ", locale);
}
function isDayDisabled(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, excludeDateIntervals = _b.excludeDateIntervals, includeDates = _b.includeDates, includeDateIntervals = _b.includeDateIntervals, filterDate = _b.filterDate;
  return isOutOfBounds(day, { minDate, maxDate }) || excludeDates && excludeDates.some(function(excludeDate) {
    var _a3;
    if (excludeDate instanceof Date) {
      return isSameDay2(day, excludeDate);
    } else {
      return isSameDay2(day, (_a3 = excludeDate.date) !== null && _a3 !== void 0 ? _a3 : /* @__PURE__ */ new Date());
    }
  }) || excludeDateIntervals && excludeDateIntervals.some(function(_a3) {
    var start = _a3.start, end = _a3.end;
    return isWithinInterval(day, { start, end });
  }) || includeDates && !includeDates.some(function(includeDate) {
    return isSameDay2(day, includeDate);
  }) || includeDateIntervals && !includeDateIntervals.some(function(_a3) {
    var start = _a3.start, end = _a3.end;
    return isWithinInterval(day, { start, end });
  }) || filterDate && !filterDate(newDate(day)) || false;
}
function isDayExcluded(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, excludeDates = _b.excludeDates, excludeDateIntervals = _b.excludeDateIntervals;
  if (excludeDateIntervals && excludeDateIntervals.length > 0) {
    return excludeDateIntervals.some(function(_a3) {
      var start = _a3.start, end = _a3.end;
      return isWithinInterval(day, { start, end });
    });
  }
  return excludeDates && excludeDates.some(function(excludeDate) {
    var _a3;
    if (excludeDate instanceof Date) {
      return isSameDay2(day, excludeDate);
    } else {
      return isSameDay2(day, (_a3 = excludeDate.date) !== null && _a3 !== void 0 ? _a3 : /* @__PURE__ */ new Date());
    }
  }) || false;
}
function isMonthDisabled(month, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates, filterDate = _b.filterDate;
  return isOutOfBounds(month, {
    minDate: minDate ? startOfMonth(minDate) : void 0,
    maxDate: maxDate ? endOfMonth(maxDate) : void 0
  }) || (excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.some(function(excludeDate) {
    return isSameMonth2(month, excludeDate instanceof Date ? excludeDate : excludeDate.date);
  })) || includeDates && !includeDates.some(function(includeDate) {
    return isSameMonth2(month, includeDate);
  }) || filterDate && !filterDate(newDate(month)) || false;
}
function isMonthInRange(startDate, endDate, m, day) {
  var startDateYear = getYear(startDate);
  var startDateMonth = getMonth(startDate);
  var endDateYear = getYear(endDate);
  var endDateMonth = getMonth(endDate);
  var dayYear = getYear(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateMonth <= m && m <= endDateMonth;
  } else if (startDateYear < endDateYear) {
    return dayYear === startDateYear && startDateMonth <= m || dayYear === endDateYear && endDateMonth >= m || dayYear < endDateYear && dayYear > startDateYear;
  }
  return false;
}
function isMonthYearDisabled(date, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates;
  return isOutOfBounds(date, { minDate, maxDate }) || excludeDates && excludeDates.some(function(excludedDate) {
    return isSameMonth2(excludedDate instanceof Date ? excludedDate : excludedDate.date, date);
  }) || includeDates && !includeDates.some(function(includedDate) {
    return isSameMonth2(includedDate, date);
  }) || false;
}
function isQuarterDisabled(quarter, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates, filterDate = _b.filterDate;
  return isOutOfBounds(quarter, { minDate, maxDate }) || (excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.some(function(excludeDate) {
    return isSameQuarter2(quarter, excludeDate instanceof Date ? excludeDate : excludeDate.date);
  })) || includeDates && !includeDates.some(function(includeDate) {
    return isSameQuarter2(quarter, includeDate);
  }) || filterDate && !filterDate(newDate(quarter)) || false;
}
function isYearInRange(year, start, end) {
  if (!start || !end)
    return false;
  if (!isValid(start) || !isValid(end))
    return false;
  var startYear = getYear(start);
  var endYear = getYear(end);
  return startYear <= year && endYear >= year;
}
function isYearDisabled(year, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates, filterDate = _b.filterDate;
  var date = new Date(year, 0, 1);
  return isOutOfBounds(date, {
    minDate: minDate ? startOfYear(minDate) : void 0,
    maxDate: maxDate ? endOfYear(maxDate) : void 0
  }) || (excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.some(function(excludeDate) {
    return isSameYear2(date, excludeDate instanceof Date ? excludeDate : excludeDate.date);
  })) || includeDates && !includeDates.some(function(includeDate) {
    return isSameYear2(date, includeDate);
  }) || filterDate && !filterDate(newDate(date)) || false;
}
function isQuarterInRange(startDate, endDate, q, day) {
  var startDateYear = getYear(startDate);
  var startDateQuarter = getQuarter(startDate);
  var endDateYear = getYear(endDate);
  var endDateQuarter = getQuarter(endDate);
  var dayYear = getYear(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateQuarter <= q && q <= endDateQuarter;
  } else if (startDateYear < endDateYear) {
    return dayYear === startDateYear && startDateQuarter <= q || dayYear === endDateYear && endDateQuarter >= q || dayYear < endDateYear && dayYear > startDateYear;
  }
  return false;
}
function isOutOfBounds(day, _a2) {
  var _b;
  var _c = _a2 === void 0 ? {} : _a2, minDate = _c.minDate, maxDate = _c.maxDate;
  return (_b = minDate && differenceInCalendarDays(day, minDate) < 0 || maxDate && differenceInCalendarDays(day, maxDate) > 0) !== null && _b !== void 0 ? _b : false;
}
function isTimeInList(time, times) {
  return times.some(function(listTime) {
    return getHours(listTime) === getHours(time) && getMinutes(listTime) === getMinutes(time) && getSeconds(listTime) === getSeconds(time);
  });
}
function isTimeDisabled(time, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, excludeTimes = _b.excludeTimes, includeTimes = _b.includeTimes, filterTime = _b.filterTime;
  return excludeTimes && isTimeInList(time, excludeTimes) || includeTimes && !isTimeInList(time, includeTimes) || filterTime && !filterTime(time) || false;
}
function isTimeInDisabledRange(time, _a2) {
  var minTime = _a2.minTime, maxTime = _a2.maxTime;
  if (!minTime || !maxTime) {
    throw new Error("Both minTime and maxTime props required");
  }
  var baseTime = newDate();
  baseTime = setHours(baseTime, getHours(time));
  baseTime = setMinutes(baseTime, getMinutes(time));
  baseTime = setSeconds(baseTime, getSeconds(time));
  var min2 = newDate();
  min2 = setHours(min2, getHours(minTime));
  min2 = setMinutes(min2, getMinutes(minTime));
  min2 = setSeconds(min2, getSeconds(minTime));
  var max2 = newDate();
  max2 = setHours(max2, getHours(maxTime));
  max2 = setMinutes(max2, getMinutes(maxTime));
  max2 = setSeconds(max2, getSeconds(maxTime));
  var valid;
  try {
    valid = !isWithinInterval(baseTime, { start: min2, end: max2 });
  } catch (err) {
    valid = false;
  }
  return valid;
}
function monthDisabledBefore(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, includeDates = _b.includeDates;
  var previousMonth = subMonths(day, 1);
  return minDate && differenceInCalendarMonths(minDate, previousMonth) > 0 || includeDates && includeDates.every(function(includeDate) {
    return differenceInCalendarMonths(includeDate, previousMonth) > 0;
  }) || false;
}
function monthDisabledAfter(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, maxDate = _b.maxDate, includeDates = _b.includeDates;
  var nextMonth = addMonths(day, 1);
  return maxDate && differenceInCalendarMonths(nextMonth, maxDate) > 0 || includeDates && includeDates.every(function(includeDate) {
    return differenceInCalendarMonths(nextMonth, includeDate) > 0;
  }) || false;
}
function quarterDisabledBefore(date, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, includeDates = _b.includeDates;
  var firstDateOfYear = startOfYear(date);
  var previousQuarter = subQuarters(firstDateOfYear, 1);
  return minDate && differenceInCalendarQuarters(minDate, previousQuarter) > 0 || includeDates && includeDates.every(function(includeDate) {
    return differenceInCalendarQuarters(includeDate, previousQuarter) > 0;
  }) || false;
}
function quarterDisabledAfter(date, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, maxDate = _b.maxDate, includeDates = _b.includeDates;
  var lastDateOfYear = endOfYear(date);
  var nextQuarter = addQuarters(lastDateOfYear, 1);
  return maxDate && differenceInCalendarQuarters(nextQuarter, maxDate) > 0 || includeDates && includeDates.every(function(includeDate) {
    return differenceInCalendarQuarters(nextQuarter, includeDate) > 0;
  }) || false;
}
function yearDisabledBefore(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, includeDates = _b.includeDates;
  var previousYear = subYears(day, 1);
  return minDate && differenceInCalendarYears(minDate, previousYear) > 0 || includeDates && includeDates.every(function(includeDate) {
    return differenceInCalendarYears(includeDate, previousYear) > 0;
  }) || false;
}
function yearsDisabledBefore(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, minDate = _b.minDate, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
  var previousYear = getStartOfYear(subYears(day, yearItemNumber));
  var endPeriod = getYearsPeriod(previousYear, yearItemNumber).endPeriod;
  var minDateYear = minDate && getYear(minDate);
  return minDateYear && minDateYear > endPeriod || false;
}
function yearDisabledAfter(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, maxDate = _b.maxDate, includeDates = _b.includeDates;
  var nextYear = addYears(day, 1);
  return maxDate && differenceInCalendarYears(nextYear, maxDate) > 0 || includeDates && includeDates.every(function(includeDate) {
    return differenceInCalendarYears(nextYear, includeDate) > 0;
  }) || false;
}
function yearsDisabledAfter(day, _a2) {
  var _b = _a2 === void 0 ? {} : _a2, maxDate = _b.maxDate, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? DEFAULT_YEAR_ITEM_NUMBER : _c;
  var nextYear = addYears(day, yearItemNumber);
  var startPeriod = getYearsPeriod(nextYear, yearItemNumber).startPeriod;
  var maxDateYear = maxDate && getYear(maxDate);
  return maxDateYear && maxDateYear < startPeriod || false;
}
function getEffectiveMinDate(_a2) {
  var minDate = _a2.minDate, includeDates = _a2.includeDates;
  if (includeDates && minDate) {
    var minDates = includeDates.filter(function(includeDate) {
      return differenceInCalendarDays(includeDate, minDate) >= 0;
    });
    return min(minDates);
  } else if (includeDates) {
    return min(includeDates);
  } else {
    return minDate;
  }
}
function getEffectiveMaxDate(_a2) {
  var maxDate = _a2.maxDate, includeDates = _a2.includeDates;
  if (includeDates && maxDate) {
    var maxDates = includeDates.filter(function(includeDate) {
      return differenceInCalendarDays(includeDate, maxDate) <= 0;
    });
    return max(maxDates);
  } else if (includeDates) {
    return max(includeDates);
  } else {
    return maxDate;
  }
}
function getHighLightDaysMap(highlightDates, defaultClassName) {
  var _a2;
  if (highlightDates === void 0) {
    highlightDates = [];
  }
  if (defaultClassName === void 0) {
    defaultClassName = "react-datepicker__day--highlighted";
  }
  var dateClasses = /* @__PURE__ */ new Map();
  for (var i = 0, len = highlightDates.length; i < len; i++) {
    var obj = highlightDates[i];
    if (isDate(obj)) {
      var key = formatDate(obj, "MM.dd.yyyy");
      var classNamesArr = dateClasses.get(key) || [];
      if (!classNamesArr.includes(defaultClassName)) {
        classNamesArr.push(defaultClassName);
        dateClasses.set(key, classNamesArr);
      }
    } else if (typeof obj === "object") {
      var keys = Object.keys(obj);
      var className = (_a2 = keys[0]) !== null && _a2 !== void 0 ? _a2 : "";
      var arrOfDates = obj[className];
      if (typeof className === "string" && Array.isArray(arrOfDates)) {
        for (var k = 0, len_1 = arrOfDates.length; k < len_1; k++) {
          var dateK = arrOfDates[k];
          if (dateK) {
            var key = formatDate(dateK, "MM.dd.yyyy");
            var classNamesArr = dateClasses.get(key) || [];
            if (!classNamesArr.includes(className)) {
              classNamesArr.push(className);
              dateClasses.set(key, classNamesArr);
            }
          }
        }
      }
    }
  }
  return dateClasses;
}
function arraysAreEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every(function(value, index2) {
    return value === array2[index2];
  });
}
function getHolidaysMap(holidayDates, defaultClassName) {
  if (holidayDates === void 0) {
    holidayDates = [];
  }
  if (defaultClassName === void 0) {
    defaultClassName = "react-datepicker__day--holidays";
  }
  var dateClasses = /* @__PURE__ */ new Map();
  holidayDates.forEach(function(holiday) {
    var dateObj = holiday.date, holidayName = holiday.holidayName;
    if (!isDate(dateObj)) {
      return;
    }
    var key = formatDate(dateObj, "MM.dd.yyyy");
    var classNamesObj = dateClasses.get(key) || {
      className: "",
      holidayNames: []
    };
    if ("className" in classNamesObj && classNamesObj["className"] === defaultClassName && arraysAreEqual(classNamesObj["holidayNames"], [holidayName])) {
      return;
    }
    classNamesObj["className"] = defaultClassName;
    var holidayNameArr = classNamesObj["holidayNames"];
    classNamesObj["holidayNames"] = holidayNameArr ? __spreadArray(__spreadArray([], holidayNameArr, true), [holidayName], false) : [holidayName];
    dateClasses.set(key, classNamesObj);
  });
  return dateClasses;
}
function timesToInjectAfter(startOfDay2, currentTime, currentMultiplier, intervals, injectedTimes) {
  var l = injectedTimes.length;
  var times = [];
  for (var i = 0; i < l; i++) {
    var injectedTime = startOfDay2;
    var injectedTimeValue = injectedTimes[i];
    if (injectedTimeValue) {
      injectedTime = addHours(injectedTime, getHours(injectedTimeValue));
      injectedTime = addMinutes(injectedTime, getMinutes(injectedTimeValue));
      injectedTime = addSeconds(injectedTime, getSeconds(injectedTimeValue));
    }
    var nextTime = addMinutes(startOfDay2, (currentMultiplier + 1) * intervals);
    if (isAfter(injectedTime, currentTime) && isBefore(injectedTime, nextTime) && injectedTimeValue != void 0) {
      times.push(injectedTimeValue);
    }
  }
  return times;
}
function addZero(i) {
  return i < 10 ? "0".concat(i) : "".concat(i);
}
function getYearsPeriod(date, yearItemNumber) {
  if (yearItemNumber === void 0) {
    yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER;
  }
  var endPeriod = Math.ceil(getYear(date) / yearItemNumber) * yearItemNumber;
  var startPeriod = endPeriod - (yearItemNumber - 1);
  return { startPeriod, endPeriod };
}
function getHoursInDay(d) {
  var startOfDay2 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  var startOfTheNextDay = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 24);
  return Math.round((+startOfTheNextDay - +startOfDay2) / 36e5);
}
function startOfMinute(d) {
  var seconds = d.getSeconds();
  var milliseconds = d.getMilliseconds();
  return toDate(d.getTime() - seconds * 1e3 - milliseconds);
}
function isSameMinute(d1, d2) {
  return startOfMinute(d1).getTime() === startOfMinute(d2).getTime();
}
function getMidnightDate(date) {
  if (!isDate(date)) {
    throw new Error("Invalid date");
  }
  var dateWithoutTime = new Date(date);
  dateWithoutTime.setHours(0, 0, 0, 0);
  return dateWithoutTime;
}
function isDateBefore(date, dateToCompare) {
  if (!isDate(date) || !isDate(dateToCompare)) {
    throw new Error("Invalid date received");
  }
  var midnightDate = getMidnightDate(date);
  var midnightDateToCompare = getMidnightDate(dateToCompare);
  return isBefore(midnightDate, midnightDateToCompare);
}
function isSpaceKeyDown(event) {
  return event.key === KeyType.Space;
}
var InputTime = (
  /** @class */
  function(_super) {
    __extends(InputTime2, _super);
    function InputTime2(props) {
      var _this = _super.call(this, props) || this;
      _this.onTimeChange = function(time) {
        var _a2, _b;
        _this.setState({ time });
        var propDate = _this.props.date;
        var isPropDateValid = propDate instanceof Date && !isNaN(+propDate);
        var date = isPropDateValid ? propDate : /* @__PURE__ */ new Date();
        if (time === null || time === void 0 ? void 0 : time.includes(":")) {
          var _c = time.split(":"), hours = _c[0], minutes = _c[1];
          date.setHours(Number(hours));
          date.setMinutes(Number(minutes));
        }
        (_b = (_a2 = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a2, date);
      };
      _this.renderTimeInput = function() {
        var time = _this.state.time;
        var _a2 = _this.props, date = _a2.date, timeString = _a2.timeString, customTimeInput = _a2.customTimeInput;
        if (customTimeInput) {
          return (0, import_react3.cloneElement)(customTimeInput, {
            date,
            value: time,
            onChange: _this.onTimeChange
          });
        }
        return import_react3.default.createElement("input", { type: "time", className: "react-datepicker-time__input", placeholder: "Time", name: "time-input", required: true, value: time, onChange: function(event) {
          _this.onTimeChange(event.target.value || timeString);
        } });
      };
      _this.state = {
        time: _this.props.timeString
      };
      return _this;
    }
    InputTime2.getDerivedStateFromProps = function(props, state) {
      if (props.timeString !== state.time) {
        return {
          time: props.timeString
        };
      }
      return null;
    };
    InputTime2.prototype.render = function() {
      return import_react3.default.createElement(
        "div",
        { className: "react-datepicker__input-time-container" },
        import_react3.default.createElement("div", { className: "react-datepicker-time__caption" }, this.props.timeInputLabel),
        import_react3.default.createElement(
          "div",
          { className: "react-datepicker-time__input-container" },
          import_react3.default.createElement("div", { className: "react-datepicker-time__input" }, this.renderTimeInput())
        )
      );
    };
    return InputTime2;
  }(import_react3.Component)
);
var Day = (
  /** @class */
  function(_super) {
    __extends(Day2, _super);
    function Day2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.dayEl = (0, import_react3.createRef)();
      _this.handleClick = function(event) {
        if (!_this.isDisabled() && _this.props.onClick) {
          _this.props.onClick(event);
        }
      };
      _this.handleMouseEnter = function(event) {
        if (!_this.isDisabled() && _this.props.onMouseEnter) {
          _this.props.onMouseEnter(event);
        }
      };
      _this.handleOnKeyDown = function(event) {
        var _a2, _b;
        var eventKey = event.key;
        if (eventKey === KeyType.Space) {
          event.preventDefault();
          event.key = KeyType.Enter;
        }
        (_b = (_a2 = _this.props).handleOnKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
      };
      _this.isSameDay = function(other) {
        return isSameDay2(_this.props.day, other);
      };
      _this.isKeyboardSelected = function() {
        var _a2;
        if (_this.props.disabledKeyboardNavigation) {
          return false;
        }
        var isSelectedDate = _this.props.selectsMultiple ? (_a2 = _this.props.selectedDates) === null || _a2 === void 0 ? void 0 : _a2.some(function(date) {
          return _this.isSameDayOrWeek(date);
        }) : _this.isSameDayOrWeek(_this.props.selected);
        return !isSelectedDate && _this.isSameDayOrWeek(_this.props.preSelection);
      };
      _this.isDisabled = function() {
        return isDayDisabled(_this.props.day, {
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          excludeDateIntervals: _this.props.excludeDateIntervals,
          includeDateIntervals: _this.props.includeDateIntervals,
          includeDates: _this.props.includeDates,
          filterDate: _this.props.filterDate
        });
      };
      _this.isExcluded = function() {
        return isDayExcluded(_this.props.day, {
          excludeDates: _this.props.excludeDates,
          excludeDateIntervals: _this.props.excludeDateIntervals
        });
      };
      _this.isStartOfWeek = function() {
        return isSameDay2(_this.props.day, getStartOfWeek(_this.props.day, _this.props.locale, _this.props.calendarStartDay));
      };
      _this.isSameWeek = function(other) {
        return _this.props.showWeekPicker && isSameDay2(other, getStartOfWeek(_this.props.day, _this.props.locale, _this.props.calendarStartDay));
      };
      _this.isSameDayOrWeek = function(other) {
        return _this.isSameDay(other) || _this.isSameWeek(other);
      };
      _this.getHighLightedClass = function() {
        var _a2 = _this.props, day = _a2.day, highlightDates = _a2.highlightDates;
        if (!highlightDates) {
          return false;
        }
        var dayStr = formatDate(day, "MM.dd.yyyy");
        return highlightDates.get(dayStr);
      };
      _this.getHolidaysClass = function() {
        var _a2;
        var _b = _this.props, day = _b.day, holidays = _b.holidays;
        if (!holidays) {
          return [void 0];
        }
        var dayStr = formatDate(day, "MM.dd.yyyy");
        if (holidays.has(dayStr)) {
          return [(_a2 = holidays.get(dayStr)) === null || _a2 === void 0 ? void 0 : _a2.className];
        }
        return [void 0];
      };
      _this.isInRange = function() {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isDayInRange(day, startDate, endDate);
      };
      _this.isInSelectingRange = function() {
        var _a2;
        var _b = _this.props, day = _b.day, selectsStart = _b.selectsStart, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange, selectsDisabledDaysInRange = _b.selectsDisabledDaysInRange, startDate = _b.startDate, endDate = _b.endDate;
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate || !selectsDisabledDaysInRange && _this.isDisabled()) {
          return false;
        }
        if (selectsStart && endDate && (isBefore(selectingDate, endDate) || isEqual2(selectingDate, endDate))) {
          return isDayInRange(day, selectingDate, endDate);
        }
        if (selectsEnd && startDate && (isAfter(selectingDate, startDate) || isEqual2(selectingDate, startDate))) {
          return isDayInRange(day, startDate, selectingDate);
        }
        if (selectsRange && startDate && !endDate && (isAfter(selectingDate, startDate) || isEqual2(selectingDate, startDate))) {
          return isDayInRange(day, startDate, selectingDate);
        }
        return false;
      };
      _this.isSelectingRangeStart = function() {
        var _a2;
        if (!_this.isInSelectingRange()) {
          return false;
        }
        var _b = _this.props, day = _b.day, startDate = _b.startDate, selectsStart = _b.selectsStart;
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (selectsStart) {
          return isSameDay2(day, selectingDate);
        } else {
          return isSameDay2(day, startDate);
        }
      };
      _this.isSelectingRangeEnd = function() {
        var _a2;
        if (!_this.isInSelectingRange()) {
          return false;
        }
        var _b = _this.props, day = _b.day, endDate = _b.endDate, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange;
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (selectsEnd || selectsRange) {
          return isSameDay2(day, selectingDate);
        } else {
          return isSameDay2(day, endDate);
        }
      };
      _this.isRangeStart = function() {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameDay2(startDate, day);
      };
      _this.isRangeEnd = function() {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameDay2(endDate, day);
      };
      _this.isWeekend = function() {
        var weekday = getDay(_this.props.day);
        return weekday === 0 || weekday === 6;
      };
      _this.isAfterMonth = function() {
        return _this.props.month !== void 0 && (_this.props.month + 1) % 12 === getMonth(_this.props.day);
      };
      _this.isBeforeMonth = function() {
        return _this.props.month !== void 0 && (getMonth(_this.props.day) + 1) % 12 === _this.props.month;
      };
      _this.isCurrentDay = function() {
        return _this.isSameDay(newDate());
      };
      _this.isSelected = function() {
        var _a2;
        if (_this.props.selectsMultiple) {
          return (_a2 = _this.props.selectedDates) === null || _a2 === void 0 ? void 0 : _a2.some(function(date) {
            return _this.isSameDayOrWeek(date);
          });
        }
        return _this.isSameDayOrWeek(_this.props.selected);
      };
      _this.getClassNames = function(date) {
        var dayClassName = _this.props.dayClassName ? _this.props.dayClassName(date) : void 0;
        return clsx("react-datepicker__day", dayClassName, "react-datepicker__day--" + getDayOfWeekCode(_this.props.day), {
          "react-datepicker__day--disabled": _this.isDisabled(),
          "react-datepicker__day--excluded": _this.isExcluded(),
          "react-datepicker__day--selected": _this.isSelected(),
          "react-datepicker__day--keyboard-selected": _this.isKeyboardSelected(),
          "react-datepicker__day--range-start": _this.isRangeStart(),
          "react-datepicker__day--range-end": _this.isRangeEnd(),
          "react-datepicker__day--in-range": _this.isInRange(),
          "react-datepicker__day--in-selecting-range": _this.isInSelectingRange(),
          "react-datepicker__day--selecting-range-start": _this.isSelectingRangeStart(),
          "react-datepicker__day--selecting-range-end": _this.isSelectingRangeEnd(),
          "react-datepicker__day--today": _this.isCurrentDay(),
          "react-datepicker__day--weekend": _this.isWeekend(),
          "react-datepicker__day--outside-month": _this.isAfterMonth() || _this.isBeforeMonth()
        }, _this.getHighLightedClass(), _this.getHolidaysClass());
      };
      _this.getAriaLabel = function() {
        var _a2 = _this.props, day = _a2.day, _b = _a2.ariaLabelPrefixWhenEnabled, ariaLabelPrefixWhenEnabled = _b === void 0 ? "Choose" : _b, _c = _a2.ariaLabelPrefixWhenDisabled, ariaLabelPrefixWhenDisabled = _c === void 0 ? "Not available" : _c;
        var prefix = _this.isDisabled() || _this.isExcluded() ? ariaLabelPrefixWhenDisabled : ariaLabelPrefixWhenEnabled;
        return "".concat(prefix, " ").concat(formatDate(day, "PPPP", _this.props.locale));
      };
      _this.getTitle = function() {
        var _a2 = _this.props, day = _a2.day, _b = _a2.holidays, holidays = _b === void 0 ? /* @__PURE__ */ new Map() : _b, excludeDates = _a2.excludeDates;
        var compareDt = formatDate(day, "MM.dd.yyyy");
        var titles = [];
        if (holidays.has(compareDt)) {
          titles.push.apply(titles, holidays.get(compareDt).holidayNames);
        }
        if (_this.isExcluded()) {
          titles.push(excludeDates === null || excludeDates === void 0 ? void 0 : excludeDates.filter(function(excludeDate) {
            if (excludeDate instanceof Date) {
              return isSameDay2(excludeDate, day);
            }
            return isSameDay2(excludeDate === null || excludeDate === void 0 ? void 0 : excludeDate.date, day);
          }).map(function(excludeDate) {
            if (excludeDate instanceof Date) {
              return void 0;
            }
            return excludeDate === null || excludeDate === void 0 ? void 0 : excludeDate.message;
          }));
        }
        return titles.join(", ");
      };
      _this.getTabIndex = function() {
        var selectedDay = _this.props.selected;
        var preSelectionDay = _this.props.preSelection;
        var tabIndex = !(_this.props.showWeekPicker && (_this.props.showWeekNumber || !_this.isStartOfWeek())) && (_this.isKeyboardSelected() || _this.isSameDay(selectedDay) && isSameDay2(preSelectionDay, selectedDay)) ? 0 : -1;
        return tabIndex;
      };
      _this.handleFocusDay = function() {
        var _a2;
        _this.shouldFocusDay() && ((_a2 = _this.dayEl.current) === null || _a2 === void 0 ? void 0 : _a2.focus({ preventScroll: true }));
      };
      _this.renderDayContents = function() {
        if (_this.props.monthShowsDuplicateDaysEnd && _this.isAfterMonth())
          return null;
        if (_this.props.monthShowsDuplicateDaysStart && _this.isBeforeMonth())
          return null;
        return _this.props.renderDayContents ? _this.props.renderDayContents(getDate(_this.props.day), _this.props.day) : getDate(_this.props.day);
      };
      _this.render = function() {
        return (
          // TODO: Use <option> instead of the "option" role to ensure accessibility across all devices.
          import_react3.default.createElement(
            "div",
            { ref: _this.dayEl, className: _this.getClassNames(_this.props.day), onKeyDown: _this.handleOnKeyDown, onClick: _this.handleClick, onMouseEnter: !_this.props.usePointerEvent ? _this.handleMouseEnter : void 0, onPointerEnter: _this.props.usePointerEvent ? _this.handleMouseEnter : void 0, tabIndex: _this.getTabIndex(), "aria-label": _this.getAriaLabel(), role: "option", title: _this.getTitle(), "aria-disabled": _this.isDisabled(), "aria-current": _this.isCurrentDay() ? "date" : void 0, "aria-selected": _this.isSelected() || _this.isInRange() },
            _this.renderDayContents(),
            _this.getTitle() !== "" && import_react3.default.createElement("span", { className: "overlay" }, _this.getTitle())
          )
        );
      };
      return _this;
    }
    Day2.prototype.componentDidMount = function() {
      this.handleFocusDay();
    };
    Day2.prototype.componentDidUpdate = function() {
      this.handleFocusDay();
    };
    Day2.prototype.shouldFocusDay = function() {
      var shouldFocusDay = false;
      if (this.getTabIndex() === 0 && this.isSameDay(this.props.preSelection)) {
        if (!document.activeElement || document.activeElement === document.body) {
          shouldFocusDay = true;
        }
        if (this.props.inline && !this.props.shouldFocusDayInline) {
          shouldFocusDay = false;
        }
        if (this.isDayActiveElement()) {
          shouldFocusDay = true;
        }
        if (this.isDuplicateDay()) {
          shouldFocusDay = false;
        }
      }
      return shouldFocusDay;
    };
    Day2.prototype.isDayActiveElement = function() {
      var _a2, _b, _c;
      return ((_b = (_a2 = this.props.containerRef) === null || _a2 === void 0 ? void 0 : _a2.current) === null || _b === void 0 ? void 0 : _b.contains(document.activeElement)) && ((_c = document.activeElement) === null || _c === void 0 ? void 0 : _c.classList.contains("react-datepicker__day"));
    };
    Day2.prototype.isDuplicateDay = function() {
      return (
        //day is one of the non rendered duplicate days
        this.props.monthShowsDuplicateDaysEnd && this.isAfterMonth() || this.props.monthShowsDuplicateDaysStart && this.isBeforeMonth()
      );
    };
    return Day2;
  }(import_react3.Component)
);
var WeekNumber = (
  /** @class */
  function(_super) {
    __extends(WeekNumber2, _super);
    function WeekNumber2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.weekNumberEl = (0, import_react3.createRef)();
      _this.handleClick = function(event) {
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
      };
      _this.handleOnKeyDown = function(event) {
        var _a2, _b;
        var eventKey = event.key;
        if (eventKey === KeyType.Space) {
          event.preventDefault();
          event.key = KeyType.Enter;
        }
        (_b = (_a2 = _this.props).handleOnKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
      };
      _this.isKeyboardSelected = function() {
        return !_this.props.disabledKeyboardNavigation && !isSameDay2(_this.props.date, _this.props.selected) && isSameDay2(_this.props.date, _this.props.preSelection);
      };
      _this.getTabIndex = function() {
        return _this.props.showWeekPicker && _this.props.showWeekNumber && (_this.isKeyboardSelected() || isSameDay2(_this.props.date, _this.props.selected) && isSameDay2(_this.props.preSelection, _this.props.selected)) ? 0 : -1;
      };
      _this.handleFocusWeekNumber = function(prevProps) {
        var shouldFocusWeekNumber = false;
        if (_this.getTabIndex() === 0 && !(prevProps === null || prevProps === void 0 ? void 0 : prevProps.isInputFocused) && isSameDay2(_this.props.date, _this.props.preSelection)) {
          if (!document.activeElement || document.activeElement === document.body) {
            shouldFocusWeekNumber = true;
          }
          if (_this.props.inline && !_this.props.shouldFocusDayInline) {
            shouldFocusWeekNumber = false;
          }
          if (_this.props.containerRef && _this.props.containerRef.current && _this.props.containerRef.current.contains(document.activeElement) && document.activeElement && document.activeElement.classList.contains("react-datepicker__week-number")) {
            shouldFocusWeekNumber = true;
          }
        }
        shouldFocusWeekNumber && _this.weekNumberEl.current && _this.weekNumberEl.current.focus({ preventScroll: true });
      };
      return _this;
    }
    Object.defineProperty(WeekNumber2, "defaultProps", {
      get: function() {
        return {
          ariaLabelPrefix: "week "
        };
      },
      enumerable: false,
      configurable: true
    });
    WeekNumber2.prototype.componentDidMount = function() {
      this.handleFocusWeekNumber();
    };
    WeekNumber2.prototype.componentDidUpdate = function(prevProps) {
      this.handleFocusWeekNumber(prevProps);
    };
    WeekNumber2.prototype.render = function() {
      var _a2 = this.props, weekNumber = _a2.weekNumber, _b = _a2.ariaLabelPrefix, ariaLabelPrefix = _b === void 0 ? WeekNumber2.defaultProps.ariaLabelPrefix : _b, onClick = _a2.onClick;
      var weekNumberClasses = {
        "react-datepicker__week-number": true,
        "react-datepicker__week-number--clickable": !!onClick,
        "react-datepicker__week-number--selected": !!onClick && isSameDay2(this.props.date, this.props.selected),
        "react-datepicker__week-number--keyboard-selected": this.isKeyboardSelected()
      };
      return import_react3.default.createElement("div", { ref: this.weekNumberEl, className: clsx(weekNumberClasses), "aria-label": "".concat(ariaLabelPrefix, " ").concat(this.props.weekNumber), onClick: this.handleClick, onKeyDown: this.handleOnKeyDown, tabIndex: this.getTabIndex() }, weekNumber);
    };
    return WeekNumber2;
  }(import_react3.Component)
);
var Week = (
  /** @class */
  function(_super) {
    __extends(Week2, _super);
    function Week2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.handleDayClick = function(day, event) {
        if (_this.props.onDayClick) {
          _this.props.onDayClick(day, event);
        }
      };
      _this.handleDayMouseEnter = function(day) {
        if (_this.props.onDayMouseEnter) {
          _this.props.onDayMouseEnter(day);
        }
      };
      _this.handleWeekClick = function(day, weekNumber, event) {
        var _a2, _b, _c;
        if (typeof _this.props.onWeekSelect === "function") {
          _this.props.onWeekSelect(day, weekNumber, event);
        }
        if (_this.props.showWeekPicker) {
          _this.handleDayClick(day, event);
        }
        if ((_a2 = _this.props.shouldCloseOnSelect) !== null && _a2 !== void 0 ? _a2 : Week2.defaultProps.shouldCloseOnSelect) {
          (_c = (_b = _this.props).setOpen) === null || _c === void 0 ? void 0 : _c.call(_b, false);
        }
      };
      _this.formatWeekNumber = function(date) {
        if (_this.props.formatWeekNumber) {
          return _this.props.formatWeekNumber(date);
        }
        return getWeek(date);
      };
      _this.renderDays = function() {
        var startOfWeek2 = _this.startOfWeek();
        var days = [];
        var weekNumber = _this.formatWeekNumber(startOfWeek2);
        if (_this.props.showWeekNumber) {
          var onClickAction = _this.props.onWeekSelect || _this.props.showWeekPicker ? _this.handleWeekClick.bind(_this, startOfWeek2, weekNumber) : void 0;
          days.push(import_react3.default.createElement(WeekNumber, _assign({ key: "W" }, Week2.defaultProps, _this.props, { weekNumber, date: startOfWeek2, onClick: onClickAction })));
        }
        return days.concat([0, 1, 2, 3, 4, 5, 6].map(function(offset2) {
          var day = addDays(startOfWeek2, offset2);
          return import_react3.default.createElement(Day, _assign({}, Week2.defaultProps, _this.props, { ariaLabelPrefixWhenEnabled: _this.props.chooseDayAriaLabelPrefix, ariaLabelPrefixWhenDisabled: _this.props.disabledDayAriaLabelPrefix, key: day.valueOf(), day, onClick: _this.handleDayClick.bind(_this, day), onMouseEnter: _this.handleDayMouseEnter.bind(_this, day) }));
        }));
      };
      _this.startOfWeek = function() {
        return getStartOfWeek(_this.props.day, _this.props.locale, _this.props.calendarStartDay);
      };
      _this.isKeyboardSelected = function() {
        return !_this.props.disabledKeyboardNavigation && !isSameDay2(_this.startOfWeek(), _this.props.selected) && isSameDay2(_this.startOfWeek(), _this.props.preSelection);
      };
      return _this;
    }
    Object.defineProperty(Week2, "defaultProps", {
      get: function() {
        return {
          shouldCloseOnSelect: true
        };
      },
      enumerable: false,
      configurable: true
    });
    Week2.prototype.render = function() {
      var weekNumberClasses = {
        "react-datepicker__week": true,
        "react-datepicker__week--selected": isSameDay2(this.startOfWeek(), this.props.selected),
        "react-datepicker__week--keyboard-selected": this.isKeyboardSelected()
      };
      return import_react3.default.createElement("div", { className: clsx(weekNumberClasses) }, this.renderDays());
    };
    return Week2;
  }(import_react3.Component)
);
var _a;
var FIXED_HEIGHT_STANDARD_WEEK_COUNT = 6;
var MONTH_COLUMNS_LAYOUT = {
  TWO_COLUMNS: "two_columns",
  THREE_COLUMNS: "three_columns",
  FOUR_COLUMNS: "four_columns"
};
var MONTH_COLUMNS = (_a = {}, _a[MONTH_COLUMNS_LAYOUT.TWO_COLUMNS] = {
  grid: [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [8, 9],
    [10, 11]
  ],
  verticalNavigationOffset: 2
}, _a[MONTH_COLUMNS_LAYOUT.THREE_COLUMNS] = {
  grid: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11]
  ],
  verticalNavigationOffset: 3
}, _a[MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS] = {
  grid: [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11]
  ],
  verticalNavigationOffset: 4
}, _a);
var MONTH_NAVIGATION_HORIZONTAL_OFFSET = 1;
function getMonthColumnsLayout(showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker) {
  if (showFourColumnMonthYearPicker) {
    return MONTH_COLUMNS_LAYOUT.FOUR_COLUMNS;
  }
  if (showTwoColumnMonthYearPicker) {
    return MONTH_COLUMNS_LAYOUT.TWO_COLUMNS;
  }
  return MONTH_COLUMNS_LAYOUT.THREE_COLUMNS;
}
var Month = (
  /** @class */
  function(_super) {
    __extends(Month2, _super);
    function Month2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.MONTH_REFS = __spreadArray([], Array(12), true).map(function() {
        return (0, import_react3.createRef)();
      });
      _this.QUARTER_REFS = __spreadArray([], Array(4), true).map(function() {
        return (0, import_react3.createRef)();
      });
      _this.isDisabled = function(day) {
        return isDayDisabled(day, {
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          excludeDateIntervals: _this.props.excludeDateIntervals,
          includeDateIntervals: _this.props.includeDateIntervals,
          includeDates: _this.props.includeDates,
          filterDate: _this.props.filterDate
        });
      };
      _this.isExcluded = function(day) {
        return isDayExcluded(day, {
          excludeDates: _this.props.excludeDates,
          excludeDateIntervals: _this.props.excludeDateIntervals
        });
      };
      _this.handleDayClick = function(day, event) {
        var _a2, _b;
        (_b = (_a2 = _this.props).onDayClick) === null || _b === void 0 ? void 0 : _b.call(_a2, day, event, _this.props.orderInDisplay);
      };
      _this.handleDayMouseEnter = function(day) {
        var _a2, _b;
        (_b = (_a2 = _this.props).onDayMouseEnter) === null || _b === void 0 ? void 0 : _b.call(_a2, day);
      };
      _this.handleMouseLeave = function() {
        var _a2, _b;
        (_b = (_a2 = _this.props).onMouseLeave) === null || _b === void 0 ? void 0 : _b.call(_a2);
      };
      _this.isRangeStartMonth = function(m) {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameMonth2(setMonth(day, m), startDate);
      };
      _this.isRangeStartQuarter = function(q) {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameQuarter2(setQuarter(day, q), startDate);
      };
      _this.isRangeEndMonth = function(m) {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameMonth2(setMonth(day, m), endDate);
      };
      _this.isRangeEndQuarter = function(q) {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!startDate || !endDate) {
          return false;
        }
        return isSameQuarter2(setQuarter(day, q), endDate);
      };
      _this.isInSelectingRangeMonth = function(m) {
        var _a2;
        var _b = _this.props, day = _b.day, selectsStart = _b.selectsStart, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange, startDate = _b.startDate, endDate = _b.endDate;
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
          return false;
        }
        if (selectsStart && endDate) {
          return isMonthInRange(selectingDate, endDate, m, day);
        }
        if (selectsEnd && startDate) {
          return isMonthInRange(startDate, selectingDate, m, day);
        }
        if (selectsRange && startDate && !endDate) {
          return isMonthInRange(startDate, selectingDate, m, day);
        }
        return false;
      };
      _this.isSelectingMonthRangeStart = function(m) {
        var _a2;
        if (!_this.isInSelectingRangeMonth(m)) {
          return false;
        }
        var _b = _this.props, day = _b.day, startDate = _b.startDate, selectsStart = _b.selectsStart;
        var _month = setMonth(day, m);
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (selectsStart) {
          return isSameMonth2(_month, selectingDate);
        } else {
          return isSameMonth2(_month, startDate);
        }
      };
      _this.isSelectingMonthRangeEnd = function(m) {
        var _a2;
        if (!_this.isInSelectingRangeMonth(m)) {
          return false;
        }
        var _b = _this.props, day = _b.day, endDate = _b.endDate, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange;
        var _month = setMonth(day, m);
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (selectsEnd || selectsRange) {
          return isSameMonth2(_month, selectingDate);
        } else {
          return isSameMonth2(_month, endDate);
        }
      };
      _this.isInSelectingRangeQuarter = function(q) {
        var _a2;
        var _b = _this.props, day = _b.day, selectsStart = _b.selectsStart, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange, startDate = _b.startDate, endDate = _b.endDate;
        var selectingDate = (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
        if (!(selectsStart || selectsEnd || selectsRange) || !selectingDate) {
          return false;
        }
        if (selectsStart && endDate) {
          return isQuarterInRange(selectingDate, endDate, q, day);
        }
        if (selectsEnd && startDate) {
          return isQuarterInRange(startDate, selectingDate, q, day);
        }
        if (selectsRange && startDate && !endDate) {
          return isQuarterInRange(startDate, selectingDate, q, day);
        }
        return false;
      };
      _this.isWeekInMonth = function(startOfWeek2) {
        var day = _this.props.day;
        var endOfWeek2 = addDays(startOfWeek2, 6);
        return isSameMonth2(startOfWeek2, day) || isSameMonth2(endOfWeek2, day);
      };
      _this.isCurrentMonth = function(day, m) {
        return getYear(day) === getYear(newDate()) && m === getMonth(newDate());
      };
      _this.isCurrentQuarter = function(day, q) {
        return getYear(day) === getYear(newDate()) && q === getQuarter(newDate());
      };
      _this.isSelectedMonth = function(day, m, selected) {
        return getMonth(selected) === m && getYear(day) === getYear(selected);
      };
      _this.isSelectedQuarter = function(day, q, selected) {
        return getQuarter(day) === q && getYear(day) === getYear(selected);
      };
      _this.renderWeeks = function() {
        var weeks = [];
        var isFixedHeight = _this.props.fixedHeight;
        var i = 0;
        var breakAfterNextPush = false;
        var currentWeekStart = getStartOfWeek(getStartOfMonth(_this.props.day), _this.props.locale, _this.props.calendarStartDay);
        var isPreSelected = function(preSelection2) {
          return _this.props.showWeekPicker ? getStartOfWeek(preSelection2, _this.props.locale, _this.props.calendarStartDay) : _this.props.preSelection;
        };
        var isSelected = function(selected2) {
          return _this.props.showWeekPicker ? getStartOfWeek(selected2, _this.props.locale, _this.props.calendarStartDay) : _this.props.selected;
        };
        var selected = _this.props.selected ? isSelected(_this.props.selected) : void 0;
        var preSelection = _this.props.preSelection ? isPreSelected(_this.props.preSelection) : void 0;
        while (true) {
          weeks.push(import_react3.default.createElement(Week, _assign({}, _this.props, { ariaLabelPrefix: _this.props.weekAriaLabelPrefix, key: i, day: currentWeekStart, month: getMonth(_this.props.day), onDayClick: _this.handleDayClick, onDayMouseEnter: _this.handleDayMouseEnter, selected, preSelection, showWeekNumber: _this.props.showWeekNumbers })));
          if (breakAfterNextPush)
            break;
          i++;
          currentWeekStart = addWeeks(currentWeekStart, 1);
          var isFixedAndFinalWeek = isFixedHeight && i >= FIXED_HEIGHT_STANDARD_WEEK_COUNT;
          var isNonFixedAndOutOfMonth = !isFixedHeight && !_this.isWeekInMonth(currentWeekStart);
          if (isFixedAndFinalWeek || isNonFixedAndOutOfMonth) {
            if (_this.props.peekNextMonth) {
              breakAfterNextPush = true;
            } else {
              break;
            }
          }
        }
        return weeks;
      };
      _this.onMonthClick = function(event, m) {
        var _a2 = _this.isMonthDisabledForLabelDate(m), isDisabled2 = _a2.isDisabled, labelDate = _a2.labelDate;
        if (isDisabled2) {
          return;
        }
        _this.handleDayClick(getStartOfMonth(labelDate), event);
      };
      _this.onMonthMouseEnter = function(m) {
        var _a2 = _this.isMonthDisabledForLabelDate(m), isDisabled2 = _a2.isDisabled, labelDate = _a2.labelDate;
        if (isDisabled2) {
          return;
        }
        _this.handleDayMouseEnter(getStartOfMonth(labelDate));
      };
      _this.handleMonthNavigation = function(newMonth, newDate2) {
        var _a2, _b, _c, _d;
        (_b = (_a2 = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a2, newDate2);
        (_d = (_c = _this.MONTH_REFS[newMonth]) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.focus();
      };
      _this.handleKeyboardNavigation = function(event, eventKey, month) {
        var _a2;
        var _b = _this.props, selected = _b.selected, preSelection = _b.preSelection, setPreSelection = _b.setPreSelection, minDate = _b.minDate, maxDate = _b.maxDate, showFourColumnMonthYearPicker = _b.showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker = _b.showTwoColumnMonthYearPicker;
        if (!preSelection)
          return;
        var monthColumnsLayout = getMonthColumnsLayout(showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker);
        var verticalOffset = _this.getVerticalOffset(monthColumnsLayout);
        var monthsGrid = (_a2 = MONTH_COLUMNS[monthColumnsLayout]) === null || _a2 === void 0 ? void 0 : _a2.grid;
        var calculateNewDateAndMonth = function(eventKey2, date, month2) {
          var _a3, _b2;
          var newCalculatedDate2 = date;
          var newCalculatedMonth2 = month2;
          switch (eventKey2) {
            case KeyType.ArrowRight:
              newCalculatedDate2 = addMonths(date, MONTH_NAVIGATION_HORIZONTAL_OFFSET);
              newCalculatedMonth2 = month2 === 11 ? 0 : month2 + MONTH_NAVIGATION_HORIZONTAL_OFFSET;
              break;
            case KeyType.ArrowLeft:
              newCalculatedDate2 = subMonths(date, MONTH_NAVIGATION_HORIZONTAL_OFFSET);
              newCalculatedMonth2 = month2 === 0 ? 11 : month2 - MONTH_NAVIGATION_HORIZONTAL_OFFSET;
              break;
            case KeyType.ArrowUp:
              newCalculatedDate2 = subMonths(date, verticalOffset);
              newCalculatedMonth2 = ((_a3 = monthsGrid === null || monthsGrid === void 0 ? void 0 : monthsGrid[0]) === null || _a3 === void 0 ? void 0 : _a3.includes(month2)) ? month2 + 12 - verticalOffset : month2 - verticalOffset;
              break;
            case KeyType.ArrowDown:
              newCalculatedDate2 = addMonths(date, verticalOffset);
              newCalculatedMonth2 = ((_b2 = monthsGrid === null || monthsGrid === void 0 ? void 0 : monthsGrid[monthsGrid.length - 1]) === null || _b2 === void 0 ? void 0 : _b2.includes(month2)) ? month2 - 12 + verticalOffset : month2 + verticalOffset;
              break;
          }
          return { newCalculatedDate: newCalculatedDate2, newCalculatedMonth: newCalculatedMonth2 };
        };
        var getNewDateAndMonth = function(eventKey2, selectedDate, month2) {
          var MAX_ITERATIONS = 40;
          var eventKeyCopy = eventKey2;
          var validDateFound = false;
          var iterations = 0;
          var _a3 = calculateNewDateAndMonth(eventKeyCopy, selectedDate, month2), newCalculatedDate2 = _a3.newCalculatedDate, newCalculatedMonth2 = _a3.newCalculatedMonth;
          while (!validDateFound) {
            if (iterations >= MAX_ITERATIONS) {
              newCalculatedDate2 = selectedDate;
              newCalculatedMonth2 = month2;
              break;
            }
            if (minDate && newCalculatedDate2 < minDate) {
              eventKeyCopy = KeyType.ArrowRight;
              var obj = calculateNewDateAndMonth(eventKeyCopy, newCalculatedDate2, newCalculatedMonth2);
              newCalculatedDate2 = obj.newCalculatedDate;
              newCalculatedMonth2 = obj.newCalculatedMonth;
            }
            if (maxDate && newCalculatedDate2 > maxDate) {
              eventKeyCopy = KeyType.ArrowLeft;
              var obj = calculateNewDateAndMonth(eventKeyCopy, newCalculatedDate2, newCalculatedMonth2);
              newCalculatedDate2 = obj.newCalculatedDate;
              newCalculatedMonth2 = obj.newCalculatedMonth;
            }
            if (isMonthYearDisabled(newCalculatedDate2, _this.props)) {
              var obj = calculateNewDateAndMonth(eventKeyCopy, newCalculatedDate2, newCalculatedMonth2);
              newCalculatedDate2 = obj.newCalculatedDate;
              newCalculatedMonth2 = obj.newCalculatedMonth;
            } else {
              validDateFound = true;
            }
            iterations++;
          }
          return { newCalculatedDate: newCalculatedDate2, newCalculatedMonth: newCalculatedMonth2 };
        };
        if (eventKey === KeyType.Enter) {
          if (!_this.isMonthDisabled(month)) {
            _this.onMonthClick(event, month);
            setPreSelection === null || setPreSelection === void 0 ? void 0 : setPreSelection(selected);
          }
          return;
        }
        var _c = getNewDateAndMonth(eventKey, preSelection, month), newCalculatedDate = _c.newCalculatedDate, newCalculatedMonth = _c.newCalculatedMonth;
        switch (eventKey) {
          case KeyType.ArrowRight:
          case KeyType.ArrowLeft:
          case KeyType.ArrowUp:
          case KeyType.ArrowDown:
            _this.handleMonthNavigation(newCalculatedMonth, newCalculatedDate);
            break;
        }
      };
      _this.getVerticalOffset = function(monthColumnsLayout) {
        var _a2, _b;
        return (_b = (_a2 = MONTH_COLUMNS[monthColumnsLayout]) === null || _a2 === void 0 ? void 0 : _a2.verticalNavigationOffset) !== null && _b !== void 0 ? _b : 0;
      };
      _this.onMonthKeyDown = function(event, month) {
        var _a2 = _this.props, disabledKeyboardNavigation = _a2.disabledKeyboardNavigation, handleOnMonthKeyDown = _a2.handleOnMonthKeyDown;
        var eventKey = event.key;
        if (eventKey !== KeyType.Tab) {
          event.preventDefault();
        }
        if (!disabledKeyboardNavigation) {
          _this.handleKeyboardNavigation(event, eventKey, month);
        }
        handleOnMonthKeyDown && handleOnMonthKeyDown(event);
      };
      _this.onQuarterClick = function(event, q) {
        var labelDate = setQuarter(_this.props.day, q);
        if (isQuarterDisabled(labelDate, _this.props)) {
          return;
        }
        _this.handleDayClick(getStartOfQuarter(labelDate), event);
      };
      _this.onQuarterMouseEnter = function(q) {
        var labelDate = setQuarter(_this.props.day, q);
        if (isQuarterDisabled(labelDate, _this.props)) {
          return;
        }
        _this.handleDayMouseEnter(getStartOfQuarter(labelDate));
      };
      _this.handleQuarterNavigation = function(newQuarter, newDate2) {
        var _a2, _b, _c, _d;
        if (_this.isDisabled(newDate2) || _this.isExcluded(newDate2)) {
          return;
        }
        (_b = (_a2 = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a2, newDate2);
        (_d = (_c = _this.QUARTER_REFS[newQuarter - 1]) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.focus();
      };
      _this.onQuarterKeyDown = function(event, quarter) {
        var _a2, _b;
        var eventKey = event.key;
        if (!_this.props.disabledKeyboardNavigation) {
          switch (eventKey) {
            case KeyType.Enter:
              _this.onQuarterClick(event, quarter);
              (_b = (_a2 = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a2, _this.props.selected);
              break;
            case KeyType.ArrowRight:
              if (!_this.props.preSelection) {
                break;
              }
              _this.handleQuarterNavigation(quarter === 4 ? 1 : quarter + 1, addQuarters(_this.props.preSelection, 1));
              break;
            case KeyType.ArrowLeft:
              if (!_this.props.preSelection) {
                break;
              }
              _this.handleQuarterNavigation(quarter === 1 ? 4 : quarter - 1, subQuarters(_this.props.preSelection, 1));
              break;
          }
        }
      };
      _this.isMonthDisabledForLabelDate = function(month) {
        var _a2;
        var _b = _this.props, day = _b.day, minDate = _b.minDate, maxDate = _b.maxDate, excludeDates = _b.excludeDates, includeDates = _b.includeDates;
        var labelDate = setMonth(day, month);
        return {
          isDisabled: (_a2 = (minDate || maxDate || excludeDates || includeDates) && isMonthDisabled(labelDate, _this.props)) !== null && _a2 !== void 0 ? _a2 : false,
          labelDate
        };
      };
      _this.isMonthDisabled = function(month) {
        var isDisabled2 = _this.isMonthDisabledForLabelDate(month).isDisabled;
        return isDisabled2;
      };
      _this.getMonthClassNames = function(m) {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate, selected = _a2.selected, preSelection = _a2.preSelection, monthClassName = _a2.monthClassName;
        var _monthClassName = monthClassName ? monthClassName(setMonth(day, m)) : void 0;
        return clsx("react-datepicker__month-text", "react-datepicker__month-".concat(m), _monthClassName, {
          "react-datepicker__month-text--disabled": _this.isMonthDisabled(m),
          "react-datepicker__month-text--selected": selected ? _this.isSelectedMonth(day, m, selected) : void 0,
          "react-datepicker__month-text--keyboard-selected": !_this.props.disabledKeyboardNavigation && preSelection && _this.isSelectedMonth(day, m, preSelection),
          "react-datepicker__month-text--in-selecting-range": _this.isInSelectingRangeMonth(m),
          "react-datepicker__month-text--in-range": startDate && endDate ? isMonthInRange(startDate, endDate, m, day) : void 0,
          "react-datepicker__month-text--range-start": _this.isRangeStartMonth(m),
          "react-datepicker__month-text--range-end": _this.isRangeEndMonth(m),
          "react-datepicker__month-text--selecting-range-start": _this.isSelectingMonthRangeStart(m),
          "react-datepicker__month-text--selecting-range-end": _this.isSelectingMonthRangeEnd(m),
          "react-datepicker__month-text--today": _this.isCurrentMonth(day, m)
        });
      };
      _this.getTabIndex = function(m) {
        if (_this.props.preSelection == null) {
          return "-1";
        }
        var preSelectedMonth = getMonth(_this.props.preSelection);
        var tabIndex = !_this.props.disabledKeyboardNavigation && m === preSelectedMonth ? "0" : "-1";
        return tabIndex;
      };
      _this.getQuarterTabIndex = function(q) {
        if (_this.props.preSelection == null) {
          return "-1";
        }
        var preSelectedQuarter = getQuarter(_this.props.preSelection);
        var tabIndex = !_this.props.disabledKeyboardNavigation && q === preSelectedQuarter ? "0" : "-1";
        return tabIndex;
      };
      _this.getAriaLabel = function(month) {
        var _a2 = _this.props, _b = _a2.chooseDayAriaLabelPrefix, chooseDayAriaLabelPrefix = _b === void 0 ? "Choose" : _b, _c = _a2.disabledDayAriaLabelPrefix, disabledDayAriaLabelPrefix = _c === void 0 ? "Not available" : _c, day = _a2.day, locale = _a2.locale;
        var labelDate = setMonth(day, month);
        var prefix = _this.isDisabled(labelDate) || _this.isExcluded(labelDate) ? disabledDayAriaLabelPrefix : chooseDayAriaLabelPrefix;
        return "".concat(prefix, " ").concat(formatDate(labelDate, "MMMM yyyy", locale));
      };
      _this.getQuarterClassNames = function(q) {
        var _a2 = _this.props, day = _a2.day, startDate = _a2.startDate, endDate = _a2.endDate, selected = _a2.selected, minDate = _a2.minDate, maxDate = _a2.maxDate, preSelection = _a2.preSelection, disabledKeyboardNavigation = _a2.disabledKeyboardNavigation;
        return clsx("react-datepicker__quarter-text", "react-datepicker__quarter-".concat(q), {
          "react-datepicker__quarter-text--disabled": (minDate || maxDate) && isQuarterDisabled(setQuarter(day, q), _this.props),
          "react-datepicker__quarter-text--selected": selected ? _this.isSelectedQuarter(day, q, selected) : void 0,
          "react-datepicker__quarter-text--keyboard-selected": !disabledKeyboardNavigation && preSelection && _this.isSelectedQuarter(day, q, preSelection),
          "react-datepicker__quarter-text--in-selecting-range": _this.isInSelectingRangeQuarter(q),
          "react-datepicker__quarter-text--in-range": startDate && endDate ? isQuarterInRange(startDate, endDate, q, day) : void 0,
          "react-datepicker__quarter-text--range-start": _this.isRangeStartQuarter(q),
          "react-datepicker__quarter-text--range-end": _this.isRangeEndQuarter(q)
        });
      };
      _this.getMonthContent = function(m) {
        var _a2 = _this.props, showFullMonthYearPicker = _a2.showFullMonthYearPicker, renderMonthContent = _a2.renderMonthContent, locale = _a2.locale, day = _a2.day;
        var shortMonthText = getMonthShortInLocale(m, locale);
        var fullMonthText = getMonthInLocale(m, locale);
        if (renderMonthContent) {
          return renderMonthContent(m, shortMonthText, fullMonthText, day);
        }
        return showFullMonthYearPicker ? fullMonthText : shortMonthText;
      };
      _this.getQuarterContent = function(q) {
        var _a2;
        var _b = _this.props, renderQuarterContent = _b.renderQuarterContent, locale = _b.locale;
        var shortQuarter = getQuarterShortInLocale(q, locale);
        return (_a2 = renderQuarterContent === null || renderQuarterContent === void 0 ? void 0 : renderQuarterContent(q, shortQuarter)) !== null && _a2 !== void 0 ? _a2 : shortQuarter;
      };
      _this.renderMonths = function() {
        var _a2;
        var _b = _this.props, showTwoColumnMonthYearPicker = _b.showTwoColumnMonthYearPicker, showFourColumnMonthYearPicker = _b.showFourColumnMonthYearPicker, day = _b.day, selected = _b.selected;
        var monthColumns = (_a2 = MONTH_COLUMNS[getMonthColumnsLayout(showFourColumnMonthYearPicker, showTwoColumnMonthYearPicker)]) === null || _a2 === void 0 ? void 0 : _a2.grid;
        return monthColumns === null || monthColumns === void 0 ? void 0 : monthColumns.map(function(month, i) {
          return import_react3.default.createElement("div", { className: "react-datepicker__month-wrapper", key: i }, month.map(function(m, j) {
            return import_react3.default.createElement("div", { ref: _this.MONTH_REFS[m], key: j, onClick: function(event) {
              _this.onMonthClick(event, m);
            }, onKeyDown: function(event) {
              if (isSpaceKeyDown(event)) {
                event.preventDefault();
                event.key = KeyType.Enter;
              }
              _this.onMonthKeyDown(event, m);
            }, onMouseEnter: !_this.props.usePointerEvent ? function() {
              return _this.onMonthMouseEnter(m);
            } : void 0, onPointerEnter: _this.props.usePointerEvent ? function() {
              return _this.onMonthMouseEnter(m);
            } : void 0, tabIndex: Number(_this.getTabIndex(m)), className: _this.getMonthClassNames(m), "aria-disabled": _this.isMonthDisabled(m), role: "option", "aria-label": _this.getAriaLabel(m), "aria-current": _this.isCurrentMonth(day, m) ? "date" : void 0, "aria-selected": selected ? _this.isSelectedMonth(day, m, selected) : void 0 }, _this.getMonthContent(m));
          }));
        });
      };
      _this.renderQuarters = function() {
        var _a2 = _this.props, day = _a2.day, selected = _a2.selected;
        var quarters = [1, 2, 3, 4];
        return import_react3.default.createElement("div", { className: "react-datepicker__quarter-wrapper" }, quarters.map(function(q, j) {
          return import_react3.default.createElement("div", { key: j, ref: _this.QUARTER_REFS[j], role: "option", onClick: function(event) {
            _this.onQuarterClick(event, q);
          }, onKeyDown: function(event) {
            _this.onQuarterKeyDown(event, q);
          }, onMouseEnter: !_this.props.usePointerEvent ? function() {
            return _this.onQuarterMouseEnter(q);
          } : void 0, onPointerEnter: _this.props.usePointerEvent ? function() {
            return _this.onQuarterMouseEnter(q);
          } : void 0, className: _this.getQuarterClassNames(q), "aria-selected": selected ? _this.isSelectedQuarter(day, q, selected) : void 0, tabIndex: Number(_this.getQuarterTabIndex(q)), "aria-current": _this.isCurrentQuarter(day, q) ? "date" : void 0 }, _this.getQuarterContent(q));
        }));
      };
      _this.getClassNames = function() {
        var _a2 = _this.props, selectingDate = _a2.selectingDate, selectsStart = _a2.selectsStart, selectsEnd = _a2.selectsEnd, showMonthYearPicker = _a2.showMonthYearPicker, showQuarterYearPicker = _a2.showQuarterYearPicker, showWeekPicker = _a2.showWeekPicker;
        return clsx("react-datepicker__month", {
          "react-datepicker__month--selecting-range": selectingDate && (selectsStart || selectsEnd)
        }, { "react-datepicker__monthPicker": showMonthYearPicker }, { "react-datepicker__quarterPicker": showQuarterYearPicker }, { "react-datepicker__weekPicker": showWeekPicker });
      };
      return _this;
    }
    Month2.prototype.render = function() {
      var _a2 = this.props, showMonthYearPicker = _a2.showMonthYearPicker, showQuarterYearPicker = _a2.showQuarterYearPicker, day = _a2.day, _b = _a2.ariaLabelPrefix, ariaLabelPrefix = _b === void 0 ? "Month " : _b;
      var formattedAriaLabelPrefix = ariaLabelPrefix ? ariaLabelPrefix.trim() + " " : "";
      return import_react3.default.createElement("div", { className: this.getClassNames(), onMouseLeave: !this.props.usePointerEvent ? this.handleMouseLeave : void 0, onPointerLeave: this.props.usePointerEvent ? this.handleMouseLeave : void 0, "aria-label": "".concat(formattedAriaLabelPrefix).concat(formatDate(day, "MMMM, yyyy", this.props.locale)), role: "listbox" }, showMonthYearPicker ? this.renderMonths() : showQuarterYearPicker ? this.renderQuarters() : this.renderWeeks());
    };
    return Month2;
  }(import_react3.Component)
);
var MonthDropdownOptions = (
  /** @class */
  function(_super) {
    __extends(MonthDropdownOptions2, _super);
    function MonthDropdownOptions2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.isSelectedMonth = function(i) {
        return _this.props.month === i;
      };
      _this.renderOptions = function() {
        return _this.props.monthNames.map(function(month, i) {
          return import_react3.default.createElement(
            "div",
            { className: _this.isSelectedMonth(i) ? "react-datepicker__month-option react-datepicker__month-option--selected_month" : "react-datepicker__month-option", key: month, onClick: _this.onChange.bind(_this, i), "aria-selected": _this.isSelectedMonth(i) ? "true" : void 0 },
            _this.isSelectedMonth(i) ? import_react3.default.createElement("span", { className: "react-datepicker__month-option--selected" }, "✓") : "",
            month
          );
        });
      };
      _this.onChange = function(month) {
        return _this.props.onChange(month);
      };
      _this.handleClickOutside = function() {
        return _this.props.onCancel();
      };
      return _this;
    }
    MonthDropdownOptions2.prototype.render = function() {
      return import_react3.default.createElement("div", { className: "react-datepicker__month-dropdown" }, this.renderOptions());
    };
    return MonthDropdownOptions2;
  }(import_react3.Component)
);
var WrappedMonthDropdownOptions = react_onclickoutside_es_default(MonthDropdownOptions);
var MonthDropdown = (
  /** @class */
  function(_super) {
    __extends(MonthDropdown2, _super);
    function MonthDropdown2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.state = {
        dropdownVisible: false
      };
      _this.renderSelectOptions = function(monthNames) {
        return monthNames.map(function(m, i) {
          return import_react3.default.createElement("option", { key: m, value: i }, m);
        });
      };
      _this.renderSelectMode = function(monthNames) {
        return import_react3.default.createElement("select", { value: _this.props.month, className: "react-datepicker__month-select", onChange: function(e) {
          return _this.onChange(parseInt(e.target.value));
        } }, _this.renderSelectOptions(monthNames));
      };
      _this.renderReadView = function(visible, monthNames) {
        return import_react3.default.createElement(
          "div",
          { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__month-read-view", onClick: _this.toggleDropdown },
          import_react3.default.createElement("span", { className: "react-datepicker__month-read-view--down-arrow" }),
          import_react3.default.createElement("span", { className: "react-datepicker__month-read-view--selected-month" }, monthNames[_this.props.month])
        );
      };
      _this.renderDropdown = function(monthNames) {
        return import_react3.default.createElement(WrappedMonthDropdownOptions, _assign({ key: "dropdown" }, _this.props, { monthNames, onChange: _this.onChange, onCancel: _this.toggleDropdown }));
      };
      _this.renderScrollMode = function(monthNames) {
        var dropdownVisible = _this.state.dropdownVisible;
        var result = [_this.renderReadView(!dropdownVisible, monthNames)];
        if (dropdownVisible) {
          result.unshift(_this.renderDropdown(monthNames));
        }
        return result;
      };
      _this.onChange = function(month) {
        _this.toggleDropdown();
        if (month !== _this.props.month) {
          _this.props.onChange(month);
        }
      };
      _this.toggleDropdown = function() {
        return _this.setState({
          dropdownVisible: !_this.state.dropdownVisible
        });
      };
      return _this;
    }
    MonthDropdown2.prototype.render = function() {
      var _this = this;
      var monthNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(this.props.useShortMonthInDropdown ? function(m) {
        return getMonthShortInLocale(m, _this.props.locale);
      } : function(m) {
        return getMonthInLocale(m, _this.props.locale);
      });
      var renderedDropdown;
      switch (this.props.dropdownMode) {
        case "scroll":
          renderedDropdown = this.renderScrollMode(monthNames);
          break;
        case "select":
          renderedDropdown = this.renderSelectMode(monthNames);
          break;
      }
      return import_react3.default.createElement("div", { className: "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(this.props.dropdownMode) }, renderedDropdown);
    };
    return MonthDropdown2;
  }(import_react3.Component)
);
function generateMonthYears(minDate, maxDate) {
  var list = [];
  var currDate = getStartOfMonth(minDate);
  var lastDate = getStartOfMonth(maxDate);
  while (!isAfter(currDate, lastDate)) {
    list.push(newDate(currDate));
    currDate = addMonths(currDate, 1);
  }
  return list;
}
var MonthYearDropdownOptions = (
  /** @class */
  function(_super) {
    __extends(MonthYearDropdownOptions2, _super);
    function MonthYearDropdownOptions2(props) {
      var _this = _super.call(this, props) || this;
      _this.renderOptions = function() {
        return _this.state.monthYearsList.map(function(monthYear) {
          var monthYearPoint = getTime(monthYear);
          var isSameMonthYear = isSameYear2(_this.props.date, monthYear) && isSameMonth2(_this.props.date, monthYear);
          return import_react3.default.createElement(
            "div",
            { className: isSameMonthYear ? "react-datepicker__month-year-option--selected_month-year" : "react-datepicker__month-year-option", key: monthYearPoint, onClick: _this.onChange.bind(_this, monthYearPoint), "aria-selected": isSameMonthYear ? "true" : void 0 },
            isSameMonthYear ? import_react3.default.createElement("span", { className: "react-datepicker__month-year-option--selected" }, "✓") : "",
            formatDate(monthYear, _this.props.dateFormat, _this.props.locale)
          );
        });
      };
      _this.onChange = function(monthYear) {
        return _this.props.onChange(monthYear);
      };
      _this.handleClickOutside = function() {
        _this.props.onCancel();
      };
      _this.state = {
        monthYearsList: generateMonthYears(_this.props.minDate, _this.props.maxDate)
      };
      return _this;
    }
    MonthYearDropdownOptions2.prototype.render = function() {
      var dropdownClass = clsx({
        "react-datepicker__month-year-dropdown": true,
        "react-datepicker__month-year-dropdown--scrollable": this.props.scrollableMonthYearDropdown
      });
      return import_react3.default.createElement("div", { className: dropdownClass }, this.renderOptions());
    };
    return MonthYearDropdownOptions2;
  }(import_react3.Component)
);
var WrappedMonthYearDropdownOptions = react_onclickoutside_es_default(MonthYearDropdownOptions);
var MonthYearDropdown = (
  /** @class */
  function(_super) {
    __extends(MonthYearDropdown2, _super);
    function MonthYearDropdown2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.state = {
        dropdownVisible: false
      };
      _this.renderSelectOptions = function() {
        var currDate = getStartOfMonth(_this.props.minDate);
        var lastDate = getStartOfMonth(_this.props.maxDate);
        var options = [];
        while (!isAfter(currDate, lastDate)) {
          var timePoint = getTime(currDate);
          options.push(import_react3.default.createElement("option", { key: timePoint, value: timePoint }, formatDate(currDate, _this.props.dateFormat, _this.props.locale)));
          currDate = addMonths(currDate, 1);
        }
        return options;
      };
      _this.onSelectChange = function(event) {
        _this.onChange(parseInt(event.target.value));
      };
      _this.renderSelectMode = function() {
        return import_react3.default.createElement("select", { value: getTime(getStartOfMonth(_this.props.date)), className: "react-datepicker__month-year-select", onChange: _this.onSelectChange }, _this.renderSelectOptions());
      };
      _this.renderReadView = function(visible) {
        var yearMonth = formatDate(_this.props.date, _this.props.dateFormat, _this.props.locale);
        return import_react3.default.createElement(
          "div",
          { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__month-year-read-view", onClick: _this.toggleDropdown },
          import_react3.default.createElement("span", { className: "react-datepicker__month-year-read-view--down-arrow" }),
          import_react3.default.createElement("span", { className: "react-datepicker__month-year-read-view--selected-month-year" }, yearMonth)
        );
      };
      _this.renderDropdown = function() {
        return import_react3.default.createElement(WrappedMonthYearDropdownOptions, _assign({ key: "dropdown" }, _this.props, { onChange: _this.onChange, onCancel: _this.toggleDropdown }));
      };
      _this.renderScrollMode = function() {
        var dropdownVisible = _this.state.dropdownVisible;
        var result = [_this.renderReadView(!dropdownVisible)];
        if (dropdownVisible) {
          result.unshift(_this.renderDropdown());
        }
        return result;
      };
      _this.onChange = function(monthYearPoint) {
        _this.toggleDropdown();
        var changedDate = newDate(monthYearPoint);
        if (isSameYear2(_this.props.date, changedDate) && isSameMonth2(_this.props.date, changedDate)) {
          return;
        }
        _this.props.onChange(changedDate);
      };
      _this.toggleDropdown = function() {
        return _this.setState({
          dropdownVisible: !_this.state.dropdownVisible
        });
      };
      return _this;
    }
    MonthYearDropdown2.prototype.render = function() {
      var renderedDropdown;
      switch (this.props.dropdownMode) {
        case "scroll":
          renderedDropdown = this.renderScrollMode();
          break;
        case "select":
          renderedDropdown = this.renderSelectMode();
          break;
      }
      return import_react3.default.createElement("div", { className: "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(this.props.dropdownMode) }, renderedDropdown);
    };
    return MonthYearDropdown2;
  }(import_react3.Component)
);
var Time = (
  /** @class */
  function(_super) {
    __extends(Time2, _super);
    function Time2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.state = {
        height: null
      };
      _this.scrollToTheSelectedTime = function() {
        requestAnimationFrame(function() {
          var _a2, _b, _c;
          if (!_this.list)
            return;
          _this.list.scrollTop = (_c = _this.centerLi && Time2.calcCenterPosition(_this.props.monthRef ? _this.props.monthRef.clientHeight - ((_b = (_a2 = _this.header) === null || _a2 === void 0 ? void 0 : _a2.clientHeight) !== null && _b !== void 0 ? _b : 0) : _this.list.clientHeight, _this.centerLi)) !== null && _c !== void 0 ? _c : 0;
        });
      };
      _this.handleClick = function(time) {
        var _a2, _b;
        if ((_this.props.minTime || _this.props.maxTime) && isTimeInDisabledRange(time, _this.props) || (_this.props.excludeTimes || _this.props.includeTimes || _this.props.filterTime) && isTimeDisabled(time, _this.props)) {
          return;
        }
        (_b = (_a2 = _this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a2, time);
      };
      _this.isSelectedTime = function(time) {
        return _this.props.selected && isSameMinute(_this.props.selected, time);
      };
      _this.isDisabledTime = function(time) {
        return (_this.props.minTime || _this.props.maxTime) && isTimeInDisabledRange(time, _this.props) || (_this.props.excludeTimes || _this.props.includeTimes || _this.props.filterTime) && isTimeDisabled(time, _this.props);
      };
      _this.liClasses = function(time) {
        var _a2;
        var classes = [
          "react-datepicker__time-list-item",
          _this.props.timeClassName ? _this.props.timeClassName(time) : void 0
        ];
        if (_this.isSelectedTime(time)) {
          classes.push("react-datepicker__time-list-item--selected");
        }
        if (_this.isDisabledTime(time)) {
          classes.push("react-datepicker__time-list-item--disabled");
        }
        if (_this.props.injectTimes && (getHours(time) * 3600 + getMinutes(time) * 60 + getSeconds(time)) % (((_a2 = _this.props.intervals) !== null && _a2 !== void 0 ? _a2 : Time2.defaultProps.intervals) * 60) !== 0) {
          classes.push("react-datepicker__time-list-item--injected");
        }
        return classes.join(" ");
      };
      _this.handleOnKeyDown = function(event, time) {
        var _a2, _b;
        if (event.key === KeyType.Space) {
          event.preventDefault();
          event.key = KeyType.Enter;
        }
        if ((event.key === KeyType.ArrowUp || event.key === KeyType.ArrowLeft) && event.target instanceof HTMLElement && event.target.previousSibling) {
          event.preventDefault();
          event.target.previousSibling instanceof HTMLElement && event.target.previousSibling.focus();
        }
        if ((event.key === KeyType.ArrowDown || event.key === KeyType.ArrowRight) && event.target instanceof HTMLElement && event.target.nextSibling) {
          event.preventDefault();
          event.target.nextSibling instanceof HTMLElement && event.target.nextSibling.focus();
        }
        if (event.key === KeyType.Enter) {
          _this.handleClick(time);
        }
        (_b = (_a2 = _this.props).handleOnKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
      };
      _this.renderTimes = function() {
        var _a2;
        var times = [];
        var format2 = _this.props.format ? _this.props.format : "p";
        var intervals = (_a2 = _this.props.intervals) !== null && _a2 !== void 0 ? _a2 : Time2.defaultProps.intervals;
        var activeDate = _this.props.selected || _this.props.openToDate || newDate();
        var base = getStartOfDay(activeDate);
        var sortedInjectTimes = _this.props.injectTimes && _this.props.injectTimes.sort(function(a, b) {
          return a.getTime() - b.getTime();
        });
        var minutesInDay = 60 * getHoursInDay(activeDate);
        var multiplier = minutesInDay / intervals;
        for (var i = 0; i < multiplier; i++) {
          var currentTime = addMinutes(base, i * intervals);
          times.push(currentTime);
          if (sortedInjectTimes) {
            var timesToInject = timesToInjectAfter(base, currentTime, i, intervals, sortedInjectTimes);
            times = times.concat(timesToInject);
          }
        }
        var timeToFocus = times.reduce(function(prev, time) {
          if (time.getTime() <= activeDate.getTime()) {
            return time;
          }
          return prev;
        }, times[0]);
        return times.map(function(time) {
          return import_react3.default.createElement("li", { key: time.valueOf(), onClick: _this.handleClick.bind(_this, time), className: _this.liClasses(time), ref: function(li) {
            if (time === timeToFocus) {
              _this.centerLi = li;
            }
          }, onKeyDown: function(event) {
            _this.handleOnKeyDown(event, time);
          }, tabIndex: time === timeToFocus ? 0 : -1, role: "option", "aria-selected": _this.isSelectedTime(time) ? "true" : void 0, "aria-disabled": _this.isDisabledTime(time) ? "true" : void 0 }, formatDate(time, format2, _this.props.locale));
        });
      };
      return _this;
    }
    Object.defineProperty(Time2, "defaultProps", {
      get: function() {
        return {
          intervals: 30,
          todayButton: null,
          timeCaption: "Time"
        };
      },
      enumerable: false,
      configurable: true
    });
    Time2.prototype.componentDidMount = function() {
      this.scrollToTheSelectedTime();
      if (this.props.monthRef && this.header) {
        this.setState({
          height: this.props.monthRef.clientHeight - this.header.clientHeight
        });
      }
    };
    Time2.prototype.render = function() {
      var _this = this;
      var _a2;
      var height = this.state.height;
      return import_react3.default.createElement(
        "div",
        { className: "react-datepicker__time-container ".concat(((_a2 = this.props.todayButton) !== null && _a2 !== void 0 ? _a2 : Time2.defaultProps.todayButton) ? "react-datepicker__time-container--with-today-button" : "") },
        import_react3.default.createElement(
          "div",
          { className: "react-datepicker__header react-datepicker__header--time ".concat(this.props.showTimeSelectOnly ? "react-datepicker__header--time--only" : ""), ref: function(header) {
            _this.header = header;
          } },
          import_react3.default.createElement("div", { className: "react-datepicker-time__header" }, this.props.timeCaption)
        ),
        import_react3.default.createElement(
          "div",
          { className: "react-datepicker__time" },
          import_react3.default.createElement(
            "div",
            { className: "react-datepicker__time-box" },
            import_react3.default.createElement("ul", { className: "react-datepicker__time-list", ref: function(list) {
              _this.list = list;
            }, style: height ? { height } : {}, role: "listbox", "aria-label": this.props.timeCaption }, this.renderTimes())
          )
        )
      );
    };
    Time2.calcCenterPosition = function(listHeight, centerLiRef) {
      return centerLiRef.offsetTop - (listHeight / 2 - centerLiRef.clientHeight / 2);
    };
    return Time2;
  }(import_react3.Component)
);
var VERTICAL_NAVIGATION_OFFSET = 3;
var Year = (
  /** @class */
  function(_super) {
    __extends(Year2, _super);
    function Year2(props) {
      var _this = _super.call(this, props) || this;
      _this.YEAR_REFS = __spreadArray([], Array(_this.props.yearItemNumber), true).map(function() {
        return (0, import_react3.createRef)();
      });
      _this.isDisabled = function(date) {
        return isDayDisabled(date, {
          minDate: _this.props.minDate,
          maxDate: _this.props.maxDate,
          excludeDates: _this.props.excludeDates,
          includeDates: _this.props.includeDates,
          filterDate: _this.props.filterDate
        });
      };
      _this.isExcluded = function(date) {
        return isDayExcluded(date, {
          excludeDates: _this.props.excludeDates
        });
      };
      _this.selectingDate = function() {
        var _a2;
        return (_a2 = _this.props.selectingDate) !== null && _a2 !== void 0 ? _a2 : _this.props.preSelection;
      };
      _this.updateFocusOnPaginate = function(refIndex) {
        var waitForReRender = function() {
          var _a2, _b;
          (_b = (_a2 = _this.YEAR_REFS[refIndex]) === null || _a2 === void 0 ? void 0 : _a2.current) === null || _b === void 0 ? void 0 : _b.focus();
        };
        window.requestAnimationFrame(waitForReRender);
      };
      _this.handleYearClick = function(day, event) {
        if (_this.props.onDayClick) {
          _this.props.onDayClick(day, event);
        }
      };
      _this.handleYearNavigation = function(newYear, newDate2) {
        var _a2, _b, _c, _d;
        var _e = _this.props, date = _e.date, yearItemNumber = _e.yearItemNumber;
        if (date === void 0 || yearItemNumber === void 0) {
          return;
        }
        var startPeriod = getYearsPeriod(date, yearItemNumber).startPeriod;
        if (_this.isDisabled(newDate2) || _this.isExcluded(newDate2)) {
          return;
        }
        (_b = (_a2 = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a2, newDate2);
        if (newYear - startPeriod < 0) {
          _this.updateFocusOnPaginate(yearItemNumber - (startPeriod - newYear));
        } else if (newYear - startPeriod >= yearItemNumber) {
          _this.updateFocusOnPaginate(Math.abs(yearItemNumber - (newYear - startPeriod)));
        } else
          (_d = (_c = _this.YEAR_REFS[newYear - startPeriod]) === null || _c === void 0 ? void 0 : _c.current) === null || _d === void 0 ? void 0 : _d.focus();
      };
      _this.isSameDay = function(y, other) {
        return isSameDay2(y, other);
      };
      _this.isCurrentYear = function(y) {
        return y === getYear(newDate());
      };
      _this.isRangeStart = function(y) {
        return _this.props.startDate && _this.props.endDate && isSameYear2(setYear(newDate(), y), _this.props.startDate);
      };
      _this.isRangeEnd = function(y) {
        return _this.props.startDate && _this.props.endDate && isSameYear2(setYear(newDate(), y), _this.props.endDate);
      };
      _this.isInRange = function(y) {
        return isYearInRange(y, _this.props.startDate, _this.props.endDate);
      };
      _this.isInSelectingRange = function(y) {
        var _a2 = _this.props, selectsStart = _a2.selectsStart, selectsEnd = _a2.selectsEnd, selectsRange = _a2.selectsRange, startDate = _a2.startDate, endDate = _a2.endDate;
        if (!(selectsStart || selectsEnd || selectsRange) || !_this.selectingDate()) {
          return false;
        }
        if (selectsStart && endDate) {
          return isYearInRange(y, _this.selectingDate(), endDate);
        }
        if (selectsEnd && startDate) {
          return isYearInRange(y, startDate, _this.selectingDate());
        }
        if (selectsRange && startDate && !endDate) {
          return isYearInRange(y, startDate, _this.selectingDate());
        }
        return false;
      };
      _this.isSelectingRangeStart = function(y) {
        var _a2;
        if (!_this.isInSelectingRange(y)) {
          return false;
        }
        var _b = _this.props, startDate = _b.startDate, selectsStart = _b.selectsStart;
        var _year = setYear(newDate(), y);
        if (selectsStart) {
          return isSameYear2(_year, (_a2 = _this.selectingDate()) !== null && _a2 !== void 0 ? _a2 : null);
        }
        return isSameYear2(_year, startDate !== null && startDate !== void 0 ? startDate : null);
      };
      _this.isSelectingRangeEnd = function(y) {
        var _a2;
        if (!_this.isInSelectingRange(y)) {
          return false;
        }
        var _b = _this.props, endDate = _b.endDate, selectsEnd = _b.selectsEnd, selectsRange = _b.selectsRange;
        var _year = setYear(newDate(), y);
        if (selectsEnd || selectsRange) {
          return isSameYear2(_year, (_a2 = _this.selectingDate()) !== null && _a2 !== void 0 ? _a2 : null);
        }
        return isSameYear2(_year, endDate !== null && endDate !== void 0 ? endDate : null);
      };
      _this.isKeyboardSelected = function(y) {
        if (_this.props.date === void 0 || _this.props.selected == null || _this.props.preSelection == null) {
          return;
        }
        var date = getStartOfYear(setYear(_this.props.date, y));
        return !_this.props.disabledKeyboardNavigation && !_this.props.inline && !isSameDay2(date, getStartOfYear(_this.props.selected)) && isSameDay2(date, getStartOfYear(_this.props.preSelection));
      };
      _this.onYearClick = function(event, y) {
        var date = _this.props.date;
        if (date === void 0) {
          return;
        }
        _this.handleYearClick(getStartOfYear(setYear(date, y)), event);
      };
      _this.onYearKeyDown = function(event, y) {
        var _a2, _b;
        var key = event.key;
        var _c = _this.props, date = _c.date, yearItemNumber = _c.yearItemNumber, handleOnKeyDown = _c.handleOnKeyDown;
        if (key !== KeyType.Tab) {
          event.preventDefault();
        }
        if (!_this.props.disabledKeyboardNavigation) {
          switch (key) {
            case KeyType.Enter:
              if (_this.props.selected == null) {
                break;
              }
              _this.onYearClick(event, y);
              (_b = (_a2 = _this.props).setPreSelection) === null || _b === void 0 ? void 0 : _b.call(_a2, _this.props.selected);
              break;
            case KeyType.ArrowRight:
              if (_this.props.preSelection == null) {
                break;
              }
              _this.handleYearNavigation(y + 1, addYears(_this.props.preSelection, 1));
              break;
            case KeyType.ArrowLeft:
              if (_this.props.preSelection == null) {
                break;
              }
              _this.handleYearNavigation(y - 1, subYears(_this.props.preSelection, 1));
              break;
            case KeyType.ArrowUp: {
              if (date === void 0 || yearItemNumber === void 0 || _this.props.preSelection == null) {
                break;
              }
              var startPeriod = getYearsPeriod(date, yearItemNumber).startPeriod;
              var offset2 = VERTICAL_NAVIGATION_OFFSET;
              var newYear = y - offset2;
              if (newYear < startPeriod) {
                var leftOverOffset = yearItemNumber % offset2;
                if (y >= startPeriod && y < startPeriod + leftOverOffset) {
                  offset2 = leftOverOffset;
                } else {
                  offset2 += leftOverOffset;
                }
                newYear = y - offset2;
              }
              _this.handleYearNavigation(newYear, subYears(_this.props.preSelection, offset2));
              break;
            }
            case KeyType.ArrowDown: {
              if (date === void 0 || yearItemNumber === void 0 || _this.props.preSelection == null) {
                break;
              }
              var endPeriod = getYearsPeriod(date, yearItemNumber).endPeriod;
              var offset2 = VERTICAL_NAVIGATION_OFFSET;
              var newYear = y + offset2;
              if (newYear > endPeriod) {
                var leftOverOffset = yearItemNumber % offset2;
                if (y <= endPeriod && y > endPeriod - leftOverOffset) {
                  offset2 = leftOverOffset;
                } else {
                  offset2 += leftOverOffset;
                }
                newYear = y + offset2;
              }
              _this.handleYearNavigation(newYear, addYears(_this.props.preSelection, offset2));
              break;
            }
          }
        }
        handleOnKeyDown && handleOnKeyDown(event);
      };
      _this.getYearClassNames = function(y) {
        var _a2 = _this.props, date = _a2.date, minDate = _a2.minDate, maxDate = _a2.maxDate, selected = _a2.selected, excludeDates = _a2.excludeDates, includeDates = _a2.includeDates, filterDate = _a2.filterDate, yearClassName = _a2.yearClassName;
        return clsx("react-datepicker__year-text", "react-datepicker__year-".concat(y), date ? yearClassName === null || yearClassName === void 0 ? void 0 : yearClassName(setYear(date, y)) : void 0, {
          "react-datepicker__year-text--selected": selected ? y === getYear(selected) : void 0,
          "react-datepicker__year-text--disabled": (minDate || maxDate || excludeDates || includeDates || filterDate) && isYearDisabled(y, _this.props),
          "react-datepicker__year-text--keyboard-selected": _this.isKeyboardSelected(y),
          "react-datepicker__year-text--range-start": _this.isRangeStart(y),
          "react-datepicker__year-text--range-end": _this.isRangeEnd(y),
          "react-datepicker__year-text--in-range": _this.isInRange(y),
          "react-datepicker__year-text--in-selecting-range": _this.isInSelectingRange(y),
          "react-datepicker__year-text--selecting-range-start": _this.isSelectingRangeStart(y),
          "react-datepicker__year-text--selecting-range-end": _this.isSelectingRangeEnd(y),
          "react-datepicker__year-text--today": _this.isCurrentYear(y)
        });
      };
      _this.getYearTabIndex = function(y) {
        if (_this.props.disabledKeyboardNavigation || _this.props.preSelection == null) {
          return "-1";
        }
        var preSelected = getYear(_this.props.preSelection);
        return y === preSelected ? "0" : "-1";
      };
      _this.getYearContainerClassNames = function() {
        var _a2 = _this.props, selectingDate = _a2.selectingDate, selectsStart = _a2.selectsStart, selectsEnd = _a2.selectsEnd, selectsRange = _a2.selectsRange;
        return clsx("react-datepicker__year", {
          "react-datepicker__year--selecting-range": selectingDate && (selectsStart || selectsEnd || selectsRange)
        });
      };
      _this.getYearContent = function(y) {
        return _this.props.renderYearContent ? _this.props.renderYearContent(y) : y;
      };
      return _this;
    }
    Year2.prototype.render = function() {
      var _this = this;
      var yearsList = [];
      var _a2 = this.props, date = _a2.date, yearItemNumber = _a2.yearItemNumber, onYearMouseEnter = _a2.onYearMouseEnter, onYearMouseLeave = _a2.onYearMouseLeave;
      if (date === void 0) {
        return null;
      }
      var _b = getYearsPeriod(date, yearItemNumber), startPeriod = _b.startPeriod, endPeriod = _b.endPeriod;
      var _loop_1 = function(y2) {
        yearsList.push(import_react3.default.createElement("div", { ref: this_1.YEAR_REFS[y2 - startPeriod], onClick: function(event) {
          _this.onYearClick(event, y2);
        }, onKeyDown: function(event) {
          if (isSpaceKeyDown(event)) {
            event.preventDefault();
            event.key = KeyType.Enter;
          }
          _this.onYearKeyDown(event, y2);
        }, tabIndex: Number(this_1.getYearTabIndex(y2)), className: this_1.getYearClassNames(y2), onMouseEnter: !this_1.props.usePointerEvent ? function(event) {
          return onYearMouseEnter(event, y2);
        } : void 0, onPointerEnter: this_1.props.usePointerEvent ? function(event) {
          return onYearMouseEnter(event, y2);
        } : void 0, onMouseLeave: !this_1.props.usePointerEvent ? function(event) {
          return onYearMouseLeave(event, y2);
        } : void 0, onPointerLeave: this_1.props.usePointerEvent ? function(event) {
          return onYearMouseLeave(event, y2);
        } : void 0, key: y2, "aria-current": this_1.isCurrentYear(y2) ? "date" : void 0 }, this_1.getYearContent(y2)));
      };
      var this_1 = this;
      for (var y = startPeriod; y <= endPeriod; y++) {
        _loop_1(y);
      }
      return import_react3.default.createElement(
        "div",
        { className: this.getYearContainerClassNames() },
        import_react3.default.createElement("div", { className: "react-datepicker__year-wrapper", onMouseLeave: !this.props.usePointerEvent ? this.props.clearSelectingDate : void 0, onPointerLeave: this.props.usePointerEvent ? this.props.clearSelectingDate : void 0 }, yearsList)
      );
    };
    return Year2;
  }(import_react3.Component)
);
function generateYears(year, noOfYear, minDate, maxDate) {
  var list = [];
  for (var i = 0; i < 2 * noOfYear + 1; i++) {
    var newYear = year + noOfYear - i;
    var isInRange = true;
    if (minDate) {
      isInRange = getYear(minDate) <= newYear;
    }
    if (maxDate && isInRange) {
      isInRange = getYear(maxDate) >= newYear;
    }
    if (isInRange) {
      list.push(newYear);
    }
  }
  return list;
}
var YearDropdownOptions = (
  /** @class */
  function(_super) {
    __extends(YearDropdownOptions2, _super);
    function YearDropdownOptions2(props) {
      var _this = _super.call(this, props) || this;
      _this.renderOptions = function() {
        var selectedYear = _this.props.year;
        var options = _this.state.yearsList.map(function(year) {
          return import_react3.default.createElement(
            "div",
            { className: selectedYear === year ? "react-datepicker__year-option react-datepicker__year-option--selected_year" : "react-datepicker__year-option", key: year, onClick: _this.onChange.bind(_this, year), "aria-selected": selectedYear === year ? "true" : void 0 },
            selectedYear === year ? import_react3.default.createElement("span", { className: "react-datepicker__year-option--selected" }, "✓") : "",
            year
          );
        });
        var minYear = _this.props.minDate ? getYear(_this.props.minDate) : null;
        var maxYear = _this.props.maxDate ? getYear(_this.props.maxDate) : null;
        if (!maxYear || !_this.state.yearsList.find(function(year) {
          return year === maxYear;
        })) {
          options.unshift(import_react3.default.createElement(
            "div",
            { className: "react-datepicker__year-option", key: "upcoming", onClick: _this.incrementYears },
            import_react3.default.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" })
          ));
        }
        if (!minYear || !_this.state.yearsList.find(function(year) {
          return year === minYear;
        })) {
          options.push(import_react3.default.createElement(
            "div",
            { className: "react-datepicker__year-option", key: "previous", onClick: _this.decrementYears },
            import_react3.default.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous" })
          ));
        }
        return options;
      };
      _this.onChange = function(year) {
        _this.props.onChange(year);
      };
      _this.handleClickOutside = function() {
        _this.props.onCancel();
      };
      _this.shiftYears = function(amount) {
        var years = _this.state.yearsList.map(function(year) {
          return year + amount;
        });
        _this.setState({
          yearsList: years
        });
      };
      _this.incrementYears = function() {
        return _this.shiftYears(1);
      };
      _this.decrementYears = function() {
        return _this.shiftYears(-1);
      };
      var yearDropdownItemNumber = props.yearDropdownItemNumber, scrollableYearDropdown = props.scrollableYearDropdown;
      var noOfYear = yearDropdownItemNumber || (scrollableYearDropdown ? 10 : 5);
      _this.state = {
        yearsList: generateYears(_this.props.year, noOfYear, _this.props.minDate, _this.props.maxDate)
      };
      _this.dropdownRef = (0, import_react3.createRef)();
      return _this;
    }
    YearDropdownOptions2.prototype.componentDidMount = function() {
      var dropdownCurrent = this.dropdownRef.current;
      if (dropdownCurrent) {
        var dropdownCurrentChildren = dropdownCurrent.children ? Array.from(dropdownCurrent.children) : null;
        var selectedYearOptionEl = dropdownCurrentChildren ? dropdownCurrentChildren.find(function(childEl) {
          return childEl.ariaSelected;
        }) : null;
        dropdownCurrent.scrollTop = selectedYearOptionEl && selectedYearOptionEl instanceof HTMLElement ? selectedYearOptionEl.offsetTop + (selectedYearOptionEl.clientHeight - dropdownCurrent.clientHeight) / 2 : (dropdownCurrent.scrollHeight - dropdownCurrent.clientHeight) / 2;
      }
    };
    YearDropdownOptions2.prototype.render = function() {
      var dropdownClass = clsx({
        "react-datepicker__year-dropdown": true,
        "react-datepicker__year-dropdown--scrollable": this.props.scrollableYearDropdown
      });
      return import_react3.default.createElement("div", { className: dropdownClass, ref: this.dropdownRef }, this.renderOptions());
    };
    return YearDropdownOptions2;
  }(import_react3.Component)
);
var WrappedYearDropdownOptions = react_onclickoutside_es_default(YearDropdownOptions);
var YearDropdown = (
  /** @class */
  function(_super) {
    __extends(YearDropdown2, _super);
    function YearDropdown2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.state = {
        dropdownVisible: false
      };
      _this.renderSelectOptions = function() {
        var minYear = _this.props.minDate ? getYear(_this.props.minDate) : 1900;
        var maxYear = _this.props.maxDate ? getYear(_this.props.maxDate) : 2100;
        var options = [];
        for (var i = minYear; i <= maxYear; i++) {
          options.push(import_react3.default.createElement("option", { key: i, value: i }, i));
        }
        return options;
      };
      _this.onSelectChange = function(event) {
        _this.onChange(parseInt(event.target.value));
      };
      _this.renderSelectMode = function() {
        return import_react3.default.createElement("select", { value: _this.props.year, className: "react-datepicker__year-select", onChange: _this.onSelectChange }, _this.renderSelectOptions());
      };
      _this.renderReadView = function(visible) {
        return import_react3.default.createElement(
          "div",
          { key: "read", style: { visibility: visible ? "visible" : "hidden" }, className: "react-datepicker__year-read-view", onClick: function(event) {
            return _this.toggleDropdown(event);
          } },
          import_react3.default.createElement("span", { className: "react-datepicker__year-read-view--down-arrow" }),
          import_react3.default.createElement("span", { className: "react-datepicker__year-read-view--selected-year" }, _this.props.year)
        );
      };
      _this.renderDropdown = function() {
        return import_react3.default.createElement(WrappedYearDropdownOptions, _assign({ key: "dropdown" }, _this.props, { onChange: _this.onChange, onCancel: _this.toggleDropdown }));
      };
      _this.renderScrollMode = function() {
        var dropdownVisible = _this.state.dropdownVisible;
        var result = [_this.renderReadView(!dropdownVisible)];
        if (dropdownVisible) {
          result.unshift(_this.renderDropdown());
        }
        return result;
      };
      _this.onChange = function(year) {
        _this.toggleDropdown();
        if (year === _this.props.year)
          return;
        _this.props.onChange(year);
      };
      _this.toggleDropdown = function(event) {
        _this.setState({
          dropdownVisible: !_this.state.dropdownVisible
        }, function() {
          if (_this.props.adjustDateOnChange) {
            _this.handleYearChange(_this.props.date, event);
          }
        });
      };
      _this.handleYearChange = function(date, event) {
        _this.onSelect(date, event);
        _this.setOpen();
      };
      _this.onSelect = function(date, event) {
        if (_this.props.onSelect) {
          _this.props.onSelect(date, event);
        }
      };
      _this.setOpen = function() {
        if (_this.props.setOpen) {
          _this.props.setOpen(true);
        }
      };
      return _this;
    }
    YearDropdown2.prototype.render = function() {
      var renderedDropdown;
      switch (this.props.dropdownMode) {
        case "scroll":
          renderedDropdown = this.renderScrollMode();
          break;
        case "select":
          renderedDropdown = this.renderSelectMode();
          break;
      }
      return import_react3.default.createElement("div", { className: "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(this.props.dropdownMode) }, renderedDropdown);
    };
    return YearDropdown2;
  }(import_react3.Component)
);
var DROPDOWN_FOCUS_CLASSNAMES = [
  "react-datepicker__year-select",
  "react-datepicker__month-select",
  "react-datepicker__month-year-select"
];
var isDropdownSelect = function(element) {
  var classNames = (element.className || "").split(/\s+/);
  return DROPDOWN_FOCUS_CLASSNAMES.some(function(testClassname) {
    return classNames.indexOf(testClassname) >= 0;
  });
};
var Calendar = (
  /** @class */
  function(_super) {
    __extends(Calendar2, _super);
    function Calendar2(props) {
      var _this = _super.call(this, props) || this;
      _this.monthContainer = void 0;
      _this.handleClickOutside = function(event) {
        _this.props.onClickOutside(event);
      };
      _this.setClickOutsideRef = function() {
        return _this.containerRef.current;
      };
      _this.handleDropdownFocus = function(event) {
        var _a2, _b;
        if (isDropdownSelect(event.target)) {
          (_b = (_a2 = _this.props).onDropdownFocus) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
        }
      };
      _this.getDateInView = function() {
        var _a2 = _this.props, preSelection = _a2.preSelection, selected = _a2.selected, openToDate = _a2.openToDate;
        var minDate = getEffectiveMinDate(_this.props);
        var maxDate = getEffectiveMaxDate(_this.props);
        var current = newDate();
        var initialDate = openToDate || selected || preSelection;
        if (initialDate) {
          return initialDate;
        } else {
          if (minDate && isBefore(current, minDate)) {
            return minDate;
          } else if (maxDate && isAfter(current, maxDate)) {
            return maxDate;
          }
        }
        return current;
      };
      _this.increaseMonth = function() {
        _this.setState(function(_a2) {
          var date = _a2.date;
          return {
            date: addMonths(date, 1)
          };
        }, function() {
          return _this.handleMonthChange(_this.state.date);
        });
      };
      _this.decreaseMonth = function() {
        _this.setState(function(_a2) {
          var date = _a2.date;
          return {
            date: subMonths(date, 1)
          };
        }, function() {
          return _this.handleMonthChange(_this.state.date);
        });
      };
      _this.handleDayClick = function(day, event, monthSelectedIn) {
        _this.props.onSelect(day, event, monthSelectedIn);
        _this.props.setPreSelection && _this.props.setPreSelection(day);
      };
      _this.handleDayMouseEnter = function(day) {
        _this.setState({ selectingDate: day });
        _this.props.onDayMouseEnter && _this.props.onDayMouseEnter(day);
      };
      _this.handleMonthMouseLeave = function() {
        _this.setState({ selectingDate: void 0 });
        _this.props.onMonthMouseLeave && _this.props.onMonthMouseLeave();
      };
      _this.handleYearMouseEnter = function(event, year) {
        _this.setState({ selectingDate: setYear(newDate(), year) });
        !!_this.props.onYearMouseEnter && _this.props.onYearMouseEnter(event, year);
      };
      _this.handleYearMouseLeave = function(event, year) {
        !!_this.props.onYearMouseLeave && _this.props.onYearMouseLeave(event, year);
      };
      _this.handleYearChange = function(date) {
        if (_this.props.onYearChange) {
          _this.props.onYearChange(date);
          _this.setState({ isRenderAriaLiveMessage: true });
        }
        if (_this.props.adjustDateOnChange) {
          if (_this.props.onSelect) {
            _this.props.onSelect(date);
          }
          if (_this.props.setOpen) {
            _this.props.setOpen(true);
          }
        }
        _this.props.setPreSelection && _this.props.setPreSelection(date);
      };
      _this.handleMonthChange = function(date) {
        _this.handleCustomMonthChange(date);
        if (_this.props.adjustDateOnChange) {
          if (_this.props.onSelect) {
            _this.props.onSelect(date);
          }
          if (_this.props.setOpen) {
            _this.props.setOpen(true);
          }
        }
        _this.props.setPreSelection && _this.props.setPreSelection(date);
      };
      _this.handleCustomMonthChange = function(date) {
        if (_this.props.onMonthChange) {
          _this.props.onMonthChange(date);
          _this.setState({ isRenderAriaLiveMessage: true });
        }
      };
      _this.handleMonthYearChange = function(date) {
        _this.handleYearChange(date);
        _this.handleMonthChange(date);
      };
      _this.changeYear = function(year) {
        _this.setState(function(_a2) {
          var date = _a2.date;
          return {
            date: setYear(date, Number(year))
          };
        }, function() {
          return _this.handleYearChange(_this.state.date);
        });
      };
      _this.changeMonth = function(month) {
        _this.setState(function(_a2) {
          var date = _a2.date;
          return {
            date: setMonth(date, Number(month))
          };
        }, function() {
          return _this.handleMonthChange(_this.state.date);
        });
      };
      _this.changeMonthYear = function(monthYear) {
        _this.setState(function(_a2) {
          var date = _a2.date;
          return {
            date: setYear(setMonth(date, getMonth(monthYear)), getYear(monthYear))
          };
        }, function() {
          return _this.handleMonthYearChange(_this.state.date);
        });
      };
      _this.header = function(date) {
        if (date === void 0) {
          date = _this.state.date;
        }
        var startOfWeek2 = getStartOfWeek(date, _this.props.locale, _this.props.calendarStartDay);
        var dayNames = [];
        if (_this.props.showWeekNumbers) {
          dayNames.push(import_react3.default.createElement("div", { key: "W", className: "react-datepicker__day-name" }, _this.props.weekLabel || "#"));
        }
        return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function(offset2) {
          var day = addDays(startOfWeek2, offset2);
          var weekDayName = _this.formatWeekday(day, _this.props.locale);
          var weekDayClassName = _this.props.weekDayClassName ? _this.props.weekDayClassName(day) : void 0;
          return import_react3.default.createElement("div", { key: offset2, "aria-label": formatDate(day, "EEEE", _this.props.locale), className: clsx("react-datepicker__day-name", weekDayClassName) }, weekDayName);
        }));
      };
      _this.formatWeekday = function(day, locale) {
        if (_this.props.formatWeekDay) {
          return getFormattedWeekdayInLocale(day, _this.props.formatWeekDay, locale);
        }
        return _this.props.useWeekdaysShort ? getWeekdayShortInLocale(day, locale) : getWeekdayMinInLocale(day, locale);
      };
      _this.decreaseYear = function() {
        _this.setState(function(_a2) {
          var _b;
          var date = _a2.date;
          return {
            date: subYears(date, _this.props.showYearPicker ? (_b = _this.props.yearItemNumber) !== null && _b !== void 0 ? _b : Calendar2.defaultProps.yearItemNumber : 1)
          };
        }, function() {
          return _this.handleYearChange(_this.state.date);
        });
      };
      _this.clearSelectingDate = function() {
        _this.setState({ selectingDate: void 0 });
      };
      _this.renderPreviousButton = function() {
        var _a2;
        if (_this.props.renderCustomHeader) {
          return;
        }
        var allPrevDaysDisabled;
        switch (true) {
          case _this.props.showMonthYearPicker:
            allPrevDaysDisabled = yearDisabledBefore(_this.state.date, _this.props);
            break;
          case _this.props.showYearPicker:
            allPrevDaysDisabled = yearsDisabledBefore(_this.state.date, _this.props);
            break;
          case _this.props.showQuarterYearPicker:
            allPrevDaysDisabled = quarterDisabledBefore(_this.state.date, _this.props);
            break;
          default:
            allPrevDaysDisabled = monthDisabledBefore(_this.state.date, _this.props);
            break;
        }
        if (!((_a2 = _this.props.forceShowMonthNavigation) !== null && _a2 !== void 0 ? _a2 : Calendar2.defaultProps.forceShowMonthNavigation) && !_this.props.showDisabledMonthNavigation && allPrevDaysDisabled || _this.props.showTimeSelectOnly) {
          return;
        }
        var iconClasses = [
          "react-datepicker__navigation-icon",
          "react-datepicker__navigation-icon--previous"
        ];
        var classes = [
          "react-datepicker__navigation",
          "react-datepicker__navigation--previous"
        ];
        var clickHandler = _this.decreaseMonth;
        if (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker) {
          clickHandler = _this.decreaseYear;
        }
        if (allPrevDaysDisabled && _this.props.showDisabledMonthNavigation) {
          classes.push("react-datepicker__navigation--previous--disabled");
          clickHandler = void 0;
        }
        var isForYear = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker;
        var _b = _this.props, _c = _b.previousMonthButtonLabel, previousMonthButtonLabel = _c === void 0 ? Calendar2.defaultProps.previousMonthButtonLabel : _c, _d = _b.previousYearButtonLabel, previousYearButtonLabel = _d === void 0 ? Calendar2.defaultProps.previousYearButtonLabel : _d;
        var _e = _this.props, _f = _e.previousMonthAriaLabel, previousMonthAriaLabel = _f === void 0 ? typeof previousMonthButtonLabel === "string" ? previousMonthButtonLabel : "Previous Month" : _f, _g = _e.previousYearAriaLabel, previousYearAriaLabel = _g === void 0 ? typeof previousYearButtonLabel === "string" ? previousYearButtonLabel : "Previous Year" : _g;
        return import_react3.default.createElement(
          "button",
          { type: "button", className: classes.join(" "), onClick: clickHandler, onKeyDown: _this.props.handleOnKeyDown, "aria-label": isForYear ? previousYearAriaLabel : previousMonthAriaLabel },
          import_react3.default.createElement("span", { className: iconClasses.join(" ") }, isForYear ? previousYearButtonLabel : previousMonthButtonLabel)
        );
      };
      _this.increaseYear = function() {
        _this.setState(function(_a2) {
          var _b;
          var date = _a2.date;
          return {
            date: addYears(date, _this.props.showYearPicker ? (_b = _this.props.yearItemNumber) !== null && _b !== void 0 ? _b : Calendar2.defaultProps.yearItemNumber : 1)
          };
        }, function() {
          return _this.handleYearChange(_this.state.date);
        });
      };
      _this.renderNextButton = function() {
        var _a2;
        if (_this.props.renderCustomHeader) {
          return;
        }
        var allNextDaysDisabled;
        switch (true) {
          case _this.props.showMonthYearPicker:
            allNextDaysDisabled = yearDisabledAfter(_this.state.date, _this.props);
            break;
          case _this.props.showYearPicker:
            allNextDaysDisabled = yearsDisabledAfter(_this.state.date, _this.props);
            break;
          case _this.props.showQuarterYearPicker:
            allNextDaysDisabled = quarterDisabledAfter(_this.state.date, _this.props);
            break;
          default:
            allNextDaysDisabled = monthDisabledAfter(_this.state.date, _this.props);
            break;
        }
        if (!((_a2 = _this.props.forceShowMonthNavigation) !== null && _a2 !== void 0 ? _a2 : Calendar2.defaultProps.forceShowMonthNavigation) && !_this.props.showDisabledMonthNavigation && allNextDaysDisabled || _this.props.showTimeSelectOnly) {
          return;
        }
        var classes = [
          "react-datepicker__navigation",
          "react-datepicker__navigation--next"
        ];
        var iconClasses = [
          "react-datepicker__navigation-icon",
          "react-datepicker__navigation-icon--next"
        ];
        if (_this.props.showTimeSelect) {
          classes.push("react-datepicker__navigation--next--with-time");
        }
        if (_this.props.todayButton) {
          classes.push("react-datepicker__navigation--next--with-today-button");
        }
        var clickHandler = _this.increaseMonth;
        if (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker) {
          clickHandler = _this.increaseYear;
        }
        if (allNextDaysDisabled && _this.props.showDisabledMonthNavigation) {
          classes.push("react-datepicker__navigation--next--disabled");
          clickHandler = void 0;
        }
        var isForYear = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker;
        var _b = _this.props, _c = _b.nextMonthButtonLabel, nextMonthButtonLabel = _c === void 0 ? Calendar2.defaultProps.nextMonthButtonLabel : _c, _d = _b.nextYearButtonLabel, nextYearButtonLabel = _d === void 0 ? Calendar2.defaultProps.nextYearButtonLabel : _d;
        var _e = _this.props, _f = _e.nextMonthAriaLabel, nextMonthAriaLabel = _f === void 0 ? typeof nextMonthButtonLabel === "string" ? nextMonthButtonLabel : "Next Month" : _f, _g = _e.nextYearAriaLabel, nextYearAriaLabel = _g === void 0 ? typeof nextYearButtonLabel === "string" ? nextYearButtonLabel : "Next Year" : _g;
        return import_react3.default.createElement(
          "button",
          { type: "button", className: classes.join(" "), onClick: clickHandler, onKeyDown: _this.props.handleOnKeyDown, "aria-label": isForYear ? nextYearAriaLabel : nextMonthAriaLabel },
          import_react3.default.createElement("span", { className: iconClasses.join(" ") }, isForYear ? nextYearButtonLabel : nextMonthButtonLabel)
        );
      };
      _this.renderCurrentMonth = function(date) {
        if (date === void 0) {
          date = _this.state.date;
        }
        var classes = ["react-datepicker__current-month"];
        if (_this.props.showYearDropdown) {
          classes.push("react-datepicker__current-month--hasYearDropdown");
        }
        if (_this.props.showMonthDropdown) {
          classes.push("react-datepicker__current-month--hasMonthDropdown");
        }
        if (_this.props.showMonthYearDropdown) {
          classes.push("react-datepicker__current-month--hasMonthYearDropdown");
        }
        return import_react3.default.createElement("h2", { className: classes.join(" ") }, formatDate(date, _this.props.dateFormat, _this.props.locale));
      };
      _this.renderYearDropdown = function(overrideHide) {
        if (overrideHide === void 0) {
          overrideHide = false;
        }
        if (!_this.props.showYearDropdown || overrideHide) {
          return;
        }
        return import_react3.default.createElement(YearDropdown, _assign({}, Calendar2.defaultProps, _this.props, { date: _this.state.date, onChange: _this.changeYear, year: getYear(_this.state.date) }));
      };
      _this.renderMonthDropdown = function(overrideHide) {
        if (overrideHide === void 0) {
          overrideHide = false;
        }
        if (!_this.props.showMonthDropdown || overrideHide) {
          return;
        }
        return import_react3.default.createElement(MonthDropdown, _assign({}, Calendar2.defaultProps, _this.props, { month: getMonth(_this.state.date), onChange: _this.changeMonth }));
      };
      _this.renderMonthYearDropdown = function(overrideHide) {
        if (overrideHide === void 0) {
          overrideHide = false;
        }
        if (!_this.props.showMonthYearDropdown || overrideHide) {
          return;
        }
        return import_react3.default.createElement(MonthYearDropdown, _assign({}, Calendar2.defaultProps, _this.props, { date: _this.state.date, onChange: _this.changeMonthYear }));
      };
      _this.handleTodayButtonClick = function(event) {
        _this.props.onSelect(getStartOfToday(), event);
        _this.props.setPreSelection && _this.props.setPreSelection(getStartOfToday());
      };
      _this.renderTodayButton = function() {
        if (!_this.props.todayButton || _this.props.showTimeSelectOnly) {
          return;
        }
        return import_react3.default.createElement("div", { className: "react-datepicker__today-button", onClick: _this.handleTodayButtonClick }, _this.props.todayButton);
      };
      _this.renderDefaultHeader = function(_a2) {
        var monthDate = _a2.monthDate, i = _a2.i;
        return import_react3.default.createElement(
          "div",
          { className: "react-datepicker__header ".concat(_this.props.showTimeSelect ? "react-datepicker__header--has-time-select" : "") },
          _this.renderCurrentMonth(monthDate),
          import_react3.default.createElement(
            "div",
            { className: "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(_this.props.dropdownMode), onFocus: _this.handleDropdownFocus },
            _this.renderMonthDropdown(i !== 0),
            _this.renderMonthYearDropdown(i !== 0),
            _this.renderYearDropdown(i !== 0)
          ),
          import_react3.default.createElement("div", { className: "react-datepicker__day-names" }, _this.header(monthDate))
        );
      };
      _this.renderCustomHeader = function(headerArgs) {
        var _a2, _b;
        var monthDate = headerArgs.monthDate, i = headerArgs.i;
        if (_this.props.showTimeSelect && !_this.state.monthContainer || _this.props.showTimeSelectOnly) {
          return null;
        }
        var prevMonthButtonDisabled = monthDisabledBefore(_this.state.date, _this.props);
        var nextMonthButtonDisabled = monthDisabledAfter(_this.state.date, _this.props);
        var prevYearButtonDisabled = yearDisabledBefore(_this.state.date, _this.props);
        var nextYearButtonDisabled = yearDisabledAfter(_this.state.date, _this.props);
        var showDayNames = !_this.props.showMonthYearPicker && !_this.props.showQuarterYearPicker && !_this.props.showYearPicker;
        return import_react3.default.createElement(
          "div",
          { className: "react-datepicker__header react-datepicker__header--custom", onFocus: _this.props.onDropdownFocus },
          (_b = (_a2 = _this.props).renderCustomHeader) === null || _b === void 0 ? void 0 : _b.call(_a2, _assign(_assign({}, _this.state), { customHeaderCount: i, monthDate, changeMonth: _this.changeMonth, changeYear: _this.changeYear, decreaseMonth: _this.decreaseMonth, increaseMonth: _this.increaseMonth, decreaseYear: _this.decreaseYear, increaseYear: _this.increaseYear, prevMonthButtonDisabled, nextMonthButtonDisabled, prevYearButtonDisabled, nextYearButtonDisabled })),
          showDayNames && import_react3.default.createElement("div", { className: "react-datepicker__day-names" }, _this.header(monthDate))
        );
      };
      _this.renderYearHeader = function(_a2) {
        var monthDate = _a2.monthDate;
        var _b = _this.props, showYearPicker = _b.showYearPicker, _c = _b.yearItemNumber, yearItemNumber = _c === void 0 ? Calendar2.defaultProps.yearItemNumber : _c;
        var _d = getYearsPeriod(monthDate, yearItemNumber), startPeriod = _d.startPeriod, endPeriod = _d.endPeriod;
        return import_react3.default.createElement("div", { className: "react-datepicker__header react-datepicker-year-header" }, showYearPicker ? "".concat(startPeriod, " - ").concat(endPeriod) : getYear(monthDate));
      };
      _this.renderHeader = function(_a2) {
        var monthDate = _a2.monthDate, _b = _a2.i, i = _b === void 0 ? 0 : _b;
        var headerArgs = { monthDate, i };
        switch (true) {
          case _this.props.renderCustomHeader !== void 0:
            return _this.renderCustomHeader(headerArgs);
          case (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker || _this.props.showYearPicker):
            return _this.renderYearHeader(headerArgs);
          default:
            return _this.renderDefaultHeader(headerArgs);
        }
      };
      _this.renderMonths = function() {
        var _a2, _b;
        if (_this.props.showTimeSelectOnly || _this.props.showYearPicker) {
          return;
        }
        var monthList = [];
        var monthsShown = (_a2 = _this.props.monthsShown) !== null && _a2 !== void 0 ? _a2 : Calendar2.defaultProps.monthsShown;
        var monthsToSubtract = _this.props.showPreviousMonths ? monthsShown - 1 : 0;
        var fromMonthDate = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker ? addYears(_this.state.date, monthsToSubtract) : subMonths(_this.state.date, monthsToSubtract);
        var monthSelectedIn = (_b = _this.props.monthSelectedIn) !== null && _b !== void 0 ? _b : monthsToSubtract;
        for (var i = 0; i < monthsShown; ++i) {
          var monthsToAdd = i - monthSelectedIn + monthsToSubtract;
          var monthDate = _this.props.showMonthYearPicker || _this.props.showQuarterYearPicker ? addYears(fromMonthDate, monthsToAdd) : addMonths(fromMonthDate, monthsToAdd);
          var monthKey = "month-".concat(i);
          var monthShowsDuplicateDaysEnd = i < monthsShown - 1;
          var monthShowsDuplicateDaysStart = i > 0;
          monthList.push(import_react3.default.createElement(
            "div",
            { key: monthKey, ref: function(div) {
              _this.monthContainer = div !== null && div !== void 0 ? div : void 0;
            }, className: "react-datepicker__month-container" },
            _this.renderHeader({ monthDate, i }),
            import_react3.default.createElement(Month, _assign({}, Calendar2.defaultProps, _this.props, { ariaLabelPrefix: _this.props.monthAriaLabelPrefix, day: monthDate, onDayClick: _this.handleDayClick, handleOnKeyDown: _this.props.handleOnDayKeyDown, handleOnMonthKeyDown: _this.props.handleOnKeyDown, onDayMouseEnter: _this.handleDayMouseEnter, onMouseLeave: _this.handleMonthMouseLeave, orderInDisplay: i, selectingDate: _this.state.selectingDate, monthShowsDuplicateDaysEnd, monthShowsDuplicateDaysStart }))
          ));
        }
        return monthList;
      };
      _this.renderYears = function() {
        if (_this.props.showTimeSelectOnly) {
          return;
        }
        if (_this.props.showYearPicker) {
          return import_react3.default.createElement(
            "div",
            { className: "react-datepicker__year--container" },
            _this.renderHeader({ monthDate: _this.state.date }),
            import_react3.default.createElement(Year, _assign({}, Calendar2.defaultProps, _this.props, { selectingDate: _this.state.selectingDate, date: _this.state.date, onDayClick: _this.handleDayClick, clearSelectingDate: _this.clearSelectingDate, onYearMouseEnter: _this.handleYearMouseEnter, onYearMouseLeave: _this.handleYearMouseLeave }))
          );
        }
        return;
      };
      _this.renderTimeSection = function() {
        if (_this.props.showTimeSelect && (_this.state.monthContainer || _this.props.showTimeSelectOnly)) {
          return import_react3.default.createElement(Time, _assign({}, Calendar2.defaultProps, _this.props, { onChange: _this.props.onTimeChange, format: _this.props.timeFormat, intervals: _this.props.timeIntervals, monthRef: _this.state.monthContainer }));
        }
        return;
      };
      _this.renderInputTimeSection = function() {
        var time = _this.props.selected ? new Date(_this.props.selected) : void 0;
        var timeValid = time && isValid2(time) && Boolean(_this.props.selected);
        var timeString = timeValid ? "".concat(addZero(time.getHours()), ":").concat(addZero(time.getMinutes())) : "";
        if (_this.props.showTimeInput) {
          return import_react3.default.createElement(InputTime, _assign({}, Calendar2.defaultProps, _this.props, { date: time, timeString, onChange: _this.props.onTimeChange }));
        }
        return;
      };
      _this.renderAriaLiveRegion = function() {
        var _a2;
        var _b = getYearsPeriod(_this.state.date, (_a2 = _this.props.yearItemNumber) !== null && _a2 !== void 0 ? _a2 : Calendar2.defaultProps.yearItemNumber), startPeriod = _b.startPeriod, endPeriod = _b.endPeriod;
        var ariaLiveMessage;
        if (_this.props.showYearPicker) {
          ariaLiveMessage = "".concat(startPeriod, " - ").concat(endPeriod);
        } else if (_this.props.showMonthYearPicker || _this.props.showQuarterYearPicker) {
          ariaLiveMessage = getYear(_this.state.date);
        } else {
          ariaLiveMessage = "".concat(getMonthInLocale(getMonth(_this.state.date), _this.props.locale), " ").concat(getYear(_this.state.date));
        }
        return import_react3.default.createElement("span", { role: "alert", "aria-live": "polite", className: "react-datepicker__aria-live" }, _this.state.isRenderAriaLiveMessage && ariaLiveMessage);
      };
      _this.renderChildren = function() {
        if (_this.props.children) {
          return import_react3.default.createElement("div", { className: "react-datepicker__children-container" }, _this.props.children);
        }
        return;
      };
      _this.containerRef = (0, import_react3.createRef)();
      _this.state = {
        date: _this.getDateInView(),
        selectingDate: void 0,
        monthContainer: void 0,
        isRenderAriaLiveMessage: false
      };
      return _this;
    }
    Object.defineProperty(Calendar2, "defaultProps", {
      get: function() {
        return {
          monthsShown: 1,
          forceShowMonthNavigation: false,
          timeCaption: "Time",
          previousYearButtonLabel: "Previous Year",
          nextYearButtonLabel: "Next Year",
          previousMonthButtonLabel: "Previous Month",
          nextMonthButtonLabel: "Next Month",
          yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER
        };
      },
      enumerable: false,
      configurable: true
    });
    Calendar2.prototype.componentDidMount = function() {
      var _this = this;
      if (this.props.showTimeSelect) {
        this.assignMonthContainer = function() {
          _this.setState({ monthContainer: _this.monthContainer });
        }();
      }
    };
    Calendar2.prototype.componentDidUpdate = function(prevProps) {
      var _this = this;
      if (this.props.preSelection && (!isSameDay2(this.props.preSelection, prevProps.preSelection) || this.props.monthSelectedIn !== prevProps.monthSelectedIn)) {
        var hasMonthChanged_1 = !isSameMonth2(this.state.date, this.props.preSelection);
        this.setState({
          date: this.props.preSelection
        }, function() {
          return hasMonthChanged_1 && _this.handleCustomMonthChange(_this.state.date);
        });
      } else if (this.props.openToDate && !isSameDay2(this.props.openToDate, prevProps.openToDate)) {
        this.setState({
          date: this.props.openToDate
        });
      }
    };
    Calendar2.prototype.render = function() {
      var Container = this.props.container || CalendarContainer;
      return import_react3.default.createElement(
        "div",
        { style: { display: "contents" }, ref: this.containerRef },
        import_react3.default.createElement(
          Container,
          { className: clsx("react-datepicker", this.props.className, {
            "react-datepicker--time-only": this.props.showTimeSelectOnly
          }), showTime: this.props.showTimeSelect || this.props.showTimeInput, showTimeSelectOnly: this.props.showTimeSelectOnly },
          this.renderAriaLiveRegion(),
          this.renderPreviousButton(),
          this.renderNextButton(),
          this.renderMonths(),
          this.renderYears(),
          this.renderTodayButton(),
          this.renderTimeSection(),
          this.renderInputTimeSection(),
          this.renderChildren()
        )
      );
    };
    return Calendar2;
  }(import_react3.Component)
);
var CalendarIcon = function(_a2) {
  var icon = _a2.icon, _b = _a2.className, className = _b === void 0 ? "" : _b, onClick = _a2.onClick;
  var defaultClass = "react-datepicker__calendar-icon";
  if (typeof icon === "string") {
    return import_react3.default.createElement("i", { className: "".concat(defaultClass, " ").concat(icon, " ").concat(className), "aria-hidden": "true", onClick });
  }
  if (import_react3.default.isValidElement(icon)) {
    return import_react3.default.cloneElement(icon, {
      className: "".concat(icon.props.className || "", " ").concat(defaultClass, " ").concat(className),
      onClick: function(event) {
        if (typeof icon.props.onClick === "function") {
          icon.props.onClick(event);
        }
        if (typeof onClick === "function") {
          onClick(event);
        }
      }
    });
  }
  return import_react3.default.createElement(
    "svg",
    { className: "".concat(defaultClass, " ").concat(className), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", onClick },
    import_react3.default.createElement("path", { d: "M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" })
  );
};
var Portal = (
  /** @class */
  function(_super) {
    __extends(Portal2, _super);
    function Portal2(props) {
      var _this = _super.call(this, props) || this;
      _this.portalRoot = null;
      _this.el = document.createElement("div");
      return _this;
    }
    Portal2.prototype.componentDidMount = function() {
      this.portalRoot = (this.props.portalHost || document).getElementById(this.props.portalId);
      if (!this.portalRoot) {
        this.portalRoot = document.createElement("div");
        this.portalRoot.setAttribute("id", this.props.portalId);
        (this.props.portalHost || document.body).appendChild(this.portalRoot);
      }
      this.portalRoot.appendChild(this.el);
    };
    Portal2.prototype.componentWillUnmount = function() {
      if (this.portalRoot) {
        this.portalRoot.removeChild(this.el);
      }
    };
    Portal2.prototype.render = function() {
      return import_react_dom5.default.createPortal(this.props.children, this.el);
    };
    return Portal2;
  }(import_react3.Component)
);
var focusableElementsSelector = "[tabindex], a, button, input, select, textarea";
var focusableFilter = function(node) {
  if (node instanceof HTMLAnchorElement) {
    return node.tabIndex !== -1;
  }
  return !node.disabled && node.tabIndex !== -1;
};
var TabLoop = (
  /** @class */
  function(_super) {
    __extends(TabLoop2, _super);
    function TabLoop2(props) {
      var _this = _super.call(this, props) || this;
      _this.getTabChildren = function() {
        var _a2;
        return Array.prototype.slice.call((_a2 = _this.tabLoopRef.current) === null || _a2 === void 0 ? void 0 : _a2.querySelectorAll(focusableElementsSelector), 1, -1).filter(focusableFilter);
      };
      _this.handleFocusStart = function() {
        var tabChildren = _this.getTabChildren();
        tabChildren && tabChildren.length > 1 && tabChildren[tabChildren.length - 1].focus();
      };
      _this.handleFocusEnd = function() {
        var tabChildren = _this.getTabChildren();
        tabChildren && tabChildren.length > 1 && tabChildren[0].focus();
      };
      _this.tabLoopRef = (0, import_react3.createRef)();
      return _this;
    }
    TabLoop2.prototype.render = function() {
      var _a2;
      if (!((_a2 = this.props.enableTabLoop) !== null && _a2 !== void 0 ? _a2 : TabLoop2.defaultProps.enableTabLoop)) {
        return this.props.children;
      }
      return import_react3.default.createElement(
        "div",
        { className: "react-datepicker__tab-loop", ref: this.tabLoopRef },
        import_react3.default.createElement("div", { className: "react-datepicker__tab-loop__start", tabIndex: 0, onFocus: this.handleFocusStart }),
        this.props.children,
        import_react3.default.createElement("div", { className: "react-datepicker__tab-loop__end", tabIndex: 0, onFocus: this.handleFocusEnd })
      );
    };
    TabLoop2.defaultProps = {
      enableTabLoop: true
    };
    return TabLoop2;
  }(import_react3.Component)
);
function withFloating(Component3) {
  var WithFloating = function(props) {
    var _a2;
    var hidePopper = typeof props.hidePopper === "boolean" ? props.hidePopper : true;
    var arrowRef = (0, import_react3.useRef)(null);
    var floatingProps = useFloating2(_assign({ open: !hidePopper, whileElementsMounted: autoUpdate, placement: props.popperPlacement, middleware: __spreadArray([
      flip({ padding: 15 }),
      offset(10),
      arrow({ element: arrowRef })
    ], (_a2 = props.popperModifiers) !== null && _a2 !== void 0 ? _a2 : [], true) }, props.popperProps));
    var componentProps = _assign(_assign({}, props), { hidePopper, popperProps: _assign(_assign({}, floatingProps), { arrowRef }) });
    return import_react3.default.createElement(Component3, _assign({}, componentProps));
  };
  return WithFloating;
}
var PopperComponent = (
  /** @class */
  function(_super) {
    __extends(PopperComponent2, _super);
    function PopperComponent2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PopperComponent2, "defaultProps", {
      get: function() {
        return {
          hidePopper: true
        };
      },
      enumerable: false,
      configurable: true
    });
    PopperComponent2.prototype.render = function() {
      var _a2 = this.props, className = _a2.className, wrapperClassName = _a2.wrapperClassName, _b = _a2.hidePopper, hidePopper = _b === void 0 ? PopperComponent2.defaultProps.hidePopper : _b, popperComponent = _a2.popperComponent, targetComponent = _a2.targetComponent, enableTabLoop = _a2.enableTabLoop, popperOnKeyDown = _a2.popperOnKeyDown, portalId = _a2.portalId, portalHost = _a2.portalHost, popperProps = _a2.popperProps, showArrow = _a2.showArrow;
      var popper = void 0;
      if (!hidePopper) {
        var classes = clsx("react-datepicker-popper", className);
        popper = import_react3.default.createElement(
          TabLoop,
          { enableTabLoop },
          import_react3.default.createElement(
            "div",
            { ref: popperProps.refs.setFloating, style: popperProps.floatingStyles, className: classes, "data-placement": popperProps.placement, onKeyDown: popperOnKeyDown },
            popperComponent,
            showArrow && import_react3.default.createElement(FloatingArrow, { ref: popperProps.arrowRef, context: popperProps.context, fill: "currentColor", strokeWidth: 1, height: 8, width: 16, style: { transform: "translateY(-1px)" }, className: "react-datepicker__triangle" })
          )
        );
      }
      if (this.props.popperContainer) {
        popper = (0, import_react3.createElement)(this.props.popperContainer, {}, popper);
      }
      if (portalId && !hidePopper) {
        popper = import_react3.default.createElement(Portal, { portalId, portalHost }, popper);
      }
      var wrapperClasses = clsx("react-datepicker-wrapper", wrapperClassName);
      return import_react3.default.createElement(
        import_react3.default.Fragment,
        null,
        import_react3.default.createElement("div", { ref: popperProps.refs.setReference, className: wrapperClasses }, targetComponent),
        popper
      );
    };
    return PopperComponent2;
  }(import_react3.Component)
);
var PopperComponent$1 = withFloating(PopperComponent);
var outsideClickIgnoreClass = "react-datepicker-ignore-onclickoutside";
var WrappedCalendar = react_onclickoutside_es_default(Calendar);
function hasPreSelectionChanged(date1, date2) {
  if (date1 && date2) {
    return getMonth(date1) !== getMonth(date2) || getYear(date1) !== getYear(date2);
  }
  return date1 !== date2;
}
var INPUT_ERR_1 = "Date input not valid.";
var DatePicker = (
  /** @class */
  function(_super) {
    __extends(DatePicker2, _super);
    function DatePicker2(props) {
      var _this = _super.call(this, props) || this;
      _this.calendar = null;
      _this.input = null;
      _this.getPreSelection = function() {
        return _this.props.openToDate ? _this.props.openToDate : _this.props.selectsEnd && _this.props.startDate ? _this.props.startDate : _this.props.selectsStart && _this.props.endDate ? _this.props.endDate : newDate();
      };
      _this.modifyHolidays = function() {
        var _a2;
        return (_a2 = _this.props.holidays) === null || _a2 === void 0 ? void 0 : _a2.reduce(function(accumulator, holiday) {
          var date = new Date(holiday.date);
          if (!isValid2(date)) {
            return accumulator;
          }
          return __spreadArray(__spreadArray([], accumulator, true), [_assign(_assign({}, holiday), { date })], false);
        }, []);
      };
      _this.calcInitialState = function() {
        var _a2;
        var defaultPreSelection = _this.getPreSelection();
        var minDate = getEffectiveMinDate(_this.props);
        var maxDate = getEffectiveMaxDate(_this.props);
        var boundedPreSelection = minDate && isBefore(defaultPreSelection, getStartOfDay(minDate)) ? minDate : maxDate && isAfter(defaultPreSelection, getEndOfDay(maxDate)) ? maxDate : defaultPreSelection;
        return {
          open: _this.props.startOpen || false,
          preventFocus: false,
          inputValue: null,
          preSelection: (_a2 = _this.props.selectsRange ? _this.props.startDate : _this.props.selected) !== null && _a2 !== void 0 ? _a2 : boundedPreSelection,
          // transforming highlighted days (perhaps nested array)
          // to flat Map for faster access in day.jsx
          highlightDates: getHighLightDaysMap(_this.props.highlightDates),
          focused: false,
          // used to focus day in inline version after month has changed, but not on
          // initial render
          shouldFocusDayInline: false,
          isRenderAriaLiveMessage: false,
          wasHidden: false
        };
      };
      _this.resetHiddenStatus = function() {
        _this.setState(_assign(_assign({}, _this.state), { wasHidden: false }));
      };
      _this.setHiddenStatus = function() {
        _this.setState(_assign(_assign({}, _this.state), { wasHidden: true }));
      };
      _this.setHiddenStateOnVisibilityHidden = function() {
        if (document.visibilityState !== "hidden") {
          return;
        }
        _this.setHiddenStatus();
      };
      _this.clearPreventFocusTimeout = function() {
        if (_this.preventFocusTimeout) {
          clearTimeout(_this.preventFocusTimeout);
        }
      };
      _this.setFocus = function() {
        if (_this.input && _this.input.focus) {
          _this.input.focus({ preventScroll: true });
        }
      };
      _this.setBlur = function() {
        if (_this.input && _this.input.blur) {
          _this.input.blur();
        }
        _this.cancelFocusInput();
      };
      _this.setOpen = function(open, skipSetBlur) {
        if (skipSetBlur === void 0) {
          skipSetBlur = false;
        }
        _this.setState({
          open,
          preSelection: open && _this.state.open ? _this.state.preSelection : _this.calcInitialState().preSelection,
          lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE
        }, function() {
          if (!open) {
            _this.setState(function(prev) {
              return {
                focused: skipSetBlur ? prev.focused : false
              };
            }, function() {
              !skipSetBlur && _this.setBlur();
              _this.setState({ inputValue: null });
            });
          }
        });
      };
      _this.inputOk = function() {
        return isDate(_this.state.preSelection);
      };
      _this.isCalendarOpen = function() {
        return _this.props.open === void 0 ? _this.state.open && !_this.props.disabled && !_this.props.readOnly : _this.props.open;
      };
      _this.handleFocus = function(event) {
        var _a2, _b;
        var isAutoReFocus = _this.state.wasHidden;
        var isOpenAllowed = isAutoReFocus ? _this.state.open : true;
        if (isAutoReFocus) {
          _this.resetHiddenStatus();
        }
        if (!_this.state.preventFocus && isOpenAllowed) {
          (_b = (_a2 = _this.props).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
          if (!_this.props.preventOpenOnFocus && !_this.props.readOnly) {
            _this.setOpen(true);
          }
        }
        _this.setState({ focused: true });
      };
      _this.sendFocusBackToInput = function() {
        if (_this.preventFocusTimeout) {
          _this.clearPreventFocusTimeout();
        }
        _this.setState({ preventFocus: true }, function() {
          _this.preventFocusTimeout = setTimeout(function() {
            _this.setFocus();
            _this.setState({ preventFocus: false });
          });
        });
      };
      _this.cancelFocusInput = function() {
        clearTimeout(_this.inputFocusTimeout);
        _this.inputFocusTimeout = void 0;
      };
      _this.deferFocusInput = function() {
        _this.cancelFocusInput();
        _this.inputFocusTimeout = setTimeout(function() {
          return _this.setFocus();
        }, 1);
      };
      _this.handleDropdownFocus = function() {
        _this.cancelFocusInput();
      };
      _this.handleBlur = function(event) {
        var _a2, _b;
        if (!_this.state.open || _this.props.withPortal || _this.props.showTimeInput) {
          (_b = (_a2 = _this.props).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
        }
        _this.setState({ focused: false });
      };
      _this.handleCalendarClickOutside = function(event) {
        var _a2, _b;
        if (!_this.props.inline) {
          _this.setOpen(false);
        }
        (_b = (_a2 = _this.props).onClickOutside) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
        if (_this.props.withPortal) {
          event.preventDefault();
        }
      };
      _this.handleChange = function() {
        var allArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          allArgs[_i] = arguments[_i];
        }
        var event = allArgs[0];
        if (_this.props.onChangeRaw) {
          _this.props.onChangeRaw.apply(_this, allArgs);
          if (!event || typeof event.isDefaultPrevented !== "function" || event.isDefaultPrevented()) {
            return;
          }
        }
        _this.setState({
          inputValue: (event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement ? event.target.value : null,
          lastPreSelectChange: PRESELECT_CHANGE_VIA_INPUT
        });
        var _a2 = _this.props, _b = _a2.dateFormat, dateFormat = _b === void 0 ? DatePicker2.defaultProps.dateFormat : _b, _c = _a2.strictParsing, strictParsing = _c === void 0 ? DatePicker2.defaultProps.strictParsing : _c;
        var date = parseDate((event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement ? event.target.value : "", dateFormat, _this.props.locale, strictParsing, _this.props.minDate);
        if (_this.props.showTimeSelectOnly && _this.props.selected && date && !isSameDay2(date, _this.props.selected)) {
          date = set(_this.props.selected, {
            hours: getHours(date),
            minutes: getMinutes(date),
            seconds: getSeconds(date)
          });
        }
        if (date || !((event === null || event === void 0 ? void 0 : event.target) instanceof HTMLInputElement) || !(event === null || event === void 0 ? void 0 : event.target.value)) {
          _this.setSelected(date, event, true);
        }
      };
      _this.handleSelect = function(date, event, monthSelectedIn) {
        if (_this.props.shouldCloseOnSelect && !_this.props.showTimeSelect) {
          _this.sendFocusBackToInput();
        }
        if (_this.props.onChangeRaw) {
          _this.props.onChangeRaw(event);
        }
        _this.setSelected(date, event, false, monthSelectedIn);
        if (_this.props.showDateSelect) {
          _this.setState({ isRenderAriaLiveMessage: true });
        }
        if (!_this.props.shouldCloseOnSelect || _this.props.showTimeSelect) {
          _this.setPreSelection(date);
        } else if (!_this.props.inline) {
          if (!_this.props.selectsRange) {
            _this.setOpen(false);
          }
          var _a2 = _this.props, startDate = _a2.startDate, endDate = _a2.endDate;
          if (startDate && !endDate && (_this.props.swapRange || !isDateBefore(date, startDate))) {
            _this.setOpen(false);
          }
        }
      };
      _this.setSelected = function(date, event, keepInput, monthSelectedIn) {
        var changedDate = date;
        if (_this.props.showYearPicker) {
          if (changedDate !== null && isYearDisabled(getYear(changedDate), _this.props)) {
            return;
          }
        } else if (_this.props.showMonthYearPicker) {
          if (changedDate !== null && isMonthDisabled(changedDate, _this.props)) {
            return;
          }
        } else {
          if (changedDate !== null && isDayDisabled(changedDate, _this.props)) {
            return;
          }
        }
        var _a2 = _this.props, onChange = _a2.onChange, selectsRange = _a2.selectsRange, startDate = _a2.startDate, endDate = _a2.endDate, selectsMultiple = _a2.selectsMultiple, selectedDates = _a2.selectedDates, minTime = _a2.minTime, swapRange = _a2.swapRange;
        if (!isEqual2(_this.props.selected, changedDate) || _this.props.allowSameDay || selectsRange || selectsMultiple) {
          if (changedDate !== null) {
            if (_this.props.selected && (!keepInput || !_this.props.showTimeSelect && !_this.props.showTimeSelectOnly && !_this.props.showTimeInput)) {
              changedDate = setTime(changedDate, {
                hour: getHours(_this.props.selected),
                minute: getMinutes(_this.props.selected),
                second: getSeconds(_this.props.selected)
              });
            }
            if (!keepInput && (_this.props.showTimeSelect || _this.props.showTimeSelectOnly)) {
              if (minTime) {
                changedDate = setTime(changedDate, {
                  hour: minTime.getHours(),
                  minute: minTime.getMinutes(),
                  second: minTime.getSeconds()
                });
              }
            }
            if (!_this.props.inline) {
              _this.setState({
                preSelection: changedDate
              });
            }
            if (!_this.props.focusSelectedMonth) {
              _this.setState({ monthSelectedIn });
            }
          }
          if (selectsRange) {
            var noRanges = !startDate && !endDate;
            var hasStartRange = startDate && !endDate;
            var isRangeFilled = startDate && endDate;
            if (noRanges) {
              onChange([changedDate, null], event);
            } else if (hasStartRange) {
              if (changedDate === null) {
                onChange([null, null], event);
              } else if (isDateBefore(changedDate, startDate)) {
                if (swapRange) {
                  onChange([changedDate, startDate], event);
                } else {
                  onChange([changedDate, null], event);
                }
              } else {
                onChange([startDate, changedDate], event);
              }
            }
            if (isRangeFilled) {
              onChange([changedDate, null], event);
            }
          } else if (selectsMultiple) {
            if (changedDate !== null) {
              if (!(selectedDates === null || selectedDates === void 0 ? void 0 : selectedDates.length)) {
                onChange([changedDate], event);
              } else {
                var isChangedDateAlreadySelected = selectedDates.some(function(selectedDate) {
                  return isSameDay2(selectedDate, changedDate);
                });
                if (isChangedDateAlreadySelected) {
                  var nextDates = selectedDates.filter(function(selectedDate) {
                    return !isSameDay2(selectedDate, changedDate);
                  });
                  onChange(nextDates, event);
                } else {
                  onChange(__spreadArray(__spreadArray([], selectedDates, true), [changedDate], false), event);
                }
              }
            }
          } else {
            onChange(changedDate, event);
          }
        }
        if (!keepInput) {
          _this.props.onSelect(changedDate, event);
          _this.setState({ inputValue: null });
        }
      };
      _this.setPreSelection = function(date) {
        var hasMinDate = isDate(_this.props.minDate);
        var hasMaxDate = isDate(_this.props.maxDate);
        var isValidDateSelection = true;
        if (date) {
          var dateStartOfDay = getStartOfDay(date);
          if (hasMinDate && hasMaxDate) {
            isValidDateSelection = isDayInRange(date, _this.props.minDate, _this.props.maxDate);
          } else if (hasMinDate) {
            var minDateStartOfDay = getStartOfDay(_this.props.minDate);
            isValidDateSelection = isAfter(date, minDateStartOfDay) || isEqual2(dateStartOfDay, minDateStartOfDay);
          } else if (hasMaxDate) {
            var maxDateEndOfDay = getEndOfDay(_this.props.maxDate);
            isValidDateSelection = isBefore(date, maxDateEndOfDay) || isEqual2(dateStartOfDay, maxDateEndOfDay);
          }
        }
        if (isValidDateSelection) {
          _this.setState({
            preSelection: date
          });
        }
      };
      _this.toggleCalendar = function() {
        _this.setOpen(!_this.state.open);
      };
      _this.handleTimeChange = function(time) {
        if (_this.props.selectsRange || _this.props.selectsMultiple) {
          return;
        }
        var selected = _this.props.selected ? _this.props.selected : _this.getPreSelection();
        var changedDate = _this.props.selected ? time : setTime(selected, {
          hour: getHours(time),
          minute: getMinutes(time)
        });
        _this.setState({
          preSelection: changedDate
        });
        _this.props.onChange(changedDate);
        if (_this.props.shouldCloseOnSelect && !_this.props.showTimeInput) {
          _this.sendFocusBackToInput();
          _this.setOpen(false);
        }
        if (_this.props.showTimeInput) {
          _this.setOpen(true);
        }
        if (_this.props.showTimeSelectOnly || _this.props.showTimeSelect) {
          _this.setState({ isRenderAriaLiveMessage: true });
        }
        _this.setState({ inputValue: null });
      };
      _this.onInputClick = function() {
        var _a2, _b;
        if (!_this.props.disabled && !_this.props.readOnly) {
          _this.setOpen(true);
        }
        (_b = (_a2 = _this.props).onInputClick) === null || _b === void 0 ? void 0 : _b.call(_a2);
      };
      _this.onInputKeyDown = function(event) {
        var _a2, _b, _c, _d, _e;
        (_b = (_a2 = _this.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
        var eventKey = event.key;
        if (!_this.state.open && !_this.props.inline && !_this.props.preventOpenOnFocus) {
          if (eventKey === KeyType.ArrowDown || eventKey === KeyType.ArrowUp || eventKey === KeyType.Enter) {
            _this.onInputClick();
          }
          return;
        }
        if (_this.state.open) {
          if (eventKey === KeyType.ArrowDown || eventKey === KeyType.ArrowUp) {
            event.preventDefault();
            var selectorString = _this.props.showTimeSelectOnly ? ".react-datepicker__time-list-item[tabindex='0']" : _this.props.showWeekPicker && _this.props.showWeekNumbers ? '.react-datepicker__week-number[tabindex="0"]' : _this.props.showFullMonthYearPicker || _this.props.showMonthYearPicker ? '.react-datepicker__month-text[tabindex="0"]' : '.react-datepicker__day[tabindex="0"]';
            var selectedItem = ((_c = _this.calendar) === null || _c === void 0 ? void 0 : _c.componentNode) instanceof Element && _this.calendar.componentNode.querySelector(selectorString);
            selectedItem instanceof HTMLElement && selectedItem.focus({ preventScroll: true });
            return;
          }
          var copy = newDate(_this.state.preSelection);
          if (eventKey === KeyType.Enter) {
            event.preventDefault();
            if (_this.inputOk() && _this.state.lastPreSelectChange === PRESELECT_CHANGE_VIA_NAVIGATE) {
              _this.handleSelect(copy, event);
              !_this.props.shouldCloseOnSelect && _this.setPreSelection(copy);
            } else {
              _this.setOpen(false);
            }
          } else if (eventKey === KeyType.Escape) {
            event.preventDefault();
            _this.sendFocusBackToInput();
            _this.setOpen(false);
          } else if (eventKey === KeyType.Tab) {
            _this.setOpen(false);
          }
          if (!_this.inputOk()) {
            (_e = (_d = _this.props).onInputError) === null || _e === void 0 ? void 0 : _e.call(_d, { code: 1, msg: INPUT_ERR_1 });
          }
        }
      };
      _this.onPortalKeyDown = function(event) {
        var eventKey = event.key;
        if (eventKey === KeyType.Escape) {
          event.preventDefault();
          _this.setState({
            preventFocus: true
          }, function() {
            _this.setOpen(false);
            setTimeout(function() {
              _this.setFocus();
              _this.setState({ preventFocus: false });
            });
          });
        }
      };
      _this.onDayKeyDown = function(event) {
        var _a2, _b, _c, _d;
        var _e = _this.props, minDate = _e.minDate, maxDate = _e.maxDate, disabledKeyboardNavigation = _e.disabledKeyboardNavigation, showWeekPicker = _e.showWeekPicker, shouldCloseOnSelect = _e.shouldCloseOnSelect, locale = _e.locale, calendarStartDay = _e.calendarStartDay, adjustDateOnChange = _e.adjustDateOnChange, inline2 = _e.inline;
        (_b = (_a2 = _this.props).onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a2, event);
        if (disabledKeyboardNavigation)
          return;
        var eventKey = event.key;
        var isShiftKeyActive = event.shiftKey;
        var copy = newDate(_this.state.preSelection);
        var calculateNewDate = function(eventKey2, date) {
          var newCalculatedDate = date;
          switch (eventKey2) {
            case KeyType.ArrowRight:
              newCalculatedDate = showWeekPicker ? addWeeks(date, 1) : addDays(date, 1);
              break;
            case KeyType.ArrowLeft:
              newCalculatedDate = showWeekPicker ? subWeeks(date, 1) : subDays(date, 1);
              break;
            case KeyType.ArrowUp:
              newCalculatedDate = subWeeks(date, 1);
              break;
            case KeyType.ArrowDown:
              newCalculatedDate = addWeeks(date, 1);
              break;
            case KeyType.PageUp:
              newCalculatedDate = isShiftKeyActive ? subYears(date, 1) : subMonths(date, 1);
              break;
            case KeyType.PageDown:
              newCalculatedDate = isShiftKeyActive ? addYears(date, 1) : addMonths(date, 1);
              break;
            case KeyType.Home:
              newCalculatedDate = getStartOfWeek(date, locale, calendarStartDay);
              break;
            case KeyType.End:
              newCalculatedDate = getEndOfWeek(date);
              break;
          }
          return newCalculatedDate;
        };
        var getNewDate = function(eventKey2, date) {
          var MAX_ITERATIONS = 40;
          var eventKeyCopy = eventKey2;
          var validDateFound = false;
          var iterations = 0;
          var newSelection2 = calculateNewDate(eventKey2, date);
          while (!validDateFound) {
            if (iterations >= MAX_ITERATIONS) {
              newSelection2 = date;
              break;
            }
            if (minDate && newSelection2 < minDate) {
              eventKeyCopy = KeyType.ArrowRight;
              newSelection2 = isDayDisabled(minDate, _this.props) ? calculateNewDate(eventKeyCopy, newSelection2) : minDate;
            }
            if (maxDate && newSelection2 > maxDate) {
              eventKeyCopy = KeyType.ArrowLeft;
              newSelection2 = isDayDisabled(maxDate, _this.props) ? calculateNewDate(eventKeyCopy, newSelection2) : maxDate;
            }
            if (isDayDisabled(newSelection2, _this.props)) {
              if (eventKeyCopy === KeyType.PageUp || eventKeyCopy === KeyType.Home) {
                eventKeyCopy = KeyType.ArrowRight;
              }
              if (eventKeyCopy === KeyType.PageDown || eventKeyCopy === KeyType.End) {
                eventKeyCopy = KeyType.ArrowLeft;
              }
              newSelection2 = calculateNewDate(eventKeyCopy, newSelection2);
            } else {
              validDateFound = true;
            }
            iterations++;
          }
          return newSelection2;
        };
        if (eventKey === KeyType.Enter) {
          event.preventDefault();
          _this.handleSelect(copy, event);
          !shouldCloseOnSelect && _this.setPreSelection(copy);
          return;
        } else if (eventKey === KeyType.Escape) {
          event.preventDefault();
          _this.setOpen(false);
          if (!_this.inputOk()) {
            (_d = (_c = _this.props).onInputError) === null || _d === void 0 ? void 0 : _d.call(_c, { code: 1, msg: INPUT_ERR_1 });
          }
          return;
        }
        var newSelection = null;
        switch (eventKey) {
          case KeyType.ArrowLeft:
          case KeyType.ArrowRight:
          case KeyType.ArrowUp:
          case KeyType.ArrowDown:
          case KeyType.PageUp:
          case KeyType.PageDown:
          case KeyType.Home:
          case KeyType.End:
            newSelection = getNewDate(eventKey, copy);
            break;
        }
        if (!newSelection) {
          if (_this.props.onInputError) {
            _this.props.onInputError({ code: 1, msg: INPUT_ERR_1 });
          }
          return;
        }
        event.preventDefault();
        _this.setState({ lastPreSelectChange: PRESELECT_CHANGE_VIA_NAVIGATE });
        if (adjustDateOnChange) {
          _this.setSelected(newSelection);
        }
        _this.setPreSelection(newSelection);
        if (inline2) {
          var prevMonth = getMonth(copy);
          var newMonth = getMonth(newSelection);
          var prevYear = getYear(copy);
          var newYear = getYear(newSelection);
          if (prevMonth !== newMonth || prevYear !== newYear) {
            _this.setState({ shouldFocusDayInline: true });
          } else {
            _this.setState({ shouldFocusDayInline: false });
          }
        }
      };
      _this.onPopperKeyDown = function(event) {
        var eventKey = event.key;
        if (eventKey === KeyType.Escape) {
          event.preventDefault();
          _this.sendFocusBackToInput();
        }
      };
      _this.onClearClick = function(event) {
        if (event) {
          if (event.preventDefault) {
            event.preventDefault();
          }
        }
        _this.sendFocusBackToInput();
        var _a2 = _this.props, selectsRange = _a2.selectsRange, onChange = _a2.onChange;
        if (selectsRange) {
          onChange([null, null], event);
        } else {
          onChange(null, event);
        }
        if (_this.props.selectsRange) {
          _this.props.onChange([null, null], event);
        } else {
          _this.props.onChange(null, event);
        }
        _this.setState({ inputValue: null });
      };
      _this.clear = function() {
        _this.onClearClick();
      };
      _this.onScroll = function(event) {
        if (typeof _this.props.closeOnScroll === "boolean" && _this.props.closeOnScroll) {
          if (event.target === document || event.target === document.documentElement || event.target === document.body) {
            _this.setOpen(false);
          }
        } else if (typeof _this.props.closeOnScroll === "function") {
          if (_this.props.closeOnScroll(event)) {
            _this.setOpen(false);
          }
        }
      };
      _this.renderCalendar = function() {
        var _a2, _b;
        if (!_this.props.inline && !_this.isCalendarOpen()) {
          return null;
        }
        return import_react3.default.createElement(WrappedCalendar, _assign({ ref: function(elem) {
          _this.calendar = elem;
        } }, _this.props, _this.state, { setOpen: _this.setOpen, dateFormat: (_a2 = _this.props.dateFormatCalendar) !== null && _a2 !== void 0 ? _a2 : DatePicker2.defaultProps.dateFormatCalendar, onSelect: _this.handleSelect, onClickOutside: _this.handleCalendarClickOutside, holidays: getHolidaysMap(_this.modifyHolidays()), outsideClickIgnoreClass, onDropdownFocus: _this.handleDropdownFocus, onTimeChange: _this.handleTimeChange, className: _this.props.calendarClassName, container: _this.props.calendarContainer, handleOnKeyDown: _this.props.onKeyDown, handleOnDayKeyDown: _this.onDayKeyDown, setPreSelection: _this.setPreSelection, dropdownMode: (_b = _this.props.dropdownMode) !== null && _b !== void 0 ? _b : DatePicker2.defaultProps.dropdownMode }), _this.props.children);
      };
      _this.renderAriaLiveRegion = function() {
        var _a2 = _this.props, _b = _a2.dateFormat, dateFormat = _b === void 0 ? DatePicker2.defaultProps.dateFormat : _b, locale = _a2.locale;
        var isContainsTime = _this.props.showTimeInput || _this.props.showTimeSelect;
        var longDateFormat = isContainsTime ? "PPPPp" : "PPPP";
        var ariaLiveMessage;
        if (_this.props.selectsRange) {
          ariaLiveMessage = "Selected start date: ".concat(safeDateFormat(_this.props.startDate, {
            dateFormat: longDateFormat,
            locale
          }), ". ").concat(_this.props.endDate ? "End date: " + safeDateFormat(_this.props.endDate, {
            dateFormat: longDateFormat,
            locale
          }) : "");
        } else {
          if (_this.props.showTimeSelectOnly) {
            ariaLiveMessage = "Selected time: ".concat(safeDateFormat(_this.props.selected, { dateFormat, locale }));
          } else if (_this.props.showYearPicker) {
            ariaLiveMessage = "Selected year: ".concat(safeDateFormat(_this.props.selected, { dateFormat: "yyyy", locale }));
          } else if (_this.props.showMonthYearPicker) {
            ariaLiveMessage = "Selected month: ".concat(safeDateFormat(_this.props.selected, { dateFormat: "MMMM yyyy", locale }));
          } else if (_this.props.showQuarterYearPicker) {
            ariaLiveMessage = "Selected quarter: ".concat(safeDateFormat(_this.props.selected, {
              dateFormat: "yyyy, QQQ",
              locale
            }));
          } else {
            ariaLiveMessage = "Selected date: ".concat(safeDateFormat(_this.props.selected, {
              dateFormat: longDateFormat,
              locale
            }));
          }
        }
        return import_react3.default.createElement("span", { role: "alert", "aria-live": "polite", className: "react-datepicker__aria-live" }, ariaLiveMessage);
      };
      _this.renderDateInput = function() {
        var _a2, _b;
        var _c;
        var className = clsx(_this.props.className, (_a2 = {}, _a2[outsideClickIgnoreClass] = _this.state.open, _a2));
        var customInput = _this.props.customInput || import_react3.default.createElement("input", { type: "text" });
        var customInputRef = _this.props.customInputRef || "ref";
        var _d = _this.props, _e = _d.dateFormat, dateFormat = _e === void 0 ? DatePicker2.defaultProps.dateFormat : _e, locale = _d.locale;
        var inputValue = typeof _this.props.value === "string" ? _this.props.value : typeof _this.state.inputValue === "string" ? _this.state.inputValue : _this.props.selectsRange ? safeDateRangeFormat(_this.props.startDate, _this.props.endDate, {
          dateFormat,
          locale
        }) : _this.props.selectsMultiple ? safeMultipleDatesFormat((_c = _this.props.selectedDates) !== null && _c !== void 0 ? _c : [], {
          dateFormat,
          locale
        }) : safeDateFormat(_this.props.selected, {
          dateFormat,
          locale
        });
        return (0, import_react3.cloneElement)(customInput, (_b = {}, _b[customInputRef] = function(input) {
          _this.input = input;
        }, _b.value = inputValue, _b.onBlur = _this.handleBlur, _b.onChange = _this.handleChange, _b.onClick = _this.onInputClick, _b.onFocus = _this.handleFocus, _b.onKeyDown = _this.onInputKeyDown, _b.id = _this.props.id, _b.name = _this.props.name, _b.form = _this.props.form, _b.autoFocus = _this.props.autoFocus, _b.placeholder = _this.props.placeholderText, _b.disabled = _this.props.disabled, _b.autoComplete = _this.props.autoComplete, _b.className = clsx(customInput.props.className, className), _b.title = _this.props.title, _b.readOnly = _this.props.readOnly, _b.required = _this.props.required, _b.tabIndex = _this.props.tabIndex, _b["aria-describedby"] = _this.props.ariaDescribedBy, _b["aria-invalid"] = _this.props.ariaInvalid, _b["aria-labelledby"] = _this.props.ariaLabelledBy, _b["aria-required"] = _this.props.ariaRequired, _b));
      };
      _this.renderClearButton = function() {
        var _a2 = _this.props, isClearable = _a2.isClearable, disabled = _a2.disabled, selected = _a2.selected, startDate = _a2.startDate, endDate = _a2.endDate, clearButtonTitle = _a2.clearButtonTitle, _b = _a2.clearButtonClassName, clearButtonClassName = _b === void 0 ? "" : _b, _c = _a2.ariaLabelClose, ariaLabelClose = _c === void 0 ? "Close" : _c, selectedDates = _a2.selectedDates;
        if (isClearable && (selected != null || startDate != null || endDate != null || (selectedDates === null || selectedDates === void 0 ? void 0 : selectedDates.length))) {
          return import_react3.default.createElement("button", { type: "button", className: clsx("react-datepicker__close-icon", clearButtonClassName, { "react-datepicker__close-icon--disabled": disabled }), disabled, "aria-label": ariaLabelClose, onClick: _this.onClearClick, title: clearButtonTitle, tabIndex: -1 });
        } else {
          return null;
        }
      };
      _this.state = _this.calcInitialState();
      _this.preventFocusTimeout = void 0;
      return _this;
    }
    Object.defineProperty(DatePicker2, "defaultProps", {
      get: function() {
        return {
          allowSameDay: false,
          dateFormat: "MM/dd/yyyy",
          dateFormatCalendar: "LLLL yyyy",
          onChange: function() {
          },
          disabled: false,
          disabledKeyboardNavigation: false,
          dropdownMode: "scroll",
          onFocus: function() {
          },
          onBlur: function() {
          },
          onKeyDown: function() {
          },
          onInputClick: function() {
          },
          onSelect: function() {
          },
          onClickOutside: function() {
          },
          onMonthChange: function() {
          },
          onCalendarOpen: function() {
          },
          onCalendarClose: function() {
          },
          preventOpenOnFocus: false,
          onYearChange: function() {
          },
          onInputError: function() {
          },
          monthsShown: 1,
          readOnly: false,
          withPortal: false,
          selectsDisabledDaysInRange: false,
          shouldCloseOnSelect: true,
          showTimeSelect: false,
          showTimeInput: false,
          showPreviousMonths: false,
          showMonthYearPicker: false,
          showFullMonthYearPicker: false,
          showTwoColumnMonthYearPicker: false,
          showFourColumnMonthYearPicker: false,
          showYearPicker: false,
          showQuarterYearPicker: false,
          showWeekPicker: false,
          strictParsing: false,
          swapRange: false,
          timeIntervals: 30,
          timeCaption: "Time",
          previousMonthAriaLabel: "Previous Month",
          previousMonthButtonLabel: "Previous Month",
          nextMonthAriaLabel: "Next Month",
          nextMonthButtonLabel: "Next Month",
          previousYearAriaLabel: "Previous Year",
          previousYearButtonLabel: "Previous Year",
          nextYearAriaLabel: "Next Year",
          nextYearButtonLabel: "Next Year",
          timeInputLabel: "Time",
          enableTabLoop: true,
          yearItemNumber: DEFAULT_YEAR_ITEM_NUMBER,
          focusSelectedMonth: false,
          showPopperArrow: true,
          excludeScrollbar: true,
          customTimeInput: null,
          calendarStartDay: void 0,
          toggleCalendarOnIconClick: false,
          usePointerEvent: false
        };
      },
      enumerable: false,
      configurable: true
    });
    DatePicker2.prototype.componentDidMount = function() {
      window.addEventListener("scroll", this.onScroll, true);
      document.addEventListener("visibilitychange", this.setHiddenStateOnVisibilityHidden);
    };
    DatePicker2.prototype.componentDidUpdate = function(prevProps, prevState) {
      var _a2, _b, _c, _d;
      if (prevProps.inline && hasPreSelectionChanged(prevProps.selected, this.props.selected)) {
        this.setPreSelection(this.props.selected);
      }
      if (this.state.monthSelectedIn !== void 0 && prevProps.monthsShown !== this.props.monthsShown) {
        this.setState({ monthSelectedIn: 0 });
      }
      if (prevProps.highlightDates !== this.props.highlightDates) {
        this.setState({
          highlightDates: getHighLightDaysMap(this.props.highlightDates)
        });
      }
      if (!prevState.focused && !isEqual2(prevProps.selected, this.props.selected)) {
        this.setState({ inputValue: null });
      }
      if (prevState.open !== this.state.open) {
        if (prevState.open === false && this.state.open === true) {
          (_b = (_a2 = this.props).onCalendarOpen) === null || _b === void 0 ? void 0 : _b.call(_a2);
        }
        if (prevState.open === true && this.state.open === false) {
          (_d = (_c = this.props).onCalendarClose) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
      }
    };
    DatePicker2.prototype.componentWillUnmount = function() {
      this.clearPreventFocusTimeout();
      window.removeEventListener("scroll", this.onScroll, true);
      document.removeEventListener("visibilitychange", this.setHiddenStateOnVisibilityHidden);
    };
    DatePicker2.prototype.renderInputContainer = function() {
      var _a2 = this.props, showIcon = _a2.showIcon, icon = _a2.icon, calendarIconClassname = _a2.calendarIconClassname, calendarIconClassName = _a2.calendarIconClassName, toggleCalendarOnIconClick = _a2.toggleCalendarOnIconClick;
      var open = this.state.open;
      if (calendarIconClassname) {
        console.warn("calendarIconClassname props is deprecated. should use calendarIconClassName props.");
      }
      return import_react3.default.createElement(
        "div",
        { className: "react-datepicker__input-container".concat(showIcon ? " react-datepicker__view-calendar-icon" : "") },
        showIcon && import_react3.default.createElement(CalendarIcon, _assign({ icon, className: clsx(calendarIconClassName, !calendarIconClassName && calendarIconClassname, open && "react-datepicker-ignore-onclickoutside") }, toggleCalendarOnIconClick ? {
          onClick: this.toggleCalendar
        } : null)),
        this.state.isRenderAriaLiveMessage && this.renderAriaLiveRegion(),
        this.renderDateInput(),
        this.renderClearButton()
      );
    };
    DatePicker2.prototype.render = function() {
      var calendar = this.renderCalendar();
      if (this.props.inline)
        return calendar;
      if (this.props.withPortal) {
        var portalContainer = this.state.open ? import_react3.default.createElement(
          TabLoop,
          { enableTabLoop: this.props.enableTabLoop },
          import_react3.default.createElement("div", { className: "react-datepicker__portal", tabIndex: -1, onKeyDown: this.onPortalKeyDown }, calendar)
        ) : null;
        if (this.state.open && this.props.portalId) {
          portalContainer = import_react3.default.createElement(Portal, _assign({ portalId: this.props.portalId }, this.props), portalContainer);
        }
        return import_react3.default.createElement(
          "div",
          null,
          this.renderInputContainer(),
          portalContainer
        );
      }
      return import_react3.default.createElement(PopperComponent$1, _assign({}, this.props, { className: this.props.popperClassName, hidePopper: !this.isCalendarOpen(), targetComponent: this.renderInputContainer(), popperComponent: calendar, popperOnKeyDown: this.onPopperKeyDown, showArrow: this.props.showPopperArrow }));
    };
    return DatePicker2;
  }(import_react3.Component)
);
var PRESELECT_CHANGE_VIA_INPUT = "input";
var PRESELECT_CHANGE_VIA_NAVIGATE = "navigate";
export {
  CalendarContainer,
  DatePicker as default,
  getDefaultLocale,
  registerLocale,
  setDefaultLocale
};
/*! Bundled license information:

tabbable/dist/index.esm.js:
  (*!
  * tabbable 6.2.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)

react-datepicker/dist/es/index.js:
  (*!
    react-datepicker v7.0.0
    https://github.com/Hacker0x01/react-datepicker
    Released under the MIT License.
  *)
*/
//# sourceMappingURL=react-datepicker.js.map
