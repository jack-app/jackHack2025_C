"use client";
import React, { useState,useEffect, use } from "react";

import { getSchedular } from "@/libs/getSchedular";
import TimeCard from "@/components/timeCard";
import { schedularType } from "@/types/baseType";
import Clock from "@/components/Clock";
import {useTime} from "@/hooks/useTime";


export default function Test() {
    const time = useTime();

    
    return (
        <>
            <Clock />
        </>
        
    );
}