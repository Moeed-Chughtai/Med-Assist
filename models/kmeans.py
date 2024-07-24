import numpy as np

class KMeans:
    def __init__(self, k, max_iters=100):
        self.k = k
        self.max_iters = max_iters
        self.centroids = None
        self.clusters = None


    def fit(self, X):
        m, n = X.shape
        self.centroids = X[np.random.choice(m, self.k, replace=False)]
        
        for _ in range(self.max_iters):
            # Assign clusters
            distances = np.linalg.norm(X[:, np.newaxis] - self.centroids, axis=2)
            self.clusters = np.argmin(distances, axis=1)
            
            # Update centroids
            new_centroids = np.array([X[self.clusters == i].mean(axis=0) for i in range(self.k)])
            
            if np.all(self.centroids == new_centroids):
                break
            
            self.centroids = new_centroids


    def predict(self, X):
        distances = np.linalg.norm(X[:, np.newaxis] - self.centroids, axis=2)
        return np.argmin(distances, axis=1)
