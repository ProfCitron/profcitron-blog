<script>
    import Button from '$lib/button/button.svelte';
</script>
<svelte:head>
    <title>prof citron · enseignant en développement web à l'iim paris</title>
</svelte:head>

<header class="max-w-[1280px] w-[calc(100%-2em)] mx-auto flex flex-col md:flex-row items-center justify-between text-inky-black my-12 mb:my-20">
    <div class="w-[calc(100%-2em)] md:w-1/2 mb-8 md:mb-0">
        <h1 class="text-3xl md:text-5xl font-beVietnamPro bold mb-6">Partageons notre passion pour le développement web</h1>
        <p class="text-lg mb-6">Salut, je m'appelle Alexis (aka prof citron), enseignant passionné depuis 2019 à <a href="https://iim.fr" rel="noopener, noreferrer" class="underline underline-offset-2">l'institut de l'Internet et du Multimédia</a>. Étudiant·e, enseignant·e ou par simple curiosité, vous trouverez ici des conseils, des tutoriels et des réflexions qui vous aideront dans votre apprentissage.</p>
        <Button link={"#pres"} text={"Je découvre"} theme={"blue"} />
    </div>
    <div class="w-[calc(100%-2em)] md:w-1/3">
        <img src="/images/alexis.jpg" alt="Photo de présentation - Alexis - Prof Citron" class="border-inky-black border-2 w-full h-[300px] md:h-auto object-cover">
    </div>
</header>
