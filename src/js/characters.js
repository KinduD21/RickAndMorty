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

const fillCards = async (data) => {
  for (let i = 0; i < data; i++) {
    let id = Math.floor(Math.random() * allCharacters.length);

    const character = allCharacters[id];

    const firstEpisodeId = character.episode[0].split("/").pop();
    const firstEpisode = allEpisodes.find(
      (episode) => episode.id === +firstEpisodeId
    );
    
    createCardTemplate(character, firstEpisode);
  }
};

await fillCards(6);

function createCardTemplate(character, firstEpisode) {
  const template = `<article id="characterCard" class="flex bg-gray-800 m-4 rounded-lg">
  <div class="flex flex-initial basis-56">
    <img src="${character.image}" alt="${
    character.name
  }" class="rounded-l-lg" />
  </div>
  <div
    class="flex flex-1 flex-col gap-3 justify-between p-3"
  >
    <div id="cardName" class="section flex flex-col gap-2">
      <a href="${
        character.url
      }" target="_blank" class="text-3xl font-bold block hover:text-orange-400"
        ><h2>${character.name}</h2
      ></a>
      <div class="flex items-baseline gap-1">
      <span id="cardStatusIcon" class="h-2 w-2 mr-1 rounded ${
        character.status === "Alive"
          ? "bg-green-600"
          : character.status === "Dead"
          ? "bg-red-600"
          : character.status === "unknown"
          ? "bg-neutral-400"
          : ""
      }"></span>
        <span id="cardStatus">${character.status} - ${character.species}</span>
      </div>
    </div>
    <div id="cardLocation" class="section flex-col flex-wrap">
      <span class="text-gray-400">Last known location:</span
      ><a href="${
        character.location.url
      }" target="_blank" class="text-xl block hover:text-orange-400">${
    character.location.name
  }</a>
    </div>
    <div id="cardFirstSeen" class="section flex-col flex-wrap">
      <span class="text-gray-400">First seen in:</span
      ><a href="${
        firstEpisode.url
      }" target="_blank" class="text-xl block hover:text-orange-400">${
    firstEpisode.name
  }</a>
    </div>
  </div>
</article>`;
  renderCards(template);
}

function renderCards(cardTemplate) {
  const cardWrapper = document.querySelector("#cardWrapper");
  cardWrapper.insertAdjacentHTML("beforeend", cardTemplate);
}
