import { Navigate, Route, Routes } from "react-router-dom";
import { Characters } from "../Characters/Characters";
import { CharacterCard } from "../../Components/Charactercard/CharacterCard";
// import { Information } from "../Information/Information"

//---------------------------------------------------------------

export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Characters />} />
      <Route path="/:id" element={<CharacterCard />} />
    </Routes>
  );
};
