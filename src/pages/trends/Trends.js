import React, { useState, useEffect } from "react";
import { fetchFashionTrends, generateTrendPlot, analyzeTrend } from "../../api";
import "./Trends.css";

const loadGoogleTrendsScript = () => {
  return new Promise((resolve) => {
    if (window.trends) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://ssl.gstatic.com/trends_nrtr/3769_RC01/embed_loader.js";
      script.onload = resolve;
      document.body.appendChild(script);
    }
  });
};

const flattenSuggestions = (nestedList) => {
  return nestedList.flat();
};

const Trends = () => {
  const [keyword, setKeyword] = useState("");
  const [trendData, setTrendData] = useState(null);
  const [error, setError] = useState(null);
  const [generateSuggestions, setGenerateSuggestions] = useState(false);
  const [file, setFile] = useState(null);
  const [plotUrl, setPlotUrl] = useState("");
  const [showLLMButton, setShowLLMButton] = useState(false); // State to control visibility of LLM analysis button

  const handleFetchTrends = async () => {
    try {
      const data = await fetchFashionTrends(keyword, generateSuggestions);
      setTrendData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGenerateSuggestions = async () => {
    try {
      const data = await fetchFashionTrends(keyword, true); // Fetch with generate_suggestions flag
      setTrendData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      try {
        const plotUrl = await generateTrendPlot(selectedFile);
        setPlotUrl(plotUrl);
        setShowLLMButton(true); // Show LLM analysis button after successful plot generation
      } catch (error) {
        console.error("Error generating trend plot:", error);
        setError(error.message);
      }
    }
  };

  const handleLLMAnalysis = async () => {
    try {
      await analyzeTrend();
      alert("LLM Analysis performed successfully.");
    } catch (error) {
      console.error("Error performing LLM Analysis:", error);
      alert("Failed to perform LLM Analysis.");
    }
  };

  useEffect(() => {
    const renderTrends = async () => {
      if (trendData && trendData.suggestions) {
        await loadGoogleTrendsScript();

        const flattenedSuggestions = flattenSuggestions(trendData.suggestions);

        flattenedSuggestions.forEach((suggestion, index) => {
          try {
            window.trends.embed.renderExploreWidgetTo(
              document.getElementById(`trend-${index}`),
              "TIMESERIES",
              {
                comparisonItem: [
                  { keyword: suggestion, geo: "IN", time: "today 5-y" },
                ],
                category: 0,
                property: "",
              },
              {
                exploreQuery: `date=today%205-y&geo=IN&q=${encodeURIComponent(
                  suggestion
                )}&hl=en-GB`,
                guestPath: "https://trends.google.com:443/trends/embed/",
              }
            );
          } catch (error) {
            console.error(`Error rendering trend for ${suggestion}:`, error);
          }
        });
      }
    };

    renderTrends();
  }, [trendData]);

  return (
    <div className="Trends">
      <div className="trends-container">
        <h2>Fashion Trends</h2>

        <div className="search-bar">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter fashion keyword"
          />
          <button onClick={handleFetchTrends}>Fetch Trends</button>
        </div>

        {error && <p className="error">{error}</p>}

        {trendData && trendData.recommendations && (
          <div className="recommendations">
            <h3>Recommendations</h3>
            <ul>
              {trendData.recommendations.map((rec, index) => (
                <li key={index}>
                  <div>{rec.Text}</div>
                  <a href={rec.link} target="_blank" rel="noopener noreferrer">
                    Product Link
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={generateSuggestions}
                  onChange={() => setGenerateSuggestions(!generateSuggestions)}
                />
                Do you want to generate Keyword Suggestions and Fashion Trends
                Data?
              </label>
              {generateSuggestions && (
                <button onClick={handleGenerateSuggestions}>
                  Generate Suggestions
                </button>
              )}
            </div>
          </div>
        )}

        {trendData && trendData.suggestions && (
          <div className="suggestions">
            <h3>Keyword Suggestions</h3>
            <ul>
              {flattenSuggestions(trendData.suggestions).map(
                (suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                )
              )}
            </ul>
          </div>
        )}

        {trendData && trendData.suggestions && (
          <div className="trend-plots">
            <h3>Trend Plots</h3>
            {flattenSuggestions(trendData.suggestions).map(
              (suggestion, index) => (
                <div key={index} id={`trend-${index}`} className="trend-plot">
                  {/* Placeholder for Google Trends plot */}
                </div>
              )
            )}
          </div>
        )}

        <div className="file-upload">
          <h3>Upload CSV for Trend Plot</h3>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
          {plotUrl && (
            <div className="plot-image">
              <h3>Generated Plot</h3>
              <img src={plotUrl} alt="Trend Plot" />
              {showLLMButton && (
                <button onClick={handleLLMAnalysis}>
                  LLM Analysis on Trend Suggestions
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trends;
