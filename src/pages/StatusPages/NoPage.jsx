import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function NoPage() {
     return ( 
          <>
               <Container>
                    <Row className='p-5'>
                         <Col className='border rounded text-center p-3 border-dark'>
                              <h1>😥</h1>
                              <h3>404 Not Found</h3>
                              <p>Go Back To</p><a href='/'>Home Page</a>
                         </Col>
                    </Row>
               </Container>
          </>
      );
}

export default NoPage;