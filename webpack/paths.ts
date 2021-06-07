import path from 'path';

export default {
  context: path.resolve(__dirname, '../client'),
  static: path.resolve(__dirname, '../static'),
  entrances: {
    web: path.resolve(__dirname, '../client/web.jsx'),
    node: path.resolve(__dirname, '../client/node.jsx'),
  },
  dist: {
    web: path.resolve(__dirname, '../dist/web'),
    node: path.resolve(__dirname, '../dist/node'),
  },
};
