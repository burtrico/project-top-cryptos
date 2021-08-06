let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// GET Request - Add all the Toys listed on the server to the Page
const API_URL = 'http://localhost:3000/toys'
const divToys = document.querySelector("#toy-collection")

function getToys() {
  fetch(API_URL)
  .then(resp => resp.json())
  .then(toysArray => {
    toysArray.forEach(toyObj => renderToy(toyObj))
  })
}

function renderToy(toyObj) {
  const card = document.createElement('div')
  card.id = `card-${toyObj.id}`
  card.className = "card"
  divToys.appendChild(card)

  const cardName = document.createElement('h2')
  cardName.textContent = toyObj.name
  card.appendChild(cardName)

  const cardImg = document.createElement('img')
  cardImg.src = toyObj.image
  cardImg.className = "toy-avatar"
  card.appendChild(cardImg)

  const cardLikes = document.createElement('p')
  cardLikes.textContent = toyObj.likes
  cardLikes.id = `likes-${toyObj.id}`
  card.appendChild(cardLikes)

  const button = document.createElement('button')
  button.className = "like-btn"
  button.id = `button-${toyObj.id}`
  button.textContent = "like"
  // The like button's addEventListener below sends the toyObj data to the function
  button.addEventListener('click',() => increaseLikes(toyObj))
  card.appendChild(button)
  
}

// POST Request - Add a New Toy to Server and the Page
const toyForm = document.querySelector('.add-toy-form')

function postToy(e) {
  e.preventDefault();
  const toyName = document.querySelector('input[name="name"]').value
  const toyImg = document.querySelector('input[name="image"]').value

  if(toyName !== "" && toyImg !== "") {
    const toyObj = {
      name: toyName,
      image: toyImg,
      likes: 0,
    }

    const postObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json" },
    body: JSON.stringify(toyObj)
    }
    
    fetch(API_URL, postObj)
    .then(resp => resp.json())
    .then(toy => renderToy(toy))
    toyForm.reset();
  } else {
    alert("Fill in the form!")
  }
}

// PATCH Request - Increase a Toy's Likes on the Server and the Page

function increaseLikes(toyObj) {
//    e.preventDefault();
    console.log(toyObj.id)
    newLikesCount = parseInt(toyObj.likes) + 1;  
    const toyID = parseInt(toyObj.id)
    const API_URL_ID = `http://localhost:3000/toys/${toyID}`

    const patchObj = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json" },
      body: JSON.stringify({
        "likes": newLikesCount
      })
    }
    
    fetch(API_URL_ID, patchObj)
    .then(resp => resp.json())
    .then(updatedLikes => {
      console.log(updatedLikes)
      const cardLikes = document.querySelector(`#likes-${toyObj.id}`)
      cardLikes.textContent = updatedLikes.likes

//      const button = document.querySelector(`#button-${toyObj.id}`)
//      button.addEventListener('click',() => increaseLikes(toyObj))
    })
}

function init() {
  getToys()
  toyForm.addEventListener('submit', postToy)
}

init();