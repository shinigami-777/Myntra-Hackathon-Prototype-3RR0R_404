export const generateQuiz = async (quizData) => {
  try {
    const response = await fetch("http://localhost:5000/api/generate_quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quizData),
    });

    if (!response.ok) {
      throw new Error("Failed to generate quiz");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};

export const fetchFashionTrends = async (keyword, generateSuggestions) => {
  try {
    const response = await fetch("http://localhost:5000/api/fashion_trends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword,
        generate_suggestions: generateSuggestions,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch fashion trends");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fashion trends:", error);
    throw error;
  }
};

export const generateTrendPlot = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:5000/api/trend_generation", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate trend plot");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Error generating trend plot:", error);
    throw error;
  }
};

export const analyzeTrend = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/trend_analysis_response",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to analyze trend");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error analyzing trend:", error);
    throw error;
  }
};
