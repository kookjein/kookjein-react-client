import React, { useState, useContext } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { AuthContext } from "../../context/authContext";
import DefaultImage from "../../assets/default-profile.png";
import { useOnOutsideClick } from "../../utils/useOnOutsideClick";

const ProfileButton = () => {
  const { userState } = useContext(AuthContext);
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const { innerBorderRef } = useOnOutsideClick(() => setDropdownVisibility(false));

  const Dropdown = ({ button, dropdown }) => {
    return (
      <div className="relative flex">
        {button}
        {dropdownVisibility && (
          <article
            ref={innerBorderRef}
            className={`absolute top-10 -right-2 sm:right-0 shadow-xl rounded-lg ring-1 ring-gray-200 bg-white`}
          >
            {dropdown}
          </article>
        )}
      </div>
    );
  };

  const Button = () => (
    <button
      onClick={() => setDropdownVisibility(!dropdownVisibility)}
      className="w-9 h-9 rounded-full relative flex items-center justify-center hover:brightness-110"
    >
      <img
        src={userState.user.userImage || DefaultImage}
        className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative flex items-center justify-center object-cover border"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = DefaultImage;
        }}
        alt="Profile"
      />
    </button>
  );

  return <Dropdown button={<Button />} dropdown={<ProfileDropdown />} />;
};

export default ProfileButton;
