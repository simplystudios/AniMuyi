<script>
    import Header from "../lib/Header.svelte";
    import Footer from "../lib/Footer.svelte";
    let search = '';
    let searchdata = [];
    let stylesfordiv = 'display: none; margin-left: auto; margin-right: auto; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';
const trendingload = async() => {
    const response = await fetch('https://api.consumet.org/anime/gogoanime/top-airing?page=1');
    let data = await response.json();
    data = data['results'];
    return data;
    console.log(data);
}

const recentlyupdatedload = async() => {
    const response = await fetch('https://api.consumet.org/anime/gogoanime/recent-episodes');
    let recentdata = await response.json();
    recentdata = recentdata['results'];
    return recentdata;
}

const getid = (id) =>{
    window.open(`/info?id=${id}`,"_self")
}
const searchanime = async() =>{
    const searchr = await fetch(`https://api.consumet.org/anime/gogoanime/${search}?page=1`)
    searchdata = await searchr.json();
    searchdata = searchdata['results'];
    console.log(searchdata)
    return searchdata
}
const searchanimepp = () =>{
    if (search.length>0){
        searchanime()
    stylesfordiv = 'display: block; margin-left: auto; margin-right: auto; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';
    }
    else{
        stylesfordiv = 'display: none; margin-left: auto; margin-right: auto; background-color: #2d2a2a; border-radius: 5px; padding: 10px; margin: 10px;';
    }
}

