"use client"
import React,{ useState , useEffect} from "react";
import BigCharactor from "./BigCharactor";


export default function Picture() {
    const [level,setLevel] = useState<number|null>(null)
    useEffect(
        ()=> {
            const randomLevel = Math.floor(Math.random() * (99 - (-999) + 1)) + (-999);
            setLevel(randomLevel)
        },[])

    
 return (
    <div className="flex flex-col items-center justify-center h-screen">
    <BigCharactor level={level}/>
    </div>
 );
}