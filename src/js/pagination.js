import { allCharacters } from "./characters";

const paginationWrapper = document.querySelector("#paginationWrapper");
const pageBtns = paginationWrapper.querySelector("ul").querySelectorAll("li a.numeric-page");
console.log(pageBtns);

const formatCharactersArray = (characters) => {
  const formattedArray = [];

  for (let i = 0; i < 30; i += 6) {
    const chunk = characters.slice(i, i + 6);
    const formattedObject = {
      id: formattedArray.length + 1,
      characters: chunk,
    };
    formattedArray.push(formattedObject);
  }

  return formattedArray;
};

const formattedCharactersArray = formatCharactersArray(allCharacters);

console.log(formattedCharactersArray);

pageBtns.forEach((pageBtn, index) => {
  // Set innerHTML and id property to corresponding one from array
  pageBtn.innerHTML = formattedCharactersArray[index].id;
  pageBtn.id = formattedCharactersArray[index].id;

  pageBtn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Clicked on page", formattedCharactersArray[index].id);
  });
});
