<script>
  export let sendData;
  export let login;
  let username;
  let password;
  let email;

  const submitForm = () => {
    if (login) sendData(username, password);
    else sendData(username, password, email);
  };
</script>

<form
  on:submit|preventDefault={submitForm}
  class="w-full flex flex-col items-center justify-center my-12"
>
  <div class="1/3 flex flex-col items-center card">
    <div class="p-10  bg-base-200">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Username</span>
        </label>
        <input type="text" placeholder="username" class="input" bind:value={username} />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input type="password" placeholder="Password" class="input" bind:value={password} />
      </div>
      {#if login}
        <div class="form-control justify-content">
          <div class="w-2/3 mx-10 mt-10">
            <button class="btn btn-outline btn-primary" type="submit">Zaloguj się</button>
          </div>
        </div>
      {:else}
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="Email" placeholder="Email" class="input" bind:value={email} />
        </div>
        <div class="form-control justify-content">
          <div class="w-2/3 mx-10 mt-10">
            <button class="btn btn-outline btn-primary" type="submit">Stwórz konto</button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</form>
