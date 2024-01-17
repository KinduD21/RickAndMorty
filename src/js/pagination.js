import { formattedCharactersArray, fillCards, cardWrapper } from "./characters";

const paginationWrapper = document.querySelector("#paginationWrapper");
const pageBtns = paginationWrapper
  .querySelector("ul")
  .querySelectorAll("li a.numeric-page");
const prevBtn = paginationWrapper.querySelector("#previousBtn");
const nextBtn = paginationWrapper.querySelector("#nextBtn");
const lastBtnsArray = [prevBtn, nextBtn];

// Attach event listeners to "Previous" and "Next" buttons
lastBtnsArray.forEach((button) => {
  button.addEventListener("click", switchPage);
});

// First page must be selected by default onload
pageBtns[0].classList.add("selected");

pageBtns.forEach((pageBtn, index) => {
  // Set innerHTML and id property to corresponding one from array
  pageBtn.innerHTML = formattedCharactersArray[index].id;
  pageBtn.id = formattedCharactersArray[index].id;

  pageBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    cardWrapper.innerHTML = "";

    formattedCharactersArray.forEach((obj) => (obj.selected = false));
    pageBtns.forEach((pageBtn) => pageBtn.classList.remove("selected"));

    formattedCharactersArray[index].selected = true;
    pageBtn.classList.add("selected");

    await fillCards(formattedCharactersArray[index].characters);
  });
});

async function switchPage(event) {
  event.preventDefault();

  // Check whether now first/last page is selected and which of next/prev button is clicked
  if (
    formattedCharactersArray[0].selected === true &&
    event.target.closest("a").id === "previousBtn"
  )
    return;
  if (
    formattedCharactersArray[formattedCharactersArray.length - 1].selected ===
      true &&
    event.target.closest("a").id === "nextBtn"
  ) {
    return;
  }

  // Switch page functionality
  else {
    cardWrapper.innerHTML = "";

    let selectedId;
    pageBtns.forEach((pageBtn) => {
      if (pageBtn.classList.contains("selected")) {
        selectedId = Number(pageBtn.id);
      }
    });

    formattedCharactersArray[selectedId - 1].selected = false;
    pageBtns.forEach((pageBtn) => pageBtn.classList.remove("selected"));

    if (event.target.id === "previousBtn") {
      selectedId = selectedId - 1;
    } else {
      selectedId = selectedId + 1;
    }

    formattedCharactersArray[selectedId - 1].selected = true;
    const selectedCard = Array.from(pageBtns).find(
      (pageBtn) => Number(pageBtn.id) === selectedId
    );
    selectedCard.classList.add("selected");

    await fillCards(formattedCharactersArray[selectedId - 1].characters);
  }
}
