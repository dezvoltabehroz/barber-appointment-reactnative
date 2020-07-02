import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen'
import AuthScreen from './AuthScreen';

const Stack = createStackNavigator();

function AppRoutes() {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{
                headerShown: false
            }} />

            <Stack.Screen name="Auth" component={AuthScreen} options={{
                headerShown: false
            }} />

            {/* <Stack.Screen name="Paint" component={Paint} options={{
                headerBackTitleVisible: false,
                headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Paint</Text></View>),
                headerTitleAlign: 'center',
            }} />
            */}
        </Stack.Navigator>
    );
}

export default AppRoutes;
// const styles = StyleSheet.create({
//     headerTitleStyle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         fontFamily: 'Montserrat-Regular'
//     }
// })

