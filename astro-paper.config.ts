import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://thokchomlolet03-cpu.github.io/my-tech-blog",
    title: "Friction Hunter",
    description: "Engineering, system architecture, site reliability, and the neuroscience of learning.",
    author: "Thokchom Lolet Singh",
    profile: "https://github.com/thokchomlolet03-cpu",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "UTC",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/thokchomlolet03-cpu/my-tech-blog/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/thokchomlolet03-cpu" },
    { name: "x",        url: "https://x.com/lolet03" },
    { name: "linkedin", url: "https://www.linkedin.com/in/thokchom-lolet-singh-b77341b2/" },
    { name: "mail",     url: "mailto:thokchom.lolet03@gmail.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
