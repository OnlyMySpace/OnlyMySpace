<script lang="ts">
	import type { Quote } from "$lib/widgets";

    export let quotes: Quote[] = [];
    quotes = quotes.sort((a, b) => Math.random() - 0.5); // Shuffle the quotes

    function typewriter(node: HTMLElement,{text = "",speed = 1}) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                node.append(text.charAt(i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed * 100);
    }
</script>

{#each quotes as quote}
    <!--- Use the typewriter animation -->
    <p class="text-3xl font-bold text-center transition-all duration-500" use:typewriter={{speed: 1, text: quote.text}}></p>
    <p class="text-3xl font-bold text-center transition-all duration-500" use:typewriter={{speed: 10, text: quote.author}}></p>
{/each}
