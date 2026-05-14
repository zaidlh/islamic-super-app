import type { Metadata } from "next";
import { NamesClient } from "./NamesClient";

export const metadata: Metadata = { title: "99 Names of Allah — Asma ul Husna" };

export default function NamesPage() {
  return <NamesClient />;
}
