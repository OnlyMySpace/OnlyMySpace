<script lang="ts">
	import type { Quote } from "$lib/widgets";

    export let quotes: Quote[] = [];

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

    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

</script>

<!--- Use the typewriter animation -->
<p class="text-3xl font-bold text-center transition-all duration-500" use:typewriter={{speed: 1, text: randomQuote.text}}></p>
<p class="text-3xl font-bold text-center transition-all duration-500" use:typewriter={{speed: 10, text: randomQuote.author}}></p>