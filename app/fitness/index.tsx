import * as React from 'react';
import { View } from 'react-native';

const FitnessScreen = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View>

   </View>
  );
};

export default FitnessScreen;