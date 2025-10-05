import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BranchFormData {
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

interface BranchFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BranchFormData) => void;
  initialData?: BranchFormData;
}

export default function BranchFormModal({ isOpen, onClose, onSubmit, initialData }: BranchFormModalProps) {
  const [formData, setFormData] = useState<BranchFormData>({
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    email: "",
    hours: "Mon-Sat: 10AM-8PM, Sun: Closed",
    status: "Active"
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BranchFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
        email: "",
        hours: "Mon-Sat: 10AM-8PM, Sun: Closed",
        status: "Active"
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BranchFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Branch name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">
            {initialData ? "Edit Branch" : "Add New Branch"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name">Branch Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="New Kalyani Jewellers - Location"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main Street"
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
            </div>

            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Mumbai"
                className={errors.city ? "border-destructive" : ""}
              />
              {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
            </div>

            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="Maharashtra"
                className={errors.state ? "border-destructive" : ""}
              />
              {errors.state && <p className="text-xs text-destructive mt-1">{errors.state}</p>}
            </div>

            <div>
              <Label htmlFor="postalCode">Postal Code *</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                placeholder="400001"
                className={errors.postalCode ? "border-destructive" : ""}
              />
              {errors.postalCode && <p className="text-xs text-destructive mt-1">{errors.postalCode}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 22 1234 5678"
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="branch@newkalyani.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="hours">Operating Hours</Label>
              <Input
                id="hours"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                placeholder="Mon-Sat: 10AM-8PM, Sun: Closed"
              />
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value: "Active" | "Inactive") => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="hero">
              {initialData ? "Update Branch" : "Add Branch"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
