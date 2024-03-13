// styles.js
import { StyleSheet } from 'react-native';
import colors, { lightColors, darkColors, keyColors } from './colors.js';

export default StyleSheet.create({
    wrapper: 
    {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.lightColors.background,

        width: "100%", 
        height: "100%", 
    },

    // Carousel styles

    carouselItem: {
        width: 408, 
        height: 204, 
    },

    
    carouselContainer: 
    {


        width: "95%", 
        height: 204, 

        borderColor: colors.keyColors.tertiary,

        borderWidth: 15,
        
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 45,
        borderBottomLeftRadius: 45,

    },


    carouselItem: 
    {
        width: "100%", 
        height: "100%",

        flex: 1,
        justifyContent: 'end',
    },

    carouselTextBox:
    {
        width: "67%",
        height: "32%",
        backgroundColor: colors.lightColors.primary,

        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },

    carouselText:
    {
        fontFamily: "Oswald_500Medium",
        color: "#F6F6F6",
        fontSize: 25,
    },

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


});