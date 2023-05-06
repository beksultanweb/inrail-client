import { useState } from 'react';

import s from './styles.module.scss'

import partner1 from '../../assets/images/partner1.jpg'
import partner2 from '../../assets/images/partner2.png'
import partner3 from '../../assets/images/partner3.png'
import partner4 from '../../assets/images/partner4.png'

import about from '../../assets/images/services.jpg'

import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';

// import { FormEvent, SyntheticEvent } from 'react';
import { departureStations } from '../../mocks/variations';
import { destinationStations } from '../../mocks/variations';


type Values = {
  weight: number,
  volume: number,
  destination: string,
  departure: string
}

export const Home = () => {
  const [values, setValues] = useState<Values>({
    weight: 0,
    volume: 0,
    destination: 'Astana',
    departure: 'Astana'
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(values)
  }

  const handleChange = (event : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ ...values,[event.target.name] : event.target.value });
    console.log(event.target.value)
  }
  return (
    <>
    <main className={s.main}>
      <div className='primary'>
        <div className={s.main_content}>
          <h1>Железнодорожные грузоперевозки по казахстану</h1>
          <form onSubmit={e => handleSubmit(e)}>
            <div className={s.form_title}>Подача заявки на грузоперевозки</div>
            <SelectField label={'Станция отправления'} name={'departure'} values={departureStations} currentValue={values.departure} changeHandler={handleChange}/>
            <SelectField label={'Станция назначения'} name={'destination'} values={destinationStations} currentValue={values.destination} changeHandler={handleChange}/>
            <div className={s.inputs}>
              <InputField type={'number'} name={'weight'} label={'Вес груза'} changeHandler={handleChange}/>
              <InputField type={'number'} name={'volume'} label={'Объем груза м<sup>3</sup>'} changeHandler={handleChange}/>
            </div>
            <button type={'submit'} className={s.button}>Отправить заявку</button>
          </form>
        </div>
      </div>
    </main>
    <section className={s.about}>
      <div className="primary">
        <h2>О сервисе</h2>
        <div className={s.about_content}>
          <p>InRail помогает организовать грузовые перевозки
          посредством железнодорожного транспорта по всей
          магистрали, позволяя доставить груз даже в самые
          отдаленные уголки Казахсана. Практикуется следующий
          вид железнодорожной перевозки груза: Контейнерная
          перевозка.<br/><br/>
          В этом случае груз следует по железной дороге
          в запломбированном контейнере, доступ к которому
          получает непосредственно Получатель в конечном
          пункте следования. Контейнерные перевозки
          весьма гибкий вид доставки груза, так как сами
          контейнеры унифицированы и без перетарки могут
          проделать весь долгий путь до клиента с помощью
          разных видов транспорта: железнодорожного, морского,
          автомобильного или речного.</p>
          <img src={about} alt="about" />
        </div>
      </div>
    </section>
    <section className={s.howitworks}>
      <div className="primary">
        <h2>Как это работает?</h2>
        <div className={s.howitworks_circles}>
          <div className={s.circle}>1<div className={s.box_content}>Заполняете и отправляете заявку</div></div>
          <div className={s.strip}></div>
          <div className={s.circle}>2<div className={s.box_content}>Перевозчики видят заявку и делают предложение</div></div>
          <div className={s.strip}></div>
          <div className={s.circle}>3<div className={s.box_content}>Вы выбираете перевозчика и договариваетесь о сделке</div></div>
          <div className={s.strip}></div>
          <div className={s.circle}>4<div className={s.box_content}>В назначенное время ваш груз будет доставлен на станцию назначения</div></div>
        </div>
      </div>
    </section>
    <section className={s.about}>
      <div className="primary">
        <h2>С нами работают</h2>
        <div className={s.partners_content}>
          <img src={partner1} alt="partner" />
          <img src={partner2} alt="partner" />
          <img src={partner3} alt="partner" />
          <img src={partner4} alt="partner" />
        </div>
      </div>
    </section>
    </>
  );
};

