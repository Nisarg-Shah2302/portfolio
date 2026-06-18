"use client";
import { useEffect } from "react";
import { initAnalytics } from "../firebase";

export default function FirebaseAnalytics() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}
