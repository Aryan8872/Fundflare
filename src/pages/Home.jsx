import Footer from "../components/Footer";
import FundraisingSection from "../components/FundRaisingSection";
import Hero from "../components/Hero";
import InvestoSection1 from "../components/InvestoSection1";
import InvestoSection2 from "../components/InvestoSection2";
import NewVenture from "../components/NewVenture";

const Home = () => {
  return (
   <div>
      <Hero/>
      <NewVenture/>
      <InvestoSection1/>
      <InvestoSection2/>
      <FundraisingSection/>
      <Footer/>
   </div>
  );
};

export default Home;
