import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";




function Login() {
    const [username, setUserNAme] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const toRegister = () => {
      navigate('/register');
    }


   const handleSubmit = (e) => {
             e.preventDefault(); 
        var data = {
            username : username,
            password : password
        }
        console.log(data);
          axios
            .post("http://143.198.57.140:8080/api/v1/auth/authenticate",
            data
            )
            .then(response => {
              console.log(response.data);
                if(response.status == 200)
                {   
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    navigate('/cryptos')
                }
            })
            .catch(error => {
              console.log(error);
            });
    
            setUserNAme(" ");
            setPassword(" ");
      };


      const handleOnChange = (e) => {
          if(e.target.name == "username"){
            setUserNAme(e.target.value);
          }else if(e.target.name == "password"){
            setPassword(e.target.value);
          }
      };


  return (
    <>
    {/* when form is submitted, handleSubmit will be executed */}
    <form onSubmit={handleSubmit} style={{width: 400, height: 400, justifyContent: "center"}}>
      <div>
        <h1>Login</h1>
        <input
          name="username"
          placeholder="username"
          value={username}
          onChange={handleOnChange}
          style={{width: 300,height:30,  marginBottom: 30,marginTop: 30}}
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleOnChange}
          style={{width: 300, marginBottom: 30,height:30}}
        />
      </div>
      <div>
       <h4>Vous avez pas encore un compte? <span onClick={toRegister} style={{cursor: "pointer", color: "blue"}}>register</span></h4>
      </div>
      <br></br>
      <button type="submit" style={{width: 320, marginBottom: 30, fontFamily: "monospace", fontWeight: "bold", color: "white"}}> Login  <IoMdHeart /></button>
      {/* <input type = "submit"/> */}
    </form>
  </>
  )
}

export default Login


