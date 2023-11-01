<script>
  import { onMount } from "svelte";
  import Header from "../../lib/Header.svelte";
  import Footer from "../../lib/Footer.svelte";
  import Hls from 'hls.js';

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
      responseData = responseData["sources"]
      if(responseData.length <= 4){
        responseData = responseData[4]
      }
      else{
        responseData = responseData[3]
      }
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
<div class="message">
<p class="centerr">*If the video player is taking long to load refresh the page*</p>  
</div>
<p class="center">
    <vm-player playsinline>
        <vm-hls version="latest" poster={epdata.image}>
          <source data-src={responseData.url} type="application/x-mpegURL" />
        </vm-hls>

        <vm-default-ui></vm-default-ui>
      </vm-player>
    
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
    cursor: pointer;
    border-radius: 6px;
  }
  .eps:hover{
    background-color: rgb(112, 0, 198);
    color: white;
  }
  .message{
    background-color: rgb(112, 0, 198);
    color: white;
  }
  .centerr{
    text-align: center;
  }
    .center{
        position:relative;
        overflow: hidden;
        width: 100%;
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