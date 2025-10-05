import { useState } from "react";
import { Mail, Phone, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface ServiceRequest {
  id: string;
  type: "Service Ticket" | "Custom Design";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subject: string;
  description: string;
  submittedDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Accepted" | "Rejected" | "In Progress" | "Completed";
}

interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest | null;
  onUpdateStatus: (requestId: string, status: ServiceRequest["status"]) => void;
}

export default function RequestDetailsModal({ isOpen, onClose, request, onUpdateStatus }: RequestDetailsModalProps) {
  const [internalNotes, setInternalNotes] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  if (!request) return null;

  const handleSendEmail = () => {
    if (!responseMessage.trim()) {
      toast.error("Please enter a response message");
      return;
    }
    toast.success("Email sent to customer successfully");
    setResponseMessage("");
  };

  const handleStatusUpdate = (newStatus: ServiceRequest["status"]) => {
    onUpdateStatus(request.id, newStatus);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-display">Request Details</DialogTitle>
            <span className="text-sm font-mono text-muted-foreground">{request.id}</span>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Customer Information */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold text-lg">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{request.customerName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{request.customerEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{request.customerPhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="font-medium">{new Date(request.submittedDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                request.type === "Custom Design"
                  ? "bg-teal/20 text-teal"
                  : "bg-sky-blue/20 text-navy"
              }`}>
                {request.type}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                request.priority === "High"
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  : request.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              }`}>
                {request.priority} Priority
              </span>
            </div>

            <div>
              <h3 className="font-display text-2xl font-semibold mb-2">{request.subject}</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{request.description}</p>
            </div>
          </div>

          {/* Status Management */}
          <div className="border-t pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Update Status</Label>
                <Select value={request.status} onValueChange={(value) => handleStatusUpdate(value as ServiceRequest["status"])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Internal Notes (Not visible to customer)</Label>
              <Textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Add internal notes about this request..."
                rows={3}
              />
            </div>
          </div>

          {/* Response Section */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="font-semibold text-lg">Send Response to Customer</h3>
            <div>
              <Label>Email Message</Label>
              <Textarea
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                placeholder="Type your response to the customer..."
                rows={5}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSendEmail} variant="hero">
                <Mail className="mr-2 h-4 w-4" />
                Send Email to Customer
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
