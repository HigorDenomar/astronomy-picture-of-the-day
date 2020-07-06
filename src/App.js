import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios';
import key from './api_key';

function App() {
  const [picture, setPicture] = useState();

  useEffect(() => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${key}`).then(response => {

      let { date, title, url, hdurl, copyright } = response.data;

      date = date.split('-').reverse().join('/');

      setPicture({
        date,
        title,
        url,
        hdurl,
        copyright
      });
    });
  }, []);

  return (
    <>
      <header>
        <h1>An astronomical picture every day</h1>
        <p><b>{picture?.date}</b></p>
      </header>

      <main>
        {picture ?
          <>
            <p><b>{picture?.title}</b></p>

            {picture.url ? <img src={picture?.url} alt={picture?.title} /> : <p>{picture?.explanation}</p>}

            {picture.copyright ? <p>Author: <i>{picture?.copyright}</i></p> : <p>Author: <i>Desconhecido</i></p>}

          </>
          :
          <p>loading...</p>
        }
      </main>
    </>
  );
}

export default App;
