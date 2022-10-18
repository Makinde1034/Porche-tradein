// const imageModule = {
//   namespaced: true,
//   state() {
//     return {
//       step: 'jfjbdjfbdf',
//     };
//   },
//   actions: {},
//   mutations: {},
// };

// export default imageModule;

import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})