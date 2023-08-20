import type { Image } from "./image";
import type { Timestamp } from "./timestamp";

export interface FooterAttributes {
  companyName: string;
  description: string;
  contactEmail: string;
  contactPhoneNo: string;
  copyRight: string;
  workingHours: string;
  youtubeUrl: string;
  facebookUrl: string;
  image: {
    data: Image | null;
  };
}

export interface Footer {
  id: string;
  attributes: FooterAttributes & Timestamp;
}
