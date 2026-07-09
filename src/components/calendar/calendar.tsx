"use client";

import { useEffect, useMemo, useState } from "react";
import { Job } from "@prisma/client";
import {
  format,
  startOfWeek,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  eachDayOfInterval,
  endOfWeek,
} from "date-fns";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { motion } from "framer-motion";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarViewProps {
  jobs: Job[];
}

type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: "created" | "updated";
  job: Job;
};

function CalendarToolbar({
  date: toolbarDate,
  onNavigate,
}: {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}) {
  return (
    <div className="mb-4 flex flex-col items-start gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Calendar</h1>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
          Track when jobs are created and updated.
        </p>
      </div>

      <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-3">
        <button
          onClick={() => onNavigate("PREV")}
          className="rounded-xl border border-white/10 bg-slate-900 p-2 text-slate-300 transition hover:bg-slate-800"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="min-w-[140px] text-center text-base font-semibold text-white sm:min-w-[180px] sm:text-lg">
          {format(toolbarDate, "MMMM yyyy")}
        </div>

        <button
          onClick={() => onNavigate("NEXT")}
          className="rounded-xl border border-white/10 bg-slate-900 p-2 text-slate-300 transition hover:bg-slate-800"
        >
          <ChevronRight size={18} />
        </button>

        <button
          onClick={() => onNavigate("TODAY")}
          className="ml-0 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 sm:ml-2 sm:px-4"
        >
          Today
        </button>
      </div>
    </div>
  );
}

