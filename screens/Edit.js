import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

import { nanoid } from 'nanoid/non-secure';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation, route }) => {
	const [ name, setName ] = useState('');
	const [ totalNoSeason, setTotalNoSeason ] = useState('');
	const [ seriesId, setSeriesId ] = useState('');

	useEffect(() => {
		const { series } = route.params;
		const { id, name, totalSeason } = series;

		setName(name);
		setTotalNoSeason(totalSeason);
		setSeriesId(id);
	}, []);

	console.log(totalNoSeason);

	const updateSeries = async (idFromPress) => {
		try {
			if (!name || !totalNoSeason) {
				return alert('Please add both fields');
			}

			const storedValue = await AsyncStorage.getItem('@season_list');
			const list = await JSON.parse(storedValue);

			list.map((series) => {
				if ((series.id == idFromPress)) {
					series.id = idFromPress
					series.name = name;
					series.totalSeason = totalNoSeason;
				}
				return series;
			});

			await AsyncStorage.setItem('@season_list', JSON.stringify(list));

			setName('');
			setTotalNoSeason('');

			navigation.navigate('Home');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Update series you want watch</Text>

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
				value={totalNoSeason}
				onChangeText={(number) => setTotalNoSeason(number)}
			/>
			<View style={styles.addSeries}>
				<TouchableOpacity style={styles.addSeriesButton} onPress={() => updateSeries(seriesId)}>
					<Text>Add Series</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Edit;

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
