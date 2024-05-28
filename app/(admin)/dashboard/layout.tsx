import Header from "@/components/admin/header";
import SideNav from "@/components/side-nav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      <ResizablePanelGroup direction="horizontal" className="min-h-[inherit]">
        <ResizablePanel defaultSize={15} maxSize={20}>
          <SideNav />
        </ResizablePanel>
        <ResizableHandle withHandle className="w-[2px] bg-slate-300" />
        <ResizablePanel defaultSize={85}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
