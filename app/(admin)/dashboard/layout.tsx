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
        <div className="h-screen">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={20}>
                    <SideNav />
                </ResizablePanel>
                <ResizableHandle className="w-1 bg-slate-200/50" withHandle />
                <ResizablePanel defaultSize={80}>
                    <div className="h-full w-full bg-slate-500/50 p-3">
                        <div className="custom-scrollbar h-full w-full overflow-auto rounded-3xl bg-white">
                            {children}
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
