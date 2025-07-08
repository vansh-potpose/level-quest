"use client";
import Authenticated from "../components/Authenticated";
import Dashboard from "./Dashboard";

export default function Home() {
  return (
    <Authenticated>
      <div className="w-full flex flex-col items-center justify-center">
        <Dashboard />
      </div>
    </Authenticated>
  );
}
