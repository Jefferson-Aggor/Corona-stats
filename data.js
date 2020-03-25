// responsible for the fetch of the data
class Corona {
    constructor() {}

    async getData(country) {
        // fetch the data from the url
        const response = await fetch(
            `https://covid19.mathdro.id/api/countries/${country}`
        );
        const data = await response.json();
        return {
            data
        };
    }
    async getTotal() {
        // get the total cases in the world
        const res = await fetch(`https://covid19.mathdro.id/api`);
        const resdata = await res.json();

        return resdata;
    }
}