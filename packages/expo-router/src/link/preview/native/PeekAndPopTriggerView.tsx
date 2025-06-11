import { requireNativeView } from 'expo';

import { PeekAndPopTriggerViewProps } from './types';

const NativeView: React.ComponentType<PeekAndPopTriggerViewProps> = requireNativeView(
  'ExpoRouterPeekAndPop',
  'PeekAndPopTriggerView'
);

export default function PeekAndPopTriggerNativeView(props: PeekAndPopTriggerViewProps) {
  return <NativeView {...props} />;
}
