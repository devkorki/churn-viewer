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

```
churn-viewer/
├── public/
│   └── data/
│       └── churn_predictions.csv         # Churn results input file
├── src/
│   ├── components/
│   │   ├── ChurnGauge.jsx                # Churn score visualization
│   │   ├── ClientBarChart.jsx            # Horizontal score bar chart
│   │   ├── ClientDetailsModal.jsx        # Modal for client detail view
│   │   └── ClientTable.jsx               # Main table logic
│   ├── App.js                            # Main application logic
│   └── ...
├── package.json
└── README.md
```

## Running Locally

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/devkorki/churn-viewer.git
   cd churn-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser at [http://localhost:3000](http://localhost:3000)

## Data Requirements

The app expects a file at `public/data/churn_predictions.csv` with the following structure:

| client_id | churn_probability | prediction |
|-----------|-------------------|------------|
| 100001    | 0.83              | Churn      |
| 100002    | 0.24              | Retain     |

- `churn_probability`: A value between 0 and 1
- `prediction`: Binary label derived from a threshold (e.g., 0.5)

## Flagged Clients

Clients can be flagged directly from the table using a flag icon. Flagged clients appear in a dedicated tab. This feature uses local memory (session-based), so the state resets on reload.

## Deployment

You can deploy this app to any static hosting platform:

- Vercel
- Netlify
- GitHub Pages

For example, using Vercel:

1. Push the repository to GitHub
2. Connect the repo to [vercel.com](https://vercel.com)
3. Deploy with default settings (React app is auto-detected)

## Project Context

This app was developed as part of a Data Science Capstone project. The CSV file used in the viewer is the result of a supervised machine learning pipeline that predicted client churn. The frontend provides a way for non-technical users to interpret and act on those predictions.

## License

MIT License
