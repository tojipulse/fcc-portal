"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Calendar from "../components/calendar/Calendar";
import { scheduleEvents } from "../data/calendarData";
import { formatJapaneseDate } from "../utils/calendarUtils";

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState("2026-07-12");

  const selectedEvents = scheduleEvents.filter(
    (event) => event.date === selectedDate
  );

  return (
    <main className="min-h-screen bg-white pb-24">
      <Header title="スケジュール" subtitle="SCHEDULE" />

      <Calendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <section className="border-t px-5 py-6">
        <h2 className="text-2xl font-black">
          {formatJapaneseDate(selectedDate)} の予定
        </h2>

        <div className="mt-5 space-y-4">
          {selectedEvents.length > 0 ? (
            selectedEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <div
                  className={`inline-block rounded px-3 py-1 text-sm font-bold text-white ${event.color}`}
                >
                  {event.type}
                </div>

                <div className="mt-3 text-xl font-black">
                  {event.title}
                </div>

                <div className="mt-2 text-gray-700">
                  {event.time}
                </div>

                <div className="text-gray-700">
                  {event.place}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              この日の予定はありません。
            </p>
          )}
        </div>
      </section>

      <Footer current="schedule" />
    </main>
  );
}