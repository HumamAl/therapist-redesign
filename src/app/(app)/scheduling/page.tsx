"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, Clock, Video } from "lucide-react";
import { sessions } from "@/data/mock-data";
import { formatDate } from "@/lib/formatters";
import type { SessionStatus } from "@/lib/types";

function getStatusBadge(status: SessionStatus) {
  switch (status) {
    case "scheduled":
      return (
        <Badge className="bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
          Scheduled
        </Badge>
      );
    case "confirmed":
      return (
        <Badge className="bg-[color:var(--success)]/15 text-[color:var(--success)] border-[color:var(--success)]/30 hover:bg-[color:var(--success)]/20">
          Confirmed
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="secondary" className="opacity-80">
          Completed
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20">
          Cancelled
        </Badge>
      );
    case "no-show":
      return (
        <Badge className="bg-[color:var(--warning)]/15 text-[color:var(--warning)] border-[color:var(--warning)]/30 hover:bg-[color:var(--warning)]/20">
          No Show
        </Badge>
      );
  }
}

export default function SchedulingPage() {
  const [view, setView] = useState<"upcoming" | "past">("upcoming");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingSessions = useMemo(
    () =>
      sessions.filter((s) => {
        const d = new Date(s.date);
        return (
          d >= today &&
          (s.status === "scheduled" || s.status === "confirmed")
        );
      }),
    []
  );

  const pastSessions = useMemo(
    () =>
      sessions.filter((s) => {
        const d = new Date(s.date);
        return (
          d < today || s.status === "completed" || s.status === "cancelled" || s.status === "no-show"
        );
      }),
    []
  );

  const displayedSessions = view === "upcoming" ? upcomingSessions : pastSessions;

  // Stats
  const todayStr = today.toISOString().split("T")[0];
  const todaysSessions = sessions.filter((s) => s.date === todayStr).length;

  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
  const thisWeekSessions = sessions.filter((s) => {
    const d = new Date(s.date);
    return d >= today && d <= endOfWeek && (s.status === "scheduled" || s.status === "confirmed");
  }).length;

  const virtualPercent =
    sessions.length > 0
      ? Math.round(
          (sessions.filter((s) => s.isVirtual).length / sessions.length) * 100
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Session Schedule</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View and manage upcoming therapy sessions
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="linear-card p-0">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Today&apos;s Sessions
              </p>
              <p className="font-mono text-lg font-semibold tabular-nums">
                {todaysSessions}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="linear-card p-0">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">This Week</p>
              <p className="font-mono text-lg font-semibold tabular-nums">
                {thisWeekSessions}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="linear-card p-0">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Video className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Virtual Sessions</p>
              <p className="font-mono text-lg font-semibold tabular-nums">
                {virtualPercent}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView("upcoming")}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${
            view === "upcoming"
              ? "bg-primary text-primary-foreground"
              : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          Upcoming ({upcomingSessions.length})
        </button>
        <button
          onClick={() => setView("past")}
          className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${
            view === "past"
              ? "bg-primary text-primary-foreground"
              : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          Past ({pastSessions.length})
        </button>
      </div>

      {/* Table */}
      <Card className="linear-card p-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Client
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Service
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Date
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Time
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground text-right">
                  Duration
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Type
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Notes
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedSessions.map((session) => (
                <TableRow key={session.id} className="table-row-hover">
                  <TableCell className="font-medium">
                    {session.clientName}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {session.service}
                  </TableCell>
                  <TableCell className="font-mono text-sm tabular-nums">
                    {formatDate(session.date)}
                  </TableCell>
                  <TableCell className="font-mono text-sm tabular-nums">
                    {session.time}
                  </TableCell>
                  <TableCell className="font-mono text-sm tabular-nums text-right">
                    {session.duration}m
                  </TableCell>
                  <TableCell>
                    {session.isVirtual ? (
                      <Badge
                        variant="outline"
                        className="gap-1 text-xs border-primary/30 text-primary"
                      >
                        <Video className="w-3 h-3" />
                        Virtual
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        In-Person
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(session.status)}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                    {session.notes || "—"}
                  </TableCell>
                </TableRow>
              ))}
              {displayedSessions.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-muted-foreground text-sm"
                  >
                    No {view} sessions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
