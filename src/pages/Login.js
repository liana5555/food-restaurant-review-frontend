import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";


export default function Login () {

    const [regformLogin, setLoginForm] = React.useState({
        username: "",
        password: ""
   
        
    })
    //console.log(regformLogin)
    const [error, setError] = React.useState(null)

    const navigate = useNavigate()

    const {login} = useContext(AuthContext)

    function handleChange (e) {
        setLoginForm(prev => {
            return {
                ...prev, 
                [e.target.name] : e.target.value
            }
        })

    }

    async function handleSubmit (e) {
        e.preventDefault()

        if (regformLogin.username ==="" || regformLogin.password === "") {
            setError("Fill out the username and password fields")

        }
        else {

            try {
                await login(regformLogin)
                setError("success")
                
                
                
            }
            catch (err) {
                
                setError(err.response.data)

            }
         
       
        }
    }
    //Instead of this use useeffect for the same thing. It gives you an error
    //though it still loads and work. 


    function hadnling_navigate (error) {
        if (error === "success") {
            navigate("/")
        }
    }

    React.useEffect(() => {
        hadnling_navigate(error) 
    }, [error])
 


    return (
        <main className="login-register">
            <h1>Log In</h1>
        <form className="login-register-form" onSubmit={handleSubmit}>
            <label className="input-label" name="username" >Username</label>
            <input className={error && regformLogin.username == "" ? "input-error" : "input"} type="text" name="username" placeholder="username" value={regformLogin.username} onChange={handleChange}  />
            <label className="input-label" name="password" >Password</label>
            <input className={error && regformLogin.password == "" ? "input-error" : "input"} type="password" name="password" placeholder="password" value={regformLogin.password} onChange={handleChange}  />
            <button>Login</button>
            {error && <div className="error">{error}</div>}
            {/*error && hadnling_navigate(error)*/}
            
            
            <div className="login-reg-comment">If you don't have an account yet! - <Link to="/register">Register</Link> </div>

        </form>
        </main>
    )


}