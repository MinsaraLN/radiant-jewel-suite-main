import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import ProductFormModal from "@/components/admin/ProductFormModal";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface Product {
  id: string;
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

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Diamond Engagement Ring",
      sku: "NK-R-001",
      category: "Rings",
      collection: "Bridal",
      metalType: "Gold",
      purity: "18K",
      weight: 5.2,
      price: 125000,
      image: "/src/assets/product-1.jpg",
      status: "Published"
    },
    {
      id: "2",
      name: "Gold Chain Necklace",
      sku: "NK-N-002",
      category: "Necklaces",
      collection: "Traditional",
      metalType: "Gold",
      purity: "22K",
      weight: 18.5,
      price: 185000,
      image: "/src/assets/product-2.jpg",
      status: "Published"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProduct = (productData: Omit<Product, "id">) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString()
    };
    setProducts([...products, newProduct]);
    toast.success("Product added successfully");
    setIsModalOpen(false);
  };

  const handleEditProduct = (productData: Omit<Product, "id">) => {
    if (editingProduct) {
      setProducts(products.map(p =>
        p.id === editingProduct.id ? { ...productData, id: p.id } : p
      ));
      toast.success("Product updated successfully");
      setEditingProduct(null);
      setIsModalOpen(false);
    }
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
      toast.success("Product deleted successfully");
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Product Catalog</h1>
          <p className="text-muted-foreground mt-1">Manage jewelry products and collections</p>
        </div>
        <Button onClick={() => { setEditingProduct(null); setIsModalOpen(true); }} size="lg" variant="hero">
          <Plus className="mr-2 h-5 w-5" />
          Add New Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Rings">Rings</SelectItem>
            <SelectItem value="Necklaces">Necklaces</SelectItem>
            <SelectItem value="Earrings">Earrings</SelectItem>
            <SelectItem value="Bracelets">Bracelets</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden card-shadow hover:elegant-shadow transition-all group">
            <div className="aspect-square relative overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                product.status === "Published"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : product.status === "Draft"
                  ? "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              }`}>
                {product.status}
              </span>
            </div>
            
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{product.category}</span>
                <span className="text-muted-foreground">{product.metalType} {product.purity}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-lg text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">{product.weight}g</span>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                >
                  <Pencil className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setProductToDelete(product); setDeleteDialogOpen(true); }}
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "Get started by adding your first product"}
          </p>
        </Card>
      )}

      {/* Modals */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingProduct(null); }}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        initialData={editingProduct || undefined}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => { setDeleteDialogOpen(false); setProductToDelete(null); }}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        description={`Are you sure you want to delete ${productToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
}
