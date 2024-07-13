import React from 'react';
import Top from './Home/top';
import Benefits from './Home/benefits';
import WhyChooseUs from './Home/whychooseus';
import Services from './Home/services';
// import './App.css';

function Home() {
  return (
    <>
      <Top />
      <Benefits />

      <div className="flex items-center justify-center pb-20 bg-gray-100 pt-14">
        <WhyChooseUs />
      </div>
      <Services />
    </>



  );
}

export default Home;
