<script>
  import axios from 'axios';
  import { push } from 'svelte-spa-router';
  import { isLogged } from '../stores.js';
  import ErrorAlert from '../Components/ErrorAlert.svelte';

  export let params = {};
  let loginInfo;
  let car = null;
  let startDate;
  let endDate;
  let reservationSent = 'not';

  isLogged.subscribe((value) => {
    loginInfo = value;
  });

  const getCar = async () => {
    const response = await axios.get('http://localhost/car_rent/cars.php', {
      params: {
        id: params.id,
      },
    });
    const { data } = response;
    car = data;
    return data;
  };

  const sendReservation = async () => {
    if (loginInfo.logged) {
      const { id } = loginInfo.user;
      const response = await axios.post('http://localhost/car_rent/reservations.php', {
        user: id,
        car: car.id,
        startDate,
        endDate,
      });
      if (response.status === 200) {
        await push('/');
      }
    } else if (!loginInfo.logged) {
      reservationSent = 'notLogged';
      setTimeout(() => (reservationSent = 'not'), 1000);
    }
  };
</script>

{#if reservationSent === 'not'}
  {#await getCar() then car}
    <div class="w-full flex justify-center mt-10">
      <div class="w-1/2 bordered">
        <div class="card ">
          <div class="card-body flex flex-col items-center">
            <h2 class="card-title">Zarezerwuj samochód</h2>
            <p>Samochód: {car.mark} - {car.model} - rok {car.year}</p>
            <p>
              Dodatkowe informacje: Power {car.enginePower} - Pojemność {car.engineCapacity} - Rodzaj
              paliwa:
              {car.fuelType}
            </p>
            <form
              on:submit|preventDefault={sendReservation}
              class="mt-10 w-2/5 flex flex-col justify-center items-center "
            >
              <h3 class="form-title">Zarezerwuj!!!</h3>
              <div class="w-full flex justify-center flex-col">
                <label class="label my-2">
                  <span class="label-text">Data rozpoczęcia rezerwacji</span>
                </label>
                <input
                  required
                  type="date"
                  name=""
                  class="my-4 w-full bg-base-100"
                  bind:value={startDate}
                />
                <label class="label my-2">
                  <span class="label-text">Data zakończenia rezerwacji</span>
                </label>
                <input
                  required
                  type="date"
                  name=""
                  class="my-4 w-full bg-base-100"
                  bind:value={endDate}
                />
              </div>
              <div class="w-4/5 mt-8 flex justify-center">
                <button type="submit" class="btn btn-outline btn-primary">
                  Wyślij rezerwacje
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  {/await}
{:else if reservationSent === 'notLogged'}
  <ErrorAlert text="Musisz się zalogować" />
{/if}
