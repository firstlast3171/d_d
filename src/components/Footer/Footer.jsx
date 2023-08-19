import React from 'react';

function Footer() {
     const year = 2023;
     const name = "Bhone Thit";
     return ( 
          <>
               <footer className='bg-warning border text-center border text-light'>
                    <p className='mt-2'>© {year} Copyright: {name}</p>
               </footer>
          </>
      );
}

export default Footer;