import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { store } from './store/store';
import {Provider} from 'react-redux'
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import serviceWorker from './serviceWorker';
const root = ReactDOM.createRoot(document.getElementById('root'));

disableReactDevTools();
root.render(
  <>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </>
);

serviceWorker();
// const rootElement = document.getElementById('root')
// if (rootElement.hasChildNodes()) {
//   hydrate(<App />, rootElement)
  
// }
// else{
//   render(<App />, rootElement)
// }

