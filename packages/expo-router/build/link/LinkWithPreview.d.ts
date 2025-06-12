import React, { type PropsWithChildren, type ReactElement } from 'react';
import { LinkProps } from './useLinkHooks';
export declare function LinkWithPreview({ experimentalPreview, children, ...rest }: LinkProps): React.JSX.Element;
interface LinkMenuItemProps {
    /**
     * The title of the menu item.
     */
    title: string;
    onPress: () => void;
}
export declare function LinkMenuItem(_: LinkMenuItemProps): null;
interface LinkMenuProps {
    children: ReactElement<LinkMenuItemProps> | ReactElement<LinkMenuItemProps>[];
}
export declare function LinkMenu({ children }: LinkMenuProps): React.JSX.Element[] | null;
interface LinkPreviewProps {
    /**
     * Sets the preferred width of the preview.
     * If not set, full width of the screen will be used.
     *
     * This is only **preferred** width, the actual width may be different
     */
    width?: number;
    /**
     * Sets the preferred height of the preview.
     * If not set, full height of the screen will be used.
     *
     * This is only **preferred** height, the actual height may be different
     */
    height?: number;
    children?: React.ReactNode;
}
export declare function LinkPreview({ children, width, height }: LinkPreviewProps): React.JSX.Element | null;
export declare function LinkTrigger(props: PropsWithChildren): string | number | bigint | boolean | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.JSX.Element | null | undefined;
export {};
//# sourceMappingURL=LinkWithPreview.d.ts.map