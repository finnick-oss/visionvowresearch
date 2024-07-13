import React from 'react';
import Top from './About/top';
import OurWorks from './About/ourwork';
import Introduction from './About/intro';
import BigImageComponent from './About/image';

const AboutUs = () => {
  return (
    <>
      <Top />
      <BigImageComponent />
      <Introduction />
      <OurWorks />
    </>
  );
};

export default AboutUs;
