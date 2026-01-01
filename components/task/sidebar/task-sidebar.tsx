"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Tv, Radio, Film, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
	icon: React.ReactNode;
	label: string;
	badge?: string;
	active?: boolean;
	href?: string;
}

function SidebarItem({ icon, label, badge, active, href }: SidebarItemProps) {
	const content = (
		<div className="flex items-center gap-3">
			{icon}
			<span>{label}</span>
		</div>
	);

	const badgeElement = badge && (
		<div className="bg-red-500 text-white text-xs rounded-full size-5 flex items-center justify-center">
			{badge}
		</div>
	);

	if (href) {
		return (
			<Button
				variant="ghost"
				className={cn(
					"w-full justify-between px-3 py-2 h-auto text-sm",
					active
						? "bg-muted text-foreground font-medium"
						: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
				)}
				asChild
			>
				<Link href={href}>
					{content}
					{badgeElement}
				</Link>
			</Button>
		);
	}

	return (
		<Button
			variant="ghost"
			className={cn(
				"w-full justify-between px-3 py-2 h-auto text-sm",
				active
					? "bg-muted text-foreground font-medium"
					: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
			)}
		>
			{content}
			{badgeElement}
		</Button>
	);
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="mb-6">
			<Button
				variant="ghost"
				className="gap-2 px-1 mb-2 text-xs h-auto py-0 text-muted-foreground hover:text-foreground"
			>
				<span>{title}</span>
				<ChevronDown className="size-3" />
			</Button>
			<div className="space-y-0.5">{children}</div>
		</div>
	);
}

export function TaskSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader className="pb-0 p-4">
				<div className="flex items-center gap-3">
					<Image
						src="/icon.png"
						alt="Ingenious Stream Logo"
						width={32}
						height={32}
						className="rounded"
					/>
					<span className="text-lg font-semibold">Ingenious Stream</span>
				</div>
			</SidebarHeader>

			<SidebarContent className="p-4">
				<div className="space-y-0.5 mb-6">
					<SidebarItem
						icon={<Home className="size-4" />}
						label="Home"
						href="/"
						active={pathname === "/"}
					/>
					<SidebarItem
						icon={<Tv className="size-4" />}
						label="Live TV"
						href="/live-tv"
						active={pathname === "/live-tv"}
					/>
					<SidebarItem
						icon={<Radio className="size-4" />}
						label="Radio"
						href="/radio"
						active={pathname === "/radio"}
					/>
					<SidebarItem
						icon={<Film className="size-4" />}
						label="Movies"
						href="/movies"
						active={pathname === "/movies"}
					/>
					<SidebarItem
						icon={<Search className="size-4" />}
						label="TV Guide"
						href="/tv-guide"
						active={pathname === "/tv-guide"}
					/>
				</div>
			</SidebarContent>
		</Sidebar>
	);
}
