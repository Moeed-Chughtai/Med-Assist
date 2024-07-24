import numpy as np

class LogisticRegression:
    def __init__(self, learning_rate=0.01, num_iterations=1000, C=1.0):
        self.learning_rate = learning_rate
        self.num_iterations = num_iterations
        self.C = C  # Inverse of regularization strength (C = 1/λ)
        self.theta = None
        self.num_classes = None

    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))

    def fit(self, X, y, num_classes):
        self.num_classes = num_classes
        m, n = X.shape
        self.theta = np.zeros((num_classes, n + 1))  # Including bias term

        # Add bias column
        X = np.hstack([np.ones((m, 1)), X])

        for i in range(self.num_classes):
            y_binary = (y == i).astype(int)
            self._gradient_descent(X, y_binary, i)

    def _gradient_descent(self, X, y_binary, class_index):
        m, n = X.shape
        theta = np.zeros(n)
        
        for _ in range(self.num_iterations):
            predictions = self.sigmoid(np.dot(X, theta))
            error = predictions - y_binary
            gradient = np.dot(X.T, error) / m
            
            # Add regularization term
            regularization_term = (self.C / m) * theta
            regularization_term[0] = 0  # Do not regularize the bias term

            gradient -= regularization_term
            theta -= self.learning_rate * gradient
        
        self.theta[class_index] = theta

    def predict(self, X):
        m = X.shape[0]
        X = np.hstack([np.ones((m, 1)), X])  # Add bias column

        predictions = np.dot(X, self.theta.T)
        return np.argmax(predictions, axis=1)
