   

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Components/Login/Firebase/Firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // google sign in
  const signInUsingGoogle = () => {
    setIsLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // user state change
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, []);

  // create user with email and password
  const registerUserEmailAndPassword = () => {
    if (password.length < 6) {
      setError("Password must be at least 6 character");
      return;
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user
  const updateUser = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then((result) => {
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // verify email
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      setSuccess("Email verification sent!");
      setError("");
    });
  };

  // login user email and password
  const loginUserEmailAndPassword = () => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // const password reset
  const passwordResetEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        //
        setSuccess("Password reset email sent!");
        setError("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);
  // logout
  const logout = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  return {
    user,
    admin,
    success,
    error,
    setError,
    setSuccess,
    signInUsingGoogle,
    setName,
    setEmail,
    setPassword,
    setUser,
    registerUserEmailAndPassword,
    updateUser,
    verifyEmail,
    loginUserEmailAndPassword,
    passwordResetEmail,
    isLoading,
    setIsLoading,
    logout,
  };
};

export default useFirebase;
