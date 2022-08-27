import React from 'react'
import "./App.css";
import { auth } from "./firebase/init"; //already exporting getAuth so don't need to change
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, // 
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading (false)
      console.log(user);
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
    signOut(auth)
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
}

export default App;
