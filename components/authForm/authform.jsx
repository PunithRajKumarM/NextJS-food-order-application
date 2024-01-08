import React, { useRef, useState } from "react";
import classes from "./authform.module.css";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, cart: [] }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((pre) => !pre);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!enteredEmail || !enteredPassword) {
      alert("Enter valid email/password");
      return;
    }

    if (isLogin) {
      //redirect:false used to make not to redirect when user find errpr while login
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        //set some auth state
        router.replace("/");
      }
      // console.log(result);
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log("result of creating user : ", result);
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
      } catch (error) {
        console.log("Error on creating user : ", error.message);
      }
    }
  }

  return (
    <div className={classes.auth}>
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form className={classes.authForm} onSubmit={submitHandler}>
        <table>
          <tbody>
            <tr>
              <td>Enter mail</td>
              <td>
                <input type="email" ref={emailInputRef} required />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input type="password" ref={passwordInputRef} required />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">{isLogin ? "Login" : "Sign up"}</button>
        <p className={classes.swithAuth} onClick={switchAuthModeHandler}>
          {isLogin ? "New user? create new account" : "Already an user?"}
        </p>
      </form>
    </div>
  );
}
