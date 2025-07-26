# Churn Viewer

The Churn Viewer is a React-based web application designed to visualize and analyze client churn prediction data. It presents churn scores and binary predictions in a sortable, searchable, and interactive table, helping users identify clients at risk and take action.

## Overview

This application loads churn prediction results from a CSV file and displays them in a user-friendly interface. It supports filtering, client flagging, and basic visualizations to provide a deeper understanding of client behavior and churn risk.

## Features

- Load and parse churn predictions from a CSV file
- Tabbed interface with:
  - All clients
  - Top 100 churn-risk clients
  - Flagged clients (user-selected)
- Sort and search clients by ID or score
- Flag/unflag clients with session-based persistence
- Display churn probabilities using gauges and bar charts
- Modal pop-up for detailed client view
- Responsive layout and modular component design

## Project Structure

.
├── public/
│ └── data/
│ └── churn_predictions.csv # Churn results file
├── src/
│ ├── components/
│ │ ├── ChurnGauge.jsx # Churn score visualization
│ │ ├── ClientBarChart.jsx # Horizontal score chart
│ │ ├── ClientDetailsModal.jsx # Modal for client info
│ │ └── ClientTable.jsx # Main table logic
│ ├── App.js # Main app logic
│ └── ...
├── package.json
└── README.md


## Running Locally

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/devkorki/churn-viewer.git
   cd churn-viewer

   npm install
   npm start

