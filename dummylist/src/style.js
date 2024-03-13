// styles.js
import { StyleSheet } from 'react-native';
import colors, { lightColors, darkColors } from './colors.js';

export default StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.lightColors.Background,
    
 },
 text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    borderWidth: 5,

 },

 carouselItem: {
    width: 408, 
    height: 204, 
 }
});