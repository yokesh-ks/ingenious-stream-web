"use client";

import {
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export function TaskHeader() {
  return (
    <div className="border-b border-border bg-background">
      <div className="flex items-center justify-between px-3 lg:px-6 py-3">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <h1 className="text-base lg:text-lg font-semibold">Home</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <Button variant="outline" className="shadow-none" asChild>
            <Link
              href="https://github.com/yokesh-ks/ingenious-stream-web"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
              GitHub
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

