import React from "react";
import { auth, signOut } from "@/auth";
export default async function AdminPage() {
  const session = await auth();
  return (
    <div>
      <h1>admin page</h1>
      {/* <button onClick={() => signOut()}>logout</button>
      {session?.user && session.user.role === "ADMIN" && <h1>admin page</h1>}
      {session?.user && session.user.role === "USER" && <p>not alow</p>} */}
    </div>
  );
}