export default function CalendarView({
  jobs,
}: CalendarViewProps) {
  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEvent | null>(null);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [date, setDate] = useState<Date>(() => new Date(2000, 0, 1));

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const now = new Date();
      setDate(startOfMonth(now));
      setSelectedDate(startOfDay(now));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const events = useMemo(() => {
    const data: CalendarEvent[] = [];

    jobs.forEach((job) => {
      data.push({
        id: `${job.id}-created`,
        title: job.company,
        start: new Date(job.createdAt),
        end: new Date(job.createdAt),
        type: "created",
        job,
      });

      if (
        new Date(job.updatedAt).getTime() !==
        new Date(job.createdAt).getTime()
      ) {
        data.push({
          id: `${job.id}-updated`,
          title: job.company,
          start: new Date(job.updatedAt),
          end: new Date(job.updatedAt),
          type: "updated",
          job,
        });
      }
    });

    return data;
  }, [jobs]);

  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];

    const dayStart = startOfDay(selectedDate);
    const dayEnd = endOfDay(selectedDate);

    return events.filter((event) => {
      const eventTime = event.start.getTime();
      return eventTime >= dayStart.getTime() && eventTime <= dayEnd.getTime();
    });
  }, [events, selectedDate]);

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setDate(subMonths(date, 1));
      return;
    }

    if (action === "NEXT") {
      setDate(addMonths(date, 1));
      return;
    }

    setDate(startOfMonth(new Date()));
  };

  const monthGrid = useMemo(() => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

    return Array.from({ length: Math.ceil(days.length / 7) }, (_, rowIndex) =>
      days.slice(rowIndex * 7, rowIndex * 7 + 7)
    );
  }, [date]);

  const eventsByDate = useMemo(() => {
    const grouped = new Map<string, CalendarEvent[]>();

    events.forEach((event) => {
      const key = format(event.start, "yyyy-MM-dd");
      const existing = grouped.get(key) ?? [];
      existing.push(event);
      grouped.set(key, existing);
    });

    return grouped;
  }, [events]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full rounded-2xl border border-white/10 bg-[#0F172A] p-4 mt-6 shadow-2xl sm:p-6"
    >
      <div className="flex flex-col gap-2">
        <div className="overflow-hidden rounded-2xl bg-[#0F172A] sm:p-2">
          <CalendarToolbar date={date} onNavigate={handleNavigate} />

          <div className="mt-4 grid grid-cols-7 gap-1 text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-white sm:gap-2 sm:text-xs sm:tracking-[0.2em]">
            {weekDays.map((day) => (
              <div key={day} className="mb-1 rounded-lg bg-indigo-600/90 px-1.5 py-1.5 sm:mb-2 sm:px-3 sm:py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {monthGrid.flatMap((week) =>
              week.map((day) => {
                const dayKey = format(day, "yyyy-MM-dd");
                const dayEvents = eventsByDate.get(dayKey) ?? [];
                const isCurrentMonth = isSameMonth(day, date);
                const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

                return (
                  <button
                    key={dayKey}
                    onClick={() => {
                      setSelectedDate(day);
                      setSelectedEvent(null);
                      setDate(startOfMonth(day));
                    }}
                    className={`min-h-[72px] rounded-lg border p-1.5 text-left transition sm:min-h-[100px] sm:p-2 ${
                      isCurrentMonth
                        ? "border-white/10 bg-slate-900/80 hover:border-indigo-400/50"
                        : "border-white/5 bg-slate-950/60 text-slate-500"
                    } ${isSelected ? "ring-2 ring-indigo-400" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-semibold sm:text-sm ${isCurrentMonth ? "text-white" : "text-slate-700"}`}>
                        {format(day, "d")}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" />
                      )}
                    </div>

                    <div className="mt-2 flex flex-col gap-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={`${dayKey}-${event.id}`}
                          className="truncate rounded-full bg-slate-800/80 px-1.5 py-1 text-[9px] text-slate-200 sm:px-2 sm:text-[10px]"
                        >
                          {event.job.company}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[9px] text-slate-500 sm:text-[10px]">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {selectedDate && (
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-white">
                  {format(selectedDate, "EEEE, MMM d")}
                </p>
                <p className="text-sm text-slate-400">
                  {selectedDateEvents.length > 0
                    ? `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? "s" : ""} scheduled`
                    : "No events for this day"}
                </p>
              </div>
            </div>

            {selectedDateEvents.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2">
                {selectedDateEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className="rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-left transition hover:border-indigo-400/60 hover:bg-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-2.5 w-2.5 rounded-full ${event.type === "created" ? "bg-indigo-400" : "bg-cyan-400"}`} />
                      <p className="text-sm font-semibold text-white">{event.job.company}</p>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{event.job.role}</p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                      {event.type === "created" ? "Created" : "Updated"}
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/50 p-4 text-sm text-slate-400">
                Select another date to view more job activity.
              </div>
            )}
          </div>
        )}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-white">
                  {selectedEvent.job.company}
                </h2>

                <p className="text-slate-400">
                  {selectedEvent.job.role}
                </p>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-lg bg-white/5 px-3 py-2 text-sm text-slate-300 hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="space-y-5">

              <div className="rounded-2xl bg-slate-900 p-4">

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Event
                </p>

                <p className="mt-1 text-lg font-semibold text-white">
                  {selectedEvent.type === "created"
                    ? "Job Created"
                    : "Job Updated"}
                </p>

              </div>

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-slate-500">
                    Status
                  </p>

                  <p className="mt-1 text-white">
                    {selectedEvent.job.status}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Priority
                  </p>

                  <p className="mt-1 text-white">
                    {selectedEvent.job.priority}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Created
                  </p>

                  <p className="mt-1 text-white">
                    {format(
                      selectedEvent.job.createdAt,
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Updated
                  </p>

                  <p className="mt-1 text-white">
                    {format(
                      selectedEvent.job.updatedAt,
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}<style jsx global>{`
  .rbc-calendar {
    background: transparent;
    color: white;
    font-family: inherit;
    width: 100%;
    height: 100%;
    min-height: 70vh;
  }

  .rbc-month-view {
    overflow: hidden;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,.08);
    background: #162234;
    min-height: 0;
  }

  /* Weekday Header */

  .rbc-header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: white;
    font-size: 15px;
    font-weight: 600;

    border: none;

    background: linear-gradient(
      90deg,
      #5b4cf6,
      #635bff
    );
  }

  .rbc-header + .rbc-header{
    border-left:1px solid rgba(255,255,255,.08);
  }

  /* Month Grid */

  .rbc-month-row {
    border-color: rgba(255,255,255,.08);
    min-height: 120px;
  }

  .rbc-day-bg {
    background:#162234;
    border-color:rgba(255,255,255,.08);
    transition:.2s;
  }

  .rbc-day-bg:hover{
    background:#1b2940;
  }

  .rbc-date-cell{
    padding:12px;
    text-align:left;
  }

  .rbc-date-cell a{
    color:white;
    font-size:16px;
    font-weight:600;
    text-decoration:none;
  }

  .rbc-off-range-bg{
    background:#131d2d;
  }

  .rbc-off-range .rbc-button-link{
    color:#64748b;
  }

  /* Today */

  .rbc-today{
    background:rgba(99,91,255,.08);
  }

  /* Events */

  .rbc-event{
    border:none !important;
    background:transparent !important;
    padding:0 !important;
    box-shadow:none !important;
  }

  .rbc-event-content{
    overflow:visible;
  }

  .rbc-show-more{
    color:#818cf8;
    background:none;
    font-size:11px;
    border:none;
    padding-left:8px;
  }

  /* Remove ugly borders */

  .rbc-row-bg,
  .rbc-row-content,
  .rbc-month-row,
  .rbc-day-bg{
    border-color:rgba(255,255,255,.08);
  }

  .rbc-toolbar{
    margin-bottom:28px;
  }

  .rbc-toolbar button{
    display:none;
  }

  .rbc-row-segment{
    padding:2px 6px;
  }

  .rbc-date-cell.rbc-now a{
    display:inline-flex;
    align-items:center;
    justify-content:center;

    width:32px;
    height:32px;

    border-radius:999px;

    background:#635bff;
    color:white;
  }

  @media (max-width:768px){

    .rbc-header{
      font-size:12px;
      height:48px;
    }

    .rbc-month-row{
      min-height:92px;
    }

    .rbc-date-cell{
      padding:6px;
    }

    .rbc-date-cell a{
      font-size:13px;
    }
  }

`}</style>

</motion.div>
);
}