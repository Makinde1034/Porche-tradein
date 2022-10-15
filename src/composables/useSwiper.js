import { computed, reactive } from 'vue';
import { useBreakpoints } from './useBreakpoints';

const INITIAL_SWIPER_CONTROLS = {
  isBeginning: true,
  allowSlidePrev: false,
  isEnd: false,
  allowSlideNext: null,
};

export function useSwiper(
  navigationElements,
  checkMobile,
  breakPointSize = 'md'
) {
  const navigationOptions = {
    nextEl: navigationElements.next,
    prevEl: navigationElements.prev,
  };

  const controlledSwiper = reactive({ ...INITIAL_SWIPER_CONTROLS });

  function updateSwiperState(swiper) {
    Object.assign(controlledSwiper, swiper);
  }

  function resetSwiperState() {
    Object.assign(controlledSwiper, INITIAL_SWIPER_CONTROLS);
  }

  function adaptDynamicBullets(el) {
    const bullets = el.querySelectorAll('.swiper-pagination-bullet');
    const visibleBullets = el.querySelectorAll(
      '[class*="swiper-pagination-bullet-active-"]'
    );

    bullets.forEach((bullet) => {
      bullet.setAttribute('tabindex', -1);
    });

    visibleBullets.forEach((visible) => {
      visible.setAttribute('tabindex', 0);
    });
  }

  const { breakpoints } = useBreakpoints();

  const showPrevButton = computed(
    () =>
      !controlledSwiper.isBeginning &&
      controlledSwiper.allowSlidePrev &&
      (!checkMobile || breakpoints.greater(breakPointSize).value)
  );

  const showNextButton = computed(
    () =>
      !controlledSwiper.isEnd &&
      controlledSwiper.allowSlideNext &&
      (!checkMobile || breakpoints.greater(breakPointSize).value)
  );

  return {
    navigationOptions,
    updateSwiperState,
    resetSwiperState,
    adaptDynamicBullets,
    showPrevButton,
    showNextButton,
    controlledSwiper,
  };
}
