import { Stack } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';

export default function ProfileTabLayout() {
  //return <Stack />;

  return (
    <Stack>
      <Stack.Screen name="profile" options={{ title: 'PROFILE', headerShown: false }} />
      <Stack.Screen name="settings" options={{ title: 'SETTINGS AND PRIVACY', headerTitleStyle: { color: '#024935', fontWeight: 'bold' } }} />
    </Stack>
  );
}
