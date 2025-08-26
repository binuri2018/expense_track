// Shared color system for consistent category colors across the app
export const CATEGORY_COLORS = {
  'Travel': '#ff6b6b',           // Red
  'Food & Dining': '#f39c12',    // Orange
  'Entertainment': '#2ecc71',    // Green
  'Transportation': '#3498db',   // Blue
  'Shopping': '#9b59b6',         // Purple
  'Bills & Utilities': '#1abc9c', // Teal
  'Healthcare': '#e67e22',       // Dark Orange
  'Education': '#34495e',        // Dark Blue
  'Other': '#95a5a6'             // Gray
};

export const CHART_COLORS = [
  '#ff6b6b',   // Red
  '#f39c12',   // Orange  
  '#2ecc71',   // Green
  '#3498db',   // Blue
  '#9b59b6',   // Purple
  '#1abc9c',   // Teal
  '#e67e22',   // Dark Orange
  '#34495e',   // Dark Blue
  '#95a5a6'    // Gray
];

export const getCategoryColor = (category) => {
  return CATEGORY_COLORS[category] || '#ff6b6b';
};
