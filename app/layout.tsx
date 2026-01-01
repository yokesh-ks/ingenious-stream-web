import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PlayerProvider } from "@/context/PlayerContext";
import { PlayerBar } from "@/components/radio/player-bar";

import { TaskSidebar } from "@/components/task/sidebar/task-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Ingenious Stream - Radio & Entertainment",
	description: "Stream live radio stations from around the world",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<PlayerProvider>
						<SidebarProvider>
							<TaskSidebar />

							{children}

							<PlayerBar />
						</SidebarProvider>
					</PlayerProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
