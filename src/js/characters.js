const test = await fetch('https://rickandmortyapi.com/api/character');
const response = await test.json();
console.log(response.results);

const characterCards = document.querySelectorAll("#characterCard");
console.log(characterCards);

