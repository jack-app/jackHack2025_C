"use client";
import React, { useState,useEffect } from "react";

import { getSchedular } from "@/libs/getSchedular";
import TimeCard from "@/components/timeCard";
import { schedularType } from "@/types/baseType";


export default function Test() {
    const [user_input, setUserInput] = useState<string>("理想の生活");
    const [schedular, setSchedular] = useState<schedularType[]>([{
        startTime: "",
        endTime: "",
        activity: "",
    }]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSchedular = async () => {
            const schedule = await getSchedular(user_input);
            if (schedule === null) {
                console.error("Failed to fetch schedule");
                return;
            }
            setSchedular(schedule);
            setLoading(false)
        };
        fetchSchedular();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }



    return (
        <>
        {schedular.map((item, index) => (
            <TimeCard
                key={index}
                startTime={item.start_time}
                endTime={item.end_time}
                activity={item.activity}
            />
        ))}
        </>
        
    );
}