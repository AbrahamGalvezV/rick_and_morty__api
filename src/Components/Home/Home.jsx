import { MainBanner } from "../../Components/MainBanenr"
import { Character } from "../../Pages/Characters"

//------------------------------------------------------------------------

export const Home = () => {
    return (
        <div className="home">
            <MainBanner />
            <Character />
        </div>
    )
}

