import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import Breadcrumb from '../../components/Breadcrumb'

export default function MachineLearning({ onBack, breadcrumb }) {
  const { darkMode } = useTheme()
  const [activeSection, setActiveSection] = useState('sklearn-basics')

  const sections = [
    { id: 'sklearn-basics', title: 'Scikit-learn Basics' },
    { id: 'classification', title: 'Classification' },
    { id: 'regression', title: 'Regression' },
    { id: 'evaluation', title: 'Model Evaluation' },
    { id: 'feature-engineering', title: 'Feature Engineering' },
    { id: 'cross-validation', title: 'Cross-Validation' }
  ]

  const cardStyle = {
    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    borderRadius: '0.5rem',
    padding: '1.5rem',
    marginBottom: '1.5rem'
  }

  const codeBlockStyle = {
    backgroundColor: darkMode ? '#111827' : '#1f2937',
    color: '#e5e7eb',
    padding: '1rem',
    borderRadius: '0.375rem',
    overflow: 'auto',
    fontSize: '0.875rem',
    fontFamily: 'monospace',
    marginTop: '0.5rem',
    marginBottom: '1rem'
  }

  const headingStyle = {
    color: darkMode ? '#f9fafb' : '#111827',
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1rem'
  }

  const subHeadingStyle = {
    color: darkMode ? '#d1d5db' : '#374151',
    fontSize: '1rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    marginTop: '1rem'
  }

  const textStyle = {
    color: darkMode ? '#9ca3af' : '#6b7280',
    lineHeight: '1.6'
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)'
          : 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb, #f3f4f6)',
        padding: '2rem'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: darkMode ? '#60a5fa' : '#3b82f6',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '1rem',
            padding: '0.5rem 0'
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>&larr;</span> Back
        </button>

        {/* Breadcrumb */}
        {breadcrumb && <Breadcrumb items={breadcrumb} />}

        {/* Page Title */}
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: darkMode ? '#f9fafb' : '#111827',
            marginBottom: '1rem'
          }}
        >
          Python Machine Learning Reference
        </h1>
        <p style={{ ...textStyle, marginBottom: '2rem' }}>
          A comprehensive guide to machine learning with Python using scikit-learn.
        </p>

        {/* Section Navigation */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                backgroundColor:
                  activeSection === section.id
                    ? '#3b82f6'
                    : darkMode
                    ? '#374151'
                    : '#e5e7eb',
                color:
                  activeSection === section.id
                    ? '#ffffff'
                    : darkMode
                    ? '#d1d5db'
                    : '#374151',
                fontWeight: activeSection === section.id ? '600' : '400',
                transition: 'all 0.2s'
              }}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Scikit-learn Basics Section */}
        {activeSection === 'sklearn-basics' && (
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>Scikit-learn Basics</h2>
              <p style={textStyle}>
                Scikit-learn is the most popular machine learning library in Python.
                It provides simple and efficient tools for data analysis and modeling.
              </p>

              <h3 style={subHeadingStyle}>Installation</h3>
              <pre style={codeBlockStyle}>
{`pip install scikit-learn
pip install numpy pandas  # Common dependencies`}
              </pre>

              <h3 style={subHeadingStyle}>Basic Imports</h3>
              <pre style={codeBlockStyle}>
{`import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report`}
              </pre>

              <h3 style={subHeadingStyle}>train_test_split</h3>
              <p style={textStyle}>
                Split your data into training and testing sets to evaluate model performance.
              </p>
              <pre style={codeBlockStyle}>
{`from sklearn.model_selection import train_test_split

# Sample data
X = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]]
y = [0, 0, 0, 1, 1, 1]

# Split: 80% training, 20% testing
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,      # 20% for testing
    random_state=42,    # For reproducibility
    stratify=y          # Maintain class distribution
)

print(f"Training samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")`}
              </pre>

              <h3 style={subHeadingStyle}>The fit/predict Pattern</h3>
              <p style={textStyle}>
                All scikit-learn models follow a consistent API with fit(), predict(), and score() methods.
              </p>
              <pre style={codeBlockStyle}>
{`from sklearn.linear_model import LogisticRegression

# Create model instance
model = LogisticRegression()

# fit() - Train the model on training data
model.fit(X_train, y_train)

# predict() - Make predictions on new data
predictions = model.predict(X_test)

# predict_proba() - Get probability estimates (for classifiers)
probabilities = model.predict_proba(X_test)

# score() - Get accuracy (or R2 for regression)
accuracy = model.score(X_test, y_test)
print(f"Model accuracy: {accuracy:.2f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Complete Example</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Scale features (important for many algorithms)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)  # Use same scaling

# Train model
model = LogisticRegression(max_iter=200)
model.fit(X_train_scaled, y_train)

# Evaluate
y_pred = model.predict(X_test_scaled)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")`}
              </pre>
            </div>
          </div>
        )}

        {/* Classification Section */}
        {activeSection === 'classification' && (
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>Classification Algorithms</h2>
              <p style={textStyle}>
                Classification is used to predict categorical labels (discrete classes).
              </p>

              <h3 style={subHeadingStyle}>Logistic Regression</h3>
              <p style={textStyle}>
                Despite its name, logistic regression is used for classification.
                Good baseline model for binary and multiclass problems.
              </p>
              <pre style={codeBlockStyle}>
{`from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split

# Load binary classification dataset
data = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(
    data.data, data.target, test_size=0.2, random_state=42
)

# Create and train model
log_reg = LogisticRegression(
    C=1.0,              # Inverse of regularization strength
    max_iter=1000,      # Maximum iterations for solver
    solver='lbfgs',     # Algorithm for optimization
    multi_class='auto'  # Binary or multinomial
)
log_reg.fit(X_train, y_train)

# Predictions
y_pred = log_reg.predict(X_test)
y_proba = log_reg.predict_proba(X_test)

print(f"Accuracy: {log_reg.score(X_test, y_test):.3f}")
print(f"Coefficients shape: {log_reg.coef_.shape}")`}
              </pre>

              <h3 style={subHeadingStyle}>Random Forest Classifier</h3>
              <p style={textStyle}>
                Ensemble method that builds multiple decision trees and merges their predictions.
                Robust to overfitting and handles non-linear relationships well.
              </p>
              <pre style={codeBlockStyle}>
{`from sklearn.ensemble import RandomForestClassifier

# Create Random Forest
rf_clf = RandomForestClassifier(
    n_estimators=100,       # Number of trees
    max_depth=10,           # Maximum depth of trees
    min_samples_split=2,    # Minimum samples to split node
    min_samples_leaf=1,     # Minimum samples in leaf
    max_features='sqrt',    # Features to consider for best split
    random_state=42,
    n_jobs=-1               # Use all CPU cores
)

rf_clf.fit(X_train, y_train)

# Get feature importances
importances = rf_clf.feature_importances_
feature_names = data.feature_names

# Print top 5 important features
indices = np.argsort(importances)[::-1][:5]
for i in indices:
    print(f"{feature_names[i]}: {importances[i]:.4f}")

print(f"\\nAccuracy: {rf_clf.score(X_test, y_test):.3f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Support Vector Machine (SVM)</h3>
              <p style={textStyle}>
                Effective in high-dimensional spaces. Uses kernel trick for non-linear classification.
              </p>
              <pre style={codeBlockStyle}>
{`from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler

# SVM requires feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Linear SVM
linear_svm = SVC(
    kernel='linear',
    C=1.0,
    random_state=42
)
linear_svm.fit(X_train_scaled, y_train)
print(f"Linear SVM Accuracy: {linear_svm.score(X_test_scaled, y_test):.3f}")

# RBF (Radial Basis Function) kernel - for non-linear data
rbf_svm = SVC(
    kernel='rbf',
    C=1.0,
    gamma='scale',      # Kernel coefficient
    probability=True,   # Enable probability estimates
    random_state=42
)
rbf_svm.fit(X_train_scaled, y_train)
print(f"RBF SVM Accuracy: {rbf_svm.score(X_test_scaled, y_test):.3f}")

# Get probability predictions
proba = rbf_svm.predict_proba(X_test_scaled)`}
              </pre>

              <h3 style={subHeadingStyle}>K-Nearest Neighbors</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.neighbors import KNeighborsClassifier

knn = KNeighborsClassifier(
    n_neighbors=5,          # Number of neighbors
    weights='uniform',      # 'uniform' or 'distance'
    metric='minkowski',     # Distance metric
    p=2                     # Power parameter (2 = Euclidean)
)
knn.fit(X_train_scaled, y_train)
print(f"KNN Accuracy: {knn.score(X_test_scaled, y_test):.3f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Gradient Boosting</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.ensemble import GradientBoostingClassifier

gb_clf = GradientBoostingClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    random_state=42
)
gb_clf.fit(X_train, y_train)
print(f"Gradient Boosting Accuracy: {gb_clf.score(X_test, y_test):.3f}")`}
              </pre>
            </div>
          </div>
        )}

        {/* Regression Section */}
        {activeSection === 'regression' && (
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>Regression Algorithms</h2>
              <p style={textStyle}>
                Regression is used to predict continuous numerical values.
              </p>

              <h3 style={subHeadingStyle}>Linear Regression</h3>
              <p style={textStyle}>
                The simplest regression algorithm. Finds the best linear relationship between features and target.
              </p>
              <pre style={codeBlockStyle}>
{`from sklearn.linear_model import LinearRegression
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Load regression dataset
housing = fetch_california_housing()
X_train, X_test, y_train, y_test = train_test_split(
    housing.data, housing.target, test_size=0.2, random_state=42
)

# Create and train model
lin_reg = LinearRegression()
lin_reg.fit(X_train, y_train)

# Make predictions
y_pred = lin_reg.predict(X_test)

# Evaluate
print(f"R2 Score: {r2_score(y_test, y_pred):.3f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.3f}")

# Model coefficients
print(f"\\nCoefficients: {lin_reg.coef_}")
print(f"Intercept: {lin_reg.intercept_:.3f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Ridge and Lasso Regression</h3>
              <p style={textStyle}>
                Regularized versions of linear regression to prevent overfitting.
              </p>
              <pre style={codeBlockStyle}>
{`from sklearn.linear_model import Ridge, Lasso, ElasticNet

# Ridge Regression (L2 regularization)
ridge = Ridge(alpha=1.0)  # alpha controls regularization strength
ridge.fit(X_train, y_train)
print(f"Ridge R2: {ridge.score(X_test, y_test):.3f}")

# Lasso Regression (L1 regularization - can zero out features)
lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)
print(f"Lasso R2: {lasso.score(X_test, y_test):.3f}")
print(f"Non-zero coefficients: {np.sum(lasso.coef_ != 0)}")

# ElasticNet (combines L1 and L2)
elastic = ElasticNet(alpha=0.1, l1_ratio=0.5)
elastic.fit(X_train, y_train)
print(f"ElasticNet R2: {elastic.score(X_test, y_test):.3f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Decision Tree Regressor</h3>
              <p style={textStyle}>
                Non-linear regression using a tree structure. Prone to overfitting but interpretable.
              </p>
              <pre style={codeBlockStyle}>
{`from sklearn.tree import DecisionTreeRegressor

dt_reg = DecisionTreeRegressor(
    max_depth=10,           # Limit depth to prevent overfitting
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42
)
dt_reg.fit(X_train, y_train)

y_pred = dt_reg.predict(X_test)
print(f"Decision Tree R2: {r2_score(y_test, y_pred):.3f}")

# Feature importances
for name, importance in zip(housing.feature_names, dt_reg.feature_importances_):
    if importance > 0.05:
        print(f"{name}: {importance:.3f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Random Forest Regressor</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.ensemble import RandomForestRegressor

rf_reg = RandomForestRegressor(
    n_estimators=100,
    max_depth=15,
    min_samples_split=5,
    random_state=42,
    n_jobs=-1
)
rf_reg.fit(X_train, y_train)

y_pred = rf_reg.predict(X_test)
print(f"Random Forest R2: {r2_score(y_test, y_pred):.3f}")
print(f"RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.3f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Gradient Boosting Regressor</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.ensemble import GradientBoostingRegressor

gb_reg = GradientBoostingRegressor(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=5,
    random_state=42
)
gb_reg.fit(X_train, y_train)

y_pred = gb_reg.predict(X_test)
print(f"Gradient Boosting R2: {r2_score(y_test, y_pred):.3f}")`}
              </pre>

              <h3 style={subHeadingStyle}>SVR (Support Vector Regression)</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.svm import SVR
from sklearn.preprocessing import StandardScaler

# SVR requires scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

svr = SVR(kernel='rbf', C=1.0, epsilon=0.1)
svr.fit(X_train_scaled, y_train)

y_pred = svr.predict(X_test_scaled)
print(f"SVR R2: {r2_score(y_test, y_pred):.3f}")`}
              </pre>
            </div>
          </div>
        )}

        {/* Model Evaluation Section */}
        {activeSection === 'evaluation' && (
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>Model Evaluation Metrics</h2>
              <p style={textStyle}>
                Proper evaluation is crucial for understanding model performance.
              </p>

              <h3 style={subHeadingStyle}>Classification Metrics</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score,
    roc_curve, precision_recall_curve
)

# Sample predictions
y_true = [0, 1, 1, 0, 1, 1, 0, 0, 1, 0]
y_pred = [0, 1, 0, 0, 1, 1, 0, 1, 1, 0]
y_proba = [0.1, 0.9, 0.4, 0.2, 0.8, 0.7, 0.3, 0.6, 0.85, 0.15]

# Accuracy: Overall correctness
accuracy = accuracy_score(y_true, y_pred)
print(f"Accuracy: {accuracy:.3f}")

# Precision: Of predicted positives, how many are correct?
# High precision = few false positives
precision = precision_score(y_true, y_pred)
print(f"Precision: {precision:.3f}")

# Recall (Sensitivity): Of actual positives, how many did we catch?
# High recall = few false negatives
recall = recall_score(y_true, y_pred)
print(f"Recall: {recall:.3f}")

# F1 Score: Harmonic mean of precision and recall
f1 = f1_score(y_true, y_pred)
print(f"F1 Score: {f1:.3f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Confusion Matrix</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

# Create confusion matrix
cm = confusion_matrix(y_true, y_pred)
print("Confusion Matrix:")
print(cm)
# [[TN, FP],
#  [FN, TP]]

# Visualize
# ConfusionMatrixDisplay.from_predictions(y_true, y_pred)
# plt.show()

# For multiclass
y_true_multi = [0, 1, 2, 0, 1, 2, 0, 1, 2]
y_pred_multi = [0, 2, 2, 0, 0, 2, 0, 1, 1]
cm_multi = confusion_matrix(y_true_multi, y_pred_multi)
print("\\nMulticlass Confusion Matrix:")
print(cm_multi)`}
              </pre>

              <h3 style={subHeadingStyle}>Classification Report</h3>
              <pre style={codeBlockStyle}>
{`# Complete classification report
report = classification_report(y_true, y_pred, target_names=['Class 0', 'Class 1'])
print(report)

# Output:
#               precision    recall  f1-score   support
#      Class 0       0.80      0.80      0.80         5
#      Class 1       0.80      0.80      0.80         5
#     accuracy                           0.80        10
#    macro avg       0.80      0.80      0.80        10
# weighted avg       0.80      0.80      0.80        10`}
              </pre>

              <h3 style={subHeadingStyle}>ROC-AUC Score</h3>
              <pre style={codeBlockStyle}>
{`# ROC-AUC: Area Under the ROC Curve
# Uses probability predictions
auc = roc_auc_score(y_true, y_proba)
print(f"ROC-AUC Score: {auc:.3f}")

# ROC Curve data points
fpr, tpr, thresholds = roc_curve(y_true, y_proba)

# For multiclass (One-vs-Rest)
from sklearn.preprocessing import label_binarize
y_true_bin = label_binarize(y_true_multi, classes=[0, 1, 2])
# Use roc_auc_score with multi_class='ovr'`}
              </pre>

              <h3 style={subHeadingStyle}>Regression Metrics</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.metrics import (
    mean_squared_error, mean_absolute_error,
    r2_score, mean_absolute_percentage_error
)
import numpy as np

y_true_reg = [3.0, 2.5, 4.0, 5.5, 3.5]
y_pred_reg = [2.8, 2.7, 3.8, 5.2, 3.6]

# Mean Squared Error (MSE)
mse = mean_squared_error(y_true_reg, y_pred_reg)
print(f"MSE: {mse:.4f}")

# Root Mean Squared Error (RMSE)
rmse = np.sqrt(mse)
print(f"RMSE: {rmse:.4f}")

# Mean Absolute Error (MAE)
mae = mean_absolute_error(y_true_reg, y_pred_reg)
print(f"MAE: {mae:.4f}")

# R-squared (coefficient of determination)
# 1.0 = perfect, 0 = same as predicting mean, negative = worse
r2 = r2_score(y_true_reg, y_pred_reg)
print(f"R2 Score: {r2:.4f}")

# Mean Absolute Percentage Error (MAPE)
mape = mean_absolute_percentage_error(y_true_reg, y_pred_reg)
print(f"MAPE: {mape:.4f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Choosing Metrics</h3>
              <pre style={codeBlockStyle}>
{`# When to use each metric:

# ACCURACY: Balanced classes, equal cost of errors
# - Good for: spam detection with balanced data

# PRECISION: False positives are costly
# - Good for: medical diagnosis (don't want false alarms)

# RECALL: False negatives are costly
# - Good for: fraud detection (don't want to miss fraud)

# F1 SCORE: Balance precision and recall
# - Good for: imbalanced classes

# ROC-AUC: Overall ranking ability
# - Good for: comparing models, probability calibration

# MSE/RMSE: Penalize large errors more
# - Good for: when outliers matter

# MAE: Equal penalty for all errors
# - Good for: when outliers should not dominate`}
              </pre>
            </div>
          </div>
        )}

        {/* Feature Engineering Section */}
        {activeSection === 'feature-engineering' && (
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>Feature Engineering</h2>
              <p style={textStyle}>
                Feature engineering transforms raw data into features that better represent
                the underlying problem to the predictive models.
              </p>

              <h3 style={subHeadingStyle}>Feature Scaling</h3>
              <p style={textStyle}>
                Many algorithms require features to be on the same scale.
              </p>
              <pre style={codeBlockStyle}>
{`from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
import numpy as np

X = np.array([[1, 100], [2, 200], [3, 150], [4, 300], [5, 250]])

# StandardScaler: zero mean, unit variance
# Use when: data is normally distributed
standard_scaler = StandardScaler()
X_standard = standard_scaler.fit_transform(X)
print("StandardScaler:")
print(f"Mean: {X_standard.mean(axis=0)}")  # ~0
print(f"Std: {X_standard.std(axis=0)}")    # ~1

# MinMaxScaler: scale to [0, 1] range
# Use when: need bounded values, neural networks
minmax_scaler = MinMaxScaler()
X_minmax = minmax_scaler.fit_transform(X)
print(f"\\nMinMaxScaler range: [{X_minmax.min()}, {X_minmax.max()}]")

# RobustScaler: uses median and IQR, robust to outliers
# Use when: data has outliers
robust_scaler = RobustScaler()
X_robust = robust_scaler.fit_transform(X)

# IMPORTANT: Always fit on training data, transform both
# scaler.fit_transform(X_train)  # Fit and transform training
# scaler.transform(X_test)       # Only transform test (no fit!)`}
              </pre>

              <h3 style={subHeadingStyle}>Encoding Categorical Variables</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.preprocessing import LabelEncoder, OneHotEncoder, OrdinalEncoder
import pandas as pd

# Sample categorical data
data = pd.DataFrame({
    'color': ['red', 'blue', 'green', 'red', 'blue'],
    'size': ['small', 'medium', 'large', 'medium', 'small']
})

# LabelEncoder: for target variable (single column)
label_enc = LabelEncoder()
y_encoded = label_enc.fit_transform(data['color'])
print(f"Label encoded: {y_encoded}")
print(f"Classes: {label_enc.classes_}")

# OneHotEncoder: for nominal categories (no order)
# Creates binary columns for each category
onehot_enc = OneHotEncoder(sparse_output=False, handle_unknown='ignore')
color_onehot = onehot_enc.fit_transform(data[['color']])
print(f"\\nOne-hot shape: {color_onehot.shape}")
print(f"Categories: {onehot_enc.categories_}")

# OrdinalEncoder: for ordinal categories (has order)
ordinal_enc = OrdinalEncoder(categories=[['small', 'medium', 'large']])
size_ordinal = ordinal_enc.fit_transform(data[['size']])
print(f"\\nOrdinal encoded: {size_ordinal.ravel()}")`}
              </pre>

              <h3 style={subHeadingStyle}>Handling Missing Values</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.impute import SimpleImputer, KNNImputer
import numpy as np

X_missing = np.array([
    [1, 2, np.nan],
    [3, np.nan, 6],
    [7, 8, 9],
    [np.nan, 11, 12]
])

# SimpleImputer: fill with mean, median, or constant
mean_imputer = SimpleImputer(strategy='mean')
X_mean = mean_imputer.fit_transform(X_missing)
print("Mean imputed:")
print(X_mean)

# Median imputer (better for skewed data)
median_imputer = SimpleImputer(strategy='median')
X_median = median_imputer.fit_transform(X_missing)

# Constant imputer
constant_imputer = SimpleImputer(strategy='constant', fill_value=0)
X_constant = constant_imputer.fit_transform(X_missing)

# KNN Imputer: uses k-nearest neighbors
knn_imputer = KNNImputer(n_neighbors=2)
X_knn = knn_imputer.fit_transform(X_missing)
print("\\nKNN imputed:")
print(X_knn)`}
              </pre>

              <h3 style={subHeadingStyle}>Feature Selection</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.feature_selection import (
    SelectKBest, f_classif, mutual_info_classif,
    RFE, SelectFromModel
)
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

# Load data
iris = load_iris()
X, y = iris.data, iris.target

# SelectKBest: Select top k features by statistical test
selector = SelectKBest(score_func=f_classif, k=2)
X_selected = selector.fit_transform(X, y)
print(f"Original shape: {X.shape}")
print(f"Selected shape: {X_selected.shape}")
print(f"Selected features: {selector.get_support()}")
print(f"Feature scores: {selector.scores_}")

# Recursive Feature Elimination (RFE)
rf = RandomForestClassifier(n_estimators=50, random_state=42)
rfe = RFE(estimator=rf, n_features_to_select=2)
X_rfe = rfe.fit_transform(X, y)
print(f"\\nRFE selected: {rfe.support_}")
print(f"Feature ranking: {rfe.ranking_}")

# SelectFromModel: based on feature importance
sfm = SelectFromModel(rf, threshold='median')
sfm.fit(X, y)
X_sfm = sfm.transform(X)
print(f"\\nSelectFromModel shape: {X_sfm.shape}")`}
              </pre>

              <h3 style={subHeadingStyle}>Polynomial Features</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.preprocessing import PolynomialFeatures

X = np.array([[2, 3], [4, 5]])

# Create polynomial and interaction features
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X)

print(f"Original: {X.shape} -> Polynomial: {X_poly.shape}")
print(f"Feature names: {poly.get_feature_names_out(['x1', 'x2'])}")
# ['x1', 'x2', 'x1^2', 'x1 x2', 'x2^2']`}
              </pre>

              <h3 style={subHeadingStyle}>Column Transformer (Pipeline)</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer

# Define transformations for different column types
numeric_features = ['age', 'income']
categorical_features = ['gender', 'occupation']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', Pipeline([
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())
        ]), numeric_features),
        ('cat', Pipeline([
            ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
            ('onehot', OneHotEncoder(handle_unknown='ignore'))
        ]), categorical_features)
    ]
)

