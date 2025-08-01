import { Button, RouterLogo } from '@expo/styleguide';
import { EasMetadataIcon } from '@expo/styleguide-icons/custom/EasMetadataIcon';
import { EasSubmitIcon } from '@expo/styleguide-icons/custom/EasSubmitIcon';
import { PlanEnterpriseIcon } from '@expo/styleguide-icons/custom/PlanEnterpriseIcon';
import { StoplightIcon } from '@expo/styleguide-icons/custom/StoplightIcon';
import { PlaySquareDuotoneIcon } from '@expo/styleguide-icons/duotone/PlaySquareDuotoneIcon';
import { CheckIcon } from '@expo/styleguide-icons/outline/CheckIcon';
import { Cloud01Icon } from '@expo/styleguide-icons/outline/Cloud01Icon';
import { CodeSquare01Icon } from '@expo/styleguide-icons/outline/CodeSquare01Icon';
import { CpuChip01Icon } from '@expo/styleguide-icons/outline/CpuChip01Icon';
import { Cube01Icon } from '@expo/styleguide-icons/outline/Cube01Icon';
import { DataIcon } from '@expo/styleguide-icons/outline/DataIcon';
import { Dataflow03Icon } from '@expo/styleguide-icons/outline/Dataflow03Icon';
import { LayersTwo02Icon } from '@expo/styleguide-icons/outline/LayersTwo02Icon';
import { NotificationBoxIcon } from '@expo/styleguide-icons/outline/NotificationBoxIcon';
import { PaletteIcon } from '@expo/styleguide-icons/outline/PaletteIcon';
import { Phone01Icon } from '@expo/styleguide-icons/outline/Phone01Icon';
import { PlaySquareIcon } from '@expo/styleguide-icons/outline/PlaySquareIcon';
import { Rocket01Icon } from '@expo/styleguide-icons/outline/Rocket01Icon';
import { TerminalBrowserIcon } from '@expo/styleguide-icons/outline/TerminalBrowserIcon';
import { useRouter } from 'next/compat/router';

import { isRouteActive } from '~/common/routes';
import { reportEasTutorialCompleted } from '~/providers/Analytics';
import { useTutorialChapterCompletion } from '~/providers/TutorialChapterCompletionProvider';
import { NavigationRoute } from '~/types/common';
import { HandWaveIcon } from '~/ui/components/CustomIcons/HandWaveIcon';
import { CircularProgressBar } from '~/ui/components/ProgressTracker/CircularProgressBar';

import { SidebarLink } from './SidebarLink';
import { SidebarSection } from './SidebarSection';
import { SidebarTitle } from './SidebarTitle';
import { SidebarNodeProps } from './types';

