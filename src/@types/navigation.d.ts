export type ProductNavigationProps = {
    id?: string;
}

export type OderNavigationProps = {
    id?: string;
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            product: ProductNavigationProps;
            order: OderNavigationProps,
            orders: undefined;
        }
    }
}