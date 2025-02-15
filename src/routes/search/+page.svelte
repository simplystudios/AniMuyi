<script>
    import Header from "../../lib/Header.svelte";
    import Footer from "../../lib/Footer.svelte";
    import { baseurl } from '$lib/ss';
    import { onMount } from "svelte";
    let search = '';
    let searchdata = [];
    let id =''
    let stylesfordiv = 'display: none;  background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';

const getid = (id) =>{
    window.open(`/info?id=${id}`,"_self")
}
const searchanime = async(s) =>{
    const searchr = await fetch(`${baseurl}/anime?q=${s}`)
    searchdata = await searchr.json();
    searchdata = searchdata.data;
    console.log(searchdata)
    return searchdata
}
let searchanimepp = (s) =>{
    if (search.length>0){
        searchanime(s)
    stylesfordiv = 'width: auto; display: block; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';
    }
    else{
        stylesfordiv = 'display: none; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';
    }
}
const openhome = () =>{
    window.open("/home","_self")
}

onMount(async()=>{
    id = window.location.search;
    id = id.replace("?query=", "");
    if(id.length>0){
        searchanime(id)
        stylesfordiv = 'width: auto; display: block; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';

    }
    else{
        stylesfordiv = 'display: none; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';
    }
    console.log(id)
})
</script>

<svelte:head>
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-SDZHWZSFCG"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() { dataLayer.push(arguments); }
			gtag('js', new Date());

			gtag('config', 'G-SDZHWZSFCG');
		</script>
	<title>AniMuyi</title>
	<html lang="en" />
</svelte:head>
<Header/>
<div class="back">
            <div class="mains">
                <br>
                <br>
                <br>
                <br>
                <p class="center">
                     <img loading="lazy" class="toptext" src="/animuyi.png" alt="" width="330px">
                </p>
               
                <div class="searchbarmain">
                    <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
                    <input class="bar" on:change={()=>searchanimepp(search)} type="text" bind:value={search} placeholder="Search Anime"> 
                </div>
                <div style={stylesfordiv} id="results">
                    <h3 class="center">Results</h3>
                    {#if searchdata.length > 0}
                    {#each searchdata as searchitem }
                        <div on:click={() => getid(searchitem.mal_id)}>
                            <div class="resultlist">
                                <img loading="lazy" class="imgres" src={searchitem.images.jpg.image_url} alt="" width="100px">
                                <div class="datali">
                                    <h4 class="datalitxt">{searchitem.title}</h4>
                                    <h5>Type: {searchitem.type}</h5>
                                    <h5>Mal Score : {searchitem.score}</h5>
                                    <h5>Released : {searchitem.year}</h5>
                                </div>
                            </div>
                        </div>
                    {/each}    
                    {:else}
                        <h2>Loading Resutls...</h2>
                    {/if}
                </div>
                <br>
                <p class="center">
                   
                </p>
                <br>
                <br>
                <br>

        </div>
            <Footer/>
</div>