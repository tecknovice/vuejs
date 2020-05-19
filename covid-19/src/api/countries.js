export default  {
    async getSummary(){
        const response = await fetch('https://api.covid19api.com/summary')
        const data = await response.json()
        return data
    },
    async getWorldGeoJson(){
        const response = await fetch('/geojson/countries.geo.json');
        const data = await response.json()
        return data
    }
}