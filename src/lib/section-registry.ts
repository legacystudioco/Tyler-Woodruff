import { ComponentType } from "react";

export interface SectionConfig {
  id: string;
  order: number;
  component: ComponentType;
}

class SectionRegistryClass {
  private sections: Map<string, SectionConfig> = new Map();

  register(config: SectionConfig): void {
    this.sections.set(config.id, config);
  }

  unregister(id: string): void {
    this.sections.delete(id);
  }

  get(id: string): SectionConfig | undefined {
    return this.sections.get(id);
  }

  getAll(): SectionConfig[] {
    return Array.from(this.sections.values()).sort((a, b) => a.order - b.order);
  }

  clear(): void {
    this.sections.clear();
  }
}

export const SectionRegistry = new SectionRegistryClass();
