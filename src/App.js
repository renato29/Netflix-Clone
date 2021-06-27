import React from 'react'
import Row from './Row'
import requests from "./requests";
import Banner from './Banner';
import Navbar from './Navbar'
import './App.css'

function App() {


  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <Row title='NETFLIX ORIGINALS' fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />
      <Row title='TRENDING NOW' fetchUrl={requests.fetchTrending} />
      <Row title='TOP RATED' fetchUrl={requests.fetchTopRated} />
      <Row title='Action Movies' fetchUrl={requests.fetchActionMovies} />
      <Row title='Comedy Movies' fetchUrl={requests.fetchComedyMovies} />
      <Row title='Horror Movies' fetchUrl={requests.fetchHorrorMovies} />
      <Row title='Romance Movies' fetchUrl={requests.fetchRomanceMovies} />
      <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
