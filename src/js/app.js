import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login } from './services/auth.service';
import { notify } from './views/notification';
import { getNews } from './services/news.service';

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];

//* EVENTS

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmit();
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
    //show success notify
    notify({ msg: 'Успешный логин', className: 'alert-success' });
  } catch (err) {
    notify({ msg: 'Неудачная попытка входа', className: 'alert-danger' });
  }

  console.log(isValidForm);
}
