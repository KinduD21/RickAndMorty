const characters = await fetch("https://rickandmortyapi.com/api/character");
const charactersResponse = await characters.json();

const episodes = await fetch("https://rickandmortyapi.com/api/episode");
const episodesResponse = await episodes.json();

const episodesArray = episodesResponse.results;

const charactersArray = charactersResponse.results;

console.log(charactersArray);
console.log(episodesArray);

let id = Math.floor(Math.random() * charactersArray.length);

const characterCards = document.querySelectorAll("#characterCard");

function firstCard(id) {
  const character = charactersArray[id];

  const cardImage = characterCards[0].querySelector("img");
  cardImage.src = character.image;
  cardImage.alt = character.name;

  const cardName = characterCards[0].querySelector("#cardName");
  cardName.querySelector("h2").innerHTML = character.name;
  cardName.querySelector("a").href = character.url;

  const cardStatus = characterCards[0].querySelector("#cardStatus");
  const cardStatusIcon = characterCards[0].querySelector("#cardStatusIcon");

  cardStatus.innerHTML = character.status;
  if (cardStatus.innerHTML === "Alive") {
    cardStatusIcon.classList.add("bg-green-600");
  }
  if (cardStatus.innerHTML === "Dead") {
    cardStatusIcon.classList.add("bg-red-600");
  }
  if (cardStatus.innerHTML === "unknown") {
    cardStatusIcon.classList.add("bg-neutral-400");
  }

  const cardLocation = characterCards[0].querySelector("#cardLocation a");
  cardLocation.innerHTML = character.location.name;
  cardLocation.href = character.location.url;
  
  const firstEpisodeId = character.episode[0].split("/").pop();
  const firstEpisode = episodesArray.find((episode) => episode.id === +firstEpisodeId);

  const cardFirstSeen = characterCards[0].querySelector("#cardFirstSeen a");
  console.log(firstEpisode.name);
  cardFirstSeen.innerHTML = firstEpisode.name;
  cardFirstSeen.href = firstEpisode.url;
}

firstCard(id);

// characterCards.forEach((characterCard) => )
