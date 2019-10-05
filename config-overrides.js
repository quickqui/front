var path = require ('path');
var fs = require ('fs');
const {
    override,
    addDecoratorsLegacy,
    babelInclude,
    disableEsLint,
    addBundleVisualizer,overrideDevServer,
} = require("customize-cra");

module.exports = function (config, env) {
    return Object.assign(config, override(
        disableEsLint(),
        // addBundleVisualizer(),
        addDecoratorsLegacy(),
        /*Make sure Babel compiles the stuff in the common folder*/
        babelInclude([
            path.resolve('src'), // don't forget this
            path.resolve('/Users/nielinjie/huadahengxinProjects/fake_device/use-quickqui/src')
        ])
        )(config, env),overrideDevServer(
            babelInclude([
                path.resolve('src'), // don't forget this
                path.resolve('/Users/nielinjie/huadahengxinProjects/fake_device/use-quickqui/src')
            ])
        )(config, env)
    )
}