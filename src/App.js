import React from 'react';
import 'bulma/css/bulma.min.css';
import './App.scss';
import Main from './containers/Main';
import Footer from './containers/Footer';

function App() {
  return (
      <div className="App">
          <Main />
          <Footer />
      </div>
  );
}

export default App;
