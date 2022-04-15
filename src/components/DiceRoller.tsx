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

    const rollHandler = (dice: number, numberOfDice: number | string, modifier: number | string, modifierDirection: string, modifierApplication: string) => {
        let diceNumberCheck: number;
        let modifierCheck: number;
        let rolls = [];
        let modifiedRolls: number[];

        diceNumberCheck = isNaN(+numberOfDice) ? 0 : +numberOfDice; //check if not a number, if string, set to zero, otherwise set to diceNumberCheck var for futher checks
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

        const result = modifiedRolls.reduce((acc, val) => acc + val, 0);

        setResults(result);
        props.passRoll({ result, rolls, modifierApplication, modifier })
    }

    function minMaxRoller(min: number, max: number) {
        return (min + Math.floor(Math.random() * (max - min + 1)))
    }

    return (
        <div className={styles.diceRow}>
            <div className={styles.numberOfDice}>
                <label>
                    <input
                        type="number"
                        value={numberOfDice}
                        min={0} max={500}
                        placeholder="0"
                        onChange={setNumberHandler}
                    />
                    d{dice}
                </label>
            </div>
            <div className={styles.modifierDirection}>
                <form>
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
                </form>
            </div>
            <div className={styles.modifier}>
                <label>
                    <input
                        type="number"
                        value={modifier}
                        min={0}
                        max={500}
                        placeholder="0"
                        onChange={setModifierHandler}
                    />
                    Modifier
                </label>

            </div>
            <div className={styles.modifierApplication}>
                <form>
                    <label>
                        <input
                            type="radio"
                            value="all"
                            name="all"
                            onChange={setModifierApplicationHandler}
                            checked={modifierApplication === "all"}
                        />
                        Add modifier to each die ex. 5(d4+1)
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="once"
                            name="once"
                            onChange={setModifierApplicationHandler}
                            checked={modifierApplication === "once"}
                        />
                        Add modifier after rolling ex. (5d4)+1
                    </label>
                </form>
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