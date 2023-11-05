<script>
  import { onMount } from "svelte";
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
  import MuxVideo from '../../lib/Videoplayer.svelte'

  let eps = []
  let responseData = {}; // Initialize a variable to store the response data
  let animeid;
  let epdata = {}
  let episodeid = ''
  onMount(async () => {
    let id = window.location.search;
    id = id.replace("?", "");
    episodeid = id;
    const regex = /^.+&/;
    let text = id
    const result = text.replace(regex, '');
    animeid = result;

    console.log(id);

    const resp = await fetch(`https://api-amvstrm.nyt92.eu.org/api/v2/stream/${id}`);
     
    if (resp.ok) {
      responseData = await resp.json();
      responseData = responseData['plyr']
    }
    else{
      console.log("error")
    }

    const res = await fetch(`https://api.consumet.org/anime/gogoanime/info/${animeid}`);
    if (res.ok) {
      epdata = await res.json();
      eps = epdata["episodes"];
      console.log(eps);
      
    } else {
      console.error("Failed to fetch data");
    }
  });
  const watchepid = (epid,id) =>{
    window.open(`/watch?${epid}&${id}`,"_self")
  }
</script>

<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-SDZHWZSFCG"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() { dataLayer.push(arguments); }
			gtag('js', new Date());

			gtag('config', 'G-SDZHWZSFCG');
		</script>
	<title>Pirate Tokei &bull; {epdata.title}</title>
	<html lang="en" />
</svelte:head>

<Header/>
<p class="center">
    <iframe allowfullscreen class="frame" src={responseData.main} frameborder="0"></iframe>
</p>
<div class="ep">

<div class="epi">
    <h4>More Episodes of {epdata.title} - </h4>
    {#if eps.length > 0}
    {#each eps as episode}
      <div on:click={() => watchepid(episode.id,epdata.id)}  class="eps">
        <h4 class="centerr">episode : {episode.number}</h4>
      </div>
    {/each}
{:else}
  <h2 class="centerr">Loading episodes...</h2>
{/if}
</div>
<div class="eplist">

</div>
</div>
<Footer/>
