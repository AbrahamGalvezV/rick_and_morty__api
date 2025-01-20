import banner from "../../../img/home.png"
import "./MainBanner.css";

//-----------------------------------------------------

export const MainBanner = () => {
    return (
        <div className="banner">
            <img className="banner__img" src={banner}/>
        </div>
    );
};