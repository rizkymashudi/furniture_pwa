import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Browse from "./components/Browse.js";
import Arrived from "./components/Arrived.js";
import Client from "./components/Client.js";
import AsideMenu from "./components/AsideMenu.js";
import Footer from "./components/Footer.js";
import Offline from './components/Offline.js';
import { responsesAreSame } from 'workbox-broadcast-update';
import Splash from './pages/splash.js';
import Profile from './pages/profile.js';
import Details from './components/Details.js';
import Cart from './pages/Cart.js';


function App({ cart }) {
  const [items, setItems] = React.useState([]);
  const [offlineStatus, setOfflineStatus] = React.useState(!navigator.onLine)
  const [isLoading, setIsLoading] = React.useState(true)
  
  function handleOfflineStatus() {
    setOfflineStatus(!navigator.onLine)
  }

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

      const script = document.createElement("script")
      script.src = "/carousel.js"
      script.async = false
      document.body.appendChild(script)

    })();

    //Offline Notifbar
    handleOfflineStatus()
    window.addEventListener('online', handleOfflineStatus)
    window.addEventListener('offline', handleOfflineStatus)

    //Timeout splash screen
    setTimeout(function(){
      setIsLoading(false)
    }, 1500)

    return function() {
      window.removeEventListener('online', handleOfflineStatus)
      window.removeEventListener('offline', handleOfflineStatus)
    }

  }, [offlineStatus]);

 
  return (
    <>
      { isLoading == true ? <Splash/> :
        (
          <>
            {offlineStatus && <Offline />}
            <Header mode="light" cart={cart} />
            <Hero />
            <Browse />
            <Arrived items={items}/>
            <Client />
            <AsideMenu />
            <Footer />
          </>
        )}
      
    </>
  );
}

export default function Routes(){
  const cachedCart = window.localStorage.getItem("cart")
  const [cart, setCart] = React.useState([])
 
  function handleAddToCart(item) {
    const currentIndex = cart.length;
    const newCart = [...cart, {id: currentIndex + 1, item}]
    setCart(newCart)
    window.localStorage.setItem("cart", JSON.stringify(newCart))
  }

  function handleRemoveCartItem(event, id){
    const revisedCart = cart.filter(function(item) {
      return item.id != id
    })
    setCart(revisedCart)
    window.localStorage.setItem("cart", JSON.stringify(revisedCart))
  }

  React.useEffect(function () {
    console.info("useEffectfor localStorage")
    if (cachedCart !== null) {
      setCart(JSON.parse(cachedCart))
    }
  }, [cachedCart])

  return (
    <Router>
      <Route path="/" exact>
        <App cart={cart}/>
      </Route>
      <Route path="/Profile" exact component={Profile} />
      <Route path="/details/:id">
        <Details handleAddToCart={handleAddToCart} cart={cart} />
      </Route>
      <Route path="/cart">
        <Cart cart={cart} handleRemoveCartItem={handleRemoveCartItem}/>  
      </Route>
    </Router>
  )
};
