import { Link } from "react-router-dom";
import { useState } from "react";
import { LayoutComponents } from "../../components/LayoutComponents"

import api from "../../config";

export const Register = () => {
   const [ user, setUser ] = useState({})
    const [ fullName, setFullName ] = useState("")
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ cellPhone, setCellPhone ] = useState("")

    function redirect(url) { 
      window.open(url, "_self");
  
      }
  

    function signUp(event) {
      event.preventDefault()
      const user = { fullName, username, email, password, cellPhone }

  
          api.post(`http://localhost:3000/account/register`, user)
          .then(resp => {
                 alert(`User ${user.fullName} created with sucess`)
                 setUser(resp.data.user)
                 redirect("/login")
             }).catch((e) => {
                 console.log(e, "aaa")
                 alert(e)
             })
            
      

  }
  return (
    <LayoutComponents >
      <form className="login-form">
        <span className="login-form-title"> Register </span>


        <div className="wrap-input">
          <input
            className={fullName !== "" ? "has-val input" : "input"}
            type="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Full Name"></span>
        </div>

        <div className="wrap-input">
          <input
            className={username !== "" ? "has-val input" : "input"}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="focus-input" data-placeholder="User"></span>
        </div>

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
        <div className="wrap-input">
          <input
            className={cellPhone !== "" ? "has-val input" : "input"}
            type="text"
            value={cellPhone}
            onChange={(e) => setCellPhone(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Phone"></span>
        </div>

        <div className="container-login-form-btn">
          <button className="login-form-btn" onClick={signUp}>Register</button>
        </div>

        <div className="text-center">
          <span className="txt1">Já possui uma conta? </span>
          <Link className="txt2" to="/account/login">
            Login.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  )
}