"use client"

import s from "./style.module.scss"
import PrivateRoute from "../../components/PrivateRoute";
import { ChangeEvent, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import AuthStore from "../../store/AuthStore";
import { inject, observer } from "mobx-react";
import { RequestsResponse } from "../../types/RequestsResponse";
import moment from "moment";
import InputField from "../../components/InputField";
import { CarrierInfo } from "../../types/CarrierInfo";
import CarrierService from "../../services/CarrierService";
import { isAxiosError } from "axios";

const Requests = ({authStore}: {authStore: typeof AuthStore}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [tabActive, setTabActive] = useState(1)
  const [values, setValues] = useState<CarrierInfo>({
    userId: authStore.user.id,
    companyName: '',
    BIN: 0,
    contactName: 'Astana',
    address: '',
    phone: ''
  });
  const [logo, setLogo] = useState<File | Blob | null>(null)
  const [requests, setRequests] = useState<RequestsResponse[]>([])
  const [success, setSuccess] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const handleModalOpen = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await CarrierService.getRequests(authStore.user.id)
        setRequests(data)
      } catch (error) {
          if(error instanceof Error) {
              console.log(error.message)
          }
          else console.log('Unexpected error', error)
      }
    }
    fetchData()
  }, [!modalOpen])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await CarrierService.getCarrierLogo(authStore.user.id)
        const file = new Blob([data], { type: 'image/jpeg' })
        setLogo(file)
      } catch (error) {
          if(error instanceof Error) {
              console.log(error.message)
          }
          else console.log('Unexpected error', error)
      }
    }
    const fetchData2 = async () => {
      try {
        const { data } = await CarrierService.getCarrierInfo(authStore.user.id)

        setValues(data)
      } catch (error) {
          if(error instanceof Error) {
              console.log(error.message)
          }
          else console.log('Unexpected error', error)
      }
    }
    fetchData()
    fetchData2()
  }, [tabActive === 2])

  const handleChange = (event : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ ...values, [event.target.name] : event.target.value });
  }

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setLogo(selectedFile)
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const formData = new FormData();

      for (const key in values) {
        const value = values[key as keyof CarrierInfo];
        if (typeof value === 'number' || typeof value === 'string') {
          formData.append(key, value.toString());
        }
      }

      if(logo) {
        formData.append('logo', logo);
      }
      const response = await CarrierService.setCarrierInfo(formData)
      setSuccess(true)
      setErrMsg('')
    } catch (error) {
      if(isAxiosError(error) && error.response) {
        setErrMsg(error.response.data.message)
        setSuccess(false)
      }
      else setErrMsg('Unexpected error')
    }
  }

    return (
      <PrivateRoute requiredRoles={[5150]}>
        <div className="primary">
          <div className={s.navigation}>
            <div onClick={() => setTabActive(0)} className={`${tabActive === 0 && s.route_active} ${s.route}`}>Профайл</div>
            <div onClick={() => setTabActive(1)} className={`${tabActive === 1 && s.route_active} ${s.route}`}>Заявки</div>
            <div onClick={() => setTabActive(2)} className={`${tabActive === 2 && s.route_active} ${s.route}`}>Настройки</div>
          </div>
          <div className={`${s.tab} ${tabActive === 0 && s.tab_active}`}>
            <h2 className={s.title}>Профайл</h2>
          </div>
          <div className={`${s.tab} ${tabActive === 1 && s.tab_active}`}>
            <div className={s.tab__top}>
              <h2 className={s.title}>Мои заказы</h2>
              <button onClick={handleModalOpen} className={s.tab__btn}>Добавить заявку</button>
            </div>
            <div className={s.requests}>
              {requests.map(request => {
                const date = moment(request.date).format('DD.MM.YYYY hh:mm')
                return (
                  <div className={s.requests__item}>
                <div>
                  <h3 className={s.requests__title}>Заказ {request._id} от {date}</h3>
                  <p className={s.requests__info}>Маршрут: {request.departure} - {request.destination}</p>
                  <p className={s.requests__info}>Конечная точка: {request.destination}</p>
                  <div className={s.requests__creds}>
                    <div className={s.requests__cred}>Вес: {request.weight} тонн</div>
                    <div className={s.requests__cred}>Объем: {request.capacity} м3</div>
                    <div className={s.requests__cred}>Количество вагонов: {request.wagon_numbers}</div>
                    <div className={s.requests__cred}>Род груза: {request.cargo_type}</div>
                    <div className={s.requests__cred}>Род вагона: {request.wagon_type}</div>
                  </div>
                </div>
                <div className={s.requests__inside}>
                  <div className={s.requests__price}>Стоимость: ХХХХХХ тг</div>
                  <button className={s.requests__btn}>Выбрать перевозчика</button>
                </div>
              </div>
                )}
                )}
            </div>
          </div>
          <div className={`${s.tab} ${tabActive === 2 && s.tab_active}`}>
            <h2 className={s.title}>Информация о грузоперевозщике</h2>
            <form onSubmit={handleSubmit}>
              <InputField value={values.companyName} type="text" style="second" label="Наименование компании" name="companyName" changeHandler={handleChange} required />
              <InputField value={values.BIN} type="number" style="second" label="БИН" name="BIN" changeHandler={handleChange} required />
              <InputField value={values.address} type="text" style="second" label="Адрес компании" name="address" changeHandler={handleChange} required />
              <InputField value={values.contactName} type="text" style="second" label="Контактное лицо" name="contactName" changeHandler={handleChange} required />
              <InputField value={values.phone} type="phone" style="second" label="Телефон" name="phone" changeHandler={handleChange} required />
              <InputField type="file" style="second" label="Логотип" name="logo" changeHandler={handleLogoUpload} logo={logo} />
              <button>Изменить</button>
            </form>
            {errMsg && <p className={errMsg ? s.errmsg : s.offscreen}>{errMsg}</p>}
            {success && <p className={success ? s.success : s.offscreen}>Успешно загружено</p>}
          </div>
      </div>
      {modalOpen && <Modal close={() => setModalOpen(false)}/>}
      </PrivateRoute>
    );
};

export default inject('authStore')(observer(Requests))