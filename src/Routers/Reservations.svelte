<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  export let params = {};
  import { push } from 'svelte-spa-router';
  let reservations;

  onMount(async () => {
    let response;
    if (params?.id) {
      response = await axios.get('http://localhost/car_rent/reservations.php', {
        params: {
          user: params.id,
        },
      });
    } else {
      response = await axios.get('http://localhost/car_rent/reservations.php');
    }
    reservations = response.data;
    sort('id');
  });

  const sortIndexes = ['username', 'id', 'carId', 'status'];

  const sort = (index) => {
    if (index === 'username' || index === 'status') {
      reservations = reservations.sort((a, b) => {
        console.log(a[index]);
        if (a[index] > b[index]) return 1;
        if (a[index] < b[index]) return -1;
        return 0;
      });
    } else reservations = reservations.sort((a, b) => a[index] - b[index]);
  };
</script>

<div class="overflow-x-auto mt-4 mx-6 ">
  <div class="w-full flex flex-row mb-6">
    {#each sortIndexes as index}
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text mx-5">{index}</span>
          <input type="radio" name="opt" class="radio" on:change={() => sort(index)} />
        </label>
      </div>
    {/each}
  </div>

  <table class="table w-full table-compact">
    <thead>
      <tr>
        <th>id</th>
        <th>Username</th>
        <th>Car id</th>
        <th>Car mark</th>
        <th>Car model</th>
        <th>Reservation start date</th>
        <th>Reservation end date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {#if reservations}
        {#each reservations as reservation}
          <tr on:dblclick={() => push(`/reservations/${reservation.id}`)}>
            <th>{reservation.id}</th>
            <td>{reservation.username}</td>
            <td>{reservation.carId}</td>
            <td>{reservation.carMark}</td>
            <td>{reservation.carModel}</td>
            <td>{reservation.startDate}</td>
            <td>{reservation.endDate}</td>
            <td>{reservation.status}</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
