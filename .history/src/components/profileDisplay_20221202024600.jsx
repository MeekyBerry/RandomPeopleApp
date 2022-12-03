import { useEffect, useState } from "react";
import { auth, provider, email, password, signInWithRedirect, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "../config";
import { Avatar } from "./avatar";

const ProfileDisplay = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

   // handle onchange
   const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

   // handle sign In
   const signIn = (e) => {
    e.preventDefault();
    signInWithRedirect(auth, provider);
  };

    // sign in with email and password
    const handleSignIn = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("User signed in!");
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setError("Wrong password!");
          }
          if (error.code === "auth/user-not-found") {
            setError("User not found!");
          }
          console.error(error);
        });
    };

   // handle sign out
   const handleSignOut = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("User signed out!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__desc">
      {user ? (
        <div className="profile__user">
          <h1 className="profile__title">Profile Display</h1>
          <Avatar image={user.photoURL} style={{ width: "10rem", height: "10rem", borderRadius: "50%" }} />
          <p className="profile__detail">
                <strong>Signed in account name: </strong>
                {user.displayName}
              </p>
              <p className="profile__detail">
                <strong>Signed in email: </strong>
                {user.email}
              </p>
              <div className="btn__wrapper">
                <button onClick={handleSignOut} className="btn">
                  Sign Out
                </button>
                <button type="submit" onClick={handlePasswordReset} className="btn">
                    Send Password Reset Email
                  </button>
                  <button onClick={handleDelete} className="btn">
                  Delete Account
                </button>
              </div>
        </div>
      ) : (
        <div className="profile__user">
          <div className="sign__wrapper">
            <h1 className="profile__title">You are not signed in.</h1>
            <h2 className="sign__heading">
              Sign in with your Google account
            </h2>
            <button onClick={signIn} className="btn">
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default ProfileDisplay;