<script>
    import {onMount, tick} from "svelte";
    import {fly} from "svelte/transition";

    export let type;
    export let message;

    onMount(async () => {
        await tick();
        await new Promise(resolve => setTimeout(resolve, 6000));
        fadeOut = true;
    })

    let fadeOut = false;
</script>

{#if !fadeOut}
<div transition:fly|local="{{ x: 200, duration: 1500 }}" class="max-w-[500px] mx-auto fixed bottom-12 right-6 mx-2 p-5 custom-shadow {type === 'success' ? 'bg-french-sky-blue text-inky-black' : 'bg-ribbon-red text-white'}">
    <p class="text-center">
        {message}
    </p>
</div>
{/if}

<style>
    .custom-shadow {
        box-shadow: 4px 4px #151515;
    }
</style>