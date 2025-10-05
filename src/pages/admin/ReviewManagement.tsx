import { useState } from "react";
import { Star, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface Review {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  productImage: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "REV-001",
      customerName: "Anjali Mehta",
      customerEmail: "a***@example.com",
      productName: "Diamond Engagement Ring",
      productImage: "/src/assets/product-1.jpg",
      rating: 5,
      title: "Absolutely Stunning!",
      text: "The craftsmanship is exceptional. My fiancée loves it!",
      date: "2025-01-05",
      status: "Pending"
    },
    {
      id: "REV-002",
      customerName: "Vikram Singh",
      customerEmail: "v***@example.com",
      productName: "Gold Chain Necklace",
      productImage: "/src/assets/product-2.jpg",
      rating: 4,
      title: "Beautiful Quality",
      text: "Great quality gold chain. Worth the investment.",
      date: "2025-01-04",
      status: "Approved"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (reviewId: string, newStatus: Review["status"]) => {
    setReviews(reviews.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
    toast.success(`Review ${newStatus.toLowerCase()} successfully`);
  };

  const handleDeleteReview = () => {
    if (reviewToDelete) {
      setReviews(reviews.filter(r => r.id !== reviewToDelete.id));
      toast.success("Review deleted successfully");
      setDeleteDialogOpen(false);
      setReviewToDelete(null);
    }
  };

  const statusCounts = {
    all: reviews.length,
    pending: reviews.filter(r => r.status === "Pending").length,
    approved: reviews.filter(r => r.status === "Approved").length,
    rejected: reviews.filter(r => r.status === "Rejected").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Customer Review Management</h1>
        <p className="text-muted-foreground mt-1">Moderate and manage product reviews</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { value: "all", label: `All (${statusCounts.all})` },
          { value: "Pending", label: `Pending (${statusCounts.pending})` },
          { value: "Approved", label: `Approved (${statusCounts.approved})` },
          { value: "Rejected", label: `Rejected (${statusCounts.rejected})` },
        ].map(status => (
          <Button
            key={status.value}
            variant={statusFilter === status.value ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(status.value)}
          >
            {status.label}
          </Button>
        ))}
      </div>

      <Input
        placeholder="Search by customer name or product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="p-6 card-shadow hover:elegant-shadow transition-all">
            <div className="flex flex-col lg:flex-row gap-6">
              <img src={review.productImage} alt={review.productName} className="w-24 h-24 object-cover rounded" />
              
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold">{review.title}</h3>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    review.status === "Approved" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                    review.status === "Rejected" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}>
                    {review.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{review.customerName}</span>
                  <span>{review.productName}</span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  {review.status === "Pending" && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(review.id, "Approved")}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(review.id, "Rejected")}>
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                  <Button size="sm" variant="outline" onClick={() => { setReviewToDelete(review); setDeleteDialogOpen(true); }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => { setDeleteDialogOpen(false); setReviewToDelete(null); }}
        onConfirm={handleDeleteReview}
        title="Delete Review"
        description={`Are you sure you want to delete this review? This action cannot be undone.`}
      />
    </div>
  );
}
