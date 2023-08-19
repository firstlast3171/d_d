import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function AddCommession() {
     const [commession,setCommession] = useState("");
     const [isAuthenticated, setIsAuthenticate] = useState(true);
     const navigate = useNavigate();
     useEffect(()=>{
          if(!isAuthenticated){
             return navigate("/login")
          }
         },[isAuthenticated])

     const handleSubmit = (e) => {
          e.preventDefault();
          console.log(commession);
          if(commession){
               navigate("/commession")
          }
          if(!commession){
               console.log("needed");
          }
           
     }
     return ( 
          <>
               <Container className='p-5'>
                    <Form onSubmit={handleSubmit} className='border p-3 rounded border-dark'>
                         <Form.Group className="my-3">
                              <Form.Label>Commession Name</Form.Label>
                              <Form.Control placeholder='commession name' value={commession} onChange={e => setCommession(e.target.value)} />
                         </Form.Group>
                         <Button type="submit" className="my-3">Add Commession</Button>
                    </Form>
               </Container>
          </>
      );
}

export default AddCommession;