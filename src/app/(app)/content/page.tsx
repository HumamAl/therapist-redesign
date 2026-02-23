"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Search, FileText, Globe, BookOpen } from "lucide-react";
import { websiteContent } from "@/data/mock-data";
import { formatNumber, formatRelativeDate } from "@/lib/formatters";
import type { ContentStatus } from "@/lib/types";

type ContentType = "page" | "blog" | "resource" | "faq";

const typeFilters: { label: string; value: ContentType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Page", value: "page" },
  { label: "Blog", value: "blog" },
  { label: "Resource", value: "resource" },
  { label: "FAQ", value: "faq" },
];

function getStatusBadge(status: ContentStatus) {
  switch (status) {
    case "published":
      return (
        <Badge className="bg-[color:var(--success)]/15 text-[color:var(--success)] border-[color:var(--success)]/30 hover:bg-[color:var(--success)]/20">
          Published
        </Badge>
      );
    case "draft":
      return (
        <Badge className="bg-[color:var(--warning)]/15 text-[color:var(--warning)] border-[color:var(--warning)]/30 hover:bg-[color:var(--warning)]/20">
          Draft
        </Badge>
      );
    case "review":
      return (
        <Badge className="bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
          In Review
        </Badge>
      );
  }
}

function getTypeBadge(type: ContentType) {
  const config: Record<ContentType, { label: string; variant: "outline" | "secondary" }> = {
    page: { label: "Page", variant: "outline" },
    blog: { label: "Blog", variant: "secondary" },
    resource: { label: "Resource", variant: "outline" },
    faq: { label: "FAQ", variant: "secondary" },
  };
  const c = config[type];
  return (
    <Badge variant={c.variant} className="text-xs">
      {c.label}
    </Badge>
  );
}

export default function ContentPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<ContentType | "all">("all");

  const filtered = websiteContent.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      typeFilter === "all" ? true : item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Stats
  const totalPages = websiteContent.length;
  const publishedCount = websiteContent.filter(
    (c) => c.status === "published"
  ).length;
  const draftCount = websiteContent.filter(
    (c) => c.status === "draft"
  ).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Website Content</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your website pages, blog posts, and resources
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="linear-card p-0">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Pages</p>
              <p className="font-mono text-lg font-semibold tabular-nums">
                {totalPages}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="linear-card p-0">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[color:var(--success)]/10 flex items-center justify-center">
              <Globe className="w-4 h-4 text-[color:var(--success)]" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Published</p>
              <p className="font-mono text-lg font-semibold tabular-nums">
                {publishedCount}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="linear-card p-0">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[color:var(--warning)]/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[color:var(--warning)]" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Drafts</p>
              <p className="font-mono text-lg font-semibold tabular-nums">
                {draftCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {typeFilters.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setTypeFilter(tf.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                typeFilter === tf.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {tf.label}
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
                  Title
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Type
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground text-right">
                  Word Count
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Last Modified
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Slug
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id} className="table-row-hover">
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{getTypeBadge(item.type)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="font-mono text-sm tabular-nums text-right">
                    {formatNumber(item.wordCount)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatRelativeDate(item.lastModified)}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {item.slug}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground text-sm"
                  >
                    No content matches your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {websiteContent.length} content items
      </p>
    </div>
  );
}
