import React from 'react';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Browse from "./components/Browse.js";
import Arrived from "./components/Arrived.js";
import Client from "./components/Client.js";
import AsideMenu from "./components/AsideMenu.js";
import Footer from "./components/Footer.js";


function App() {
  return (
    <>
      <Header />
      <Hero />
      <Browse />
      <Arrived />
      <Client />
      <AsideMenu />
      <Footer />
    </>
  );
}

export default App;
