// Wrapper for node-crawler (https://www.npmjs.com/package/crawler) to use promises

import C from "crawler";
import type {CreateCrawlerOptions, CrawlerRequestOptions} from "crawler";

export default class Crawler extends C {
    public constructor(options: CreateCrawlerOptions) {
        if (options.callback) {
            const originalCallback = options.callback;
            options.callback = async (error, res, done) => {
                try {
                    await originalCallback(error, res, done);
                    res.options.promise.resolve();
                } catch (e) {
                    res.options.promise.reject(e);
                }
            };
        }
        super(options);
    }

    public queue(urisOrOptions: string | ReadonlyArray<string> | CrawlerRequestOptions | ReadonlyArray<CrawlerRequestOptions>): Promise<void> {
        if (Array.isArray(urisOrOptions)) {
            const promiseArray: Promise<void>[] = [];
            urisOrOptions = urisOrOptions.map(v => {
                const p = new Promise<void>((resolve, reject) => {
                    if (typeof v === "string") {
                        v = {uri: v, promise: {resolve, reject}};
                    } else {
                        v.options.promise = {resolve, reject};
                    }
                });
                promiseArray.push(p);
                return v;
            });
            super.queue(urisOrOptions);
            return Promise.all(promiseArray).then(() => {});
        } else {
            const p = new Promise<void>((resolve, reject) => {
                if (typeof urisOrOptions === "string") {
                    urisOrOptions = {uri: urisOrOptions, promise: {resolve, reject}};
                } else {
                    (<CrawlerRequestOptions>urisOrOptions).options.promise = {resolve, reject};
                }
            });
            super.queue(urisOrOptions);
            return p;
        }
    }
}