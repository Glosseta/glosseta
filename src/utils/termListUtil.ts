import { termItem } from "../types/glossary-item";
import { parseStream } from "fast-csv";
import { createReadStream } from "fs";

const createTermItem = (row: any) => {
    return {
        term: row['term'],
        category: row['category'],
        definition: row['description']
    } as termItem;
};

const readCSV = (locale: any) => {
    return new Promise((resolve, reject) => {
        let terms = [] as termItem[];

        // We will default to the `en` locale for now until the other resource files are populated
        const stream = createReadStream(`public/resources/master_term_bank_en.csv`)
            .on("error", (error) => {
                return reject(error);
            });

        parseStream(stream, { headers: true, ignoreEmpty: true })
            .on("error", (error) => {
                console.log(`[Error reading CSV] error=${error}`);

                return reject(error);
            })
            .on("data", (row) => {
                const termItem = createTermItem(row);

                terms.push(termItem);
                terms.sort((a: termItem, b: termItem) => {
                    if (!a.term || a.term < b.term) {
                        return -1
                    } else if (!b.term || a.term > b.term) {
                        return 1
                    }
                    return 0
                })

            })
            .on("end", () => {
                resolve(terms);
            });
    });


};

const getTermList = async (locale: any) => {
    try {
        const data = await readCSV(locale);

        return data;
    } catch (error) {
        console.log(`[Error processing terms from master list] error=${error}`);
    }

    return [];
}

export default getTermList;