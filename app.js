// Use React and useState from the global window object
// We can do this because React was loaded in the index.html
const { useState } = React;

// This is our main App component
function App() {
    // == RESUME BULLET 4: "Used the useState hook to store..." ==
    // State for the search input
    const [searchTerm, setSearchTerm] = useState('');
    // State for the list of recipes from the API
    const [recipes, setRecipes] = useState([]);
    // State for loading message
    const [loading, setLoading] = useState(false);
    // State for any errors
    const [error, setError] = useState(null);

    // == RESUME BULLET 3: "Fetched recipe data from a public REST API..." ==
    const fetchRecipes = async () => {
        setLoading(true);
        setError(null);
        setRecipes([]); // Clear old recipes

        try {
            // We use TheMealDB API, it's free and requires no key
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // The API returns 'null' if no meals are found
            if (data.meals) {
                setRecipes(data.meals);
            } else {
                setError('No recipes found. Try another search!');
            }

        } catch (err) {
            setError('Failed to fetch recipes. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Stop the page from reloading
        if (searchTerm.trim()) {
            fetchRecipes();
        }
    };

    // == RESUME BULLET 1, 2, 5: "React.js app", "search for recipes", "Styled with CSS" ==
    return (
        <div className="app-container">
            <h1>Dynamic Recipe Finder</h1>
            
            <form className="search-form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className="search-input"
                    placeholder="Search for a recipe (e.g., 'Chicken')"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {/* Show loading or error messages */}
            {loading && <p className="message-center">Loading recipes...</p>}
            {error && <p className="message-center">{error}</p>}

            {/* Show the grid of recipes */}
            <div className="recipe-grid">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.idMeal} recipe={recipe} />
                ))}
            </div>

            {/* Added a credit to the API provider */}
            {recipes.length > 0 && (
                <p className="api-credit">
                    Recipe data provided by <a href="https://www.themealdb.com/" target="_blank" rel="noopener noreferrer">TheMealDB</a>
                </p>
            )}
        </div>
    );
}

// A smaller component for the recipe card
function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <img 
                src={recipe.strMealThumb} 
                alt={recipe.strMeal} 
                className="recipe-image" 
            />
            <div className="recipe-content">
                <h3>{recipe.strMeal}</h3>
                <p>Category: {recipe.strCategory}</p>
                <a 
                    href={recipe.strSource || `https://www.themealdb.com/meal/${recipe.idMeal}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="recipe-link"
                >
                    View Recipe
                </a>
            </div>
        </div>
    );
}

// Mount the React app to the 'root' div
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
