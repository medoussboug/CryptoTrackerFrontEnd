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




function Cryptos() {
  
  const [data, setData] = useState([]);
  const [desiredSellingPrice, setDesiredSellingPrice] = useState(0);
  const [desiredBuyingPrice, setDesiredBuyingPrice] = useState(0);



  const [currentId, setCurrentId] = useState();
  const navigate = useNavigate();

  useEffect(()=> {
    axios
    .get('http://localhost:8080/api/v1/cryptocurrencies')
    .then((response) => {
      setData(response.data);      
      })
    .catch((error) => {
      console.log(error);
    });


  });

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
  const handleOpen = () => {
    setOpen(true);
  
  };
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    navigate('/');
  }

  const handleCryptosList = () => {
    navigate('/cryptos');
  }

  const handleFavorite = (e) => {
    e.preventDefault(); 
    var data = {
        cryptoId: currentId,
        desiredBuyingPrice : desiredBuyingPrice,
        desiredSellingPrice : desiredSellingPrice
    }
    const saved = localStorage?.getItem("token")?.replace(/(^"|"$)/g, '');
    console.log(data);
    var yourConfig = {
      headers: {
         Authorization : "Bearer "+ saved
        }
   }

   console.log(yourConfig)
      axios
        .post("http://localhost:8080/api/v1/cryptocurrencies/favorites",
        data , 
        yourConfig
        )
        .then(response => {
          console.log(response.status);
          console.log("success")
            if(response.status == 200){
                console.log(response.status);
                console.log("success");
                alert('Le Prix a été ajouté');
                setOpen(false);
            }else {
              console.log("fail");
            }
        })
        .catch(error => {
          console.log(error);
        });

        setDesiredBuyingPrice(0);
        setDesiredSellingPrice(0);
  }


  const getFavorties = () => {

   navigate('/favorite');


  }



  const handleOnChange = (e) => {
    if(e.target.name == "High"){
        setDesiredBuyingPrice(e.target.value);
    }else if(e.target.name == "Low"){
      setDesiredSellingPrice(e.target.value);
    }
};

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
        <h1>      <button onClick={getFavorties} type="submit" style={{width: 320, marginBottom: 10 , fontFamily: "monospace", fontWeight: "bold", color: "white", marginTop: 20}}>Les Favorites  <IoMdHeart /> </button>
    <br></br>
    <h1>      <button onClick={handleCryptosList} type="submit" style={{width: 320, marginBottom: 30, fontFamily: "monospace", fontWeight: "bold", color: "white"}}>All Cryptos  <IoMdHeart /> </button>
</h1>
</h1>

        {data.map((currency: any, index) => (
    
          <div className="crypto" key={index}>
            
            <h1>{currency.id} ({currency.symbol}) </h1>
            <div className="rates">
            
                <>→ {currency.currentPrice}$</>
            </div>
            {
              <p
                className={
                   "going-up"
                }
              >
                Change Percentage : {currency.athChangePercentage}
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
                  src={currency.image}
                  height="25"
                  width="25"
                  alt="Binance"
                />
              </a>
              <span
                className="crypto-favorite"
                title="Favorite"
                onClick={() => { handleOpen();
                        setCurrentId(currency.id);}
                }
              >
        
        
              <IoMdHeart /> 
              </span>
            </div>
          </div>
        ))}
   

      </div>
      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
              <h1 style={{color: "black" }}>Disired Price</h1><br/>
              <h3 style={{color: "black"}}>Buying Price: ( inferieur au Selling Price ) </h3>
              <br/>
              <input type="number" value={desiredBuyingPrice} name="High" onChange={handleOnChange}></input>
              <br/>
              <br/>
              <h3 style={{color: "black" }}>Selling Price:  <br></br>( Nombre plus grande que le Selling Price )</h3>
              <br/>
              <input type="number" name="Low" value={desiredSellingPrice} onChange={handleOnChange}></input>
              <br/>
              <br/>
              <br/>
              <Button variant="contained" onClick={handleFavorite}>Ajouter</Button>

        </Box>
      </Modal>
    </div>
    </>
  );
}

export default Cryptos;
