/* eslint-disable no-undef */
const calculateFlexWidth = (flexItemLength) => {
  return flexItemLength >= 5
    ? 'auto'
    : flexItemLength >= 4
    ? 'one-quarter'
    : flexItemLength >= 3
    ? 'one-third'
    : flexItemLength >= 2
    ? 'half'
    : 'full';
};

/**
 * Fires a custom form event.
 * @param eventName The name of the custom event.
 * @param domElement DOMElement sender.
 */
let fireFormEvent = (eventName, domElement) => {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(eventName, true, true);
  event.sender = domElement;
  document.dispatchEvent(event);
};

/**
 * Collect information of the current form.
 * @param domElement The element in the form
 * @return {{itemId, id, sessionId, pageId}}
 */
const collectFormsInfo = (domElement) => {
  const { form } = domElement;
  return {
    id: form.id,
    itemId: form.querySelector('input[name$="FormItemId"]').value,
    pageId: form.querySelector('input[name$="PageItemId"]').value,
    sessionId: form.querySelector('input[name$="FormSessionId"]').value,
  };
};

/**
 * Collect information of the input field.
 * @param domElement The input dom element.
 * @return {{sitecore: {fieldKey: string, fieldName: string}, id, tag: string, type: string}}
 */
const collectInputFieldInfo = (domElement) => {
  return {
    id: domElement.id,
    tag: domElement.tagName.toLowerCase(),
    type: domElement.type,
    required: domElement.required,
    readOnly: domElement.readOnly,
    disabled: domElement.disabled,
    sitecore: {
      fieldName: domElement.dataset['scFieldName'],
      fieldKey: domElement.dataset['scFieldKey'],
    },
    label:
      domElement.attributes['aria-labelledby'] !== undefined
        ? document.getElementById(domElement.attributes['aria-labelledby'].nodeValue).innerText
        : '',
  };
};

/**
 * Collect info of the checkbox field
 * @param domElement The checkbox dom element.
 * @return {{sitecore: {fieldKey: string, fieldName: string}, id, tag: string, type: string} & {checked: *}}
 */
const collectCheckBoxFieldInfo = (domElement) => {
  const inputFieldInfo = collectInputFieldInfo(domElement);
  return Object.assign(inputFieldInfo, { checked: domElement.checked });
};

/**
 * This function fixed some layout issues with forms
 */
const fixFormsLayout = function () {
  document.querySelectorAll('div.component.sitecore-form p-flex').forEach((flexRow) => {
    flexRow.classList.add('form-row-spacing');
    const flexItems = flexRow.querySelectorAll('p-flex-item');
    const flexWidth = calculateFlexWidth(flexItems.length);

    flexItems.forEach((flexItem) => {
      flexItem.setAttribute('width', `{base: 'full', m: '${flexWidth}'}`);
      flexItem.classList.add('form-grid-item');
    });
  });
};

/**
 * God, I'm sorry for doing this jQuery hell ...
 * This function will set the state of the p-wrapper components for success and error
 * to display the error messages the right way for PDS.
 */
const fixValidationPlacement = function () {
  window.addEventListener(
    'load',
    () => {
      const { settings } = $.data($('form')[0], 'validator');
      const oldErrorFunction = settings.errorPlacement;
      const oldSuccessFunction = settings.success;

      settings.errorPlacement = function (error, inputElement) {
        $(inputElement).parent().attr('state', 'error');
        oldErrorFunction(error, inputElement);
      };

      settings.success = function (success, inputElement) {
        $(inputElement).parent().attr('state', 'none');
        oldSuccessFunction(success, inputElement);
      };
    },
    false,
  );
};

export {
  fixFormsLayout,
  fixValidationPlacement,
  fireFormEvent,
  collectFormsInfo,
  collectInputFieldInfo,
  collectCheckBoxFieldInfo,
};
