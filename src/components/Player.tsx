import React, {useEffect, useRef, useState} from 'react';
import {Button, Slider} from "@nextui-org/react";
import {FaPause, FaPlay, FaVolumeDown, FaVolumeMute} from "react-icons/fa";
import {IoPlaySkipBackSharp, IoPlaySkipForward} from "react-icons/io5";
import ReactPlayer from "react-player";

const Player = ({musicFile}:{musicFile:string}) => {
    const [isPlaying, setPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0);
    const [oldVolume, setOldVolume] = useState<number>(0);
    const playerRef = useRef<ReactPlayer>();


    useEffect(() => {
    }, [isPlaying]);

    const playChange = () => {
        !isPlaying ? setPlaying(true) : setPlaying(false);
    }

    const changeVolume = () => {
        volume > 0 && setOldVolume(volume);
        volume > 0 ? setVolume(0) : setVolume(oldVolume);
    }

    const secondsToMinutesSeconds = (seconds:number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return (
        <div>
            <ReactPlayer
                ref={playerRef}
                playing={isPlaying}
                volume={volume}
                onDuration={setDuration}
                progressInterval={200}
                onProgress={(progress) => {
                    const currentTime = progress.playedSeconds;
                        setCurrentTime(currentTime);
                    }}
                controls={true}
                onStart={() => {
                    setPlaying(true);
                }}
                url={"https://dl01.dtmp3.pw/mp3/81968.mp3"}>
            </ReactPlayer>

            <div className={"w-full flex flex-col items-center gap-3 justify-center mt-5 bg-content2 p-4 rounded-xl"}>
                <div className={"flex justify-between w-full items-center"}>
                    <div>

                    </div>
                    <div className={"flex gap-3"}>
                        <Button variant={"light"} className={"rounded-[50%]"} isIconOnly>
                            <IoPlaySkipBackSharp />
                        </Button>
                        <Button color={"primary"} onPress={playChange} className={"rounded-[50%]"} isIconOnly>
                            {
                                !isPlaying ?
                                    <FaPlay/>
                                    :
                                    <FaPause/>
                            }
                        </Button>
                        <Button variant={"light"} className={"rounded-[50%]"} isIconOnly>
                            <IoPlaySkipForward size={16} />
                        </Button>
                    </div>
                    <div className={"flex items-center"}>
                        <Button onPress={changeVolume} variant={"light"} className={"rounded-[50%]"} isIconOnly>
                            {
                                volume > 0 ? <FaVolumeDown size={16}/> : <FaVolumeMute size={16}/>
                            }
                        </Button>
                        <Slider className={"w-[160px]"} onChange={(value) => {setVolume(value)}} value={volume} step={0.01} minValue={0} maxValue={1} size={"sm"}/>
                    </div>
                </div>
                <div className={"flex items-center w-full gap-3"}>
                    <span>{secondsToMinutesSeconds(currentTime)}</span>
                    <Slider onChangeEnd={(value) => {playerRef.current?.seekTo(value)}} value={currentTime} minValue={0} maxValue={duration} size={"sm"}/>
                    <span>{secondsToMinutesSeconds(duration)}</span>
                </div>
            </div>

        </div>
    );
};

export default Player;