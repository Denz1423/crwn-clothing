import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGoogleRedirect,
  auth,
} from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";
import FormInput from "../form-input/form-input.component";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import "./sign-in-form.style.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  useEffect(() => {
    googleRedirect();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  async function googleRedirect() {
    const response = await getRedirectResult(auth);
    if (!response) {
      return;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      // setCurrentUser(user);
      resetFormFields();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password!");
          break;
        case "auth/user-not-found":
          alert("User does not exist!");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In!</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogleRedirect}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
}
