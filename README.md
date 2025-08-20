Developer's Text & Data Toolkit

A versatile, client-side web application built with React and Vite, offering a collection of essential tools for developers. All data processing happens directly in your browser, ensuring your data remains private and secure.
✨ Features

This toolkit provides a suite of utilities to help with common development tasks, all accessible from a clean, responsive interface.

    Welcome Page: A user-friendly introduction to the application.

    JSON Formatter: Beautify or minify JSON data and validate its structure.

    JWT Decoder: Decode JSON Web Tokens to inspect their header and payload.

    Hash Generator: Generate popular cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512) from text.

    Color Converter: Convert between HEX, RGB, and HSL color formats with a live preview.

    Base64 Encoder: Encode and decode strings using Base64.

    URL Encoder: Encode and decode URL components to make them safe for web use.

    Timestamp Converter: Convert between Unix timestamps and human-readable dates.

    Text Inspector: Get quick stats on your text, including character, word, and line counts.

    Regex Tester: Test and validate regular expressions against a string in real-time.

    AI-Powered Tools:

        Generate Mock JSON Data: Describe the data you need, and the Gemini API will generate it.

        Generate Regex: Describe the pattern you want to match, and the Gemini API will create the regex.

    Persistent State: The app remembers your last-used tool and the text in your input fields.

    Responsive Design: A mobile-friendly layout with a collapsible sidebar.

    Dark/Light Mode: Switch between themes for comfortable viewing in any lighting.

🚀 Live Demo

You can view a live version of the application here:

https://dev-toolkit-chi.vercel.app/
💻 Tech Stack

    Frontend: React (with Hooks)

    Build Tool: Vite

    Styling: Tailwind CSS

    AI: Google Gemini API

    Hashing: CryptoJS

🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
Prerequisites

You need to have Node.js (LTS version is recommended) and npm installed on your machine.
Installation & Setup

    Clone the repository:

    git clone https://github.com/your-username/dev-toolkit.git


    Navigate to the project directory:

    cd dev-toolkit


    Install NPM packages:

    npm install


    Run the development server:

    npm run dev


The application should now be running on http://localhost:5173.
Usage

Once the application is running, you can navigate between the different tools using the sidebar on the left. All tools are client-side, meaning your data is processed locally in your browser and is never sent to an external server. For the AI-powered features, your prompt is sent to the Google Gemini API to generate a response.
