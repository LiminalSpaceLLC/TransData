import cfgRaw from './config.toml';
import { Config } from "@misc/type";

let _cfg: Config;

export const getConfig = () => {
    const env = Bun.env;
    if (!_cfg) {
        _cfg = cfgRaw as Config;
        if (_cfg.system.debug) console.log(cfgRaw);
        if (_cfg.system.debug) console.log(env);
    }
    return {
        cfg: _cfg,
        env: env
    };
};

export const cfg = () => getConfig();