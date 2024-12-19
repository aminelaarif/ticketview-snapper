export type ActionType = "ticket_created" | "ticket_updated" | "ticket_closed" | "ticket_response";

export interface ActionLog {
  id: string;
  actionType: ActionType;
  timestamp: string;
  performedBy: string;
  ticketId: string;
  details?: string;
}