import React, {useState} from 'react';
import {Input} from "@nextui-org/react";
import Player from "../components/Player.tsx";

const PlayerPage = () => {
    const [musicFile, setMusicFile] = useState<string>("");

    return (
        <div className="px-[25%] py-10 flex flex-col gap-5">
            <Input placeholder="Link to music file" />
            <Player musicFile={musicFile}/>
        </div>
    );
};

export default PlayerPage;