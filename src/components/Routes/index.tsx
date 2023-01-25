import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/wallet" component={Wallet} />
      <Route path="/no-wallet" component={NoWallet} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent
