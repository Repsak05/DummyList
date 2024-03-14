// styles.js
import { StyleSheet } from 'react-native';
import colors, { lightColors, darkColors, keyColors } from './colors.js';

export default StyleSheet.create({
    wrapper: 
    {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.lightColors.background,
        alignSelf: 'center',
        gap: 45,
        width: "95%", 
    },

    // Carousel styles



    
    carouselContainer: 
    {
        width: "100%", 
        height: 204, 

        backgroundColor: colors.lightColors.secondaryContainer,

        borderColor: colors.keyColors.tertiary,
        overflow: "hidden",

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

    // Home Feed Botton
    homeFeedContainer:
    {
        width: "100%", 
        height: "175%", 

        // TODO skal slettes
        backgroundColor: colors.lightColors.secondaryContainer,

        borderColor: colors.keyColors.tertiary,

        borderWidth: 15,
        
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 45,
        borderBottomLeftRadius: 45,

        overflow: "hidden",
    },
    homeFeedThumbnail:
    {
        width: "100%", 
        height: "100%",

        flex: 1,
        justifyContent: 'end',
    },
    homeFeedTextBox:
    {
        width: "75%",
        height: "20%",
        backgroundColor: colors.lightColors.secondary,

        borderTopLeftRadius: 0,
        borderBottomRightRadius: 45,
        borderTopRightRadius: 45,
        borderBottomLeftRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',

        flexDirection: 'row',
        gap:40,
    },
    homeFeedText:
    {
        width: "50%",
        fontFamily: "Oswald_400Regular",
        color: colors.lightColors.onSecondary,
        fontSize: 18,
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