import { Link, NavLink, useNavigate } from "react-router-dom";
import { userService } from "../services/user.service.js";
import { showErrorMsg } from "../services/event-bus.service.js";
import { LoginSignup } from "./LoginSignup.jsx";
import { useState } from "react";



export function AppHeader() {
    const navigate = useNavigate()

    const [user, setUser] = useState(userService.getLoggedinUser())

    function onLogout() {
        userService.logout()
            .then(() => {
                onSetUser(null)
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser(user) {
        setUser(user)
        navigate('/')
    }
    return (
        <header className="app-header full main-layout">
            <section className="header-container flex justify-between align-center">

           
           <Link  to="/"><h1 className="logo">Mister toy</h1></Link>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/statistics" >Stats</NavLink>
                </nav>
            </section>

            {user ? (
                < section >

                    <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup onSetUser={onSetUser} />
                </section>
            )}
        </header>
    )
}