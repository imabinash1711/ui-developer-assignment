// types.ts
export interface Order {
  orderId: string;
  user: string;
  project: string;
  address: string;
  date: string;
  status: "In Progress" | "Complete" | "Pending" | "Approved" | "Rejected";
}
