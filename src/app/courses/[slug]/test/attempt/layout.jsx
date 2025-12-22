// This layout removes the navbar and footer for the test attempt page
export default function TestAttemptLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}

