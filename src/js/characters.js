const test = await fetch('https://rickandmortyapi.com/api/character');
const result = await test.json();
console.log(result);