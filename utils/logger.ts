import {createLogger, format, transports} from "winston";

const logger = createLogger({
    level: "debug",
    format: format.combine(
        format.errors({stack: true}),
        format.colorize(),
        format.timestamp({
            format: "HH:mm:ss"
        }),
        format.align(),
        format.printf(info => {
            return `${info.timestamp} [${info.level}] : ${info.message}`;
        })
    ),
    defaultMeta: {service: "logger"},
    transports: [
        new transports.Console(),
        //new transports.File({filename: "log"})
    ]
});

const Log = {
    debug(tag: string, msg: string): void {
        logger.debug(("[" + tag + "]").padEnd(16, " ") + msg);
    },
    info(tag: string, msg: string): void {
        logger.info(("[" + tag + "]").padEnd(16, " ") + msg);
    },
    warn(tag: string, msg: string): void {
        logger.warn(("[" + tag + "]").padEnd(16, " ") + msg);
    },
    error(tag: string, msg: string): void {
        logger.error(("[" + tag + "]").padEnd(16, " ") + msg);
    }
};

export default Log;