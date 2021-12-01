<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  import Navigation from '../Components/Navigation.svelte';
  import Footer from '../Components/Footer.svelte';
  import CarCard from '../Components/CarCard.svelte';
  let cars = [];

  onMount(async () => {
    const response = await axios.get(`http://localhost/car_rent/cars.php`);
    cars = response.data;
    console.log(cars);
  });
</script>

<Navigation />
<div class="w-full flex flex-wrap justify-around " data-theme="halloween">
  {#each cars as car}
    <CarCard
      mark={car.mark}
      model={car.model}
      year={car.year}
      enginePower={car.engine_power}
      fuelType={car.fuel_type}
      engineCapacity={car.engine_capacity}
    />
  {:else}
    <div class="w-full h-full"><button class="btn btn-lg btn-circle loading" /></div>
  {/each}
</div>

<Footer />
