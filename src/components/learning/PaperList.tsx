'use client';

import { useState } from "react";
import { Column, Row, Text, Icon, IconButton } from "@once-ui-system/core";

export type Paper = {
  title: string;
  authors?: string;
  year?: number;
  url: string;
  tag?: string;
  readAt?: string;
  notes?: string;
};

export const papers: Paper[] = [
  {
    title: "Point Transformer V3: Simpler, Faster, Stronger",
    authors: "Xiaoyang Wu et al.",
    year: 2024,
    url: "https://arxiv.org/abs/2312.10035",
    tag: "3D Perception",
    readAt: "2026-04",
    notes: `PTv3 is the backbone of PTv3-Drone-Flow. The key insight is serialized attention via z-order and Hilbert curve orderings — makes it behave like a convolution without losing transformer flexibility. I tap into the coarsest encoder features for the global flow head. Main limitation for my use case: no temporal reasoning built in, which is why PointWorld's framing is needed on top.`,
  },
  {
    title: "PointWorld: Scaling 3D World Models for In-the-Wild Robotic Manipulation",
    authors: "Wenlong Huang, Yu-Wei Chao, et al.",
    year: 2026,
    url: "https://arxiv.org/abs/2601.03782",
    tag: "3D Perception",
    readAt: "2026-05",
    notes: `Direct inspiration for PTv3-Drone-Flow. PointWorld frames PTv3 as a world model — given a robot action, predict how the scene evolves. The action-conditioning mechanism (add action embedding to encoder features, then MLP to flow) is simple and effective. Main gap I'm addressing: they assume a fixed robot arm workspace; drone navigation needs arbitrary 3D ego-motion handling.`,
  },
  {
    title: "PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation",
    authors: "Charles R. Qi, Hao Su, Kaichun Mo, Leonidas J. Guibas",
    year: 2017,
    url: "https://arxiv.org/abs/1612.00593",
    tag: "3D Perception",
    readAt: "2026-03",
    notes: `The foundational paper for point cloud deep learning. Per-point MLP with global max pooling — achieves permutation invariance elegantly. The limitation is obvious in hindsight: treating points in isolation ignores spatial locality, which is exactly what PTv3 fixes with serialized attention.`,
  },
];

function PaperRow({ paper }: { paper: Paper }) {
  const [open, setOpen] = useState(false);

  return (
    <Column
      fillWidth
      style={{
        borderBottom: "1px solid var(--neutral-alpha-weak)",
      }}
    >
      <Row
        fillWidth
        paddingX="8"
        paddingY="12"
        vertical="center"
        gap="12"
      >
        {/* Year */}
        <Text
          variant="label-default-xs"
          onBackground="neutral-weak"
          style={{ minWidth: "40px", flexShrink: 0 }}
        >
          {paper.year}
        </Text>

        {/* Title — links out */}
        <a
          href={paper.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ flex: 1, textDecoration: "none", color: "inherit" }}
        >
          <Column gap="2">
            <Text
              variant="body-strong-s"
              onBackground="neutral-strong"
              style={{ transition: "opacity 0.15s ease" }}
              className="hoverLink"
            >
              {paper.title} ↗
            </Text>
            {paper.authors && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {paper.authors}
              </Text>
            )}
          </Column>
        </a>

        {/* Read date */}
        {paper.readAt && (
          <Text
            variant="label-default-xs"
            onBackground="neutral-weak"
            style={{ flexShrink: 0 }}
          >
            {paper.readAt}
          </Text>
        )}

        {/* Toggle notes button — only show if notes exist */}
        {paper.notes && (
          <IconButton
            icon={open ? "chevronUp" : "chevronDown"}
            size="s"
            variant="ghost"
            onClick={() => setOpen(!open)}
            tooltip={open ? "Hide notes" : "Show my notes"}
          />
        )}
      </Row>

      {/* Notes drawer */}
      {open && paper.notes && (
        <Column
          paddingX="16"
          paddingBottom="16"
          gap="8"
          style={{
            borderLeft: "2px solid var(--brand-alpha-medium)",
            marginLeft: "56px",
            marginBottom: "12px",
          }}
        >
          <Text variant="label-strong-xs" onBackground="neutral-weak"
            style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
          >
            My Notes
          </Text>
          <Text variant="body-default-s" onBackground="neutral-medium"
            style={{ whiteSpace: "pre-line", lineHeight: "1.7" }}
          >
            {paper.notes}
          </Text>
        </Column>
      )}
    </Column>
  );
}

export function PaperList() {
  // Group by tag
  const grouped = papers.reduce((acc, paper) => {
    const tag = paper.tag || "General";
    if (!acc[tag]) acc[tag] = [];
    acc[tag].push(paper);
    return acc;
  }, {} as Record<string, Paper[]>);

  return (
    <Column fillWidth gap="40">
      {Object.entries(grouped).map(([tag, tagPapers]) => (
        <Column key={tag} fillWidth gap="8">
          {/* Tag header */}
          <Row vertical="center" gap="12" paddingBottom="4">
            <Text
              variant="label-strong-xs"
              onBackground="neutral-weak"
              style={{ textTransform: "uppercase", letterSpacing: "0.1em", flexShrink: 0 }}
            >
              {tag}
            </Text>
            <div style={{ flex: 1, height: "1px", background: "var(--neutral-alpha-weak)" }} />
          </Row>

          {/* Rows */}
          {tagPapers.map((paper) => (
            <PaperRow key={paper.url} paper={paper} />
          ))}
        </Column>
      ))}
    </Column>
  );
}