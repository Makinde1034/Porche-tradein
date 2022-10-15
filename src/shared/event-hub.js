import mitt from 'mitt';

const emitter = mitt();

// listen to all events
emitter.on('*', (type, e) => console.log(type, e));

export default {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
};
