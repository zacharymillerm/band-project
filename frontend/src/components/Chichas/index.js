import Image from "next/image";
import { BoxRound } from "../BoxRound";
// import "../../styles/components/chicha.css"
const BigOneChicha = ({ img }) => (
  <div className="chichaShow heroOneChichas">
    <span className="chicha-spin">
      <Image src={img} alt={img} />
    </span>
  </div>
);

const OneChichas = ({ img }) => (
  <span className="chicha-spin">
    <Image src={img} alt={img} />
  </span>
);

const TwoChichas = ({ margin, img1, img2, rotate }) => (
  <div className="chichaShow" style={{ rotate: rotate, margin: margin }}>
    <span className="chicha-spin">
      <Image src={img1} alt={img1} />
    </span>
    <span className="chicha-back-spin ">
      <Image src={img2} alt={img2} />
    </span>
  </div>
);

const ThreeChichas = ({ img1, img2, img3 }) => (
  <div className="ThreeChichas">
    <BoxRound left={-29} top={54} width="30px" rotate="180deg" />
    <BoxRound right={4} bottom={-29} width="30px" rotate="180deg" />
    <div style={{ marginTop: "35px" }}>
      <span className="chicha-spin">
        <Image src={img1} alt={img1} />
      </span>
    </div>
    <div style={{ margin: "5px 0 0 -5px" }}>
      <span className="chicha-back-spin" style={{ rotate: "15deg" }}>
        <Image src={img2} alt={img2} />
      </span>
    </div>
    <div style={{ margin: "65px 0 0 -12px" }}>
      <span className="chicha-spin">
        <Image src={img3} alt={img3} />
      </span>
    </div>
  </div>
);

const ThreeChichas1 = ({ img1, img2, img3 }) => (
  <div className="ThreeChichas1">
    <BoxRound left={4} bottom={-29} width="30px" rotate="90deg" />
    <BoxRound right={-29} top={54} width="30px" rotate="90deg" />
    <div style={{ marginTop: "35px" }}>
      <span className="chicha-spin">
        <Image src={img1} alt={img1} />
      </span>
    </div>
    <div style={{ margin: "5px 0 0 -5px" }}>
      <span className="chicha-back-spin" style={{ rotate: "15deg" }}>
        <Image src={img2} alt={img2} />
      </span>
    </div>
    <div style={{ margin: "65px 0 0 -12px" }}>
      <span className="chicha-spin">
        <Image src={img3} alt={img3} />
      </span>
    </div>
  </div>
);

export { BigOneChicha, OneChichas, TwoChichas, ThreeChichas, ThreeChichas1 };
