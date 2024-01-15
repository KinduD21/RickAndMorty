import { allCharacters, fillCards, cardWrapper } from "./characters";

const paginationWrapper = document.querySelector("#paginationWrapper");
const pageBtns = paginationWrapper
  .querySelector("ul")
  .querySelectorAll("li a.numeric-page");
const prevBtn = paginationWrapper.querySelector("#previousBtn");
const nextBtn = paginationWrapper.querySelector("#nextBtn");

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
      selected: false,
      characters: chunk,
    };
    formattedArray.push(formattedObject);
  }

  return formattedArray;
};

const formattedCharactersArray = formatCharactersArray(allCharacters);
formattedCharactersArray[0].selected = true;

await fillCards(formattedCharactersArray[0].characters);

pageBtns[0].classList.add("selected");

pageBtns.forEach((pageBtn, index) => {
  // Set innerHTML and id property to corresponding one from array
  pageBtn.innerHTML = formattedCharactersArray[index].id;
  pageBtn.id = formattedCharactersArray[index].id;

  pageBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    cardWrapper.innerHTML = "";

    pageBtns.forEach((pageBtn) => pageBtn.classList.remove("selected"));
    formattedCharactersArray.forEach((obj) => (obj.selected = false));
    formattedCharactersArray[index].selected = true;
    console.log(formattedCharactersArray);

    pageBtn.classList.add("selected");
    await fillCards(formattedCharactersArray[index].characters);
  });
});

prevBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  if (formattedCharactersArray[0].selected === true) return;
  else {
    cardWrapper.innerHTML = "";

    let selectedId;
    pageBtns.forEach((pageBtn) => {
      if (pageBtn.classList.contains("selected")) {
        selectedId = pageBtn.id;
      }
    });

    formattedCharactersArray[selectedId - 1].selected = false;
    pageBtns.forEach((pageBtn) => pageBtn.classList.remove("selected"));
    console.log(
      pageBtns.forEach((pageBtn) =>
        pageBtn.querySelector(`#${formattedCharactersArray[selectedId - 2].id}`)
      )
    );
    await fillCards(formattedCharactersArray[selectedId - 2].characters);
    console.log(formattedCharactersArray[selectedId - 2]);
  }
});
