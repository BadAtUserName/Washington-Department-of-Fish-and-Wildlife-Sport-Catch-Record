
//TODO 
//need the 'get user'
//need stored fish
//need a for loop of users
//followed by a for loop of creatures
//the the creatures in a for loop somewhere


function getUserList() {
  let storedUser = localStorage.getItem('get-user');
  if(!storedUser) {
    localStorage.setItem('get-user', JSON.stringify([]));
    return [];
  }
  return JSON.parse(storedUser);
}

function sumOfCreaturesCaught() {
  // get all fish for all users
  //creature sums is an object where the properties are creature names and number of creatures caught
  let creatureSums = {};
  let users = getUserList();

  for ( let i = 0; i < users.length; i++) {
    let licenseNumber = users[i].licenseNumber;
    let storedFish = getFishCaughtByLicenseNumber(licenseNumber);
    for ( let j = 0; j < storedFish.length; j++) {
      let fish = storedFish[j];
      let creature = fish.Creature;
      if (!creatureSums[creature]) {
        creatureSums[creature]= 0;
      }

      creatureSums[creature]+=1;}
  }

  console.log(creatureSums);

  return creatureSums;
}

function changeCreatureSumsForChart (creatureSums) {
  return Object.entries(creatureSums).map(function(pair) {
    let key = pair[0];
    let value = pair[1];

    return {
      lable: key,
      value: value
    };
  });
}

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

let creatureSum = sumOfCreaturesCaught();
console.log(changeCreatureSumsForChart(creatureSum));
changeCreatureSumsForChart(creatureSum);

let ctx = document.getElementById('creatureChart');

function renderCreaturesCaughtChart(){

  let chartObj= {
    type: 'bar',
    data: {
      labels: Object.keys(creatureSum),
      datasets: [{
        label: 'Creature Count',
        data: Object.values(creatureSum),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          // Add more colors as needed
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          // Add more colors as needed
        ],
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(ctx, chartObj);
}

renderCreaturesCaughtChart();
