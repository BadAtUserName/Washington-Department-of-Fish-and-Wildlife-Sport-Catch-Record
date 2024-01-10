'use strict';

// Global variables
let userArray  = [];
let newUser;

// TODO New User
function getUsers() {
  return userArray;
}

//*******get form for event submission from html
let NewUserForm = document.getElementById('new-user-form');
let ExistingUserForm = document.getElementById( 'existing-user-form');


//***** New User Form Submission and Even handler
//1.New user needs name, email, license number
function handleSubmit(event) {
  event.preventDefault();
  //values from form
  let name = event.target.name.value;
  let email = event.target.email.value;
  let licenseNumber = event.target.licenseNumber.value;
  // let userExists = doesUserExist(name, licenseNumber)
  let userExists = doesUserExist(name, licenseNumber);
  // Check if (userExists)
  if (userExists) {
    // set error message div contents
  // return
    return ('get your error message from your html');
  } else {
  // create new user with form input values
    newUser = new MakeNewUser(name, email, licenseNumber);
    getUsers().push(newUser);
    NewUserForm.reset();
  }
}



//exisiting user login  ******* you need to call this function somewhere**************
function LogInUser(event) {
  // get the info from the login form
  event.preventDefault();
  let name = event.target.name.value;
  let licenseNumber = event.target.licenseNumber.value;

  // if doesUSerExist
  if (doesUserExist(name, licenseNumber)) {
    // handleExistingUserRedirect
    return handleExistingUserRedirect();
  } else {
    return('get your error message out of html');
  }
}


//TODO check if user exists
function doesUserExist (name, licenseNumber) {
  // return true or false
  for (let i = 0; i < userArray.length; i++) { 
    if(userArray[i].name === name && userArray[i].licenseNumber === licenseNumber) { 
      return true;
    } 
  }

  return false;
}

//user redirect function
function handleExistingUserRedirect() {
  let redirectCatchFormPage = '/html/catch-form.html';

  window.location.href = redirectCatchFormPage;

  return false;
}

// *****Constructor functions ***
//1.New user needs name, email, license number
function MakeNewUser(name, email, licenseNumber) {
  this.name = name;
  this.email = email;
  this.licenseNumber = licenseNumber;
}

//TODO store them somewhere not in an array



//*** executable code

let BobTest = new MakeNewUser('Bob', 'bobtest@bobtest.com', '11111111111');
getUsers().push(BobTest); //need better name
console.log(userArray);

NewUserForm.addEventListener('submit', handleSubmit);
ExistingUserForm.addEventListener('submit',LogInUser);


//***************LETS MAKE SOME FISH */

