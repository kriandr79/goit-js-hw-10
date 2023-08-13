import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  catInfoEl: document.querySelector('.cat-info'),
};

refs.selectEl.addEventListener('change', onSelectChange);

// Невідображається елементи селекту та помилки
toggleClass(refs.selectEl);
toggleClass(refs.errorEl);

// Завантаження списку порід котів
fetchBreeds()
  .then(data => {
    refs.selectEl.innerHTML = createCatListMarkup(data);
    toggleClass(refs.selectEl);
    toggleClass(refs.loaderEl);
  })
  .catch(error => {
    toggleClass(refs.loaderEl);
    toggleClass(refs.errorEl);
  });

// Функція вибору кота 
function onSelectChange(e) {
  // для проби
  Notiflix.Notify.info('Loading data, please wait...', {
    timeout: 1000,
  });

  toggleClass(refs.loaderEl);
  toggleClass(refs.catInfoEl);

  fetchCatByBreed(e.currentTarget.value)
    .then(data => {
      refs.catInfoEl.innerHTML = createCatSampleMarkup(data[0]);
      toggleClass(refs.catInfoEl);
      toggleClass(refs.loaderEl);
    })
    .catch(error => {
      toggleClass(refs.loaderEl);
      toggleClass(refs.errorEl);
    });
}

function createCatListMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function createCatSampleMarkup(arr) {
  const { breeds, url } = arr;
  return `<img src="${url}" width="400" alt="${breeds[0].name}"/><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b><p>${breeds[0].temperament}</p>`;
}

function toggleClass(element) {
  element.classList.toggle('is-hidden');
}
