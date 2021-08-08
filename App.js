import React from 'react';

// navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// bring in all screen
import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';
// import { NativeBaseProvider } from 'native-base';

const Stack = createStackNavigator();

const App = () => {
	return (
		// <NativeBaseProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen
						name="Home"
						component={Home}
						options={{
							headerStyle: {
								backgroundColor: '#07111a'
							},
							title: 'Watch Series List',
							headerTitleStyle: {
								textAlign: 'center',
								flex: 1,
								color: '#d8d8d8'
							}
						}}
					/>
					<Stack.Screen
						name="Add"
						component={Add}
						options={{
							headerStyle: {
								backgroundColor: '#07111a'
							},
							title: 'Watch Series List',
							headerTitleStyle: {
								textAlign: 'center',
								color: '#d8d8d8'
							}
						}}
					/>
					<Stack.Screen
						name="Edit"
						component={Edit}
						options={{
							headerStyle: {
								backgroundColor: '#07111a'
							},
							title: 'Watch Series List',
							headerTitleStyle: {
								textAlign: 'center',
								color: '#d8d8d8'
							}
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		// </NativeBaseProvider>
	);
};

export default App;
