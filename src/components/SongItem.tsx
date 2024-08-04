import React, {useRef, useState} from 'react';
import {IPlayerState, PlayerActionType, Track} from "../types/playerTypes.ts";
import {Button} from "@nextui-org/react";
import {FaArrowAltCircleDown, FaPause, FaPlay} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {TfiFullscreen} from "react-icons/tfi";
import {AiOutlineFullscreen} from "react-icons/ai";
import {BsFullscreen} from "react-icons/bs";

const SongItem = ({song}:{song:Track}) => {
    const { isPlaying, track } = useSelector((store: any) => store.player as IPlayerState);
    const dispatch = useDispatch();
    const btnRef = useRef<HTMLButtonElement>();
    const blockRef = useRef<HTMLDivElement>();

    const secondsToMinutesSeconds = (seconds:number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    const setTrack = (e) => {
        if(song == track)
            dispatch({
                type: PlayerActionType.CHANGE_PLAYING
            })
        else
            dispatch({
                type: PlayerActionType.SET_TRACK, payload: song
            })
    }

    const hoverHandle = () => {
        if (btnRef.current) {
            btnRef.current.style.opacity = "100%";
        }
    }

    const unHoverHandle = () => {
        if (btnRef.current) {
            btnRef.current.style.opacity = "0%";
        }
    }

    const changeSize = () => {
        console.log("fda");
        if (blockRef.current) {

            blockRef.current.style.height === "400px" ? blockRef.current.style.height = "80px" :  blockRef.current.style.height = "400px";
            blockRef.current.style.padding === "20px" ? blockRef.current.style.padding = "0px" :  blockRef.current.style.padding = "20px";
        }
    }

    return (
        <div ref={blockRef} onMouseEnter={hoverHandle} onMouseLeave={unHoverHandle} className={"transition-height transition-[padding] h-[80px] bg-content1 rounded-lg overflow-hidden"}>
            <div className={"w-full flex justify-between items-center gap-3"}>
                <div className={"flex gap-3"}>
                    <div className={"relative"}>
                        <div
                            className={"absolute hover:opacity-100 transition opacity-0 bg-content1/70 w-full h-full flex justify-center items-center"}>
                            <Button color={"primary"} onPress={setTrack} className={"rounded-[50%]"} isIconOnly>
                                {
                                    isPlaying && track == song ?
                                        <FaPause/>
                                        :
                                        <FaPlay/>

                                }
                            </Button>
                        </div>
                        <img className={"h-[80px] w-[80px]"} src={song.album.cover_medium}/>
                    </div>
                    <div className={"flex flex-col justify-center gap-0"}>
                        <h1 className={`font-bold text-[20px] ${song == track && "text-primary"}`}>
                            <a href={song.link} target={"_blank"}>{song.title}</a>
                        </h1>
                        <span className={"text-neutral-400"}>
                        <a href={song.artist.link} target={"_blank"}>{song.artist.name}</a>
                    </span>
                    </div>
                </div>
                <div className={"p-3 flex gap-3 justify-end items-center"}>
                    <span className={"text-neutral-400"}>{secondsToMinutesSeconds(song.duration)}</span>
                    <Button ref={btnRef} variant={"light"} onPress={changeSize}
                            className={"rounded-[50%] fullScreen opacity-0"} isIconOnly>
                        <FaArrowAltCircleDown size={16}/>
                    </Button>
                </div>
            </div>
            <div className={"w-full mt-6"}>
                <div>
                    <img className={"h-[80px] w-[80px] rounded-xl"} src={song.artist.picture_medium}/>
                </div>
            </div>
        </div>
    );
};

export default SongItem;