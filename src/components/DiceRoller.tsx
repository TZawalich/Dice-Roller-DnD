import { ChangeEventHandler, useState } from "react";
import styles from "./DiceRoller.module.css"

const DiceRoller = (props: { dice: number, passRoll: Function }) => {
    const [dice, setDice] = useState<number>(props.dice)
    const [numberOfDice, setNumberOfDice] = useState<number | string>('')
    const [modifier, setModifier] = useState<number | string>('')
    const [modifierDirection, setModifierDirection] = useState<string>("+")
    const [modifierApplication, setModifierApplication] = useState<string>("once")
    const [results, setResults] = useState<number>(0)


    const setNumberHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        console.log(+e.currentTarget.value)
        if (isNaN(+e.currentTarget.value)) { setNumberOfDice(0) }
        else { setNumberOfDice(+e.currentTarget.value) };
    }
    const setModifierHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        if (isNaN(+e.currentTarget.value)) { setModifier(0) }
        else { setModifier(+e.currentTarget.value) };
    }
    const setModifierDirectionHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target.value)
        setModifierDirection(e.target.value);
    }

    const setModifierApplicationHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.target.value)
        setModifierApplication(e.target.value);
    }

    const rollHandler = (dice:number, numberOfDice:number|string, modifier:number|string, modifierDirection:string, modifierApplication:string) => {
        let diceNumberCheck: number;
        let modifierCheck : number;
        let rolls = [];

        diceNumberCheck = isNaN(+numberOfDice) ? 0 :  +numberOfDice; //check if not a number, if string, set to zero, otherwise set to diceNumberCheck var for futher checks
        modifierCheck = isNaN(+modifier) ? 0 : +modifier;

        diceNumberCheck = diceNumberCheck > 500 ? 500 : diceNumberCheck; //stop these kids from rolling more than 500 dice at once
        modifierCheck = modifierDirection === "+" ? modifierCheck : modifierCheck * -1; //sets modifier direction
        
        if( modifierApplication === "all"){  //apply modifier roll to each die
            for (let i = 0; i < diceNumberCheck; i++) { rolls.push(minMaxRoller(1, dice, modifierCheck)) }
        }else{//apply modifier once to entire roll array
            for (let i = 0; i < diceNumberCheck; i++) { rolls.push(minMaxRoller(1, dice, 0)) }
            rolls.push(modifierCheck)
        }
        const result = rolls.reduce((acc, val) => acc + val, 0);

        setResults(result);
        props.passRoll({result, rolls, modifierApplication, })
    }

    function minMaxRoller(min: number, max: number, modifier: number) {
        return (min + Math.floor(Math.random() * (max - min + 1)) + modifier)
    }

    return (
        <div className={styles.diceRow}>
            <div className={styles.numberOfDice}>
                <input type="number" value={numberOfDice} min={0} max={500} placeholder="0" onChange={setNumberHandler}></input> <label>d{dice}</label>
            </div>
            <div className={styles.modifierDirection}>
                <div onChange={setModifierDirectionHandler}>
                    <input type="radio" value="+" name="+" checked={modifierDirection === "+"} /> +
                    <input type="radio" value="-" name="-" checked={modifierDirection === "-"} /> -
                </div>
            </div>
            <div className={styles.modifierApplication}>
                <div onChange={setModifierApplicationHandler}>
                    <input type="radio" value="all" name="all" checked={modifierApplication === "all"} /> Add modifier to each die ex. 5(d4+1)
                    <input type="radio" value="once" name="once" checked={modifierApplication === "once"} /> Add modifier after rolling ex. (5d4)+1
                </div>
            </div>
            <div className={styles.modifier}>
                <input type="number" value={modifier} min={0} max={500} placeholder="0" onChange={setModifierHandler}></input> <label>Modifier</label>
            </div>
            <div className={styles.roll}>
                <button onClick={() => rollHandler(dice, numberOfDice, modifier, modifierDirection, modifierApplication)}>Roll</button>
            </div>
            <div className={styles.results}>
                {results}
            </div>
        </div>
    )
}

export default DiceRoller;