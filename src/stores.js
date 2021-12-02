import { writable } from 'svelte/store';
import axios from 'axios';

export const setLoginInfo = async () => {
  const response = await axios.get(`http://localhost/car_rent/isLogged.php`);
  isLogged.set(response.data)
}

export const isLogged = writable(false);


