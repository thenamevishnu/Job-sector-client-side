import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { Store, persistor } from "./Redux/Store"
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
              <GoogleOAuthProvider clientId={`${process.env.react_app_google_client_id}`}>
                  <App />
              </GoogleOAuthProvider>
          </PersistGate>
      </Provider>
  </React.StrictMode>
);