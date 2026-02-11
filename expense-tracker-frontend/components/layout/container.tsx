import { cn } from '@/lib/utils';

export default function Container({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				'mx-auto border-x border-accent border-dotted relative max-w-6xl px-4 sm:px-6 lg:px-8',
				className
			)}
		>
			{children}
		</div>
	);
}
