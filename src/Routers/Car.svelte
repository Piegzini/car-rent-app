<script>
  import axios from 'axios';
  import { push } from 'svelte-spa-router';

  export let params = {};
  let car = null;
  let status;
  const getcar = async () => {
    const response = await axios.get('http://localhost/car_rent/car.php', {
      params: {
        id: params.id,
      },
    });
    const { data } = response;
    car = data;
    return data;
  };

  const changecar = async () => {
    const { id } = car;
    const response = await axios.put('http://localhost/car_rent/cars.php', {
      id,
    });
    if (response.status === 200) {
      push('/cars');
    }
  };
</script>


{#await getcar() then car}
  <div class="w-full flex justify-center mt-20">
    <div class="w-1/2 bordered">
      <div class="card ">
        <div class="card-body flex flex-col items-center">
          <h2 class="card-title">Rezerwacja nr. {car.id}</h2>
          <p>ID: {car.id}</p>
          <p>Car: {car.carId} - {car.carMark} - {car.carModel}</p>
          <p>Starts date: {car.startDate}</p>
          <p>Ends: {car.endDate}</p>
          <p>Status: {car.status}</p>

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
              <button on:click={changecar} class="btn btn-outline btn-primary"
              >Wyślij zmianę</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
{/await}
