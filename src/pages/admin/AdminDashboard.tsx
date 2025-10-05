import { Building2, Gem, Ticket, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const dashboardCards = [
  {
    id: 1,
    icon: Building2,
    title: "Branch Management",
    description: "Manage boutique locations, operating hours, and contact details",
    link: "/admin/branches",
    color: "text-navy"
  },
  {
    id: 2,
    icon: Gem,
    title: "Product Management",
    description: "Add, edit, and organize jewelry products and collections",
    link: "/admin/products",
    color: "text-teal"
  },
  {
    id: 3,
    icon: Ticket,
    title: "Customer Requests",
    description: "Handle service tickets and custom design inquiries",
    link: "/admin/requests",
    color: "text-sky-blue"
  },
  {
    id: 4,
    icon: Users,
    title: "User & Role Management",
    description: "Create roles and manage admin user permissions",
    link: "/admin/users",
    color: "text-navy"
  },
  {
    id: 5,
    icon: Star,
    title: "Review Management",
    description: "Approve, reject, or moderate customer product reviews",
    link: "/admin/reviews",
    color: "text-teal"
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">
          Welcome back, Admin
        </h1>
        <p className="text-muted-foreground">
          Manage your jewelry store operations from this dashboard
        </p>
      </div>

      {/* Quick Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 card-shadow hover:elegant-shadow transition-all">
          <div className="text-sm text-muted-foreground mb-1">Total Branches</div>
          <div className="text-3xl font-display font-bold text-navy">12</div>
        </Card>
        <Card className="p-6 card-shadow hover:elegant-shadow transition-all">
          <div className="text-sm text-muted-foreground mb-1">Total Products</div>
          <div className="text-3xl font-display font-bold text-teal">248</div>
        </Card>
        <Card className="p-6 card-shadow hover:elegant-shadow transition-all">
          <div className="text-sm text-muted-foreground mb-1">Pending Requests</div>
          <div className="text-3xl font-display font-bold text-sky-blue">7</div>
        </Card>
        <Card className="p-6 card-shadow hover:elegant-shadow transition-all">
          <div className="text-sm text-muted-foreground mb-1">Pending Reviews</div>
          <div className="text-3xl font-display font-bold text-navy">15</div>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => (
          <Link key={card.id} to={card.link}>
            <Card className="p-8 h-full card-shadow hover:elegant-shadow transition-all duration-300 hover:scale-105 cursor-pointer group">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`${card.color} group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-16 h-16" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {card.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
