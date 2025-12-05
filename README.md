A2 – Currency Converter (React Native)

Course
COMP 3074 – Mobile Application Development 1

Students
Arina Mirzakhani – 101418340
Lakshay Dhawan – 101464867

Project Overview
This project is a simple currency converter built with React Native and Expo that runs on Android.
The app has two screens:

MainScreen:
- Reads base currency code (default: CAD)
- Reads destination currency code
- Reads amount (default: 1)
- Validates input
- Calls the FreeCurrencyAPI to get the latest exchange rate
- Displays the exchange rate and the converted amount
- Shows meaningful error messages for invalid input, missing currency, invalid API key, or network issues

AboutScreen:
- Shows full student name
- Shows student ID
- Shows a brief app description

Navigation between the screens is implemented using React Navigation (stack navigation).

-------------------------------------------------------------

Requirements Mapping

1. Two Screens & Navigation
- App.js sets up stack navigation using:
  @react-navigation/native
  @react-navigation/native-stack
- The app contains:
  MainScreen – main currency conversion logic
  AboutScreen – student details and app info
- Navigation is performed using:
  navigation.navigate("About")

2. Inputs & Default Values (MainScreen)
The app reads the following inputs:

Base currency:
- State variable: baseCurrency
- Default value: "CAD"

Destination currency:
- State variable: destCurrency

Amount:
- State variable: amount
- Default value: "1"

Inputs are collected using TextInput components.

3. Input Validation
Validation happens in the validateInputs() function.

Currency code validation:
- Must be a 3-letter uppercase ISO code
- Enforced using regex: ^[A-Z]{3}$
- Text is automatically converted to uppercase
- maxLength is set to 3

Amount validation:
- Must be a positive number
- Checked using parseFloat
- If invalid, an error message is shown

If validation fails:
- A clear red error message is displayed on the screen

4. API Integration (FreeCurrencyAPI)
The app calls the FreeCurrencyAPI endpoint:
https://api.freecurrencyapi.com/v1/latest

Request URL example:
${API_URL}?apikey=${API_KEY}&base_currency=${baseCurrency}

The app:
- Sends the request using fetch
- Parses the JSON response
- Checks if data exists
- Checks if the destination currency exists in data.data
- Extracts the exchange rate
- Calculates converted amount using:
  const converted = numericAmount * rateValue
- Displays exchange rate and converted amount

5. Error Handling & Messages
The app handles errors such as:
- Invalid currency codes
- Missing currency in API response
- Network errors
- Unexpected API structure






