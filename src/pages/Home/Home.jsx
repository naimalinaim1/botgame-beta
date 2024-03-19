import { useEffect, useState } from "react";
import btnCoins from "../../assets/coins/btn-coins.png";
import Coins from "./section/Coins";
import ClimeDate from "./section/ClimeDate";
import ProcessBar from "./section/ProcessBar";
import SocialMedia from "./section/SocialMedia";
import { loadUserData, updateUserCoin } from "../../utility/utility";

const Home = () => {
  const [coins, setCoins] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [isBoost, setIsBoost] = useState(false);
  const [countClick, setCountClick] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  const animationImg = () => {
    const container = document.getElementById("coin-animation-container");
    container.style.zIndex = "-5555";
    // create image
    const image = document.createElement("img");
    image.className = "-z-[5] animation-img-cls w-14 h-14 absolute";
    image.src = btnCoins;
    image.alt = "Yes Button";

    const randomNum = Math.floor(Math.random() * (60 - 30 + 1)) + 30;
    image.style.top = randomNum + "%";
    image.style.left = randomNum + "%";

    container.appendChild(image);
    setTimeout(() => {
      image.remove();
    }, 2000);
  };

  const tapCoin = () => {
    // image animation
    animationImg();

    setCoins(coins + 1);
    setCountClick(countClick + 1);
    if ((countClick + 1) % 3 === 0) {
      setEnergy((prevEnergy) => Math.max(prevEnergy - 1, 0));
    }

    // boost
    isBoost ? setIsBoost(false) : setTimeout(() => setIsBoost(true), 3000);

    // update user information: coins
    updateUserCoin();
  };

  useEffect(() => {
    if (isBoost) {
      const interval = setInterval(
        () => energy < 1000 && setEnergy((prevEnergy) => prevEnergy + 1),
        500
      );
      return () => clearInterval(interval);
    }
  }, [energy, isBoost]);

  // load users data
  useEffect(() => {
    (async () => {
      const userData = await loadUserData();
      setCoins(userData.points);
    })();
  }, []);

  return (
    <section className="botgame-height-res bg-black h-full text-white">
      <div className="botgame-bg-gradient h-full">
        <div className="relative w-[94%] px-1 max-w-3xl h-full mx-auto lg:pt-10">
          <Coins points={coins} />
          <ClimeDate />
          <div className="w-full absolute top-[60%]  sm:top-[63%] transform -translate-y-1/2 flex justify-center">
            <div className="w-full absolute top-[60%]  sm:top-[63%] transform -translate-y-1/2 flex justify-center">
              {/* coin animation container */}
              <div
                id="coin-animation-container"
                className="w-[300px] h-[300px]"
              ></div>
            </div>
            {isVisible ? (
              <img
                onClick={tapCoin}
                className="z-[10] w-[140px] h-[140px] xs:w-[170px] xs:h-[170px] sm:w-[242px] sm:h-[251px]"
                src={btnCoins}
                alt="Yes Button"
              />
            ) : (
              <img
                className="z-[10] w-[140px] h-[140px] xs:w-[170px] xs:h-[170px] sm:w-[242px] sm:h-[251px]"
                src={btnCoins}
                alt="Yes Button"
              />
            )}
          </div>
          <div className="w-full absolute bottom-2 sm:bottom-6 lg:bottom-8">
            <SocialMedia energy={energy} />
            <ProcessBar energy={energy} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
