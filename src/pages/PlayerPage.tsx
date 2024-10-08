import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';
import {Input} from "@nextui-org/react";
import Player from "../components/Player.tsx";
import {Track} from "../types/playerTypes.ts";
import {api} from "../utils/axios.ts";
import axios from "axios";
import SongItem from "../components/SongItem.tsx";
import {Sidebar} from "../context/SidebarContext.tsx";
import {useSelector} from "react-redux";
import {IFavouriteState} from "../types/favouriteTypes.ts";

const PlayerPage = () => {
    const [musicFile, setMusicFile] = useState<string>("");
    const [songs, setSongs] = useState<Track[]>([]);
    const { favourites } = useSelector((store: any) => store.favourite as IFavouriteState);
    const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        axios.get(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${event.target.value}`, {
            headers: {
                "x-rapidapi-key": "0064538373msh2fe356fa62c7aa3p1f21b3jsnc1b02c0d4530"
            }
        }).then(res => {
            setSongs(res.data.data);
        }).catch(err => {console.log(err)});
    }

    return (
        <div className=" py-10 flex flex-col gap-5">
            <div className={"px-[25%]"}>
                <Input onChange={onChangeSearch} placeholder="Search by artists or music" />
                <div className={"flex flex-col gap-2 mt-3 w-full  overflow-auto"}>
                    {
                        songs.length > 0 && songs.map((song, index) => (
                            <SongItem key={song.id} song={song}/>
                        ))
                    }
                </div>
            </div>
            <Sidebar sidebar={
                <div className={"flex flex-col gap-6"}>
                    <h1 className={"font-bold text-[24px]"}>Favourites</h1>
                    <div className={"flex flex-col gap-3"}>
                        {favourites.map(song => (
                            <SongItem song={song}/>
                        ))}
                    </div>
                </div>
            } isOpen={false}>

                <Player musicFile={musicFile}/>
            </Sidebar>

        </div>
    );
};

export default PlayerPage;