<script>
    import Header from "../../lib/Header.svelte";
    import Footer from "../../lib/Footer.svelte";
    import { LocalStorageStore } from "../../stores/store";
    let currentlywatching = LocalStorageStore('currentlywatch',[])
    export let currentw = currentlywatching.get();
    let curlen = currentw.length;
    const watchepid = (id) =>{
    window.open(`/watch?${id}`,"_self")
  }
</script>
<Header/>
<br>
<br>
<br>
<br>
<h1 class="center">Currently Watching - {curlen} </h1>
<div class="recentmembersc">
    {#if currentw.length > 0}
{#each currentw as item}
<div on:click={watchepid(item.episode)} class="gridshowlistc">
    <div class="container">
        <img src={item.coverImage} alt="" class="gridimgshowc">
        <div class="bottomleftc">
            <i class="fa-regular fa-circle-play fa-2xl" style="color: #ffffff;"></i>
        </div>
        <div class="bottomleftctxt">
                <p class="center">episode : {item.epnum}</p>
    <p class="center">{item.title}</p>
            </div>
    </div>
</div>

{/each}
{:else}
<h2 style="text-align: center;">No Anime In Currently Watching</h2>
{/if}
</div>
<Footer/>