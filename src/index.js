import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
  catInfoEl: document.querySelector('.cat-info'),
};

refs.selectEl.addEventListener('change', onSelectChange);

// За замовченням невідображається елементи селекту та помилки
hideElement(refs.selectEl);
hideElement(refs.errorEl);

// Завантаження списку порід котів
fetchBreeds()
  .then(data => {
    hideElement(refs.loaderEl);
    hideElement(refs.errorEl);
    
    refs.selectEl.innerHTML = createCatListMarkup(data);
    showElement(refs.selectEl);
    
    new SlimSelect({
      select: refs.selectEl,
    });

  })
  .catch(error => {
    hideElement(refs.loaderEl);
    showElement(refs.errorEl);
  });

// Функція вибору кота
function onSelectChange(e) {
  // для проби
  Notiflix.Notify.info('Loading data, please wait...', {
    timeout: 1000,
  });

  showElement(refs.loaderEl);
  hideElement(refs.catInfoEl);

  fetchCatByBreed(e.currentTarget.value)
    .then(data => {
      hideElement(refs.loaderEl);
      hideElement(refs.errorEl);

      refs.catInfoEl.innerHTML = createCatSampleMarkup(data[0]);
      showElement(refs.catInfoEl);
    })
    .catch(error => {
      hideElement(refs.loaderEl);
      showElement(refs.errorEl);
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

function showElement(element) {
  element.classList.remove('is-hidden');
}

function hideElement(element) {
  element.classList.add('is-hidden');
}
