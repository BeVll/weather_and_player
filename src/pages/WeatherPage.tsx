import React, {useEffect, useState} from 'react';
import {WeatherData} from "../types/weatherTypes.ts";
import WeatherApi from "../api/WeatherApi.ts";
import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input, Spinner} from "@nextui-org/react";
import {FaCompressArrowsAlt, FaWind} from "react-icons/fa";
import {WiHumidity} from "react-icons/wi";

const WeatherPage = () => {
    const [query, setQuery] = useState('London');
    const [isLoading, setLoading] = useState(true);
    const [weather, setWeather] = useState<WeatherData>();

    useEffect(() => {
        getWeather();
    }, []);

    const getWeather = () => {
        setLoading(true);
        WeatherApi.getCurrentWeather(query).then((response) => {
            setWeather(response.data);
        }).catch(reason => console.log(reason));
        setLoading(false);
    }

    const getTemperature = (temp:number) => {

        if(temp > 0)
            return `+${temp}`
        else if(temp < 0)
            return `-${temp}`
        else
            return `${temp}`
    }

    return (
        <div className={"px-[25%] py-10 flex flex-col gap-5"}>
            <div className="flex w-full gap-2">
                <Input placeholder={"Search"} className={"w-full"} onChange={(e) => setQuery(e.target.value)} value={query} />
                <Button color="primary" onPress={getWeather}>Search</Button>
            </div>

            {
                isLoading ? <Spinner/> :
                    <Card>
                        <CardHeader className="">
                            {weather?.location.name}, {weather?.location.country}
                        </CardHeader>
                        <Divider/>
                        <CardBody>
                            <div className={"flex justify-between items-center px-6"}>
                                <div className={"flex gap-3 items-center"}>
                                    <Image src={weather?.current.condition.icon}/>
                                    <div className={"flex flex-col"}>
                                        <h1 className={"font-bold"}>{weather?.current.condition.text}</h1>
                                        <span>
                            {getTemperature(weather?.current.temp_c)}°C
                        </span>
                                    </div>
                                </div>

                                <div className={"flex gap-3 items-center"}>
                                    <FaWind size={24}/>
                                    <div className={"flex flex-col"}>
                                        <h1 className={"font-bold"}>{weather?.current.wind_kph} km/h</h1>
                                        <span>
                            {weather?.current.wind_degree}°
                            </span>
                                    </div>
                                </div>

                                <div className={"flex gap-3 items-center"}>
                                    <FaCompressArrowsAlt size={24}/>
                                    <div className={"flex flex-col"}>
                                        <h1 className={"font-bold"}>{weather?.current.pressure_mb} mb</h1>
                                    </div>
                                </div>
                                <div className={"flex gap-2 items-center"}>
                                    <WiHumidity  size={44}/>
                                    <div className={"flex flex-col"}>
                                        <h1 className={"font-bold"}>{weather?.current.humidity} %</h1>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                        <Divider/>
                        <CardFooter>

                        </CardFooter>
                    </Card>
            }
        </div>
    )
};

export default WeatherPage;