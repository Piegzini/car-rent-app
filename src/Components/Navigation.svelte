<script>
  import { link, push } from 'svelte-spa-router';
  import axios from 'axios';

  const getLoginInformations = async () => {
    const response = await axios.get(`http://localhost/car_rent/isLogged.php`);
    return response.data;
  };

  const logOut = async () => {
    const response = await axios.get('http://localhost/car_rent/logOut.php');
    const { result } = response.data;
    if (result !== 'success') return;
    push('/');
  };
</script>

<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content" data-theme="halloween">
  <div class="px-2 mx-2 navbar-start">
    <span class="text-lg font-bold"> Rent car </span>
  </div>
  <div class="hidden px-2 mx-2 navbar-center lg:flex">
    <div class="flex items-stretch">
      <a class="btn btn-ghost btn-sm rounded-btn" use:link href="/"> Home </a>
      <a class="btn btn-ghost btn-sm rounded-btn" use:link href="/cars"> Samochody </a>
      {#await getLoginInformations() then data}
        {#if data.logged}
          {#if data.user.role === 'admin'}
            <a class="btn btn-ghost btn-sm rounded-btn" use:link href="/reservations">
              Reservations
            </a>
            <a class="btn btn-ghost btn-sm rounded-btn" use:link href="/users"> Users </a>
          {:else if data.user.role === 'moderator'}
            <a class="btn btn-ghost btn-sm rounded-btn" use:link href="/reservations">
              Reservations
            </a>
          {/if}
          <a class="btn btn-ghost btn-sm rounded-btn text-error" on:click={logOut}> Wyloguj </a>
        {:else}
          <a class="btn btn-ghost btn-sm rounded-btn text-primary" use:link href="/login">
            Zaloguj
          </a>
          <a class="btn btn-ghost btn-sm rounded-btn text-accent" use:link href="/register">
            Zarejestruj się
          </a>
        {/if}
      {/await}
    </div>
  </div>
</div>
