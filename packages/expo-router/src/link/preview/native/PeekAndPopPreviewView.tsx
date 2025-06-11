import { requireNativeView } from 'expo';

import { PeekAndPopPreviewViewProps } from './types';

const NativeView: React.ComponentType<PeekAndPopPreviewViewProps> = requireNativeView(
  'ExpoRouterPeekAndPop',
  'PeekAndPopPreviewView'
);

export default function PeekAndPopPreviewNativeView(props: PeekAndPopPreviewViewProps) {
  return <NativeView {...props} />;
}
