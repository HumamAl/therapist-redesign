"use client";

import { useState } from "react";
import {
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  Star,
  Monitor,
  MapPin,
  Quote,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  dashboardStats,
  sessions,
  inquiries,
  siteAnalytics,
  testimonials,
} from "@/data/mock-data";
import { formatDate } from "@/lib/formatters";

// ── Stat card config ──
const statCards = [
  {
    label: "Active Clients",
    value: dashboardStats.activeClients,
    icon: Users,
    suffix: "",
  },
  {
    label: "New Inquiries This Week",
    value: dashboardStats.newInquiriesThisWeek,
    icon: MessageSquare,
    suffix: "",
  },
  {
    label: "Sessions This Week",
    value: dashboardStats.sessionsThisWeek,
    icon: Calendar,
    suffix: "",
  },
  {
    label: "Booking Rate",
    value: dashboardStats.bookingRate,
    icon: TrendingUp,
    suffix: "%",
  },
];

// ── Helpers ──
function sessionStatusBadge(status: string) {
  switch (status) {
    case "confirmed":
      return (
        <Badge className="bg-[color:var(--success)]/15 text-[color:var(--success)] border-0">
          Confirmed
        </Badge>
      );
    case "scheduled":
      return (
        <Badge className="bg-primary/15 text-primary border-0">
          Scheduled
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function inquiryStatusBadge(status: string) {
  switch (status) {
    case "new":
      return (
        <Badge className="bg-primary/15 text-primary border-0">New</Badge>
      );
    case "contacted":
      return (
        <Badge className="bg-[color:var(--warning)]/15 text-[color:var(--warning)] border-0">
          Contacted
        </Badge>
      );
    case "scheduled":
      return (
        <Badge className="bg-[color:var(--success)]/15 text-[color:var(--success)] border-0">
          Scheduled
        </Badge>
      );
    case "completed":
      return <Badge variant="secondary">Completed</Badge>;
    case "archived":
      return <Badge variant="secondary">Archived</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

function sourceLabel(source: string) {
  switch (source) {
    case "website":
      return "Website";
    case "psychology-today":
      return "Psychology Today";
    case "google":
      return "Google";
    case "referral":
      return "Referral";
    case "insurance-directory":
      return "Insurance Dir.";
    default:
      return source;
  }
}

// ── Custom Tooltip ──
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; dataKey: string; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-background p-3 shadow-sm">
      <p className="mb-1.5 text-sm font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">
            {entry.dataKey === "visitors" ? "Visitors" : "Inquiries"}:
          </span>
          <span className="font-medium">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ── Page ──
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("sessions");

  // Upcoming sessions — scheduled or confirmed, future dates
  const upcomingSessions = sessions
    .filter(
      (s) =>
        (s.status === "scheduled" || s.status === "confirmed") &&
        new Date(s.date) >= new Date(new Date().toDateString())
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Recent inquiries — sorted by date desc, take 5
  const recentInquiries = [...inquiries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Top 3 testimonials
  const topTestimonials = testimonials.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Practice Overview</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, Javonna &mdash; here&apos;s how your practice is doing
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="animate-fade-in rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-5"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <Icon className="h-4 w-4 text-primary/60" />
              </div>
              <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {stat.value}
                {stat.suffix}
              </p>
            </div>
          );
        })}
      </div>

      {/* Interactive Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="animate-fade-in"
        style={{ animationDelay: "320ms" }}
      >
        <TabsList>
          <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="inquiries">Recent Inquiries</TabsTrigger>
        </TabsList>

        {/* Tab: Upcoming Sessions */}
        <TabsContent value="sessions">
          <Card className="linear-card border-border/60">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingSessions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="py-8 text-center text-muted-foreground"
                      >
                        No upcoming sessions
                      </TableCell>
                    </TableRow>
                  ) : (
                    upcomingSessions.map((session) => (
                      <TableRow key={session.id} className="table-row-hover">
                        <TableCell className="font-medium">
                          {session.clientName}
                        </TableCell>
                        <TableCell>{session.service}</TableCell>
                        <TableCell>{formatDate(session.date)}</TableCell>
                        <TableCell>{session.time}</TableCell>
                        <TableCell>
                          {session.isVirtual ? (
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary border-0 gap-1"
                            >
                              <Monitor className="h-3 w-3" />
                              Virtual
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="bg-muted text-muted-foreground border-0 gap-1"
                            >
                              <MapPin className="h-3 w-3" />
                              In-Person
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {sessionStatusBadge(session.status)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Recent Inquiries */}
        <TabsContent value="inquiries">
          <Card className="linear-card border-border/60">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentInquiries.map((inq) => (
                    <TableRow key={inq.id} className="table-row-hover">
                      <TableCell className="font-medium">{inq.name}</TableCell>
                      <TableCell>{inq.serviceRequested}</TableCell>
                      <TableCell>{sourceLabel(inq.source)}</TableCell>
                      <TableCell>{inquiryStatusBadge(inq.status)}</TableCell>
                      <TableCell>{formatDate(inq.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Chart Section */}
      <Card
        className="linear-card border-border/60 animate-fade-in"
        style={{ animationDelay: "400ms" }}
      >
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Website Traffic &amp; Inquiries
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Monthly visitors and inquiry volume over the past 12 months
          </p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={siteAnalytics}
              margin={{ top: 4, right: 12, bottom: 0, left: -8 }}
            >
              <defs>
                <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-chart-1)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-chart-1)"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--color-border)"
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                tickFormatter={(v: string) => v.split(" ")[0]}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                width={40}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                fill="url(#fillVisitors)"
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="inquiries"
                stroke="var(--color-chart-2)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="mt-3 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-chart-1)]" />
              Visitors
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-chart-2)]" />
              Inquiries
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <div className="animate-fade-in" style={{ animationDelay: "480ms" }}>
        <h2 className="mb-4 text-lg font-semibold">Recent Testimonials</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {topTestimonials.map((t) => (
            <div key={t.id} className="linear-card p-5">
              {/* Stars */}
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < t.rating
                        ? "fill-[var(--color-warning)] text-[var(--color-warning)]"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <Quote className="absolute -left-0.5 -top-1 h-4 w-4 text-primary/20" />
                <p className="pl-5 text-sm leading-relaxed text-foreground/90">
                  {t.text}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground">
                    {t.service}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
