<?php
// Database connection details
$host = 'localhost';
$dbname = 'reelratings'; 
$username = 'username'; 
$password = 'password'; 

try {
    // Establish database connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get search term from the URL, if provided
    $searchTerm = isset($_GET['search']) ? $_GET['search'] : '';

    // Query to fetch the communities
    $query = "SELECT name, description FROM community WHERE name LIKE :searchTerm LIMIT 6";
    $stmt = $pdo->prepare($query);
    $stmt->execute(['searchTerm' => '%' . $searchTerm . '%']);
    $communities = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return communities as JSON
    header('Content-Type: application/json');
    echo json_encode($communities);
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>
