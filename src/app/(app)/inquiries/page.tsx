"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Shield } from "lucide-react";
import { inquiries } from "@/data/mock-data";
import { formatDate } from "@/lib/formatters";
import type { InquiryStatus } from "@/lib/types";

const statusFilters: { label: string; value: InquiryStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Completed", value: "completed" },
  { label: "Archived", value: "archived" },
];

function getStatusBadge(status: InquiryStatus) {
  switch (status) {
    case "new":
      return (
        <Badge className="bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
          New
        </Badge>
      );
    case "contacted":
      return (
        <Badge className="bg-[color:var(--warning)]/15 text-[color:var(--warning)] border-[color:var(--warning)]/30 hover:bg-[color:var(--warning)]/20">
          Contacted
        </Badge>
      );
    case "scheduled":
      return (
        <Badge className="bg-[color:var(--success)]/15 text-[color:var(--success)] border-[color:var(--success)]/30 hover:bg-[color:var(--success)]/20">
          Scheduled
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="secondary" className="opacity-80">
          Completed
        </Badge>
      );
    case "archived":
      return (
        <Badge variant="secondary" className="opacity-50">
          Archived
        </Badge>
      );
  }
}

function getSourceLabel(source: string) {
  const labels: Record<string, string> = {
    website: "Website",
    referral: "Referral",
    "psychology-today": "Psychology Today",
    google: "Google",
    "insurance-directory": "Insurance Dir.",
  };
  return labels[source] || source;
}

export default function InquiriesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "all">(
    "all"
  );

  const filtered = inquiries.filter((inq) => {
    const matchesSearch = inq.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Client Inquiries</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track and manage incoming client requests
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs px-2 py-1 rounded-md font-medium">
          <Shield className="w-3.5 h-3.5" />
          HIPAA Compliant
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by client name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((sf) => (
            <button
              key={sf.value}
              onClick={() => setStatusFilter(sf.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                statusFilter === sf.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {sf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="linear-card p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Name
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Service Requested
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Source
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Date
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground text-center">
                  HIPAA
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inq) => (
                <TableRow key={inq.id} className="table-row-hover">
                  <TableCell className="font-medium">{inq.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {inq.serviceRequested}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {getSourceLabel(inq.source)}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(inq.status)}</TableCell>
                  <TableCell className="font-mono text-sm tabular-nums text-muted-foreground">
                    {formatDate(inq.date)}
                  </TableCell>
                  <TableCell className="text-center">
                    {inq.hipaaConsent ? (
                      <Shield className="w-4 h-4 text-[color:var(--success)] mx-auto" />
                    ) : (
                      <Shield className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground text-sm"
                  >
                    No inquiries match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {inquiries.length} inquiries
      </p>
    </div>
  );
}
