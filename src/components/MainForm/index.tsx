"use client"

import SelectField from "../SelectField"
import InputField from "../InputField"
import { useState } from "react"
import { Values } from "../../types/Values"
import s from "./style.module.scss"
import { departureStations } from "../../mocks/variations"
import { destinationStations } from "../../mocks/variations"
import { cargoTypes } from "../../mocks/cargo_types"
import { wagonTypes } from "../../mocks/wagon_types"
import CarrierService from "../../services/ShipperService"
import { isAxiosError } from "axios"

const MainForm = () => {
    const [values, setValues] = useState<Values>({
        weight: 0,
        capacity: 0,
        destination: 'Astana',
        departure: 'Astana',
        cargo_type: 'Лес',
        wagon_type: 'Полуоткрытый'
      });

    const [success, setSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
        const response = await CarrierService.createRequest(values)
        setSuccess(true)
      } catch (error) {
        if(isAxiosError(error) && error.response) {
          setErrMsg(error.response.data.message)
        }
        else setErrMsg('Unexpected error')
      }
    }

    const handleChange = (event : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues({ ...values,[event.target.name] : event.target.value });
    }

    return (
        <form className={s.form} onSubmit={e => handleSubmit(e)}>
            <h2 className={s.form_title}>Подача заявки на грузоперевозки</h2>
            {errMsg && <p className={errMsg ? s.errmsg : s.offscreen}>{errMsg}</p>}
            {success && <p className={success ? s.success : s.offscreen}>Успешно загружено</p>}
            <SelectField label='Станция отправления' name='departure' values={departureStations} currentValue={values.departure} changeHandler={handleChange}/>
            <SelectField label='Станция назначения' name='destination' values={destinationStations} currentValue={values.destination} changeHandler={handleChange}/>
            <div className={s.inputs}>
              <InputField type='number' style="first" name='weight' label='Вес груза' changeHandler={handleChange}/>
              <InputField type='number' style="first" name='capacity' label='Объем груза м<sup>3</sup>' changeHandler={handleChange}/>
            </div>
            <div className={s.inputs}>
              <SelectField label='Род груза' name='cargo_type' values={cargoTypes} currentValue={values.cargo_type} changeHandler={handleChange}/>
              <SelectField label='Тип вагона' name='wagon_type' values={wagonTypes} currentValue={values.wagon_type} changeHandler={handleChange}/>
            </div>
            <InputField type='number' style="first" name='wagon_numbers' label='Количество вагонов' changeHandler={handleChange}/>
            <button type={'submit'} className={s.button}>Отправить заявку</button>
        </form>
    )
}

export default MainForm