import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { color } from "@mui/system";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';




function Favorites() {
  
  const [data, setData] = useState([]);

  const [currentId, setCurrentId] = useState();
  const navigate = useNavigate();

  useEffect(()=> {

    const faco = () => {

        const saved = localStorage?.getItem("token")?.replace(/(^"|"$)/g, '');


        var yourConfig = {
          headers: {
             Authorization : "Bearer "+ saved
            }
       }
    
       
    
        axios
        .get('http://143.198.57.140:8080/api/v1/cryptocurrencies/favorites', yourConfig)
        .then((response) => {
          console.log(response.data)
          setData(response.data);      
          })
        .catch((error) => {
          console.log(error);
        });
    }

    faco();

  },[]);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);


  const handleLogout = () => {
    navigate('/');
  }

  const handleCryptosList = () => {
    navigate('/cryptos');
  }



  return (
    <>
      <AppBar position="static" style={{backgroundColor: "accent"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 3 }}
          >
           
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          <img src="https://www.cultofmoney.com/wp-content/uploads/2022/01/CoinTracker_logo-removebg-preview.png" style={{width: 150}}/>
          </Typography>
          <Button color="inherit" style={{fontWeight: "bold"}} onClick={handleLogout}>Logout  .  <IoMdHeart /> </Button>
        </Toolbar>
      </AppBar>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="crypto-container">
        <h1>      <button  type="submit" style={{width: 320, marginBottom: 10 , fontFamily: "monospace", fontWeight: "bold", color: "white", marginTop: 20}}>Les Favorites  <IoMdHeart /> </button>
    <br></br>
    <h1>      <button onClick={handleCryptosList} type="submit" style={{width: 320, marginBottom: 30, fontFamily: "monospace", fontWeight: "bold", color: "white"}}>All Cryptos  <IoMdHeart /> </button>
</h1>
</h1>

        {data.map((currency: any, index) => (
    
          <div className="crypto" key={index}>
            
            <h1>{currency.cryptoName}</h1>
            <div className="rates">
            
                <>→ {currency.cryptoPrice}$</>
            </div>
            <br></br>
            {
              <p
                className={
                   "going-up"
                }
              >
                Desired Buying Price : {currency.desiredBuyingPrice}
              </p>
            }
              <br></br>
 
            {
              <p
                className={
                   "going-up"
                }
              >
                Desired Selling Price : {currency.desiredSellingPrice}
              </p>
            }
            <div className="crypto-exchange">
              <a
                href={`https://www.binance.com/en/trade/${currency.symbol}_USDT`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  title={`Trade BTV in Binance`}
                  src="https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png"
                  height="25"
                  width="25"
                  alt="Binance"
                />
              </a>
              
            </div>
          </div>
        ))}
   

      </div>

    </>
  );
}

export default Favorites;
