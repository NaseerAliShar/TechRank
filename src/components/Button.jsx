import { Button } from 'react-native-paper';

const MyButton = React.forwardRef(
  (
    {
      mode = 'contained',
      loading = false,
      onPress,
      style,
      labelStyle,
      buttonColor,
      children,
      ...rest
    },
    ref,
  ) => (
    <Button
      mode={mode}
      loading={loading}
      onPress={onPress}
      style={style}
      labelStyle={labelStyle}
      buttonColor={buttonColor}
      ref={ref}
      {...rest}>
      {!loading && children}
    </Button>
  ),
);

export default MyButton;
