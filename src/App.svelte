<script>
  import Router from 'svelte-spa-router';
  import { routes } from './routes';
  import Navigation from './Components/Navigation.svelte';
  import {  setLoginInfo } from './stores.js';

  import { onMount } from 'svelte';


  onMount(async () => {
   await setLoginInfo()
  })

</script>
<Navigation />
<Router {routes} />
