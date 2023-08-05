import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { Provider } from 'react-redux';
import { Store, persistor } from "./Redux/Store"
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SocketProvider } from './SocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <Provider store={Store}>
            <PersistGate loading={null} persistor={persistor}>
                <GoogleOAuthProvider clientId={`${process.env.react_app_google_client_id}`}>
                    <SocketProvider>
                        <App />
                    </SocketProvider>
                </GoogleOAuthProvider>
            </PersistGate>
        </Provider>
    // </React.StrictMode>
);