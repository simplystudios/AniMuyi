<script>
    import Header from "../../lib/Header.svelte";
    import Footer from "../../lib/Footer.svelte";
    
</script>
<svelte:head>
	<title>Pirate Tokei &bull; About</title>
	<html lang="en" />
    <!-- Google tag (gtag.js) -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-SDZHWZSFCG"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() { dataLayer.push(arguments); }
			gtag('js', new Date());

			gtag('config', 'G-SDZHWZSFCG');
		</script>
</svelte:head>
<Header/>
<h2 class="center" id="about">About Us</h2>
<p class="center">Made as a side project</p>
<p class="centerbold">**Disclaimer: We do not store any data on our servers. We only display data that is freely available online from third-party sources. We are not responsible for the accuracy, completeness, or legality of the data displayed on our website.**</p>
<Footer/>

