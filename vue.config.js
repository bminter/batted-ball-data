module.exports = {
  "transpileDependencies": [
    "vuetify",
  ],
  chainWebpack: config => {
    config.module
      .rule('xlsx')
      .test(/\.(csv|xlsx|xls)$/)
      .use('file-loader')
      .loader('file-loader')
      .end();
    
  },
};
