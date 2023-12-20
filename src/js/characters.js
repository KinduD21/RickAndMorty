const test = await fetch("https://rickandmortyapi.com/api/character");
const response = await test.json();

const charactersArray = response.results;
console.log(charactersArray);

let id = Math.floor(Math.random() * charactersArray.length);

const characterCards = document.querySelectorAll("#characterCard");

async function firstCard(id) {
  const cardImage = characterCards[0].querySelector("img");
  cardImage.src = charactersArray[id].image;
  cardImage.alt = charactersArray[id].name;

  const cardName = characterCards[0].querySelector("#cardName");
  cardName.querySelector("h2").innerHTML = charactersArray[id].name;
  cardName.querySelector("a").href = charactersArray[id].url;

  const cardStatus = characterCards[0].querySelector("#cardStatus");
  const cardStatusIcon = characterCards[0].querySelector("#cardStatusIcon");

  cardStatus.innerHTML = charactersArray[id].status;
  if (cardStatus.innerHTML === "Alive") {
    cardStatusIcon.classList.add("bg-green-600");
  }
  if (cardStatus.innerHTML === "Dead") {
    cardStatusIcon.classList.add("bg-red-600");
  }
  if (cardStatus.innerHTML === "unknown") {
    cardStatusIcon.classList.add("bg-neutral-400");
  }
}

firstCard(id);

// characterCards.forEach((characterCard) => )
