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

    // Get the POST data
    $data = json_decode(file_get_contents('php://input'), true);

    $reviewId = $data['reviewId'];
    $userId = $data['userId'];  // Replace with actual user ID from session or authentication
    $rating = $data['rating'];
    $description = $data['description'];

    // Insert the new review into the database
    $query = "INSERT INTO review (reviewID, userID, rating, description) VALUES (:reviewId, :userId, :rating, :description)";
    $stmt = $pdo->prepare($query);
    $stmt->execute([
        'reviewId' => $reviewId,
        'userId' => $userId,
        'rating' => $rating,
        'description' => $description
    ]);

    // Return success message
    echo json_encode(['message' => 'Review successfully submitted.']);
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>
