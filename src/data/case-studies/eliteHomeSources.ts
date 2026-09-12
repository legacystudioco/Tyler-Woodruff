import type { StackItem } from "@/components/case-studies/shared/ProductStack";
import type { Annotation } from "@/components/case-studies/shared/AnnotatedInterface";
import type { FlowStep } from "@/components/case-studies/shared/SystemFlow";

const base = "/assets/elite-home-sources";

export const eliteAssets = {
  publicSite: { type: "image" as const, src: `${base}/public-site.jpg`, alt: "Elite Home Sources public website" },
  appointmentRequest: { type: "image" as const, src: `${base}/appointment-request.jpg`, alt: "Appointment request flow" },
  adminDashboard: { type: "image" as const, src: `${base}/admin-dashboard.jpg`, alt: "Admin dashboard" },
  calendar: { type: "image" as const, src: `${base}/calendar.jpg`, alt: "Scheduling calendar" },
  appointmentDetail: { type: "image" as const, src: `${base}/appointment-detail.jpg`, alt: "Appointment detail interface" },
  messaging: { type: "image" as const, src: `${base}/messaging.jpg`, alt: "Customer messaging" },
  billing: { type: "image" as const, src: `${base}/billing.jpg`, alt: "Billing workflow" },
  mobile: { type: "image" as const, src: `${base}/mobile.jpg`, alt: "Mobile crew view" },
};

export const stackItems: StackItem[] = [
  { id: "site", chrome: "browser", screen: "site", label: "Public Site", media: eliteAssets.publicSite, accent: "signal", top: "24%", left: "20%", width: 300, height: 190, rotate: -3, z: 2 },
  { id: "request", chrome: "browser", screen: "form", label: "Appointment Request", media: eliteAssets.appointmentRequest, accent: "signal", top: "58%", left: "12%", width: 220, height: 200, rotate: 2, z: 3 },
  { id: "dashboard", chrome: "browser", screen: "dashboard", label: "Admin Dashboard", media: eliteAssets.adminDashboard, accent: "electric", top: "22%", left: "58%", width: 320, height: 210, rotate: 2, z: 4 },
  { id: "calendar", chrome: "browser", screen: "calendar", label: "Calendar", media: eliteAssets.calendar, accent: "electric", top: "62%", left: "72%", width: 230, height: 190, rotate: -2, z: 3 },
  { id: "messaging", chrome: "mobile", screen: "chat", label: "Messaging", media: eliteAssets.messaging, accent: "heat", top: "82%", left: "40%", width: 140, height: 220, rotate: 4, z: 5 },
  { id: "billing", chrome: "browser", screen: "table", label: "Billing", media: eliteAssets.billing, accent: "signal", top: "12%", left: "84%", width: 220, height: 160, rotate: 3, z: 1 },
];

export const problemItems = ["Scheduling", "Customer communication", "Store coordination", "Job management", "Billing", "Follow-up"];

export const designedItems = [
  "Customer experience",
  "Appointment workflow",
  "Admin interface",
  "Scheduling system",
  "Messaging architecture",
  "Billing workflow",
  "Store partner workflow",
];

export const builtAnnotations: Annotation[] = [
  { label: "Primary job actions", top: "18%", side: "right" },
  { label: "Communication history", top: "42%", side: "right" },
  { label: "Billing state", top: "68%", side: "right" },
  { label: "Customer information", top: "24%", side: "left" },
  { label: "Operational status", top: "58%", side: "left" },
];

export const systemFlow: FlowStep[] = [
  { label: "Customer" },
  { label: "Appointment Request" },
  { label: "Admin" },
  { label: "Calendar" },
  { label: "SMS / Email" },
  { label: "Crew" },
  { label: "Completion" },
  { label: "Billing" },
  { label: "Review" },
];
