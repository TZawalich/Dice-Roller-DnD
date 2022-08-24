import { ChangeEventHandler, FormEventHandler, useState } from "react";
import styles from "./DiceRoller.module.css"

const DiceRoller = (props: { dice: number, passRoll: Function }) => {
    const [dice, setDice] = useState<number>(props.dice)
    const [numberOfDice, setNumberOfDice] = useState<number | string>(1)
    const [modifier, setModifier] = useState<number | string>('')
    const [modifierDirection, setModifierDirection] = useState<string>("+")
    const [modifierApplication, setModifierApplication] = useState<string>("once")
    const [results, setResults] = useState<number>(0)


    const setNumberHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        console.log(+e.currentTarget.value)
        if (isNaN(+e.currentTarget.value) || +e.currentTarget.value === 0) { setNumberOfDice(1) }
        else { setNumberOfDice(e.currentTarget.value) };
    }
    const setModifierHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        if (isNaN(+e.currentTarget.value)) { setModifier(0) }
        else { setModifier(+e.currentTarget.value) };
    }
    const setModifierDirectionHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setModifierDirection(e.target.value);
    }

    const setModifierApplicationHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        setModifierApplication(e.target.value);
    }

    const rollHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        let diceNumberCheck: number;
        let modifierCheck: number;
        let rolls = [];
        let modifiedRolls: number[];

        diceNumberCheck = isNaN(+numberOfDice) ? 1 : +numberOfDice; //check if not a number, if string, set to one, otherwise set to diceNumberCheck var for futher checks
        modifierCheck = isNaN(+modifier) ? 0 : +modifier;

        diceNumberCheck = diceNumberCheck > 500 ? 500 : diceNumberCheck; //stop these kids from rolling more than 500 dice at once
        modifierCheck = modifierDirection === "+" ? modifierCheck : modifierCheck * -1; //sets modifier direction

        if (modifierApplication === "all") {  //apply modifier roll to each die
            for (let i = 0; i < diceNumberCheck; i++) { rolls.push(minMaxRoller(1, dice)) }
            modifiedRolls = rolls.map(x => x + modifierCheck)
        } else {//apply modifier once to entire roll array
            for (let i = 0; i < diceNumberCheck; i++) { rolls.push(minMaxRoller(1, dice)) }
            modifiedRolls = [...rolls, modifierCheck]
        }
 
        let result: number;
        diceNumberCheck === 0 ? result = modifierCheck : result = modifiedRolls.reduce((acc, val) => acc + val, 0);
        
        setResults(result);
        props.passRoll({ result, rolls, modifierApplication, modifier, dice, modifierDirection })
    }

    function minMaxRoller(min: number, max: number) {
        return (min + Math.floor(Math.random() * (max - min + 1)))
    }

    return (
        <div className={styles.diceRow}>
            <form onSubmit={rollHandler}>
            <div className={styles.numberOfDice}>
                <label>
                    <input
                        type="number"
                        value={numberOfDice}
                        min={1} max={500}
                        placeholder="1"
                        onChange={setNumberHandler}
                    />
                    &nbsp;d{dice}
                </label>
            </div>
            <div className={styles.modifierDirection}>
                    <label>
                        <input
                            type="radio"
                            value="+"
                            name="+"
                            onChange={setModifierDirectionHandler}
                            checked={modifierDirection === "+"}
                        />
                        +
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="-"
                            name="-"
                            onChange={setModifierDirectionHandler}
                            checked={modifierDirection === "-"}
                        />
                        -
                    </label>
            </div>
            <div className={styles.modifier}>
                <label>
                {modifierDirection === "+" ? "+" : "-" } &nbsp;
                    <input
                        type="number"
                        value={modifier}
                        min={0}
                        max={500}
                        placeholder="0"
                        onChange={setModifierHandler}
                    />
                </label>

            </div>
            <div className={styles.modifierApplication}>
                    <label>
                        <input
                            type="radio"
                            value="all"
                            name="all"
                            onChange={setModifierApplicationHandler}
                            checked={modifierApplication === "all"}
                        />
                        Add to each die
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="once"
                            name="once"
                            onChange={setModifierApplicationHandler}
                            checked={modifierApplication === "once"}
                        />
                        Add after rolling dice
                    </label>
            </div>
            <div className={styles.roll}>
                <button type="submit">Roll</button>
            </div>
            </form>
            <div className={styles.results}>
                {results}
            </div>
        </div>
    )
}

export default DiceRoller;