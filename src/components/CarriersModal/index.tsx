import { MouseEvent, useState } from "react"
import s from "./styles.module.scss"
import { Carrier } from "../../types/Carrier"
import UserService from "../../services/UserService"
import { UserInfo } from "../../types/UserInfo"
import ShipperService from "../../services/ShipperService"

const CarriersModal = ({carriers, close}: {carriers: Carrier[], close: () => void}) => {
    const [values, setValues] = useState<UserInfo>()
    const [showInfo, setShowInfo] = useState('')

    const clickOutside = (event: MouseEvent<HTMLDivElement>) => {
        if(event.target === event.currentTarget) {
            close && close()
        }
    }
    const handleShowCarrier = async (user: string) => {
        if(values?.companyName === showInfo) {
            setShowInfo('')
        }
        else {
            try {
                const { data } = await UserService.getUserInfo(user)
                setValues(data)
                setShowInfo(data.companyName)
            } catch (error) {
                if(error instanceof Error) {
                    console.log(error.message)
                }
                else console.log('Unexpected error', error)
            }
        }
    }
    const handleChooseCarrier = async (request: string, price: string, user: string) => {
        try {
            const {data} = await ShipperService.setChooseCarrier(request, price, user)
            alert(data.message)
        } catch (error) {
            
        }
    }

    return (
        <div className={s.outside} onClick={clickOutside}>
            <div className={s.modal}>
                {carriers.length > 0 ?
                <div className={s.carriers}>
                    <div className={s.carriers__item}>
                        <div className={s.carriers__head}>Цена:</div>
                        <div className={s.carriers__head}>Компания:</div>
                    </div>
                    {carriers.map(carrier => (
                        <div className={s.carriers__item}>
                            <div>{carrier.price} тг</div>
                            <div>{carrier.companyName}</div>
                            <div className={`${!showInfo ? s.showbtn : ''}`} onClick={() => handleShowCarrier(carrier.user)}>{showInfo ? 'Скрыть' : 'О перевозчике'}<i className={`${showInfo ? s.up : s.down} ${s.i}`}></i></div>
                            {showInfo !== '' && values?.companyName === carrier.companyName &&
                            <div className={s.carriers__info}>
                                <div>БИН: {values?.BIN}</div>
                                <div>Адрес: {values?.address}</div>
                                <div>Контактное лицо: {values?.contactName}</div>
                                <div>Телефон: {values?.phone}</div>
                                {values?.companyName === carrier.companyName &&
                                <button onClick={() => handleChooseCarrier(carrier.request, carrier.price, carrier.user)}>Выбрать перевозчика</button>}
                            </div>}
                        </div>
                    ))}
                </div>:
                <div>Предложении пока нет</div>}
            </div>
        </div>
    )
}

export default CarriersModal