export const revalidate = 60 * 60 * 12;
export default function Page() {
  return (
    <article className="prose max-w-none">
      <h1>How to Download</h1>
      <ol>
        <li>Open a software page and click <strong>Download</strong>.</li>
        <li>If the primary link is slow, pick a <strong>Mirror</strong>.</li>
        <li>Verify file integrity with the displayed SHA-256 checksum.</li>
      </ol>
    </article>
  );
}
