import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Slider, useDisclosure} from "@nextui-org/react";
import {FaPause, FaPlay, FaVolumeDown, FaVolumeMute} from "react-icons/fa";
import {IoPlaySkipBackSharp, IoPlaySkipForward} from "react-icons/io5";
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from "react-redux";
import {IPlayerState, PlayerActionType} from "../types/playerTypes.ts";
import ModalQueue from "./ModalQueue.tsx";
import {HiQueueList} from "react-icons/hi2";
import {Sidebar, SidebarContext} from "../context/SidebarContext.tsx";
import {IFavouriteState} from "../types/favouriteTypes.ts";
import SongItem from "./SongItem.tsx";
import {PiPlaylistFill} from "react-icons/pi";

const Player = ({musicFile}:{musicFile:string}) => {
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0.1);
    const [oldVolume, setOldVolume] = useState<number>(0);
    const playerRef = useRef<ReactPlayer>();
    const { isPlaying, track } = useSelector((store: any) => store.player as IPlayerState);
    const dispatch = useDispatch();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { favourites } = useSelector((store: any) => store.favourite as IFavouriteState);
    const { toggleSidebar } = useContext(SidebarContext);



    useEffect(() => {
    }, [isPlaying, track]);

    const playChange = () => {
        dispatch({
            type: PlayerActionType.CHANGE_PLAYING
        });
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

    const backward = () => {
        dispatch({
            type: PlayerActionType.PREVIOUS_TRACK
        });
    }

    const forward = () => {
        dispatch({
            type: PlayerActionType.NEXT_TRACK
        });
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

                controls={false}
                url={track?.preview}>
            </ReactPlayer>

            <div className={"fixed  border-t-1 border-t-content3 w-full flex flex-col items-center gap-1 justify-center bottom-0 bg-content2 p-3"}>
                <div className={"flex justify-between w-full items-center"}>
                    <div>

                    </div>
                    <div className={"flex gap-3"}>
                        <Button variant={"light"} onPress={backward} className={"rounded-[50%]"} isIconOnly>
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
                        <Button variant={"light"} onPress={forward} className={"rounded-[50%]"} isIconOnly>
                            <IoPlaySkipForward size={16} />
                        </Button>
                    </div>
                    <div className={"flex items-center gap-3"}>
                        <div>
                            <Button onPress={toggleSidebar} isIconOnly variant={"light"}>
                                <PiPlaylistFill />
                            </Button>
                            <Button onPress={onOpen} isIconOnly variant={"light"}>
                                <HiQueueList size={18}/>
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
                </div>
                <div className={"flex items-center w-full gap-3"}>
                    <span>{secondsToMinutesSeconds(currentTime)}</span>
                    <Slider onChangeEnd={(value) => {playerRef.current?.seekTo(value)}} value={currentTime} minValue={0} maxValue={duration} size={"sm"}/>
                    <span>{secondsToMinutesSeconds(duration)}</span>
                </div>
            </div>
            <ModalQueue isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen}/>

        </div>
    );
};

export default Player;