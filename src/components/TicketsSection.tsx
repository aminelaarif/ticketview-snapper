import { useState } from "react";
import { TicketCard } from "./TicketCard";
import { TicketModal } from "./TicketModal";
import { Ticket, TicketState } from "@/types/ticket";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for demonstration
const mockTickets: Ticket[] = [
  {
    id: "1",
    title: "Unable to access dashboard",
    description: "Users are reporting issues accessing the main dashboard. The page loads indefinitely without showing any content.\n\nSteps to reproduce:\n1. Log in to the application\n2. Navigate to dashboard\n3. Observe loading state",
    dateOpened: "2024-03-20",
    state: "open",
  },
  {
    id: "2",
    title: "Update user profile picture",
    description: "Need to implement the ability for users to update their profile pictures. Should support JPG and PNG formats.",
    dateOpened: "2024-03-19",
    state: "in_progress",
  },
  {
    id: "3",
    title: "Fix payment processing bug",
    description: "Payment processing was failing for international transactions. Issue has been resolved by updating the payment gateway configuration.",
    dateOpened: "2024-03-15",
    state: "closed",
  },
];

export const TicketsSection = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newer" | "older">("newer");
  const [stateFilter, setStateFilter] = useState<TicketState | "all">("all");

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const filteredAndSortedTickets = mockTickets
    .filter((ticket) => stateFilter === "all" || ticket.state === stateFilter)
    .sort((a, b) => {
      const dateA = new Date(a.dateOpened).getTime();
      const dateB = new Date(b.dateOpened).getTime();
      return sortOrder === "newer" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Tickets</h2>
        <p className="mt-2 text-gray-500">Manage and track support requests</p>
      </div>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "newer" | "older")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newer">Newest First</SelectItem>
              <SelectItem value="older">Oldest First</SelectItem>
            </SelectContent>
          </Select>
          <Select value={stateFilter} onValueChange={(value) => setStateFilter(value as TicketState | "all")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-gray-500">
          Showing {filteredAndSortedTickets.length} tickets
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onClick={() => handleTicketClick(ticket)}
          />
        ))}
      </div>
      <TicketModal
        ticket={selectedTicket}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};