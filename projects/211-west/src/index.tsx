import ReactDOM from 'react-dom';
import App from './App';
import { initCordova } from './cordova';
import { initEnvironmentVariables } from './helpers/env';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root') as HTMLElement;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/cache-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
}

initCordova()
  .then(initEnvironmentVariables)
  .then(() => ReactDOM.render(<App />, root));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
