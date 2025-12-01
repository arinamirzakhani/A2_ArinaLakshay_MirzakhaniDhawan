
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>About This App</Text>
        <Text style={styles.headerSubtitle}>
          COMP 3122 · Currency Converter Assignment
        </Text>
      </View>

      {/* Students card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Students</Text>

        <View style={styles.studentRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View style={styles.studentInfo}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>Arina Mirzakhani</Text>
            <Text style={styles.label}>Student ID</Text>
            <Text style={styles.value}>101418340</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.studentRow}>
          <View style={[styles.avatar, styles.avatarSecondary]}>
            <Text style={styles.avatarText}>L</Text>
          </View>
          <View style={styles.studentInfo}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>Lakshay Dhawan</Text>
            <Text style={styles.label}>Student ID</Text>
            <Text style={styles.value}>LAKSHAY_STUDENT_ID_HERE</Text>
          </View>
        </View>
      </View>

      {/* Description card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Application Description</Text>
        <Text style={styles.description}>
          This application converts an amount from a base currency to a
          destination currency using the FreeCurrencyAPI service.
        </Text>
        <Text style={styles.description}>
          The user enters:
        </Text>
        <Text style={styles.bullet}>• Base currency code (e.g. CAD, USD)</Text>
        <Text style={styles.bullet}>
          • Destination currency code (3-letter uppercase)
        </Text>
        <Text style={styles.bullet}>• Amount to convert (positive number)</Text>

        <Text style={styles.description}>
          The app validates the input, calls the API to get the latest exchange
          rate, and then displays both the rate and the converted amount. If
          there is any problem (invalid input, missing currency, network issue,
          or API key error), the app shows a clear and meaningful error message.
        </Text>
      </View>

      {/* Footer note */}
      <Text style={styles.footerText}>
        Built with React Native, Expo, and React Navigation.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    paddingTop: 32,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: "#2563EB",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#DBEAFE",
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827",
  },
  studentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarSecondary: {
    backgroundColor: "#10B981",
  },
  avatarText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18,
  },
  studentInfo: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  value: {
    fontSize: 15,
    color: "#111827",
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  description: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 8,
    lineHeight: 20,
  },
  bullet: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
    marginBottom: 4,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
    marginVertical: 16,
  },
});

export default AboutScreen;
