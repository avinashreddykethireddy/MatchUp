// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import App from './App';
import store from './store'
import {Provider} from 'react-redux';
// ----------------------------------------------------------------------

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
    <Provider store={store} >
        <App />
    </Provider>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);