export const SidebarGroup = ({ route, parentRoute }: SidebarNodeProps) => {
  const { chapters, setChapters, getStartedChapters, setGetStartedChapters } =
    useTutorialChapterCompletion();
  const router = useRouter();

  const title = route.sidebarTitle ?? route.name;
  const Icon = getIconElement(title);

  if (route.children?.[0]?.section === 'EAS tutorial') {
    const allChaptersCompleted = chapters.every(chapter => chapter.completed);
    const completedChaptersCount = chapters.filter(chapter => chapter.completed).length;
    const totalChapters = chapters.length;
    const progressPercentage = (completedChaptersCount / totalChapters) * 100;

    if (allChaptersCompleted) {
      reportEasTutorialCompleted();
    }

    const isChapterCompleted = (childSlug: string) => {
      return chapters.some(chapter => chapter.slug === childSlug && chapter.completed);
    };

    const resetTutorial = () => {
      if (allChaptersCompleted) {
        const resetChapters = chapters.map(chapter => ({ ...chapter, completed: false }));
        setChapters(resetChapters);
      }
    };

    return (
      <div className="mb-5">
        {!shouldSkipTitle(route, parentRoute) && title && (
          <div className="flex flex-row items-center justify-between py-0">
            <SidebarTitle Icon={Icon} sectionName={title}>
              {title}
            </SidebarTitle>
            <div className="flex flex-row items-center pb-1">
              <CircularProgressBar progress={progressPercentage} />{' '}
              <p className="ml-2 text-xs text-tertiary">{`${completedChaptersCount} of ${totalChapters}`}</p>
            </div>
          </div>
        )}
        {route.children.map(child => {
          const childSlug = child.href;
          const completed = isChapterCompleted(childSlug);
          const isSelected = isRouteActive(child, router?.asPath, router?.pathname);

          return (
            <SidebarLink
              info={{ ...child, hasVideoLink: false }}
              className="flex flex-1"
              key={`${route.name}-${child.name}`}>
              <span className="inline">
                {child.sidebarTitle ?? child.name}
                {child.hasVideoLink &&
                  (!isSelected ? (
                    <PlaySquareIcon className="icon-xs ml-1 inline text-icon-secondary" />
                  ) : (
                    <PlaySquareDuotoneIcon className="icon-xs ml-1 inline text-palette-blue11" />
                  ))}
              </span>
              {completed && <CheckIcon className="icon-sm ml-auto" />}
            </SidebarLink>
          );
        })}
        {allChaptersCompleted && (
          <Button
            onClick={resetTutorial}
            theme="secondary"
            className="flex w-full items-center justify-center"
            href="/tutorial/eas/introduction/">
            Reset tutorial
          </Button>
        )}
      </div>
    );
  }

  if (route.children?.[0]?.section === 'Expo tutorial') {
    const allGetStartedChaptersCompleted = getStartedChapters.every(chapter => chapter.completed);
    const completedGetStartedChaptersCount = getStartedChapters.filter(
      chapter => chapter.completed
    ).length;
    const totalGetStartedChapters = getStartedChapters.length;
    const progressPercentageForGetStarted =
      (completedGetStartedChaptersCount / totalGetStartedChapters) * 100;

    const isGetStartedChapterCompleted = (childSlug: string) => {
      return getStartedChapters.some(chapter => chapter.slug === childSlug && chapter.completed);
    };

    const resetGetStartedTutorial = () => {
      if (allGetStartedChaptersCompleted) {
        const resetChapters = getStartedChapters.map(chapter => ({
          ...chapter,
          completed: false,
        }));
        setGetStartedChapters(resetChapters);
      }
    };

    return (
      <div className="mb-5">
        {!shouldSkipTitle(route, parentRoute) && title && (
          <div className="flex flex-row items-center justify-between py-0">
            <SidebarTitle Icon={Icon} sectionName={title}>
              {title}
            </SidebarTitle>
            <div className="flex flex-row items-center pb-1">
              <CircularProgressBar progress={progressPercentageForGetStarted} />{' '}
              <p className="ml-2 text-xs text-tertiary">{`${completedGetStartedChaptersCount} of ${totalGetStartedChapters}`}</p>
            </div>
          </div>
        )}
        {route.children.map(child => {
          const childSlug = child.href;
          const completed = isGetStartedChapterCompleted(childSlug);
          const isSelected = isRouteActive(child, router?.asPath, router?.pathname);

          return (
            <SidebarLink
              info={{ ...child, hasVideoLink: false }}
              className="flex flex-1"
              key={`${route.name}-${child.name}`}>
              <span className="inline">
                {child.sidebarTitle ?? child.name}
                {child.hasVideoLink &&
                  (!isSelected ? (
                    <PlaySquareIcon className="icon-xs ml-1 inline text-icon-secondary" />
                  ) : (
                    <PlaySquareDuotoneIcon className="icon-xs ml-1 inline text-palette-blue11" />
                  ))}
              </span>
              {completed && <CheckIcon className="icon-sm ml-auto" />}
            </SidebarLink>
          );
        })}
        {allGetStartedChaptersCompleted && (
          <Button
            onClick={resetGetStartedTutorial}
            theme="secondary"
            className="flex w-full items-center justify-center"
            href="/tutorial/eas/introduction/">
            Reset tutorial
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="mb-5">
      {!shouldSkipTitle(route, parentRoute) && title && (
        <SidebarTitle Icon={Icon} sectionName={title}>
          {title}
        </SidebarTitle>
      )}
      {(route.children ?? []).map(child =>
        child.type === 'page' ? (
          <SidebarLink key={`${route.name}-${child.name}`} info={child}>
            {child.sidebarTitle ?? child.name}
          </SidebarLink>
        ) : (
          <SidebarSection
            key={`group-${child.name}-${route.name}`}
            route={child}
            parentRoute={route}
          />
        )
      )}
    </div>
  );
};

function shouldSkipTitle(info: NavigationRoute, parentGroup?: NavigationRoute) {
  if (info.name === parentGroup?.name) {
    // If the title of the group is Expo SDK and the section within it has the same name
    // then we shouldn't show the title twice. You might want to organize your group like
    // so it is collapsible
    return true;
  } else if (
    info.children &&
    (info.children[0]?.sidebarTitle ?? info.children[0]?.name) === info.name
  ) {
    // If the first child post in the group has the same name as the group, then hide the
    // group title, lest we be very repetitive
    return true;
  }

  return false;
}

function getIconElement(iconName?: string) {
  switch (iconName) {
    case 'Develop':
      return TerminalBrowserIcon;
    case 'Review':
      return StoplightIcon;
    case 'Deploy':
      return Rocket01Icon;
    case 'Monitor':
      return DataIcon;
    case 'Development process':
      return CodeSquare01Icon;
    case 'EAS Build':
      return Cube01Icon;
    case 'EAS Submit':
      return EasSubmitIcon;
    case 'EAS Update':
      return LayersTwo02Icon;
    case 'EAS Metadata':
      return EasMetadataIcon;
    case 'EAS Insights':
      return DataIcon;
    case 'EAS Workflows':
      return Dataflow03Icon;
    case 'EAS Hosting':
      return Cloud01Icon;
    case 'Expo Modules API':
      return CpuChip01Icon;
    case 'Expo Router':
      return RouterLogo;
    case 'Push notifications':
      return NotificationBoxIcon;
    case 'Distribution':
      return Phone01Icon;
    case 'UI programming':
      return PaletteIcon;
    case 'EAS':
      return PlanEnterpriseIcon;
    case 'Get started':
      return HandWaveIcon;
    case 'Expo tutorial':
      return HandWaveIcon;
    case 'EAS tutorial':
      return PlanEnterpriseIcon;
    default:
      return undefined;
  }
}
