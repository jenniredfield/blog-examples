import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.email('You must provide a valid email.'),
  password: z.string('You must provide a valid password.').min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    // Handle login logic here
    Alert.alert(JSON.stringify(data, null, 2));
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Email"
              testID="Email"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              autoCapitalize="none"
              accessibilityLabel="Password"
              testID="Password"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />
      <Pressable onPress={handleSubmit(onSubmit)} 
        accessibilityLabel="Login"
         accessibilityRole="button"
      >
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});
