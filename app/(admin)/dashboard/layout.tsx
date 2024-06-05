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
                className="hidden min-h-[inherit] md:block"
            >
                <ResizablePanel defaultSize={10}>
                    <SideNav />
                </ResizablePanel>
                <ResizableHandle withHandle className="w-1 bg-slate-300" />
                <ResizablePanel defaultSize={90}>{children}</ResizablePanel>
            </ResizablePanelGroup>
        </main>
    );
}
