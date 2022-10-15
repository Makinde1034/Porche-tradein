import { watch, ref } from 'vue';
import { usePDS } from '../plugins/vue-porsche-design/pds';

export function useBootstrapper() {
  const el = ref(null);
  const { isPDSLoaded } = usePDS();

  function initializeComponent() {
    const parent = el.value.parentElement;
    if (parent && parent.classList) {
      parent.classList.remove('unloaded');
    }
  }

  watch([isPDSLoaded, el], ([value, element]) => {
    if (value && element) {
      initializeComponent();
    }
  });

  return {
    el,
    isPDSLoaded,
  };
}
