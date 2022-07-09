import React, { useState } from 'react';
import { Container, LoginContainer } from './styles'
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { AuthContext } from '../../providers/auth';
import Input from '@mui/material/Input';
import { InputAdornment, IconButton, Button, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const { user, setUser } = React.useContext(AuthContext);
    const navigate = useNavigate();
    
    const logginRequest = async () => {
        try {
            const { data } = await api.post('/login', {
                login: username,
                senha: pass
            });

            if(!data) {
                alert('usuário ou senha incorretos!');
                return;
            }
    
            localStorage.setItem('@userLoggedToken', btoa(data))
            setUser({ ...user, loggedUser: true })
            navigate('/dash');
        } catch(e: any) {
            alert('usuário ou senha incorretos!');
            console.log('e', e.message);
        }
    }


    return (
        <Container>
            <LoginContainer>
                <Typography variant="h5">Login</Typography>
                <Input
                    endAdornment={
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    }
                    value={username} onChange={(event) => setUsername(event.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Input
                    type={!showPassword ? 'password' : 'text'}
                    value={pass}
                    onChange={(event) => setPass(event.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                >
                                {showPassword ?  <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    sx={{ marginBottom: 5 }}
                />
                <Button variant="contained" onClick={logginRequest} disabled={(username === '' || pass === '')}>Enviar</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login;