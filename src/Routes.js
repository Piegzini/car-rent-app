import MainPage from './Routers/Main.svelte';
import NotFound from './Routers/NotFound.svelte';
import axios from 'axios';
import { wrap } from 'svelte-spa-router/wrap';

const getLoginInformations = async () => {
  const response = await axios.get(`http://localhost/car_rent/isLogged.php`);
  const { data } = response;
  return data
}
const isAdmin = ({role}) => role === 'admin'
const isModerator = ({role}) => role === 'moderator'

const routes = {
  '/': MainPage,
  '/cars': wrap({ asyncComponent: () => import('./Routers/Cars.svelte') }),
  '/cars/:id': wrap({ asyncComponent: () => import('./Routers/Car.svelte') }),
  '/register': wrap({ asyncComponent: () => import('./Routers/Register.svelte') }),
  '/login': wrap({ asyncComponent: () => import('./Routers/Login.svelte') }),
  '/users/:id': wrap({
    asyncComponent: () => import('./Routers/User.svelte'),
    conditions: [
      async () => {
        const data = await getLoginInformations()
        return data?.user ? isAdmin(data.user) : false
      },
    ],
  }),
  '/users': wrap({
    asyncComponent: () => import('./Routers/Users.svelte'),
    conditions: [
      async () => {
        const data = await getLoginInformations()
        return data?.user ? isAdmin(data.user) : false
      },
    ],
  }),
  '/reservations/:id': wrap({
    asyncComponent: () => import('./Routers/Reservation.svelte'),
    conditions: [
      async () => {
        const data = await getLoginInformations()
        return data?.user ? isAdmin(data.user) || isModerator(data.user) : false
      },
    ],
  }),
  '/reservations': wrap({
    asyncComponent: () => import('./Routers/Reservations.svelte'),
    conditions: [
      async () => {
        const data = await getLoginInformations()
        return data?.user ? isAdmin(data.user) || isModerator(data.user) : false
      },
    ],
  }),
  '*': NotFound,
};

export { routes };
