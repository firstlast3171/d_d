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
                    if(toarray[0].includes('.')){
                         const stringArray = toarray[0].split(".");
                         const straight = stringArray.join(",");
                         const reverse = reverseString(straight);
            
                         const numbersArrayTop = straight.split(",");
                         const numbersArrayEnd= reverse.split(",");
                         const attatchWithPriceTop = numbersArrayTop.map(item=>{
                              return item + "-" + smallmap[1][0];
                         })
                         const attatchWithPriceEnd = numbersArrayEnd.map(item=>{
                              return item + "-" + smallmap[1][1];
                         })
                         return [...attatchWithPriceTop,...attatchWithPriceEnd].join(", ")+", ";
                       
                    }
            
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
                         if(toarray[0].includes('.')){
                              const stringArray = toarray[0].split(".");
                              const straight = stringArray.join(",");
                              const reverse = reverseString(straight);
                              const numbers = straight + "," + reverse;
                              const numbersArray = numbers.split(",");
                              const attatchWithPrice = numbersArray.map(item=>{
                                   return item + "-" + toarray[1];
                              })
                            return attatchWithPrice.join(", ")+", "; 
                         }
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
          const includeOne = toarray.filter(num=>num.includes("P") && !num.includes("PW"));
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
          const possibleNum = toarray.filter(num=>num.includes("K") && !num.includes("KA") && !num.includes("NK"));
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

          // top
          const top = toarray.filter(num=>num.includes("T"));
          if(top.length > 0){
          const modifiedArray = top.map(a=>{
               const textToArray = a.split("T");
               const selectedNumbers = arrayonetohand.filter(num=>num[0]===textToArray[0]);
               // console.log(selectedNumbers);
               return selectedNumbers.map(num=>num+ "-" +textToArray[1]).join(", ")+", ";
          })
          beforeArray += modifiedArray;
          }else{
               console.log("No Top")
          }
          // top

          
          // end
          const end = toarray.filter(num=>num.includes("L"));
          if(end.length > 0){
          const modifiedArray = end.map(a=>{
               const textToArray = a.split("L");
               const selectedNumbers = arrayonetohand.filter(num=>num[1]===textToArray[0]);
               // console.log(selectedNumbers);
               return selectedNumbers.map(num=>num+ "-" +textToArray[1]).join(", ")+", ";
          })
          beforeArray += modifiedArray;
          }else{
               console.log("No End")
          }
          // end

          
          // Brake
          const brake = toarray.filter(num=>num.includes("B"));
          if(brake.length > 0){
          const modifiedArray = brake.map(a=>{
               const textToArray = a.split("B");
               const selectedNumbers = arrayonetohand.filter(num=> {
                    const toBrakeNum = parseInt(num[1])+parseInt(num[0]);
                    
                    if(toBrakeNum.toString().length === 2){
                         if(toBrakeNum.toString()[1] === textToArray[0]){
                              return num;
                         }
                    }else{
                         if(toBrakeNum.toString() === textToArray[0]){
                              return num;
                         }
                    }
                    
                
               });
 
               return selectedNumbers.map(num=>num+ "-" +textToArray[1]).join(", ")+", ";
          })
          beforeArray += modifiedArray;
          }else{
               console.log("No BK")
          }
          // Brake

          // power
          const power = toarray.filter(num=>num.includes("PW"));
          if(power.length > 0){
               const modifiedArray = power.map(a=>{
                    const price = a.split("W")[1];
                    const nums = ["05","16","27","38","49","50","61","72","83","94"];
                    return nums.map(num=>num+"-"+price).join(", ")+", ";
               })
               beforeArray += modifiedArray;

          }else{
               console.log("No Power");
          }
           // power

          // power
          const netKhat = toarray.filter(num=>num.includes("NK"));
          if(netKhat.length > 0){
               const modifiedArray = netKhat.map(a=>{
                    const price = a.split("K")[1];
                    const nums = ["07","18","24","35","42","53","69","70","81","96"];
                    return nums.map(num=>num+"-"+price).join(", ")+", ";
               })
               beforeArray += modifiedArray;

          }else{
               console.log("No NetKhat");
          }
           // power

           // eveneven
               const evenEven = toarray.filter(num=>num.includes("EE"));
               if(evenEven.length > 0){
                    const modifiedArray = evenEven.map(a=>{
                         const price = a.split("E")[2];
                         const nums = arrayonetohand.filter(num=>{
                              const firstDigit = parseInt(num[0], 10);
                              const secondDigit = parseInt(num[1], 10);
                               if(firstDigit % 2 === 0 && secondDigit % 2 === 0){
                                   return num;
                               };
                         })
                         return nums.map(num=>num+"-"+price).join(", ")+", ";
                    })
                    beforeArray += modifiedArray;
               }else{
                    console.log("Not EvenEven")
               }
           //eveneven

                 // evenodd
                 const evenOdd = toarray.filter(num=>num.includes("EO"));
                 if(evenOdd.length > 0){
                      const modifiedArray = evenOdd.map(a=>{
                           const price = a.split("O")[1];
                           const nums = arrayonetohand.filter(num=>{
                                const firstDigit = parseInt(num[0], 10);
                                const secondDigit = parseInt(num[1], 10);
                                 if(firstDigit % 2 === 0 && secondDigit % 2 !== 0){
                                     return num;
                                 };
                           })
                           return nums.map(num=>num+"-"+price).join(", ")+", ";
                      })
                      beforeArray += modifiedArray;
                 }else{
                      console.log("Not EvenOdd")
                 }
             //evenodd

               // oddodd
                 const oddOdd = toarray.filter(num=>num.includes("OO"));
                 if(oddOdd.length > 0){
                      const modifiedArray = oddOdd.map(a=>{
                           const price = a.split("O")[2];
                           const nums = arrayonetohand.filter(num=>{
                                const firstDigit = parseInt(num[0], 10);
                                const secondDigit = parseInt(num[1], 10);
                                 if(firstDigit % 2 !== 0 && secondDigit % 2 !== 0){
                                     return num;
                                 };
                           })
                           return nums.map(num=>num+"-"+price).join(", ")+", ";
                      })
                      beforeArray += modifiedArray;
                 }else{
                      console.log("Not EvenOdd")
                 }
             //oddodd

          // oddEven
                 const oddEven = toarray.filter(num=>num.includes("OE"));
                 if(oddEven.length > 0){
                      const modifiedArray = oddEven.map(a=>{
                           const price = a.split("E")[1];
                           const nums = arrayonetohand.filter(num=>{
                                const firstDigit = parseInt(num[0], 10);
                                const secondDigit = parseInt(num[1], 10);
                                 if(firstDigit % 2 !== 0 && secondDigit % 2 === 0){
                                     return num;
                                 };
                           })
                           return nums.map(num=>num+"-"+price).join(", ")+", ";
                      })
                      beforeArray += modifiedArray;
                 }else{
                      console.log("Not EvenOdd")
                 }
          //oddEven

          //nyiKo
               const smallBig = toarray.filter(num=>num.includes("SB"));
               if(smallBig.length > 0){
                    const modifiedArray = smallBig.map(a=>{
                         const price = a.split("B")[1];
                         const nums = ["01","09","12","23","34","45","56","67","78","89"];
                         return nums.map(num=>num+"-"+price).join(", ")+", ";
                    });
                    beforeArray += modifiedArray;
               }else{
                    console.log("Not smallBig");
               }
          //nyiKo

          //koNyi
               const koNyi = toarray.filter(num=>num.includes("BS"));
               if(koNyi.length > 0){
                    const modifiedArray = koNyi.map(a=>{
                         const price = a.split("S")[1];
                         const nums = ["10","90","21","32","43","54","65","76","87","98"];
                         return nums.map(num=>num+"-"+price).join(", ")+", ";
                    });
                    beforeArray += modifiedArray;
               }else{
                    console.log("Not smallBig");
               }
          //koNyi

          // stickerEven
               const stickerEven = toarray.filter(num=>num.includes("E") && !num.includes("EE") && !num.includes("EO") && !num.includes("OE"));
               if(stickerEven.length > 0){
                    const modifiedArray = stickerEven.map(a=>{
                         const textToArray = a.split("E");
                         const price = textToArray[1];
                         const oneDigitNum = textToArray[0];
                         const even = ["2","4","6","8","0"];
                         const stickToTop = even.map(num=>num+oneDigitNum);
                         const stickToLast = even.map(num=>oneDigitNum+num);
                         const nums = [...stickToTop,...stickToLast];
                         return nums.map(num=>num+"-"+price).join(", ")+", ";
                    });
                    beforeArray += modifiedArray;
               }else{
                    console.log("Not stickerEven");
               }
          // stickerEven

             // stickerOdd
             const stickerOdd = toarray.filter(num=>num.includes("O") && !num.includes("OO") && !num.includes("EO") && !num.includes("OE"));
             if(stickerOdd.length > 0){
                  const modifiedArray = stickerOdd.map(a=>{
                       const textToArray = a.split("O");
                       const price = textToArray[1];
                       const oneDigitNum = textToArray[0];
                       const even = ["1","3","5","7","9"];
                       const stickToTop = even.map(num=>num+oneDigitNum);
                       const stickToLast = even.map(num=>oneDigitNum+num);
                       const nums = [...stickToTop,...stickToLast];
                       return nums.map(num=>num+"-"+price).join(", ")+", ";
                  });
                  beforeArray += modifiedArray;
             }else{
                  console.log("Not stickerOdd");
             }
        // stickerOdd

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
                              <option value="default">Default</option>
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