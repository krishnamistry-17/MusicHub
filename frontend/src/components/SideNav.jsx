import React from "react";
import ExploreIcon from "@mui/icons-material/Explore";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Folder from "@mui/icons-material/Folder";
import { NavLink, Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import RippleButton from "ripple-effect-reactjs";
import { useSelector, useDispatch } from "react-redux";
import { ToggleSideNavSidebar } from "../redux/slice/playerSlicer";

const SideNav = () => {
  const { SideNavbar } = useSelector((state) => state.player);
  const { islogged } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const HandleSideNav = () => {
    dispatch(ToggleSideNavSidebar());
  };

  return (
    <div className={"float-left w-52 h-[26rem] max-md:w-0 select-none"}>
      <div
        className={
          "bg-lightBlue text-darkTextColor top-0 w-52 transition-all duration-200 ease-linear fixed z-50 h-full py-10 " +
          (SideNavbar ? "max-md:w-64 left-0" : "max-md:-left-52")
        }
      >
        <section className="px-7 max-md:px-10">
          <section className="scale-105">
            {/* Added MusicHub text */}
            <h1 className="text-2xl font-bold text-white">MusicHub !</h1>
          </section>

          <section className="mt-6">
            <h3 className="uppercase font-Rubik font-medium tracking-wider max-md:text-lg text-sm">
              Menu
            </h3>
            <ul className="flex flex-col gap-6 mt-5">
              {/* <NavLink
                onClick={HandleSideNav}
                to={"/"}
                className="flex items-center gap-4 text-sm max-md:text-base font-medium"
              >
                <ExploreIcon />
                Discover
              </NavLink> */}
              <NavLink
                onClick={HandleSideNav}
                to={"/topartist"}
                className="flex items-center gap-4 text-sm max-md:text-base font-medium"
              >
                <AccountBoxIcon />
                Top Artists
              </NavLink>
              <NavLink
                onClick={HandleSideNav}
                to={"topplaylists/Hindi"}
                className="flex items-center gap-4 text-sm max-md:text-base font-medium"
              >
                <AssessmentIcon />
                Top Playlists
              </NavLink>
            </ul>
          </section>
        </section>

        <hr className="bg-darkTextColor h-[0.8px] opacity-10 my-6 px-7" />

        <section className="px-7 max-md:px-10">
          <h3 className="uppercase font-Rubik font-medium tracking-wider text-sm">
            Library
          </h3>
          <ul className="flex flex-col gap-6 mt-5">
            <NavLink
              onClick={HandleSideNav}
              to={"/downloads"}
              className="flex items-center gap-4 text-sm max-md:text-base font-medium"
            >
              <Folder />
              Downloads
            </NavLink>
            <NavLink
              onClick={HandleSideNav}
              to={"/recentsongs"}
              className="flex items-center gap-4 text-sm max-md:text-base font-medium"
            >
              <DonutSmallIcon />
              Recent
            </NavLink>
            <NavLink
              onClick={HandleSideNav}
              to={"/userplaylists"}
              className="flex items-center gap-4 text-sm max-md:text-base font-medium"
            >
              <SubscriptionsIcon />
              Your Playlists
            </NavLink>
            <NavLink
              onClick={HandleSideNav}
              to={"/favoritessongs"}
              className="flex items-center gap-4 text-sm max-md:text-base font-medium"
            >
              <FavoriteIcon /> Favorites
            </NavLink>
          </ul>
        </section>

        <hr className="bg-darkTextColor h-[0.8px] opacity-10 my-6 px-7" />

        <section className="px-7 max-md:px-10 mt-5">
          <ul className="flex flex-col gap-6 mt-2">
            <NavLink
              onClick={HandleSideNav}
              to={"/about"}
              className="flex items-center gap-4 text-sm max-md:text-base font-medium"
            >
              <InfoIcon /> Help & Support
            </NavLink>
          </ul>
        </section>

        <div className="absolute bottom-0 flex justify-center right-0 left-0">
          <a
            className="text-xs"
            href="https://twitter.com/immdipu"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            {/* Optional: Add your own Twitter link or remove if not needed */}
          </a>
        </div>

        
      </div>

      <div
        className={
          "fixed z-30 h-full max-md:block hidden top-0 w-full bg-[#0c0c0cc7] transition-all duration-200 ease-in " +
          (SideNavbar ? "visible opacity-100" : "invisible opacity-0")
        }
        onClick={HandleSideNav}
      ></div>
    </div>
  );
};

export default SideNav;
