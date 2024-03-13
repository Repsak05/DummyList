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

        backgroundColor: colors.lightColors.secondaryContainer,

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
 carouselItem: {
    width: 408, 
    height: 204, 
 },

 //Following are being used in TaskComponents
 taskContainer:{
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


 //Styles primairly for GoToLeaderboard
  goToLeaderboardBackground: {
     height: "13.5%",
     width: "90%",

    //Border radius
    borderTopLeftRadius: 30,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 30,

    backgroundColor: "#F6F6F6",
 
  },

  displayColumn:{
    display: "flex",
    flexDirection: "column",
  },

  displayRow: {
    display: "flex",
    flexDirection: "row",
  },

  blackFontSize20: {
    fontFamily: "Oswald_500Medium", 
    color: "#040F0F",
    fontSize: 20,
  },

  blackFontSize13: {
    fontFamily: "Oswald_500Medium", 
    color: "#040F0F",
    fontSize: 13,
  },
  greyFontSize16: {
    fontFamily: "Oswald_500Medium", 
    color: "#9e9e9e",
    fontSize: 16,
  },

  widthHeight70 : {
    width: 70,
    height: 70,
  },

  centerVeritically : {
    display: "flex",
    alignItems: "center",
  },

  centerHorzontally : {
    display: "flex",
    justifyContent: "center",
  },
});


