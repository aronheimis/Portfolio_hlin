/**
 * Injects a JSON-LD <script> tag into the page.
 * Invisible to users; read only by search-engine crawlers.
 * Safe to use in Server Components (no client JS needed).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
