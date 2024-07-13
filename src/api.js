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

export const generateAndAnalyzeTrend = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const plotResponse = await fetch(
      "http://localhost:5000/api/trend_analysis",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!plotResponse.ok) {
      const errorData = await plotResponse.json();
      throw new Error(errorData.error || "Failed to generate trend plot");
    }

    const responseData = await plotResponse.json();
    const { response, image } = responseData;

    // Ensure 'image' is a Base64 string
    const imageUrl = `data:image/png;base64,${image}`;

    return {
      response: response,
      imageUrl: imageUrl,
    };
  } catch (error) {
    console.error("Error generating and analyzing trend:", error);
    throw error;
  }
};
