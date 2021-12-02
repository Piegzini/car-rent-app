<script>
  import Router from 'svelte-spa-router';
  import { routes } from './routes';
  import Navigation from './Components/Navigation.svelte';
</script>
<Navigation />
<Router {routes} />
