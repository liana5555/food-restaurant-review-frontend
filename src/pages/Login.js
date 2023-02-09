import React from "react"


export default function Login () {

    const [regform, setRegisterForm] = React.useState({
        username: "",
        password: ""
   
        
    })
    console.log(regform)

    function handleChange (e) {
        setRegisterForm(prev => {
            return {
                ...prev, 
                [e.target.name] : e.target.value
            }
        })

    }

    function handleSubmit (e) {
        e.preventDefault()
        console.log("Submitting")
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

        </form>
        </main>
    )


}