import SideNav from '@/components/admin/side-nav';
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
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20}>
                <SideNav />
            </ResizablePanel>
            <ResizableHandle withHandle className="w-1 bg-slate-200/50" />
            <ResizablePanel defaultSize={80}>
                <div className="h-full w-full bg-slate-500/50 p-3">
                    <div className="h-full w-full rounded-3xl bg-white p-6">
                        {children}
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
