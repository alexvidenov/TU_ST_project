<?php

class local_remote_sync_observer
{
    public static function remote_sync(\core\event\user_created $event)
    {
        // $event_data = $event->get_data();
        // error_log("in observer");

        $curl= curl_init();
        curl_setopt($curl, CURLOPT_URL, 'https://jsonplaceholder.typicode.com/posts/1');
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $phoneList = curl_exec($curl);
        curl_close($curl);
    
        echo "<pre>";
        var_dump( json_decode($phoneList));
        echo "<pre>";
    }
}