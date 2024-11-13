export default function Footer() {
  return (
    <footer className="bg-slate-800 p-4 mt-8">
      <div className="container mx-auto text-center text-white">
        <p>&copy; {new Date().getFullYear()} Kodebytt. All rights reserved.</p>
      </div>
    </footer>
  );
  
  }