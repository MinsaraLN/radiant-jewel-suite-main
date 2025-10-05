import { useState } from "react";
import { Plus, Pencil, Trash2, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import BranchFormModal from "@/components/admin/BranchFormModal";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string;
  status: "Active" | "Inactive";
}

export default function BranchManagement() {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: "1",
      name: "New Kalyani Jewellers - Downtown",
      address: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      phone: "+91 22 1234 5678",
      email: "downtown@newkalyani.com",
      hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-6PM",
      status: "Active"
    },
    {
      id: "2",
      name: "New Kalyani Jewellers - Westside",
      address: "456 Park Avenue",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400002",
      phone: "+91 22 2345 6789",
      email: "westside@newkalyani.com",
      hours: "Mon-Sat: 10AM-8PM, Sun: Closed",
      status: "Active"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBranch = (branchData: Omit<Branch, "id">) => {
    const newBranch = {
      ...branchData,
      id: Date.now().toString()
    };
    setBranches([...branches, newBranch]);
    toast.success("Branch added successfully");
    setIsModalOpen(false);
  };

  const handleEditBranch = (branchData: Omit<Branch, "id">) => {
    if (editingBranch) {
      setBranches(branches.map(b =>
        b.id === editingBranch.id ? { ...branchData, id: b.id } : b
      ));
      toast.success("Branch updated successfully");
      setEditingBranch(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteBranch = () => {
    if (branchToDelete) {
      setBranches(branches.filter(b => b.id !== branchToDelete.id));
      toast.success("Branch deleted successfully");
      setDeleteDialogOpen(false);
      setBranchToDelete(null);
    }
  };

  const openEditModal = (branch: Branch) => {
    setEditingBranch(branch);
    setIsModalOpen(true);
  };

  const openDeleteDialog = (branch: Branch) => {
    setBranchToDelete(branch);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Branch Management</h1>
          <p className="text-muted-foreground mt-1">Manage all New Kalyani Jewellers boutique locations</p>
        </div>
        <Button onClick={() => { setEditingBranch(null); setIsModalOpen(true); }} size="lg" variant="hero">
          <Plus className="mr-2 h-5 w-5" />
          Add New Branch
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <Input
          placeholder="Search branches by name or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Branch Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBranches.map((branch) => (
          <Card key={branch.id} className="p-6 card-shadow hover:elegant-shadow transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {branch.name}
                </h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  branch.status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}>
                  {branch.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEditModal(branch)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(branch)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-foreground">{branch.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {branch.city}, {branch.state} {branch.postalCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <p className="text-sm text-foreground">{branch.phone}</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <p className="text-sm text-foreground">{branch.email}</p>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{branch.hours}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredBranches.length === 0 && (
        <Card className="p-12 text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No branches found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search" : "Get started by adding your first branch"}
          </p>
          {!searchTerm && (
            <Button onClick={() => setIsModalOpen(true)} variant="hero">
              <Plus className="mr-2 h-4 w-4" />
              Add First Branch
            </Button>
          )}
        </Card>
      )}

      {/* Modals */}
      <BranchFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingBranch(null); }}
        onSubmit={editingBranch ? handleEditBranch : handleAddBranch}
        initialData={editingBranch || undefined}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => { setDeleteDialogOpen(false); setBranchToDelete(null); }}
        onConfirm={handleDeleteBranch}
        title="Delete Branch"
        description={`Are you sure you want to delete ${branchToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
}
