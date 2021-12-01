<script>
  import axios from 'axios';
  import Navigation from '../Components/Navigation.svelte';
  import { push } from 'svelte-spa-router';

  export let params = {};
  let user = null;
  let role;
  const getUser = async () => {
    const response = await axios.get('http://localhost/car_rent/users.php', {
      params: {
        id: params.id,
      },
    });
    const { data } = response;
    user = data;
    return data;
  };

  const changeUser = async () => {
    const { username, password, email, id } = user;
    const response = await axios.put('http://localhost/car_rent/users.php', {
      username,
      password,
      email,
      id,
      role,
    });
    if (response.status === 200) {
      push('/users');
    }
  };
</script>

<Navigation />

{#await getUser() then user}
  <div class="w-full flex justify-center mt-20">
    <div class="w-1/2 bordered">
      <div class="card ">
        <div class="card-body flex flex-col items-center">
          <h2 class="card-title">Użytkownik {user.username}</h2>
          <p>ID: {user.id}</p>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <form class="mt-10 flex flex-col justify-center items-center ">
            <h3 class="form-title">Zmień role użytkownika</h3>
            <div class="w-full flex justify-center">
              <select
                bind:value={role}
                class="select select-bordered select-primary w-full max-w-xs mt-8"
              >
                <option disabled="disabled" selected="selected">Nowa rola</option>
                <option value="1">admin</option>
                <option value="2">moderator</option>
                <option value="3">user</option>
              </select>
            </div>
            <div class="w-4/5 mt-8 flex justify-center">
              <button on:click={changeUser} class="btn btn-outline btn-primary"
                >Wyślij zmianę</button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
{/await}
