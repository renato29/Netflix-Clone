import React,{ useState } from 'react'
import './LoginScreen.css'
import SignupScreen from './SignupScreen'

function LoginScreen() {
    const [signIn, setSignIn] = useState(false);

    return (
        <>
            <div className='loginScreen'>
                <div className='loginScreen_background'>

                    <div >
                        <img className="loginScreen_logo"
                            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                            alt="" />
                    </div>
                    <button 
                    onClick={()=> setSignIn(true)}
                    className='loginScree_button'>Sign In</button>
                </div>
                <div className="loginScreen_gradient" />
            </div>

            <div className="loginScreen_body">
                {signIn ? (
                    <SignupScreen /> 
                ):(
                <>
                <h1> Ultimate Films , TV Programmes
                     more.</h1>
                <h2>Watch anywhere, Cancel at anytime</h2>
                <h3>Ready to watch ? Enter your mail to create or restart your ownership</h3>
             <div className="loginScreen_input">
                    <form>
                        <input 
                        type='email'
                        placeholder='Email Adress'
                        />

                        <button 
                        onClick={()=> setSignIn(true)}
                        className='loginScreen_getStarted'> 
                        GET STARTED
                        </button> 
                    </form>
                </div>
             </>)}
            </div>
        </>
    )
}

export default LoginScreen;
