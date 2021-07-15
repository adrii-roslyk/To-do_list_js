"use strict";

window.addEventListener('load', function() {
  /**********modal window "login"**********/
  const loginBlock = document.querySelector('.login');   
  const todoPage = document.querySelector('.todo');
  const authForm = document.forms.authForm;
  const emailInput = authForm.elements.userEmail; 
  const passwordInput = authForm.elements.userPassword;
  const inputs = [emailInput, passwordInput];  
  const loginBtn = authForm.querySelector('button[name="loginBtn"]');
 
  init();    
  listenAuthInputs();
  listenAuthButton(); 
   
  function init() {
    hideEelement(todoPage);
    showElement(loginBlock);     
  }  

  function showElement(element) {
    element.hidden = false;
  }

  function hideEelement(element) {
    element.hidden = true;
  }   

  function listenAuthInputs() {
    
    for (let input of inputs) {        
      input.addEventListener('focus', function inputsFocusHandler() {
        removeErrMessage(input);                            
      })

      input.addEventListener('blur', function inputsBlurHandler() {         
        let errorMessage = validateInput(input);          
        
        if (errorMessage) {
          addErrMessage(input, errorMessage);                   
        } else {
          removeErrMessage(input);
        }
      });       
    } 
  }

  function listenAuthButton() {    
    loginBtn.addEventListener('click', function buttonClickHandler() {          
      let errors = [];

      for (let input of inputs) { 
        removeErrMessage(input); 
        
        let errorMessage = validateInput(input);  
        errors.push(errorMessage);      

        if (errorMessage) {
          addErrMessage(input, errorMessage);                        
        }         
      }   
      
      const checkError = (error) => error === null;      

      if (errors.every(checkError)) {
        authenticate();
      }           
    });    
  }

  function removeErrMessage(input) {
    let errorElement = input.nextElementSibling;

      if (errorElement !== null) {
        errorElement.remove();
      }        
  }

  function addErrMessage(input, message) {
    let errorElement = document.createElement('p');
    errorElement.className = 'error';
    errorElement.textContent = message;
    input.insertAdjacentElement('afterend', errorElement);
  } 

  function validateInput(input) {     
    let message = null;         

    if (!input.value) {            
      message = 'Cannot be blank';              
    } else {

      if (input.type === 'email') {
        let emailValidResult = validateEmail(input.value); 

        if (!emailValidResult) {               
          message = 'Invalid email address format';                         
        }             
      } 
          
      if (input.type === 'password') {
        let passwordValidResult = validatePassword(input.value);  

        if (passwordValidResult !== true) {              
          message = passwordValidResult;               
        }                  
      }          
    }  

    return message;
  }  
   
  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let result = emailRegex.test(String(email).toLowerCase());    
    return result;
  }

  function validatePassword(password) { 
    let result = null;
    let num = Number(password);
    let isNumber = Number.isInteger(num); 

    switch(true) {
      case password.length < 8:
        result = 'At least 8 characters';
        break;
      case password.length > 12:
        result = 'Maximum 12 characters';
        break;
      case !isNumber:
        result = 'Only numbers';  
        break;
      default: 
        result = true;  
    }

    return result;    
  }   
  
  function authenticate() {
    console.log('work');
  }
});
