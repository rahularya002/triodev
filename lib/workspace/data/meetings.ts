import type { Meeting } from "../types"
import { teamMembers } from "./projects"

export const meetings: Meeting[] = [
  {
    id: "mt1",
    title: "Sprint Review & Planning",
    date: "2025-06-27",
    startTime: "14:00",
    endTime: "15:00",
    agenda: "Review authentication flow, demo new dashboard features, and plan sprint 5 priorities.",
    meetUrl: "https://meet.google.com/abc-defg-hij",
    attendees: teamMembers.slice(0, 4),
    actionItems: [
      { id: "a1", text: "Review dashboard UI mockups", completed: false, assignee: "Rahul Client" },
      { id: "a2", text: "Approve API spec changes", completed: false, assignee: "Rahul Client" },
    ],
    isPast: false,
  },
  {
    id: "mt2",
    title: "Design Review Session",
    date: "2025-06-30",
    startTime: "10:00",
    endTime: "11:00",
    agenda: "Review client portal wireframes and design system updates.",
    meetUrl: "https://meet.google.com/xyz-uvwx-rst",
    attendees: [teamMembers[1], teamMembers[3]],
    isPast: false,
  },
  {
    id: "mt3",
    title: "Weekly Standup",
    date: "2025-07-02",
    startTime: "09:30",
    endTime: "10:00",
    agenda: "Team sync on current sprint progress and blockers.",
    meetUrl: "https://meet.google.com/lmn-opqr-stu",
    attendees: teamMembers,
    isPast: false,
  },
  {
    id: "mt4",
    title: "Sprint 3 Retrospective",
    date: "2025-05-20",
    startTime: "15:00",
    endTime: "16:00",
    agenda: "Retrospective on sprint 3 deliverables and process improvements.",
    notes: "Great progress on authentication. Need to improve communication on API changes.",
    recordingUrl: "https://drive.google.com/recording/sprint3",
    attendees: teamMembers.slice(0, 4),
    actionItems: [
      { id: "a3", text: "Document API change process", completed: true, assignee: "Mike Kumar" },
      { id: "a4", text: "Schedule design review", completed: true, assignee: "Alice Smith" },
    ],
    isPast: true,
  },
  {
    id: "mt5",
    title: "Project Kickoff",
    date: "2025-05-01",
    startTime: "11:00",
    endTime: "12:00",
    agenda: "Initial project kickoff meeting to align on goals and timeline.",
    notes: "Project scope confirmed. Timeline agreed upon. Team assignments finalized.",
    recordingUrl: "https://drive.google.com/recording/kickoff",
    attendees: teamMembers,
    isPast: true,
  },
]

export const upcomingMeetings = meetings.filter((m) => !m.isPast)
export const pastMeetings = meetings.filter((m) => m.isPast)
