export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="container py-10 text-sm grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-semibold mb-2">Company Info</div>
          <div>hi@example.com</div>
          <div>123 Example Street, City</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Quick Links</div>
          <ul className="space-y-1">
            <li><a className="link" href="/help/support">Support Centre</a></li>
            <li><a className="link" href="/help/terms">Terms & Conditions</a></li>
            <li><a className="link" href="/help/faqs">FAQs</a></li>
          </ul>
        </div>
        <div className="text-xs text-gray-500">©2025 SoftHub</div>
      </div>
    </footer>
  );
}
