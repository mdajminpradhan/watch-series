// import React, { useState } from 'react';
// import { Text, StyleSheet, ScrollView } from 'react-native';

// import { Container, FormControl, Stack, Input, Button, Heading } from 'native-base';

// import { nanoid } from 'nanoid';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Add = ({ navigation, route }) => {
// 	const [ name, setName ] = useState('');
// 	const [ totalSeason, setTotalSeason ] = useState('');

// 	const addSeries = async () => {
// 		try {
// 			if (!name || !totalSeason) {
// 				return alert('Please add both fields');
// 			}

// 			const data = {
// 				id: nanoid(),
// 				name,
// 				totalSeason,
// 				isWatched: false
// 			};

// 			const storedValue = await AsyncStorage.getItem('@season_list');
// 			const prevList = await JSON.parse(storedValue);

// 			if (!prevList) {
// 				const newList = [ data ];
// 				await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
// 			} else {
// 				prevList.push(data);
// 				await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
// 			}

// 			setName('');
// 			setTotalSeason('');

// 			navigation.navigate('Home');
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	return (
// 		<Container style={styles.container}>
// 			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
// 				<Heading size="md" style={styles.heading}>
// 					Add to watch
// 				</Heading>

// 				<FormControl>
// 					<Stack space={5}>
// 						<Stack rounded style={styles.formItem}>
// 							<Input
// 								placeholder="Series to watch"
// 								style={{ color: '#eee' }}
// 								value={name}
// 								onChangeText={(text) => setName(text)}
// 							/>
// 						</Stack>
// 						<Stack rounded style={styles.formItem}>
// 							<Input
// 								placeholder="Season number"
// 								style={{ color: '#eee' }}
// 								value={totalSeason}
// 								onChangeText={(number) => setTotalSeason(number)}
// 							/>
// 						</Stack>
// 						<Button rounded block onPress={addSeries}>
// 							<Text style={{ color: '#eee' }}>Add</Text>
// 						</Button>
// 					</Stack>
// 				</FormControl>
// 			</ScrollView>
// 		</Container>
// 	);
// };

// export default Add;

// const styles = StyleSheet.create({
// 	container: {
// 		backgroundColor: '#1b262c',
// 		flex: 1,
// 		justifyContent: 'flex-start'
// 	},
// 	heading: {
// 		textAlign: 'center',
// 		color: '#00b7c2',
// 		marginHorizontal: 5,
// 		marginTop: 50,
// 		marginBottom: 20
// 	},
// 	formItem: {
// 		marginBottom: 20
// 	}
// });

import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

import { nanoid } from 'nanoid/non-secure';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
	const [ name, setName ] = useState('');
	const [ totalSeason, setTotalSeason ] = useState('');

	const addSeries = async () => {
		try {
			if (!name || !totalSeason) {
				return alert('Please add both fields');
			}

			const data = {
				id: nanoid(),
				name,
				totalSeason
			};

			const storedValue = await AsyncStorage.getItem('@season_list');
			const prevList = await JSON.parse(storedValue);

			if (!prevList) {
				const newList = [ data ];
				await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
			} else {
				prevList.push(data);
				await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
			}

			setName('');
			setTotalSeason('');

			navigation.navigate('Home');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Add a series you want watch</Text>

			<TextInput
				style={styles.input}
				keyboardType="default"
				placeholder="Enter seires name"
				placeholderTextColor="white"
				value={name}
				onChangeText={(text) => setName(text)}
			/>
			<TextInput
				style={styles.input}
				keyboardType="default"
				placeholder="Season number"
				placeholderTextColor="white"
				value={totalSeason}
				onChangeText={(number) => setTotalSeason(number)}
			/>
			<View style={styles.addSeries}>
				<TouchableOpacity style={styles.addSeriesButton} onPress={addSeries}>
					<Text>Add Series</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Add;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#07111a',
		flex: 1,
		height: 10
	},
	text: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
		marginTop: 50
	},
	input: {
		borderColor: '#d1d1d135',
		borderStyle: 'solid',
		borderWidth: 1,
		padding: 10,
		borderRadius: 18,
		marginHorizontal: 30,
		marginTop: 30
	},
	addSeries: {
		display: 'flex',
		alignItems: 'center'
	},
	addSeriesButton: {
		backgroundColor: '#00D84A',
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 18,
		width: 100,
		display: 'flex',
		alignItems: 'center',
		fontSize: 35,
		marginTop: 25
	}
});
