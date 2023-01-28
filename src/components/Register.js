import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";




function Register() {
    const [username, setUserNAme] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [title, setTitle] = useState("");
    const [organization, setOrganization] = useState("");
    const navigate = useNavigate();

   const handleSubmit = (e) => {
             e.preventDefault(); 
        var data = {
            username : username,
            password : password,
            email : email,
            fullName: fullName,
            title: title,
            organization : organization
        }
        console.log(data);
          axios
            .post("http://localhost:8080/api/v1/user/add",
            data
            )
            .then(response => {
              console.log(response.data);
                if(response.status == 200){
                    navigate('/cryptos')
                }
            })
            .catch(error => {
              console.log(error);
            });
    
            setUserNAme(" ");
            setPassword(" ");
            setEmail(" ");
            setFullName(" ");
            setOrganization(" ");
            setTitle(" ");
      };


      const handleOnChange = (e) => {
          if(e.target.name == "username"){
            setUserNAme(e.target.value);
          }else if(e.target.name == "password"){
            setPassword(e.target.value);
          }else if(e.target.name == "fullName"){
            setFullName(e.target.value);
          }else if(e.target.name == "title"){
            setTitle(e.target.value);
          }else if(e.target.name == "email"){
            setEmail(e.target.value);
          }else if(e.target.name == "organization"){
            setOrganization(e.target.value);
          }
      };


  return (
    <>
    {/* when form is submitted, handleSubmit will be executed */}
    <form onSubmit={handleSubmit} style={{width: 400, height: 400, justifyContent: "center"}}>
      <div>
        <h1>Register</h1>
        <input
  type="text"
name="username"
          placeholder="User name"
          value={username}
          onChange={handleOnChange}
          style={{width: 300,height:30,  marginBottom: 15,marginTop: 30}}
        
        />
          <p>User name should be between 6 and 15 words</p>
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleOnChange}
          style={{width: 300, marginBottom: 30,marginTop: 10 ,height:30}}
        />
                  <p>More than 6 letters with Capital and numbers</p>
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleOnChange}
          style={{width: 300, marginBottom: 30,marginTop: 15,height:30}}
        />
      <p>Email should be a validate Email</p>
      </div>
      <div>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={handleOnChange}
          style={{width: 300, marginBottom: 30,marginTop: 15,height:30}}
        />
                          <p>More than 6 letters</p>
      </div>
      
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleOnChange}
          style={{width: 300, marginBottom: 30,marginTop: 15,height:30}}
        />
         <p>More than 6 letters</p>
      </div>
      <div>
        <input
          type="text"
          name="organization"
          placeholder="Organization"
          value={organization}
          onChange={handleOnChange}
          style={{width: 300, marginBottom: 30,marginTop: 15,height:30}}
        />
         
      </div>
      <button type="submit" style={{width: 320, marginBottom: 30, fontFamily: "monospace", fontWeight: "bold", color: "white"}}> Register  <IoMdHeart /></button>
      {/* <input type = "submit"/> */}
    </form>
  </>
  )
}

export default Register


