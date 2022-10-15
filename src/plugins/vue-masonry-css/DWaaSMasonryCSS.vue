<script>
import { ref, nextTick, onMounted, onUpdated, onBeforeUnmount, h } from 'vue';

// define props
const props = {
  tag: {
    type: [String],
    default: 'div',
  },
  cols: {
    type: [Object, Number, String],
    default: 2,
  },
  gutter: {
    type: [Object, Number, String],
    default: 0,
  },
  css: {
    type: [Boolean],
    default: true,
  },
  columnTag: {
    type: [String],
    default: 'div',
  },
  columnClass: {
    type: [String, Array, Object],
    default: () => [],
  },
  columnAttr: {
    type: [Object],
    default: () => ({}),
  },
};

// Get the resulting value from  `:col=` prop
// based on the window width
const breakpointValue = (mixed, windowWidth) => {
  const valueAsNum = parseInt(mixed);

  if (valueAsNum > -1) {
    return mixed;
  } else if (typeof mixed !== 'object') {
    return 0;
  }

  let matchedBreakpoint = Infinity;
  let matchedValue = mixed.default || 0;

  for (let k in mixed) {
    const breakpoint = parseInt(k);
    const breakpointValRaw = mixed[breakpoint];
    const breakpointVal = parseInt(breakpointValRaw);

    if (isNaN(breakpoint) || isNaN(breakpointVal)) {
      continue;
    }

    const isNewBreakpoint =
      windowWidth <= breakpoint && breakpoint < matchedBreakpoint;

    if (isNewBreakpoint) {
      matchedBreakpoint = breakpoint;
      matchedValue = breakpointValRaw;
    }
  }

  return matchedValue;
};

export default {
  props,
  setup(props, { slots }) {
    const displayColumns = ref(2);
    const displayGutter = ref(0);
    const windowWidth = ref(null);

    function _reCalculateGutterSize() {
      displayGutter.value = breakpointValue(props.gutter, windowWidth.value);
    }

    function _reCalculateColumnCount() {
      let newColumns = breakpointValue(props.cols, windowWidth.value);

      // Make sure we can return a valid value
      newColumns = Math.max(1, Number(newColumns) || 0);

      displayColumns.value = newColumns;
    }

    // Recalculate how many columns to display based on window width
    // and the value of the passed `:cols=` prop
    function reCalculate() {
      const previousWindowWidth = windowWidth.value;

      windowWidth.value = (window ? window.innerWidth : null) || Infinity;

      // Window resize events get triggered on page height
      // change which when loading the page can result in multiple
      // needless calculations. We prevent this here.
      if (previousWindowWidth === windowWidth.value) {
        return;
      }

      _reCalculateColumnCount();
      _reCalculateGutterSize();
    }

    // Rendering logic
    function _getChildItemsInColumnsArray() {
      const columns = [];
      const [first] = slots.default();
      let childItems = first.children || [];

      // Loop through child elements
      for (
        let i = 0, visibleItemI = 0;
        i < childItems.length;
        i++, visibleItemI++
      ) {
        // skip Vue elements without tags, which includes
        // whitespace elements and also plain text
        if (!childItems[i].type) {
          visibleItemI--;

          continue;
        }

        // Get the column index the child item will end up in
        const columnIndex = visibleItemI % displayColumns.value;

        if (!columns[columnIndex]) {
          columns[columnIndex] = [];
        }

        columns[columnIndex].push(childItems[i]);
      }

      return columns;
    }

    function render(createElement) {
      const columnsContainingChildren = _getChildItemsInColumnsArray();
      const isGutterSizeUnitless =
        parseInt(displayGutter.value) === displayGutter.value * 1;
      const gutterSizeWithUnit = isGutterSizeUnitless
        ? `${displayGutter.value}px`
        : displayGutter.value;

      const columnStyle = {
        boxSizing: 'border-box',
        backgroundClip: 'padding-box',
        width: `${100 / displayColumns.value}%`,
        border: '0 solid transparent',
        borderLeftWidth: gutterSizeWithUnit,
      };

      const columns = columnsContainingChildren.map((children, index) => {
        /// Create column element and inject the children
        return createElement(
          props.columnTag,
          {
            key: index + '-' + columnsContainingChildren.length,
            style: props.css ? columnStyle : null,
            class: props.columnClass,
            attrs: props.columnAttr,
          },
          children
        ); // specify child items here
      });

      const containerStyle = {
        display: ['-webkit-box', '-ms-flexbox', 'flex'],
        marginLeft: `-${gutterSizeWithUnit}`,
      };

      // Return wrapper with columns
      return createElement(
        props.tag, // tag name
        props.css ? { style: containerStyle } : null, // element options
        columns // column vue elements
      );
    }

    onMounted(() => {
      if (window) {
        window.addEventListener('resize', reCalculate);
      }
      nextTick(() => {
        reCalculate();
      });
    });

    onUpdated(() => {
      nextTick(() => {
        reCalculate();
      });
    });

    onBeforeUnmount(() => {
      if (window) {
        window.removeEventListener('resize');
      }
    });

    return () => render(h);
  },
};
</script>
