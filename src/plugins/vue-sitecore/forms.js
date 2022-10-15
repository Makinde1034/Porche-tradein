import {
  fixFormsLayout,
  fixValidationPlacement,
  fireFormEvent,
} from '../../../../Shared/forms';

export const showFormsContainer = () => {
  document.querySelector('.component.sitecore-form')?.classList.add('loaded');
};

export const useSitecoreForms = (app) => {
  window.addEventListener('load', showFormsContainer, false);

  if (window.PAGEINFO.hasForms) {
    fixFormsLayout();
    fixValidationPlacement();
  }

  window.fireFormEvent = fireFormEvent;
  app.config.globalProperties.$fireFormEvent = fireFormEvent;
};
