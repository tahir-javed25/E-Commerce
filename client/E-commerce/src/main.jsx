import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css'; // Your custom CSS should come last
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from "./store/store.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  
  </StrictMode>,
)
