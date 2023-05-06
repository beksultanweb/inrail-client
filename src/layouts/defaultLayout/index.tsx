import { Footer } from '../../components/Footer'
import Header from '../../components/Header'


interface IProps {
  children: JSX.Element[] | JSX.Element;
}

const DefaultLayout = (props: IProps): JSX.Element => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
      {/*<Loader/>*/}
    </>
  );
};

export default DefaultLayout;