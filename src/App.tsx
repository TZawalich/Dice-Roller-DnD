import React from 'react';
import logo from './logo.svg';
import styles from "./App.module.css"

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
        <div className={styles.bodyGrid}>
          <div className={styles.columnTitles}>
            <h2>Dice Number</h2>
            <h2>Modifier +/-</h2>
            <h2>Modifier</h2>
            <h2>Modifier Type</h2>
            <h2>Roll Dice</h2>
            <h2>Result</h2>
          </div>
          <DiceRoller dice={4} passRoll={passRollHandler}/>
          <DiceRoller dice={6} passRoll={passRollHandler}/>
          <DiceRoller dice={8} passRoll={passRollHandler}/>
          <DiceRoller dice={10} passRoll={passRollHandler}/>
          <DiceRoller dice={12} passRoll={passRollHandler}/>
          <DiceRoller dice={20} passRoll={passRollHandler}/>
          <DiceRoller dice={100} passRoll={passRollHandler}/>
        </div>
      <Footer />
    </div>
  );
}

export default App;
