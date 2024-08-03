import React from 'react';
import {Link} from "@nextui-org/react";

const HomePage = () => {
    return (
        <div>
            <Link href={"/weather"}>Weather</Link>
            <Link href={"/player"}>Player</Link>
        </div>
    );
};

export default HomePage;