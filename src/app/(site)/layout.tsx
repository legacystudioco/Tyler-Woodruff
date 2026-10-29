import Navigation from "@/components/layout/Navigation";
import VisitTracker from "@/components/analytics/VisitTracker";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <VisitTracker />
    </>
  );
}
