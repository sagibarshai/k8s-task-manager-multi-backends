import styled from "styled-components";
import "./App.css";
import Signup from "./pages/auth/signup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/auth/login";
import { AxiosInterceptorNavigate } from "./axios";
import { useEffect } from "react";
import DisplayTasks from "./pages/tasks/display";

const StyledAppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/tasks");
  }, []);

  return (
    <StyledAppWrapper>
      {<AxiosInterceptorNavigate />}
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<DisplayTasks />} path="/tasks" />
      </Routes>
    </StyledAppWrapper>
  );
}

export default App;
