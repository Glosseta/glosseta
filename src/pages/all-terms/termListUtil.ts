import { termItem } from "../../types/all-terms-item";
import { parseStream } from "fast-csv";
import { createReadStream } from "fs";

const createTermItem = (row: any) => {
    return {
        term: row['term'],
        category: row['category'],
        href: `/search?term=${row['term']}`,
    } as termItem;
};

const readCSV = (locale: any) => {
    return new Promise((resolve, reject) => {
        let termMap = new Map();

        // We will default to the `en` locale for now until the other resource files are populated
        const stream = createReadStream(`./resources/master_term_bank_en.csv`)
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
                const category = row['category'];

                if (termMap.has(category)) {
                    termMap.get(category).push(termItem);
                } else {
                    const categoryTermArray = [];
                    categoryTermArray.push(termItem);

                    termMap.set(category, categoryTermArray);
                }
            })
            .on("end", (rowCount: number) => {
                console.log(`[CSV processing completed] Parsed ${rowCount} rows`);

                resolve(Object.fromEntries(termMap));
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

    return new Map();
}

export default getTermList;