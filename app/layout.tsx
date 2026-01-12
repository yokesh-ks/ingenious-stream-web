import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PlayerProvider } from "@/context/PlayerContext";
import { PlayerBar } from "@/components/radio/player-bar";
import { QueryProvider } from "@/components/query-provider";

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
				<Script
					dangerouslySetInnerHTML={{
						__html: `(function(c,l,a,r,i,t,y){
	c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
	t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
	y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "v0479idnm4");`,
					}}
					strategy="beforeInteractive"
				/>
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-5THXGYQ75F"
					strategy="afterInteractive"
				/>
				<Script
					dangerouslySetInnerHTML={{
						__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-5THXGYQ75F');
						`,
					}}
					strategy="afterInteractive"
				/>
				<QueryProvider>
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
				</QueryProvider>
			</body>
		</html>
	);
}
