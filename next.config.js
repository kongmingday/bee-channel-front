/*
 * @Author: err0r
 * @Date: 2023-09-23 23:02:35
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-02 17:22:07
 * @Description:
 * @FilePath: \bee-channel-front\next.config.js
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
	publicRuntimeConfig: {},
};

module.exports = nextConfig;
