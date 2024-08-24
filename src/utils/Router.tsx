import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WeatherPage from "../pages/WeatherPage.tsx";
import PlayerPage from "../pages/PlayerPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import CurrenciesPage from "../pages/CurrenciesPage.tsx";
import DragListPage from "../pages/DragListPage.tsx";
import EmailSender from "../pages/EmailSender.tsx";
import TimePage from "../pages/TimePage.tsx";

const Router = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}/>
                    <Route path={"/weather"} element={<WeatherPage/>}/>
                    <Route path={"/player"} element={<PlayerPage/>}/>
                    <Route path={"/currency"} element={<CurrenciesPage/>}/>
                    <Route path={"/draglist"} element={<DragListPage/>}/>
                    <Route path={"/emailsender"} element={<EmailSender/>}/>
                    <Route path={"/times"} element={<TimePage/>}/>
                </Routes>
        </BrowserRouter>
    );
};

export default Router;