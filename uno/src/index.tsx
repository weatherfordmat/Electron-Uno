import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Main from './routes/index';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Main />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
