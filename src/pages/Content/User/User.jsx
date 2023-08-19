import React, { useEffect, useState } from 'react';
import {  Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function User() {
     const [values, setValues] = useState("");
     const [oneToFive,setOneToFive] = useState([]);
     const [fiveToHand,setFiveToHand] = useState([]);
     const [selectedOption,setSelectedOption] = useState("");
     const [limited,setLimited] = useState("");
     const [toreadonly,setToreadonly] = useState(false);
     const [isAuthenticated, setIsAuthenticate] = useState(true);
     const navigate = useNavigate();

useEffect(() => {
     let arr = [];
     for(let i = 0;i < 50; i++){
          let num = i.toString();
          if(num.length == 1){
             num = "0"+num
          }
         arr.push(num);
        }
        setOneToFive(arr);
},[])

useEffect(() => {
     let arr2 = [];
     for(let i = 50;i < 100; i++){
          let num = i.toString();
          if(num.length == 1){
             num = "0"+num
          }
         arr2.push(num);
        }
        setFiveToHand(arr2);
},[])

useEffect(()=>{
 if(!isAuthenticated){
    return navigate("/login")
 }
},[isAuthenticated])


  
     

  
  
     const handleOption = (e) => {
          setSelectedOption(e.target.value);
         
     }
  
     const handleSubmit = (e) => {
          e.preventDefault();

          console.log(values);
     }

     const handleReadOnly = (e) => {
         if(toreadonly == false){
          setToreadonly(true);
         }
         if(toreadonly == true){
          setToreadonly(false);
         }
     }

  
     return ( 
          <>
               <section style={{minHeight:"100vh"}} className='my-3'>
                    <Container>

                         <Row className='p-3'>
                         <Col sm={12} className='my-3'>
                    
                                   <Form.Select onChange={handleOption} value={selectedOption}>
                              <option value="all">All</option>
                              <option value="KyawKyaw">KyawKyaw</option>
                              <option value="ZawZaw">ZawZaw</option>
                              <option value="MyaMya">MyaMya</option>
                                   </Form.Select>
                          
                         </Col>
                              <Col lg={8} className='border rounded p-3 m-auto'>
                                   <Form onSubmit={handleSubmit}>
                                        <Form.Group>
                                             <Form.Label>Type Numbers and Values</Form.Label>
                                             <Form.Control as={"textarea"} rows={3} placeholder='Eg- 10R200,1P1000,AA1000' value={values} onChange={e => setValues(e.target.value)} />
                                        </Form.Group>
                                        <button type='submit' className='btn btn-warning form-control mt-3'>Add</button>
                                   </Form>
                              </Col>

                              <Col sm={12} className='border my-3 p-3'>
                              <Row>
                                   <Col>
                          
                                        <div>
                                        {oneToFive.map((test,key) => 
                                        
                                        <div className='d-flex border border-dark' key={key}>
                                        <div className='px-3 m-auto'>1000</div>
                                        <div>|</div>
                                        <span className='ms-auto px-3'>{test}</span>
                                        </div>
                                        )
                                        }
                                        </div>
                          
                              
                                   </Col>
                                   <Col>
                                   <div>
                                        {fiveToHand.map((test,key) => 
                                        
                                        <div className='d-flex border border-dark' key={key}>
                                        <span className='me-auto px-3'>{test}</span>
                                        <div>|</div>
                                        <div className='px-3 m-auto'>1000</div>
                                       
                                        </div>
                                        )
                                        }
                                        </div>
                                   </Col>
                                  
                              </Row>
                         
                              </Col>
                              <div className='p-3 border rounded'>
                            
                              <span className='fs-3'><b>Total</b> - 300000</span>

                              <div className='border p-2 mt-5'>
                                         <Form.Group className='my-3'>
                         <Form.Label className='my-2'>Limited Value</Form.Label>
                         <InputGroup>
                         <Form.Control type='number' value={limited} onChange={e => setLimited(e.target.value)}  placeholder='Limited Value' readOnly={toreadonly} />
                         <InputGroup.Checkbox onClick={handleReadOnly} />
                         </InputGroup>  
                    </Form.Group>
                              </div>
                              </div>
                         </Row>
                    </Container>
               </section>
          </>
      );
}

export default User;