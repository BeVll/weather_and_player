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

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(60000);
    const [isTimerActive, setTimerActive] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen:isOpen2, onOpen:onOpen2, onOpenChange:onOpenChange2} = useDisclosure();
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    const audio = new Audio("https://cdn.pixabay.com/audio/2022/06/12/audio_eb85589880.mp3");

    useEffect(() => {
        let timer;

        if(isTimerActive && timeLeft > 0){
            timer = setInterval(() => {
                setTimeLeft(timeLeft - 500);
            }, 500)
        }
        else if (timeLeft === 0){
            setTimerActive(false);
            audio.play();
            onOpen2();
        }

        return () => clearInterval(timer);
    }, [isTimerActive, timeLeft]);


    const convertMillisecondsToTime = (ms:number) => {
        // Обчислення годин, хвилин та секунд
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);

        // Форматування годин, хвилин та секунд у форматі hh:mm:ss
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    const setTimerCount = () => {
        setTimerActive(false);

        let timerCount = 0;
        timerCount += seconds*1000;
        timerCount += minutes*60000;
        timerCount += hours*360000;

        setTimeLeft(timerCount);

        onOpenChange();
    }



    return (

            <div className={"w-full flex flex-col bg-content1 rounded p-4 gap-4"}>
                <h1 className={"font-bold text-[24px]"}>Timer</h1>

                <div className={"flex gap-4"}>
                    <Button onPress={() => {setTimerActive(!isTimerActive)}}>
                        {isTimerActive ? <FaPause  /> : <FaPlay />}
                    </Button>
                    <Button onPress={() => {setTimerActive(false); setHours(0); setMinutes(1); setSeconds(0); setTimeLeft(60000)}}>
                        <VscDebugRestart/>
                    </Button>
                    <Button  variant={"light"} className={"font-bold text-[40px] w-fit transition-all   transition-padding"} onPress={onOpen} disabled={isTimerActive}>
                        {convertMillisecondsToTime(timeLeft)}
                    </Button>
                </div>
                <Modal isOpen={isOpen2} onOpenChange={onOpenChange2}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Timer is over</ModalHeader>
                                <ModalBody>
                                    Wake up
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onPress={() => {audio.pause(); onClose();}}>
                                        Ok
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Timer</ModalHeader>
                                <ModalBody>
                                    <div className={"flex gap-4"}>
                                        <Input label={"Hours"} type={"number"} value={hours} onChange={(e) => {setHours(e.target.value)}}/>
                                        <Input label={"Minutes"} type={"number"} value={minutes} onChange={(e) => {setMinutes(e.target.value)}}/>
                                        <Input label={"Seconds"} type={"number"} value={seconds} onChange={(e) => {setSeconds(e.target.value)}}/>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onPress={setTimerCount}>
                                        Done
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
    );
};

export default Timer;