trendingload()
recentlyupdatedload()
</script>
<div class="back">
    <Header/>
            <div class="main">
                <p class="center">
                     <img class="toptext" src="/search.png" alt="" width="130px">
                </p>
               
                <div class="searchbar">
                    <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
                    <input class="bar" on:change={searchanimepp} type="text" bind:value={search} placeholder="Search Anime"> 
                </div>
                <div style={stylesfordiv} id="results" class="results">
                    <h2>Results</h2>
                    {#if searchdata.length > 0}
                    {#each searchdata as searchitem }
                        <div on:click={() => getid(searchitem.id)} class="resultslist">
                            <p class="center">
                                <img class="imgres" src={searchitem.image} alt="" width="100px">
                            </p>
                            <p class="center">{searchitem.title}</p>
                        </div>
                    {/each}    
                    {:else}
                        <h2>Loading Resutls...</h2>
                    {/if}
                </div>
                <br>
                <p class="center">
                    <img class="toptext" src="/trending.png" alt="" width="130px">
                </p>
                <div class="members">
                {#await trendingload()}
                    <p>Loading trending animes</p>
                    {:then data}
                    {#each data as item}
                            <div on:click={() => getid(item.id)} class="showlist">
                                <img class="imgshow" src={item.image} alt="" width="100px">
                                <p class="center">{item.title}</p>
                            </div>
                    {/each}
                {/await}
            </div>
        </div>
            <div class="recentmain">
                <p class="center">
                    <img class="toptext" src="/airing.png" alt="" width="230px">
                </p>
                <div class="recentmembers">
                   {#await recentlyupdatedload()}
                    <p>Loading Recently Updated Animes</p>
                    {:then recentdata}
                    {#each recentdata as item}
                            <div on:click={() => getid(item.id)} id="animeitem" class="gridshowlist">
                                <img class="imgshow" src={item.image} alt="" width="100px">
                                <p class="center">{item.title}</p>
                        </div>
                    {/each}
                {/await}
                </div>
            </div>

            <Footer/>
</div>
<style>
    :root {
    --bcsecond: rgb(112, 0, 198);
    --backgrd: rgb(37, 39, 38);
}
.back{
    background-color: var(--backgrd);
}
.bar {
    width: 100%;
    background-color: transparent;
    color: white;
    border: 0;
    height: 30px;
    margin-left: 10px;
}
.bar:focus{
    outline: none;
}

.imgres {
    margin-left: auto;
    margin-right: auto;
}

.resultlist {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    background-color: #888;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.searchbar {
    display: flex;
    padding: 10px;
    background-color: rgb(58, 56, 56);
    border: 0;
    width: 80%;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    height: 30px;
    border-radius: 5px;
    color: white;
}

body {
    background-color: var(--backgrd);
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: Poppins;
    font-size: 20px;
    color: white;
}

.main {
    padding: 10px;
    margin-top: 1%;
    margin-bottom: 15px;
}

.showlist {
    width: 200px;
    font-size: 20px;
    cursor: pointer;
    overflow: hidden;
    text-overflow: clip;
    /* optional: adds ellipsis for hidden text */
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 10px;
}
.showlist:hover{
    color: #d9f520;
    box-shadow: #d9f520;
}

.center {
    text-align: center;
}

.imgshow {
    width: 210px;
    border: 1;
    border-radius: 5px;
}


.crc {
    padding: 5px;
    border: 1;
    border-radius: 100px;
    width: 80px;
}

::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
}

.pp {
    background-color: var(--bcsecond);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #d9f520;
}

.gridshowlist {
    width: 200px;
    font-size: 20px;
    overflow:hidden;
    text-overflow:clip;
    cursor: pointer;
    /* optional: adds ellipsis for hidden text */
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 10px;
}
.gridshowlist:hover{
    color: #d9f520;
}

.recentmembers {
    display: grid;
    grid-gap: 0px;
    grid-template-columns: repeat(5, 3fr);
    margin-top: 10px;
    border: 1;
    border-radius: 10px;
    white-space: nowrap;
    overflow-x: 10px;
}

.members {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    border: 1;
    border-radius: 10px;
    white-space: nowrap;
    overflow-x: 10px;
}


.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--bcsecond);
}

.toptext {
    margin-left: auto;
    margin-right: auto;
}

.logo {
    background-color: var(--bcsecond);
    display: flex;
    justify-content: center;
    height: 60px;
    width: auto;
    cursor: pointer;
    margin-left: 15px;
    margin-top: 5px;
    margin-bottom: 70px;
    padding: 10px;
}

.imgcen {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}

.menuicon {
    display: none;
    margin-right: 45%;
    padding: 10px;
}

li,
a,
ul {
    padding-left: 15px;
    align-items: center;
    font-family: Poppins;
    font-size: 15px;
    color: white;
    background-color: var(--bcsecond);
    text-decoration: none;
}

.nav_links {
    list-style: none;
    display: inline-flex;
    margin-bottom: 22px;
    margin-right: 10px;
    background-color: var(--bcsecond);
}

.nav_links li a:hover {
    color: #68e8e6;
}

.logo:hover {}

.foot {
    margin: 10px;
    margin-top: 10%;
}

.nav_links li a ul {
    background-color: var(--bcsecond);
    transition: all 0.3s ease 0s;
    text-align: center;
}

.nav_links li {
    background-color: var(--bcsecond);
    margin-top: 25px;
    text-align: center;
    display: inline-block;
    padding: 5px;
}

.nav_links_moble {
    margin-left: auto;
    margin-right: auto;
    background-color: var(--bcsecond);
    list-style: none;
    text-align: center;
    display: none;
    margin-bottom: 16px;
}

.nav_links_moble li a:hover {
    color: rgb(94, 232, 124);
}

.nav_links_moble li a {
    background-color: var(--bcsecond);
    transition: all 0.3s ease 0s;
}

.nav_links_moble li {
    background-color: var(--bcsecond);
    margin-top: 25px;
    display: block;
    text-align: center;
    padding: 5px;
}

@media only screen and (max-width : 600px) {
    .header {
        background-color: var(--bcsecond);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .imgshow {
    width: 110px;
    border: 1;
    border-radius: 5px;
}
    .recentmembers {
        grid-template-columns: repeat(2, 1fr);
    }

    .head {
        background-color: var(--bcsecond);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo {
        background-color: var(--bcsecond);
        align-items: center;
        justify-content: center;
        padding: 10px;
        width: 80px;
        margin-left: 0px;
        margin-right: 50px;
        margin-top: 8px;
        margin-bottom: 5px;

    }
    .showlist {
        width: 100px;
    }
    .gridshowlist {
        width: 100px;
    }
    .menuicon {
        background-color: var(--bcsecond);
        display: inline-flex;
        margin-top: 0px;
    }

    .nav_links {
        display: none;
        text-align: center;
        padding: 10px;
    }
}
</style>