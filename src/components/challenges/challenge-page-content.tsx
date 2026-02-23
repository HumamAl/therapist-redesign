"use client";

import type { ReactNode } from "react";
import type { Challenge } from "@/lib/types";
import { ChallengeCard } from "./challenge-card";
import { BeforeAfter } from "./before-after";
import { MetricBars } from "./metric-bar";
import { FlowDiagram } from "./flow-diagram";

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({
  challenges,
}: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "hipaa-compliance": (
      <BeforeAfter
        before={{
          label: "Current Risk",
          items: [
            "Contact forms send data via plain email",
            "Client info stored in unencrypted spreadsheets",
            "No audit trail for data access",
          ],
        }}
        after={{
          label: "HIPAA-Compliant",
          items: [
            "Forms submit through encrypted HIPAA-compliant channels",
            "Data stored with AES-256 encryption at rest",
            "Complete audit logging for every data access event",
          ],
        }}
      />
    ),
    "warm-aesthetic": (
      <BeforeAfter
        before={{
          label: "Generic Template",
          items: [
            "Generic template with stock imagery",
            "Cold, clinical color palette",
            "Impersonal copy that reads like a textbook",
          ],
        }}
        after={{
          label: "Custom Design",
          items: [
            "Custom design reflecting your practice values",
            "Warm, grounded palette \u2014 teal, earth tones, natural light",
            "Authentic voice that feels like a conversation",
          ],
        }}
      />
    ),
    "mobile-responsive": (
      <MetricBars
        metrics={[
          {
            label: "Mobile Load Time",
            value: 95,
            max: 100,
            displayLabel: "Target: < 2s",
            status: "success",
          },
          {
            label: "Lighthouse Performance",
            value: 96,
            max: 100,
            displayLabel: "Score: 96/100",
            status: "success",
          },
          {
            label: "Mobile Visitors",
            value: 65,
            max: 100,
            displayLabel: "65% of traffic",
            status: "primary",
          },
          {
            label: "Touch Target Compliance",
            value: 100,
            max: 100,
            displayLabel: "100% compliant",
            status: "success",
          },
        ]}
      />
    ),
    "accessible-content": (
      <FlowDiagram
        steps={[
          { label: "Semantic HTML", highlight: false },
          { label: "Heading Hierarchy", highlight: false },
          { label: "ARIA Landmarks", highlight: true },
          { label: "Keyboard Nav", highlight: false },
          { label: "Screen Reader Testing", highlight: false },
        ]}
      />
    ),
  };

  return (
    <div className="flex flex-col gap-4">
      {challenges.map((challenge, index) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          index={index}
          visualization={visualizations[challenge.id]}
        />
      ))}
    </div>
  );
}
