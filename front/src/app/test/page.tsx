"use client";
import React, { useState,useEffect } from "react";

import { getSchedular } from "@/libs/getSchedular";



export default function Test() {
    const [user_input, setUserInput] = useState("");
    const [schedular, setSchedular] = useState(null);

    useEffect(() => {
        const fetchSchedular = async () => {
            const schedule = await getSchedular(user_input);
            setSchedular(schedule);
        };
        fetchSchedular();
    }, []);

    



    return (
        <div>
            
        </div>
    )
}