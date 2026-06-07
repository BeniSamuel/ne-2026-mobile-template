import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/store/AuthContext';
import { ExpenseProvider } from './src/store/ExpenseContext';
import { RootNavigator } from './src/navigations/RootNavigator';

export default function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </ExpenseProvider>
    </AuthProvider>
  );
}
