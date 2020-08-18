import React from 'react';

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import FindJob from '../components/FindJob';
import GetInTouch from '../components/GetInTouch';

export default function Index() {
  return (
    <Layout>
      <Hero />
      <FindJob />
      <Testimonials />
      <GetInTouch />
    </Layout>
  );
}
