"use client";
import React, { useState,useEffect } from "react";

import Charactor from "@/components/Charactor"

export default function Test() {
    const level = -300
    return (
        <>
         <Charactor level={level}/>
        </>
    );
}