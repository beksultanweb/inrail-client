import React from 'react'
import s from './style.module.scss'

type CustomTextFieldProps = {
    type: string,
    label: string,
    name: string,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const InputField = (props: CustomTextFieldProps) => {
    return (
        <div>
            <label htmlFor={props.label} className={s.label} dangerouslySetInnerHTML={{ __html: props.label }}></label>
            <input
                type={props.type}
                id={props.label}
                name={props.name}
                onChange={props.changeHandler}
            />
        </div>
    );
}

export default InputField