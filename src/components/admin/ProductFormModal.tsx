import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProductFormData {
  name: string;
  sku: string;
  category: string;
  collection: string;
  metalType: string;
  purity: string;
  weight: number;
  price: number;
  image: string;
  status: "Published" | "Draft" | "Out of Stock";
}

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  initialData?: ProductFormData;
}

export default function ProductFormModal({ isOpen, onClose, onSubmit, initialData }: ProductFormModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    sku: "",
    category: "Rings",
    collection: "Bridal",
    metalType: "Gold",
    purity: "22K",
    weight: 0,
    price: 0,
    image: "/src/assets/product-1.jpg",
    status: "Published"
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        sku: "",
        category: "Rings",
        collection: "Bridal",
        metalType: "Gold",
        purity: "22K",
        weight: 0,
        price: 0,
        image: "/src/assets/product-1.jpg",
        status: "Published"
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    if (formData.weight <= 0) newErrors.weight = "Weight must be greater than 0";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";

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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">
            {initialData ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Diamond Engagement Ring"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="sku">SKU *</Label>
              <Input
                id="sku"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="NK-R-001"
                className={errors.sku ? "border-destructive" : ""}
              />
              {errors.sku && <p className="text-xs text-destructive mt-1">{errors.sku}</p>}
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rings">Rings</SelectItem>
                  <SelectItem value="Necklaces">Necklaces</SelectItem>
                  <SelectItem value="Earrings">Earrings</SelectItem>
                  <SelectItem value="Bracelets">Bracelets</SelectItem>
                  <SelectItem value="Bangles">Bangles</SelectItem>
                  <SelectItem value="Chains">Chains</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="collection">Collection *</Label>
              <Select value={formData.collection} onValueChange={(value) => setFormData({ ...formData, collection: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bridal">Bridal</SelectItem>
                  <SelectItem value="Traditional">Traditional</SelectItem>
                  <SelectItem value="Modern">Modern</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                  <SelectItem value="Daily Wear">Daily Wear</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="metalType">Metal Type *</Label>
              <Select value={formData.metalType} onValueChange={(value) => setFormData({ ...formData, metalType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Diamond">Diamond</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="purity">Purity *</Label>
              <Select value={formData.purity} onValueChange={(value) => setFormData({ ...formData, purity: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24K">24K</SelectItem>
                  <SelectItem value="22K">22K</SelectItem>
                  <SelectItem value="18K">18K</SelectItem>
                  <SelectItem value="14K">14K</SelectItem>
                  <SelectItem value="925 Sterling">925 Sterling</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="weight">Weight (grams) *</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={formData.weight || ""}
                onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                placeholder="5.2"
                className={errors.weight ? "border-destructive" : ""}
              />
              {errors.weight && <p className="text-xs text-destructive mt-1">{errors.weight}</p>}
            </div>

            <div>
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                placeholder="125000"
                className={errors.price ? "border-destructive" : ""}
              />
              {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value: "Published" | "Draft" | "Out of Stock") => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="hero">
              {initialData ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
