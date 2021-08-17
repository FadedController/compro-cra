export type ticket = {
  createdBy: string;
  asignedTo: string;
  createdAt: number;
  department: string;
  ticketId?: string;
  priority: priority;
  status: status;
  category: string;
  description: string;
};

export type priority = "low" | "medium" | "high" | "critic";
export type status = "pending" | "ongoing" | "done";
