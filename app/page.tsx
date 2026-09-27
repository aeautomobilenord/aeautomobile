export default function HomePage() {
  return (
    <main
      id="hello-test"
      lang="ar"
      dir="rtl"
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "white",
        color: "#111",
        fontSize: "64px",
      }}
    >
      <style>{`
        body:has(#hello-test) header,
        body:has(#hello-test) footer {
          display: none !important;
        }
      `}</style>
      <h1>مرحبا</h1>
    </main>
  );
}
