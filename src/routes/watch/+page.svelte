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

    const resp = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${id}?server=gogocdn`);
     
    if (resp.ok) {
      responseData = await resp.json();
      responseData = responseData["sources"]
      console.log(responseData)
      if(responseData.length === 5){
        responseData = responseData[5]
        console.log(responseData)
      }
      else{
        responseData = responseData[4]
        console.log(responseData)
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
<p class="center">
    <player class="player">
        <MuxVideo src={responseData.url} />
    </player>
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