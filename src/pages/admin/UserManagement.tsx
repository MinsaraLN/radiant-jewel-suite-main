import { useState } from "react";
import { Plus, Pencil, Trash2, Users as UsersIcon, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import UserFormModal from "@/components/admin/UserFormModal";
import RoleFormModal from "@/components/admin/RoleFormModal";
import DeleteConfirmDialog from "@/components/admin/DeleteConfirmDialog";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: "Active" | "Inactive";
  lastLogin: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  userCount: number;
  permissions: string[];
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      firstName: "Admin",
      lastName: "User",
      email: "admin@newkalyani.com",
      phone: "+91 98765 43210",
      role: "Super Admin",
      status: "Active",
      lastLogin: "2025-01-05"
    },
    {
      id: "2",
      firstName: "Rajesh",
      lastName: "Kumar",
      email: "rajesh@newkalyani.com",
      phone: "+91 98765 43211",
      role: "Store Manager",
      status: "Active",
      lastLogin: "2025-01-04"
    }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Super Admin",
      description: "Full access to all features",
      color: "#2F4156",
      userCount: 1,
      permissions: ["all"]
    },
    {
      id: "2",
      name: "Store Manager",
      description: "Manage products, branches, and customer requests",
      color: "#576C8D",
      userCount: 3,
      permissions: ["branches", "products", "requests", "reviews"]
    },
    {
      id: "3",
      name: "Product Manager",
      description: "Manage product catalog and reviews",
      color: "#C0D9E6",
      userCount: 2,
      permissions: ["products", "reviews"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<"user" | "role">("user");
  const [itemToDelete, setItemToDelete] = useState<User | Role | null>(null);

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (userData: Omit<User, "id" | "lastLogin">) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      lastLogin: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUser]);
    toast.success("User added successfully");
    setUserModalOpen(false);
  };

  const handleEditUser = (userData: Omit<User, "id" | "lastLogin">) => {
    if (editingUser) {
      setUsers(users.map(u =>
        u.id === editingUser.id ? { ...userData, id: u.id, lastLogin: u.lastLogin } : u
      ));
      toast.success("User updated successfully");
      setEditingUser(null);
      setUserModalOpen(false);
    }
  };

  const handleAddRole = (roleData: Omit<Role, "id" | "userCount">) => {
    const newRole = {
      ...roleData,
      id: Date.now().toString(),
      userCount: 0
    };
    setRoles([...roles, newRole]);
    toast.success("Role created successfully");
    setRoleModalOpen(false);
  };

  const handleEditRole = (roleData: Omit<Role, "id" | "userCount">) => {
    if (editingRole) {
      setRoles(roles.map(r =>
        r.id === editingRole.id ? { ...roleData, id: r.id, userCount: r.userCount } : r
      ));
      toast.success("Role updated successfully");
      setEditingRole(null);
      setRoleModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (deleteType === "user" && itemToDelete) {
      setUsers(users.filter(u => u.id !== itemToDelete.id));
      toast.success("User deleted successfully");
    } else if (deleteType === "role" && itemToDelete) {
      setRoles(roles.filter(r => r.id !== itemToDelete.id));
      toast.success("Role deleted successfully");
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">User & Role Management</h1>
          <p className="text-muted-foreground mt-1">Manage admin users and permission roles</p>
        </div>
        <Button
          onClick={() => {
            if (activeTab === "users") {
              setEditingUser(null);
              setUserModalOpen(true);
            } else {
              setEditingRole(null);
              setRoleModalOpen(true);
            }
          }}
          size="lg"
          variant="hero"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New {activeTab === "users" ? "User" : "Role"}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        {/* Search */}
        <div className="mt-4">
          <Input
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-6 card-shadow hover:elegant-shadow transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {user.firstName[0]}{user.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{user.firstName} {user.lastName}</h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {user.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p>Last login: {new Date(user.lastLogin).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => { setEditingUser(user); setUserModalOpen(true); }}
                  >
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDeleteType("user");
                      setItemToDelete(user);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredRoles.map((role) => (
              <Card key={role.id} className="p-6 card-shadow hover:elegant-shadow transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${role.color}20` }}>
                      <Shield className="h-5 w-5" style={{ color: role.color }} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{role.name}</h3>
                      <p className="text-sm text-muted-foreground">{role.userCount} users</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

                <div className="mb-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">PERMISSIONS</p>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map((perm, idx) => (
                      <span key={idx} className="px-2 py-1 bg-muted rounded text-xs">
                        {perm}
                      </span>
                    ))}
                    {role.permissions.length > 3 && (
                      <span className="px-2 py-1 bg-muted rounded text-xs">
                        +{role.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => { setEditingRole(role); setRoleModalOpen(true); }}
                  >
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDeleteType("role");
                      setItemToDelete(role);
                      setDeleteDialogOpen(true);
                    }}
                    disabled={role.userCount > 0}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <UserFormModal
        isOpen={userModalOpen}
        onClose={() => { setUserModalOpen(false); setEditingUser(null); }}
        onSubmit={editingUser ? handleEditUser : handleAddUser}
        initialData={editingUser || undefined}
        availableRoles={roles.map(r => r.name)}
      />

      <RoleFormModal
        isOpen={roleModalOpen}
        onClose={() => { setRoleModalOpen(false); setEditingRole(null); }}
        onSubmit={editingRole ? handleEditRole : handleAddRole}
        initialData={editingRole || undefined}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => { setDeleteDialogOpen(false); setItemToDelete(null); }}
        onConfirm={handleDelete}
        title={`Delete ${deleteType === "user" ? "User" : "Role"}`}
        description={`Are you sure you want to delete ${
          deleteType === "user"
            ? `${(itemToDelete as User)?.firstName} ${(itemToDelete as User)?.lastName}`
            : (itemToDelete as Role)?.name
        }? This action cannot be undone.`}
      />
    </div>
  );
}
