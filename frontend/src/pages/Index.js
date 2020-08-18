import React, { Fragment } from 'react';

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import FindJob from '../components/FindJob';

export default function Index() {
  return (
    <Fragment>
      <Hero />
      <FindJob />
      <Testimonials />
    </Fragment>
  );
}
