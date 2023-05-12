import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  type: string;
  active: boolean;
  style?: ViewStyle;
}
type IconProps = {
  materialIconName: keyof typeof Icon.glyphMap;
};

const providerMap: { [key: string]: string } = {
  password: "email-lock",
  facebook: "facebook",
  google: "google",
  phone: "phone",
};

function Provider({ type, active, style }: Props): JSX.Element | null {
  const theme = useTheme();
  const icon = providerMap[type] as IconProps["materialIconName"] | null;

  if (!icon) {
    return null;
  }

  return (
    <View style={[style, styles[active ? "active" : "inactive"]]}>
      <Icon
        name={icon}
        size={24}
        color={active ? theme.colors.primary : theme.colors.onSurface}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inactive: {
    opacity: 0.3,
  },
  active: {
    opacity: 1,
  },
});

export default Provider;
