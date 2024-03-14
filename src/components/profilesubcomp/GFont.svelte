<script lang="ts">
    export let fname: string;
</script>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link
    href="https://fonts.googleapis.com/css2?family={fname.replaceAll(
        ' ',
        '+'
    )}&display=swap"
    rel="stylesheet"
/>