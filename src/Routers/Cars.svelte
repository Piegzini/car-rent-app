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

  const sortIndexes = ['mark', 'engine_capacity', 'engine_power', 'year'];
  const sort = (index) => {
    if (index === 'mark') {
      cars = cars.sort((a, b) => {
        console.log(a[index]);
        if (a[index] > b[index]) return 1;
        if (a[index] < b[index]) return -1;
        return 0;
      });
    } else cars = cars.sort((a, b) => a[index] - b[index]);
  };
</script>

<div class="w-full flex flex-wrap justify-around " data-theme="halloween">
  <div class="w-full flex flex-row mb-6 justify-center">
    {#each sortIndexes as index}
      <div class="form-control">
        <label class="cursor-pointer label">
          <span class="label-text mx-5">{index}</span>
          <input type="radio" name="opt" class="radio" on:change={() => sort(index)} />
        </label>
      </div>
    {/each}
  </div>

  {#each cars as car}
    <CarCard
      id={car.id}
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
