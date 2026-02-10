export const loggerMiddleware = (req: any, res: any, next: any) => {
	const start = Date.now();
	res.on('finish', () => {
		const durationMs = Date.now() - start;
		console.log(
			`${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationMs}ms)`
		);
	});
	next();
};
