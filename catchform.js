//Global variables
let newfish = document.getElementById('new-fish');

function getSignedInUserLicenseNumber() {
  return localStorage.getItem('signedInUser');
}

//Get fish 
function getFishCaughtByLicenseNumber(licenseNumber) {
  //retrives data stored in local storage


  let storedFish = localStorage.getItem(`${licenseNumber}:caught-fish`);
  //if it wasn't there set a default value
  if (!storedFish) {
    let defaultValue = [];
    localStorage.setItem(`${licenseNumber}:caught-fish`, JSON.stringify(defaultValue));
    //default value
    return defaultValue;
  }
  return JSON.parse(storedFish);
}

function addFish(fish, licenseNumber) {
  //adds fish to caught fish
  let caughtFish = getFishCaughtByLicenseNumber(licenseNumber);
  caughtFish.push(fish);
  //saves fish to caught fish
  localStorage.setItem(`${licenseNumber}:caught-fish`, JSON.stringify(caughtFish));
}
//***************LETS MAKE SOME FISH (catch form html page)*******************************************/

//*******get form for event submission from html
let NewFishForm= document.getElementById('new-fish-form');
let fishTable =document.createElement('table'); //same as hourlySalesTable

//build a table based on the fish caught array? HELPER FUNCTION
function renderFishrows(table,  licenseNumber) {
  let caughtFish = getFishCaughtByLicenseNumber(licenseNumber);
  for (let i = 0; i < caughtFish.length; i++) {
    renderFishRow(table, caughtFish[i]);
  }
}

// Header Function

function headerFunction(table) {
  let headerRow = document.createElement('tr');
  table.appendChild(headerRow);

  //let cell = document.createElement('th');
  //headerRow.appendChild(cell);
  let headerLabelArray = ['marineArea', 'DayOfWeek', 'Month', 'Creature', 'clipType'];
  for (let i = 0; i <headerLabelArray.length; i++) {
    let headerCell = document.createElement('th');
    headerCell.textContent = headerLabelArray[i];
    headerRow.appendChild(headerCell);
  } //you don't currently have a predetermined header but you could make an arrive of all the marineArea, Day of week etc might be a good idea for now**************************since this will have jack shit in it
}


//let fishCaughtSessionCell = document.createElement
let rebuildFishCaughtTable = function() {
//remove old table from dom
  fishTable.remove();
  //create new table
  fishTable = document.createElement('table');
  // get signed in users license number
  // and pass to render fish table
  let licenseNumber = getSignedInUserLicenseNumber();
  renderFishTable(fishTable, licenseNumber);
  newfish.appendChild(fishTable);
};

let renderFishTable = function (table, licenseNumber) {
  headerFunction(table);
  renderFishrows(table, licenseNumber);
};

//form submission for new fish caught form submission and event handler
function handleNewFishSubmit(event) {
  event.preventDefault();
  let marineArea = event.target.marineArea.value;
  let DayOfWeek = event.target.DayOfWeek.value;
  let Month = event.target.Month.value;
  let Creature = event.target.Creature.value;
  let clipType = event.target.ClipType.value;
  let newCatchSession;
  //make some new  fish with the inputs
  newCatchSession =  makeNewFishCaught(marineArea, DayOfWeek, Month, Creature, clipType);
  let licenseNumber = getSignedInUserLicenseNumber();
  if (licenseNumber)
  {
    addFish(newCatchSession, licenseNumber);
    //NewFishForm.reset();
    rebuildFishCaughtTable();
  }
  //************ CALLL YOUR TABLE REBUILD RIGHT HERE and get rid of the line above this*/
}

//Fish Constructor Function
function makeNewFishCaught(marineArea, DayOfWeek, Month, Creature, ClipType) {
  return {
    marineArea :marineArea,
    DayOfWeek : DayOfWeek,
    Month : Month,
    Creature :Creature,
    ClipType : ClipType
  };
}

//Prototype function we use them when we want to make something a bunch of times and need a guide for the thing we are making
function renderFishRow(table, fish) {
  //row for each catch session
  let catchRow = document.createElement('tr');
  let tableItemKeys = ['marineArea', 'DayOfWeek', 'Month', 'Creature', 'clipType'];
  //lets loop though FishCaught array to get each row of a catch
  for (let i =0; i < tableItemKeys.length; i++) {
    let tableItem = document.createElement('td');
    let content = `${fish[tableItemKeys[i]]}`;
    tableItem.innerText = content;
    catchRow.appendChild(tableItem);
  }
  table.appendChild(catchRow);
}
//YOU ARE HERE YOU NEED TO GET YOUR TABLE TO HOLD SOMETHING

if (!getSignedInUserLicenseNumber()) {
  // redirect to sign in
}

//executable code for fish
let fishTest = makeNewFishCaught('seattle', 'tuesday', 'february', 'salmon', 'wild');
addFish(fishTest);
console.log((getFishCaughtByLicenseNumber(getSignedInUserLicenseNumber())));
rebuildFishCaughtTable();
NewFishForm.addEventListener('submit', handleNewFishSubmit);
