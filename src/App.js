import React, { useEffect } from 'react';
import './App.css'
import 'aos/dist/aos.css';
import AOS from 'aos'
import { Provider } from 'react-redux';
import store from './redux/store';
import Main from './Pages/Main';

function App() {

  useEffect(() => {
    // initialize AOS library
    AOS.init({
      easing: 'ease-in-out-back',
      duration: 1000,
      offset: 0,
    });
  }, []);

  return (

    <Provider store={store}>
      <Main />
    </Provider>

  )
}

export default App
