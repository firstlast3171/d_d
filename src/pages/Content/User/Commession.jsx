import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Commession() {
     const [isAuthenticated, setIsAuthenticate] = useState(true);
     const navigate = useNavigate();
     useEffect(()=>{
          if(!isAuthenticated){
             return navigate("/login")
          }
         },[isAuthenticated])
     const handleButton = (e) => {
          console.log(e.target.value);
     }
     return ( 

          <>
          <Container className='p-4'>
          <a href='/addCommession' className='btn btn-warning my-3'>Add</a>
          <Table>
               <thead>
        <tr>
          <th>id</th>
          <th>Commession</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>KyawKyaw</td>
          <td>
               <Button value={1} variant='danger' onClick={handleButton}>Delete</Button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>ZawZaw</td>
          <td>
               <Button value={2} variant='danger' onClick={handleButton}>Delete</Button>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>MyaMya</td>
          <td>
               <Button value={3} variant='danger' onClick={handleButton}>Delete</Button>
          </td>
        </tr>
        
      </tbody>
               </Table>
          </Container>
               
          </>

      );
}

export default Commession;