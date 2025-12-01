
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

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
        } catch (e) {}
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <Text style={styles.label}>Base Currency (e.g. CAD, USD):</Text>
      <TextInput
        style={styles.input}
        value={baseCurrency}
        onChangeText={(text) => setBaseCurrency(text.toUpperCase())}
        autoCapitalize="characters"
        maxLength={3}
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

      {/* Button moved lower using buttonContainer */}
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button title="Convert" onPress={handleConvert} />
        )}
      </View>

      {rate !== null && convertedAmount !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Exchange Rate ({baseCurrency} → {destCurrency}): {rate}
          </Text>
          <Text style={styles.resultText}>
            Converted Amount: {convertedAmount.toFixed(2)} {destCurrency}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.aboutButton}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={styles.aboutButtonText}>Go to About Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
  },
  error: {
    color: "red",
    marginTop: 12,
    marginBottom: 8,
  },
  buttonContainer: {
    marginTop: 24, 
  },
  resultContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resultText: {
    fontSize: 16,
    marginBottom: 4,
  },
  aboutButton: {
    marginTop: 24,
    alignItems: "center",
  },
  aboutButtonText: {
    fontSize: 16,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default MainScreen;
