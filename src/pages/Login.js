import React from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";


export default function Login () {

    const [regform, setRegisterForm] = React.useState({
        username: "",
        password: ""
   
        
    })
    //console.log(regform)
    const [error, setError] = React.useState(null)

    const navigate = useNavigate()

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
        try {
            await axios.post("/auth/login", regform)
            navigate("/")
        }
        catch (err) {
            setError(err.response.data)

        }
    }


    return (
        <main className="login-register">
            <h1>Bejelentkezés</h1>
        <form className="login-register-form" onSubmit={handleSubmit}>
            <label className="input-label" name="username" >Username</label>
            <input className="input" type="text" name="username" placeholder="username" value={regform.username} onChange={handleChange}  />
            <label className="input-label" name="password" >Password</label>
            <input className="input" type="password" name="password" placeholder="password" value={regform.password} onChange={handleChange}  />
            <button>Login</button>
            {error && <div className="error">{error}</div>}

        </form>
        </main>
    )


}