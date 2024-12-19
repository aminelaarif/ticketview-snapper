export type TicketState = "open" | "in_progress" | "closed";

export interface TicketResponse {
  id: string;
  content: string;
  timestamp: string;
  userId: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  dateOpened: string;
  state: TicketState;
  responses?: TicketResponse[];
}