import { TwoChichas } from "../Chichas";
import { chicha72, chicha94 } from "../../assets";

const LoadingChicha = () => {
  return(
    <TwoChichas img1={chicha72} img2={chicha94} rotate="-15deg" />
  )
}

export default LoadingChicha;