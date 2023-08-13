import {useEffect} from 'react'
import s from './style.module.scss'

type CustomTextFieldProps = {
    type: string,
    label: string,
    name: string,
    style: string,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    logo?: File | Blob | null,
    value?: string | number
}

const InputField = (props: CustomTextFieldProps) => {
    useEffect(() => {
        console.log(props.logo)
    }, [props.logo])
    return (
        <div className={`${props.style === 'first' ? s.box : s.box_secondary }`}>
            <label htmlFor={props.label} className={`${props.style === 'first' ? s.label : s.label_secondary }`} dangerouslySetInnerHTML={{ __html: props.label }}></label>
            <div className={`${props.type === 'file' && s.input_file_box}`}>
                <input
                    value={props.value}
                    className={`${props.style === 'first' ? s.input : s.input_secondary } ${props.type === 'file' && s.input_file}`}
                    type={props.type}
                    id={props.label}
                    name={props.name}
                    onChange={props.changeHandler}
                    required={props.required}
                />
                {props.type === 'file' && <span className={s.span}>Выберите файл...</span>}
                {props.logo && <img src={URL.createObjectURL(props.logo)} className={s.preview} />}
            </div>
        </div>
    );
}

export default InputField