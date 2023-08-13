import React from 'react'
import s from './style.module.scss'

type CustomDropDownProps = {
    label: string,
    name: string,
    changeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    values : Array<{value : string,label : string}>,
    currentValue : string
}

const SelectField = (props: CustomDropDownProps) => {
    return (
        <label htmlFor={props.label} className={s.label}>{props.label}
            <select
                className={s.select}
                name={props.name}
                onChange={props.changeHandler}
                value={props.currentValue}
            >
                {props.values.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

export default SelectField