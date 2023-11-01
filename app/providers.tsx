/*
 * @Author: err0r
 * @Date: 2023-09-23 23:02:35
 * @LastEditors: err0r
 * @LastEditTime: 2023-11-01 16:03:48
 * @Description: 
 * @FilePath: \bee-channel-front\app\(majority)\providers.tsx
 */
"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Provider } from "react-redux";
import store from "@/store";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {

	return (
		<NextUIProvider>
			<NextThemesProvider {...themeProps}>
				<Provider store={store}>
					{children}
				</Provider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}
