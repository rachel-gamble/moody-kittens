let kittens = []
console.log(kittens);
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault();
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    affection: 5,
    mood: "tolerant"
  }
  kittens.push(kitten);
  saveKittens();
  form.reset();
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let savedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (savedKittens) {
    kittens = savedKittens
  }
  drawKittens(); // I might try only drawing after clicking get started

}


/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let template = "";
  kittens.forEach(i => template += drawKitten(i))
  document.getElementById("kittens").innerHTML = template
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(i => i.id == id)
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kitten = findKittenById(id)
  let n = Math.random() > .65 ? 1 : -1
  kitten.affection += n
  setKittenMood(kitten)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {

  let kitten = findKittenById(id)
  kitten.affection = 5
  setKittenMood(kitten)
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  if (kitten.affection >= 6) {
    kitten.mood = 'happy'
  }
  if (kitten.affection <= 5) {
    kitten.mood = 'tolerant'
  }
  if (kitten.affection < 3) {
    kitten.mood = 'angry'
  }
  if (kitten.affection <= 0) {
    kitten.mood = 'vanished'
  }

}

function drawKitten(kitten) {
  if (kitten.affection <= 0) {
    return `
    <div class="kitten ${kitten.mood} card text-light bg-dark p-3 m-1">
      <div class="text-center mb-1">
        <img src="//robohash.org/${kitten.name}?set=set4" alt="" height="140">
      </div>
      <div>
        <b>Name:</b>
        <span>${kitten.name}</span>
      </div>
      <div>
        <b>Ran Away!</b>
      </div>
    </div> 
    `
  }
  return `
   <div class="kitten ${kitten.mood} card text-light bg-dark p-3 m-1">
   <div class="text-center mb-1">
     <img src="//robohash.org/${kitten.name}?set=set4" alt="" height="120">
   </div>
   <div>
     <b>Name:</b>
     <span>${kitten.name}</span>
   </div>
   <div>
     <b>Mood:</b>
     <span>${kitten.mood}</span>
   </div>
   <div>
     <b>Affection:</b>
     <span>${kitten.affection}</span>
   </div>
   <div class="d-flex align-items-center space-between mt-1">
     <button class="btn-cancel" onclick="pet('${kitten.id}')">Pet</button>
     <button onclick="catnip('${kitten.id}')">Catnip</button>
   </div>
 </div>`

}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens() {
  kittens = []
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  //window.sessionStorage.setItem('welcome') Might try saving element's removed state during user session
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();