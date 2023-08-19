import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function Header() {
     const location = useLocation();
     const path = location.pathname;
     
     const [toggle,setToggle] = useState(false);

     const handleToggle = () => {
          if(toggle == false){
               setToggle(true);
          }
          if(toggle == true){
               setToggle(false);
          }

         
     }

   

     const style = {
          toggle : {
               transform : toggle ? "rotate(90deg)" : "rotate(0deg)",
               transition : "0.5s all"
          }
     }

     return ( 
          <>
               <Navbar expand={"lg"} className='bg-warning'>
               <Container>
                    <Navbar.Brand href='/' className='text-light'>D_D Calculation</Navbar.Brand>

                    <Navbar.Toggle style={style.toggle}  id='toggle' aria-controls='collapse' onClick={handleToggle}><FaBars /></Navbar.Toggle>
                    <Navbar.Collapse id='collapse'>
                         <Nav className='ms-auto'>
                              <Nav.Link href='/' className={path == "/" ? 'text-dark bg-light px-3 rounded' :'text-light px-3'}>Calculation</Nav.Link>
                              <Nav.Link href='/commession' className={path == "/commession" ? 'text-dark bg-light px-3 rounded' :'text-light px-3'}>Commession</Nav.Link>
                         </Nav>
                    </Navbar.Collapse>
               </Container>
               
               </Navbar>
          </>
      );
}

export default Header;