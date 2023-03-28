import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries';

const inputEl = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");


inputEl.addEventListener('input', debounce(searchСountry, DEBOUNCE_DELAY));

function searchСountry() {
    const inputValue = inputEl.value.trim();
    countryList.innerHTML = ''
        if(inputValue !== ""){
        fetchCountries(inputValue)
        .then(data => {
        if(data.length > 10){
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }else if(data.length === 0){
          Notiflix.Notify.failure('Oops, there is no country with that name'); 
        }else if(data.length < 10 && data.length >= 2){
          renderCountriesUl(data);
        }else if(data.length === 1){
          renderCountry(data);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      })
      }
    }
    
    function renderCountry(countries) {
      const markup = countries
      .map(country => {
            return `<li><img src="${country.flags.svg}" alt=${country.name.official} width="40" height="20">
            <h2> ${country.name.official}</h2>
            <p><b>Capital: </b>${country.capital}</p>
            <p><b>Population: </b>${country.population}</p>
            <p><b>Languages: </b>${Object.values(country.languages).join(", ")}</p></li>`
          })
          .join("");
          countryList.innerHTML = markup;
      }
      function renderCountriesUl(countries) {
        const markup = countries.map(country => {
            return  `<li><img src="${country.flags.svg}" alt=${country.name.official} width="40" height="20">
            <h2> ${country.name.official}</h2></li>`})
          .join("");
          countryList.innerHTML = markup; 
      }
      