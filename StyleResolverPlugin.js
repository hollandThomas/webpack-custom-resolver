const fs = require('fs');

const EXTENSION = '.styles';

/**
 * This plugin resolves imports of `*.styles.js` files either into the actually
 * provided filepath or the filepath of a custom styles implementation,
 * corresponding to given `customStylePrefix`.
 *
 * More information about resolver plugins:
 * https://github.com/webpack/enhanced-resolve#plugins
 */
class StyleResolverPlugin {
  /**
   * @param {string} customStylePrefix
   * @param {string} commonsStyleBasePath
   */
  constructor(customStylePrefix, commonsStyleBasePath) {
    this.customStylePrefix = customStylePrefix;
    this.commonsStyleBasePath = commonsStyleBasePath;
  }

  apply(resolver) {
    const CUSTOM_STYLES_EXTENSION = `.${this.customStylePrefix}${EXTENSION}`;
    const target = resolver.ensureHook('resolve');

    resolver
      .getHook('resolve')
      .tapAsync('StyleResolverPlugin', (request, resolveContext, callback) => {
        const isStyleRequest = request.request.endsWith(EXTENSION);

        /**
         * We only want to process requests issued from the
         * `commonsStyleBasePath` domain.
         */
        const isCommonsRequest =
          request.context &&
          request.context.issuer &&
          request.context.issuer.startsWith(this.commonsStyleBasePath);

        /**
         * Imagine a specific `*.[customStylePrefix].styles.js` file that wants
         * to import another `*.[customStylePrefix].styles.js` file.
         * Those imports should always resolve as is.
         */
        const isTransitiveCommonsStyleRequest =
          isCommonsRequest &&
          request.context &&
          request.context.issuer &&
          request.context.issuer.endsWith(`${EXTENSION}.js`);

        const isValidCustomStyleRequest =
          isStyleRequest &&
          isCommonsRequest &&
          !isTransitiveCommonsStyleRequest;

        if (!isValidCustomStyleRequest) {
          callback();
          return;
        }

        const customStylePath = `${request.path}${request.request
          .replace(EXTENSION, CUSTOM_STYLES_EXTENSION)
          .slice(1)}.js`;
        const hasCustomStyles = fs.existsSync(customStylePath);

        if (hasCustomStyles) {
          const customStyleRequest = {
            ...request,
            request: request.request.replace(
              EXTENSION,
              CUSTOM_STYLES_EXTENSION
            ),
          };

          resolver.doResolve(
            target,
            customStyleRequest,
            null,
            resolveContext,
            callback
          );
        } else {
          callback();
        }
      });
  }
}

module.exports = StyleResolverPlugin;
