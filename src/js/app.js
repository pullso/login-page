import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login } from './services/auth.service';
import { locations, getCountryCode, getCities } from './store/locations';
import { notify } from './views/notification';
import { getNews } from './services/news.service';
import { showTab } from './views/tabs';
import { filterAutocomplete } from './views/autocomplete';

const {
  form,
  inputEmail,
  inputPassword,
  tabs,
  inputCountry,
  countriesList,
} = UI;
const inputs = [inputEmail, inputPassword];

//* Init
console.log(locations);
//* EVENTS

tabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    showTab(e);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmit();
});

inputCountry.addEventListener('input', (e) => {
  e.preventDefault();
  filterAutocomplete(inputCountry, countriesList, locations.countries);
});

countriesList.addEventListener('click', (e) => {
  inputCountry.value = e.target.textContent;
  countriesList.innerHTML = '';
  getCountryCode(locations, inputCountry.value);
  getCities(locations, locations.code);
  console.log(locations);
});

inputs.forEach((input) => {
  input.addEventListener('focus', () => {
    removeInputError(input);
  });
});

//* HANDLERS
async function onSubmit() {
  inputs.forEach((item) => {
    removeInputError(item);
  });

  const isValidForm = inputs.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;
  try {
    await login(inputEmail.value, inputPassword.value);
    await getNews();
    form.reset();
    notify({ msg: 'Успешный логин', className: 'alert-success' });
  } catch (err) {
    notify({ msg: 'Неудачная попытка входа', className: 'alert-danger' });
  }
}
