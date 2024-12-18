<?php
// Database connection details
$host = 'localhost';
$dbname = 'reelratings'; 
$username = "root"; 
$password = ""; 

try {
    // Establish database connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if a search term is provided
    $searchTerm = isset($_GET['search']) ? $_GET['search'] : '';

    // Fetch movies based on search term or show the first 6 movies
    $query = "SELECT name, genre FROM movie WHERE name LIKE :searchTerm LIMIT 6"; 
    $stmt = $pdo->prepare($query);
    $stmt->execute(['searchTerm' => '%' . $searchTerm . '%']);
    $movies = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return movies as JSON
    header('Content-Type: application/json');
    echo json_encode($movies);
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>
