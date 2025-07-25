import { ExpoLink } from './ExpoLink';
import { LinkMenu, LinkMenuAction, LinkPreview, LinkTrigger } from './LinkWithPreview';
import { resolveHref } from './href';
import type { LinkProps, WebAnchorProps } from './useLinkHooks';

export const Link = Object.assign(
  /**
   * Component that renders a link using [`href`](#href) to another route.
   * By default, it accepts children and wraps them in a `<Text>` component.
   *
   * Uses an anchor tag (`<a>`) on web and performs a client-side navigation to preserve
   * the state of the website and navigate faster. The web-only attributes such as `target`,
   * `rel`, and `download` are supported and passed to the anchor tag on web. See
   * [`WebAnchorProps`](#webanchorprops) for more details.
   *
   * > **Note**: Client-side navigation works with both single-page apps,
   * and [static-rendering](/router/reference/static-rendering/).
   *
   * @example
   * ```tsx
   * import { Link } from 'expo-router';
   * import { View } from 'react-native';
   *
   * export default function Route() {
   *  return (
   *   <View>
   *    <Link href="/about">About</Link>
   *   </View>
   *  );
   *}
   * ```
   */
  function Link(props: LinkProps) {
    // Re-exporting ExpoLink here so that Link.* can be used in server components.
    return <ExpoLink {...props} />;
  },
  {
    resolveHref,
    /**
     * A component used to group context menu actions for a link.
     *
     * If multiple `Link.Menu` components are used within a single `Link`, only the first one will be rendered.
     * Only `Link.MenuAction` components are allowed as children of `Link.Menu`.
     *
     * @example
     * ```tsx
     * <Link.Menu>
     *   <Link.MenuAction title="Action 1" onPress={()=>{}} />
     *   <Link.MenuAction title="Action 2" onPress={()=>{}} />
     * </Link.Menu>
     * ```
     *
     * @platform ios
     */
    Menu: LinkMenu,
    /**
     * A component used as a link trigger. The content of this component will be rendered in the base link.
     *
     * If multiple `Link.Trigger` components are used within a single `Link`, only the first one will be rendered.
     *
     * @example
     * ```tsx
     * <Link href="/about">
     *   <Link.Trigger>
     *     Trigger
     *   </Link.Trigger>
     * </Link>
     * ```
     *
     * @platform ios
     */
    Trigger: LinkTrigger,
    /**
     * A component used to render and customize the link preview.
     *
     * If `Link.Preview` is used without any props, it will render a preview of the `href` passed to the `Link`.
     *
     * If multiple `Link.Preview` components are used within a single `Link`, only the first one will be rendered.
     *
     * To customize the preview, you can pass custom content as children.
     *
     * @example
     * ```tsx
     * <Link href="/about">
     *   <Link.Preview>
     *     <Text>Custom Preview Content</Text>
     *   </Link.Trigger>
     * </Link>
     * ```
     *
     * @example
     * ```tsx
     * <Link href="/about">
     *   <Link.Preview />
     * </Link>
     * ```
     *
     * @platform ios
     */
    Preview: LinkPreview,
    /**
     * A component used to render a context menu action for a link.
     * This component should only be used as a child of `Link.Menu`.
     *
     * @platform ios
     */
    MenuAction: LinkMenuAction,
  }
);

export type LinkComponent = typeof Link;

export { LinkProps, WebAnchorProps };
export { Redirect, RedirectProps } from './Redirect';
