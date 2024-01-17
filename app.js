'use strict';

// Global variables
//let newUser;

// TODO New User stores them in something like userArray
function getUserList() {
  let storedUser = localStorage.getItem('get-user');
  if(!storedUser) {
    localStorage.setItem('get-user', JSON.stringify([]));
    return [];
  }
  return JSON.parse(storedUser);
}

function addUserToList(user) {
  let users = getUserList();
  users.push(user);
  localStorage.setItem('get-user', JSON.stringify(users));

  //return userArray;
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
  createNewUser(name, email, licenseNumber);
}

function createNewUser (name, email, licenseNumber) {

  // let userExists = doesUserExist(name, licenseNumber)
  let userExists = doesUserExist(name, licenseNumber);
  // Check if (userExists)
  if (userExists) {
    // set error message div contents
  // return
    return ('get your error message from your html');
  } else {
  // create new user with form input values

    let newUser = MakeNewUser(name, email, licenseNumber);
    addUserToList(newUser);
    NewUserForm.reset();
  }
  handleExistingUserRedirect();
}

//exisiting user login
function LogInUser(event) {
  // get the info from the login form
  event.preventDefault();
  let name = event.target.name.value;
  let licenseNumber = event.target.licenseNumber.value;

  // if doesUSerExist
  if (doesUserExist(name, licenseNumber)) {
    // handleExistingUserRedirect
    localStorage.setItem('signedInUser', licenseNumber);
    return handleExistingUserRedirect();
  } else {
    return('get your error message out of html');
  }
}


//TODO check if user exists
function doesUserExist (name, licenseNumber) {
  // return true or false
  let userList = getUserList();
  for (let i = 0; i < userList.length; i++) {
    if(userList[i].name === name && userList[i].licenseNumber === licenseNumber) {
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
  return {
    name: name,
    email: email,
    licenseNumber: licenseNumber
  };
}
//TODO store them somewhere not in an array



//*** executable code for login
createNewUser('Bob', 'bobtest@bobtest.com', '11111111111');
console.log(getUserList());

NewUserForm.addEventListener('submit', handleSubmit);
ExistingUserForm.addEventListener('submit',LogInUser);


