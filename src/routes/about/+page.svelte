<script>
    import Header from "../../lib/Header.svelte";
    import Search from "../../lib/Search.svelte";
    import Footer from "../../lib/Footer.svelte";
    
    let search = '';
</script>
<Header/>
<input bind:value={search} type="text" placeholder="Search...">
<h1 id="about">About Us {search}</h1>
<Footer/>

<style>

</style>