import React from 'react';
import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {IPlayerState} from "../types/playerTypes.ts";
import SongItem from "./SongItem.tsx";

const ModalQueue = ({isOpen, onOpenChange, onOpen}:{isOpen: boolean, onOpenChange: () => void, onOpen: () => void}) => {
    const { isPlaying, track, queue } = useSelector((store: any) => store.player as IPlayerState);

    return (
        <Modal className={"max-w-[800px]"} backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Queue</ModalHeader>
                        <ModalBody>
                            {
                                queue.map(song => (
                                    <SongItem song={song}/>
                                ))
                            }
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default ModalQueue;