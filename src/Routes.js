import MainPage from './Routers/Main.svelte';
import Cars from './Routers/Cars.svelte';
import Register from './Routers/Register.svelte';
import NotFound from './Routers/NotFound.svelte';
import Login from './Routers/Login.svelte';
import Users from './Routers/Users.svelte';
import axios from 'axios';
import Reservations from './Routers/Reservations.svelte';
import { wrap } from 'svelte-spa-router/wrap';
import User from './Routers/User.svelte';
import Reservation from './Routers/Reservation.svelte';

const routes = {
  '/': MainPage,
  '/cars': Cars,
  '/register': Register,
  '/login': Login,
  '/users/:id': wrap({
    component: User,
    conditions: [
      async (detail) => {
        // Make a network request, which are async operations
        const response = await axios.get(`http://localhost/car_rent/isLogged.php`);
        const { data } = response;
        if (data.user) {
          return data.user.role === 'admin';
        }
        return false;
      },
    ],
  }),
  '/users': wrap({
    component: Users,
    conditions: [
      async (detail) => {
        // Make a network request, which are async operations
        const response = await axios.get(`http://localhost/car_rent/isLogged.php`);
        const { data } = response;
        if (data.user) {
          return data.user.role === 'admin';
        }
        return false;
      },
    ],
  }),
  '/reservations/:id': wrap({
    component: Reservation,
    conditions: [
      async (detail) => {
        // Make a network request, which are async operations
        const response = await axios.get(`http://localhost/car_rent/isLogged.php`);
        const { data } = response;
        if (data.user) {
          return data.user.role === 'admin' || data.user.role === 'moderator';
        }
        return false;
      },
    ],
  }),
  '/reservations': wrap({
    component: Reservations,
    conditions: [
      async (detail) => {
        // Make a network request, which are async operations
        const response = await axios.get(`http://localhost/car_rent/isLogged.php`);
        const { data } = response;
        if (data.user) {
          return data.user.role === 'admin' || data.user.role === 'moderator';
        }
        return false;
      },
    ],
  }),
  '*': NotFound,
};

export { routes };
