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
     const [inputValue,setInputValue] = useState("");
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

const reverseString = (inputString) => {
     return inputString.split('').reverse().join('');
   };


  
     

  
  
     const handleOption = (e) => {
          setSelectedOption(e.target.value);
         
     }
  
     const handleSubmit = (e) => {
          e.preventDefault();
          const toarray = values.split(",");

          // straight
          const straight = toarray.filter(num=>num.includes("-") && !num.includes("D"));
          let beforeArray = "";
          if(straight.length > 0){
             
               if(straight.length == 1){
               //     beforeArray.push(straight[0]);
                    beforeArray += straight[0]+ ", ";
               }
               if(straight.length > 1){
                    const newValue = straight.join(', ');
                    beforeArray += newValue + ", ";
               }
          }else{
               console.log("No Straight")
          }
           // straight

          //  sr
          const streverse = toarray.filter(num=>num.includes("D"));
          if(streverse.length > 0){
               const modifiedArray = streverse.map(item => {
                    const toarray = item.split("D");
                    const smallmap = toarray.map(item=>{
                         if(item.includes("-")){
                              const [start, end] = item.split('-').map(Number);
                              return [start, end];
                         }else {
                              return item;
                            }
                    })
                    const straightValue = toarray[0] + "-" + smallmap[1][0];
                    const reverseValue = reverseString(toarray[0]) + "-" + smallmap[1][1];
                    return [straightValue, reverseValue].join(", ")+", ";
               })
               beforeArray += modifiedArray.join(", ")+ ", ";
          }else{
               console.log("No Straight Reverse")
          }
          //  sr

          // reverse
          const reverse = toarray.filter(num=>num.includes("R"));
          if(reverse.length > 0){ 
             
                    const modifiedArray = reverse.map(item => {
                         const toarray = item.split("R");
                         const straightValue = toarray[0];
                         const reverseValue = reverseString(straightValue);
                         return straightValue + "-" + toarray[1] + ", " + reverseValue + "-" + toarray[1];
                     });

                     beforeArray += modifiedArray.join(", ")+ ", ";
               
          }else{
               console.log("No Reverse")
          }
            // reverse

          //   include
          const arrayonetohand = [];

          for (var i = 0; i < 100; i++) {
            var item = i.toString().padStart(2, '0');
            arrayonetohand.push(item);
          }
          const includeOne = toarray.filter(num=>num.includes("P"));
          if(includeOne.length > 0){
               const modifiedArray = includeOne.map(included=>{
                    const findwith = included.split("P");
                    const nums = arrayonetohand.filter(num=>num.includes(findwith[0]))
                    return nums.map(num=>num+ "-" +findwith[1]).join(", ")+", ";
               })
       
                 beforeArray += modifiedArray;
                 
          
          }else{
               console.log("No IncludeOne")
          }
          //   include

          // appu
          const appu = toarray.filter(num=>num.includes("A") && !num.includes("KA"));
          const appuNums = ["00","11","22","33","44","55","66","77","88","99"];
          if(appu.length > 0){
               const modifiedArray = appu.map(a=>{
                    const resultArray = a.match(/([A-Za-z]+)(\d+)/).slice(1);
             
                    return appuNums.map(num=>num+"-"+resultArray[1]).join(", ")+", ";
               })
           
               beforeArray += modifiedArray; 
          }else{
               console.log("No APPU")
          }
           // appu

          // Kway
          const possibleNum = toarray.filter(num=>num.includes("K") && !num.includes("KA"));
          if(possibleNum.length > 0){
               const modifiedArray = possibleNum.map(a=>{
                    const textToArray = a.split("K")
                    const numArray = Array.from(String(textToArray[0], Number)) ;
                    const numberList = [];
                    numArray.forEach(firstDigit => {
                         numArray.forEach(secondDigit => {
                           if (firstDigit !== secondDigit) {
                             const number = `${firstDigit}${secondDigit}`;
                             numberList.push(number);
                           }
                         });
                       });
                       const beforeResult = numberList.map(num=>num+"-"+textToArray[1]).join(", ")+", ";
                   
                      return beforeResult;
                      

               })
               beforeArray += modifiedArray;
               
          }else{
               console.log("No possibleNum")
          }
          // Kway

           // KwayPUU
          const possibleNumAppu = toarray.filter(num=>num.includes("KA"));
          if(possibleNumAppu.length > 0){
               const modifiedArray = possibleNumAppu.map(a=>{
                    const textToArray = a.split("KA")
                    const numArray = Array.from(String(textToArray[0], Number)) ;
                    const numberList = [];
                    numArray.forEach(firstDigit => {
                         numArray.forEach(secondDigit => {
                       
                             const number = `${firstDigit}${secondDigit}`;
                             numberList.push(number);
                        
                         });
                       });
                       const beforeResult = numberList.map(num=>num+"-"+textToArray[1]).join(", ")+", ";
                   
                      return beforeResult;
                      

               })
               beforeArray += modifiedArray;
          }else{
               console.log("No possibleNumAppu")
          }
          // KwayPUU

          const inputObject = beforeArray.slice(0, beforeArray.length-2).split(", ");
          const cleanedObject = {};

     for (const key in inputObject) {
     if (Object.hasOwnProperty.call(inputObject, key)) {
     let value = inputObject[key];

    // Check if the value starts with a comma and remove it
     if (typeof value === 'string' && value.startsWith(',')) {
      value = value.slice(1);
    }

    cleanedObject[key] = value;
  }
}
const cleanedArray = Object.values(cleanedObject);


     
       
     
          var sumByValue = {};

          cleanedArray.forEach(item => {
            var parts = item.split('-');
            var value = parts[0];
            var totalValue = parseInt(parts[1], 10);
            
            if (!sumByValue[value]) {
              sumByValue[value] = 0;
            }
            
            sumByValue[value] += totalValue;
          });

          console.log(sumByValue)
          
       
     }

     const handleReadOnly = (e) => {
         if(toreadonly == false){
          setToreadonly(true);
         }
         if(toreadonly == true){
          setToreadonly(false);
         }
     }

     const handlePress = (e) => {
          if(e.key === " "){
               e.preventDefault();
          }
          if (e.key === 'Enter') {
               e.preventDefault();
               handleSubmit(e);
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
                                             <Form.Control as={"textarea"} rows={3} placeholder='Eg- 10R200,1P1000,A1000' value={values} onChange={e => setValues(e.target.value.toUpperCase())} onKeyPress={handlePress} />
                                        </Form.Group>
                                        <button type='submit'  className='btn btn-warning form-control mt-3'>Add</button>
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