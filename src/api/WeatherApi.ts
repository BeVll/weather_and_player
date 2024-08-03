import {api} from "../utils/axios.ts";

const WeatherApi = {
    getCurrentWeather: async function (query: string) {
        return await api.get(`current.json?key=75df832c0ef44c62b04101330242807&q=${query}&aqi=no`);
    },
}

export default WeatherApi;