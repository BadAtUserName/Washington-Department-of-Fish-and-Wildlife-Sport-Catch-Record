//Global variables

let fishCaughtArray = [];
let newfish = document.getElementById('new-fish');


//Get fish
function getFishCaught() {
  return fishCaughtArray;
}

//***************LETS MAKE SOME FISH (catch form html page)*******************************************/

//*******get form for event submission from html
let NewFishForm= document.getElementById('new-fish-form');
let fishTable =document.createElement('table'); //same as hourlySalesTable

//build a table based on the fish caught array? HELPER FUNCTION
function renderFishrows(table) {
  for (let i = 0; i < fishCaughtArray.length; i++) {
    fishCaughtArray[i].render(table);
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
  renderFishTable(fishTable);
  newfish.appendChild(fishTable);
};
let renderFishTable = function (table) {
  headerFunction(table);
  renderFishrows(table);

};

//form submission for new fish caught form submission and event handler
function handleNewFishSubmit(event) {
  event.preventDefault();
  let marineArea = event.target.marineArea.value;
  let DayOfWeek = event.target.DayOfWeek.value;
  let Month = event.target.Month.value;
  let Creature = event.target.Creature.value;
  let clipType = event.targe.ClipType;
  let newCatchSession;
  //make some new  fish with the inputs
  newCatchSession = new MakeNewFishCaught(marineArea, DayOfWeek, Month, Creature, clipType);
  fishCaughtArray.push(newCatchSession);
  //NewFishForm.reset();
  newCatchSession.render(fishTable);
  rebuildFishCaughtTable();
  //************ CALLL YOUR TABLE REBUILD RIGHT HERE and get rid of the line above this*/
}

//Fish Constructor Function
function MakeNewFishCaught(marineArea, DayOfWeek, Month, Creature, ClipType) {
  this.marineArea = marineArea;
  this.DayOfWeek = DayOfWeek;
  this.Month = Month;
  this.Creature = Creature;
  this.ClipType = ClipType;
}

//Prototype function we use them when we want to make something a bunch of times and need a guide for the thing we are making
MakeNewFishCaught.prototype.render = function (table) {
  //row for each catch session
  let catchRow = document.createElement('tr');
  let tableItemKeys = ['marineArea', 'DayOfWeek', 'Month', 'Creature', 'clipType'];
  //lets loop though FishCaught array to get each row of a catch
  for (let i =0; i < tableItemKeys.length; i++) {
    let tableItem = document.createElement('td');
    let content = `${this[tableItemKeys[i]]}`;
    tableItem.innerText = content;
    catchRow.appendChild(tableItem);
  }
  table.appendChild(catchRow);
};
//YOU ARE HERE YOU NEED TO GET YOUR TABLE TO HOLD SOMETHING

//executable code for fish
let fishTest = new MakeNewFishCaught('seattle', 'tuesday', 'january', 'salmon', 'wild');
getFishCaught() .push(fishTest);
console.log(fishCaughtArray);
rebuildFishCaughtTable();
NewFishForm.addEventListener('submit', handleNewFishSubmit);
