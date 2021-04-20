import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';

const Login = ({setToken, setUserId}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failAlert, setFailAlert] = useState(false)

  const handleUsernameChange = event => {
    event.preventDefault();
    setUsername(event.target.value);
  }

  const handlePasswordChange = event => {
    event.preventDefault();
    setPassword(event.target.value);
  }

  const history = useHistory('')

  function handleClick() {

    const loginObject = {
      password: password,
      email: username
    }

    axios
      .post('http://localhost:8001/user_service/auth', loginObject)
      .then(response => {
        console.log(response);
        if('token' in response.data) {
          setToken(response.data.token);
          setUserId(response.data.id);
          history.push("/dashboard");
        } else {
          setFailAlert(true);
        }
      })
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Entre na sua conta</p>
                    {failAlert ? <CAlert color="danger">
                      Usuário ou senha incorretos.
                    </CAlert> : null}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={handleUsernameChange} value={username} lazy={1} placeholder="Username" autoComplete="username" /> 
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={handlePasswordChange} value={password} type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={handleClick} color="dark" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Esqueceu sua senha?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                  <img src={'avatars/windris_log.png'} alt="windris logo" width="300" height="300" />
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
