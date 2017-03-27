import {DEFAULT_PORT} from './defaults';

if (window.location.hostname === 'localhost') {
  try {
    const toArray = value => Array.prototype.slice.call(value);
    const port = typeof OFFICE_ADDIN_PORT !== 'undefined' ? OFFICE_ADDIN_PORT : config.DEFAULT_PORT;

    const buffered = [];
    let send = (level, messages) => buffered.push(JSON.stringify({level, messages}));

    const ws = new Websocket(`https://localhost:${port}`);
    ws.onopen = () => {
      buffered.forEach(message => ws.send(message));
      send = (level, messages) => ws.send(JSON.stringify({level, messages}));
    };

    [
      'log',
      'info',
      'debug',
      'warn',
      'error',
      'group',
      'groupCollapsed',
      'groupEnd',
      'clear'
    ].forEach(level => {
      const original = console[level];
      console[level] = function() {
        original && original.apply(console, arguments);
        send(level, toArray(arguments));
      };
    });

    window.onerror = function() {
      console.error.apply(console, arguments);
    };
  } catch(err) {}
}
