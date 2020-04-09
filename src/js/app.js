import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login, register } from './services/auth.service';
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
  citiesList,
  inputCity,
  inputEmailRegister,
  inputPasswordRegister,
  formRegistration,
  inputName,
  inputNickname,
  inputLastName,
  inputPhone,
  inputGender,
  inputDayBirth,
  inputMonthBirth,
  inputYearBirth,
} = UI;
const inputs = [inputEmail, inputPassword];
const inputsRegister = [
  inputEmailRegister,
  inputPasswordRegister,
  inputPhone,
  inputDayBirth,
  inputMonthBirth,
  inputYearBirth,
];
console.log('inputsRegister: ', UI);

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

inputCity.addEventListener('input', (e) => {
  e.preventDefault();
  filterAutocomplete(inputCity, citiesList, locations.cities);
});

citiesList.addEventListener('click', (e) => {
  inputCity.value = e.target.textContent;
  citiesList.innerHTML = '';
});

inputGender.addEventListener('click', (e) => {
  console.log(e.target);
});

inputs.forEach((input) => {
  input.addEventListener('focus', () => {
    removeInputError(input);
  });
});

formRegistration.addEventListener('submit', (e) => {
  e.preventDefault();
  onRegSubmit();
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

async function onRegSubmit() {
  let objReg = [];
  inputsRegister.forEach((item) => {
    removeInputError(item);
  });

  const isValidForm = inputsRegister.every((el) => {
    const isValidInput = validate(el);
    if (!isValidInput) {
      showInputError(el);
    }
    return isValidInput;
  });

  if (!isValidForm) return;

  objReg.email = inputEmailRegister.value;
  objReg.password = inputPasswordRegister.value;
  objReg.nickname = inputNickname.value;
  objReg.first_name = inputName.value;
  objReg.last_name = inputLastName.value;
  objReg.phone = inputPhone.value;
  objReg.gender_orientation = inputGender.value;
  objReg.city = inputCity.value;
  objReg.country = inputCountry.value;
  objReg.date_of_birth_day = inputDayBirth.value;
  objReg.date_of_birth_month = inputMonthBirth.value;
  objReg.date_of_birth_year = inputYearBirth.value;

  let regData = Object.values(objReg);
  let isValidData = true;

  regData.forEach((data) => {
    if (data === '') isValidData = false;
  });
  console.log('isValidData: ', isValidData);
  if (!isValidData) return;

  try {
    await register(objReg);
  } catch (err) {
    notify({ msg: 'Неудачная попытка регистрации', className: 'alert-danger' });
  }
  //body
}
