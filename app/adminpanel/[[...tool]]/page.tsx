import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

export const runtime = 'nodejs';

// Conditionally load Sanity Studio only in development
const NextStudio = dynamic(
  () => import("next-sanity/studio").then(mod => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p>Loading Admin Panel...</p>
        </div>
      </div>
    )
  }
);

// Conditional metadata and viewport export
export const metadata = process.env.NODE_ENV === 'development'
  ? { title: 'MilletGlow Admin Panel' }
  : { title: 'Page Not Found' };

export const viewport = process.env.NODE_ENV === 'development'
  ? { width: 'device-width', initialScale: 1 }
  : { width: 'device-width', initialScale: 1 };

export default function StudioPage() {
  // Always redirect to 404 in production builds
  if (process.env.NODE_ENV === 'production' || process.env.SKIP_ADMIN_PANEL === 'true') {
    notFound();
  }

  // Only load in development
  if (process.env.NODE_ENV === 'development') {
    try {
      // Dynamically import the config only in development
      const loadStudio = async () => {
        const { default: config } = await import("../../../sanity.config");
        return <NextStudio config={config} />;
      };

      return (
        <div className="min-h-screen">
          <NextStudio config={require("../../../sanity.config").default} />
        </div>
      );
    } catch (error) {
      console.error('Sanity Studio Error:', error);
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

  // Fallback for any other case
  notFound();
}
