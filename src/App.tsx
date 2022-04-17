import React, { useState } from 'react';
import styles from "./App.module.css"

import Header from './Header';
import Footer from './Footer';
import DiceRoller from './components/DiceRoller';
import { randomFillSync } from 'crypto';

interface rollInfo {
  dice: number,
  modifier: number | string,
  modifierApplication: string,
  result: number,
  rolls: number[],
  modifierDirection: string
}

function App() {
  const [results, setResults] = useState<rollInfo[]>([]);
  const passRollHandler = (result: rollInfo) => {
    console.log(result)
    setResults(prevState => [result, ...prevState])
  }


  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.rollerBody}>
        <div className={styles.columnTitles}>
          <h2>Dice Number</h2>
          <h2>Modifier +/-</h2>
          <h2>Modifier</h2>
          <h2>Modifier Type</h2>
          <span></span>
          <h2>Result</h2>
        </div>
        <DiceRoller dice={4} passRoll={passRollHandler} />
        <DiceRoller dice={6} passRoll={passRollHandler} />
        <DiceRoller dice={8} passRoll={passRollHandler} />
        <DiceRoller dice={10} passRoll={passRollHandler} />
        <DiceRoller dice={12} passRoll={passRollHandler} />
        <DiceRoller dice={20} passRoll={passRollHandler} />
        <DiceRoller dice={100} passRoll={passRollHandler} />
      </div>
      <div className={styles.rollResults}>
        <h4>Roll History</h4>
        <div className={styles.resultHolder}>
          {results.map((turn, index) => {
            return (
              <div key={index} className={styles.rollTurn}>
                {turn.modifierApplication === "once" ?
                  <>
                    <p>You rolled <b>({turn.rolls.length}d{turn.dice}){turn.modifier !== "" && turn.modifierDirection}{turn.modifier}</b> for a total of <b>{turn.result}</b></p>
                    <p>Your rolls were: {`[ ${turn.rolls.map(x => ` ${x} `)}]`} {turn.modifier !== "" && turn.modifierDirection} {turn.modifier} = {turn.result}</p>
                  </>
                  :
                  <>
                    <p>You rolled <b>{turn.rolls.length}(d{turn.dice}{turn.modifier !== "" && turn.modifierDirection}{turn.modifier})</b> for a total of <b>{turn.result}</b></p>
                    <p>Your rolls were: {`[ ${turn.rolls.map(x => ` ${x}${turn.modifier !== "" ? turn.modifierDirection : ""}${turn.modifier} `)}]`} = {turn.result}</p>
                  </>
                }
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
