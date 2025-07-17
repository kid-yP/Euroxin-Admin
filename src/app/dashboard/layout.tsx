// app/dashboard/layout.tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = 'session=; Max-Age=0; path=/';
    document.cookie = 'userRole=; Max-Age=0; path=/';
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-xl font-semibold mb-8">Euroxin Admin</h2>
        <nav className="space-y-4">
          <Link href="/dashboard" className="block text-blue-600 hover:underline">Dashboard</Link>
          <Link href="/dashboard/users" className="block text-blue-600 hover:underline">Users</Link>
          <Link href="/dashboard/pois" className="block text-blue-600 hover:underline">POIs</Link>
          <Link href="/dashboard/tasks" className="block text-blue-600 hover:underline">Tasks</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
