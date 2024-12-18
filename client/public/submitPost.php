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

    // Get the POST data
    $data = json_decode(file_get_contents('php://input'), true);

    $reviewId = $data['reviewId'];
    $userId = $data['userId'];  
    $postText = $data['text'];

    // Insert the new post into the database
    $query = "INSERT INTO comment (reviewID, userID, text) VALUES (:reviewId, :userId, :postText)";
    $stmt = $pdo->prepare($query);
    $stmt->execute([
        'reviewId' => $reviewId,
        'userId' => $userId,
        'postText' => $postText
    ]);

    // Return success message
    echo json_encode(['message' => 'Post successfully submitted.']);
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
?>
