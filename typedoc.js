module.exports = {
  inputFiles: ["./src"],
  mode: "modules",
  includeDeclarations: false,
  tsconfig: "./tsconfig.json",
  out: "./contributing/docs",
  readme: "README.md",
  ignoreCompilerErrors: false,
  plugin: "none",
  listInvalidSymbolLinks: true,
  //  theme: "./node_modules/typedoc-neo-theme/bin/default",
};
