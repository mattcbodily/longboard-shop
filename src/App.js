import React from 'react';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import routes from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import store from './ducks/store';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <HashRouter>
          <Header />
            {routes}
          <Footer />
        </HashRouter>
      </Provider>
    </div>
  )
}

export default App;