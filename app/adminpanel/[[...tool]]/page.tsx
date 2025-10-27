import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-dynamic";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  // Add error boundary for production
  try {
    return <NextStudio config={config} />;
  } catch (error) {
    console.error('Sanity Studio Error:', error);
    return (
      <div className="p-8 text-center">
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
    );
  }
}
