import React, { useEffect, useState } from "react";
import Navbar2 from "../components/Navbar2";
import Tags from "../components/Tags";
import ProfileCard from "../components/ProfileCard";
import Footer from "../components/Footer";
import axios from "axios";

const Browse = () => {
  const [dataArray, setDataArray] = useState({});
  useEffect(() => {
    axios
      .get("https://kookjein.s3.ap-northeast-2.amazonaws.com/sample/data.json")
      .then((res) => setDataArray(res.data))
      .catch((e) => console.log(e));
    return () => {};
  }, []);

  const TagsArray = [
    "React Native",
    "Node.js",
    "React.js",
    "Django",
    "C#",
    "Flutter",
    "AWS",
    "Angular.js",
    "Python",
    "Java",
    "HTML/CSS",
    "TailwindCSS",
    "Kubernetes",
    "Docker",
    "php",
    "ASP.net",
    "Wordpress",
    "Firebase",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "iOS Swift",
    "Kotlin",
    "TypeScript",
    "DevOps",
    "Cloud Computing",
    "Laravel",
    "AWS Cloud",
    "Cloud development",
    "Cloud DevOps",
    "Data Architecture",
  ];

  return (
    <div className="w-full h-full flex flex-col items-center min-h-screen overflow-x-hidden">
      <Navbar2 light />
      <div style={{ maxWidth: "1280px" }} className="w-full h-full px-4 flex-shrink-0 pb-32">
        <div className="w-full flex flex-wrap h-full items-center flex-shrink-0 gap-3 py-6">
          {TagsArray.map((item) => (
            <Tags key={item} item={item} />
          ))}
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-4 h-full items-center flex-shrink-0 gap-x-4 gap-y-6 py-6">
          {console.log(Object.entries(dataArray))}
          {Object.entries(dataArray).map((item, index) => (
            <ProfileCard key={index} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
