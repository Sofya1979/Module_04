import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const config = {
  entry: './src/employees.jsx',
  output: {
    filename:'employees.bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
    plugins: [
    // Add your plugins here
  ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          //exclude: /node_modules/,
          //use: {
            loader: 'babel-loader',
           // options: {
             // presets: ['@babel/preset-env', '@babel/preset-react']
            //},
          //},
        },
      ],
    }
}
export default function () {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
 
};