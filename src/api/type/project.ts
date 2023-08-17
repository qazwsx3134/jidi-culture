import type { Image } from "./image";
import type { SEO } from "./seo";
import type { Timestamp } from "./timestamp";

export interface Project {
  id: string;
  attributes: ProjectAttributes & Timestamp;
}

export interface ProjectAttributes {
  id: string;
  slug: string;
  title: string;
  subTitle: string;
  heroImage: {
    data: Image | null;
  };
  images: {
    data: Image[] | null;
  };
  artDesign?: string;
  projectManager?: string;
  guidanceUnit?: string;
  hostUnit?: string;
  cooperationUnit?: string;
  description?: string;
  project_types?: {
    data: ProjectTypes[];
  };
  seo: SEO[];
}

export interface ProjectTypes {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}
