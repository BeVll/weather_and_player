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
import Timer from "../components/Timer.tsx";
import Stopwatch from "../components/Stopwatch.tsx";
import TimeByZone from "../components/TimeByZone.tsx";

const TimePage = () => {
    return (
      <div className="flex flex-col px-[30%] py-8 gap-4">
        <Timer/>
        <Stopwatch/>
          <TimeByZone/>
      </div>
    );
};

export default TimePage;