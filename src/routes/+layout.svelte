<script>
    import "../app.css";
    import {fly} from "svelte/transition";
    import { onMount } from 'svelte';
    import HeaderBanner from "$lib/headerBanner/headerBanner.svelte";
    import Notification from "$lib/notification/notification.svelte";
    //import Button from "$lib/button/button.svelte";
    import { co2 } from '@tgwf/co2';

    // Burger menu
    let responsiveMenu = false;
    let isActive = false;
    function openMenu() {
        isActive = !isActive;
        responsiveMenu = isActive;
    }

    onMount(() => {
        if(innerWidth > 768) {
            responsiveMenu = true;
        }
    })

    function resetMenu() {
        console.log(innerWidth)
        if(innerWidth > 768) {
            responsiveMenu = true;
            isActive = false;
        } else {
            responsiveMenu = false;
        }
    }

    // Copyrigth year
    const copy = new Date().getFullYear();

    // Footprint
    const swd = new co2();
    const emissions = swd.perVisit(500000).toFixed(2);
    const average = swd.perVisit(2.1e+6).toFixed(2)


    // Newsletter
    let name = '';
    let email = '';
    let consent = false;

    // Newsletter DOM response
    let newsletterResponse = {
        isActive: false,
        type: '',
        message: ''
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if(!consent) {
            return;
        }

        const data = {
            "email": email,
            "name": name,
        };

        try {
            console.log('try 1')
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if(response.ok) {
                newsletterResponse.message = 'Merci pour ton inscription ! Tu recevras un email de confirmation dans quelques instants.';
                newsletterResponse.isActive = true;
                newsletterResponse.type = 'success';
            } else {
                newsletterResponse.message = 'Une erreur est survenue lors de l\'inscription. Vérifie que tu as bien accepté la politique de confidentialité et les mentions légales.';
                newsletterResponse.isActive = true;
                newsletterResponse.type = 'error';
            }

        } catch (error) {
            newsletterResponse.message = 'Une erreur est survenue lors de l\'inscription. Vérifie que tu as bien accepté la politique de confidentialité et les mentions légales.';
            newsletterResponse.isActive = true;
            newsletterResponse.type = 'error';
        }

    }



</script>
<svelte:window on:resize="{resetMenu}" />

