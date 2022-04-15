import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import DiceRoller from './components/DiceRoller';

const passRollHandler = (result:string) => {
  console.log(result)
}

function App() {
  return (
    <div className="App">
      <Header />
        <DiceRoller dice={4} passRoll={passRollHandler}/>

      <Footer />
    </div>
  );
}

export default App;
