"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Tv, Radio, Film, ArrowRight, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "@/components/waitlist-modal";

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

export function TaskSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	const [waitlistModalOpen, setWaitlistModalOpen] = React.useState(false);

	return (
		<>
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
					<div className="space-y-0.5">
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
					</div>

					<SidebarGroup className="p-0">
						<SidebarGroupLabel>Tools</SidebarGroupLabel>
						<SidebarGroupContent>
							<div className="space-y-0.5">
								<SidebarItem
									icon={<Lightbulb className="size-4" />}
									label="Movies Suggest"
									href="/movies-suggest"
									active={pathname === "/movies-suggest"}
								/>
							</div>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>

				<SidebarFooter className="p-4 mt-auto">
					<div className="relative group">
						{/* Main card */}
						<div className="relative overflow-hidden rounded-xl bg-black p-4 animate-float group-hover:shadow-2xl group-hover:shadow-blue-500/30 transition-all duration-500">
							{/* Animated grid background */}
							<div className="absolute inset-0 opacity-10">
								<div
									className="absolute inset-0 animate-grid"
									style={{
										backgroundImage:
											"linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
										backgroundSize: "20px 20px",
									}}
								></div>
							</div>

							{/* Floating particles */}
							<div className="absolute inset-0 overflow-hidden pointer-events-none">
								<div className="absolute top-[10%] left-[5%] size-1.5 bg-blue-400 rounded-full animate-particle-1"></div>
								<div className="absolute top-[70%] right-[10%] size-1 bg-green-400 rounded-full animate-particle-2"></div>
								<div className="absolute bottom-[20%] left-[60%] size-1 bg-yellow-400 rounded-full animate-particle-3"></div>
								<div className="absolute top-[50%] right-[30%] size-1.5 bg-red-400 rounded-full animate-particle-4"></div>
							</div>

							{/* Content */}
							<div className="relative flex flex-col gap-3">
								{/* First row: Play Store logo and text */}
								<div className="flex items-center gap-4">
									{/* Google Play Store Logo with animation */}
									<div className="relative shrink-0 group-hover:scale-110 transition-transform duration-500">
										<div className="absolute inset-0 bg-blue-500/30 rounded-lg blur-md animate-pulse-slow"></div>
										<div className="relative size-12 bg-gradient-to-br from-blue-500 via-green-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg animate-tilt">
											<svg viewBox="0 0 24 24" className="size-8 text-white" fill="currentColor">
												<path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
											</svg>
										</div>
									</div>

									{/* Text */}
									<div className="flex-1">
										<div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
											Coming soon to
										</div>
										<div className="text-base font-black text-white tracking-tight animate-text-glow mt-0.5">
											Google Play Store
										</div>
									</div>
								</div>

								{/* Second row: Join Waitlist button */}
								<div className="flex">
									<button
										onClick={() => setWaitlistModalOpen(true)}
										className="relative w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 group-hover:scale-105 overflow-hidden"
									>
										{/* Button shimmer effect */}
										<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
										<span className="relative flex items-center justify-between gap-2">
											Join Waitlist
											<ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
										</span>
									</button>
								</div>
							</div>

							{/* Bottom shine effect */}
							<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
						</div>

						{/* Outer glow on hover */}
						<div className="absolute inset-0 bg-blue-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
					</div>
				</SidebarFooter>
			</Sidebar>

			<WaitlistModal open={waitlistModalOpen} onOpenChange={setWaitlistModalOpen} />
		</>
	);
}
