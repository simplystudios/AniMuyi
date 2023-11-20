<script>
  import { page } from '$app/stores';
</script>
<div style="background: url(/animebackbw.png);" class="back">
    <h1 style="font-size: 60px;" class="center">{$page.status}</h1>
    <h2 class="center">{$page.error.message}</h2>
    <p class="center">
        <img src="/ace.png" alt="">
    </p>
</div>

<style>
    .back{
        height: 100%;
        width: 100%;
    }
</style>