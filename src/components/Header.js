import logo from "../assets/logo.svg";
const Header = () => {
  return (
    <div className="relative">
      <p className="text-white text-3xl uppercase font-bold ">
        <img
          src={logo}
          alt="logo"
          className="w-[26px] inline-block -mt-2 mr-2"
        />
        Place insights
      </p>
      <p className="text-slate-400  mb-4">
        Get AI based insights of any popular restaraunt or place you would like
        to visit
      </p>
    </div>
  );
};

export default Header;
