"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface WaitlistModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	formUrl?: string;
}

export function WaitlistModal({ open, onOpenChange, formUrl }: WaitlistModalProps) {
	const defaultFormUrl =
		process.env.NEXT_PUBLIC_FORMBRICKS_WAITLIST_URL ||
		"https://app.formbricks.com/s/cmk8i8srt7ex5ad01vn31o5np?embed=true";

	const embedUrl = formUrl || defaultFormUrl;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="max-w-[520px] sm:max-w-[600px] p-0 gap-0 h-[70vh] sm:h-[65vh]"
				showClose
			>
				<DialogTitle className="sr-only">Join the Waitlist</DialogTitle>
				<div className="flex flex-col w-full h-full">
					<div className="flex items-center pt-3 px-6">
						<Image
							src="/logo-main.png"
							alt="Ingenious Stream"
							width={180}
							height={48}
							className="object-contain"
						/>
					</div>
					<div className="relative flex-1 overflow-auto">
						<iframe
							src={embedUrl}
							className="absolute inset-0 w-full h-full border-0"
							title="Android App Waitlist"
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
