// App.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// App.tsx
// App.tsx
import { useFetchQuranData } from './hooks/useFetch'; // Correct path to your custom hook


const App = () => {
    const { data, loading, error } = useFetchQuranData(); 

    if (loading) {
        return <Text>Loading...</Text>; 
    }

    if (error) {
        return <Text>Error: {error.message}</Text>; 
    }

    return (
        <View style={styles.container}>
            {data.map((item) => (
                <Text key={item.id}>{item.text}</Text> // Render fetched data
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default App;
