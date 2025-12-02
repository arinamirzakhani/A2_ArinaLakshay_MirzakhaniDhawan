import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import LabeledInput from "../components/LabeledInput";

const API_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = "fca_live_mmHA6KlMfrlzX2s6pfx34aFwsC4hQYq1q2cFtGYb";

const MainScreen = ({ navigation }) => {
  const [baseCurrency, setBaseCurrency] = useState("CAD");
  const [destCurrency, setDestCurrency] = useState("USD");
  const [amount, setAmount] = useState("1");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rate, setRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const validateInputs = () => {
    setError("");
    setRate(null);
    setConvertedAmount(null);

    const currencyRegex = /^[A-Z]{3}$/;

    if (!currencyRegex.test(baseCurrency)) {
      setError(
        "Base currency must be a 3-letter uppercase code (e.g., CAD, USD)."
      );
      return false;
    }

    if (!currencyRegex.test(destCurrency)) {
      setError("Destination currency must be a 3-letter uppercase code.");
      return false;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Amount must be a positive number.");
      return false;
    }

    return true;
  };

  const handleConvert = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError("");
    setRate(null);
    setConvertedAmount(null);

    try {
      const url = `${API_URL}?apikey=${API_KEY}&base_currency=${baseCurrency}`;
      const response = await fetch(url);

      if (!response.ok) {
        let message = `Request failed with status ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            message = errorData.message;
          }
        } catch (e) { }
        throw new Error(message);
      }

      const data = await response.json();

      if (!data || !data.data) {
        throw new Error("Invalid response format from API.");
      }

      const destCode = destCurrency.toUpperCase();
      const rateValue = data.data[destCode];

      if (!rateValue) {
        throw new Error(
          `Currency "${destCode}" not found in API response. Please check the code.`
        );
      }

      const numericAmount = parseFloat(amount);
      const converted = numericAmount * rateValue;

      setRate(rateValue);
      setConvertedAmount(converted);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const formattedAmount = () => {
    const n = parseFloat(amount);
    if (isNaN(n)) return amount;
    return n.toFixed(2);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Currency Converter</Text>
        <Text style={styles.sectionSubtitle}>
          Convert amounts using live exchange rates
        </Text>

        <LabeledInput
          label="Base Currency (e.g. CAD, USD):"
          value={baseCurrency}
          onChangeText={(text) => setBaseCurrency(text.toUpperCase())}
          autoCapitalize="characters"
          maxLength={3}
          placeholder="CAD"
        />

        <Text style={styles.label}>Destination Currency:</Text>
        <TextInput
          style={styles.input}
          value={destCurrency}
          onChangeText={(text) => setDestCurrency(text.toUpperCase())}
          autoCapitalize="characters"
          maxLength={3}
        />

        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}


        <TouchableOpacity
          style={styles.convertButton}
          onPress={handleConvert}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.convertButtonText}>CONVERT</Text>
          )}
        </TouchableOpacity>
      </View>


      {rate !== null && convertedAmount !== null && (
        <View style={[styles.card, styles.resultCard]}>
          <Text style={styles.resultLabel}>Result</Text>

          <Text style={styles.resultRoute}>
            {formattedAmount()} {baseCurrency}{" "}
            <Text style={styles.arrow}>&rarr;</Text>{" "}
            {destCurrency.toUpperCase()}
          </Text>

          <Text style={styles.resultMainAmount}>
            {convertedAmount.toFixed(2)} {destCurrency.toUpperCase()}
          </Text>

          <View style={styles.resultDivider} />

          <Text style={styles.resultSmallText}>
            Exchange Rate ({baseCurrency.toUpperCase()} →{" "}
            {destCurrency.toUpperCase()}):{" "}
            <Text style={styles.resultRate}>{rate}</Text>
          </Text>
        </View>
      )}


      <TouchableOpacity
        style={styles.linkContainer}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={styles.linkText}>Go to About Screen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  contentContainer: {
    paddingVertical: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    color: "#374151",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
    backgroundColor: "#F9FAFB",
  },
  error: {
    color: "#DC2626",
    marginTop: 12,
    marginBottom: 8,
    fontSize: 13,
  },
  convertButton: {
    marginTop: 16,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  convertButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },


  resultCard: {
    backgroundColor: "#EEF2FF",
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4F46E5",
    marginBottom: 4,
  },
  resultRoute: {
    fontSize: 14,
    color: "#4B5563",
  },
  arrow: {
    fontWeight: "700",
  },
  resultMainAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 6,
    marginBottom: 8,
  },
  resultDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },
  resultSmallText: {
    fontSize: 13,
    color: "#4B5563",
  },
  resultRate: {
    fontWeight: "600",
    color: "#111827",
  },

  linkContainer: {
    alignItems: "center",
  },
  linkText: {
    fontSize: 15,
    color: "#2563EB",
    textDecorationLine: "underline",
  },
});

export default MainScreen;
