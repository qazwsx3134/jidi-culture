type ShowcaseData = {
  [key: string]: {
    title: string;
    subTitle: string;
    heroImage: {
      src: string;
      alt: string;
      height: number;
      width: number;
    };
    projectType: string[];
    visualDesigner: string;
    projectManagement: string;
    guidanceUnit: string[];
    hostUnit: string[];
    cooperationUnit: string[];
    paragraph: {
      title: string;
      content: string[];
    };
    images: {
      src: string;
      alt: string;
      overlay: {
        title: string;
        content: string;
      };
      height: number;
      width: number;
    }[];
  };
};

export const showcaseData: ShowcaseData = {
  testId: {
    title: "原住民族傳統智慧",
    subTitle: "創作保護人才培育戲系列講座",
    heroImage: {
      src: "/images/showcase/test/hero.png",
      alt: "Hero Image 1",
      height: 800,
      width: 1440,
    },
    projectType: ["Type 1", "Type 2"],
    visualDesigner: "黃楚甯 - 英文名字",
    projectManagement: "柯哲瑜 - Yuri Yuko",
    guidanceUnit: ["原住民委員會"],
    hostUnit: ["國立成功大學台灣語文系"],
    cooperationUnit: ["國立成功大學原住民族學生資源中心"],
    paragraph: {
      title: "Paragraph Title 1",
      content: ["Paragraph Content 1", "Paragraph Content 2"],
    },
    images: [
      {
        src: "/images/showcase/test/1.png",
        alt: "Image 1",
        overlay: {
          title: "Image Title 1",
          content: "Image Content 1 Image Content 1Image Content 1Image Content 1Image Content 1Image Content 1Image Content 1Image Content 1",
        },
        height: 500,
        width: 354,
      },
      {
        src: "/images/showcase/test/2.png",
        alt: "Image 2",
        overlay: {
          title: "Image Title 2",
          content: "Image Content 2",
        },
        height: 500,
        width: 354,
      },
      {
        src: "/images/showcase/test/3.png",
        alt: "Image 3",
        overlay: {
          title: "Image Title 3",
          content: "Image Content 3",
        },
        height: 500,
        width: 354,
      },
      {
        src: "/images/showcase/test/4.png",
        alt: "Image 4",
        overlay: {
          title: "Image Title 4",
          content: "Image Content 4",
        },
        height: 500,
        width: 354,
      },
      {
        src: "/images/showcase/test/hero.png",
        alt: "Hero Image 1",
        overlay: {
          title: "Image Title 4",
          content: "Image Content 4",
        },
        height: 800,
        width: 1440,
      },
    ],
  },
};
