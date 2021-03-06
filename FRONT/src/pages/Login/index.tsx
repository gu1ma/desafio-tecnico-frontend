import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { InputAdornment, IconButton, Button, Typography } from "@mui/material";
import Input from "@mui/material/Input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../../providers/auth";
import api from "../../services/api";
import {
  Container,
  LoginContainer,
  LoginPresentationContainer,
  LoginCard,
} from "./styles";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const logginRequest = async () => {
    try {
      const { data } = await api.post("/login", {
        login: username,
        senha: pass,
      });

      if (!data) {
        toast.error("Usuário ou senha incorretos!");
        return;
      }

      localStorage.setItem("@userLoggedToken", btoa(data));
      setUser({ ...user, loggedUser: true });
      navigate("/dash");
    } catch (e: any) {
      toast.error("Usuário ou senha incorretos!");
    }
  };

  return (
    <Container>
      <LoginContainer>
        <LoginCard>
          <Typography variant="h5">Login</Typography>
          <Input
            endAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Input
            type={!showPassword ? "password" : "text"}
            value={pass}
            onChange={(event) => setPass(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            sx={{ marginBottom: 5 }}
          />
          <Button
            variant="contained"
            onClick={logginRequest}
            disabled={username === "" || pass === ""}
          >
            Enviar
          </Button>
        </LoginCard>
      </LoginContainer>
      <LoginPresentationContainer>
        <Typography
          variant="h1"
          style={{ color: "white", fontWeight: "bold" }}
          sx={{ paddingLeft: 10, paddingRight: 10 }}
        >
          TO DO List Project.
        </Typography>
        <Typography
          variant="h6"
          style={{ color: "#f5b324" }}
          sx={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2 }}
        >
          This project was developed for the frontend technical test of Lets
          Code.
        </Typography>
      </LoginPresentationContainer>
    </Container>
  );
};

export default Login;
