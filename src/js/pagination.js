import { getCharacters, cardWrapper, totalPages } from "./characters";
import { prevBtnTemplate, nextBtnTemplate } from "./buttonTemplates";

const paginationWrapper = document.querySelector("#paginationWrapper");
const ul = paginationWrapper.querySelector("ul");
let pageBtns;
let prevBtn;
let nextBtn;
let lastBtnsArray;

function createPaginationTemplate() {
  renderPagination(prevBtnTemplate);

  for (let i = 0; i < 10; i++) {
    let pageNumber = i + 1;
    const template = `<li>
    <a
      href="#"
      id="${pageNumber}"
      class="numeric-page flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
    >${pageNumber}</a>
  </li>`;
    renderPagination(template);
  }

  renderPagination(nextBtnTemplate);

  pageBtns = paginationWrapper.querySelectorAll("ul li a.numeric-page");
  prevBtn = paginationWrapper.querySelector("#previousBtn");
  nextBtn = paginationWrapper.querySelector("#nextBtn");
  lastBtnsArray = [prevBtn, nextBtn];

  btnsUpdateFunction();
}

// Pagination update for next pages
function incrementPagination(pagesArray) {
  pagesArray.shift();
  pagesArray.push(pagesArray[pagesArray.length - 1] + 1);

  pageBtns.forEach((btn, index) => {
    btn.innerHTML = pagesArray[index];
    btn.id = `${pagesArray[index]}`;
  });
}

// Pagination update for previous pages
function decrementPagination(pagesArray) {
  pagesArray.pop();
  pagesArray.unshift(pagesArray[0] - 1);

  pageBtns.forEach((btn, index) => {
    btn.innerHTML = pagesArray[index];
    btn.id = `${pagesArray[index]}`;
  });
}

//Update newly created buttons
function btnsUpdateFunction() {
  // First page must be selected by default onload
  pageBtns[0].classList.add("selected");

  // Attach event listeners to "Previous" and "Next" buttons
  lastBtnsArray.forEach((button) => {
    button.addEventListener("click", switchPage);
  });

  pageBtns.forEach((pageBtn) => pageBtn.addEventListener("click", switchPage));
}

function renderPagination(template) {
  ul.insertAdjacentHTML("beforeend", template);
}

async function switchPage(event) {
  event.preventDefault();

  let selectedElement = Array.from(pageBtns).find((pageBtn) =>
    pageBtn.classList.contains("selected"),
  );
  let selectedId = Number(selectedElement.id);

  // Check whether first/last page is now selected and which of next/prev button is clicked
  if (
    pageBtns[0].classList.contains("selected") &&
    event.target.closest("a").id === "previousBtn"
  )
    return;
  if (
    pageBtns[pageBtns.length - 1].classList.contains("selected") &&
    event.target.closest("a").id === "nextBtn"
  ) {
    return;
  }

  // Switch page functionality
  else {
    cardWrapper.innerHTML = "";
    pageBtns.forEach((pageBtn) => pageBtn.classList.remove("selected"));

    switch (event.target.closest("a").id) {
      case "previousBtn":
        selectedId = selectedId - 1;
        break;
      case "nextBtn":
        selectedId = selectedId + 1;
        break;
      default:
        selectedId = Number(event.target.closest("a").id);
    }

    await getCharacters(
      `https://rickandmortyapi.com/api/character?page=${selectedId}`,
    );

    // Update pagination
    let pagesArray = Array.from(pageBtns).map((btn) => Number(btn.id));

    if (
      selectedId === pagesArray[pagesArray.length - 1] &&
      pagesArray[pagesArray.length - 1] !== totalPages
    ) {
      incrementPagination(pagesArray);
    }
    if (selectedId === pagesArray[0] && pagesArray[0] !== 1) {
      decrementPagination(pagesArray);
    }

    selectedElement = Array.from(pageBtns).find(
      (pageBtn) => Number(pageBtn.id) === selectedId,
    );
    selectedElement.classList.add("selected");
  }
}

export { createPaginationTemplate };
