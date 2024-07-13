import React, { useState, useEffect } from "react";
import { fetchFashionTrends, generateAndAnalyzeTrend } from "../../api";
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
  const [llmResponse, setLlmResponse] = useState(""); // State to store LLM response

  const handleFetchTrends = async () => {
    try {
      const data = await fetchFashionTrends(keyword, generateSuggestions);
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
        const { imageUrl, response } = await generateAndAnalyzeTrend(
          selectedFile
        );
        console.log(imageUrl);
        setPlotUrl(imageUrl);
        setLlmResponse(response); // Store LLM response
      } catch (error) {
        console.error("Error generating and analyzing trend:", error);
        setError(error.message);
      }
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
                  {rec.image_link && (
                    <div>
                      <img
                        src={rec.image_link}
                        alt="Product"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                  )}
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
                <button onClick={handleFetchTrends}>
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

        {plotUrl && (
          <div className="plot-image">
            <h3>Forecasting for the fashion trend:</h3>
            <img src={plotUrl} alt="Trend Plot" />
            {/* Log plotUrl outside of JSX */}
            {console.log("Plot URL:", plotUrl)}
            {llmResponse && (
              <div>
                {/* <h3>LLM Analysis</h3> */}
                <div dangerouslySetInnerHTML={{ __html: llmResponse }} />
              </div>
            )}
          </div>
        )}

        <div className="file-upload">
          <h3>Upload CSV for Trend Plot</h3>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
      </div>
    </div>
  );
};

export default Trends;
