import { usePathname } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

import { StackLinks } from '@/__e2e__/link-preview/components/StackLinks';

export default function Index() {
  const pathname = usePathname();

  return (
    <View style={{ flex: 1, padding: 10, gap: 10, backgroundColor: '#dff' }}>
      <Text>Index</Text>
      <Text>Current Path: {pathname}</Text>
      <StackLinks />
    </View>
  );
}
