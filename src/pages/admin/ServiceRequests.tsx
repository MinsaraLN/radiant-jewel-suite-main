import { useState } from "react";
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import RequestDetailsModal from "@/components/admin/RequestDetailsModal";

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

export default function ServiceRequests() {
  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: "REQ-001",
      type: "Custom Design",
      customerName: "Priya Sharma",
      customerEmail: "priya@example.com",
      customerPhone: "+91 98765 43210",
      subject: "Custom Engagement Ring Design",
      description: "Looking for a custom platinum engagement ring with a 2-carat diamond. Prefer vintage design.",
      submittedDate: "2025-01-05",
      priority: "High",
      status: "Pending"
    },
    {
      id: "REQ-002",
      type: "Service Ticket",
      customerName: "Rahul Patel",
      customerEmail: "rahul@example.com",
      customerPhone: "+91 98765 43211",
      subject: "Ring Resizing Request",
      description: "Need to resize my wedding ring from size 7 to size 6.5",
      submittedDate: "2025-01-04",
      priority: "Medium",
      status: "Accepted"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeTab === "all" || 
                       (activeTab === "service" && request.type === "Service Ticket") ||
                       (activeTab === "custom" && request.type === "Custom Design");
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Accepted": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Rejected": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Completed": return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const handleUpdateStatus = (requestId: string, newStatus: ServiceRequest["status"]) => {
    setRequests(requests.map(req =>
      req.id === requestId ? { ...req, status: newStatus } : req
    ));
    toast.success(`Request ${newStatus.toLowerCase()} successfully`);
  };

  const openDetailsModal = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setDetailsModalOpen(true);
  };

  const statusCounts = {
    all: requests.length,
    pending: requests.filter(r => r.status === "Pending").length,
    accepted: requests.filter(r => r.status === "Accepted").length,
    rejected: requests.filter(r => r.status === "Rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Customer Requests & Service Tickets</h1>
        <p className="text-muted-foreground mt-1">Manage customer inquiries and custom design requests</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="service">Service Tickets</TabsTrigger>
          <TabsTrigger value="custom">Custom Design</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Status Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: "all", label: `All (${statusCounts.all})`, color: "bg-muted" },
          { value: "Pending", label: `Pending (${statusCounts.pending})`, color: "bg-yellow-100 dark:bg-yellow-900/30" },
          { value: "Accepted", label: `Accepted (${statusCounts.accepted})`, color: "bg-green-100 dark:bg-green-900/30" },
          { value: "Rejected", label: `Rejected (${statusCounts.rejected})`, color: "bg-red-100 dark:bg-red-900/30" },
        ].map(status => (
          <Button
            key={status.value}
            variant={statusFilter === status.value ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(status.value)}
            className={statusFilter === status.value ? "" : status.color}
          >
            {status.label}
          </Button>
        ))}
      </div>

      {/* Search */}
      <Input
        placeholder="Search by customer name, email, or request ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      {/* Request Cards */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="p-6 card-shadow hover:elegant-shadow transition-all">
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-muted-foreground">{request.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.type === "Custom Design"
                          ? "bg-teal/20 text-teal"
                          : "bg-sky-blue/20 text-navy"
                      }`}>
                        {request.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority} Priority
                      </span>
                    </div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                      {request.subject}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {request.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Customer:</span>
                    <span>{request.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{request.customerEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{request.customerPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(request.submittedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex lg:flex-col gap-2">
                <Button variant="outline" size="sm" onClick={() => openDetailsModal(request)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {request.status === "Pending" && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(request.id, "Accepted")}
                      className="text-green-600 hover:text-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(request.id, "Rejected")}
                      className="text-red-600 hover:text-red-700"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="p-12 text-center">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No requests found</h3>
          <p className="text-muted-foreground">
            {searchTerm || statusFilter !== "all" ? "Try adjusting your filters" : "No customer requests at the moment"}
          </p>
        </Card>
      )}

      {/* Request Details Modal */}
      <RequestDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => { setDetailsModalOpen(false); setSelectedRequest(null); }}
        request={selectedRequest}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
