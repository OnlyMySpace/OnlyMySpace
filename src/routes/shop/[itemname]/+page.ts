import type { PageLoad } from "./$types";

export const load: PageLoad = async (data) => {
    let slug = data.params.itemname

    return {
        slug
    }
};