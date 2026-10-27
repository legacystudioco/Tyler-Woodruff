import type { StackItem } from "@/components/case-studies/shared/ProductStack";

const base = "/assets/hi-vibe";

export const hiVibeAssets = {
  storefrontHome: { type: "image" as const, src: `${base}/storefront-home.jpg`, alt: "HI-VIBE Shopify storefront home" },
  productPage: { type: "image" as const, src: `${base}/product-page.jpg`, alt: "HI-VIBE product page" },
  configurator: { type: "image" as const, src: `${base}/product-configurator.jpg`, alt: "HI-VIBE product configuration flow" },
  portalSignin: { type: "image" as const, src: `${base}/portal-signin.jpg`, alt: "HI-VIBE Portal sign-in screen" },
  portalDashboard: { type: "image" as const, src: `${base}/portal-dashboard.jpg`, alt: "HI-VIBE Portal member dashboard" },
  portalProgram: { type: "image" as const, src: `${base}/portal-program.jpg`, alt: "HI-VIBE Portal guided program content" },
  portalJournal: { type: "image" as const, src: `${base}/portal-journal.jpg`, alt: "HI-VIBE Portal journaling feature" },
  portalCommunity: { type: "image" as const, src: `${base}/portal-community.jpg`, alt: "HI-VIBE Portal community feature" },
};

export const roleMeta = {
  title: "Brand Integrator",
  org: "HI-VIBE",
  term: "Remote Contract · August 2026–Present",
};

export const commerceStack: StackItem[] = [
  { id: "storefront", chrome: "browser", screen: "site", label: "Storefront Home", media: hiVibeAssets.storefrontHome, accent: "signal", top: "24%", left: "20%", width: 300, height: 190, rotate: -3, z: 2 },
  { id: "product", chrome: "browser", screen: "detail", label: "Product Page", media: hiVibeAssets.productPage, accent: "signal", top: "60%", left: "16%", width: 260, height: 200, rotate: 2, z: 3 },
  { id: "configurator", chrome: "browser", screen: "config", label: "Product Configuration", media: hiVibeAssets.configurator, accent: "electric", top: "26%", left: "62%", width: 300, height: 200, rotate: 2, z: 4 },
];

export const portalScreens = [
  { id: "signin", label: "Member Sign-In", media: hiVibeAssets.portalSignin, screen: "form" as const },
  { id: "dashboard", label: "Member Dashboard", media: hiVibeAssets.portalDashboard, screen: "dashboard" as const },
  { id: "program", label: "Guided Program", media: hiVibeAssets.portalProgram, screen: "detail" as const },
  { id: "journal", label: "Journaling", media: hiVibeAssets.portalJournal, screen: "form" as const },
  { id: "community", label: "Community", media: hiVibeAssets.portalCommunity, screen: "cards" as const },
];
