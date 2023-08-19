import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function Login() {
     const [showPassword,setShowPassword] = useState(false);
     const [username,setUsername] = useState("");
     const [password,setPassword] = useState("");
     const [isAuthenticated, setIsAuthenticate] = useState(true);
     const navigate = useNavigate();
     useEffect(()=>{
          if(isAuthenticated){
             return navigate("/")
          }
         },[isAuthenticated])

     const handleShow = () => {
          setShowPassword(true);
     }

     const handleNone = () => {
          setShowPassword(false);
     }

     const handleSubmit = (e) => {
          e.preventDefault();

          console.log(username,password);
     }
     const style = {
          inputText : {
               cursor : "pointer" 
          }
     }
     return ( 
          <>
          <Container>
               <Row className='my-3'>
                    <Col lg={6} md={6} sm={4} className='m-auto border p-4 rounded '>
                    <h1 className='text-center'>Login To Your Account</h1>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className='my-3'>
                         <Form.Label className='my-2'>Username</Form.Label>
                         <Form.Control type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Type Username' />
                    </Form.Group>

                    <Form.Group className='my-3'>
                         <Form.Label className='my-2'>Password</Form.Label>
                         <InputGroup>
                         <Form.Control type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Type Password' />
                         <InputGroup.Text style={style.inputText}><AiFillEye display={showPassword ? "none" :"block"} onClick={handleShow}  /> <AiFillEyeInvisible onClick={handleNone} display={showPassword ? "block" : "none"} /></InputGroup.Text>
                         </InputGroup>  
                    </Form.Group>

                    <Button type='submit'>Login</Button>
                    </Form>
                    </Col>
               </Row>
          </Container>
          
          </>
      );
}

export default Login;