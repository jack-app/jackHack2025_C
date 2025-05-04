"use client";
import React, { useState,useEffect } from "react";

import { getSchedular } from "@/libs/getSchedular";
import TimeCard from "@/components/timeCard";
import { schedularType } from "@/types/baseType";
import Clock from "@/components/Clock";


export default function Test() {



    return (
        <>
            <Clock />
        </>
        
    );
}