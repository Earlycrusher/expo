import { Link } from 'expo-router';
import { View } from 'react-native';

export function StackLinks() {
  return (
    <View style={{ gap: 10, marginTop: 10 }}>
      <Link href="/(tabs)/home" experimentalPreview>
        /(tabs)/home
      </Link>
      <Link href="/(tabs)/home/st1" experimentalPreview>
        /(tabs)/home/st1
      </Link>
      <Link href="/(tabs)/home/st1/one" experimentalPreview>
        /(tabs)/home/st1/one
      </Link>
      <Link href="/(tabs)/home/st1/st2" experimentalPreview>
        /(tabs)/home/st1/st2
      </Link>
      <Link href="/(tabs)/home/st1/st2/one" experimentalPreview>
        /(tabs)/home/st1/st2/one
      </Link>
    </View>
  );
}
