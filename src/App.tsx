import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherApi from "./api/WeatherApi.ts";
import {Button, Card, CardBody, Image, CardHeader, Input, Divider, Spinner, CardFooter} from "@nextui-org/react";
import {WeatherData} from "./types/types.ts";
import {FaCompressArrowsAlt, FaWind} from "react-icons/fa";
import {WiHumidity} from "react-icons/wi";
import {CiHome} from "react-icons/ci";
import Router from "./utils/Router.tsx";

function App() {
    return (
      <Router/>
    )
}

export default App
