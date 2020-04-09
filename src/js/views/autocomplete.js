import UI from '../config/ui.config';
import { locations } from '../store/locations';

const { inputCountry, countriesList } = UI;

export function filterAutocomplete(input, list, objData) {
  let countriesArr = [];
  let fragment = '';
  list.innerHTML = '';
  if (input.value) {
    countriesArr = Object.values(objData);
    const result = countriesArr.filter((country) => {
      if (country.toLowerCase().includes(input.value.toLowerCase())) {
        return true;
      }
    });
    if (result.length && result.length < 20) {
      result.forEach((country) => {
        fragment += `<li class="list-group-item list-group-item-info">${country}</li>`;
      });
      console.log('result: ', result);
      list.insertAdjacentHTML('afterbegin', fragment);
    }
  }
}
