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
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20}>
          <SideNav />
        </ResizablePanel>
        <ResizableHandle
          withHandle
          className="w-1 bg-slate-200/50"
        />
        <ResizablePanel defaultSize={80}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
