import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import BiodataForm from '../components/BiodataForm';

const Index = () => {
  return (
    <>
      <Header />
      <Home />
      <BiodataForm />
      <Services />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Index;
