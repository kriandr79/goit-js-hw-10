import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('loader'),
  errorEl: document.querySelector('error'),
  catInfoEl: document.querySelector('cat-info'),
};

// console.log(refs.selectEl);

refs.selectEl.addEventListener('change', onSelectChange);

fetchBreeds()
  .then(data => {
    refs.selectEl.innerHTML = createCatListMarkup(data);
  })
  .catch(error => {
    console.error(error);
  });


function onSelectChange(e) {
  //   console.log(e.currentTarget.value);
  fetchCatByBreed(e.currentTarget.value)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}

function createCatListMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function createCatSampleMarkup(arr) {
    return arr
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
}