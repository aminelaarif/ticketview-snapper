import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ActionLog, ActionType } from "@/types/action-log";

// Mock data for demonstration
const mockLogs: ActionLog[] = [
  {
    id: "1",
    actionType: "ticket_created",
    timestamp: "2024-03-20T10:30:00Z",
    performedBy: "John Doe",
    ticketId: "1",
    details: "Created ticket: Unable to access dashboard",
  },
  {
    id: "2",
    actionType: "ticket_response",
    timestamp: "2024-03-20T11:15:00Z",
    performedBy: "Support Team",
    ticketId: "1",
    details: "Added response: Investigating the issue",
  },
  {
    id: "3",
    actionType: "ticket_closed",
    timestamp: "2024-03-15T14:20:00Z",
    performedBy: "System",
    ticketId: "3",
    details: "Automatically closed ticket: Payment processing bug",
  },
];

const actionTypeLabels: Record<ActionType, string> = {
  ticket_created: "Ticket Created",
  ticket_updated: "Ticket Updated",
  ticket_closed: "Ticket Closed",
  ticket_response: "Ticket Response",
};

export const ActionLogSection = () => {
  const [filterType, setFilterType] = useState<ActionType | "all">("all");

  const filteredLogs = mockLogs
    .filter((log) => filterType === "all" || log.actionType === filterType)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Action Log</h2>
        <p className="mt-2 text-gray-500">Track all ticket-related activities</p>
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-500">
          Showing {filteredLogs.length} actions
        </div>
        <Select
          value={filterType}
          onValueChange={(value) => setFilterType(value as ActionType | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            {Object.entries(actionTypeLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Action</TableHead>
              <TableHead className="font-semibold">Timestamp</TableHead>
              <TableHead className="font-semibold">Performed By</TableHead>
              <TableHead className="font-semibold">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="font-medium text-primary">
                  {actionTypeLabels[log.actionType]}
                </TableCell>
                <TableCell className="text-gray-600">
                  {format(new Date(log.timestamp), "MMM d, yyyy HH:mm")}
                </TableCell>
                <TableCell className="text-gray-600">{log.performedBy}</TableCell>
                <TableCell className="text-gray-600">{log.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};