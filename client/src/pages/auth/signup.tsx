import React, { useEffect, useState } from "react";

import { AxiosError } from "axios";
import appAxios from "../../axios";

import TextInput from "../../components/inputs/text-input";

import { isEmail } from "../../utils/validators/email";
import { isPassword } from "../../utils/validators/password";

import {
  StyledButtonWrapper,
  StyledError,
  StyledInputsWrapper,
  StyledLink,
  StyledModal,
  StyledTitle,
  StyledWrapper,
  StylesLoginButton,
} from "./styled";

import { AuthFromState, Field } from "./types";
import { InputState } from "../../components/inputs/types";
import { useNavigate } from "react-router-dom";
import AppLoader from "../../components/loader";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<InputState<string>>({
    error: "",
    isValid: false,
    showError: false,
    value: "",
  });
  const [password, setPassword] = useState<InputState<string>>({
    error: "",
    isValid: false,
    showError: false,
    value: "",
  });
  const [formState, setFormState] = useState<AuthFromState>({ isLoading: false, isValid: false, showError: false, error: "" });

  const onInputChange = (filed: Field, event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    let isValid = false;
    let showError = true;

    if (filed === "email") {
      if (isEmail(value)) {
        isValid = true;
        showError = false;
      }
      setEmail({ isValid, showError, value, error: "Email is not valid" });
    } else {
      if (isPassword(value)) {
        isValid = true;
        showError = false;
      }
      setPassword({ isValid, showError, value, error: "Password must contain at least 6 characters" });
    }
    setFormState({ ...formState, showError: false });
  };
  const onSubmit = async () => {
    setFormState({ ...formState, isLoading: true });
    try {
      await appAxios.post("/auth/signup", {
        email: email.value,
        password: password.value,
      });
      navigate("/tasks");
    } catch (err) {
      const error = err as AxiosError;
      //@ts-ignore
      setFormState({ ...formState, showError: true, error: error.response?.data.message || "Something went wrong ..", isLoading: false });
    }
  };
  useEffect(() => {
    let isValid = email.isValid && password.isValid;
    setFormState({ ...formState, isValid });
  }, [email.isValid, password.isValid]);

  return (
    <StyledWrapper>
      <StyledModal>
        <StyledTitle>Sign up</StyledTitle>
        <StyledInputsWrapper>
          <TextInput
            type="email"
            label="Email"
            value={email.value}
            error={email.error}
            showError={email.showError}
            onChange={(e) => onInputChange("email", e)}
          />
          <TextInput
            type="password"
            label="Password"
            value={password.value}
            error={password.error}
            showError={password.showError}
            onChange={(e) => onInputChange("password", e)}
          />
        </StyledInputsWrapper>
        <StyledButtonWrapper>
          {formState.showError && <StyledError> {formState.error}</StyledError>}
          <StylesLoginButton onClick={onSubmit} disabled={!formState.isValid}>
            {formState.isLoading ? <AppLoader /> : "Sign up"}
          </StylesLoginButton>
        </StyledButtonWrapper>
        <StyledLink to={"/login"}>I already have account, switch to login</StyledLink>
      </StyledModal>
    </StyledWrapper>
  );
};
export default Signup;