# Use in a full pipeline with a model
from sklearn.linear_model import LogisticRegression

full_pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', LogisticRegression())
])

# Now you can fit/predict with raw data
# full_pipeline.fit(X_train, y_train)
# predictions = full_pipeline.predict(X_test)`}
              </pre>
            </div>
          </div>
        )}

        {/* Cross-Validation Section */}
        {activeSection === 'cross-validation' && (
          <div>
            <div style={cardStyle}>
              <h2 style={headingStyle}>Cross-Validation</h2>
              <p style={textStyle}>
                Cross-validation provides a more robust estimate of model performance
                by testing on multiple different train/test splits.
              </p>

              <h3 style={subHeadingStyle}>K-Fold Cross-Validation</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.model_selection import KFold, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
import numpy as np

# Load data
iris = load_iris()
X, y = iris.data, iris.target

# Create model
model = LogisticRegression(max_iter=200)

# Simple cross_val_score (recommended for most cases)
scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')
print(f"CV Scores: {scores}")
print(f"Mean: {scores.mean():.3f} (+/- {scores.std() * 2:.3f})")

# Manual KFold for more control
kfold = KFold(n_splits=5, shuffle=True, random_state=42)

fold_scores = []
for fold, (train_idx, test_idx) in enumerate(kfold.split(X)):
    X_train, X_test = X[train_idx], X[test_idx]
    y_train, y_test = y[train_idx], y[test_idx]

    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    fold_scores.append(score)
    print(f"Fold {fold + 1}: {score:.3f}")

print(f"\\nMean: {np.mean(fold_scores):.3f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Stratified K-Fold</h3>
              <p style={textStyle}>
                Maintains class distribution in each fold. Essential for imbalanced datasets.
              </p>
              <pre style={codeBlockStyle}>
{`from sklearn.model_selection import StratifiedKFold, cross_val_score

# StratifiedKFold ensures each fold has same class distribution
stratified_kfold = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# cross_val_score uses StratifiedKFold by default for classifiers
scores = cross_val_score(model, X, y, cv=stratified_kfold, scoring='accuracy')
print(f"Stratified CV Scores: {scores}")
print(f"Mean: {scores.mean():.3f}")

# Verify class distribution in each fold
for fold, (train_idx, test_idx) in enumerate(stratified_kfold.split(X, y)):
    train_dist = np.bincount(y[train_idx]) / len(train_idx)
    test_dist = np.bincount(y[test_idx]) / len(test_idx)
    print(f"Fold {fold + 1} - Train dist: {train_dist}, Test dist: {test_dist}")`}
              </pre>

              <h3 style={subHeadingStyle}>Leave-One-Out Cross-Validation</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.model_selection import LeaveOneOut, cross_val_score

# LOOCV: n-1 samples for training, 1 for testing
# Good for small datasets, but computationally expensive
loo = LeaveOneOut()

# For small datasets
X_small = X[:20]
y_small = y[:20]

scores = cross_val_score(model, X_small, y_small, cv=loo)
print(f"LOOCV Mean Accuracy: {scores.mean():.3f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Cross-Validation with Multiple Metrics</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.model_selection import cross_validate

# Get multiple metrics at once
scoring = ['accuracy', 'precision_macro', 'recall_macro', 'f1_macro']

results = cross_validate(
    model, X, y,
    cv=5,
    scoring=scoring,
    return_train_score=True
)

print("Cross-validation results:")
for metric in scoring:
    test_key = f'test_{metric}'
    train_key = f'train_{metric}'
    print(f"\\n{metric}:")
    print(f"  Test:  {results[test_key].mean():.3f} (+/- {results[test_key].std():.3f})")
    print(f"  Train: {results[train_key].mean():.3f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Time Series Cross-Validation</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.model_selection import TimeSeriesSplit

# For time series data: train on past, test on future
tscv = TimeSeriesSplit(n_splits=5)

X_time = np.arange(100).reshape(-1, 1)
y_time = np.random.randn(100)

for fold, (train_idx, test_idx) in enumerate(tscv.split(X_time)):
    print(f"Fold {fold + 1}:")
    print(f"  Train indices: {train_idx[0]} to {train_idx[-1]}")
    print(f"  Test indices: {test_idx[0]} to {test_idx[-1]}")`}
              </pre>

              <h3 style={subHeadingStyle}>Hyperparameter Tuning with GridSearchCV</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

# Define parameter grid
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, 15, None],
    'min_samples_split': [2, 5, 10]
}

rf = RandomForestClassifier(random_state=42)

# Grid search with cross-validation
grid_search = GridSearchCV(
    rf,
    param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
    verbose=1
)

grid_search.fit(X, y)

print(f"Best parameters: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.3f}")
print(f"Best estimator: {grid_search.best_estimator_}")`}
              </pre>

              <h3 style={subHeadingStyle}>RandomizedSearchCV (Faster)</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint, uniform

# Define parameter distributions
param_dist = {
    'n_estimators': randint(50, 500),
    'max_depth': randint(3, 20),
    'min_samples_split': randint(2, 20),
    'min_samples_leaf': randint(1, 10)
}

random_search = RandomizedSearchCV(
    rf,
    param_distributions=param_dist,
    n_iter=50,          # Number of random combinations to try
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
    random_state=42
)

random_search.fit(X, y)
print(f"Best parameters: {random_search.best_params_}")
print(f"Best CV score: {random_search.best_score_:.3f}")`}
              </pre>

              <h3 style={subHeadingStyle}>Complete Pipeline with CV</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV

# Create pipeline
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('pca', PCA()),
    ('svc', SVC())
])

# Define parameter grid for pipeline
param_grid = {
    'pca__n_components': [2, 3, 4],
    'svc__C': [0.1, 1, 10],
    'svc__kernel': ['rbf', 'linear']
}

# Grid search on entire pipeline
grid_search = GridSearchCV(pipe, param_grid, cv=5, n_jobs=-1)
grid_search.fit(X, y)

print(f"Best pipeline score: {grid_search.best_score_:.3f}")
print(f"Best parameters: {grid_search.best_params_}")`}
              </pre>
            </div>
          </div>
        )}

        {/* Quick Reference */}
        <div style={cardStyle}>
          <h2 style={headingStyle}>Quick Reference</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div>
              <h3 style={subHeadingStyle}>Common Workflow</h3>
              <pre style={codeBlockStyle}>
{`# 1. Load and explore data
# 2. Split into train/test
# 3. Preprocess (scale, encode)
# 4. Train model
# 5. Evaluate with CV
# 6. Tune hyperparameters
# 7. Final evaluation on test set`}
              </pre>
            </div>
            <div>
              <h3 style={subHeadingStyle}>Useful Imports</h3>
              <pre style={codeBlockStyle}>
{`from sklearn.model_selection import (
    train_test_split,
    cross_val_score,
    GridSearchCV
)
from sklearn.preprocessing import (
    StandardScaler,
    OneHotEncoder
)
from sklearn.metrics import (
    accuracy_score,
    classification_report
)`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
