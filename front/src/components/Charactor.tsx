import React from "react";
import Image from 'next/image'

export default function Charactor ({level}:{level:number}) {

    if (level > 0) {
        return <Image src = "/outdoor.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -100) {
        return <Image src = "/writing.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -200) {
        return <Image src = "/book.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -300) {
        return <Image src = "/coffee.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -400) {
        return <Image src = "/music.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -500) {
        return <Image src = "/librarysleep.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -600) {
        return <Image src = "/smartphone.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -700) {
        return <Image src = "/potato.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -800) {
        return <Image src = "/game.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -900) {
        return <Image src = "/TV.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -950) {
        return <Image src = "/bedteatime.png" width={100} height={100} alt ="gazou"/>
    } else {
        return <Image src = "/sleep.png" width={100} height={100} alt ="gazou"/>
    }
    
}
