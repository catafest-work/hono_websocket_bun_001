const webpackPreprocessor = require('@cypress/webpack-batteries-included-preprocessor')

module.exports = (on) => {
    on('file:preprocessor', webpackPreprocessor({
        typescript: require.resolve('typescript'),
        webpackOptions: {
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.jsx']
            },
            module: {
                rules: [
                    {
                        test: /\.(ts|tsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true
                            }
                        }
                    }
                ]
            }
        }
    }))
}
