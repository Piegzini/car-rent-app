<script>
  import Navigation from '../Components/Navigation.svelte';
  import Footer from '../Components/Footer.svelte';
  import axios from 'axios';
  import FromUser from '../Components/FromUser.svelte';
  import SuccessAlert from '../Components/SuccessAlert.svelte';
  import ErrorAlert from '../Components/ErrorAlert.svelte';
  import { push } from 'svelte-spa-router';

  let registerStatus = 'pending';
  const sendData = async (username, password, email) => {
    let response = await axios.post('http://localhost/car_rent/register.php', {
      username,
      password,
      email,
    });
    const { result } = response.data;
    //setting register status
    registerStatus = result;

    setTimeout(() => {
      if (registerStatus === 'success') {
        push('/login');
      } else if (registerStatus === 'denied') {
        push('/register');
      }
    }, 1000);
  };
</script>

<Navigation />
{#if registerStatus === 'pending'}
  <FromUser {sendData} login={false} />
{:else if registerStatus === 'denied'}
  <div class="w-full flex justify-center my-12">
    <ErrorAlert text="Rejestracja nie udana" />
  </div>
{:else}
  <div class="w-full flex justify-center my-12">
    <SuccessAlert text="Konto zostało stworzone" />
  </div>
{/if}
<Footer />
