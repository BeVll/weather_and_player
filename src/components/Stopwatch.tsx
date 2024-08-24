import React, {useEffect, useState} from 'react';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {FaPause, FaPlay} from "react-icons/fa";
import {VscDebugRestart} from "react-icons/vsc";
import {CiTimer} from "react-icons/ci";

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isStopwatchActive, setStopwatchActive] = useState(false);
    const [checkpoints, setCheckpoints] = useState<number[]>([]);

    useEffect(() => {
        let timer;

        if(isStopwatchActive){
            timer = setInterval(() => {
                setTime(time + 100);
            }, 100)
        }

        return () => clearInterval(timer);
    }, [isStopwatchActive, time]);

    function convertMillisecondsToTime(ms) {
        // Обчислення годин, хвилин, секунд і десятих частин секунди
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        const tenths = Math.floor((ms % 1000) / 100); // Десяті частини секунди

        // Форматування годин, хвилин, секунд і десятих частин секунди
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedTenths = String(tenths); // Десяті частини секунди не потребують додавання нуля

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedTenths}`;
    }

    const checkPoint = () => {
        if(isStopwatchActive){
            setCheckpoints([...checkpoints, time]);
        }
    }

    const getLapTime = (arr, index) => {
        let prevTime;
        let lapTime = 0;
        if(index != 0) {
            prevTime = arr[index-1];
            lapTime = arr[index]-prevTime;
        }
        else{
            lapTime = arr[index];
        }

        return lapTime;
    }

    const getLagTime = (arr, index) => {
        let firstTime;
        let lagTime = 0;
        if(index != 0) {
            firstTime = arr[0];
            lagTime = arr[index]-firstTime;
        }

        return lagTime;
    }


    return (
        <div className={"w-full flex flex-col bg-content1 rounded p-4 gap-4"}>
            <h1 className={"font-bold text-[24px]"}>Stopwatch</h1>

            <div className={"flex items-center gap-4"}>
                <Button onPress={() => {
                    setStopwatchActive(!isStopwatchActive)
                }}>
                    {isStopwatchActive ? <FaPause/> : <FaPlay/>}
                </Button>
                <Button onPress={checkPoint}>
                    <CiTimer/>
                </Button>
                <Button onPress={() => {
                    setStopwatchActive(false);
                    setTime(0);
                    setCheckpoints([]);
                }}>
                    <VscDebugRestart/>
                </Button>
                <h1 className={"font-bold text-[40px]"}>
                    {convertMillisecondsToTime(time)}
                </h1>

            </div>
            <table className={"w-full"}>
                <thead>
                    <tr>
                        <th className={"text-start"}>#</th>
                        <th className={"text-start text-amber-200"}>Lap time</th>
                        <th className={"text-start"}>Main time</th>
                        <th className={"text-start"}>Lag time</th>
                    </tr>
                </thead>
                <tbody>
                {
                    checkpoints.map((point, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td className={"text-amber-200"}>{convertMillisecondsToTime(getLapTime(checkpoints, index))}</td>
                            <td className={"text-white font-bold"}>{convertMillisecondsToTime(point)}</td>
                            <td className={"text-blue"}>+ {convertMillisecondsToTime(getLagTime(checkpoints, index))}</td>
                        </tr>
                    ))
                }
                </tbody>

            </table>
        </div>
    );
};

export default Stopwatch;