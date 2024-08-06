import numpy as np

class NeuralNetwork:
    def __init__(self, input_size, hidden_layers, output_size, activation='relu', learning_rate=0.01, epochs=500):
        self.input_size = input_size
        self.hidden_layers = hidden_layers
        self.output_size = output_size
        self.activation = activation
        self.learning_rate = learning_rate
        self.epochs = epochs
        
        # Initialize weights and biases
        self.weights = []
        self.biases = []
        
        layer_sizes = [input_size] + list(hidden_layers) + [output_size]
        
        for i in range(len(layer_sizes) - 1):
            self.weights.append(np.random.randn(layer_sizes[i], layer_sizes[i + 1]))
            self.biases.append(np.zeros((1, layer_sizes[i + 1])))

    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))

    def sigmoid_derivative(self, x):
        return x * (1 - x)

    def relu(self, x):
        return np.maximum(0, x)

    def relu_derivative(self, x):
        return (x > 0).astype(float)

    def tanh(self, x):
        return np.tanh(x)

    def tanh_derivative(self, x):
        return 1 - np.tanh(x) ** 2

    def activation_function(self, x):
        if self.activation == 'relu':
            return self.relu(x)
        elif self.activation == 'tanh':
            return self.tanh(x)
        else:
            raise ValueError(f"Unknown activation function: {self.activation}")

    def activation_function_derivative(self, x):
        if self.activation == 'relu':
            return self.relu_derivative(x)
        elif self.activation == 'tanh':
            return self.tanh_derivative(x)
        else:
            raise ValueError(f"Unknown activation function: {self.activation}")

    def fit(self, X, y):
        for epoch in range(self.epochs):
            # Forward pass
            activations = [X]
            inputs = []
            for i in range(len(self.weights)):
                input_data = np.dot(activations[-1], self.weights[i]) + self.biases[i]
                inputs.append(input_data)
                activation = self.activation_function(input_data)
                activations.append(activation)
            
            # Compute loss (mean squared error)
            # Ensure y is correctly shaped as (num_samples, num_classes)
            if y.shape[1] != activations[-1].shape[1]:
                raise ValueError(f"Mismatch between target labels and network output dimensions: {y.shape[1]} != {activations[-1].shape[1]}")

            loss = np.mean((y - activations[-1]) ** 2)

            # Backward pass
            errors = [y - activations[-1]]
            deltas = [errors[-1] * self.activation_function_derivative(activations[-1])]

            for i in range(len(self.weights) - 2, -1, -1):
                error = np.dot(deltas[-1], self.weights[i + 1].T)
                delta = error * self.activation_function_derivative(activations[i + 1])
                errors.append(error)
                deltas.append(delta)

            deltas.reverse()
            errors.reverse()

            # Update weights and biases
            for i in range(len(self.weights)):
                weight_update = np.dot(activations[i].T, deltas[i])
                bias_update = np.sum(deltas[i], axis=0, keepdims=True)

                # Update weights and biases
                self.weights[i] -= weight_update * self.learning_rate
                self.biases[i] -= bias_update * self.learning_rate

            if epoch % 100 == 0:
                print(f"Epoch {epoch}, Loss: {loss}")

    def predict(self, X):
        activations = X
        for i in range(len(self.weights)):
            activations = self.activation_function(np.dot(activations, self.weights[i]) + self.biases[i])
        return activations

    def predict_classes(self, X):
        return np.argmax(self.predict(X), axis=1)
