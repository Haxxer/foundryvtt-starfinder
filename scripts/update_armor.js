const fs = require('fs');
const dataPath = "src/items/equipment";

console.log(`Scanning the equipment for armor items to update.`);
let count = 0;

try {
    fs.readdir(dataPath, 'utf8', (err, files) => {
        if (err) throw err;

        for (const file of files) {
            const json = fs.readFileSync(`${dataPath}/${file}`, {
                encoding: 'utf8',
                flag: 'r+'
            });
            
            const itemData = JSON.parse(json);
            
            if (itemData.type === "equipment") {
                itemData.data.equippable = true;
                itemData.data.proficient = false;

                const output = JSON.stringify(itemData, null, 2);

                fs.writeFileSync(`${dataPath}/${file}`, output);
                
                count += 1;
            }
        }
        
        console.log(`Found, and migrated, ${count} armor entries.`);
    });
} catch (err) {
    console.log(err);
}
