import React from "react";
import Navbar2 from "../components/Navbar2";
import Tags from "../components/Tags";
import ProfileCard from "../components/ProfileCard";
import Footer from "../components/Footer";

import Sample1 from "../assets/sample/1.png";
import Sample2 from "../assets/sample/2.png";
import Sample3 from "../assets/sample/3.png";
import Sample4 from "../assets/sample/4.png";
import Sample5 from "../assets/sample/5.png";
import Sample6 from "../assets/sample/6.png";
import Sample7 from "../assets/sample/7.png";
import Sample8 from "../assets/sample/8.png";
import Sample9 from "../assets/sample/9.png";

const Browse = () => {
  const TagsArray = [
    "React Native",
    "Node.js",
    "React.js",
    "Django",
    "C#",
    "Flutter",
    "AWS",
    "Flutter",
    "Angular.js",
    "Python",
    "Java",
    "HTML/CSS",
    "TailwindCSS",
    "Kubernetes",
    "Docker",
    "php",
    "Laravel",
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

  const ExampleArray = [
    {
      id: 0,
      img: Sample1,
      name: "Mohammad Algazali",
      year: "4",
      price: "197",
      intro:
        "I'm a software developer with experience in building scalable and robust web applications.",
      intro_kr:
        "저는 확장 가능하고 견고한 웹 애플리케이션을 구축하는 데 경험이 있는 소프트웨어 개발자입니다.",
    },
    {
      id: 1,
      img: Sample2,
      name: "Sereen Daud",
      year: "7",
      price: "207",
      intro:
        "I'm a full-stack developer with expertise in developing custom software solutions for businesses.",
      intro_kr:
        "저는 비즈니스를 위한 맞춤형 소프트웨어 솔루션을 개발하는 전문성을 갖춘 풀스택 개발자입니다.",
    },
    {
      id: 2,
      img: Sample3,
      name: "Ahmad Safi",
      year: "2",
      price: "200",
      intro:
        "As a mobile app developer, I specialize in creating user-friendly and engaging mobile applications for iOS and Android platforms.",
      intro_kr:
        "저는 모바일 앱 개발자로서, iOS 및 Android 플랫폼을 위한 사용자 친화적이고 매력적인 모바일 애플리케이션을 만드는 데 특화되어 있습니다.",
    },
    {
      id: 3,
      img: Sample4,
      name: "Andre Volchki",
      year: "2",
      price: "203",
      intro:
        "I'm a software engineer with a passion for building intelligent systems that leverage machine learning and AI technologies.",
      intro_kr:
        "저는 기계 학습 및 인공 지능 기술을 활용하는 지능형 시스템을 구축하는 데 열정을 갖춘 소프트웨어 엔지니어입니다.",
    },
    {
      id: 4,
      img: Sample5,
      name: "Samantha Patel",
      year: "1",
      price: "210",
      intro:
        "Hi, I'm a UI/UX developer with experience in designing beautiful and intuitive user interfaces for web and mobile applications.",
      intro_kr:
        "안녕하세요, 웹 및 모바일 애플리케이션을 위한 아름답고 직관적인 사용자 인터페이스를 디자인하는 데 경험이 있는 UI/UX 개발자입니다.",
    },
    {
      id: 5,
      img: Sample6,
      name: "Alexander Rodriguez",
      year: "4",
      price: "230",
      intro:
        "Hey, I'm a blockchain developer with expertise in building decentralized applications using Ethereum and Hyperledger.",
      intro_kr:
        "안녕하세요, 저는 이더리움과 하이퍼레저를 이용한 분산 어플리케이션을 개발하는 분야의 블록체인 개발자입니다.",
    },
    {
      id: 6,
      img: Sample7,
      name: "Isabelle Thompson",
      year: "2",
      price: "197",
      intro:
        "I'm a front-end developer with experience in creating responsive and dynamic web applications using modern technologies like React and Angular.",
      intro_kr:
        "저는 React와 Angular 같은 최신 기술을 이용하여 반응형이며 동적인 웹 어플리케이션을 개발하는 프론트엔드 개발자입니다.",
    },
    {
      id: 7,
      img: Sample8,
      name: "Isabelle Thompson",
      year: "3",
      price: "197",
      intro:
        "As a data scientist and machine learning engineer, I specialize in building predictive models and algorithms that can solve complex business problems.",
      intro_kr:
        "데이터 과학자이자 머신 러닝 엔지니어로서, 복잡한 비즈니스 문제를 해결할 수 있는 예측 모델과 알고리즘을 개발하는 것을 전문으로 합니다.",
    },
    {
      id: 8,
      img: null,
      name: "Saleh Marouf",
      year: "3",
      price: "197",
      intro:
        "Junior full-stack web developer and somebody who already has the skills and qualities to perform his job in an excellent manner. I have years of experience in web development using the latest frameworks and libraries such as Laravel, Node.js, Express.js, Nest.js, React.js, and Next.js. I also have team working and communication skills. and I also have an academic background that added to me  an extra value in this field.",
      intro_kr:
        "주니어 풀스택 웹 개발자로서 이미 우수한 업무 수행 능력과 질적인 역량을 갖춘 사람입니다. 저는 Laravel, Node.js, Express.js, Nest.js, React.js, Next.js와 같은 최신 프레임워크와 라이브러리를 이용한 웹 개발 경험을 갖고 있으며, 팀원으로서의 업무 및 의사소통 능력도 갖추고 있습니다. 또한 학문적 배경을 바탕으로 이 분야에서 추가적인 가치를 창출할 수 있습니다.",
    },
    {
      id: 9,
      img: null,
      name: "Mahmoud AlDabba",
      year: "1",
      price: "197",
      intro:
        "Energetic full-stack web developer, I created web applications that solve real-life problems and hold values in the marketplace with modern technologies, I worked in many teams that I became very adaptive in different working environments, I am a person who enjoys learning from others and teaches others whenever I can, Always looking up to learn more, grow up my skills and I look forward to always being better.",
      intro_kr:
        "열정적인 풀스택 웹 개발자로서, 현대적인 기술을 활용하여 현실적인 문제를 해결하고 시장에서 가치 있는 웹 어플리케이션을 개발해왔습니다.",
    },
    {
      id: 10,
      img: null,
      name: "Abeer Y. Mosameh ",
      year: "1",
      price: "197",
      intro:
        "Graduate Student in Software Development specialty can develop any Systems (Front-end & Back-end) with high performance and quality",
      intro_kr:
        "소프트웨어 개발 분야의 대학원생으로, 고품질 및 높은 성능을 갖춘 모든 시스템 (프론트엔드 및 백엔드)을 개발할 수 있습니다.",
    },
    {
      id: 11,
      img: Sample9,
      name: "Sara T. Alnajjar",
      year: "1",
      price: "197",
      intro:
        "Junior Quality Assurance fresh graduate and a junior of the Quality Assurance field, Enthusiastic about professionalism, with intermediate experience in build mobile applications by flutter, Familiar with many programming languages including HTML5, CSS, JAVA, Kotlin, Dart, C# and I have good ability to deal project management tools such as Jira and Clickup.",
      intro_kr:
        "최근에 졸업한 주니어 품질보증자이며 품질보증 분야에서 주니어입니다. 전문성에 대해 열정적이며, 플러터를 사용하여 모바일 애플리케이션을 빌드하는 중간 경험을 가졌으며, HTML5, CSS, JAVA, Kotlin, Dart, C#을 포함한 많은 프로그래밍 언어에 익숙합니다. 또한 Jira 및 Clickup과 같은 프로젝트 관리 도구를 다루는 능력이 우수합니다.",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center min-h-screen overflow-x-hidden">
      <Navbar2 light />
      <div
        style={{ maxWidth: "1280px" }}
        className="w-full h-full px-4 flex-shrink-0 pb-32"
      >
        <div className="w-full flex flex-wrap h-full items-center flex-shrink-0 gap-3 py-6">
          {TagsArray.map((item) => (
            <Tags key={item} item={item} />
          ))}
        </div>

        <div className="w-full grid grid-cols-4 h-full items-center flex-shrink-0 gap-x-4 gap-y-6 py-6">
          {ExampleArray.map((item) => (
            <ProfileCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
