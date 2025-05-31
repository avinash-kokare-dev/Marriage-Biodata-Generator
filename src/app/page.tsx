import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import FormWithPreview from '../components/FormWithPreview';
import MarriageBiodataForm from '../components/test';

const Index = () => {
  return (
    <>
      <Header />
      <Home />
      <FormWithPreview />
      <MarriageBiodataForm />
      <Services />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Index;
