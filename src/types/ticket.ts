export type TicketState = "open" | "in_progress" | "closed";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  dateOpened: string;
  state: TicketState;
}