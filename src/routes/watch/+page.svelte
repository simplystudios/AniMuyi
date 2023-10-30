<script>
  import { onMount } from "svelte";
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
  let eps = []
  let responseData = {}; // Initialize a variable to store the response data
  let animeid;
  let epdata = {}
  onMount(async () => {
    console.log(window.location)
    let id = window.location.search;
    id = id.replace("?", "");
    const regex = /^.+&/;
    let text = id
    const result = text.replace(regex, '');
    animeid = result;

    console.log(id);

    const resp = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${id}?server=gogocdn`);
    
    if (resp.ok) {
      responseData = await resp.json();
      console.log(responseData);
      responseData = responseData.headers ? responseData.headers.Referer : 'N/A'
      responseData = responseData.replace("Referer:","")
    } else {
      console.error("Failed to fetch data");
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
<Header/>
<div class="ep">
<p class="center">
    <iframe allow="fullscreen;" class="frame" title="episode" src={responseData} frameborder="0"></iframe>
</p>
<div class="epi">
    <h4>More Episodes of {epdata.title} : </h4>
    {#if eps.length > 0}
    {#each eps as episode}
      <div on:click={() => watchepid(episode.id,epdata.id)}  class="eps">
        <h4 class="centerr">episode : {episode.number}</h4>
      </div>
    {/each}
{:else}
  <p class="centerr">Loading episodes...</p>
{/if}
</div>
<div class="eplist">

</div>
</div>
<Footer/>
<style>
 .eps{
    padding: 1px;
    margin: 10px;
    background-color: rgb(46, 46, 46);
    border: 1;
    border-radius: 6px;
  }
  .centerr{
    text-align: center;
  }
    .center{
        position: relative;
        overflow: hidden;
        width: 100%;
        padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
    }
    .frame{
         position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  margin-right: 0;
  right: 0;
  width: 100%;
  height: 100%;
    }
    .epi{
       top: 0;
       text-align: center;
       bottom: 0;
       right: 0;
    }
    .eplist{
      
    }
    @media only screen and (max-width : 700px) {
      .frame{
         position: absolute;
         top: 0;
         left: 0;
         bottom: 0;
         margin-right: 0;
         right: 0;
         width: 100%;
         height: 100%;
          }
          .epi{
       top: 0;
       margin-left: 10px;
       text-align: center;
       bottom: 0;
       right: 0;
    }
    }
</style>