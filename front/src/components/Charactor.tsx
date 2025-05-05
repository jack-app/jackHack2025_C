import React from "react";
import Image from 'next/image'

export default function Charactor ({level}:{level:number}) {

    if (level > -100) {
        return <Image src = "/outdoor.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -300) {
        return <Image src = "/smartphone.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -500) {
        return <Image src = "/potato.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -700) {
        return <Image src = "/game.png" width={100} height={100} alt ="gazou"/>
    } else if (level > -850) {
        return <Image src = "/TV.png" width={100} height={100} alt ="gazou"/>
    } else {
        return <Image src = "/sleep.png" width={100} height={100} alt ="gazou"/>
    }

}
