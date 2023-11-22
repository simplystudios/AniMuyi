<script>
  import { page } from '$app/stores';
  import Footer from '../lib/Footer.svelte';
  import Header from '../lib/Header.svelte';
</script>
<div style="background: url(/animebackbw.png);" class="main">
    <Header/>
    <br>
    <br>
    <br>
    <br>
    <p class="center">
        <img src="/animuyi.png" alt="" height="200px">
    </p>
    <h1 style="font-size: 60px;" class="center">{$page.status}</h1>
    <h2 class="center">{$page.error.message}</h2>
    <br>
    <br>
    <br>
    <br>
    <br>
</div>
<Footer/>