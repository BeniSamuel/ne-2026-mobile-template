import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { DictionaryDrawerContent } from './DictionaryDrawerContent';
import { DictionaryScreen } from '../screens/DictionaryScreen';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import { DictionaryDrawerParamList } from '../types/navigation.types';

const Drawer = createDrawerNavigator<DictionaryDrawerParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <DictionaryDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: colors.primary,
          drawerInactiveTintColor: colors.muted,
          drawerStyle: styles.drawer,
          headerShadowVisible: false,
          headerStyle: styles.header,
          headerTintColor: colors.text,
          headerTitle: 'Dictionary',
          headerTitleStyle: styles.headerTitle,
          sceneStyle: styles.scene,
        }}
      >
        <Drawer.Screen name="Dictionary" component={DictionaryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: colors.surface,
  },
  header: {
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontFamily: fonts.bold,
  },
  scene: {
    backgroundColor: colors.background,
  },
});
