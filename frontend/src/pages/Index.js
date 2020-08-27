import React, { Fragment } from 'react';

import Hero from '../components/index/Hero';
import FindJob from '../components/index/FindJob';
import Testimonials from '../components/index/Testimonials';
import GetInTouch from '../components/index/GetInTouch';

export default function Index() {
  return (
    <Fragment>
      <Hero />
      <FindJob />
      <Testimonials />
      <GetInTouch />
    </Fragment>
  );
}
