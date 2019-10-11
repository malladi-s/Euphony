import React from 'react';
import { Link } from 'react-router-dom';

import Sidebar from '../shared/Sidebar';

export default function HomePage(props) {
  const { latestAlbum } = props;
  return (
    <section className="page-content">
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <h1>Welcome to Euphony</h1>
          <p>
            An app where you can look up artists you like and albums you own,
            and add them to your list. Got rid of an album or decided you’re not that fond of an
            artist? Just remove them.
        </p>
          <ul>
            <li><h3><Link to="/artists">Search Artists</Link></h3></li>
            <li><h3><Link to="/albums">Search Albums</Link></h3></li>
          </ul>
        </div>
        <Sidebar latestAlbum={latestAlbum} />
      </div>
    </section>
  )
}