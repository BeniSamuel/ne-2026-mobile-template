import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet } from 'react-native';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { AuthStackParamList, MainTabParamList } from '../types/navigation.types';
import { useAuth } from '../store/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { FinanceScreen } from '../screens/FinanceScreen';
import { AddExpenseScreen } from '../screens/AddExpenseScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
            Home: 'home-outline',
            Finance: 'receipt-outline',
            AddExpense: 'add',
            Profile: 'person-outline',
          };

          return <Ionicons name={icons[route.name]} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Finance" component={FinanceScreen} />
      <Tab.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{
          title: 'Add',
          tabBarButton: ({ onPress, accessibilityState }) => (
            <Pressable
              accessibilityRole="button"
              accessibilityState={accessibilityState}
              onPress={onPress}
              style={styles.addButton}
            >
              <Ionicons name="add" color={colors.surface} size={30} />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="Preparing your finance tracker..." />;
  }

  return <NavigationContainer>{user ? <MainTabs /> : <AuthNavigator />}</NavigationContainer>;
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    height: 72,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  addButton: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 28,
    bottom: 14,
    height: 58,
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    width: 58,
  },
});
