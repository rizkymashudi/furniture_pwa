import React from 'react';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Browse from "./components/Browse.js";
import Arrived from "./components/Arrived.js";
import Client from "./components/Client.js";
import AsideMenu from "./components/AsideMenu.js";
import Footer from "./components/Footer.js";
import { responsesAreSame } from 'workbox-broadcast-update';


function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(function() {
    (async function() {
      const response = await fetch('https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc', {
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          "x-api-key": process.env.REACT_APP_APIKEY
        }
      });
      const { nodes } = await response.json();
      setItems(nodes);
    })();
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Browse />
      <Arrived items={items}/>
      <Client />
      <AsideMenu />
      <Footer />
    </>
  );
}

export default App;
