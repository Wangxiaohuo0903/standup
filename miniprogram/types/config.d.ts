export type Theme = {
    name: string;
    logo: string;
    colors: { primary: string; accent: string; bg: string; text: string; muted: string };
    radius: number;
    elevation: number;
    icons?: Record<string, string>; // activity/special/pin/merch/recommend/upcomingSale...
  };
  
  export type HomeSection =
    | { type: "banner"; dataSource: "home.banners" }
    | {
        type: "entryRow";
        items: Array<{ icon: string; text: string; link: string }>;
      }
    | {
        type: "hscrollEvents";
        title: string;
        dataKey: "upcoming" | "recommended" | "upcomingSale";
      }
    | {
        type: "hscrollMerch";
        title: string;
        dataKey: "merch";
      };
  
  export type HomeSchema = { sections: HomeSection[] };
  export type CopyPack = Record<string, string>;
  export type Features = {
    enableMerch: boolean;
    enableRecommend: boolean;
    enableUpcomingSale: boolean;
  };
  
  export type TenantConfig = {
    id: string;
    theme: Theme;
    copy: CopyPack;
    features: Features;
    homeSchema: HomeSchema;
  };
  