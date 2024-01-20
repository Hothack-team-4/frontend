"use client";

import React from "react";
import EventForm from "@/components/EventForm";
import EventList from "@/components/EventList";

import "./landing_styles.css";

// this page will be for the attendees on the venue when they scan the QR
const DashboardLandingPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      Hello Back to Your dashboard
      <EventList />
      <EventForm />
    </main>
  );
};

export default DashboardLandingPage;
