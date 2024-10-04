/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { }) => {
        config.module.rules.push({
          test: /\.(graphql|gql)$/, // Procura por arquivos .graphql ou .gql
          exclude: /node_modules/,  // Ignora a pasta node_modules
          use: [{ loader: 'graphql-tag/loader' }] // Usa o loader graphql-tag
        });
    
        return config;
      },
};

export default nextConfig;
