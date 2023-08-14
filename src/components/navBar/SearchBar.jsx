import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";
import { AuthContext } from "../../context/authContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const { t } = useTranslation("navBar");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_item");
  const { userState } = useContext(AuthContext);
  const [searchType, setSearchType] = useState("employee");
  const [searchText, setSearchText] = useState(searchQuery);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      search();
    }
  };

  const search = () => {
    navigate(searchType === "employee" ? `/browse-jobs?search_item=${searchText}` : `/browse?search_item=${searchText}`);
  };

  useEffect(() => {
    setSearchText(searchQuery || "");
    return () => {};
  }, [navigate, searchQuery]);

  return (
    <div
      onKeyDown={handleKeyDown}
      className="w-full flex items-center h-9 sm:h-10 justify-center relative max-w-md rounded-full border pl-11 pr-1"
    >
      <input
        className="h-full w-full font-nanum text-xs sm:text-sm pr-3 outline-none rounded-r-full"
        placeholder={userState.user.userType === searchType ? t("placeholderEmployee") : t("placeholderEmployer")}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        onClick={() => (searchType === "employee" ? setSearchType("employer") : setSearchType("employee"))}
        className="h-8 px-4 text-xs flex-shrink-0 flex items-center rounded-full border hover:bg-green-700 hover:text-white bg-gray-100 font-bold"
      >
        {userState.user.userType === searchType ? "프로젝트 검색" : "개발자 검색"}
      </button>
      <button onClick={search} className="flex items-center justify-center">
        <IoSearch className="text-gray-400 w-5 h-5 absolute left-4 cursor-pointer hover:text-green-700" />
      </button>
    </div>
  );
};

export default SearchBar;
