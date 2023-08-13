import { MouseEvent } from "react"
import MainForm from "../MainForm"
import s from "./styles.module.scss"

const Modal = ({close}: {close: () => void}) => {
    const clickOutside = (event: MouseEvent<HTMLDivElement>) => {
        if(event.target === event.currentTarget) {
            close && close()
        }
    }
    return (
        <div className={s.outside} onClick={clickOutside}>
            <div className={s.modal}>
                <MainForm/>
            </div>
        </div>
    )
}

export default Modal