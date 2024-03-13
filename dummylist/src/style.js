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

<<<<<<< Updated upstream
 carouselItem: {
    width: 408, 
    height: 204, 
 }
=======

 //FOllowing are being used in TaskComponents
 taskContainer: 
 {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'flex-start',
     width: '80%',
     height: "10%",

     //Border radius
     borderTopLeftRadius: 30,
     borderTopRightRadius: 5,
     borderBottomLeftRadius: 5,
     borderBottomRightRadius: 30,

     //Margin/padding
     paddingHorizontal: 25,
     marginBottom: 8,
 },
 taskTextContainer: {
     flex: 1,
 },
 taskMainText: {
     fontFamily: "Oswald_400Regular",
     color: "#F6F6F6",
     fontSize: 25,
 },
 taskSmallText: {
     fontFamily: "Oswald_400Regular", 
     color: "#d4d4d4",
     fontSize: 13,
 },
 taskImg: {
     width: 40,
     height: 40,
 },
>>>>>>> Stashed changes
});