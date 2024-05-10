const winston = require("winston");

const customLvls = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "yellow",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};

const devLogger = winston.createLogger({
  levels: customLvls.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLvls.colors }),
        winston.format.timestamp(),
        winston.format.cli()
      ),
    }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLvls.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLvls.colors }),
        winston.format.timestamp(),
        winston.format.cli()
      ),
    }),
    new winston.transports.File({ level: "error", filename: "./errors.log" }),
  ],
});

const addLogger = (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    req.logger = prodLogger;
  } else {
    req.logger = devLogger;
  }
  next();
};

module.exports = {
  addLogger,
};
