import React from 'react';
import {HashRouter} from 'react-router-dom'
import routes from './routes';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
          {routes}
        <Footer />
      </HashRouter>
    </div>
  )
}

export default App;