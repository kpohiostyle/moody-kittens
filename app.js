/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "tolerant",
    affection: 5,
  }
  if (form.name.value == "") {
    alert("Please Enter Your Kittens Name")
  }
  else {

    kittens.push(kitten)
    saveKittens()
    form.reset()
    drawKittens()
  }
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
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

function deleteKitten(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  if (index == -1) {
    throw new Error("Invalid ID")
  }
  kittens.splice(index, 1)
  saveKittens()
}
/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  loadKittens()
  let kittenListElement = document.getElementById("clowder")
  let clowderTemplate = ""
  kittens.forEach(kitten => {
    clowderTemplate += `
    <div class=" bg-dark kitten m-1 ${kitten.mood} text-light">
      <img class="kitten" src="https://robohash.org/${kitten.name}?set=set4&size=100x100">
      <p class="d-flex justify-content-center">Name: ${kitten.name}</p>
      <p class ="d-flex justify-content-center">Mood: ${kitten.mood}</p>
      <p class = "d-flex justify-content-center">Affection: ${kitten.affection}</p>
      <button class="btn-cancel m-1" onclick="pet('${kitten.id}')">Pet kitty</button>
      <button class="m-1" onclick="catnip('${kitten.id}')">Catnip</button>
      <button class="d-flex btn-delete" onclick="deleteKitten('${kitten.id}')">Delete</button></div>
    </div>
    </div>
 `
  })
  kittenListElement.innerHTML = clowderTemplate
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let currentKitten = findKittenById(id)
  let mathRandom = Math.random()
  if (mathRandom > .7) {
    currentKitten.affection++;
    setKittenMood(currentKitten)
    saveKittens()
  } else {
    currentKitten.affection--;
    setKittenMood(currentKitten)
    saveKittens()
  }
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "tolerant"
  currentKitten.affection = 5;
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  document.getElementById("clowder").classList.remove(kitten.mood)
  if (kitten.affection >= 6) { kitten.mood = "happy" }
  else if (kitten.affection >= 4 && kitten.affection <= 5) { kitten.mood = "tolerant" }
  else if (kitten.affection >= 1 && kitten.affection <= 3) { kitten.mood = "angry" }
  else { kitten.mood = "gone" }

  document.getElementById("clowder").classList.add(kitten.mood)
  saveKittens()
}

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("show-button").classList.remove("hidden")
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

