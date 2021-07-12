import React,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import { login, logout, selectUser } from './features/userSlices'
import { auth } from './firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  

  useEffect(() => {
    //esse useeffect vai salver no localstorage o user que ja fez login, e assim sera um "linstener"
    const unsubscribe = auth.onAuthStateChanged((userAuth)=>{
      if(userAuth) { 
        dispatch(
          login({ 
          uid: userAuth.uid, 
          email: userAuth.email }));
      } else { 
        //logged out
        dispatch(logout())
      }
    })
    return unsubscribe;
    //para que nao duplique o user, e sim tire o anterior e adicione ao novo, como o cleanup de render.
  }, [ dispatch ])

  return (
    <div className='app'>
      <Router>
        {!user? (<LoginScreen /> ) : ( <Switch>
            <Route path='/profile'>
              <ProfileScreen /> 
            </Route>
          <Route exact path="/">
            <HomeScreen />
          </Route>
        </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
