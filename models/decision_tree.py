import numpy as np

class DecisionTree:
    def __init__(self, max_depth=None):
        self.max_depth = max_depth
        self.tree = None


    def gini_impurity(self, y):
        classes = np.unique(y)
        impurity = 1 - sum([(np.sum(y == c) / len(y)) ** 2 for c in classes])
        return impurity


    def best_split(self, X, y):
        best_gini = float('inf')
        best_split_point = None
        best_split_column = None
        
        for col in range(X.shape[1]):
            unique_values = np.unique(X[:, col])
            for value in unique_values:
                left_mask = X[:, col] <= value
                right_mask = X[:, col] > value
                
                left_y = y[left_mask]
                right_y = y[right_mask]
                
                gini = (len(left_y) / len(y)) * self.gini_impurity(left_y) + (len(right_y) / len(y)) * self.gini_impurity(right_y)
                
                if gini < best_gini:
                    best_gini = gini
                    best_split_point = value
                    best_split_column = col
        
        return best_split_column, best_split_point


    def build_tree(self, X, y, depth=0):
        if len(np.unique(y)) == 1:
            return {'class': y[0]}
        
        if self.max_depth and depth >= self.max_depth:
            return {'class': np.mean(y)}

        feature, value = self.best_split(X, y)
        if feature is None:
            return {'class': np.mean(y)}
        
        left_mask = X[:, feature] <= value
        right_mask = X[:, feature] > value
        
        left_node = self.build_tree(X[left_mask], y[left_mask], depth + 1)
        right_node = self.build_tree(X[right_mask], y[right_mask], depth + 1)
        
        return {'feature': feature, 'value': value, 'left': left_node, 'right': right_node}


    def fit(self, X, y):
        self.tree = self.build_tree(X, y)


    def predict(self, X):
        def predict_node(node, x):
            if 'class' in node:
                return node['class']
            if x[node['feature']] <= node['value']:
                return predict_node(node['left'], x)
            else:
                return predict_node(node['right'], x)

        return np.array([predict_node(self.tree, x) for x in X])
