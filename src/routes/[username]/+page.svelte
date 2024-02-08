<script lang="ts">
	import Profile from "../../components/Profile.svelte";
	import type { PageData } from "./$types";
    export let data: PageData
</script>
<title>
	{JSON.parse(data.profile.toString()).uname}
</title>
<Profile profile={JSON.parse(data.profile.toString())} views={data.views}/>