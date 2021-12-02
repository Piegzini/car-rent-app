<script>
  import axios from 'axios';
  import { push } from 'svelte-spa-router';

  export let params = {};
  let reservation = null;
  let status;
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
    const { id, userId, carId, startDate, endDate } = reservation;
    const response = await axios.put('http://localhost/car_rent/reservations.php', {
      id,
      userId,
      carId,
      startDate,
      endDate,
      status,
    });
    if (response.status === 200) {
      push('/reservations');
    }
  };
</script>


{#await getReservation() then reservation}
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

          <form class="mt-10 flex flex-col justify-center items-center ">
            <h3 class="form-title">Zmień status rezerwacji</h3>
            <div class="w-full flex justify-center">
              <select
                bind:value={status}
                class="select select-bordered select-primary w-full max-w-xs mt-8"
              >
                <option disabled="disabled" selected="selected">Nowy status</option>
                <option value="1">Oczekujące</option>
                <option value="2">Zaakceptowane</option>
                <option value="3">Odrzucone</option>
                <option value="4">Zakończone</option>
              </select>
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
