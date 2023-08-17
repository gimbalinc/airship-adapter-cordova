import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './features/app/App';
import StorageService from './global/StorageService';

const renderReactDom = () => {
  const shouldShowIntro = StorageService.shouldShowIntro();
  const isAdapterStarted = StorageService.isAdapterStarted();

  const root = ReactDOM.createRoot(document.getElementById('root') as Element);
  root.render(
    <React.StrictMode>
      <App
        shouldInitializeWithIntro={shouldShowIntro}
        shouldInitializeWithAdapterStarted={isAdapterStarted}
      />
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
