import type { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store as appStore, type AppStore } from '@/stores';

export function ReduxProvider({
	children,
	store = appStore,
}: PropsWithChildren<{ store?: AppStore }>) {
	return <Provider store={store}>{children}</Provider>;
}
