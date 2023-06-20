import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './features/app/App';

declare let window: {
  cordova:any
};

const renderReactDom = () => {
  const root = ReactDOM.createRoot(document.getElementById('root') as Element);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

if (window.cordova) {
  document.addEventListener('deviceready', () => {
    renderReactDom();
  }, false);
} else {
  renderReactDom();
}
