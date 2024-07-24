import numpy as np

class NeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size, learning_rate=0.01, epochs=1000):
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size
        self.learning_rate = learning_rate
        self.epochs = epochs
        self.weights_input_hidden = np.random.randn(input_size, hidden_size)
        self.weights_hidden_output = np.random.randn(hidden_size, output_size)
        self.bias_hidden = np.zeros((1, hidden_size))
        self.bias_output = np.zeros((1, output_size))


    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))


    def sigmoid_derivative(self, x):
        return x * (1 - x)


    def fit(self, X, y):
        for epoch in range(self.epochs):
            # Forward pass
            hidden_layer_input = np.dot(X, self.weights_input_hidden) + self.bias_hidden
            hidden_layer_output = self.sigmoid(hidden_layer_input)
            
            output_layer_input = np.dot(hidden_layer_output, self.weights_hidden_output) + self.bias_output
            output_layer_output = self.sigmoid(output_layer_input)

            # Compute loss (mean squared error)
            loss = np.mean((y - output_layer_output) ** 2)

            # Backward pass
            output_layer_error = y - output_layer_output
            output_layer_delta = output_layer_error * self.sigmoid_derivative(output_layer_output)

            hidden_layer_error = np.dot(output_layer_delta, self.weights_hidden_output.T)
            hidden_layer_delta = hidden_layer_error * self.sigmoid_derivative(hidden_layer_output)

            # Update weights and biases
            self.weights_hidden_output += np.dot(hidden_layer_output.T, output_layer_delta) * self.learning_rate
            self.bias_output += np.sum(output_layer_delta, axis=0, keepdims=True) * self.learning_rate

            self.weights_input_hidden += np.dot(X.T, hidden_layer_delta) * self.learning_rate
            self.bias_hidden += np.sum(hidden_layer_delta, axis=0, keepdims=True) * self.learning_rate

            if epoch % 100 == 0:
                print(f"Epoch {epoch}, Loss: {loss}")


    def predict(self, X):
        hidden_layer_input = np.dot(X, self.weights_input_hidden) + self.bias_hidden
        hidden_layer_output = self.sigmoid(hidden_layer_input)
        
        output_layer_input = np.dot(hidden_layer_output, self.weights_hidden_output) + self.bias_output
        output_layer_output = self.sigmoid(output_layer_input)
        
        return output_layer_output
