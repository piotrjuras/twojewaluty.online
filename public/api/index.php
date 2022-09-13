<?php 
    header('Access-Control-Allow-Origin: *');
    header('Content-type: text/plain; charset=utf-8');

    $data = $_POST['data'];
    $token = $_POST['token'];
    $email = $_POST['email'];
    $isLocal = $_POST['isLocal'];

    if($isLocal == "true"){
        $file = $_SERVER['DOCUMENT_ROOT'] . "/users/$token.json";
    } else {
        $file = $_SERVER['DOCUMENT_ROOT'] . "/api/users/$token.json";
    }

    if(isset($_POST['delete'])){
        unlink($file);
        echo 'deleted';
        $to      = $email;
        $subject = 'Potwierdzenie usunięcia konta w walutapp';
        $message = 'Jest to dla nas przykra wiadomość, lecz mamy nadzieje, ze się jeszcze zobaczymy!';
        $headers = 'From: noreply@twojewaluty.online' . "\r\n" .
            'Reply-To: noreply@twojewaluty.online' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();
    
        mail($to, $subject, $message, $headers);
        mail('admin@twojewaluty.online', 'usunięcie konta', $email, $headers);
    } else {
        $fp = fopen($file, 'w');
        fwrite($fp, $data);
        fclose($fp);

        if(!$email == ''){
            echo 'created';
            $to      = $email;
            $subject = 'Witamy w twojewaluty.online';
            $message = 'Unikalny token wielokrotnego użytku do Twojego konta: ' . $token . 'Możesz też przejść do swojego konta od razu klikając w link: https://twojewaluty.online/user/' . $token;
            $headers = 'From: noreply@twojewaluty.online' . "\r\n" .
                'Reply-To: noreply@twojewaluty.online' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();
        
            mail($to, $subject, $message, $headers);
            mail('admin@twojewaluty.online', 'nowa rejestracja', $email, $headers);
        } else {
            echo 'updated';
        }
    }

?>