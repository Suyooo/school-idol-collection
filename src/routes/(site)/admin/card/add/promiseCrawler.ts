// Wrapper for node-crawler (https://www.npmjs.com/package/crawler) to use promises

import C from "crawler";
import type {CreateCrawlerOptions, CrawlerRequestOptions} from "crawler";

export default class Crawler extends C {
    public constructor(options: CreateCrawlerOptions) {
        if (options.callback) {
            const originalCallback = options.callback;
            options.callback = async (error, res, done) => {
                try {
                    const callbackPromise = new Promise<void>(resolve => originalCallback(error, res, resolve));
                    await callbackPromise;
                    res.options.promise.resolve();
                } catch (e) {
                    res.options.promise.reject(e);
                } finally {
                    done();
                }
            };
        } else {
            options.callback = async (_error, res, done) => {
                res.options.promise.resolve();
                done();
            };
        }
        super(options);
    }

    public async queue(urisOrOptions: string | ReadonlyArray<string> | CrawlerRequestOptions | ReadonlyArray<CrawlerRequestOptions>): Promise<void> {
        if (Array.isArray(urisOrOptions)) {
            const promiseArray: Promise<void>[] = [];
            urisOrOptions = urisOrOptions.map(v => {
                const p = new Promise<void>((resolve, reject) => {
                    if (typeof v === "string") {
                        v = {uri: v, promise: {resolve, reject}};
                    } else {
                        v.promise = {resolve, reject};
                    }
                });
                promiseArray.push(p);
                return v;
            });
            super.queue(urisOrOptions);
            await Promise.all(promiseArray);
        } else {
            const p = new Promise<void>((resolve, reject) => {
                if (typeof urisOrOptions === "string") {
                    urisOrOptions = {uri: urisOrOptions, promise: {resolve, reject}};
                } else {
                    (<CrawlerRequestOptions>urisOrOptions).promise = {resolve, reject};
                }
            });
            super.queue(urisOrOptions);
            await p;
        }
    }
}