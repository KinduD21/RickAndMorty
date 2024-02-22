import {
  getCharacters,
  charactersArray,
  fillCards,
  cardWrapper,
} from "./characters";

const paginationWrapper = document.querySelector("#paginationWrapper");
const ul = paginationWrapper.querySelector("ul");
let pageBtns;
const prevBtn = paginationWrapper.querySelector("#previousBtn");
let nextBtn;
let lastBtnsArray;

function btnsUpdateFunction() {
  // First page must be selected by default onload
  pageBtns[0].classList.add("selected");

  // Attach event listeners to "Previous" and "Next" buttons
  lastBtnsArray.forEach((button) => {
    button.addEventListener("click", switchPage);
  });
}

function createPaginationTemplate(totalPages) {
  for (let i = 0; i < totalPages; i++) {
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
  const nextBtnTemplate = `<li>
  <a
    href="#"
    id="nextBtn"
    class="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
  >
    <span class="sr-only">Next</span>
    <svg
      class="h-2.5 w-2.5 rtl:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 9 4-4-4-4"
      />
    </svg>
  </a>
</li>`;
  renderPagination(nextBtnTemplate);

  pageBtns = paginationWrapper.querySelectorAll("ul li a.numeric-page");
  nextBtn = paginationWrapper.querySelector("#nextBtn");
  lastBtnsArray = [prevBtn, nextBtn];

  btnsUpdateFunction();
}

function renderPagination(template) {
  ul.insertAdjacentHTML("beforeend", template);
}

function switchPage(event) {
  event.preventDefault();

  let selectedElement = findSelectedElement(pageBtns);
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

    if (event.target.closest("a").id === "previousBtn") {
      selectedId = selectedId - 1;
    } else {
      selectedId = selectedId + 1;
    }

    selectedElement = findElementById(pageBtns, selectedId);
    selectedElement.classList.add("selected");

    getCharacters(
      `https://rickandmortyapi.com/api/character?page=${selectedId}`,
    );
  }
}

function findSelectedElement(elements) {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains("selected")) {
      return elements[i]; // Return the element with the "selected" class
    }
  }
}

function findElementById(elements, id) {
  for (let i = 0; i < elements.length; i++) {
    if (Number(elements[i].id) === id) {
      return elements[i]; // Return the element with the corresponding id
    }
  }
}

export { createPaginationTemplate };
