<script>
  export let mark;
  export let model;
  export let year;
  export let engineCapacity;
  export let enginePower;
  export let fuelType;
</script>

<div class="w-1/3 m-10">
  <div class="card text-center shadow-2xl">
    <div class="card-body">
      <h2 class="card-title">{mark} {model}</h2>
      <p>
        Wynajmij już teraz {mark}
        {model} z roku {year} z silnikiem o pojemności {engineCapacity} litra / litry -
        {fuelType} - o mocy aż {enginePower} koni mechanicznych!!!!
      </p>
      <div class="justify-center card-actions">
        <button class="btn btn-outline btn-accent">Zarezerwuj!</button>
      </div>
    </div>
  </div>
</div>
