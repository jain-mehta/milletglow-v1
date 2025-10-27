'use client';
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;


export default function StudioPage() {
  return <NextStudio config={config} />;
}
