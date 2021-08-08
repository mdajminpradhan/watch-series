// import React from 'react';
// import { Text, StyleSheet, ScrollView } from 'react-native';

// import { Fab, Icon } from 'native-base';

// const Home = ({ navigation, route }) => {
// 	return (
// 		<ScrollView contentContainerStyle={styles.container}>
// 			<Text>List of al series</Text>

// 			<Fab
// 				style={{ backgroundColor: '#00ffaa' }}
// 				placement="bottomRight"
// 				onPress={() => navigation.navigate('Add')}
// 			>
// 				<Icon name="add" />
// 			</Fab>
// 		</ScrollView>
// 	);
// };

// export default Home;

// const styles = StyleSheet.create({
// 	emptyContainer: {
// 		backgroundColor: '#1b262c',
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	},
// 	container: {
// 		backgroundColor: '#1b262c',
// 		flex: 1
// 	},
// 	heading: {
// 		textAlign: 'center',
// 		color: '#00b7c2',
// 		marginVertical: 15,
// 		marginHorizontal: 5
// 	},
// 	actionButton: {
// 		marginLeft: 5
// 	},
// 	seriesName: {
// 		color: '#fdcb9e',
// 		textAlign: 'justify'
// 	},
// 	listItem: {
// 		marginLeft: 0,
// 		marginBottom: 20
// 	}
// });

import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation, route }) => {
	const [ noSeries, setNoSeries ] = useState(null);
	const [ listOfSeries, setSListOferies ] = useState([]);

	const isFocused = useIsFocused();

	const getSeries = async () => {
		const storedValue = await AsyncStorage.getItem('@season_list');
		const data = JSON.parse(storedValue)

		if (!storedValue) {
			setNoSeries(false);
		} else {
			setSListOferies(data);
		}

		console.log(listOfSeries);
	};

	const removeSeries = async (id) => {
		const filter = listOfSeries.filter((series) => series.id !== id);

		await AsyncStorage.setItem('@season_list', JSON.stringify(filter));

		setSListOferies(filter);
	};

	useEffect(
		() => {
			getSeries();
		},
		[ isFocused ]
	);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{listOfSeries.map((series, index) => (
				<View key={index} style={styles.series}>
					<View>
						<Text style={styles.title}>{series.name}</Text>
						<Text style={styles.toWatch}>Season to watch - {series.totalSeason}</Text>
					</View>
					<View style={styles.action}>
						<TouchableOpacity onPress={() => navigation.navigate('Edit', { series })}>
							<Icon style={styles.edit} name="edit-2" size={18} color="white" />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => removeSeries(series.id)}>
							<Icon style={styles.trash} name="trash" size={18} color="red" />
						</TouchableOpacity>
					</View>
				</View>
			))}

			{listOfSeries.length == 0 ? <Text style={styles.noSeries}>No series to watch</Text> : <Text></Text>}

			<TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add')}>
				<Icon styles={styles.addButtonIcon} name="plus" size={30} color="white" />
			</TouchableOpacity>
		</ScrollView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#07111a',
		flex: 1,
		paddingTop: 10
	},
	addButton: {
		backgroundColor: '#00D84A',
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderRadius: 18,
		width: 60,
		display: 'flex',
		alignItems: 'center',
		position: 'absolute',
		right: 35,
		bottom: 20
	},
	title: {
		color: 'white',
		fontSize: 15
	},
	toWatch: {
		color: '#d1d1d170'
	},
	noSeries: {
		color: '#d1d1d170',
		fontSize: 20,
		textAlign: 'center',
		marginTop: 200
	},
	series: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#222f3e',
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 15,
		marginBottom: 15,
		marginHorizontal: 20
	},
	action: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	edit: {
		// margin: 55
	},
	trash: {
		marginLeft: 12
	}
});
