const UI = {
  form: document.forms['loginForm'],
  inputEmail: document.getElementById('email'),
  inputPassword: document.getElementById('password'),
  tabs: document.querySelectorAll('.nav-link'),
  tabsContent: document.querySelectorAll('.tab-pane'),
  formRegistration: document.forms['registrationForm'],
  inputCountry: document.querySelector('#country'),
  countriesList: document.querySelector('#countries-list'),
  inputCity: document.querySelector('#city'),
  citiesList: document.querySelector('#cities-list'),
  inputEmailRegister: document.querySelector('#email_reg'),
  inputPasswordRegister: document.querySelector('#password_reg'),
  inputNickname: document.querySelector('#nickname'),
  inputName: document.querySelector('#first_name'),
  inputLastName: document.querySelector('#last_name'),
  inputPhone: document.querySelector('#phone'),
  inputGender: document.querySelector('#gender_orientation'),
  inputDayBirth: document.querySelector('#date_of_birth_day'),
  inputMonthBirth: document.querySelector('#date_of_birth_month'),
  inputYearBirth: document.querySelector('#date_of_birth_year'),
};

export default UI;
