"use client";

import { StrictMode, useEffect } from 'react'
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
