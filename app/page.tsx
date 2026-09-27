export default function HomePage() {
  return (
    <main id="ae-trial" lang="ar" dir="rtl" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "32px", background: "#eef5ff", color: "#10243a", textAlign: "center" }}>
      <style>{`body:has(#ae-trial) header, body:has(#ae-trial) footer { display: none !important; }`}</style>
      <section style={{ width: "100%", maxWidth: "720px", background: "white", borderRadius: "24px", padding: "48px 24px", boxShadow: "0 16px 48px #10243a12" }}>
        <p style={{ fontSize: "18px", marginBottom: "24px" }}>A&amp;E Automobile Nord</p>
        <h1 style={{ fontSize: "56px", fontWeight: 700, marginBottom: "20px" }}>مرحبا</h1>
        <p style={{ fontSize: "24px", marginBottom: "16px" }}>هذه نسخة تجريبية للموقع</p>
        <p style={{ fontSize: "18px", color: "#50647a" }}>إذا ظهرت لك هذه الصفحة، فقد نجح نشر ملفات التجربة.</p>
        <p style={{ marginTop: "32px", color: "#50647a" }}>اختبار رفع المشروع كاملًا · TEST 01</p>
      </section>
    </main>
  );
}
