import React from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

export default function Register () {

    const [regform, setRegisterForm] = React.useState({
        username: "",
        firstName: "",
        lastName:"",
        password: "",
        repassword: "",
        email: "" 
        
    })

    const [error, setError] = React.useState(null)

    const navigate = useNavigate()

    console.log(regform)

    function handleChange (e) {
        setRegisterForm(prev => {
            return {
                ...prev, 
                [e.target.name] : e.target.value
            }
        })

    }

    async function handleSubmit (e) {
        e.preventDefault()
         if (regform.username ==="" || regform.password === "" || regform.email === "") {
            setError("Fill out the username,password and email fields")

        }else {
            console.log(checkingPaassword(regform.password, regform.repassword) === false)
            if (checkingPaassword(regform.password, regform.repassword)===false) {
                 try {
                        const result = await axios.post(`${process.env.REACT_APP_API_ROUTE}/auth/register`, regform)
                        console.log(result) 
                        navigate("/login")
                        
                    }
                    catch (err){
                        setError(err.response.data)
                        console.log(err)
            }
            }
            else {
                setError("Password and repassword are not the same")
                    
            }
   
       
        
        }
        
    }

    function checkingPaassword (psw, repsw) {
        if (psw !== repsw){
            return true
        }
        else return false       
    }

    return (
        <main className="login-register">
            <h1>Register</h1>
        <form className="login-register-form" onSubmit={handleSubmit}>
            <label className="input-label" name="username" >Username</label>
            <input className={error && regform.username == "" ? "input-error" : "input"} type="text" name="username" placeholder="username" value={regform.username} onChange={handleChange}  />
            <label className="input-label" name="firstName" >First name</label>
            <input className="input" type="text" name="firstName" placeholder="First Name" value={regform.firstName} onChange={handleChange}  />
            <label className="input-label" name="lastName" >Last name</label>
            <input className="input" type="text" name="lastName" placeholder="Last Name" value={regform.lastName} onChange={handleChange}  />
            <label className="input-label" name="email" >E-mail</label>
            <input className={error && regform.email == "" ? "input-error" : "input"} type="email" name="email" placeholder="email" value={regform.email} onChange={handleChange}  />
            <label className="input-label" name="password" >Password</label>
            <input className={error && regform.password == "" ? "input-error" : "input"} type="password" name="password" placeholder="password" value={regform.password} onChange={handleChange}  />
            <label className="input-label" name="repassword" >Re-Password</label>
            <input className={error && regform.repassword == "" ? "input-error" : "input"} type="password" name="repassword" placeholder="password" value={regform.repassword} onChange={handleChange}  />
            {checkingPaassword(regform.password, regform.repassword)&&<div className="not-matching-psw">Not matching Password</div>}
            <button>Register</button>
            {error && <div className="error">{error}</div>}
            <div className="login-reg-comment">If you already have an account please - <Link to="/login">Login</Link> </div>

        </form>
        </main>
    )


}