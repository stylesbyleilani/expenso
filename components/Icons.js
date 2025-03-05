

import * as React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';

const MyComponent = ({color="white"}) => (
  <IconButton
    icon="home"
        color={color} // Use a color that contrasts well

    size={22}
    onPress={() => console.log('Pressed')}
  />
);

export default MyComponent;




// import * as React from "react";
// import { IconButton, MD3Colors } from "react-native-paper";

// const iconData = ["home", "wallet", "chart-line", "bank"];

// const MyComponent = () => (
//   <>
//     {iconData.map((icon, index) => (
//       <IconButton
//         key={index}
//         icon={icon}
//         iconColor={MD3Colors}
//         size={22}
//         onPress={() => console.log(`${icon} pressed`)}
//       />
//     ))}
//   </>
// );

// export default MyComponent;
