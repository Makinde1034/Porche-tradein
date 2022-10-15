import { LazySizesConfigPartial } from 'lazysizes';

declare global {
  interface Window {
    lazySizesConfig: LazySizesConfigPartial;
  }
}
