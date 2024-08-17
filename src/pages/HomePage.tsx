import React from 'react';
import {Link} from "@nextui-org/react";
import {TiWeatherCloudy} from "react-icons/ti";
import {SiApplemusic} from "react-icons/si";
import {FaMoneyBill1} from "react-icons/fa6";

const HomePage = () => {
    return (
        <div className={"flex gap-4 w-full h-screen justify-center items-center"}>
            <Link href={"/weather"} className={"font-bold text-2xl p-4 bg-content1 rounded w-[200px] h-[200px] flex-col flex justify-center items-center"}>
                <TiWeatherCloudy size={60}/>
                Weather
            </Link>
            <Link href={"/player"}  className={"font-bold gap-1 text-2xl flex-col p-4 bg-content1 rounded w-[200px] h-[200px] flex justify-center items-center"}>
                <SiApplemusic size={60}/>
                Player
            </Link>
            <Link href={"/currency"}  className={"  font-bold text-2xl flex-col p-4 bg-content1 rounded w-[200px] h-[200px] flex justify-center items-center"}>
                <FaMoneyBill1  size={60}/>
                Currency
            </Link>
        </div>
    );
};

export default HomePage;