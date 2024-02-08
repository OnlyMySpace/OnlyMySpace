// @ts-check
import fs from 'fs/promises';
import glob from 'glob';
import { load } from 'cheerio';

async function check() {

    glob("src/**/*.svelte",{
        ignore: ["src/**/+layout.svelte", "src/components/**"]
    }, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
    
        files.forEach(async file => {
            let content = await fs.readFile(file, 'utf8');
                if (err) {
                    console.log(err);
                    return;
                }
    
                // Load the file content into Cheerio
                const $ = load(content, {
                    recognizeSelfClosing: true,
                    xmlMode: true
                });
                // Check if a <title> element exists
                if ($('title').length === 0) {
                    console.log(`[\x1b[33mWarning\x1b[0m]: \x1b[31mNo <title> element found in \x1b[41m${file}\x1b[31m!\x1b[0m`);
                }
            
        });
    });
}
export default check