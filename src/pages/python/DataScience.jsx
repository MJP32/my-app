import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function DataScience({ onBack, breadcrumb }) {
  const [selectedSection, setSelectedSection] = useState(null)

  const sections = [
    {
      id: 'numpy-basics',
      name: 'NumPy Basics',
      icon: '🔢',
      color: '#3b82f6',
      description: 'N-dimensional arrays, operations, and broadcasting',
      topics: [
        {
          title: 'Array Creation',
          code: `import numpy as np

# Create arrays from lists
arr1d = np.array([1, 2, 3, 4, 5])
arr2d = np.array([[1, 2, 3], [4, 5, 6]])
print(arr1d)        # [1 2 3 4 5]
print(arr2d.shape)  # (2, 3)

# Create arrays with functions
zeros = np.zeros((3, 4))          # 3x4 matrix of zeros
ones = np.ones((2, 3))            # 2x3 matrix of ones
empty = np.empty((2, 2))          # Uninitialized values
full = np.full((3, 3), 7)         # 3x3 filled with 7

# Range and linspace
arange = np.arange(0, 10, 2)      # [0 2 4 6 8]
linspace = np.linspace(0, 1, 5)   # [0.   0.25 0.5  0.75 1.  ]

# Identity matrix and random
identity = np.eye(3)              # 3x3 identity matrix
random_arr = np.random.rand(3, 3) # Random values 0-1
random_int = np.random.randint(0, 100, (3, 3))  # Random integers

# Reshape arrays
arr = np.arange(12)
reshaped = arr.reshape(3, 4)      # 3x4 matrix
flattened = reshaped.flatten()   # Back to 1D`
        },
        {
          title: 'Array Operations',
          code: `import numpy as np

a = np.array([1, 2, 3, 4])
b = np.array([5, 6, 7, 8])

# Element-wise operations
print(a + b)       # [ 6  8 10 12]
print(a - b)       # [-4 -4 -4 -4]
print(a * b)       # [ 5 12 21 32]
print(a / b)       # [0.2 0.33 0.43 0.5]
print(a ** 2)      # [ 1  4  9 16]

# Mathematical functions
print(np.sqrt(a))      # [1.   1.41 1.73 2.  ]
print(np.exp(a))       # [ 2.72  7.39 20.09 54.60]
print(np.log(a))       # [0.   0.69 1.10 1.39]
print(np.sin(a))       # [0.84 0.91 0.14 -0.76]

# Aggregation functions
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(np.sum(arr))           # 21
print(np.sum(arr, axis=0))   # [5 7 9] (column sums)
print(np.sum(arr, axis=1))   # [6 15] (row sums)
print(np.mean(arr))          # 3.5
print(np.std(arr))           # 1.71
print(np.min(arr))           # 1
print(np.max(arr))           # 6
print(np.argmax(arr))        # 5 (index of max)`
        },
        {
          title: 'Broadcasting',
          code: `import numpy as np

# Broadcasting allows operations on different shapes
a = np.array([[1, 2, 3],
              [4, 5, 6]])

# Scalar broadcast
print(a + 10)
# [[11 12 13]
#  [14 15 16]]

# 1D array broadcast across rows
b = np.array([1, 2, 3])
print(a + b)
# [[2 4 6]
#  [5 7 9]]

# Column vector broadcast
c = np.array([[10], [20]])
print(a + c)
# [[11 12 13]
#  [24 25 26]]

# Rules of broadcasting:
# 1. If arrays have different ndim, prepend 1s to smaller shape
# 2. Arrays with size 1 along a dimension act like the larger size
# 3. Arrays must match or have size 1 along each dimension

# Example: Normalizing rows
data = np.array([[1, 2, 3],
                 [4, 5, 6]])
row_means = data.mean(axis=1, keepdims=True)
normalized = data - row_means
print(normalized)
# [[-1.  0.  1.]
#  [-1.  0.  1.]]`
        },
        {
          title: 'Indexing and Slicing',
          code: `import numpy as np

arr = np.array([[1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]])

# Basic indexing
print(arr[0, 0])     # 1
print(arr[1, 2])     # 7
print(arr[-1, -1])   # 12

# Slicing [start:stop:step]
print(arr[0, :])     # [1 2 3 4] (first row)
print(arr[:, 0])     # [1 5 9] (first column)
print(arr[0:2, 1:3]) # [[2 3] [6 7]] (submatrix)
print(arr[::2, :])   # [[1 2 3 4] [9 10 11 12]] (every other row)

# Boolean indexing
print(arr[arr > 5])  # [ 6  7  8  9 10 11 12]
arr[arr < 3] = 0     # Set values < 3 to 0

# Fancy indexing (using arrays)
indices = np.array([0, 2])
print(arr[indices])  # Rows 0 and 2

# np.where for conditional selection
result = np.where(arr > 5, arr, 0)  # Keep if > 5, else 0
print(result)`
        }
      ]
    },
    {
      id: 'pandas-dataframes',
      name: 'Pandas DataFrames',
      icon: '📊',
      color: '#10b981',
      description: 'Data manipulation and analysis with DataFrames',
      topics: [
        {
          title: 'DataFrame Creation',
          code: `import pandas as pd
import numpy as np

# From dictionary
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 28],
    'city': ['NYC', 'LA', 'Chicago', 'Boston'],
    'salary': [70000, 80000, 90000, 75000]
}
df = pd.DataFrame(data)
print(df)
#       name  age     city  salary
# 0    Alice   25      NYC   70000
# 1      Bob   30       LA   80000
# 2  Charlie   35  Chicago   90000
# 3    David   28   Boston   75000

# From NumPy array
arr = np.random.rand(4, 3)
df2 = pd.DataFrame(arr, columns=['A', 'B', 'C'])

# From CSV file
df_csv = pd.read_csv('data.csv')

# From Excel file
df_excel = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# From JSON
df_json = pd.read_json('data.json')

# Basic info
print(df.shape)       # (4, 4)
print(df.columns)     # Index(['name', 'age', 'city', 'salary'])
print(df.dtypes)      # Data types of each column
print(df.info())      # Summary info
print(df.describe())  # Statistical summary`
        },
        {
          title: 'Indexing and Selection',
          code: `import pandas as pd

df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 28],
    'salary': [70000, 80000, 90000, 75000]
})

# Column selection
print(df['name'])              # Single column (Series)
print(df[['name', 'age']])     # Multiple columns (DataFrame)

# Row selection with .loc (label-based)
print(df.loc[0])               # First row
print(df.loc[0:2])             # Rows 0, 1, 2 (inclusive!)
print(df.loc[0, 'name'])       # Specific cell: 'Alice'
print(df.loc[:, 'name'])       # All rows, 'name' column

# Row selection with .iloc (integer position)
print(df.iloc[0])              # First row
print(df.iloc[0:2])            # Rows 0, 1 (exclusive!)
print(df.iloc[0, 0])           # First cell
print(df.iloc[:, 0:2])         # All rows, first 2 columns

# Boolean indexing
print(df[df['age'] > 28])      # Rows where age > 28
print(df[df['name'].str.startswith('A')])  # Name starts with 'A'

# Multiple conditions
mask = (df['age'] > 25) & (df['salary'] > 70000)
print(df[mask])

# Using query() method
print(df.query('age > 28 and salary > 70000'))

# isin() for multiple values
print(df[df['name'].isin(['Alice', 'Bob'])])`
        },
        {
          title: 'Data Manipulation',
          code: `import pandas as pd

df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'salary': [70000, 80000, 90000]
})

# Adding columns
df['bonus'] = df['salary'] * 0.1
df['total'] = df['salary'] + df['bonus']

# Apply function to column
df['age_group'] = df['age'].apply(lambda x: 'Young' if x < 30 else 'Senior')

# Rename columns
df = df.rename(columns={'name': 'employee_name'})

# Drop columns/rows
df = df.drop(columns=['bonus'])
df = df.drop(index=[0])  # Drop first row

# Sorting
df = df.sort_values('salary', ascending=False)
df = df.sort_values(['age', 'salary'], ascending=[True, False])
df = df.sort_index()  # Sort by index

# Reset index
df = df.reset_index(drop=True)

# Set a column as index
df = df.set_index('employee_name')

# Value replacement
df['salary'] = df['salary'].replace(80000, 85000)
df['age_group'] = df['age_group'].map({'Young': 0, 'Senior': 1})

# Assign multiple columns at once
df = df.assign(
    tax=df['salary'] * 0.2,
    net_salary=lambda x: x['salary'] - x['tax']
)`
        },
        {
          title: 'GroupBy Operations',
          code: `import pandas as pd

df = pd.DataFrame({
    'department': ['Sales', 'Sales', 'IT', 'IT', 'HR'],
    'employee': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    'salary': [50000, 60000, 70000, 80000, 55000],
    'bonus': [5000, 6000, 7000, 8000, 5500]
})

# Basic groupby
grouped = df.groupby('department')
print(grouped['salary'].mean())
# department
# HR       55000
# IT       75000
# Sales    55000

# Multiple aggregations
print(df.groupby('department').agg({
    'salary': ['mean', 'sum', 'count'],
    'bonus': 'sum'
}))

# Named aggregations (cleaner output)
result = df.groupby('department').agg(
    avg_salary=('salary', 'mean'),
    total_bonus=('bonus', 'sum'),
    employee_count=('employee', 'count')
)
print(result)

# Transform - returns same-shaped DataFrame
df['salary_mean'] = df.groupby('department')['salary'].transform('mean')
df['salary_rank'] = df.groupby('department')['salary'].rank(ascending=False)

# Filter groups
high_salary_depts = df.groupby('department').filter(
    lambda x: x['salary'].mean() > 60000
)

# Apply custom function
def top_earner(group):
    return group.nlargest(1, 'salary')

top_earners = df.groupby('department').apply(top_earner)`
        },
        {
          title: 'Merging and Joining',
          code: `import pandas as pd

# Sample DataFrames
employees = pd.DataFrame({
    'emp_id': [1, 2, 3, 4],
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'dept_id': [101, 102, 101, 103]
})

departments = pd.DataFrame({
    'dept_id': [101, 102, 104],
    'dept_name': ['Sales', 'IT', 'Marketing']
})

# Inner join (default) - only matching keys
inner = pd.merge(employees, departments, on='dept_id')
print(inner)

# Left join - all from left, matching from right
left = pd.merge(employees, departments, on='dept_id', how='left')
print(left)

# Right join - all from right, matching from left
right = pd.merge(employees, departments, on='dept_id', how='right')

# Outer join - all from both
outer = pd.merge(employees, departments, on='dept_id', how='outer')

# Join on different column names
df1 = pd.DataFrame({'id': [1, 2], 'value': ['a', 'b']})
df2 = pd.DataFrame({'key': [1, 2], 'data': ['x', 'y']})
merged = pd.merge(df1, df2, left_on='id', right_on='key')

# Concatenate DataFrames
df_top = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df_bottom = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})
concatenated = pd.concat([df_top, df_bottom], ignore_index=True)

# Concatenate horizontally
df_left = pd.DataFrame({'A': [1, 2]})
df_right = pd.DataFrame({'B': [3, 4]})
side_by_side = pd.concat([df_left, df_right], axis=1)`
        }
      ]
    },
    {
      id: 'data-visualization',
      name: 'Data Visualization',
      icon: '📈',
      color: '#8b5cf6',
      description: 'Creating charts and plots with Matplotlib and Seaborn',
      topics: [
        {
          title: 'Matplotlib Basics',
          code: `import matplotlib.pyplot as plt
import numpy as np

# Basic line plot
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sin(x)', color='blue', linewidth=2)
plt.plot(x, np.cos(x), label='cos(x)', color='red', linestyle='--')
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('Trigonometric Functions')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('plot.png', dpi=300, bbox_inches='tight')
plt.show()

# Scatter plot
np.random.seed(42)
x = np.random.rand(50)
y = np.random.rand(50)
colors = np.random.rand(50)
sizes = 1000 * np.random.rand(50)

plt.figure(figsize=(8, 6))
plt.scatter(x, y, c=colors, s=sizes, alpha=0.5, cmap='viridis')
plt.colorbar(label='Color scale')
plt.xlabel('X')
plt.ylabel('Y')
plt.title('Scatter Plot with Color and Size')
plt.show()

# Bar chart
categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 56, 78, 32]

plt.figure(figsize=(8, 5))
plt.bar(categories, values, color='steelblue', edgecolor='black')
plt.xlabel('Categories')
plt.ylabel('Values')
plt.title('Bar Chart')
plt.show()`
        },
        {
          title: 'Subplots and Multiple Charts',
          code: `import matplotlib.pyplot as plt
import numpy as np

# Create multiple subplots
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Plot 1: Line plot
x = np.linspace(0, 10, 100)
axes[0, 0].plot(x, np.sin(x), 'b-', label='sin')
axes[0, 0].plot(x, np.cos(x), 'r--', label='cos')
axes[0, 0].set_title('Line Plot')
axes[0, 0].legend()
axes[0, 0].grid(True)

# Plot 2: Histogram
data = np.random.randn(1000)
axes[0, 1].hist(data, bins=30, color='green', alpha=0.7, edgecolor='black')
axes[0, 1].set_title('Histogram')
axes[0, 1].set_xlabel('Value')
axes[0, 1].set_ylabel('Frequency')

# Plot 3: Box plot
data = [np.random.randn(100) for _ in range(4)]
axes[1, 0].boxplot(data, labels=['A', 'B', 'C', 'D'])
axes[1, 0].set_title('Box Plot')

# Plot 4: Pie chart
sizes = [30, 25, 20, 15, 10]
labels = ['Python', 'Java', 'JavaScript', 'C++', 'Other']
axes[1, 1].pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
axes[1, 1].set_title('Pie Chart')

plt.tight_layout()
plt.show()

# Shared axes
fig, (ax1, ax2) = plt.subplots(1, 2, sharey=True, figsize=(10, 4))
ax1.bar(['A', 'B', 'C'], [10, 20, 15])
ax2.bar(['D', 'E', 'F'], [12, 18, 22])
plt.show()`
        },
        {
          title: 'Seaborn Statistical Visualizations',
          code: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Load sample dataset
tips = sns.load_dataset('tips')

# Set style
sns.set_theme(style='whitegrid')

# Distribution plot
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
sns.histplot(data=tips, x='total_bill', kde=True, ax=axes[0])
axes[0].set_title('Distribution of Total Bill')
sns.boxplot(data=tips, x='day', y='total_bill', ax=axes[1])
axes[1].set_title('Total Bill by Day')
plt.tight_layout()
plt.show()

# Scatter plot with regression
plt.figure(figsize=(8, 6))
sns.regplot(data=tips, x='total_bill', y='tip', scatter_kws={'alpha': 0.5})
plt.title('Tip vs Total Bill with Regression Line')
plt.show()

# Categorical plots
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
sns.violinplot(data=tips, x='day', y='total_bill', hue='sex', ax=axes[0])
axes[0].set_title('Violin Plot')
sns.swarmplot(data=tips, x='day', y='total_bill', hue='sex', ax=axes[1])
axes[1].set_title('Swarm Plot')
plt.tight_layout()
plt.show()

# Heatmap for correlation
corr = tips.select_dtypes(include=[np.number]).corr()
plt.figure(figsize=(8, 6))
sns.heatmap(corr, annot=True, cmap='coolwarm', center=0)
plt.title('Correlation Heatmap')
plt.show()

# Pair plot
sns.pairplot(tips, hue='sex', diag_kind='kde')
plt.show()`
        },
        {
          title: 'Customizing Plots',
          code: `import matplotlib.pyplot as plt
import numpy as np

# Custom style
plt.style.use('seaborn-v0_8-darkgrid')

# Create figure with custom size and DPI
fig, ax = plt.subplots(figsize=(10, 6), dpi=100)

# Plot with custom styling
x = np.linspace(0, 10, 100)
ax.plot(x, np.sin(x), color='#2ecc71', linewidth=2.5,
        linestyle='-', marker='o', markevery=10,
        markersize=8, label='Sine Wave')

# Customize axes
ax.set_xlim(0, 10)
ax.set_ylim(-1.5, 1.5)
ax.set_xlabel('Time (s)', fontsize=12, fontweight='bold')
ax.set_ylabel('Amplitude', fontsize=12, fontweight='bold')
ax.set_title('Custom Styled Plot', fontsize=14, fontweight='bold', pad=20)

# Customize ticks
ax.tick_params(axis='both', which='major', labelsize=10)
ax.set_xticks(np.arange(0, 11, 2))

# Add annotations
ax.annotate('Peak', xy=(np.pi/2, 1), xytext=(2, 1.3),
            arrowprops=dict(arrowstyle='->', color='red'),
            fontsize=11, color='red')

# Add horizontal/vertical lines
ax.axhline(y=0, color='gray', linestyle='--', alpha=0.5)
ax.axvline(x=np.pi, color='orange', linestyle=':', alpha=0.7)

# Fill between
ax.fill_between(x, 0, np.sin(x), where=(np.sin(x) > 0),
                alpha=0.3, color='green', label='Positive')

# Legend customization
ax.legend(loc='upper right', fontsize=10, framealpha=0.9,
          edgecolor='black', fancybox=True, shadow=True)

# Add text box
textstr = 'Max: 1.0\\nMin: -1.0'
props = dict(boxstyle='round', facecolor='wheat', alpha=0.5)
ax.text(0.02, 0.98, textstr, transform=ax.transAxes, fontsize=10,
        verticalalignment='top', bbox=props)

plt.tight_layout()
plt.savefig('custom_plot.png', dpi=300, bbox_inches='tight',
            facecolor='white', edgecolor='none')
plt.show()`
        }
      ]
    },
    {
      id: 'data-cleaning',
      name: 'Data Cleaning',
      icon: '🧹',
      color: '#f59e0b',
      description: 'Handling missing values, duplicates, and type conversion',
      topics: [
        {
          title: 'Handling Missing Values',
          code: `import pandas as pd
import numpy as np

# Create DataFrame with missing values
df = pd.DataFrame({
    'A': [1, 2, np.nan, 4, 5],
    'B': [np.nan, 2, 3, np.nan, 5],
    'C': ['a', 'b', np.nan, 'd', 'e']
})

# Check for missing values
print(df.isnull())           # Boolean mask
print(df.isnull().sum())     # Count per column
print(df.isnull().sum().sum())  # Total count
print(df.isna().any())       # Any missing in each column

# Drop missing values
df_dropped = df.dropna()              # Drop rows with any NaN
df_dropped = df.dropna(axis=1)        # Drop columns with any NaN
df_dropped = df.dropna(how='all')     # Drop only if all values are NaN
df_dropped = df.dropna(thresh=2)      # Keep rows with at least 2 non-NaN
df_dropped = df.dropna(subset=['A'])  # Drop if NaN in column 'A'

# Fill missing values
df_filled = df.fillna(0)              # Fill with scalar
df_filled = df.fillna({'A': 0, 'B': df['B'].mean()})  # Per column
df_filled = df.fillna(method='ffill')  # Forward fill
df_filled = df.fillna(method='bfill')  # Backward fill

# Interpolation
df['A'] = df['A'].interpolate()       # Linear interpolation
df['B'] = df['B'].interpolate(method='polynomial', order=2)

# Replace specific values
df = df.replace(-999, np.nan)         # Replace -999 with NaN
df = df.replace({-999: np.nan, -1: 0})  # Multiple replacements

# For time series: resample and fill
# df = df.resample('D').mean().interpolate()`
        },
        {
          title: 'Handling Duplicates',
          code: `import pandas as pd

df = pd.DataFrame({
    'id': [1, 2, 2, 3, 3, 3],
    'name': ['Alice', 'Bob', 'Bob', 'Charlie', 'Charlie', 'Charlie'],
    'value': [100, 200, 200, 300, 350, 300]
})

# Check for duplicates
print(df.duplicated())              # Boolean mask
print(df.duplicated().sum())        # Count duplicates
print(df.duplicated(subset=['id'])) # Check specific columns
print(df.duplicated(keep=False))    # Mark all duplicates (not just first)

# Drop duplicates
df_unique = df.drop_duplicates()                    # Keep first occurrence
df_unique = df.drop_duplicates(keep='last')         # Keep last occurrence
df_unique = df.drop_duplicates(keep=False)          # Remove all duplicates
df_unique = df.drop_duplicates(subset=['id'])       # Based on specific column
df_unique = df.drop_duplicates(subset=['id', 'name'])  # Multiple columns

# Find duplicate rows
duplicates = df[df.duplicated(keep=False)]
print("Duplicate rows:")
print(duplicates)

# Group and aggregate duplicates
df_agg = df.groupby(['id', 'name']).agg({
    'value': ['mean', 'count']
}).reset_index()

# Remove duplicates keeping max value
idx = df.groupby('id')['value'].idxmax()
df_max = df.loc[idx]
print(df_max)`
        },
        {
          title: 'Data Type Conversion',
          code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    'int_col': ['1', '2', '3', '4'],
    'float_col': ['1.5', '2.5', '3.5', 'N/A'],
    'date_col': ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01'],
    'bool_col': ['True', 'False', 'True', 'True'],
    'category_col': ['A', 'B', 'A', 'C']
})

# Check data types
print(df.dtypes)

# Convert to numeric
df['int_col'] = pd.to_numeric(df['int_col'])
df['float_col'] = pd.to_numeric(df['float_col'], errors='coerce')  # N/A -> NaN

# Using astype
df['int_col'] = df['int_col'].astype(int)
df['int_col'] = df['int_col'].astype('int64')

# Convert to datetime
df['date_col'] = pd.to_datetime(df['date_col'])
df['date_col'] = pd.to_datetime(df['date_col'], format='%Y-%m-%d')

# Extract datetime components
df['year'] = df['date_col'].dt.year
df['month'] = df['date_col'].dt.month
df['day'] = df['date_col'].dt.day
df['weekday'] = df['date_col'].dt.day_name()

# Convert to boolean
df['bool_col'] = df['bool_col'].map({'True': True, 'False': False})

# Convert to category (memory efficient for repeated values)
df['category_col'] = df['category_col'].astype('category')

# Convert multiple columns at once
df = df.astype({
    'int_col': 'int64',
    'category_col': 'category'
})

# Memory usage comparison
print(df.memory_usage(deep=True))`
        },
        {
          title: 'String Cleaning',
          code: `import pandas as pd

df = pd.DataFrame({
    'name': ['  Alice  ', 'BOB', 'charlie', 'DAVID  '],
    'email': ['alice@email.com', 'bob@EMAIL.COM', 'CHARLIE@email', 'david@email.com'],
    'phone': ['123-456-7890', '(123) 456 7890', '1234567890', '123.456.7890']
})

# String methods (use .str accessor)
# Whitespace
df['name'] = df['name'].str.strip()           # Remove leading/trailing whitespace
df['name'] = df['name'].str.lstrip()          # Remove leading whitespace
df['name'] = df['name'].str.rstrip()          # Remove trailing whitespace

# Case conversion
df['name'] = df['name'].str.lower()           # lowercase
df['name'] = df['name'].str.upper()           # UPPERCASE
df['name'] = df['name'].str.title()           # Title Case
df['name'] = df['name'].str.capitalize()      # First letter caps

# Replace and clean
df['phone'] = df['phone'].str.replace(r'[^0-9]', '', regex=True)  # Keep only digits
df['email'] = df['email'].str.lower()

# Split and extract
df[['first', 'last']] = df['email'].str.split('@', expand=True)
df['domain'] = df['email'].str.extract(r'@(.+)')  # Regex extract

# Contains, startswith, endswith
gmail_users = df[df['email'].str.contains('gmail', case=False)]
valid_emails = df[df['email'].str.contains(r'^[\\w.]+@[\\w.]+\\.\\w+$', regex=True)]

# Pad and slice
df['phone'] = df['phone'].str.zfill(10)       # Pad with zeros
df['area_code'] = df['phone'].str[:3]         # First 3 characters

# Length
df['name_length'] = df['name'].str.len()

# Multiple replacements
df['clean_name'] = df['name'].str.replace(r'[^a-zA-Z]', '', regex=True)`
        },
        {
          title: 'Outlier Detection and Handling',
          code: `import pandas as pd
import numpy as np

# Create sample data with outliers
np.random.seed(42)
df = pd.DataFrame({
    'value': np.concatenate([np.random.normal(50, 10, 100), [200, -50, 300]])
})

# Z-score method
from scipy import stats
df['zscore'] = stats.zscore(df['value'])
outliers_zscore = df[np.abs(df['zscore']) > 3]
print(f"Outliers (Z-score > 3): {len(outliers_zscore)}")

# IQR method
Q1 = df['value'].quantile(0.25)
Q3 = df['value'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
outliers_iqr = df[(df['value'] < lower_bound) | (df['value'] > upper_bound)]
print(f"Outliers (IQR method): {len(outliers_iqr)}")

# Remove outliers
df_clean = df[(df['value'] >= lower_bound) & (df['value'] <= upper_bound)]

# Cap outliers (Winsorization)
df['value_capped'] = df['value'].clip(lower=lower_bound, upper=upper_bound)

# Replace outliers with median
median_value = df['value'].median()
df.loc[np.abs(df['zscore']) > 3, 'value'] = median_value

# Log transformation (for right-skewed data)
df['value_log'] = np.log1p(df['value'].clip(lower=0))

# Percentile-based capping
lower_cap = df['value'].quantile(0.01)
upper_cap = df['value'].quantile(0.99)
df['value_percentile_capped'] = df['value'].clip(lower=lower_cap, upper=upper_cap)

print(f"Original range: {df['value'].min():.2f} to {df['value'].max():.2f}")
print(f"Capped range: {df['value_capped'].min():.2f} to {df['value_capped'].max():.2f}")`
        }
      ]
    },
    {
      id: 'statistical-analysis',
      name: 'Statistical Analysis',
      icon: '📉',
      color: '#ec4899',
      description: 'Descriptive statistics, correlation, and hypothesis testing',
      topics: [
        {
          title: 'Descriptive Statistics',
          code: `import pandas as pd
import numpy as np

# Sample data
np.random.seed(42)
df = pd.DataFrame({
    'A': np.random.normal(100, 15, 1000),
    'B': np.random.exponential(50, 1000),
    'C': np.random.uniform(0, 100, 1000)
})

# Basic statistics
print(df.describe())              # count, mean, std, min, 25%, 50%, 75%, max
print(df.describe(percentiles=[.1, .25, .5, .75, .9]))  # Custom percentiles

# Central tendency
print(df['A'].mean())             # Mean: 100.x
print(df['A'].median())           # Median (50th percentile)
print(df['A'].mode())             # Mode (most frequent value)

# Dispersion
print(df['A'].std())              # Standard deviation
print(df['A'].var())              # Variance
print(df['A'].min(), df['A'].max())  # Range
print(df['A'].max() - df['A'].min())  # Range value

# Quantiles and percentiles
print(df['A'].quantile(0.25))     # 25th percentile (Q1)
print(df['A'].quantile([0.25, 0.5, 0.75]))  # Multiple quantiles

# Skewness and Kurtosis
print(df['A'].skew())             # Skewness (0 = symmetric)
print(df['A'].kurtosis())         # Kurtosis (0 = normal)
print(df['B'].skew())             # Exponential is right-skewed

# Summary for all columns
stats_summary = pd.DataFrame({
    'Mean': df.mean(),
    'Median': df.median(),
    'Std': df.std(),
    'Skewness': df.skew(),
    'Kurtosis': df.kurtosis()
})
print(stats_summary)`
        },
        {
          title: 'Correlation Analysis',
          code: `import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Sample data
np.random.seed(42)
x = np.random.randn(100)
df = pd.DataFrame({
    'x': x,
    'y': 2 * x + np.random.randn(100) * 0.5,  # Strong positive correlation
    'z': -x + np.random.randn(100) * 0.3,     # Strong negative correlation
    'w': np.random.randn(100)                  # No correlation
})

# Correlation matrix (Pearson by default)
corr_matrix = df.corr()
print("Correlation Matrix:")
print(corr_matrix)

# Specific correlation methods
pearson = df.corr(method='pearson')    # Linear relationship
spearman = df.corr(method='spearman')  # Monotonic relationship (rank-based)
kendall = df.corr(method='kendall')    # Ordinal data

# Correlation between specific columns
corr_xy = df['x'].corr(df['y'])
print(f"Correlation between x and y: {corr_xy:.4f}")

# Covariance
cov_matrix = df.cov()
print("Covariance Matrix:")
print(cov_matrix)

# Visualize correlation matrix
plt.figure(figsize=(8, 6))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0,
            vmin=-1, vmax=1, square=True, linewidths=0.5)
plt.title('Correlation Heatmap')
plt.show()

# Statistical significance of correlation
from scipy.stats import pearsonr, spearmanr
corr, p_value = pearsonr(df['x'], df['y'])
print(f"Pearson correlation: {corr:.4f}, p-value: {p_value:.4e}")

corr_spearman, p_spearman = spearmanr(df['x'], df['y'])
print(f"Spearman correlation: {corr_spearman:.4f}, p-value: {p_spearman:.4e}")`
        },
        {
          title: 'Hypothesis Testing',
          code: `import numpy as np
from scipy import stats

# Sample data
np.random.seed(42)
group_a = np.random.normal(100, 15, 50)  # Control group
group_b = np.random.normal(110, 15, 50)  # Treatment group

# 1. One-sample t-test (compare mean to known value)
t_stat, p_value = stats.ttest_1samp(group_a, 100)
print(f"One-sample t-test: t={t_stat:.4f}, p={p_value:.4f}")
if p_value < 0.05:
    print("Reject null hypothesis: Mean is significantly different from 100")

# 2. Two-sample independent t-test
t_stat, p_value = stats.ttest_ind(group_a, group_b)
print(f"Two-sample t-test: t={t_stat:.4f}, p={p_value:.4f}")
if p_value < 0.05:
    print("Reject null hypothesis: Groups have significantly different means")

# 3. Paired t-test (before/after comparison)
before = np.random.normal(100, 10, 30)
after = before + np.random.normal(5, 3, 30)  # Small improvement
t_stat, p_value = stats.ttest_rel(before, after)
print(f"Paired t-test: t={t_stat:.4f}, p={p_value:.4f}")

# 4. Chi-square test (categorical data)
observed = np.array([[50, 30], [20, 40]])  # Contingency table
chi2, p_value, dof, expected = stats.chi2_contingency(observed)
print(f"Chi-square test: chi2={chi2:.4f}, p={p_value:.4f}")

# 5. ANOVA (compare multiple groups)
group_c = np.random.normal(105, 15, 50)
f_stat, p_value = stats.f_oneway(group_a, group_b, group_c)
print(f"ANOVA: F={f_stat:.4f}, p={p_value:.4f}")

# 6. Mann-Whitney U test (non-parametric alternative to t-test)
u_stat, p_value = stats.mannwhitneyu(group_a, group_b)
print(f"Mann-Whitney U: U={u_stat:.4f}, p={p_value:.4f}")

# 7. Shapiro-Wilk test for normality
stat, p_value = stats.shapiro(group_a)
print(f"Shapiro-Wilk: stat={stat:.4f}, p={p_value:.4f}")
if p_value > 0.05:
    print("Data is normally distributed")`
        },
        {
          title: 'Confidence Intervals and Effect Size',
          code: `import numpy as np
from scipy import stats

# Sample data
np.random.seed(42)
data = np.random.normal(100, 15, 100)

# Confidence Interval for mean
mean = np.mean(data)
sem = stats.sem(data)  # Standard error of mean
confidence_level = 0.95

# Using t-distribution
ci = stats.t.interval(confidence_level, len(data)-1, loc=mean, scale=sem)
print(f"Mean: {mean:.2f}")
print(f"95% CI: ({ci[0]:.2f}, {ci[1]:.2f})")

# Bootstrap confidence interval
n_bootstrap = 10000
bootstrap_means = []
for _ in range(n_bootstrap):
    sample = np.random.choice(data, size=len(data), replace=True)
    bootstrap_means.append(np.mean(sample))

ci_bootstrap = np.percentile(bootstrap_means, [2.5, 97.5])
print(f"Bootstrap 95% CI: ({ci_bootstrap[0]:.2f}, {ci_bootstrap[1]:.2f})")

# Effect size: Cohen's d
group_a = np.random.normal(100, 15, 50)
group_b = np.random.normal(110, 15, 50)

def cohens_d(group1, group2):
    n1, n2 = len(group1), len(group2)
    var1, var2 = np.var(group1, ddof=1), np.var(group2, ddof=1)
    pooled_std = np.sqrt(((n1-1)*var1 + (n2-1)*var2) / (n1+n2-2))
    return (np.mean(group1) - np.mean(group2)) / pooled_std

d = cohens_d(group_a, group_b)
print(f"Cohen's d: {d:.4f}")
# Interpretation: |d| < 0.2 small, 0.2-0.8 medium, > 0.8 large

# Effect size for correlation: r-squared
r = np.corrcoef(group_a, group_b[:50])[0, 1]
r_squared = r ** 2
print(f"R-squared: {r_squared:.4f}")

# Power analysis (requires statsmodels)
from statsmodels.stats.power import TTestIndPower
power_analysis = TTestIndPower()
sample_size = power_analysis.solve_power(effect_size=0.5, alpha=0.05, power=0.8)
print(f"Required sample size for d=0.5, alpha=0.05, power=0.8: {sample_size:.0f}")`
        },
        {
          title: 'Rolling Statistics and Time Series',
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Create time series data
np.random.seed(42)
dates = pd.date_range(start='2024-01-01', periods=365, freq='D')
values = np.cumsum(np.random.randn(365)) + 100  # Random walk
df = pd.DataFrame({'date': dates, 'value': values})
df.set_index('date', inplace=True)

# Rolling statistics
df['rolling_mean_7'] = df['value'].rolling(window=7).mean()
df['rolling_std_7'] = df['value'].rolling(window=7).std()
df['rolling_min_30'] = df['value'].rolling(window=30).min()
df['rolling_max_30'] = df['value'].rolling(window=30).max()

# Exponential weighted moving average (more weight to recent values)
df['ewm_mean'] = df['value'].ewm(span=7).mean()
df['ewm_std'] = df['value'].ewm(span=7).std()

# Expanding window (cumulative)
df['expanding_mean'] = df['value'].expanding().mean()
df['expanding_std'] = df['value'].expanding().std()

# Percentage change
df['pct_change'] = df['value'].pct_change()
df['pct_change_7d'] = df['value'].pct_change(periods=7)

# Difference
df['diff'] = df['value'].diff()
df['diff_7d'] = df['value'].diff(periods=7)

# Lag features
df['lag_1'] = df['value'].shift(1)
df['lag_7'] = df['value'].shift(7)
df['lead_1'] = df['value'].shift(-1)

# Resample to weekly
weekly = df['value'].resample('W').agg(['mean', 'std', 'min', 'max'])
print(weekly.head())

# Plot with rolling statistics
plt.figure(figsize=(12, 6))
plt.plot(df['value'], label='Original', alpha=0.5)
plt.plot(df['rolling_mean_7'], label='7-day Rolling Mean', linewidth=2)
plt.fill_between(df.index,
                 df['rolling_mean_7'] - 2*df['rolling_std_7'],
                 df['rolling_mean_7'] + 2*df['rolling_std_7'],
                 alpha=0.2, label='95% CI')
plt.legend()
plt.title('Time Series with Rolling Statistics')
plt.show()`
        }
      ]
    }
  ]

  const renderTopicContent = (topic) => {
    return (
      <div key={topic.title} style={{ marginBottom: '2rem' }}>
        <h3 style={{
          color: '#93c5fd',
          fontSize: '1.25rem',
          marginBottom: '1rem',
          borderBottom: '1px solid #374151',
          paddingBottom: '0.5rem'
        }}>
          {topic.title}
        </h3>
        <SyntaxHighlighter
          language="python"
          style={vscDarkPlus}
          customStyle={{
            borderRadius: '0.5rem',
            padding: '1.25rem',
            fontSize: '0.875rem',
            border: '1px solid #374151',
            backgroundColor: '#1a1a2e'
          }}
          showLineNumbers={true}
        >
          {topic.code}
        </SyntaxHighlighter>
      </div>
    )
  }

  if (selectedSection) {
    const section = sections.find(s => s.id === selectedSection)
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
        color: 'white',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button
            onClick={() => setSelectedSection(null)}
            style={{
              marginBottom: '1.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1d4ed8'
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#2563eb'
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          >
            Back to Data Science
          </button>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            borderRadius: '0.75rem',
            padding: '2rem',
            border: '2px solid #374151'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              borderBottom: '2px solid #374151',
              paddingBottom: '1.5rem'
            }}>
              <span style={{ fontSize: '3rem' }}>{section.icon}</span>
              <div>
                <h1 style={{
                  margin: 0,
                  fontSize: '2rem',
                  background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {section.name}
                </h1>
                <p style={{ color: '#9ca3af', margin: '0.5rem 0 0 0' }}>
                  {section.description}
                </p>
              </div>
            </div>

            {section.topics.map(topic => renderTopicContent(topic))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      color: 'white',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{
            marginBottom: '1.5rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '500',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1d4ed8'
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#2563eb'
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
        >
          Back to Python
        </button>

        <Breadcrumb breadcrumb={breadcrumb} />

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
          }}>
            Python Data Science Reference
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#9ca3af',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            Comprehensive guide to NumPy, Pandas, Matplotlib, Seaborn, and statistical analysis in Python
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {sections.map(section => (
            <div
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                border: '2px solid #374151',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = section.color
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = `0 20px 40px -10px ${section.color}40`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#374151'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '2.5rem' }}>{section.icon}</span>
                <h2 style={{
                  margin: 0,
                  fontSize: '1.5rem',
                  color: '#93c5fd'
                }}>
                  {section.name}
                </h2>
              </div>
              <p style={{
                color: '#9ca3af',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {section.description}
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {section.topics.slice(0, 3).map(topic => (
                  <span
                    key={topic.title}
                    style={{
                      background: '#374151',
                      color: '#d1d5db',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem'
                    }}
                  >
                    {topic.title}
                  </span>
                ))}
                {section.topics.length > 3 && (
                  <span style={{
                    background: section.color,
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem'
                  }}>
                    +{section.topics.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '3rem',
          background: 'linear-gradient(to right, #1f2937, #111827)',
          borderRadius: '0.75rem',
          padding: '2rem',
          border: '1px solid #374151'
        }}>
          <h2 style={{
            color: '#93c5fd',
            fontSize: '1.5rem',
            marginBottom: '1rem'
          }}>
            Quick Reference: Essential Imports
          </h2>
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{
              borderRadius: '0.5rem',
              padding: '1.25rem',
              fontSize: '0.875rem',
              border: '1px solid #374151'
            }}
          >
{`# Data Science Stack
import numpy as np                    # Numerical computing
import pandas as pd                   # Data manipulation
import matplotlib.pyplot as plt       # Basic plotting
import seaborn as sns                 # Statistical visualization
from scipy import stats               # Statistical functions

# Common aliases and settings
pd.set_option('display.max_columns', None)   # Show all columns
pd.set_option('display.max_rows', 100)       # Show more rows
np.set_printoptions(precision=3)             # Limit decimal places
sns.set_theme(style='whitegrid')             # Set seaborn style
plt.rcParams['figure.figsize'] = [10, 6]     # Default figure size`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}

export default DataScience
