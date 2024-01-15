<script lang="ts">
    import { enhance } from "$app/forms";
    import { supabase } from "$lib/supabase";

    let formElem: HTMLFormElement;

    async function submit(){
        console.log("SUBMIT")
        let formData = new FormData(formElem)
        let email = formData.get('email')
        let password = formData.get('password')
        let username = formData.get('username')
        if (!email || !password || !username) return;
        let { data, error } = await supabase.auth.signUp({
            email: email.toString(),
            password: password.toString(),
            options: {
                data: {
                    username: username.toString()
                }
            }
        })
        if (error) console.log(error)
        else console.log(data)
        console.log(data)
    }

    async function discordAuth() {
        const {data,error} = await supabase.auth.signInWithOAuth({provider: 'discord', options: {redirectTo: 'http://localhost:5173/auth/callback'}})
        if(error) console.log(error)
        else console.log(data)
    }
</script>
<div class="flex flex-col justify-center items-center h-screen w-screen">
    <form class="border-2 border-primary rounded-md w-1/5 flex flex-col justify-center items-center" action="" method="post" bind:this={formElem}
    use:enhance={({ formElement, formData, action, cancel, submitter }) => {
        cancel()
		return async ({ result, update }) => {

		};
	}}
    >
        <h1 class="text-3xl font-bold text-center py-4">Make your own Space!</h1>
        <input type="text" placeholder="Username" name="username" class="input w-full max-w-xs my-4 border-2 border-secondary" />
        <input type="email" name="email" placeholder="Email" class="input w-full max-w-xs border-2 border-secondary mb-4" id="email">
        <input type="password" name="password" placeholder="Password" class="input w-full max-w-xs border-2 border-secondary" id="password">
        <button type="submit" on:click={() => submit()} class="btn-primary btn my-4 rounded-md">Sign up</button>
        <div class="divider divider-neutral w-10/12 self-center">OR</div>
        <button on:click={() => discordAuth()} class="btn-primary btn my-4 rounded-md">
        <img src="/socials/discord.svg" alt="Discord logo" class="w-6 h-6"/>
        Sign up with Discord
        </button>
    </form>
</div>
