// console.log(episodesArray);

let allCharacters = [];
let allEpisodes = [];

const getAllCharacters = async () => {
  let nextPage = "https://rickandmortyapi.com/api/character";

  while (nextPage) {
    const response = await fetch(nextPage);
    const data = await response.json();

    allCharacters = allCharacters.concat(data.results);
    nextPage = data.info.next;
  }

  return allCharacters;
};

const getAllEpisodes = async () => {
  let nextPage = "https://rickandmortyapi.com/api/episode";

  while (nextPage) {
    const response = await fetch(nextPage);
    const data = await response.json();

    allEpisodes = allEpisodes.concat(data.results);
    nextPage = data.info.next;
  }

  return allEpisodes;
};

await getAllCharacters();
await getAllEpisodes();

const fillCards = async () => {
  const characterCards = document.querySelectorAll("#characterCard");

  characterCards.forEach((characterCard) => {
    let id = Math.floor(Math.random() * allCharacters.length);

    const character = allCharacters[id];

    const cardImage = characterCard.querySelector("img");
    cardImage.src = character.image;
    cardImage.alt = character.name;

    const cardName = characterCard.querySelector("#cardName");
    cardName.querySelector("h2").innerHTML = character.name;
    cardName.querySelector("a").href = character.url;

    const cardStatus = characterCard.querySelector("#cardStatus");
    const cardStatusIcon = characterCard.querySelector("#cardStatusIcon");

    cardStatus.innerHTML = `${character.status} - ${character.species}`;
    if (cardStatus.innerHTML.includes("Alive")) {
      cardStatusIcon.classList.add("bg-green-600");
    }
    if (cardStatus.innerHTML.includes("Dead")) {
      cardStatusIcon.classList.add("bg-red-600");
    }
    if (cardStatus.innerHTML.includes("unknown")) {
      cardStatusIcon.classList.add("bg-neutral-400");
    }

    const cardLocation = characterCard.querySelector("#cardLocation a");
    cardLocation.innerHTML = character.location.name;
    cardLocation.href = character.location.url;

    const firstEpisodeId = character.episode[0].split("/").pop();
    const firstEpisode = allEpisodes.find(
      (episode) => episode.id === +firstEpisodeId
    );

    const cardFirstSeen = characterCard.querySelector("#cardFirstSeen a");
    cardFirstSeen.innerHTML = firstEpisode.name;
    cardFirstSeen.href = firstEpisode.url;

    createCardTemplate();
  });
};

await fillCards();

const cardWrapper = document.querySelector("#cardWrapper");

const createCardTemplate = () => {
  return `<article id="characterCard" class="flex bg-gray-800 m-4 rounded-lg">
  <div class="flex flex-initial basis-56">
    <img src="" alt="" class="rounded-l-lg" />
  </div>
  <div
    class="flex flex-1 flex-col gap-3 justify-between p-3"
  >
    <div id="cardName" class="section flex flex-col gap-2">
      <a href="" target="_blank" class="text-3xl font-bold block hover:text-orange-400"
        ><h2></h2
      ></a>
      <div class="flex items-baseline gap-1">
        <span id="cardStatusIcon" class="h-2 w-2 mr-1 rounded"></span>
        <span id="cardStatus"></span>
      </div>
    </div>
    <div id="cardLocation" class="section flex-col flex-wrap">
      <span class="text-gray-400">Last known location:</span
      ><a href="" target="_blank" class="text-xl block"></a>
    </div>
    <div id="cardFirstSeen" class="section flex-col flex-wrap">
      <span class="text-gray-400">First seen in:</span
      ><a href="" target="_blank" class="text-xl block"></a>
    </div>
  </div>
</article>`
}

const renderCards = (cardTemplate) => {
  cardWrapper.insertAdjacentHTML("beforeend", cardTemplate);
}
