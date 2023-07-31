// import Swiper bundle with all modules installed
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// init Swiper:
export const initSwiper = (el: string, params: any) =>
  new Swiper(el, {
    ...params,
    // configure Swiper to use modules
    modules: [Navigation, Pagination],
  });
