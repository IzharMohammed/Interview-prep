"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    setError("");
    setShortCode("");

    if (!url) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setShortCode(data.shortCode);
    } catch (err) {
      setError("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const shortUrl = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            URL Shortener
          </h1>
          <p className="text-gray-600 text-lg">
            Transform long URLs into short, shareable links
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your long URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleShorten()}
              placeholder="https://example.com/very-long-url-that-needs-shortening"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleShorten}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>

          {shortCode && (
            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-3 font-medium">
                Your shortened URL:
              </p>
              <div className="flex items-center gap-3">
                <code className="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-300 text-indigo-600 font-mono text-lg">
                  {window.location.origin}/{shortCode}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium whitespace-nowrap"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Features</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Generate short 6-character codes for any URL</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Redis caching for lightning-fast redirects</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>PostgreSQL database for reliable storage</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">✓</span>
              <span>Click tracking and analytics</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
