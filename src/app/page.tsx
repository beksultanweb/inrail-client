import s from './styles.module.scss'

import partner1 from '../assets/images/partner1.jpg'
import partner2 from '../assets/images/partner2.png'
import partner3 from '../assets/images/partner3.png'
import partner4 from '../assets/images/partner4.png'

import about from '../assets/images/services.jpg'

import Image from 'next/image'
import MainForm from '../components/MainForm';

const Home = () => {

  return (
    <>
    <main className={s.main}>
      <div className='primary'>
        <div className={s.main_content}>
          <h1 className={s.main__title}>Железнодорожные грузоперевозки по казахстану</h1>
          <MainForm/>
        </div>
      </div>
    </main>
    <section className={s.about}>
      <div className="primary">
        <h2 className={s.secondary__title}>О сервисе</h2>
        <div className={s.about_content}>
          <p className={s.paragraph}>InRail помогает организовать грузовые перевозки
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
          <Image src={about} alt="about" />
        </div>
      </div>
    </section>
    <section className={s.howitworks}>
      <div className="primary">
        <h2 className={s.secondary__title}>Как это работает?</h2>
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
        <h2 className={s.secondary__title}>С нами работают</h2>
        <div className={s.partners_content}>
          <Image src={partner1} alt="partner" />
          <Image src={partner2} alt="partner" />
          <Image src={partner3} alt="partner" />
          <Image src={partner4} alt="partner" />
        </div>
      </div>
    </section>
    </>
  );
};

export default Home