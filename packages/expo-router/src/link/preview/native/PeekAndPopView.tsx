import { requireNativeView } from 'expo';

import { PeekAndPopViewProps } from './types';

const NativeView: React.ComponentType<PeekAndPopViewProps> = requireNativeView(
  'ExpoRouterPeekAndPop',
  'PeekAndPopView'
);

export default function PeekAndPopNativeView(props: PeekAndPopViewProps) {
  return <NativeView {...props} />;
}
