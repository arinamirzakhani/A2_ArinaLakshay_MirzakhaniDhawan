import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

/**
 * A reusable input component with a label.
 *
 * @param {Object} props
 * @param {string} props.label - The label text to display above the input.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChangeText - Callback when text changes.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string} [props.keyboardType] - Keyboard type (default: "default").
 * @param {string} [props.autoCapitalize] - Auto-capitalization behavior (default: "none").
 * @param {number} [props.maxLength] - Maximum length of input.
 * @param {Object} [props.style] - Additional styles for the container.
 */
const LabeledInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default",
    autoCapitalize = "none",
    maxLength,
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                maxLength={maxLength}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        color: "#374151",
        fontWeight: "500",
    },
    input: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#F9FAFB",
        fontSize: 16,
        color: "#111827",
    },
});

export default LabeledInput;
