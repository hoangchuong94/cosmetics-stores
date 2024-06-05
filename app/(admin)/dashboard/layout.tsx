import SideNav from '@/components/side-nav';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[inherit] md:block"
      >
        <ResizablePanel defaultSize={15}>
          <SideNav />
        </ResizablePanel>
        <ResizableHandle withHandle className="w-1 bg-slate-300" />
        <ResizablePanel defaultSize={85}>{children}</ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
