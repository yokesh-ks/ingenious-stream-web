import { TaskSidebar } from '@/components/task/sidebar/task-sidebar';
import { TaskHeader } from '@/components/task/header/task-header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <TaskSidebar />
      <div className="flex-1 flex flex-col overflow-hidden h-screen">
        <TaskHeader />
        <main className="w-full h-full overflow-x-auto">
          <h1>Hello</h1>
        </main>
      </div>
    </SidebarProvider>
  );
}
