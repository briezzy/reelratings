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

    // Get the reviewId from the URL
    $reviewId = isset($_GET['reviewId']) ? $_GET['reviewId'] : '';

    // Fetch review details
    $query = "SELECT name, description FROM review WHERE reviewID = :reviewId";
    $stmt = $pdo->prepare($query);
    $stmt->execute(['reviewId' => $reviewId]);
    $review = $stmt->fetch(PDO::FETCH_ASSOC);

    // Fetch comments for the review
    $queryComments = "SELECT text FROM comment WHERE reviewID = :reviewId";
    $stmtComments = $pdo->prepare($queryComments);
    $stmtComments->execute(['reviewId' => $reviewId]);
    $comments = $stmtComments->fetchAll(PDO::FETCH_ASSOC);

    // Combine the review details and comments
    $response = [
        'name' => $review['name'],
        'description' => $review['description'],
        'comments' => $comments
    ];

    // Return the review details as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>
