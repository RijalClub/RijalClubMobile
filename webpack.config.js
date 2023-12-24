const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const { DefinePlugin } = require("webpack");
const get = require("lodash/get");

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function configureWebpack(
  /** @type {import("@expo/webpack-config/webpack/types").InputEnvironment} */ env,
                                                                               /** @type {import("@expo/webpack-config/webpack/types").Arguments} */ argv,
                                                                               ) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add in missing process.env.EXPO_PUBLIC_<...> variables to the DefinePlugin
  const expoPublicEnvVars = Object.fromEntries(
    Object.entries(process.env)
      .filter(([key]) => key.startsWith("EXPO_PUBLIC_"))
      .map(([key, value]) => [key, JSON.stringify(value)]),
      );
  const configDefinePlugin = config.plugins?.[4];
  if (!(configDefinePlugin instanceof DefinePlugin)) {
    throw new Error("unexpected config plugins array order");
  }
  const configDefinePluginEnv = /** @type {{}} */ (
    // NOTE: the last key is actually the string "process.env", so to access without lodash
    // (less type-safe) you would need to do configDefinePlugin.definitions["process.env"]
    get(configDefinePlugin.definitions, ["process.env"])
    );
  Object.assign(configDefinePluginEnv, expoPublicEnvVars);

  // Finally return the new config for the CLI to use.
  return config;
};
