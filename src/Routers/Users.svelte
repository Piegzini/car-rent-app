<script>
  import axios from 'axios';
  import Navigation from '../Components/Navigation.svelte';
  import { push } from 'svelte-spa-router';

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost/car_rent/users.php`);
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
  };
</script>

{#await getUsers()}
  <p>loading</p>
{:then users}
  <div class="overflow-x-auto mt-12 w-5/6 mx-auto">
    <table class="table w-full table-zebra">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Show user</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user}
          <tr>
            <td> {user.id} </td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td
              ><button
                class="btn  btn-outline btn-accent btn-sm"
                on:click={() => push(`/users/${user.id}`)}>Sprawdź</button
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
