export function retryPromise<T>(p: Promise<T>): Promise<T> {
    return new Promise<T>((resolve) => {
        p.then(res => resolve(res)).catch(() => new Promise(resolve => setTimeout(() => resolve(retryPromise(p)), 100)));
    });
}