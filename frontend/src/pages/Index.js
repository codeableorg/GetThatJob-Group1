import React, { Fragment } from 'react';

import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import FindJob from '../components/FindJob';
import GetInTouch from '../components/GetInTouch';

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
