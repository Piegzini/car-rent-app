<script>
  import Navigation from '../Components/Navigation.svelte';
  import Footer from '../Components/Footer.svelte';
  import axios from 'axios';
  import FromUser from '../Components/FromUser.svelte';
  import SuccessAlert from '../Components/SuccessAlert.svelte';
  import ErrorAlert from '../Components/ErrorAlert.svelte';
  import { push } from 'svelte-spa-router';

  let loginStatus = 'pending';

  const sendData = async (username, password) => {
    const response = await axios.post('http://localhost/car_rent/login.php', {
      username,
      password,
    });
    const { result } = response.data;
    loginStatus = result;

    setTimeout(() => {
      if (loginStatus === 'success') {
        push('/');
        console.log('push');
      } else if (loginStatus === 'denied') {
        push('/login');
      }
    }, 1000);
  };
</script>

<Navigation />
{#if loginStatus === 'pending'}
  <FromUser {sendData} login={true} />
{:else if loginStatus === 'denied'}
  <div class="w-full flex justify-center my-12">
    <ErrorAlert text="Niepoprawny login lub hasło" />
  </div>
{:else}
  <div class="w-full flex justify-center my-12">
    <SuccessAlert text="Logowanie udane" />
  </div>
{/if}
<Footer />
