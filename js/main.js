"use strict";

window.addEventListener('load', function() {
  /********************LOGIN********************/
  const loginBlock = document.querySelector('.login');   
  const todoPage = document.querySelector('.todo');
  const authForm = document.forms.authForm;
  const emailInput = authForm.elements.userEmail; 
  const passwordInput = authForm.elements.userPassword;
  const inputs = [emailInput, passwordInput];  
  const loginBtn = authForm.querySelector('button[name="loginBtn"]'); 
  const authFormTitle = document.querySelector('.auth-form__title');
  const classErrData = 'error-data';
  const classWrongData = 'wrong-data';  
  
  init();       
   
  function init() {
    hideEelement(todoPage);
    showElement(loginBlock);
    listenAuthInputs();
    listenAuthButton();     
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
        
        if (authFormTitle.nextElementSibling.className === 'wrong-data') {
          removeErrMessage(authFormTitle);
        }

        removeErrMessage(input); 
        input.classList.remove('valid','invalid')           
      })

      input.addEventListener('blur', function inputsBlurHandler() {             
        let errorMessage = validateInput(input);          
        
        if (errorMessage) {
          addErrMessage(input, classErrData, errorMessage); 
          input.classList.add('invalid');                       
        } else {
          removeErrMessage(input);  
          input.classList.remove('invalid');
          input.classList.add('valid');         
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
          addErrMessage(input, classErrData, errorMessage); 
          input.classList.add('invalid');                                 
        }         
      }   
      
      const checkError = (error) => error === null; 
      let formIsValid = errors.every(checkError);      
      
      if (formIsValid) {        
        let authentication = authenticate(); 
        authorize(authentication);        
      }              
    });    
  }

  function addErrMessage(targetElement, className, message) {
    let errorElement = document.createElement('p');
    errorElement.className = className;
    errorElement.textContent = message;
    targetElement.insertAdjacentElement('afterend', errorElement);
  }

  function removeErrMessage(targetElement) {
    let errorElement = targetElement.nextElementSibling;
    
    if (errorElement !== null) {
      errorElement.remove();
    } 
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
    const permittedEmail = 'testuser@todo.com';
    const permittedPassword = '12345678';
    
    let matched = (emailInput.value === permittedEmail && 
      passwordInput.value === permittedPassword) ? true : false;
    
    return matched;  
  }

  function authorize(permission) {
    const errorMessage = 'Wrong password or email';

    if (permission) {
      hideEelement(loginBlock);
      showElement(todoPage); 
    } else {
      addErrMessage(authFormTitle, classWrongData, errorMessage);  
      for (let input of inputs) {
        input.classList.remove('valid');
        input.classList.add('invalid'); 
      }    
    }
  }   
  /********************END_LOGIN********************/
});
