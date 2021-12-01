<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import Navigation from '../Components/Navigation.svelte';
  import { push } from 'svelte-spa-router';
  let reservations;

  onMount(async () => {
    const response = await axios.get('http://localhost/car_rent/reservations.php');
    reservations = response.data;
  });
</script>

<Navigation />
<div class="overflow-x-auto mt-4 mx-6 ">
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
