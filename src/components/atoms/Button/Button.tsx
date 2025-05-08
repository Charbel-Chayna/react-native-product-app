import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { ButtonProps, ButtonVariant } from './Button.type';

const getVariantStyle = (variant?: ButtonVariant): ViewStyle => {
  switch (variant) {
    case ButtonVariant.PRIMARY:
      return { backgroundColor: '#007bff' };
    case ButtonVariant.OUTLINE_PRIMARY:
      return {
        borderWidth: 1,
        borderColor: '#007bff',
        backgroundColor: 'transparent',
      };
    case ButtonVariant.DANGER:
      return { backgroundColor: '#dc3545' };
    default:
      return {}; 
  }
};

export const Button: React.FC<ButtonProps> = React.memo(
  ({ onPress, children, variant, disabled, style }) => {
    const variantStyle = getVariantStyle(variant);

    return (
      <TouchableOpacity
        onPress={!disabled ? onPress : undefined}
        style={[styles.base, variantStyle, disabled && styles.disabled, style]}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Text style={[styles.text, variant === ButtonVariant.OUTLINE_PRIMARY && styles.outlineText]}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold', 
    fontSize: 20,
  },
  outlineText: {
    color: '#007bff',
    fontFamily: 'Poppins-SemiBold', 
  },
});

export default Button;
