export function p(fn: () => any) {
	return {
		defer: true,
		async fn(deferred: any) {
			await fn();
			deferred.resolve();
		},
	};
}
