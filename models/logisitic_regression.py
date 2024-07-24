import numpy as np

class LogisticRegression:
    def __init__(self, learning_rate=0.01, epochs=1000):
        self.learning_rate = learning_rate
        self.epochs = epochs
        self.weights = None
        self.bias = None


    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))


    def fit(self, X, y):
        m, n = X.shape
        self.weights = np.zeros(n)
        self.bias = 0
        
        for epoch in range(self.epochs):
            linear_model = np.dot(X, self.weights) + self.bias
            predictions = self.sigmoid(linear_model)
            
            error = y - predictions
            weights_gradient = -np.dot(X.T, error) / m
            bias_gradient = -np.sum(error) / m
            
            self.weights -= self.learning_rate * weights_gradient
            self.bias -= self.learning_rate * bias_gradient


    def predict(self, X):
        linear_model = np.dot(X, self.weights) + self.bias
        return self.sigmoid(linear_model)
