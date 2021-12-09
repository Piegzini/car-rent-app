<script>
  import axios from 'axios';
  import { push } from 'svelte-spa-router';

  export let params = {};
  let reservation = null;
  import { isLogged } from '../stores.js';
  import QR from '../Components/QR.svelte';
  let data;
  isLogged.subscribe((value) => {
    data = value;
  });

  const statuses = { oczekujące: 1, zaakceptowane: 2, odrzucone: 3, zakończone: 4 };
  const getReservation = async () => {
    const response = await axios.get('http://localhost/car_rent/reservations.php', {
      params: {
        id: params.id,
      },
    });
    const { data } = response;
    reservation = data;
    return data;
  };

  const changeReservation = async () => {
    const { id, userId, carId, startDate, endDate, status } = reservation;
    const response = await axios.put('http://localhost/car_rent/reservations.php', {
      id,
      userId,
      carId,
      startDate,
      endDate,
      status: statuses[status],
    });
    if (response.status === 200) {
      push('/');
    }
  };
</script>

{#await getReservation() then res}
  <div class="w-full flex justify-center mt-20">
    <div class="w-1/2 bordered">
      <div class="card ">
        <div class="card-body flex flex-col items-center">
          <h2 class="card-title">Rezerwacja nr. {reservation.id}</h2>
          <p>ID: {reservation.id}</p>
          <p>Car: {reservation.carId} - {reservation.carMark} - {reservation.carModel}</p>
          <p>Starts date: {reservation.startDate}</p>
          <p>Ends: {reservation.endDate}</p>
          <p>Status: {reservation.status}</p>
          {#if reservation.status === 'zaakceptowane'}
            <QR codeValue="12354234562345" squareSize="200" />
            <button
              on:click={() => {
                reservation.status = 'zakończone';
                changeReservation;
              }}
              class="btn btn-sm">Oddaj</button
            >
          {/if}

          <form class="mt-10 flex flex-col justify-center items-center ">
            <h3 class="form-title">Zmień rzeczy w rezerwacji</h3>
            {#if data?.user?.role === 'admin' || data?.user?.role === 'administrator'}
              <div class="w-full flex justify-center">
                <select
                  bind:value={reservation.status}
                  class="select select-bordered select-primary w-full max-w-xs mt-8"
                >
                  <option disabled="disabled" selected="selected">Nowy status</option>
                  <option value="oczekujące">Oczekujące</option>
                  <option value="zaakceptowane">Zaakceptowane</option>
                  <option value="odrzucone">Odrzucone</option>
                  <option value="zakończone">Zakończone</option>
                </select>
              </div>
            {/if}
            <div class="w-full flex justify-center flex-col">
              <label class="label my-2">
                <span class="label-text">Data rozpoczęcia rezerwacji</span>
              </label>
              <input
                required
                type="date"
                name=""
                class="my-4 w-full bg-base-100"
                bind:value={reservation.startDate}
              />
              <label class="label my-2">
                <span class="label-text">Data zakończenia rezerwacji</span>
              </label>
              <input
                required
                type="date"
                name=""
                class="my-4 w-full bg-base-100"
                bind:value={reservation.endDate}
              />
            </div>
            <div class="w-4/5 mt-8 flex justify-center">
              <button on:click={changeReservation} class="btn btn-outline btn-primary"
                >Wyślij zmianę</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
{/await}
