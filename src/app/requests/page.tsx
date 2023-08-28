"use client"

import s from "./style.module.scss"
import PrivateRoute from "../../components/PrivateRoute";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import AuthStore from "../../store/AuthStore";
import { inject, observer } from "mobx-react";
import { RequestsResponse } from "../../types/RequestsResponse";
import moment from "moment";
import InputField from "../../components/InputField";
import { UserInfo } from "../../types/UserInfo";
import ShipperService from "../../services/ShipperService";
import { isAxiosError } from "axios";
import UserService from "../../services/UserService";
import CarrierService from "../../services/CarrierService";
import { Prices } from "../../types/Prices";
import CarriersModal from "../../components/CarriersModal";
import { Carrier } from "../../types/Carrier";

const Requests = ({authStore}: {authStore: typeof AuthStore}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [tabActive, setTabActive] = useState(1)
  const [values, setValues] = useState<UserInfo>({
    userId: authStore.user.id,
    companyName: '',
    BIN: '',
    contactName: '',
    address: '',
    phone: ''
  });
  const [logo, setLogo] = useState<File | Blob | null>(null)
  const [requests, setRequests] = useState<RequestsResponse[]>([])
  const [success, setSuccess] = useState(false)
  const [fetchCarrierInfo, setFetchCarrierInfo] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [hidePriceInput, setHidePriceInput] = useState('')
  const [price, setPrice] = useState('')
  const [currentPrice, setCurrentPrice] = useState<Prices[]>([])
  const [carriersOpen, setCarriersOpen] = useState(false)
  const [carriers, setCarriers] = useState<Carrier[]>([])
  const handleModalOpen = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(authStore.user.roles.find(role => role === 5150)) {
          const { data } = await ShipperService.getRequests(authStore.user.id)
          setRequests(data)
        }
        else {
          const { data } = await CarrierService.getRequests()
          setRequests(data)
        }
      } catch (error) {
          if(error instanceof Error) {
              console.log(error.message)
          }
          else console.log('Unexpected error', error)
      }
    }
    fetchData()
  }, [!modalOpen, !carriersOpen])

  const handleShowCarrier = (carrier: string) => {
    setFetchCarrierInfo(true)
    setTabActive(0)
    const fetchData = async () => {
      try {
        const {data} = await UserService.getUserLogo(carrier)
        const file = new File([data], 'logo.jpg', {type: 'image/jpeg'})
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
        const { data } = await UserService.getUserInfo(carrier)

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
  }

  useEffect(() => {
    if(tabActive === 2 || tabActive === 0) {
      const fetchData = async () => {
        try {
          const {data} = await UserService.getUserLogo(authStore.user.id)
          const file = new File([data], 'logo.jpg', {type: 'image/jpeg'})
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
          const { data } = await UserService.getUserInfo(authStore.user.id)

          setValues(data)
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
            else console.log('Unexpected error', error)
        }
      }
      if(!fetchCarrierInfo) {
        fetchData()
        fetchData2()
      }
    }
    if(tabActive === 1) {
      const fetchPrices = async () => {
        try {
          const { data } = await CarrierService.getMyPrices(authStore.user.id)
          setCurrentPrice(data)
        } catch (error) {
          if(error instanceof Error) {
            console.log(error.message)
          }
          else console.log('Unexpected error', error)
        }
      }
      fetchPrices()
    }
    else {
      setSuccess(false)
      setErrMsg('')
    }
  }, [tabActive])

  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value)
  }

  const handleGetReqPrices = async (requestId: string) => {
    try {
      const {data} = await ShipperService.getPrices(requestId)
      setCarriersOpen(true)
      setCarriers(data)
    } catch (error) {
      
    }
  }

  const handleSubmitPrice = async (requestId: string) => {
    if(hidePriceInput !== '' && price !== '') {
      try {
        const {data} = await CarrierService.setPrice(authStore.user.id, requestId, price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
        const updatedCurrentPrice = currentPrice.map(price =>
          price.request === data.request ? { ...price, price: data.price } : price)
        setCurrentPrice(updatedCurrentPrice)
        setHidePriceInput('')
      } catch (error) {
        if(isAxiosError(error) && error.response) {
          setErrMsg(error.response.data.message)
          setSuccess(false)
        }
        else setErrMsg('Unexpected error')
      }
    }
    else setHidePriceInput(requestId)
  }

  const handleChangeActiveTab = (num: number) => {
    setFetchCarrierInfo(false)
    setTabActive(num)
  }

  const handleChange = (event : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        const value = values[key as keyof UserInfo];
        if (typeof value === 'number' || typeof value === 'string') {
          formData.append(key, value.toString());
        }
      }

      if(logo) {
        formData.append('logo', logo);
      }
      const response = await UserService.setUserInfo(formData)
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
      <PrivateRoute requiredRoles={[5150, 2120]}>
        <div className="primary">
          <div className={s.navigation}>
            <div onClick={() => handleChangeActiveTab(0)} className={`${tabActive === 0 && s.route_active} ${s.route}`}>{fetchCarrierInfo ? 'Профиль перевозчика' : 'Профайл'}</div>
            <div onClick={() => handleChangeActiveTab(1)} className={`${tabActive === 1 && s.route_active} ${s.route}`}>Заявки</div>
            <div onClick={() => handleChangeActiveTab(2)} className={`${tabActive === 2 && s.route_active} ${s.route}`}>Настройки</div>
          </div>
          <div className={`${s.tab} ${tabActive === 0 && s.tab_active}`}>
            <div className={s.profile}>
            <div>
            <h2 className={s.title}>Информация о грузоотправителе</h2>
            <div className={s.profile__info}>
              <div>Наименование компании</div>
              <div className={s.profile__companyname}>{values.companyName}</div>
            </div>
            <div className={s.profile__info}>
              <div>БИН</div>
              <div>{values.BIN}</div>
            </div>
            <div className={s.profile__info}>
              <div>Адрес компании</div>
              <div>{values.address}</div>
            </div>
            <div className={s.profile__info}>
              <div>Контактное лицо</div>
              <div>{values.contactName}</div>
            </div>
            <div className={s.profile__info}>
              <div>Телефон</div>
              <div>{values.phone}</div>
            </div>
            </div>
            {logo && <img className={s.profile__img} src={URL.createObjectURL(logo)} />}
            </div>
          </div>
          <div className={`${s.tab} ${tabActive === 1 && s.tab_active}`}>
            <div className={s.tab__top}>
              <h2 className={s.title}>{authStore.user.roles?.find(role => role === 5150) ? 'Мои заказы' : 'Новые заявки'}</h2>
              {authStore.user.roles?.find(role => role === 5150) && <button onClick={handleModalOpen} className={s.tab__btn}>Добавить заявку</button>}
            </div>
            <div className={s.requests}>
              {requests.map((request, id) => {
                const date = moment(request.date).format('DD.MM.YYYY hh:mm')
                return (
                  <div className={s.requests__item}>
                <div>
                  <h3 className={s.requests__title}>Заказ #{request._id.slice(request._id.length / 2, request._id.length)} от {date}</h3>
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
                  {hidePriceInput !== request._id ? <div className={s.requests__price}>Стоимость: {currentPrice[id]?.request === request._id ? currentPrice[id].price : 'XXXXXXX'} тг</div> :
                  <InputField value={price} type="number" style="first" name="price" placeholder="Введите цену в тенге..." changeHandler={handlePrice} />}
                  {authStore.user.roles?.find(role => role === 5150) ? <button onClick={() => handleGetReqPrices(request._id)} className={`${request.carrier ? s.requests__btn_active : s.requests__btn}`}>{request.carrier ? 'Изменить перевозчика' : 'Выбрать перевозчика'}</button> :
                  <button onClick={() => handleSubmitPrice(request._id)} className={s.requests__btn_active}>{!currentPrice ? 'Предложить свою цену': 'Изменить свою цену'}</button>}
                  {request.carrier && <button onClick={() => handleShowCarrier(request.carrier)} className={s.requests__btn}>Перейти к профилю</button>}
                </div>
              </div>
                )}
                )}
            </div>
          </div>
          <div className={`${s.tab} ${tabActive === 2 && s.tab_active}`}>
            <h2 className={s.title}>Информация о {authStore.user.roles?.find(role => role === 5150) ? 'грузоотправителе' : 'перевозчике'}</h2>
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
      {carriersOpen && <CarriersModal carriers={carriers} close={() => setCarriersOpen(false)} />}
      </PrivateRoute>
    );
};

export default inject('authStore')(observer(Requests))