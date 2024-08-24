import React, {useState} from 'react';
import {Button, Select, SelectItem} from "@nextui-org/react";

const TimeByZone = () => {
    const timeZones = [
        { id: 1, tz: "Pacific/Kwajalein", city: "Kwajalein" },       // UTC−12:00
        { id: 2, tz: "Pacific/Niue", city: "Niue" },                 // UTC−11:00
        { id: 3, tz: "Pacific/Honolulu", city: "Honolulu" },         // UTC−10:00
        { id: 4, tz: "America/Anchorage", city: "Anchorage" },       // UTC−09:00
        { id: 5, tz: "America/Los_Angeles", city: "Los Angeles" },   // UTC−08:00
        { id: 6, tz: "America/Denver", city: "Denver" },             // UTC−07:00
        { id: 7, tz: "America/Mexico_City", city: "Mexico City" },   // UTC−06:00
        { id: 8, tz: "America/New_York", city: "New York" },         // UTC−05:00
        { id: 9, tz: "America/Caracas", city: "Caracas" },           // UTC−04:00
        { id: 10, tz: "America/St_Johns", city: "St. John's" },      // UTC−03:30
        { id: 11, tz: "America/Argentina/Buenos_Aires", city: "Buenos Aires" }, // UTC−03:00
        { id: 12, tz: "Atlantic/South_Georgia", city: "South Georgia" }, // UTC−02:00
        { id: 13, tz: "Atlantic/Azores", city: "Azores" },          // UTC−01:00
        { id: 14, tz: "Europe/London", city: "London" },            // UTC±00:00
        { id: 15, tz: "Europe/Berlin", city: "Berlin" },            // UTC+01:00
        { id: 16, tz: "Europe/Kiev", city: "Kyiv" },                // UTC+02:00
        { id: 17, tz: "Europe/Moscow", city: "Moscow" },            // UTC+03:00
        { id: 18, tz: "Asia/Tehran", city: "Tehran" },              // UTC+03:30
        { id: 19, tz: "Asia/Dubai", city: "Dubai" },                // UTC+04:00
        { id: 20, tz: "Asia/Kabul", city: "Kabul" },                // UTC+04:30
        { id: 21, tz: "Asia/Karachi", city: "Karachi" },            // UTC+05:00
        { id: 22, tz: "Asia/Kolkata", city: "New Delhi" },          // UTC+05:30
        { id: 23, tz: "Asia/Kathmandu", city: "Kathmandu" },        // UTC+05:45
        { id: 24, tz: "Asia/Dhaka", city: "Dhaka" },                // UTC+06:00
        { id: 25, tz: "Asia/Yangon", city: "Yangon" },              // UTC+06:30
        { id: 26, tz: "Asia/Bangkok", city: "Bangkok" },            // UTC+07:00
        { id: 27, tz: "Asia/Shanghai", city: "Shanghai" },          // UTC+08:00
        { id: 28, tz: "Asia/Tokyo", city: "Tokyo" },                // UTC+09:00
        { id: 29, tz: "Australia/Adelaide", city: "Adelaide" },      // UTC+09:30
        { id: 30, tz: "Australia/Sydney", city: "Sydney" }          // UTC+10:00
    ];

    const [selectedZones, setSelectedZones] = useState("1");
    const [addedZones, setAddedZones] = useState([]);

    const getTime = (id: string) => {

        let item = timeZones.find((zone) => zone.id.toString() === id);
        console.log(item, id);
        let options = {
                timeZone: item?.tz,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            };
        return (new Date()).toLocaleString([], options);
    }

    return (
        <div className={"w-full flex flex-col bg-content1 rounded p-4 gap-4"}>
            <Select  onChange={(e) => {

                setSelectedZones(e.target.value)

            }}
                     selectionMode={"single"}

                     selectedKeys={[selectedZones]}>
                {
                    timeZones.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                            {item.tz}
                        </SelectItem>
                    ))
                }
            </Select>
            <Button onPress={() => {setAddedZones([...addedZones, selectedZones])}} color={"primary"}>Add</Button>
            <div className={"flex w-full flex-col gap-2"}>
                {
                    addedZones.map((item) => (
                        <div key={item} className={"bg-content2 p-4 rounded w-full"}>
                            <h1>{timeZones.find(t => t.id.toString() === item)?.tz}</h1>
                            <h1>{getTime(item)}</h1>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default TimeByZone;