import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './navbar.css'

function Navbar() {
  const [show, handleShow] = useState(false);
  const history = useHistory()


  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar)
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className='nav__contents'>
        <img
          onClick={()=> history.push('/')}
          className="nav__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
        />
        <img
          onClick={() => history.push('/profile')}
          className="nav__avatar"
          src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
          alt="Avatar"
        />
      </div>
    </div>
  )
}

export default Navbar
