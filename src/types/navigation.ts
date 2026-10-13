export type PageStatus = "completed" | "in_progress" | "pending";

export interface PageNode {
  id: string;
  title: string;
  nodeId?: string;
  status: PageStatus;
  badge?: string;
  description?: string;
}

export interface SectionNode {
  id: string;
  title: string;
  icon?: string;
  pages: PageNode[];
}
