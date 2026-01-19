import "@/lib/register-sections";
import { SectionRegistry } from "@/lib/section-registry";

export function Page() {
  const sections = SectionRegistry.getAll();

  if (sections.length === 0) {
    return (
      <main>
        <p>Tyler Woodruff — Portfolio (WIP)</p>
      </main>
    );
  }

  return (
    <main>
      {sections.map(({ id, component: Section }) => (
        <Section key={id} />
      ))}
    </main>
  );
}
