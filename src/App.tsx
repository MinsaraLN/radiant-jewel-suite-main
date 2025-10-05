import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BranchManagement from "./pages/admin/BranchManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import ServiceRequests from "./pages/admin/ServiceRequests";
import UserManagement from "./pages/admin/UserManagement";
import ReviewManagement from "./pages/admin/ReviewManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="branches" element={<BranchManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="requests" element={<ServiceRequests />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="reviews" element={<ReviewManagement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
