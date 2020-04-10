export default  {
    async getSummary(){
        const response = await fetch('https://api.covid19api.com/summary')
        const data = await response.json()
        console.log(data)
        return data
    }
}