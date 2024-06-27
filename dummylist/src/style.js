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
    carouselItem:
    {
        width: 408, 
        height: 204, 
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

    roundedCornersExtremeOpposite : {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 42,
      borderBottomLeftRadius: 42,
      borderBottomRightRadius: 10,
    },
    roundedCornersMedium : {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 25,
    },
    roundedCornersSmall : {
      borderTopLeftRadius: 15,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 15,
    },
    roundedCorners : {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 30,
    },
    roundedCornersOpposite : {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 5,
    },

 //Following are being used in TaskComponents (&& in LeaderboardPlacement)
 taskContainer:{
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'flex-start',
     width: '85.8%',
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

  isNotPicked : {
    opacity: 0.4
  },  

  isPicked : {
      opacity: 1
  },

  blackFontSize64: {
    fontFamily: "Oswald_500Medium", 
    color: "#040F0F",
    fontSize: 64,
  },
  blackFontSize40: {
    fontFamily: "Oswald_500Medium", 
    color: "#040F0F",
    fontSize: 40,
  },
  blackFontSize25: {
    fontFamily: "Oswald_500Medium", 
    color: "#040F0F",
    fontSize: 25,
  },
  blackFontSize20: {
    fontFamily: "Oswald_500Medium", 
    color: "#040F0F",
    fontSize: 20,
  },

  blackFontSize16Medium: {
    fontFamily: "Oswald_500Medium", 
    color: "#040F0F",
    fontSize: 16,
  },
  blackFontSize16: {
    fontFamily: "Oswald_400Regular", 
    color: "#040F0F",
    fontSize: 16,
  },

  blackFontSize13: {
    fontFamily: "Oswald_500Medium", 
    color: "#040F0F",
    fontSize: 13,
  },
  blackFontSize10: {
    fontFamily: "Oswald_500Medium", 
    color: "#040F0F",
    fontSize: 10,
  },

  greyFontSize20Reg: {
    fontFamily: "Oswald_400Regular", 
    color: "#9e9e9e",
    fontSize: 20,
  },
  greyFontSize16: {
    fontFamily: "Oswald_500Medium", 
    color: "#9e9e9e",
    fontSize: 16,
  },
  greyFontSize13: {
    fontFamily: "Oswald_500Medium", 
    color: "#9e9e9e",
    fontSize: 13,
  },
  greyFontSize10: {
    fontFamily: "Oswald_500Medium", 
    color: "#9e9e9e",
    fontSize: 10,
  },
  whiteFontSize25: {
    fontFamily: "Oswald_500Medium", 
    color: "#F6F6F6",
    fontSize: 25,
  },
  whiteFontSize16: {
    fontFamily: "Oswald_500Medium", 
    color: "#F6F6F6",
    fontSize: 16,
  },
  whiteFontSize16ExtraBold: {
    fontFamily: "Oswald_500Medium", 
    color: "#F6F6F6",
    fontSize: 16,
    fontWeight: 'bold',
  },
  whiteFontSize16Reg: {
    fontFamily: "Oswald_400Regular", 
    color: "#F6F6F6",
    fontSize: 16,
  },
  whiteFontSize13Reg: {
    fontFamily: "Oswald_400Regular", 
    color: "#F6F6F6",
    fontSize: 13,
  },
  whiteFontSize13: {
    fontFamily: "Oswald_500Medium", 
    color: "#F6F6F6",
    fontSize: 13,
  },
  darkBlueFontSize13: {
    fontFamily: "Oswald_500Medium", 
    color: "#001D34",
    fontSize: 13,
  },
  darkGreenFontSize13: {
    fontFamily: "Oswald_500Medium", 
    color: "#00201F",
    fontSize: 13,
  },
  redFontSize16: {
    fontFamily: "Oswald_500Medium", 
    color: "#3A0A02",
    fontSize: 16,
  },
  redFontSize16Regular: {
    fontFamily: "Oswald_400Regular", 
    color: "#3A0A02",
    fontSize: 16,
  },
  darkRedFontSize16Regular: {
    fontFamily: "Oswald_500Medium", 
    color: "#992237",
    fontSize: 20,
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

  //Being used in LeaderboardPlacement:
  whiteFontSize31: {
    fontFamily: "Oswald_500Medium", 
    color: "#F6F6F6",
    fontSize: 31,
  },

});


