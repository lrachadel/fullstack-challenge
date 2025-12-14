import AppNavbar from '../components/AppNavbar';

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavbar />
      {children}
    </div>
  );
}
