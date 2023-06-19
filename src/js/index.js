import hideMsg from '../cmn/hideMsg.js';
import { refs } from '../cmn/refs';
import { fetchBreeds, fetchCatByBreed } from '../js/cat-api.js';
import showMsg from '../cmn/showMsg';

refs.selector.classList.add('visually-hidden');
refs.errorMsg.classList.add('visually-hidden');
hideMsg();

fetchBreeds()
  .then(data => {
    hideMsg();
    refs.selector.classList.remove('visually-hidden');
    refs.errorMsg.classList.add('visually-hidden');

    data.forEach(breed => {
      const catBreed = document.createElement('option');
      catBreed.value = breed.id;
      catBreed.textContent = breed.name;
      refs.selector.appendChild(catBreed);

    });
  })
    .catch(error => {
        hideMsg();
        refs.errorMsg.classList.remove("visually-hidden");
        console.error('Error:', error.name, error.message);
    });

  refs.selector.addEventListener('change', () => {
  const breedId = refs.selector.value;
  fetchCatByBreed(breedId)
    .then(breedData => {
      if(!breedData) {
        refs.infoArea.innerHTML = '';
        refs.loadingMsg.classList.add('visually-hidden');
        refs.errorMsg.classList.remove('visually-hidden');
        return;
      }
      if (breedData) {
        let breedImg = document.createElement('img');
        breedImg.src = breedData.url;
        breedImg.style.maxWidth = '300px';
        let breedName = document.createElement('h3');
        breedName.textContent = breedData.breeds[0].name;
        let breedDescr = document.createElement('p');
        breedDescr.textContent = breedData.breeds[0].description;
        let breedTemper = document.createElement('p');
        breedTemper.innerHTML = '<b>Temperament: </b>' + breedData.breeds[0].temperament;
        refs.infoArea.innerHTML = '';
        refs.infoArea.append(breedImg, breedName, breedDescr, breedTemper);
      }
    }).catch(error => {
    console.log(error);
  });

});