export default function(config, env, helpers) {
  const { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0];
  Object.assign(
    plugin.definitions,
    {
      process: {
        env: {
          NODE_ENV: `"${process.env.NODE_ENV}"`
        }
      }
    }
  );
}
