import { allCharacters, fillCards, cardWrapper } from "./characters";

const paginationWrapper = document.querySelector("#paginationWrapper");
const pageBtns = paginationWrapper
  .querySelector("ul")
  .querySelectorAll("li a.numeric-page");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const formatCharactersArray = (characters) => {
  const shuffledCharacters = shuffleArray(characters);
  const formattedArray = [];

  for (let i = 0; i < 30; i += 6) {
    const chunk = shuffledCharacters.slice(i, i + 6);
    const formattedObject = {
      id: formattedArray.length + 1,
      characters: chunk,
    };
    formattedArray.push(formattedObject);
  }

  return formattedArray;
};

const formattedCharactersArray = formatCharactersArray(allCharacters);
console.log(formattedCharactersArray[0]);

await fillCards(formattedCharactersArray[0].characters);
console.log(formattedCharactersArray);

pageBtns.forEach((pageBtn, index) => {
  // Set innerHTML and id property to corresponding one from array
  pageBtn.innerHTML = formattedCharactersArray[index].id;
  pageBtn.id = formattedCharactersArray[index].id;

  pageBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    cardWrapper.innerHTML = "";
    await fillCards(formattedCharactersArray[index].characters);
  });
});
