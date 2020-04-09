import axios from '../plugins/axios';
import { notify } from '../views/notification';

/**
 * func login. Make login request to API
 * @param {String} email
 * @param {String} password
 */

export async function login(email, password) {
  try {
    const response = await axios.post(
      `/auth/login`,
      JSON.stringify({ email, password })
    );

    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function register(obj) {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
      nickname,
      phone,
      gender_orientation,
      city,
      country,
      date_of_birth_day,
      date_of_birth_month,
      date_of_birth_year,
    } = obj;
    const response = await axios.post(
      `/auth/signup`,
      JSON.stringify({
        email,
        password,
        nickname,
        first_name,
        last_name,
        phone,
        gender_orientation,
        city,
        country,
        date_of_birth_day,
        date_of_birth_month,
        date_of_birth_year,
      })
    );

    console.log(response.message);
    if (
      response.message ===
      'User created success. On your email sended link. Please verify your email.'
    ) {
      notify({ msg: 'Успешная регистрация', className: 'alert-success' });
    } else {
      notify({ msg: `${response.message}`, className: 'alert-danger' });
    }

    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}
