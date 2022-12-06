import axios from "axios";

export const fetch = async (url: string) => {
    axios.get(url)
        .then(function (res) {
            return res;
        })
        .catch(function (error) {
            console.log(`[Unable to fetch from ${url}], error=${error}`)
        })
}