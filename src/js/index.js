import hideMsg from '../cmn/hideMsg.js'
import { refs }  from '../cmn/refs'
import { fetchBreeds, fetchCatByBreed } from '../js/cat-api.js';

// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// export const refs = {
//     selector: document.querySelector('.breed-select'),
//     loadingMsg: document.querySelector('.loader'),
//     errorMsg: document.querySelector('.error'),
//     infoArea: document.querySelector('.cat-info')
// }

// export default function showMsg() {
//     refs.loadingMsg.classList.remove('visually-hidden');
// }

// export default function hideMsg() {
//     refs.loadingMsg.classList.add('visually-hidden');
// }


hideMsg();
refs.selector.classList.add('visually-hidden');
refs.errorMsg.classList.add("visually-hidden");

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
            if (breedData) {
                console.log(breedData);
            let breedImg = document.createElement('img');
                    breedImg.src = breedData.url;
                    breedImg.style.maxWidth = "300px"
            let breedName = document.createElement('h3');
                    breedName.textContent = breedData.breeds[0].name;
            let breedDescr = document.createElement('p');
                    breedDescr.textContent = breedData.breeds[0].description;
            let breedTemper = document.createElement('p');
                    breedTemper.innerHTML = '<b>Temperament: </b>' + breedData.breeds[0].temperament;
            refs.infoArea.innerHTML = '';
                    refs.infoArea.append(breedImg, breedName, breedDescr, breedTemper);
             }
        })
    
});