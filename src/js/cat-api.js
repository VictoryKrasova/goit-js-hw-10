import showMsg from '../cmn/showMsg.js';
import hideMsg from '../cmn/hideMsg.js';
import { refs }  from '../cmn/refs.js'

const API_KEY = 'live_MfJNfatG8Kud5uZ7z4S6guToaPaSJwYB2XB70il98Bax59GNkPpqb251luAKkmTH';

export function fetchBreeds() {
    
    return fetch("https://api.thecatapi.com/v1/breeds")
        .then(response => {
            if (!response.ok) {
            throw new Error(response.status);
            }
           
            return response.json();
        })
        
    }

    export function fetchCatByBreed(breedId) {
        showMsg();
        return fetch(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${breedId}`).then(
            response => {
                
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                    if (data && data.length > 0) {
                        hideMsg();
                        return data[0];
                              }
                                 
            })
            .catch(error => {
                hideMsg();
                refs.errorMsg.classList.remove("visually-hidden");
                console.error('Error:', error.name, error.message);
            })
    }