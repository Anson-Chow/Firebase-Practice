import React from 'react'
import "./App.css";
import { auth } from "./firebase/init"; //already exporting getAuth so don't need to change
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, //allows you to stay logged in when you refresh the page
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading (false) //After it mounts, set it to false. It was initially true from useState.
      if (user) {
        setUser(user)
      }
    })
  }, []); //runs when the page first mounts.
  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => console.log(error));
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => { //destructs the prop, don't have to use user.user to get the user information in the object
        console.log(user)
        setUser(user)
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout(){
    signOut(auth) //Signout
    setUser({}) //resets user to empty object. Necessary as we used State Hook in login function
  }


  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? 'loading...' : user.email} 
    </div>
  );
  /**display loading if it's loading. Display user.email if not */
}

export default App;