<HeaderBanner />
<nav class="relative flex justify-between items-center max-w-[1400px] w-[calc(100%-2em)] mx-auto my-4 py-3 px-6 border-2 border-inky-black text-inky-black font-poppins text-md nav-shadow">
    <a href="/">
        <img src="/images/logo-prof-citron.svg" alt="Logo Prof Citron" class="h-[50px]">
    </a>
    {#if responsiveMenu}
    <ul class="absolute origin-top-left top-full left-[-2px] right-[-2px] bg-white border-2 md:border-0 md:static md:flex gap-8" transition:fly={{ y: -200, duration: 800 }}>
        <li class="px-4 py-2 md:p-0">
            <a href="/">accueil</a>
        </li>
        <li class="px-4 py-2 md:p-0">
            <a href="/blog" class="line-through pointer-events-none">le blog</a>
        </li>
        <li class="px-4 py-2 md:p-0">
            <a href="/contact" class="line-through pointer-events-none">les cours</a>
        </li>
        <li class="px-4 py-2 md:p-0">
            <a href="/contact" class="line-through pointer-events-none">les ressources</a>
        </li>
        <li class="px-4 py-2 md:p-0">
            <a href="/contact" class="line-through pointer-events-none">a propos</a>
        </li>
    </ul>
    {/if}
    <div class="relative w-8 h-8 md:hidden hover:cursor-pointer {isActive ? 'active' : ''}" on:click={openMenu}>
        <span class="absolute h-1 w-full left-0 top-2 bg-aurora-yellow"></span>
        <span class="absolute h-1 w-full left-0 bottom-2 bg-klein-blue"></span>
    </div>
</nav>

<slot />

<footer class="font-poppins text-inky-black">
    <section class="max-w-[1400px] w-[calc(100%-2em)] mx-auto border-inky-black border-2 grid md:grid-cols-2 mb-8">
        <div class="p-6 border-inky-black md:border-r bg-french-sky-blue">
            <p class="text-2xl font-beVietnamPro font-bold mb-6">
                Abonne-toi à la newsletter
            </p>
            <p class="font-poppins">
                Ne manque aucune nouveauté du site en t'inscrivant à la newsletter ! Bonnes pratiques, tutoriels et approches d'apprentissage sont au programme pour continuer à progresser ! <i> Durant la conception du site, tu recevras également toutes les nouveautés en avant-première !</i>
            </p>
            <form class="mt-5" on:submit|preventDefault="{handleSubmit}">
                <div>
                    <label for="name" class="block text-sm font-bold mb-2">Quel est ton prénom ?</label>
                    <input type="text" bind:value="{name}" id="name" class="form-input w-full lg:w-auto">
                </div>
                <div>
                    <label for="email" class="block text-sm font-bold mb-2 mt-4">Quel est ton email ?</label>
                    <input type="email" bind:value="{email}" id="email" class="form-input w-full lg:w-auto">
                </div>
                <div>
                    <label for="consent" class="inline-flex items-center mb-2 mt-4">
                        <input type="checkbox" class="form-checkbox" bind:checked="{consent}" id="consent">
                        <span class="ml-2 text-xs">J'accepte de recevoir des emails de la part de Prof Citron et d'avoir pris connaissance de la politique de confidentialité et des mentions légales</span>
                    </label>

                </div>
                <button type="submit" class="inline-block bg-inky-black text-white font-bold py-2 px-4 mt-4 disabled:cursor-not-allowed" disabled="{!consent}">Je m'inscris</button>
            </form>
            {#if newsletterResponse.isActive}
                <Notification type="{newsletterResponse.type}" message="{newsletterResponse.message}" />
            {/if}
        </div>
        <div class="border-inky-black border-t-2 md:border-t-0 md:border-l bg-naples-yellow">
            <div class="border-inky-black border-b-2">
                <div class="p-6">
                    <p class="text-2xl font-beVietnamPro font-bold mb-6">
                        Me retrouver
                    </p>
                    <div class="flex flex-wrap gap-8">
                        <a href="https://twitter.com/leprofcitron" rel="nofollow, noopener, noreferrer" class="flex gap-2 items-center text-klein-blue">
                            <img src="/images/brand/picto-twitter-bleuklein.svg" alt="Pictogramme Twitter" class="w-5">
                            Twitter
                        </a>
                        <a href="https://linkedin.com/in/alexisbougy" rel="nofollow, noopener, noreferrer" class="flex gap-2 items-center text-klein-blue">
                            <img src="/images/brand/picto-linkedin-bleuklein.svg" alt="Pictogramme Linkedin" class="w-5">
                            Linkedin
                        </a>
                        <a href="https://github.com/profcitron" rel="nofollow, noopener, noreferrer" class="flex gap-2 items-center text-klein-blue">
                            <img src="/images/brand/picto-github-bleuklein.svg" alt="Pictogramme GitHub" class="w-5">
                            GitHub
                        </a>
                    </div>

                </div>

            </div>
            <div class="p-6">
                <p class="text-2xl font-beVietnamPro font-bold mb-6">
                    Empreinte carbone
                </p>
                <p>
                    Ta visite sur cette page du site a génèré une empreinte carbone d'environ
                </p>
                <p class="text-xl font-poppins font-semibold my-3">~{emissions}g de CO2</p>
                <p>En moyenne, une visite sur une page d'un site web représente une consommation d'environ ~{average}g de CO2</p>
                <p class="text-sm italic mt-3">Statistique mesurée avec <a href="https://github.com/thegreenwebfoundation/co2.js" rel="noopener, noreferrer" class="underline underline-offset-2">CO2.js</a></p>

            </div>
        </div>
    </section>

    <section class="max-w-[1280px] w-[calc(100%-2em)] mx-auto px-1 mb-5">
        <div class="flex flex-wrap gap-6 justify-between items-center">
            <div class="flex gap-4 grow items-center">
                <img src="/images/logo-prof-citron-noir.svg" alt="Logo Miniature - Prof Citron" class="w-8">
                <p class="text-sm">Site créé avec <img src="/images/brand/svelte-plain.svg" alt="Logo Svelte" class="w-4 inline"> par <a href="https://linkedin.com/in/alexisbougy" rel="noopener, noreferrer" class="underline underline-offset-2">Alexis Bougy</a></p>
            </div>
            <div class="flex gap-4 grow items-center md:justify-end">
                <img src="/images/logo-sophia-estavao.svg" alt="Logo Miniature - Sophia Estevao" class="w-5">
                <p class="text-sm">Charte graphique réalisée avec <img src="/images/brand/illustrator-line.svg" alt="Logo Illustrator" class="w-4 inline"> par
                    <a href="https://sophiaestevao.fr/" rel="noopener, noreferrer" class="underline underline-offset-2">Sophia Estevao</a></p>
            </div>
        </div>
    </section>
    <section class="max-w-[1280px] w-[calc(100%-2em)] mx-auto flex flex-col md:flex-row gap-4 font-poppins text-sm text-inky-black mb-10 border-t border-inky-black pt-8 flex justify-between px-1">
        <div class="flex flex-wrap gap-4">
            <a href="#" class="line-through">Mentions légales</a>
            <a href="#" class="line-through">Politique de confidentialité</a>
        </div>
        <p class="mt-4 md:mt-0">© {copy}, tout droit reservé</p>
    </section>
</footer>

<!--<div class="absolute -bottom-10 -left-24 overflow-hidden">
    <img src="/images/guillemet.svg" alt="Guillemet Prof Citron - Pictogramme Décoratif" class="h-[500px]">
</div>-->

<style>
    .nav-shadow {
        box-shadow: 4px 4px #FFCA2C;
    }

    nav span {
        transition: all 0.3s linear;
        transform: rotate(0) translate(0, 0);
    }

    .active span:first-child {
        transform: rotate(45deg) translate(4px, 4px);
    }

    .active span:last-child {
        transform: rotate(-45deg) translate(5px, -5px);
    }
</style>