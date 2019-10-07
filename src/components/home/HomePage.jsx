import React from 'react';
import { Button } from 'reactstrap';

import Sidebar from '../shared/Sidebar';

export default function HomePage() {
  return (
    <section className="page-content">
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <p>
            This is the home page.
          </p>
          <Button>Click me</Button>
        </div>
        <Sidebar />
      </div>
    </section>
  )
}