# Sanchari Travels - Travel Booking System

A premium, highly interactive, and visually stunning travel booking web application built with **React** and **Vanilla CSS**. The application adopts a elegant White & Baby Pink aesthetic and simulates real-time connection handshakes with reservation terminal APIs.

## 🚀 Key Features

*   **Multifaceted Search Engine**: Tabs for Flights, Hotels, Packages, Trains, and Buses.
*   **Realistic Indian Hubs & Destinations**: Fully configured with local Indian airport hubs, IRCTC railway stations, and state bus stands.
*   **Database Sync Simulation**: pulsing log logs indicating live query links to IRCTC, airline, and hotel endpoints.
*   **Visual Layout Customize Utilities**:
    *   **Airplane Cabins**: Select economy, business, or first-class seating blocks.
    *   **Hotel Rooms**: View descriptions and select room tiers (suites, chambers).
    *   **Train Berths**: Interactive coach layout representing AC 3-Tier and AC 2-Tier coaches (LH/RH cabins, middle berths, and side berths).
    *   **Bus Sleeper Decks**: Double-deck Volvo coach sleeper layout (Lower and Upper decks).
*   **Multi-step Booking & Billing**:
    *   Dynamic fare calculation incorporating selected coach class pricing.
    *   Integrated **Aadhaar / ID Card** inputs for train/bus journeys.
    *   3D Credit Card visualizer which dynamically flips to show card number and CVV as you type.
*   **Voucher Downloads & History Dashboard**:
    *   Custom-styled printable IRCTC E-Tickets, Bus Tickets, and Boarding Passes.
    *   Dashboard containing upcoming trips, name editors, and booking cancellations with refund credit simulator.
*   **Aura Virtual Assistant**:
    *   Floating chatbot offering quick replies and automated responses to policies, routes, and promotions.

---

## 🛠️ Local Development Setup

To run Sanchari Travels on your local machine:

1.  **Navigate to the directory**:
    ```bash
    cd C:\Users\T.shruthi\.gemini\antigravity-ide\scratch\travel-booking-system
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run in developer mode**:
    ```bash
    npm run dev
    ```
4.  Open the local dev server link (e.g. `http://localhost:5173`) in your browser.

---

## 🌐 Deploying to GitHub Pages

Follow these step-by-step instructions to push the code and deploy it live on GitHub:

### 1. Create a Repository on GitHub
1. Go to [github.com](https://github.com/) and log into your account.
2. Click **New** to create a repository.
3. Name it **`travel-booking-system`**.
4. Set the visibility to **Public**.
5. Do **not** initialize it with a README, `.gitignore`, or license (we already have them configured locally).
6. Click **Create repository**.

### 2. Link Local Code & Push to GitHub
Open your terminal in the project folder and run:
```powershell
# Add your GitHub repository remote
git remote add origin https://github.com/SHIVANI23-gh/travel-booking-system.git

# Push the main branch code to GitHub
git push -u origin main
```
### 3. Deploy the Site Live
Run the deployment script:
```powershell
npm run deploy
```
This command automatically triggers:
1. `predeploy`: Compiles the React production bundle into the `dist/` directory.
2. `deploy`: Pushes the compiled bundle to the `gh-pages` branch on GitHub.

### 4. Enable GitHub Pages in Settings
1. Go to your repository page on GitHub.
2. Click on **Settings** (top tab) -> **Pages** (left sidebar).
3. Under **Build and deployment** -> **Branch**, make sure the source branch is set to **`gh-pages`** and folder `/ (root)`.
4. Save the setting. Your app will be live at:
   `https://SHIVANI23-gh.github.io/travel-booking-system/`
