import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import api from '../../config'
import { LayoutComponents } from "../../components/LayoutComponents";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const token = localStorage.getItem("token")


  function redirect(url) { 
    window.open(url, "_self");

    }

  function acessFirst(){  
       if (token) {
              api.get(`/account/check-first-access` ,
            { headers: 
              { "Content-Type": "application/json",
                Authorization: `Bearer ${token}`} })
                .then(resp => { 
                    localStorage.getItem("token")
                    console.log(resp.data)
                   // redirect('/account/check-first-access')
                    
                })
                .catch(err => { console.log(err)
                
                })
              }
            }

  function loginUp(event) {
    event.preventDefault()
    const user = { email, password }
  
    if(!user.email || !user.password){
      alert("Email or password incorretos")
    } else {
      api.post(`/account/login`, user)
      .then(resp => {
            alert('User logged with sucessfull')
            console.log(resp.data)
            localStorage.setItem('token', resp.data.token)
            acessFirst()
            
         }).catch((e) => {
             console.log(e, "aaa")
             alert(e)
         })
        

    }
          
    

}


  return (
    <LayoutComponents>
      <form className="login-form">
      
        <span className="login-form-title"> Bem vindo </span>

    

        <div className="wrap-input">
          <input
            className={email !== "" ? "has-val input" : "input"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-val input" : "input"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Password"></span>
        </div>

        <div className="container-login-form-btn">
          <button className="login-form-btn" onClick={loginUp}>Login</button>
        </div>

        <div className="text-center">
          <span className="txt1">Não possui conta? </span>
          <Link className="txt2" to="/account/register">
            Criar conta.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  );
};
