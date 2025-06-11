import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

import { Links } from '@/__e2e__/link-preview/components/Links';

const HomeOne = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('/');
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text>Navigate</Text>
      <Links />
    </View>
  );
};

export default HomeOne;
