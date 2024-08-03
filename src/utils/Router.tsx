import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WeatherPage from "../pages/WeatherPage.tsx";
import PlayerPage from "../pages/PlayerPage.tsx";
import HomePage from "../pages/HomePage.tsx";

const Router = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}/>
                    <Route path={"/weather"} element={<WeatherPage/>}/>
                    <Route path={"/player"} element={<PlayerPage/>}/>
                </Routes>
        </BrowserRouter>
    );
};

export default Router;