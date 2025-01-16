import { Navigate, Route, Routes } from "react-router-dom"
import { Characters } from "../Characters/Characters"
import { Chapters } from "../Chapters/Chapters"
import { Information } from "../Information/Information"


//---------------------------------------------------------------

export const Boty = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/"/>}/>
            <Route path="/" element={<Characters/>}/>
            <Route path="/" element={<Characters.css/>}/>
            <Route path="/" element={<Information/>}/>
        </Routes>
    )
}