import React from 'react';
import Header from '../../components/Header/Header';
import Slideshow from '../../components/Slideshow/Slideshow';
import DealsOfTheDay from '../../components/Deals/Deals';
import BiggestDeals from '../../components/BiggestDeals/BiggestDeals';
import CategoriesToBag from '../../components/CategoriesToBag/CategoriesToBag';
import TopBrands from '../../components/TopBrands/TopBrands';
import Footer from '../../components/footer/Footer';
import './home.css';

function Home() {
  return (
    <div className="Home">
      <Header />
      <Slideshow />
      <DealsOfTheDay />
      <BiggestDeals />
      <CategoriesToBag />
      <TopBrands />
      <Footer />
    </div>
  );
}

export default Home;
