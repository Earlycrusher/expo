import { usePathname, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

import { Links } from '@/__e2e__/link-preview/components/Links';

const HomeOne = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/(tabs)/home/slot/one');
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text>Router</Text>
      <Links />
    </View>
  );
};

export default HomeOne;
