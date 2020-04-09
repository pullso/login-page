import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];

//* EVENTS

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmit();
});
inputs.forEach((input) => {
  input.addEventListener('focus', () => {
    console.log(input);
    removeInputError(input);
  });
});

//* HANDLERS
function onSubmit() {
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

  console.log(isValidForm);
}
