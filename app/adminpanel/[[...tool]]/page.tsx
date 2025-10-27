import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { notFound } from 'next/navigation';

export const dynamic = "force-dynamic";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  // Skip admin panel in production unless explicitly enabled
  if (process.env.SKIP_ADMIN_PANEL === 'true') {
    notFound();
  }

  // Add error boundary for production
  try {
    return <NextStudio config={config} />;
  } catch (error) {
    console.error('Sanity Studio Error:', error);

    // In production, show minimal error info
    if (process.env.NODE_ENV === 'production') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Admin Panel Unavailable
            </h1>
            <p className="text-gray-600">
              The admin panel is currently unavailable in production mode.
            </p>
          </div>
        </div>
      );
    }

    // In development, show detailed error
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Sanity Studio Error
          </h1>
          <p className="text-gray-600 mb-4">
            Unable to load Sanity Studio. Please check your configuration.
          </p>
          <details className="text-left bg-gray-100 p-4 rounded">
            <summary className="cursor-pointer font-semibold">Technical Details</summary>
            <pre className="mt-2 text-sm overflow-auto">
              {error instanceof Error ? error.message : String(error)}
            </pre>
          </details>
        </div>
      </div>
    );
  }
}
