import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const buttons = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', ',', '='],
];

const operations = {
  '+': (first, second) => first + second,
  '-': (first, second) => first - second,
  '×': (first, second) => first * second,
  '÷': (first, second) => first / second,
};

function formatNumber(value) {
  if (!Number.isFinite(value)) return 'Erro';

  return Number.parseFloat(value.toPrecision(12)).toString().replace('.', ',');
}

export default function App() {
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clear = () => {
    setDisplay('0');
    setStoredValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit) => {
    if (display === 'Erro' || waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
      return;
    }

    setDisplay(display === '0' ? digit : `${display}${digit}`);
  };

  const inputDecimal = () => {
    if (display === 'Erro' || waitingForOperand) {
      setDisplay('0,');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(',')) setDisplay(`${display},`);
  };

  const calculate = (nextOperation = null) => {
    const inputValue = Number(display.replace(',', '.'));

    if (storedValue !== null && operation) {
      const result = operations[operation](storedValue, inputValue);
      setDisplay(formatNumber(result));
      setStoredValue(Number.isFinite(result) ? result : null);
    } else {
      setStoredValue(inputValue);
    }

    setOperation(nextOperation);
    setWaitingForOperand(true);
  };

  const handlePress = (label) => {
    if (/^\d$/.test(label)) return inputDigit(label);
    if (label === ',') return inputDecimal();
    if (label === 'C') return clear();
    if (label === '±') {
      if (display !== '0' && display !== 'Erro') {
        setDisplay(display.startsWith('-') ? display.slice(1) : `-${display}`);
      }
      return;
    }
    if (label === '%') {
      if (display !== 'Erro') {
        setDisplay(formatNumber(Number(display.replace(',', '.')) / 100));
      }
      return;
    }
    if (label === '=') return calculate();
    calculate(label);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>AECO MOBILE</Text>
          <Text style={styles.title}>Calculadora</Text>
        </View>

        <View style={styles.displayCard}>
          <Text style={styles.operationText}>
            {storedValue !== null && operation
              ? `${formatNumber(storedValue)} ${operation}`
              : 'Resultado'}
          </Text>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.displayText}
          >
            {display}
          </Text>
        </View>

        <View style={styles.keypad}>
          {buttons.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((label) => {
                const isOperator = ['÷', '×', '-', '+', '='].includes(label);
                const isUtility = ['C', '±', '%'].includes(label);

                return (
                  <Pressable
                    accessibilityLabel={`Botão ${label}`}
                    accessibilityRole="button"
                    key={label}
                    onPress={() => handlePress(label)}
                    style={({ pressed }) => [
                      styles.button,
                      label === '0' && styles.zeroButton,
                      isUtility && styles.utilityButton,
                      isOperator && styles.operatorButton,
                      pressed && styles.pressedButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        (isUtility || isOperator) && styles.highlightedButtonText,
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>

        <Text style={styles.footer}>Programação para Dispositivos Móveis</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101827',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 18,
  },
  header: {
    marginBottom: 22,
  },
  eyebrow: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2.4,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 4,
  },
  displayCard: {
    alignItems: 'flex-end',
    backgroundColor: '#182235',
    borderColor: '#263449',
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 132,
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  operationText: {
    color: '#8291A8',
    fontSize: 15,
    marginBottom: 10,
  },
  displayText: {
    color: '#FFFFFF',
    fontSize: 52,
    fontWeight: '300',
    width: '100%',
    textAlign: 'right',
  },
  keypad: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 18,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: '#202C40',
    borderRadius: 22,
    flex: 1,
    justifyContent: 'center',
  },
  zeroButton: {
    aspectRatio: undefined,
    flex: 2.16,
  },
  utilityButton: {
    backgroundColor: '#29384F',
  },
  operatorButton: {
    backgroundColor: '#0284C7',
  },
  pressedButton: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },
  buttonText: {
    color: '#E2E8F0',
    fontSize: 26,
    fontWeight: '600',
  },
  highlightedButtonText: {
    color: '#FFFFFF',
  },
  footer: {
    color: '#64748B',
    fontSize: 11,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
});
